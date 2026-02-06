const questions = [
    {
        fact: "Этот инженер руководил строительством Путиловского завода, ставшего сердцем промышленного Кировского района.",
        options: ["Николай Путилов", "Андрей Воронихин", "Карл Росси", "Дмитрий Менделеев"],
        answer: 0
    },
    {
        fact: "Знаменитый архитектор, чьи проекты определили облик ряда зданий на проспекте Стачек.",
        options: ["Василий Баженов", "Жан-Батист Леблон", "Александр Никольский", "Доменико Трезини"],
        answer: 2
    },
    {
        fact: "Советский рабочий-стахановец, установивший рекорд на Кировском заводе в 1930‑е годы.",
        options: ["Макар Мазай", "Александр Бусыгин", "Никита Изотов", "Прасковья Ангелина"],
        answer: 1
    },
    {
        fact: "Писатель, живший в Кировском районе и описавший его улицы в своих произведениях о блокадном Ленинграде.",
        options: ["Даниил Гранин", "Александр Грин", "Михаил Зощенко", "Константин Паустовский"],
        answer: 0
    },
    {
        fact: "Герой Советского Союза, родившийся в Кировском районе и совершивший подвиг в годы Великой Отечественной войны.",
        options: ["Александр Матросов", "Николай Гастелло", "Иван Черняховский", "Алексей Маресьев"],
        answer: 3
    }
];

let currentQuestion = 0;
let score = 0;

function renderQuestion() {
    const fact = document.getElementById('fact');
    const optionsContainer = document.getElementById('options');

    fact.textContent = questions[currentQuestion].fact;
    optionsContainer.innerHTML = '';

    questions[currentQuestion].options.forEach((option, index) => {
        const btn = document.createElement('div');
        btn.className = 'option';
        btn.textContent = option;
        btn.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedIndex) {
    const options = document.querySelectorAll('.option');
    const correctIndex = questions[currentQuestion].answer;

    options.forEach((opt, idx) => {
        if (idx === selectedIndex) {
            opt.classList.add(selectedIndex === correctIndex ? 'correct' : 'wrong');
        }
    });

    if (selectedIndex === correctIndex) {
        score++;
        document.getElementById('score').textContent = `Счёт: ${score} / 5`;
    }

    // Через 1 сек переходим к следующему вопросу
    setTimeout(nextQuestion, 700);
}


function nextQuestion() {
    currentQuestion++;
    const nextBTN = document.querySelector(".nextBTN")
    const resultBTN = document.querySelector(".resultBTN")
    if (currentQuestion >= questions.length) {
        resultBTN.textContent = `Игра окончена! Ваш результат: ${score} из 5.`;
        nextBTN.textContent = `Играть заново`;
    }


    nextBTN.addEventListener("click", () => {
        currentQuestion = 0;
        score = 0;
        document.getElementById('score').textContent = 'Счёт: 0 / 5';
        resultBTN.textContent = ''
        nextBTN.textContent = '';
        renderQuestion();
    })
    renderQuestion();
}

// Старт
renderQuestion();