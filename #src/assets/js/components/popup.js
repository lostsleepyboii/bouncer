const popup = document.querySelector('.popup'),
      popupContent = document.querySelector('.popup__inner'),
      closePopup = document.querySelector('.popup__close')

if (popup) {
  function openPopup() {
    popup.classList.add('visible')
    body.classList.add('lock')
  }
  
  setTimeout(openPopup, 3000)
  
  popupContent.addEventListener('click', (event) => {
    event.stopPropagation()
  })
  
  popup.addEventListener('click', () => {
    popup.classList.remove('visible')
    body.classList.remove('lock')
  })
  
  closePopup.addEventListener('click', () => {
    popup.classList.remove('visible')
    body.classList.remove('lock')
  })
}
