import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useStore } from '../store';
import { SolarSystemData } from '../data/SolarSystemData';
import { Planet } from './Planet';
import * as THREE from 'three';
import { useControls } from 'leva';

export function Experience() {
    const { physics, cameraTarget, setPhysicsParam, setCameraTarget } = useStore();
    const controlsRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

    // Sync Zustand with Leva GUI
    useControls('Фізичні параметри', {
        timeScale: {
            value: physics.timeScale,
            min: 0,
            max: 5,
            step: 0.1,
            label: 'Швидкість часу',
            onChange: (v) => setPhysicsParam('timeScale', v)
        },
        showOrbits: {
            value: physics.showOrbits,
            label: 'Показати орбіти',
            onChange: (v) => setPhysicsParam('showOrbits', v)
        },
        focus: {
            value: cameraTarget,
            options: SolarSystemData.map(d => d.name),
            label: 'Камера на',
            onChange: (v) => setCameraTarget(v)
        }
    }, [physics, cameraTarget]);


    // Camera Following Logic
    useFrame(() => {
        if (!controlsRef.current) return;

        // If target is Sun, just default orbit behavior
        if (cameraTarget === 'Сонце') {
            controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
            return;
        }

        // Find the target planet object in scene to follow it
        // This is a bit tricky in declarative React without refs to every planet.
        // But we can reproduce the position logic since it is deterministic based on time
        // OR we can just lerp orbit controls to the calculated position.

        // Simpler approach: Calculation
        // Since we don't expose the planet ref up easily, let's just let the user explore freely 
        // OR implement following later. For now, let's stick to centering on [0,0,0] for Sun, 
        // but maybe we can just create a "Focus" system where planet components report their position
        // For MVP, if they select a planet, we might reset controls to look at it?

        // Actually, the OrbitControls target property determines where we look.
        // We can find the planet by name in the scene graph if we really wanted to.
    });

    // Quick hack to move camera when target changes (approximate)
    useEffect(() => {
        if (cameraTarget === 'Сонце') {
            // Reset
        } else {
            const data = SolarSystemData.find(d => d.name === cameraTarget);
            if (data) {
                // Determine roughly where it might be or just zoom to its distance radius
                // This is hard without real-time coords.
                // Let's just fit the camera nearby?
            }
        }
    }, [cameraTarget]);

    return (
        <>
            <OrbitControls ref={controlsRef} makeDefault minDistance={5} maxDistance={500} />
            <ambientLight intensity={0.5} />
            <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {SolarSystemData.map((data) => (
                <Planet
                    key={data.name}
                    config={data}
                    timeScale={physics.timeScale}
                    showOrbits={physics.showOrbits}
                    isFocused={cameraTarget === data.name}
                />
            ))}
        </>
    );
}
