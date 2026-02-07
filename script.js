const cardTexts = document.querySelectorAll(".dost-container__card-text")
const cards = document.querySelectorAll(".dost-container__card")

cards.forEach(card => {
    card.addEventListener("click", () => {
        let cardText = card.querySelector(".dost-container__card-text")
        cardText.classList.toggle("active-text")
        let cardImg = card.querySelector(".dost-container__card-img")
        cardImg.classList.toggle("active-img")
    })
})


document.getElementById('telegramForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Отменяем стандартную отправку формы

    // Собираем данные из полей
    const name = document.getElementById('name-input').value;
    const review = document.getElementById('text-input').value;
    const contact = document.querySelector('input[name="contact"]').value;

    // Формируем сообщение в HTML‑разметке
    let message = `📩 Новый отзыв:\n`;
    message += `<b>Имя:</b> ${name}\n`;
    message += `<b>Отзыв:</b> ${review}\n`;

    if (contact) {
        message += `<b>Контакт:</b> ${contact}`;
    }

    // Параметры для Telegram API
    const botToken = '7921752650:AAGFy2ie6JkpmZ9rfvIl9KdiE2p2sTO9tfY';
    const chatId = '5332712058';
    const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    // Отправляем запрос
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML' // Включаем HTML‑разметку
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert('Отзыв отправлен!');
                document.getElementById('telegramForm').reset(); // Очищаем форму
            } else {
                console.error('Ошибка Telegram API:', data);
                alert('Ошибка отправки. Попробуйте ещё раз.');
            }
        })
        .catch(error => {
            console.error('Ошибка сети:', error);
            alert('Не удалось подключиться к Telegram. Проверьте интернет.');
        });
});

