let products = [];
let productsData;
let container = document.querySelector('body#store main .container');

fetch('data/product.json')
  .then(res => res.json())
  .then(data => {
    productsData = data;
    generateProducts(data);
  });

function generateProducts(data) {
  // Create a product card based on given data and add it into the website.
  for (const { name, image, price } of data) {
    let card = elt(
      'article',
      { className: 'product' },
      elt('header', { className: 'product-name' }, elt('h2', null, name)),
      elt(
        'section',
        { className: 'product-image' },
        elt('div', { className: 'image' }, elt('img', { src: `images/${image}`, alt: name })),
        elt('div', { className: 'price' }, `$${price}`)
      ),
      elt(
        'footer',
        { className: 'product-action' },
        elt(
          'section',
          { className: 'product-add-cart' },
          elt('button', isProductInCart(name), 'Add to cart')
        ),
        elt('section', { className: 'product-details' }, elt('button', null, 'Details'))
      )
    );

    container.appendChild(card);

    products = products.concat(card);
  }
}

function addToCart(event) {
  let cartBtn = event.target;
  let card = cartBtn.closest('.product');
  let productIndex = Array.from(products).indexOf(card);
  let product = productsData[productIndex];
  // Disable button UI.
  cartBtn.onclick = null;
  cartBtn.disabled = true;
  cartBtn.title = 'Product already exist in cart.';

  // Save it to storage.
  let cart = loadStorage('cart') || [];

  if (!cart.some(p => p.name === product.name)) {
    saveStorage('cart', cart.concat(productsData[productIndex]));
  } else {
    alert('Product already exists in cart.');
  }
}

// Used for determining whether to disable cart button when generating new product card element.
function isProductInCart(name) {
  let cartItems = loadStorage('cart') || [];
  return cartItems.some(p => p.name === name)
    ? { disabled: true, title: 'Product already exist in cart.' }
    : { onclick: addToCart };
}

/* ======================================================================================================== */
