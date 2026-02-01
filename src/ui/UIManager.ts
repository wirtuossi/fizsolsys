import { SimulationManager } from '../simulations/SimulationManager';

const TOPICS = [
    { id: '1', title: '1. Методи пізнання природи', desc: 'Спостереження орбіт, моделювання' },
    { id: '2', title: '2. Фізика як наука', desc: 'Загальні поняття' },
    { id: '3', title: '3. Механічний рух', desc: 'Орбіти, швидкість, прискорення' },
    { id: '4', title: '4. Взаємодія тіл', desc: 'Гравітація, сили' },
    { id: '5', title: '5. Момент сили', desc: 'Обертання, нахил осі' },
    { id: '6', title: '6. Робота та енергія', desc: 'Потенціальна та кінетична енергія' },
    { id: '7', title: '7. Теплові явища', desc: 'Температура, випромінювання' },
    { id: '8', title: '8. Електричні явища', desc: 'Заряди в космосі' },
    { id: '9', title: '9. Електричний струм', desc: 'Сонячний вітер, плазма' },
    { id: '10', title: '10. Світлові явища', desc: 'Світло, тіні, затемнення' },
    { id: '11', title: '11. Хвилі', desc: 'Механічні та електромагнітні' },
    { id: '12', title: '12. Фізика атома', desc: 'Будова речовини' },
    { id: '13', title: '13. Атомна енергетика', desc: 'Ядерні реакції Сонця' },
];

export class UIManager {
    private simManager: SimulationManager;
    private sidebar: HTMLElement;
    private infoPanel: HTMLElement;

    constructor(simManager: SimulationManager) {
        this.simManager = simManager;
        this.sidebar = document.getElementById('sidebar')!;
        this.infoPanel = document.createElement('div');
        this.infoPanel.className = 'info-panel';
        document.getElementById('ui-layer')?.appendChild(this.infoPanel);

        this.initMenu();
    }

    private initMenu() {
        const container = document.createElement('div');

        const title = document.createElement('h1');
        title.innerText = 'FizSolSys';
        container.appendChild(title);

        const sub = document.createElement('p');
        sub.style.opacity = '0.7';
        sub.style.marginBottom = '20px';
        sub.innerText = 'Навчальний симулятор 7-9 клас';
        container.appendChild(sub);

        TOPICS.forEach(topic => {
            const btn = document.createElement('div');
            btn.className = 'topic-btn';
            btn.innerHTML = `<strong>${topic.title}</strong><br><small>${topic.desc}</small>`;
            btn.onclick = () => {
                document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.selectTopic(topic);
            };
            container.appendChild(btn);
        });

        this.sidebar.appendChild(container);
    }

    private selectTopic(topic: { id: string, title: string, desc: string }) {
        this.simManager.setTopic(topic.id);

        // Show info
        this.infoPanel.innerHTML = `
            <h2>${topic.title}</h2>
            <p>${topic.desc}</p>
            <hr style="border-color: rgba(255,255,255,0.1)">
            <p>У цьому режимі ви можете досліджувати фізичні явища на прикладі Сонячної системи.</p>
            <p>Використовуйте панель праворуч для зміни параметрів.</p>
        `;
        this.infoPanel.style.display = 'block';
    }
}
