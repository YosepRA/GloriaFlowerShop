let cart = [
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
let cartItems = document.querySelector('.cart-items');

// Create row title.
let rowTitle = elt(
  'header',
  { className: 'row-title' },
  elt(
    'div',
    { className: 'product-checkbox' },
    elt('input', { type: 'checkbox', name: 'products', onchange: checkAll })
  ),
  elt('div', null, 'Product image'),
  elt('div', null, 'Product name'),
  elt('div', null, 'Price'),
  elt('div', null, 'Qty'),
  elt('div', null, 'Total'),
  elt('div', null, 'Delete')
);

cartItems.appendChild(rowTitle);

// Create cart products.
for (const { name, image, price } of cart) {
  let productRow = elt(
    'div',
    { className: 'cart-product' },
    elt(
      'div',
      { className: 'product-checkbox' },
      elt('input', { type: 'checkbox', name: 'products', onchange: productCheck })
    ),
    elt('div', { className: 'product-image' }, elt('img', { src: `images/${image}`, alt: name })),
    elt('div', { className: 'product-name' }, name),
    elt('div', { className: 'product-price' }, `$${price}`),
    elt(
      'div',
      { className: 'product-qty' },
      elt('input', {
        type: 'number',
        name: 'qty',
        id: 'qty',
        min: 1,
        value: '1',
        onchange: event => quantityChange(event, price)
      })
    ),
    elt('div', { className: 'product-total' }, `$${price}`),
    elt('div', { className: 'product-delete' }, elt('button', { onclick: deleteItem }, 'Delete'))
  );

  cartItems.appendChild(productRow);
}

let cartAction = elt(
  'footer',
  { className: 'cart-action' },
  elt('button', { className: 'action-checkout' }, 'Checkout'),
  elt('button', { className: 'action-deleteall', onclick: deleteAll }, 'Delete all')
);
cartItems.appendChild(cartAction);

function checkAll(event) {
  let checkbox = event.target;
  let allCheckbox = document.querySelectorAll('.cart-product .product-checkbox input');
  for (const box of allCheckbox) {
    box.checked = checkbox.checked;
  }
  syncGrandTotal();
}

function productCheck(event) {
  let headerCheckbox = document.querySelector('.row-title .product-checkbox input');
  let allCheckbox = document.querySelectorAll('.cart-product .product-checkbox input');

  if (Array.from(allCheckbox).every(checkbox => checkbox.checked == true)) {
    headerCheckbox.checked = true;
  } else {
    headerCheckbox.checked = false;
  }

  syncGrandTotal();
}

function quantityChange(event, price) {
  let amount = event.target.value;
  let totalSection = event.target.parentElement.nextElementSibling;

  totalSection.textContent = `$${price * amount}`;

  syncGrandTotal();
}

function deleteItem(event) {
  event.target.closest('.cart-product').remove();

  syncGrandTotal();
}

function deleteAll(event) {
  let products = document.querySelectorAll('.cart-product');
  for (const product of products) {
    product.remove();
  }

  syncGrandTotal();
}

function syncGrandTotal() {
  resetList();
  updateTotalList();
  addShippingCost();
  calculateGrandTotal();
}

function resetList() {
  let totalPrice = document.querySelector('.grand-total .total-price span');
  let productList = document.querySelector('.grand-total .product-list');
  // Reset product lists.
  for (const item of Array.from(productList.children)) {
    item.remove();
  }
  totalPrice.textContent = '0';
}

function updateTotalList() {
  let products = document.querySelectorAll('.cart-product');
  let productList = document.querySelector('.grand-total .product-list');

  // Update list.
  for (const product of products) {
    let checkbox = product.querySelector('.product-checkbox input');
    let productName = product.querySelector('.product-name').textContent;
    let productTotalPrice = product.querySelector('.product-total').textContent;

    if (checkbox.checked) {
      let listItem = elt(
        'div',
        { className: 'list-item' },
        elt('div', { className: 'item-name' }, productName),
        elt('div', { className: 'item-price' }, productTotalPrice)
      );

      productList.appendChild(listItem);
    }
  }
}

function addShippingCost() {
  let products = document.querySelectorAll('.cart-product');
  let productList = document.querySelector('.grand-total .product-list');
  let shippingCost = 10;
  // Decide whether or not to add shipping cost to calculation.
  if (
    Array.from(products).some(product => {
      let checkbox = product.querySelector('.product-checkbox input');
      return checkbox.checked == true;
    })
  ) {
    let listShipping = elt(
      'div',
      { className: 'list-item' },
      elt('div', { className: 'item-name' }, 'Shipping cost'),
      elt('div', { className: 'item-price' }, `$${shippingCost}`)
    );
    productList.appendChild(listShipping);
  }
}

function calculateGrandTotal() {
  let totalPrice = document.querySelector('.grand-total .total-price span');
  let productList = document.querySelector('.grand-total .product-list');

  // Grand total calculation.
  let itemPrice = Array.from(productList.querySelectorAll('.item-price'));
  // Creating a new array with elements taken off from items price.
  let priceList = itemPrice.map(item => Number(item.textContent.match(/\d+/)[0]));
  // Sum it all up.
  let total = priceList.reduce((a, c) => a + c, 0);
  totalPrice.textContent = `$${total}`;
}

/* ======================================================================================================== */
