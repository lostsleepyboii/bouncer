const comments = document.getElementById('comments')

if (comments) {
  const ACTION = {
    PLUS: 'plus',
    MINUS: 'minus'
  }
  
  const calculateRate = (commentItem, action) => {
    const input = commentItem.querySelector('.rater__input')
  
    switch (action) {
      case ACTION.PLUS:
        input.value++
        break
      case ACTION.MINUS:
        input.value--
        break
    }
  }
  
  comments.addEventListener('click', (event) => {
    if (event.target.classList.contains('rater__btn--minus')) {
      calculateRate(
        event.target.closest('.comments__item'),
        ACTION.MINUS
      )
    }
    if (event.target.classList.contains('rater__btn--plus')) {
      calculateRate(
        event.target.closest('.comments__item'),
        ACTION.PLUS
      )
    }
  })
}
