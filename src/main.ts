import './style.css';
import { Engine } from './core/Engine';
import { SimulationManager } from './simulations/SimulationManager';
import { UIManager } from './ui/UIManager';

// Identify the canvas
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas id="webgl-canvas"></canvas>
  <div id="ui-layer">
    <div id="sidebar"></div>
  </div>
`;

const canvas = document.querySelector<HTMLCanvasElement>('#webgl-canvas')!;

// Initialize Core Systems
const engine = new Engine(canvas);
const simManager = new SimulationManager(engine);
const uiManager = new UIManager(simManager); // eslint-disable-line @typescript-eslint/no-unused-vars

// Start Loop
engine.start();

console.log('FizSolSys Initialized');
