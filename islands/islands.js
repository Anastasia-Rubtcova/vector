// === ДАННЫЕ ИГРЫ ===
const resultContainer = document.querySelector('.result-container')
const questions = [
  {
    id: 1,
    question: "Какой остров Кировского района известен с XVIII века как место расположения промышленных предприятий?",
    answers: ["Гутуевский", "Канонерский", "Белый", "Котлин"],
    correct: 0
  },
  {
    id: 2,
    question: "На каком острове находится знаменитый Канонерский тоннель?",
    answers: ["Канонерский", "Гутуевский", "Вольный", "Турухтанные острова"],
    correct: 0
  },
  {
    id: 3,
    question: "Какой остров исторически связан с портовой инфраструктурой и судоремонтом?",
    answers: ["Гутуевский", "Каменный", "Крестовский", "Петровский"],
    correct: 0
  }
];

// === ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ ===
let score = 0;
let currentQuestion = null;

// === ПОЛУЧЕНИЕ ЭЛЕМЕНТОВ DOM ===
const scoreElement = document.getElementById('score');
const cardElement = document.getElementById('card');
const questionTextElement = document.getElementById('question-text');
const answersElement = document.getElementById('answers');
const closeCardButton = document.getElementById('close-card');
const endScreen = document.getElementById('end-screen');
const finalScoreElement = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

// === ФУНКЦИИ ИГРЫ ===

// Показать карточку с вопросом
function showCard(question) {
  currentQuestion = question;
  
  questionTextElement.textContent = question.question;
  
  // Очищаем контейнер ответов
  answersElement.innerHTML = '';
  
  // Создаём кнопки для каждого ответа
  question.answers.forEach((answer, index) => {
    const button = document.createElement('button');
    button.className = 'answer-button';
    button.textContent = answer;
    button.addEventListener('click', () => checkAnswer(index));
    answersElement.appendChild(button);
  });
  
  cardElement.style.display = 'block';
}

// Проверить ответ пользователя
function checkAnswer(selectedIndex) {
  if (selectedIndex === currentQuestion.correct) {
    score++;
    scoreElement.textContent = score;
    resultContainer.textContent = 'Правильно! +1 балл'
  } else {
    resultContainer.textContent =`Неверно. Правильный ответ: ${currentQuestion.answers[currentQuestion.correct]}`;
  }
  
  // Закрываем карточку
  cardElement.style.display = 'none';
  
  // Проверяем, все ли вопросы заданы
  checkGameEnd();
}

// Проверить завершение игры
function checkGameEnd() {
  const allMarkers = document.querySelectorAll('.island-marker');
  const activeMarkers = Array.from(allMarkers).filter(marker => {
    return marker.style.display !== 'none';
  });
  
  if (activeMarkers.length === 0) {
    endGame();
  }
}

// Завершить игру
function endGame() {
  resultContainer.textContent = ''
  cardElement.style.display = 'none';
  endScreen.style.display = 'block';
  finalScoreElement.textContent = score;
}

// Начать игру заново
function restartGame() {
  score = 0;
  scoreElement.textContent = '0';
  currentQuestion = null;
  
  endScreen.style.display = 'none';
  
  // Возвращаем видимость всем маркерам островов
  document.querySelectorAll('.island-marker').forEach(marker => {
    marker.style.display = 'flex';
  });
}

// === ОБРАБОТЧИКИ СОБЫТИЙ ===

// Обработчик клика по маркерам островов
document.querySelectorAll('.island-marker').forEach(marker => {
  marker.addEventListener('click', () => {
    const islandId = parseInt(marker.getAttribute('data-id'));
    
    // Находим соответствующий вопрос
    const question = questions.find(q => q.id === islandId);
    
    if (question) {
      // Показываем карточку
      showCard(question);
      
      // Скрываем маркер после клика
      marker.style.display = 'none';
    }
  });
});

// Обработчик кнопки «Закрыть» на карточке
closeCardButton.addEventListener('click', () => {
  cardElement.style.display = 'none';
});

// Обработчик кнопки «Начать заново»
restartButton.addEventListener('click', restartGame);

// === ИНИЦИАЛИЗАЦИЯ ИГРЫ ===
// (дополнительные настройки при загрузке)
window.addEventListener('load', () => {
  console.log('Игра загружена. Готов к игре!');
});