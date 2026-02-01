import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { ICelestialBodyConfig } from '../data/SolarSystemData';

interface PlanetProps {
    config: ICelestialBodyConfig;
    timeScale: number;
    showOrbits: boolean;
    isFocused: boolean;
}

export function Planet({ config, timeScale, showOrbits, isFocused }: PlanetProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const angleRef = useRef(Math.random() * Math.PI * 2);

    useFrame((_state, delta) => {
        if (!meshRef.current) return;

        // Orbital Motion
        if (config.distance > 0) {
            angleRef.current += config.speed * delta * 0.1 * timeScale;
            meshRef.current.position.x = Math.cos(angleRef.current) * config.distance;
            meshRef.current.position.z = Math.sin(angleRef.current) * config.distance;
        }

        // Self Rotation
        meshRef.current.rotation.y += config.rotationSpeed * timeScale;
    });

    const orbitPoints = new Float32Array(
        [...Array(129)].map((_, i) => {
            const angle = (i / 128) * Math.PI * 2;
            return [
                Math.cos(angle) * config.distance,
                0,
                Math.sin(angle) * config.distance
            ];
        }).flat()
    );

    return (
        <group>
            {/* Planet Mesh */}
            <mesh ref={meshRef} position={[config.distance, 0, 0]}>
                <sphereGeometry args={[config.radius, 32, 32]} />
                <meshStandardMaterial
                    color={config.color}
                    roughness={0.7}
                    metalness={0.2}
                    emissive={config.distance === 0 ? config.color : 0x000000}
                    emissiveIntensity={config.distance === 0 ? 1 : 0}
                />

                {/* Sun Glow */}
                {config.distance === 0 && (
                    <pointLight intensity={2} decay={2} distance={300} color="#ffffff" />
                )}

                {/* Focused Label */}
                {isFocused && (
                    <Html position={[0, config.radius + 1, 0]} center>
                        <div style={{ color: 'white', background: 'rgba(0,0,0,0.5)', padding: '2px 5px', borderRadius: '4px', fontSize: '12px' }}>
                            {config.name}
                        </div>
                    </Html>
                )}
            </mesh>

            {/* Orbit Line */}
            {config.distance > 0 && showOrbits && (
                <lineLoop rotation={[0, 0, 0]}>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            count={129}
                            array={orbitPoints}
                            itemSize={3}
                            args={[orbitPoints, 3]}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color="white" opacity={0.15} transparent />
                </lineLoop>
            )}
        </group>
    );
}
