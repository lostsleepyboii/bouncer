productsTab.forEach((link) => {
  link.addEventListener('click', () => {
    productsTab.forEach((item) => {
      item.classList.remove('active')
    })

    link.classList.add('active')
  })
})