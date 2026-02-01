import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Engine {
    public scene: THREE.Scene;
    public camera: THREE.PerspectiveCamera;
    public renderer: THREE.WebGLRenderer;
    public controls: OrbitControls;
    public time: number = 0;
    public isPaused: boolean = false;

    private loopId: number | null = null;
    private updatables: Set<{ update: (deltaTime: number) => void }> = new Set();
    private clock: THREE.Clock;

    constructor(canvas: HTMLCanvasElement) {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000000);
        // Add starfield
        this.createStars();

        // Camera
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 40, 60);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Controls
        this.controls = new OrbitControls(this.camera, canvas);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.minDistance = 5;
        this.controls.maxDistance = 500;

        // Lighting (Basic ambient + Sun point light is handled in Sol)
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Soft white light
        this.scene.add(ambientLight);

        this.clock = new THREE.Clock();

        // Handle resize
        window.addEventListener('resize', this.onResize.bind(this));
    }

    private createStars() {
        const geometry = new THREE.BufferGeometry();
        const count = 5000;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 800;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({ size: 0.2, color: 0xffffff });
        const stars = new THREE.Points(geometry, material);
        this.scene.add(stars);
    }

    private onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    public addUpdatable(obj: { update: (dt: number) => void }) {
        this.updatables.add(obj);
    }

    public start() {
        this.clock.start();
        this.loop();
    }

    private loop() {
        this.loopId = requestAnimationFrame(this.loop.bind(this));

        const deltaTime = this.clock.getDelta();

        if (!this.isPaused) {
            this.time += deltaTime;
            this.controls.update();

            for (const item of this.updatables) {
                item.update(deltaTime);
            }
        }

        this.renderer.render(this.scene, this.camera);
    }
}
