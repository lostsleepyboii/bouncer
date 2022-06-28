const counterInput = document.querySelector('.counter__input'),
      counterPlus = document.querySelector('.counter__btn--plus'),
      counterMinus = document.querySelector('.counter__btn--minus'),
      addToCart = document.querySelectorAll('.btn--cart'),
      qtyItemsCart = document.querySelector('.nav__itemsqty'),
      costItemsCart = document.querySelector('.nav__cost')

if (counterInput) {
  counterPlus.addEventListener('click', () => {
    let currentValue = parseInt(counterInput.value)
    currentValue++
    counterInput.value = currentValue

    counterMinus.classList.remove('disabled')

    if (counterInput.value > 99998) {
      counterInput.value = 99999
      counterPlus.classList.add('disabled')
    } else {
      counterPlus.classList.remove('disabled')
    }
  })

  counterMinus.addEventListener('click', () => {
    let currentValue = parseInt(counterInput.value)
    currentValue--
    counterInput.value = currentValue

    counterPlus.classList.remove('disabled')

    if (counterInput.value <= 1) {
      counterInput.value = 1
      counterMinus.classList.add('disabled')
    } else {
      counterMinus.classList.remove('disabled')
    }
  })
}

qtyItemsCart.value = 0

function getItemToCart() {
  if (counterInput && counterInput.value > 2) {
    qtyItemsCart.value += Number(counterInput.value)
  } else {
    qtyItemsCart.value++
  }

  costItemsCart.value = qtyItemsCart.value * 499

  if (qtyItemsCart.value > 99) {
    qtyItemsCart.textContent = 99 + ' Items' + '+'
  } else {
    qtyItemsCart.textContent = qtyItemsCart.value + ' Items'
  }

  if (costItemsCart.value > 9999) {
    costItemsCart.textContent = '$' + 9999 + '+';
  } else {
    costItemsCart.textContent = '$' + costItemsCart.value
  }
}