import * as THREE from 'three';
import { ICelestialBodyConfig } from '../data/SolarSystemData';

export class CelestialBody {
    public mesh: THREE.Mesh;
    public orbitLine: THREE.Line | null = null;
    public config: ICelestialBodyConfig;
    private angle: number;

    constructor(config: ICelestialBodyConfig, scene: THREE.Scene) {
        this.config = config;
        this.angle = Math.random() * Math.PI * 2; // Random start angle

        // Create Mesh
        const geometry = new THREE.SphereGeometry(config.radius, 32, 32);
        const material = config.distance === 0
            ? new THREE.MeshBasicMaterial({ color: config.color }) // Sun is emissive-ish
            : new THREE.MeshStandardMaterial({
                color: config.color,
                roughness: 0.7,
                metalness: 0.1
            });

        this.mesh = new THREE.Mesh(geometry, material);
        scene.add(this.mesh);

        // Position initial
        this.updatePosition(0);

        // Orbit Line (if not Sun)
        if (config.distance > 0) {
            this.createOrbit(scene);
        }

        // Add a PointLight for the Sun
        if (config.distance === 0) {
            const light = new THREE.PointLight(0xffffff, 2, 300);
            this.mesh.add(light);

            // Glow effect (simplified)
            const glowGeo = new THREE.SphereGeometry(config.radius * 1.2, 32, 32);
            const glowMat = new THREE.MeshBasicMaterial({
                color: config.color,
                transparent: true,
                opacity: 0.3,
                side: THREE.BackSide
            });
            const glow = new THREE.Mesh(glowGeo, glowMat);
            this.mesh.add(glow);
        }
    }

    private createOrbit(scene: THREE.Scene) {
        const points = [];
        const segments = 128;
        for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            points.push(
                new THREE.Vector3(
                    Math.cos(theta) * this.config.distance,
                    0,
                    Math.sin(theta) * this.config.distance
                )
            );
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 });
        this.orbitLine = new THREE.Line(geometry, material);
        this.orbitLine.rotation.x = Math.PI / 2; // Usually orbit logic is XZ plane, so no rotation needed if we stick to y=0
        // Wait, if points are XZ, Line renders in local space. If we want flat orbit on XZ plane, just leave it.
        // My points calculation was: x=cos*r, y=0, z=sin*r. Correct.

        scene.add(this.orbitLine);
    }

    public update(deltaTime: number, globalSpeedMultiplier: number = 1) {
        // Orbital motion
        if (this.config.distance > 0) {
            // Speed logic: speed param is arbitrary multiplier. 
            // In reality, v ~ 1/sqrt(r). Here we use config.speed.
            this.angle += this.config.speed * deltaTime * 0.1 * globalSpeedMultiplier;
            this.updatePosition(this.angle);
        }

        // Self-rotation
        this.mesh.rotation.y += this.config.rotationSpeed * globalSpeedMultiplier;
    }

    private updatePosition(angle: number) {
        this.mesh.position.x = Math.cos(angle) * this.config.distance;
        this.mesh.position.z = Math.sin(angle) * this.config.distance;
    }
}
