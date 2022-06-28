if (sidebannersSlider) {
  new Swiper(sidebannersSlider, {
    speed: 400,
    slidesPerView: 1,
    spaceBetween: 10,
    width: 270,
    autoplay: {
      delay: 8000,
      disableOnInteraction: true,
    },
    pagination: {
      el: '.sidebanners__pagination',
      clickable: true,
    }
  });
}