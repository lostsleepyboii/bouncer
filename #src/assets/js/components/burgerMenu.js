if (burger) {

  burger.addEventListener('click', () => {
    if(!openBurger) {
      burger.classList.add('show');
      nav.classList.add('show');
      overlay.classList.add('show');
      body.classList.add('lock');

      if (sidebar) {
        sidebar.classList.remove('show');
        openSidebar = false;
      }

      openBurger = true;
      
    } else {
      burger.classList.remove('show');
      nav.classList.remove('show');
      overlay.classList.remove('show');
      body.classList.remove('lock');

      openBurger = false;
    }
  })

  headerBtns.addEventListener('click', () => {
    burger.classList.remove('show');
    nav.classList.remove('show');
    overlay.classList.remove('show');
    body.classList.remove('lock');
    
    openBurger = false;
  })

  overlay.addEventListener('click', () => {
    burger.classList.remove('show');
    nav.classList.remove('show');
    overlay.classList.remove('show');
    body.classList.remove('lock');

    openBurger = false;
  })

}