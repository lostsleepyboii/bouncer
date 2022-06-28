colorBox.forEach((el) => {
  el.addEventListener('click', () => {
    colorBox.forEach((el) => {
      el.classList.remove('active')
    }) 

    el.classList.add('active')
  })
})