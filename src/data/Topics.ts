export const TOPICS = {
    intro: { id: 'intro', title: '1. Методи пізнання природи', desc: 'Спостереження орбіт, моделювання' },
    mechanics: { id: 'mechanics', title: '3. Механічний рух', desc: 'Орбіти, швидкість, прискорення' },
    forces: { id: 'forces', title: '4. Взаємодія тіл', desc: 'Гравітація, сили' },
    moment: { id: 'moment', title: '5. Момент сили', desc: 'Обертання, нахил осі' },
    energy: { id: 'energy', title: '6. Робота та енергія', desc: 'Потенціальна та кінетична енергія' },
    thermal: { id: 'thermal', title: '7. Теплові явища', desc: 'Температура, випромінювання' },
    electrical: { id: 'electrical', title: '8. Електричні явища', desc: 'Заряди в космосі' },
    current: { id: 'current', title: '9. Електричний струм', desc: 'Сонячний вітер, плазма' },
    light: { id: 'light', title: '10. Світлові явища', desc: 'Світло, тіні, затемнення' },
    waves: { id: 'waves', title: '11. Хвилі', desc: 'Механічні та електромагнітні' },
    atom: { id: 'atom', title: '12. Фізика атома', desc: 'Будова речовини' },
    nuclear: { id: 'nuclear', title: '13. Атомна енергетика', desc: 'Ядерні реакції Сонця' },
} as const;

export type TopicId = keyof typeof TOPICS;
