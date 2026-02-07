// Данные игры: картинки и названия объектов Кировского района
const items = [
    {
        id: 1,
        title: 'Парк Александрино',
        img: `./life.img/3-alex.jpg`,
        isPicture: true
    },
    {
        id: 2,
        title: 'Кировский завод',
        img: `./life.img/Kirovsky.JPG`,
        isPicture: true
    },
    {
        id: 3,
        title: 'Станция метро «Автово»',
        img: `./life.img/avtovo.jpg`,
        isPicture: true
    },
    {
        id: 4,
        title: 'Станция метро «Нарвская»',
        img: `./life.img/narv.jpg`,
        isPicture: true
    },
    {
        id: 5,
        title: 'Проспект Стачек',
        img: `./life.img/stacheck.jpg`,
        isPicture: true
    },
    {
        id: 6,
        title: 'Комсомольский сквер',
        img: `./life.img/koms.webp`,
        isPicture: true
    },
    {
        id: 1,
        title: 'Парк Александрино',
        isPicture: false
    },
    {
        id: 2,
        title: 'Кировский завод',
        isPicture: false
    },
    {
        id: 3,
        title: 'Станция метро «Автово»',
        isPicture: false
    },
    {
        id: 4,
        title: 'Станция метро «Нарвская»',
        isPicture: false
    },
    {
        id: 5,
        title: 'Проспект Стачек',
        isPicture: false
    },
    {
        id: 6,
        title: 'Комсомольский сквер',
        isPicture: false
    }
];

let selectedCards = [];
let score = 0;
const totalMatches = items.length / 2;

// Инициализация игры
function initGame() {
    const gameGrid = document.getElementById('gameGrid');
    gameGrid.innerHTML = '';

    // Перемешиваем элементы
    const shuffledItems = [...items].sort(() => Math.random() - 0.5);

    shuffledItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.id = item.id;
        if (item.isPicture) {
            card.innerHTML = `<img src="${item.img}" alt="${item.title}">`;
        } else {
            card.innerHTML = `<div class="card-pare">${item.title}</div>`;
        }

        card.addEventListener('click', handleCardClick);
        gameGrid.appendChild(card);
    });

    score = 0;
    updateScore();
    selectedCards = [];
}

// Обработка клика по карточке
function handleCardClick(e) {
    const card = e.currentTarget;

    // Если карточка уже сопоставлена или выбрана — игнорируем
    if (card.classList.contains('matched') || selectedCards.includes(card)) return;

    selectedCards.push(card);

    if (selectedCards.length === 2) {
        const [card1, card2] = selectedCards;

        // Если ID совпадают — это правильная пара
        if (card1.dataset.id === card2.dataset.id) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            score++;
            updateScore();
        } else {
            // Неправильная пара — показываем ошибку
            card1.classList.add('wrong');
            card2.classList.add('wrong');

            setTimeout(() => {
                card1.classList.remove('wrong');
                card2.classList.remove('wrong');
            }, 800);
        }

        // Очищаем массив выбранных карточек
        selectedCards = [];
    }
}

// Обновляем счётчик очков
function updateScore() {
    document.getElementById('score').textContent = score;
    document.getElementById('total').textContent = totalMatches;
}

// Перезапуск игры
document.getElementById('resetBtn').addEventListener('click', initGame);

// Запуск при загрузке страницы
window.addEventListener('load', initGame);