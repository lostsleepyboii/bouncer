const cart = document.getElementById('cart')

if (cart) {
  const subTotalPriceWrapper = document.getElementById('subtotalPrice'),
        totalPriceWrapper = document.getElementById('totalPrice');
  
  const ACTION = {
    CLEAR: 'clear',
    PLUS: 'plus',
    MINUS: 'minus'
  }
  
  const getItemSubTotalPrice = (input) => Number(input.value) * Number(input.dataset.price);
  
  let totalPrice = 0,
      shippingFee = 20,
      subtotalPrice = 0;
  
  const init = () => {
    [...document.querySelectorAll('.cartProduct')].forEach((cartItem) => {
      subtotalPrice += getItemSubTotalPrice(cartItem.querySelector('.stepper__input'))
      totalPrice = subtotalPrice + shippingFee
    });
  
    setSubTotalPrice(subtotalPrice)
    setTotalPrice(totalPrice)
  }
  
  const setSubTotalPrice = (value) => {
    subTotalPriceWrapper.textContent = '$' + value;
    subTotalPriceWrapper.dataset.value = value;
  }
  
  const setTotalPrice = (value) => {
    totalPriceWrapper.textContent = '$' + value;
    totalPriceWrapper.dataset.value = value;
  }
  
  const calculateSeparateItem = (cartItem, action) => {
    const input = cartItem.querySelector('.stepper__input'),
          plus = cartItem.querySelector('.stepper__btn--plus')
  
    switch (action) {
      case ACTION.CLEAR:
        cartItem.remove()
        setSubTotalPrice(subTotalPriceWrapper.textContent = Number(subTotalPriceWrapper.dataset.value) - getItemSubTotalPrice(input))
        setTotalPrice(totalPriceWrapper.textContent = Number(subTotalPriceWrapper.dataset.value) + shippingFee)
        break
      case ACTION.PLUS:
        input.value++
        setSubTotalPrice(subTotalPriceWrapper.textContent = Number(subTotalPriceWrapper.dataset.value) + Number(input.dataset.price))
        setTotalPrice(totalPriceWrapper.textContent = Number(subTotalPriceWrapper.dataset.value) + shippingFee)
        break
      case ACTION.MINUS:
        input.value--
        setSubTotalPrice(subTotalPriceWrapper.textContent = Number(subTotalPriceWrapper.dataset.value) - Number(input.dataset.price))
        setTotalPrice(totalPriceWrapper.textContent = Number(subTotalPriceWrapper.dataset.value) + Number(shippingFee))
        break
    }
  
    if (input.value > 99998) {
      input.value = 99999;
      plus.classList.add('disabled')
    } else {
      plus.classList.remove('disabled')
    }
  
    if (input.value <= 0) {
      cartItem.remove()
    }
  
    cartItem.querySelector('.cartProduct__price').textContent = '$' + getItemSubTotalPrice(input)
  }
  
  cart.addEventListener('click', (event) => {
    if (event.target.classList.contains('cartProduct__clear')) {
      calculateSeparateItem(
        event.target.closest('.cartProduct'),
        ACTION.CLEAR
      )
    }
    if (event.target.classList.contains('stepper__btn--minus')) {
      calculateSeparateItem(
        event.target.closest('.cartProduct'),
        ACTION.MINUS
      )
    }
    if (event.target.classList.contains('stepper__btn--plus')) {
      calculateSeparateItem(
        event.target.closest('.cartProduct'),
        ACTION.PLUS
      )
    }
  })
  
  init();  
}