if (slider) {
  new Swiper('.swiper-container', {
    speed: 800,
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay: {
      delay: 8000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}