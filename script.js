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
