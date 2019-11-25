let products;
let cart = [];
let container = document.querySelector('body#store main .container');
let data = [
  {
    name: 'Elegant Red Rose',
    image: 'product-elegantredrose.jpg',
    description:
      'Nam magna dolor, volutpat nec lorem ut, tempor lacinia risus. Vestibulum rutrum felis id lacus finibus consequat. Duis consequat sapien vel ipsum scelerisque, eget pellentesque enim facilisis. Vivamus lacinia neque libero, vitae condimentum dolor commodo eget. Vestibulum ullamcorper dolor nec lobortis pellentesque. Fusce nec aliquet lorem, eu ullamcorper nulla. Curabitur in turpis posuere, molestie justo ut, sodales lectus.',
    price: 60
  },
  {
    name: 'Elegant Red Rose',
    image: 'product-elegantredrose.jpg',
    description:
      'Nam magna dolor, volutpat nec lorem ut, tempor lacinia risus. Vestibulum rutrum felis id lacus finibus consequat. Duis consequat sapien vel ipsum scelerisque, eget pellentesque enim facilisis. Vivamus lacinia neque libero, vitae condimentum dolor commodo eget. Vestibulum ullamcorper dolor nec lobortis pellentesque. Fusce nec aliquet lorem, eu ullamcorper nulla. Curabitur in turpis posuere, molestie justo ut, sodales lectus.',
    price: 60
  },
  {
    name: 'Elegant Red Rose',
    image: 'product-elegantredrose.jpg',
    description:
      'Nam magna dolor, volutpat nec lorem ut, tempor lacinia risus. Vestibulum rutrum felis id lacus finibus consequat. Duis consequat sapien vel ipsum scelerisque, eget pellentesque enim facilisis. Vivamus lacinia neque libero, vitae condimentum dolor commodo eget. Vestibulum ullamcorper dolor nec lobortis pellentesque. Fusce nec aliquet lorem, eu ullamcorper nulla. Curabitur in turpis posuere, molestie justo ut, sodales lectus.',
    price: 60
  }
];

// Create a product card based on data above and add it into the website.
for (const { name, image, price } of data) {
  let card = elt(
    'article',
    { className: 'product' },
    elt('header', { className: 'product-name' }, elt('h2', null, name)),
    elt(
      'section',
      { className: 'product-image' },
      elt('img', { src: `images/${image}`, alt: name })
    ),
    elt('section', { className: 'product-price' }, `$${price}`),
    elt(
      'footer',
      { className: 'product-action' },
      elt(
        'section',
        { className: 'product-add-cart' },
        elt('button', { onclick: addToCart }, 'Add to cart')
      ),
      elt('section', { className: 'product-details' }, elt('button', null, 'Details'))
    )
  );

  container.appendChild(card);

  products = document.querySelectorAll('.product');
}

function addToCart(event) {
  let cartBtn = event.target;
  let card = cartBtn.closest('.product');
  let productIndex = Array.from(products).indexOf(card);

  cartBtn.onclick = null;

  cart = cart.concat(data[productIndex]);
  console.log('TCL: addToCart -> cart', cart);
}

/* ======================================================================================================== */

// document.body.addEventListener('click', () => console.log('Body clicked'));
