import GUI from 'lil-gui';
import { Engine } from '../core/Engine';
import { SolarSystemData } from '../data/SolarSystemData';
import { CelestialBody } from '../objects/CelestialBody';
import * as THREE from 'three';

// Define Simulation Types
export enum Topic {
    intro = 'intro',
    mechanics = 'mechanics', // 3. Mechanical Motion
    forces = 'forces',       // 4. Forces (Gravity)
    energy = 'energy',       // 6. Energy
    light = 'light'          // 10. Light
}

export class SimulationManager {
    private engine: Engine;
    private bodies: CelestialBody[] = [];
    private gui: GUI;
    private activeTopic: string = 'intro';

    // Global Physics Params
    public params = {
        timeScale: 1.0,
        showOrbits: true,
        gravityScale: 1.0,
        focus: 'Сонце'
    };

    constructor(engine: Engine) {
        this.engine = engine;
        this.gui = new GUI({ title: 'Налаштування Симуляції' });
        this.setupGUI();

        // Initialize Bodies
        SolarSystemData.forEach(config => {
            const body = new CelestialBody(config, this.engine.scene);
            this.bodies.push(body);
            this.engine.addUpdatable(body); // Register for updates
        });

        // Register Manager update
        this.engine.addUpdatable(this);
    }

    private setupGUI() {
        this.gui.add(this.params, 'timeScale', 0, 5).name('Швидкість часу');
        this.gui.add(this.params, 'showOrbits').name('Орбіти').onChange((v: boolean) => {
            this.bodies.forEach(b => {
                if (b.orbitLine) b.orbitLine.visible = v;
            });
        });

        // Focus selector
        const names = SolarSystemData.map(d => d.name);
        this.gui.add(this.params, 'focus', names).name('Камера на').onChange((name: string) => {
            this.focusOn(name);
        });
    }

    public setTopic(topicId: string) {
        this.activeTopic = topicId;
        console.log(`Topic switched to: ${topicId}`);

        // Reset state
        this.params.timeScale = 1.0;
        this.params.showOrbits = true;

        // Topic specific configuration
        switch (topicId) {
            case '3': // Mechanical Motion
                this.focusOn('Земля');
                this.params.timeScale = 0.5;
                break;
            case '4': // Forces
                this.params.showOrbits = true;
                this.focusOn('Сонце');
                break;
            default:
                this.focusOn('Сонце');
        }

        // Update GUI display
        this.gui.controllersRecursive().forEach(c => c.updateDisplay());
    }

    private focusOn(name: string) {
        const body = this.bodies.find(b => b.config.name === name);
        if (body) {
            // Smooth transition could be added here
            if (name === 'Сонце') {
                // Reset camera
                this.engine.controls.target.set(0, 0, 0);
                this.engine.camera.position.set(0, 60, 80);
            } else {
                // Focus on planet
                // Note: Real camera tracking requires updating controls.target every frame. 
                // We'll handle that in update()
            }
        }
    }

    public update(dt: number) {
        // Update bodies with timeScale
        this.bodies.forEach(b => b.update(dt, this.params.timeScale));

        // Camera tracking logic if focused on a moving planet
        if (this.params.focus !== 'Сонце') {
            const targetBody = this.bodies.find(b => b.config.name === this.params.focus);
            if (targetBody) {
                const pos = targetBody.mesh.position;
                this.engine.controls.target.copy(pos);
                // Keep camera at relative offset? Or just look at it?
                // Just look at it allows user to rotate around it as it moves which is cool but dizzying.
                // Simple: Controls target follows the body.
            }
        }
    }
}
