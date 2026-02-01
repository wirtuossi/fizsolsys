import { create } from 'zustand';
import type { TopicId } from './data/Topics';

interface SimulationState {
    activeTopic: TopicId;
    physics: {
        timeScale: number;
        showOrbits: boolean;
        gravityScale: number;
    };
    cameraTarget: string; // Name of the planet or 'Сонце'

    setTopic: (id: TopicId) => void;
    setPhysicsParam: (key: keyof SimulationState['physics'], value: any) => void;
    setCameraTarget: (target: string) => void;
}

export const useStore = create<SimulationState>((set) => ({
    activeTopic: 'intro',
    physics: {
        timeScale: 1.0,
        showOrbits: true,
        gravityScale: 1.0,
    },
    cameraTarget: 'Сонце',

    setTopic: (id) => set((state) => {
        // Reset defaults when switching topics
        const newPhysics = { ...state.physics, timeScale: 1.0, showOrbits: true };
        let newTarget = 'Сонце';

        // Apply topic presets
        switch (id) {
            case 'mechanics':
                newPhysics.timeScale = 0.5;
                newTarget = 'Земля';
                break;
            case 'forces':
                newPhysics.showOrbits = true;
                break;
            // Add more topic specific logic settings here
        }

        return {
            activeTopic: id,
            physics: newPhysics,
            cameraTarget: newTarget
        };
    }),

    setPhysicsParam: (key, value) => set((state) => ({
        physics: { ...state.physics, [key]: value }
    })),

    setCameraTarget: (target) => set({ cameraTarget: target }),
}));
