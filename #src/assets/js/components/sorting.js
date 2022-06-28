sortingBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (!openSorting) {
      sortingSelects.classList.add('show')
      btn.classList.add('active')
      openSorting = true;
  
    } else {
      sortingSelects.classList.remove('show')
      btn.classList.remove('active')
      openSorting = false;
    }
  })
})