import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SolarWind() {
    const count = 1000;
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = new THREE.Object3D();

    // Store particle data: velocity, life
    const particles = useRef<{ position: THREE.Vector3, velocity: THREE.Vector3, life: number }[]>([]);

    if (particles.current.length === 0) {
        for (let i = 0; i < count; i++) {
            particles.current.push({
                position: new THREE.Vector3(0, 0, 0),
                velocity: new THREE.Vector3(),
                life: Math.random() // Staggered start
            });
            resetParticle(particles.current[i]);
        }
    }

    function resetParticle(p: any) {
        // Start at Sun surface (r=5 roughly)
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 5 + Math.random() * 2;

        p.position.setFromSphericalCoords(r, phi, theta);

        // Velocity outward
        p.velocity.copy(p.position).normalize().multiplyScalar(10 + Math.random() * 20); // Fast speed
        p.life = 0;
    }

    useFrame((_state, delta) => {
        if (!meshRef.current) return;

        particles.current.forEach((p, i) => {
            p.life += delta * 0.5; // Life speed

            // Move
            p.position.addScaledVector(p.velocity, delta);

            // Reset if too far
            if (p.life > 1 || p.position.length() > 200) {
                resetParticle(p);
            }

            // Update Instance
            dummy.position.copy(p.position);

            // Scale down as they fade out
            const scale = (1 - p.life) * 0.5;
            dummy.scale.setScalar(scale > 0 ? scale : 0);

            dummy.rotation.set(0, 0, 0);
            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshBasicMaterial color="#ffeba1" transparent opacity={0.6} />
        </instancedMesh>
    );
}
