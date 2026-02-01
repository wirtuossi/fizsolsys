# FizSolSys - Навчальний симулятор з фізики

Проєкт розроблено на TypeScript + Three.js + Vite.

## Як запустити

1. Встановіть залежності (якщо ще ні):
   ```bash
   npm install
   ```

2. Запустіть локальний сервер:
   ```bash
   npm run dev
   ```

3. Відкрийте посилання у браузері (зазвичай http://localhost:5173).

## Структура

- `src/core`: Базовий рушій 3D (Engine.ts)
- `src/objects`: Класи небесних тіл (CelestialBody.ts)
- `src/simulations`: Логіка фізичних явищ та менеджер станів (SimulationManager.ts)
- `src/ui`: Керування інтерфейсом (UIManager.ts)
- `src/data`: Дані про планети
