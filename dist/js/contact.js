let form = document.querySelector('.contact-form form');
let email = form['email'];

email.addEventListener('input', () => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity('Please input a valid email address.');
  } else {
    email.setCustomValidity('');
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();
  notImplementedAlert('Contact submit');
  event.target.reset();
});
