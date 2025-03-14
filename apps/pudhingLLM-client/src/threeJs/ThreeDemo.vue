<template>
    <div class="three-container">
        <canvas id="bg"></canvas>
    </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { onMounted, onUnmounted } from 'vue';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer: THREE.WebGLRenderer;
let accretionDisk: THREE.Mesh;
let blackHole: THREE.Mesh;
let animateId: number;

// 相机控制参数
let cameraRadius = 80;
let cameraTheta = 0;
let cameraPhi = Math.PI / 3;
let mouseDown = false;
let mouseX = 0;
let mouseY = 0;

// 创建吸积盘材质
const createAccretionMaterial = () => {
    return new THREE.ShaderMaterial({
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            varying vec2 vUv;
            uniform vec3 color1;
            uniform vec3 color2;
            uniform float time;
            
            void main() {
                float pulse = sin(time * 2.0) * 0.1 + 0.9;
                float intensity = (1.0 - abs(vUv.x - 0.5) * 2.0) * pulse;
                vec3 finalColor = mix(color1, color2, intensity);
                gl_FragColor = vec4(finalColor * intensity * 2.0, 1.0);
            }
        `,
        uniforms: {
            color1: { value: new THREE.Color(0.9, 0.4, 0.1) },
            color2: { value: new THREE.Color(0.9, 0.8, 0.3) },
            time: { value: 0 }
        },
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
    });
};

// 创建黑洞材质
const createBlackHoleMaterial = () => {
    return new THREE.ShaderMaterial({
        vertexShader: `
            varying vec3 vPosition;
            void main() {
                vPosition = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            varying vec3 vPosition;
            uniform float time;
            
            void main() {
                // 引力透镜效果
                float distortion = 1.0 / (length(vPosition) + 0.1);
                vec3 color = vec3(0.0);
                
                // 事件视界发光
                float edge = smoothstep(4.8, 5.2, length(vPosition));
                color += vec3(0.9, 0.3, 0.1) * edge * (sin(time*3.0)*0.5+0.5);
                
                // 中心黑洞
                color = mix(color, vec3(0.0), step(length(vPosition), 5.0));
                gl_FragColor = vec4(color, 1.0);
            }
        `,
        uniforms: {
            time: { value: 0 }
        }
    });
};

// 创建星空背景
const createStarField = () => {
    const stars = new THREE.BufferGeometry();
    const starPositions = [];
    
    for(let i = 0; i < 10000; i++) {
        const x = THREE.MathUtils.randFloatSpread(2000);
        const y = THREE.MathUtils.randFloatSpread(2000);
        const z = THREE.MathUtils.randFloatSpread(2000);
        starPositions.push(x, y, z);
    }

    stars.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    return new THREE.Points(
        stars,
        new THREE.PointsMaterial({ 
            color: 0xFFFFFF, 
            size: 0.5,
            transparent: true,
            opacity: 0.8
        })
    );
};

const updateCameraPosition = () => {
    camera.position.x = cameraRadius * Math.sin(cameraPhi) * Math.cos(cameraTheta);
    camera.position.y = cameraRadius * Math.cos(cameraPhi);
    camera.position.z = cameraRadius * Math.sin(cameraPhi) * Math.sin(cameraTheta);
    camera.lookAt(0, 0, 0);
};

const animate = () => {
    const time = performance.now() * 0.001;
    
    // 吸积盘旋转
    accretionDisk.rotation.z += 0.002;
    (accretionDisk.material as THREE.ShaderMaterial).uniforms.time.value = time;
    
    // 黑洞材质更新
    (blackHole.material as THREE.ShaderMaterial).uniforms.time.value = time;

    renderer.render(scene, camera);
    animateId = requestAnimationFrame(animate);
};

// 事件处理函数
const handleMouseDown = (e: MouseEvent) => {
    mouseDown = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
};

const handleMouseMove = (e: MouseEvent) => {
    if (!mouseDown) return;
    const deltaX = e.clientX - mouseX;
    const deltaY = e.clientY - mouseY;
    mouseX = e.clientX;
    mouseY = e.clientY;

    cameraTheta += deltaX * 0.005;
    cameraPhi = THREE.MathUtils.clamp(cameraPhi - deltaY * 0.005, 0.1, Math.PI/2 - 0.1);
    updateCameraPosition();
};

const handleWheel = (e: WheelEvent) => {
    cameraRadius = THREE.MathUtils.clamp(cameraRadius + e.deltaY * 0.1, 30, 150);
    updateCameraPosition();
};

onMounted(() => {
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector("#bg")!,
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // 黑洞核心
    blackHole = new THREE.Mesh(
        new THREE.SphereGeometry(5, 64, 64),
        createBlackHoleMaterial()
    );
    
    // 吸积盘
    accretionDisk = new THREE.Mesh(
        new THREE.TorusGeometry(12, 4, 128, 128),
        createAccretionMaterial()
    );
    accretionDisk.rotation.x = Math.PI / 2;

    // 添加元素到场景
    scene.add(createStarField());
    scene.add(blackHole);
    scene.add(accretionDisk);

    // 初始化相机位置
    updateCameraPosition();

    // 光线效果
    const pointLight = new THREE.PointLight(0xffaa33, 2, 200);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);

    // 事件监听
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', () => mouseDown = false);
    window.addEventListener('wheel', handleWheel);

    animate();
});

onUnmounted(() => {
    cancelAnimationFrame(animateId);
    renderer.dispose();
    window.removeEventListener('mousedown', handleMouseDown);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', () => mouseDown = false);
    window.removeEventListener('wheel', handleWheel);
});
</script>

<style scoped>
.three-container {
    width: 100%;
    height: 100vh;
    cursor: grab;
}

.three-container:active {
    cursor: grabbing;
}

canvas {
    width: 100% !important;
    height: 100% !important;
}
</style>