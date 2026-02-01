import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Props: Start position, Direction (will be updated), Color, Label
interface VectorArrowProps {
    color: string;
    label?: string;
    scale?: number;
    parentRef: React.MutableRefObject<THREE.Mesh | null>;
    type: 'velocity' | 'force';
}

export function VectorArrow({ color, label, scale = 1, parentRef, type }: VectorArrowProps) {
    const arrowRef = useRef<THREE.ArrowHelper>(null);
    const dir = useMemo(() => new THREE.Vector3(1, 0, 0), []);

    useFrame(() => {
        if (!parentRef.current || !arrowRef.current) return;

        const pos = parentRef.current.position;

        // Calculate Direction based on type
        if (type === 'velocity') {
            // Tangent: (-z, 0, x)
            dir.set(-pos.z, 0, pos.x).normalize();
        } else if (type === 'force') {
            // Towards center: (-x, 0, -z)
            dir.set(-pos.x, 0, -pos.z).normalize();
        }

        arrowRef.current.setDirection(dir);
        // Arrow is attached to parent, so it moves with it automatically?
        // If we put it inside the mesh <group>, yes.
        // But arrowHelper length is fixed.
    });

    return (
        <arrowHelper
            ref={arrowRef}
            args={[dir, new THREE.Vector3(0, 0, 0), 6 * scale, color, 1 * scale, 0.5 * scale]}
        />
    );
}
