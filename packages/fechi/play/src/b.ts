import type { RequestInit } from 'node-fetch';

export interface FechiRequestConfig extends RequestInit {
    baseURL?: string;
    timeout?: number;
    retries?: number;
    onProgress?: (progress: number) => void;
    headers?: Record<string, string>;
}

export interface FechiResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: Headers;
    config: FechiRequestConfig;
}

export interface FechiError extends Error {
    config: FechiRequestConfig;
    status?: number;
    statusText?: string;
    headers?: Headers;
    data?: any;
}

// 默认配置
const defaults: FechiRequestConfig = {
    timeout: 10000,
    retries: 0,
    headers: {
        'Content-Type': 'application/json',
    },
};

// 合并配置
const mergeConfig = (config: FechiRequestConfig): FechiRequestConfig => ({
    ...defaults,
    ...config,
    headers: {
        ...defaults.headers,
        ...config.headers,
    },
});

// 核心请求函数
const request = async <T = any>(config: FechiRequestConfig): Promise<FechiResponse<T>> => {
    const finalConfig = mergeConfig(config);
    const { baseURL, timeout, retries, onProgress, ...fetchConfig } = finalConfig;

    const url = baseURL ? baseURL + config.url : config.url;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url!, {
            ...fetchConfig,
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const data = await response.json();

        if (!response.ok) {
            const error = new Error(response.statusText) as FechiError;
            error.config = config;
            error.status = response.status;
            error.statusText = response.statusText;
            error.headers = response.headers;
            error.data = data;
            throw error;
        }

        return {
            data,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
            config: finalConfig,
        };
    } catch (error) {
        if (retries && retries > 0) {
            return request({
                ...config,
                retries: retries - 1,
            });
        }
        throw error;
    }
};

// HTTP 方法封装
export const get = <T = any>(url: string, config: FechiRequestConfig = {}): Promise<FechiResponse<T>> =>
    request<T>({
        ...config,
        method: 'GET',
        url,
    });

export const post = <T = any>(url: string, data?: any, config: FechiRequestConfig = {}): Promise<FechiResponse<T>> =>
    request<T>({
        ...config,
        method: 'POST',
        url,
        body: JSON.stringify(data),
    });

export const put = <T = any>(url: string, data?: any, config: FechiRequestConfig = {}): Promise<FechiResponse<T>> =>
    request<T>({
        ...config,
        method: 'PUT',
        url,
        body: JSON.stringify(data),
    });

export const del = <T = any>(url: string, config: FechiRequestConfig = {}): Promise<FechiResponse<T>> =>
    request<T>({
        ...config,
        method: 'DELETE',
        url,
    });

// 创建自定义实例
export const create = (config: FechiRequestConfig = {}) => {
    const customDefaults = { ...defaults, ...config };
    
    return {
        get: <T = any>(url: string, instanceConfig: FechiRequestConfig = {}) =>
            request<T>({ ...customDefaults, ...instanceConfig, method: 'GET', url }),
        post: <T = any>(url: string, data?: any, instanceConfig: FechiRequestConfig = {}) =>
            request<T>({ ...customDefaults, ...instanceConfig, method: 'POST', url, body: JSON.stringify(data) }),
        put: <T = any>(url: string, data?: any, instanceConfig: FechiRequestConfig = {}) =>
            request<T>({ ...customDefaults, ...instanceConfig, method: 'PUT', url, body: JSON.stringify(data) }),
        delete: <T = any>(url: string, instanceConfig: FechiRequestConfig = {}) =>
            request<T>({ ...customDefaults, ...instanceConfig, method: 'DELETE', url }),
    };
};

// 默认导出
export default {
    get,
    post,
    put,
    delete: del,
    create,
};