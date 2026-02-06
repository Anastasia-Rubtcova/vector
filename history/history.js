// События с правильными годами
const events = [
    { year: 1710, text: "Основание Лиговского канала" },
    { year: 1801, text: "Постройка Старо‑Петергофского проспекта" },
    { year: 1917, text: "Рабочие Путиловского завода участвуют в революционных событиях" },
    { year: 1930, text: "Переименование района в Кировский" },
    { year: 1965, text: "Открытие станции метро «Автово»" }
];

let currentOrder = [];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderEvents() {
    const timeline = document.getElementById('timeline');
    timeline.innerHTML = '';
    currentOrder.forEach(event => {
        const eventEl = document.createElement('div');
        eventEl.className = 'event';
        eventEl.dataset.year = event.year;

        const yearEl = document.createElement('span');
        yearEl.className = 'year';
        yearEl.addEventListener('click', () => {
            yearEl.textContent = event.year;
        })


        const textEl = document.createElement('span');
        textEl.textContent = event.text;

        eventEl.appendChild(yearEl);
        eventEl.appendChild(textEl);
        timeline.appendChild(eventEl);

        // Делаем элементы перетаскиваемыми
        eventEl.draggable = true;
        eventEl.addEventListener('dragstart', handleDragStart);
        eventEl.addEventListener('dragover', handleDragOver);
        eventEl.addEventListener('drop', handleDrop);
    });
}

// Обработчики drag-and-drop
let dragSrcEl = null;

function handleDragStart(e) {
    dragSrcEl = e.target;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDrop(e) {
    if (e.stopPropagation) e.stopPropagation();

    if (dragSrcEl !== e.target && e.target.classList.contains('event')) {
        const targetIndex = Array.from(e.target.parentNode.children).indexOf(e.target);
        const srcIndex = Array.from(dragSrcEl.parentNode.children).indexOf(dragSrcEl);

        // Переставляем в массиве
        currentOrder.splice(targetIndex, 0, currentOrder.splice(srcIndex, 1)[0]);
        renderEvents(); // Перерисовываем
    }
    return false;
}

function checkOrder() {
    const orderedYears = currentOrder.map(e => e.year);
    const correctYears = events.map(e => e.year).sort((a, b) => a - b);

    const isCorrect = orderedYears.every((year, index) => year === correctYears[index]);

    const result = document.getElementById('result');
    if (isCorrect) {
        result.style.background = '#c2e777';
        result.style.color = '#1e5353';
        result.textContent = 'Верно! Все события в правильном порядке.';
    } else {
        result.style.background = '#ec7d71';
        result.style.color = '#1e5353';
        result.textContent = `Неверно. Правильный порядок: ${correctYears.join(', ')}`;
    }
}

// Инициализация
currentOrder = shuffleArray([...events]);
renderEvents();