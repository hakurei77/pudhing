// 默认配置
const defaultConfig = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    baseURL: '', // 添加 baseURL，默认空字符串
    timeout: 0,  // 添加 timeout，默认 0 表示无超时
};

// 拦截器管理器
const createInterceptorManager = () => {
    let requestInterceptors = [] as any;
    let responseInterceptors = [] as any;

    return {
        // 添加请求拦截器
        useRequest: (onFulfilled, onRejected) => {
            requestInterceptors.push({ onFulfilled, onRejected });
        },
        // 添加响应拦截器
        useResponse: (onFulfilled, onRejected) => {
            responseInterceptors.push({ onFulfilled, onRejected });
        },
        // 获取拦截器
        getRequestInterceptors: () => requestInterceptors,
        getResponseInterceptors: () => responseInterceptors,
    };
};

/**
 * 用来合并配置项的纯函数
 * @param {Object} defaultConfig - 默认配置对象
 * @param {Object} userConfig - 用户自定义配置对象
 * @returns {Object} 合并后的配置对象
*/
const mergeConfig = (defaultConfig, userConfig) => ({
    ...defaultConfig,
    ...userConfig,
    headers: {
        ...defaultConfig.headers,
        ...userConfig?.headers,
    },
});

/**
 * 创建 fetch 实例，支持方法调用如 fechi.get(), fechi.post()
 */
const createFetch = (baseConfig = {}) => {
    const interceptorManager = createInterceptorManager();

    const fetchWithInterceptors = (url, config = {}) => {
        const finalConfig = mergeConfig(baseConfig, config);
        // 处理 baseURL
        const fullUrl = finalConfig.baseURL ? `${finalConfig.baseURL}${url}` : url;
        const applyRequestInterceptors = interceptorManager
            .getRequestInterceptors()
            .reduce(
                (promise, { onFulfilled, onRejected }) =>
                    promise.then(
                        config => (onFulfilled ? onFulfilled(config) : config),
                        error => (onRejected ? onRejected(error) : Promise.reject(error))
                    ),
                Promise.resolve(finalConfig)
            );

        // 发送请求并处理响应拦截器
        return applyRequestInterceptors
            .then(config => {
                // 创建 AbortController 用于超时控制
                const controller = new AbortController();
                const signal = controller.signal;

                // 如果设置了 timeout，启动定时器
                let timeoutId;
                if (config.timeout > 0) {
                    timeoutId = setTimeout(() => {
                        controller.abort(); // 超时后取消请求
                    }, config.timeout);
                }

                return fetch(fullUrl, { ...config, signal })
                    .then(async response => {
                        if (timeoutId) clearTimeout(timeoutId); // 请求成功，清除定时器
                        // 处理 HTTP 错误状态
                        if (!response.ok) {
                            const error: any = new Error(`HTTP error! status: ${response.status}`);
                            error.response = response;
                            error.status = response.status;
                            throw error;
                        }
                        const data = await response.json();
                        return { data, status: response.status, headers: response.headers };
                    })
                    .catch(error => {
                        if (timeoutId) clearTimeout(timeoutId); // 出错时也清除定时器
                        if (error.name === 'AbortError') {
                            throw new Error('Request timed out');
                        }
                        throw error; // 其他错误直接抛出
                    });
            })
            .then(result =>
                interceptorManager
                    .getResponseInterceptors()
                    .reduce(
                        (promise, { onFulfilled, onRejected }) =>
                            promise.then(
                                value => (onFulfilled ? onFulfilled(value) : value),
                                error => (onRejected ? onRejected(error) : Promise.reject(error))
                            ),
                        Promise.resolve(result)
                    )
            );
    };

    // 定义 HTTP 方法的快捷方式
    const httpMethods = {
        get: (url, config = {}) => fetchWithInterceptors(url, { ...config, method: 'GET' }),
        post: (url, data, config = {}) => fetchWithInterceptors(url, { ...config, method: 'POST', body: JSON.stringify(data) }),
        put: (url, data, config = {}) => fetchWithInterceptors(url, { ...config, method: 'PUT', body: JSON.stringify(data) }),
        delete: (url, config = {}) => fetchWithInterceptors(url, { ...config, method: 'DELETE' }),
        patch: (url, data, config = {}) => fetchWithInterceptors(url, { ...config, method: 'PATCH', body: JSON.stringify(data) }),
    };

    // 将拦截器和 HTTP 方法绑定到返回的对象上
    return Object.assign(fetchWithInterceptors, {
        interceptors: {
            request: interceptorManager.useRequest,
            response: interceptorManager.useResponse,
        },
        ...httpMethods,
    });
};

// 创建 fechi 实例
const fechi = createFetch(defaultConfig);

// 添加全局错误处理的响应拦截器
fechi.interceptors.response(
    response => response,
    error => {
        let message = '连接服务器失败';

        if (error.response) {
            switch (error.response.status) {
                case 400: message = '错误请求'; break;
                case 401: message = '未授权，请重新登录'; break;
                case 403: message = '拒绝访问'; break;
                case 404: message = '请求错误,未找到该资源'; break;
                case 405: message = '请求方法未允许'; break;
                case 408: message = '请求超时'; break;
                case 500: message = '服务器端出错'; break;
                case 501: message = '网络未实现'; break;
                case 502: message = '网络错误'; break;
                case 503: message = '服务不可用'; break;
                case 504: message = '网络超时'; break;
                case 505: message = 'http版本不支持该请求'; break;
                default: message = `连接错误${error.response.status}`;
            }
        } else if (error.message.includes('timeout')) {
            message = '服务器响应超时，请刷新当前页';
        }

        console.error(message); // 这里可以替换成您的错误提示组件
        return Promise.reject(error);
    }
);

export default fechi;