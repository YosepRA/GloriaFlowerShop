window.addEventListener('DOMContentLoaded', () => {
  fetch('data/product.json')
    .then(response => response.json())
    .then(data => {
      console.log('Data received!');
      for (const { name, price } of data) console.log(`Name: ${name} and the price is ${price}`);
    });
});

function dom(element, attributes, parent) {
  let el = document.createElement(element);
  for (const attr of Object.keys(attributes)) {
    el.setAttribute(attr, attributes[attr]);
  }
  parent.appendChild(el);
}
