// Данные об исторических фото и вариантах ответов
const photos = [
    {
        src: './wars.img/red-chem.png',
        correct: 'Завод «Красный химик»',
        options: [
            'Парк 9-го Января',
            'Завод «Красный химик»',
            'Кировский завод',
            'Универмаг на Стачек'
        ],
        description: 'Завод «Красный химик» во время блокады. Здесь производили взрывчатые вещества и медикаменты.'
    },
    {
        src: './wars.img/ucr.png',
        correct: 'Укрытие на проспекте Стачек',
        options: [
            'Бомбоубежище у Нарвской заставы',
            'Подвал школы № 23',
            'Укрытие на проспекте Стачек',
            'Склад на Оборонной'
        ],
        description: 'Укрытие на проспекте Стачек. Жители района прятались здесь во время авианалётов.'
    },
    {
        src: './wars.img/ev-p.png',
        correct: 'Эвакуационный пункт у Кировского завода',
        options: [
            'Эвакуационный пункт у Кировского завода',
            'Госпиталь на Кронштадтской',
            'Пункт раздачи продовольствия',
            'Штаб МПВО'
        ],
        description: 'Эвакуационный пункт у Кировского завода. Отсюда отправляли детей и раненых в тыл.'
    },
    {
        src: './wars.img/pl-st.png',
        correct: 'Площадь Стачек',
        options: [
            'Пункт раздачи продовольствия',
            'Бомбоубежище у Нарвской заставы',
            'Парк 9-го Января',
            'Площадь Стачек'
        ],
        description: 'Площадь Стачек. Осенью 1941 года она стала одним из узлов обороны Ленинграда.'
    }
];

let currentIndex = 0;
let score = 0;

const oldPhoto = document.getElementById('old-photo');
const optionsContainer = document.getElementById('options');
const checkBtn = document.getElementById('check-btn');
const nextBtn = document.getElementById('next-btn');
const infoBox = document.getElementById('info-box');
const scoreEl = document.getElementById('score');
const totalEl = document.getElementById('total');

// Инициализация игры
function initGame() {
    if (currentIndex >= photos.length) {
        endGame();
        return;
    }

    const photo = photos[currentIndex];
    oldPhoto.src = photo.src;
    infoBox.style.display = 'none';
    checkBtn.style.display = 'inline-block';
    nextBtn.style.display = 'none';

    // Очищаем варианты
    optionsContainer.innerHTML = '';

    //Создаём кнопки-варианты
    photo.options.forEach(optionText => {
        const option = document.createElement('div');
        option.className = 'option';
        option.textContent = optionText;
        option.dataset.value = optionText;
        optionsContainer.appendChild(option);
    });

    totalEl.textContent = photos.length;
    scoreEl.textContent = score;
}

// Обработка выбора варианта
optionsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('option')) {
        // Снимаем выделение со всех
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('correct', 'wrong', 'selected');
        });
        // Выделяем выбранный
        e.target.classList.add('selected');
    }
});

// Проверка ответа
checkBtn.addEventListener('click', () => {
    const photo = photos[currentIndex];
    const selectedOption = document.querySelector('.option.selected');

    if (!selectedOption) {
        alert('Выберите вариант ответа!');
        return;
    }

    const isCorrect = selectedOption.dataset.value === photo.correct;

    // Подсвечиваем правильный и неправильный ответы
    document.querySelectorAll('.option').forEach(opt => {
        if (opt.dataset.value === photo.correct) {
            opt.classList.add('correct');
        } else if (opt.classList.contains('selected')) {
            opt.classList.add('wrong');
        }
    });

    // Обновляем счёт
    if (isCorrect) {
        score++;
        scoreEl.textContent = score;
    }

    // Показываем информацию
    infoBox.textContent = photo.description;
    infoBox.style.display = 'block';

    // Меняем кнопки
    checkBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
});

// Переход к следующему фото
nextBtn.addEventListener('click', () => {
    currentIndex++;
    initGame();
});

// Завершение игры
function endGame() {
    oldPhoto.style.display = 'none';
    optionsContainer.style.display = 'none';
    checkBtn.style.display = 'none';
    nextBtn.style.display = 'none';

    infoBox.innerHTML = `
    <h3>Игра окончена!</h3>
    <p>Ваш результат: ${score} из ${photos.length}</p>
    ${score === photos.length ? '<p>Отлично! Вы хорошо знаете историю Кировского района.</p>' : ''}
  `;
    infoBox.style.display = 'block';
}

// Запуск игры при загрузке страницы
window.addEventListener('load', initGame);