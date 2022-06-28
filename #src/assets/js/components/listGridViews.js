viewBtn.forEach((link) => {
  link.addEventListener('click', () => {
    viewBtn.forEach((item) => {
      item.classList.remove('active')
    })

    link.classList.add('active')

    productsList.forEach((view) => {
      view.style.display = "none"
    })

    let viewMode = link.getAttribute('data-view')

    if (viewMode == 'list-view') {
      document.querySelector('.' + viewMode).style.display = "grid"
    } else {
      document.querySelector('.' + viewMode).style.display = "grid"
    }
  })
})