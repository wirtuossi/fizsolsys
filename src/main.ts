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

try {
  // Initialize Core Systems
  const engine = new Engine(canvas);
  const simManager = new SimulationManager(engine);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const uiManager = new UIManager(simManager);

  // Start Loop
  engine.start();

  console.log('FizSolSys Initialized');
} catch (err: any) {
  console.error(err);
  document.body.innerHTML += `<div style="position:absolute;top:0;left:0;color:red;padding:20px;background:white;z-index:9999">
    <h1>Error Initializing App</h1>
    <pre>${err?.message || err}</pre>
    <pre>${err?.stack || ''}</pre>
  </div>`;
}

window.addEventListener('error', (event) => {
  document.body.innerHTML += `<div style="position:absolute;bottom:0;left:0;color:red;padding:20px;background:rgba(255,255,255,0.8);z-index:9999">
    <b>Runtime Error:</b> ${event.message}
  </div>`;
});
