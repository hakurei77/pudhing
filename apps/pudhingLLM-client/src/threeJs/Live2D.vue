<template>
    <div class="live2d-container">
        <canvas ref="canvasRef"></canvas>
    </div>
</template>

<script setup lang="ts">
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';
import { ref, onMounted, onUnmounted } from 'vue';

// 将 PIXI 挂载到全局，兼容 pixi-live2d-display 的要求
//@ts-expect-error aaaaaa
window.PIXI = PIXI;

// 定义 canvas 的 ref，并明确类型
const canvasRef = ref<HTMLCanvasElement | null>(null);

// 定义全局变量，避免在函数间重复声明
let app: PIXI.Application | null = null;
let live2dModel: Live2DModel | null = null;

// 调整画布和模型大小的函数
const resizeCanvas = () => {
    if (!app || !live2dModel) return;

    const { innerWidth, innerHeight } = window;
    app.renderer.resize(innerWidth, innerHeight);

    // 将模型居中
    live2dModel.x = innerWidth / 2;
    live2dModel.y = innerHeight / 2;
};

// 初始化 Live2D 模型
const initLive2D = async () => {

    // 创建 PIXI 应用
    app = new PIXI.Application({
        //@ts-expect-error aaaaaa
        view: canvasRef.value,
        transparent: true,
        autoDensity: true,
        antialias: true,
        resolution: window.devicePixelRatio || 1,
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // 加载 Live2D 模型，明确类型
    live2dModel = await Live2DModel.from('/src/assets/ariu/ariu.model3.json');
    app.stage.addChild(live2dModel);

    // 设置模型锚点和缩放
    live2dModel.anchor.set(0.5, 0.5);
    live2dModel.scale.set(0.17);

    // 初始居中
    resizeCanvas();

    // 添加窗口大小变化监听器
    window.addEventListener('resize', resizeCanvas);

};

// 生命周期挂载
onMounted(() => {
    initLive2D();
});

// 清理资源
onUnmounted(() => {
    window.removeEventListener('resize', resizeCanvas);
    if (app) {
        app.destroy(true, { children: true, texture: true, baseTexture: true });
        app = null;
    }
    live2dModel = null;
});
</script>

<style scoped>
.live2d-container {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
}

canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>