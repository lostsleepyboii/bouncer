if (sidebar) {
  
  // SIDEBAR MENU
  filterBtn.addEventListener('click', () => {
    if (!openSidebar) {
      sidebar.classList.add('show')
      overlay.classList.add('show')
      body.classList.add('lock')

      openSidebar = true;
    } else {
      sidebar.classList.remove('show')
      overlay.classList.remove('show')
      body.classList.remove('lock')

      openSidebar = false;
    }
  })

  headerBtns.addEventListener('click', () => {
    sidebar.classList.remove('show')
    overlay.classList.remove('show')
    body.classList.remove('lock')

    openSidebar = false;
  })

  sidebarClose.addEventListener('click', () => {
    sidebar.classList.remove('show')
    overlay.classList.remove('show')
    body.classList.remove('lock')

    openSidebar = false;
  })

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('show')
    overlay.classList.remove('show')
    body.classList.remove('lock')

    openSidebar = false;
  })

  // FILTERS ACTIVE
  filterItem.forEach((link) => {
    link.addEventListener('click', () => {
      if (!link.classList.contains('active')) {
        link.classList.add('active')
      } else {
        link.classList.remove('active')
      }
    })
  })
}