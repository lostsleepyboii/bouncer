cardTab.forEach((tab) => {
  tab.addEventListener('click', () => {
    cardTab.forEach((el) => {
      el.classList.remove('active')
    })

    tab.classList.add('active')

    cardInfo.forEach((view) => {
      view.style.display = "none"
    })

    let activeView = tab.getAttribute('data-view')

    if (activeView == !'desc') {
      document.querySelector('.' + activeView).style.display = "block"
    } else {
      document.querySelector('.' + activeView).style.display = "block"
    }
  })
})