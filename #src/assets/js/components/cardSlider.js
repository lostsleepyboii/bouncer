if (cardSliderImg) {
  cardSliderThumbs.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('cardSlider__thumb')) {
      let src = e.target.querySelector('picture img').getAttribute('src')
      cardSliderImg.setAttribute('srcset', src)
    }
  })
  
  cardSliderThumb.forEach((thumb) => {
    thumb.addEventListener('mouseover', () => {
      cardSliderThumb.forEach((el) => {
        el.classList.remove('active')
      });
    
      thumb.classList.add('active')
    })
  });
}
