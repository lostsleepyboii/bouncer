const loadMore = document.querySelector('.products__more')

let quantityProducts = 8
let dataLength = ''

if (loadMore) {
  const fetchProducts = (quantity = 8) => {
    fetch('products.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dataLength = data.length;
      productsListGrid.innerHTML = '';
      for (let i = 0; i < data.length; i++) {
        if (i < quantity) {
          productsListGrid.innerHTML += `
            <article class="products__item">
              <div class="products__top">
                <div class="products__overlay overlay">
                  <button class="overlay__icon__wrapper" aria-label="Add To Wishlist">
                    <svg class="overlay__icon overlay__icon--heart">
                      <use href="images/icons/sprite.svg#heart" />
                    </svg>
                  </button>
      
                  <button class="overlay__icon__wrapper btn--cart" aria-label="Add To Cart" onclick="getItemToCart()">
                    <svg class="overlay__icon">
                      <use href="images/icons/sprite.svg#cart-2" />
                    </svg>
                  </button>
                </div>
                
                <picture class="products__img">
                  <source data-srcset="${data[i].imagewebp}" srcset="${data[i].imagewebp}" type="image/webp">
                  <img class="lazy" data-src="${data[i].image}" src="${data[i].image}" alt="${data[i].title}" width="236"
                    height="153">
                </picture>
              </div>
      
              <div class="products__content">
                <a href="card.html"><h3 class="products__name">${data[i].title}</h3></a>
                <div class="products__rate">★ ★ ★ ★ ★</div>
                <div class="products__prices">
                  <span class="products__price">$${data[i].price}</span>
                  <span class="products__price products__price--old">$599</span>
                </div>
              </div>
            </article>
          `;
        }
      }
    });
  };
  
  fetchProducts(quantityProducts)
  
  loadMore.addEventListener('click', (e) => {
    quantityProducts = quantityProducts + 4;
    fetchProducts(quantityProducts);
  
    if (quantityProducts == dataLength) {
      loadMore.style.display = 'none';
    } else {
      loadMore.style.display = 'block';
    }
  });
}
