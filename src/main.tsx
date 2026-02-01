import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { Experience } from './components/Experience'
import { UI } from './components/UI'
import './style.css'

createRoot(document.getElementById('app')!).render(
    <StrictMode>
        {/* 3D Layer */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
            <Canvas
                camera={{ position: [0, 40, 60], fov: 60 }}
                shadows
                gl={{ antialias: true }}
            >
                <Experience />
            </Canvas>
        </div>

        {/* UI Layer */}
        <div style={{ position: 'relative', zIndex: 10 }}>
            <UI />
        </div>
    </StrictMode>,
)
