let navbar = document.querySelector('nav.navbar');
let scrollPos = 0;
let bio = document.querySelector('.bio');
let action = document.querySelector('.action');

window.addEventListener('scroll', () => {
  // Toggle navbar's visibility.
  if (scrollY > scrollPos) navbar.classList.add('hide');
  else navbar.classList.remove('hide');
  scrollPos = scrollY;

  // Bio and Action transition.
  if (
    document.body.id === 'home' &&
    (!bio.className.includes('show') || !action.className.includes('show'))
  ) {
    // If it's home page and the elements still hidden, then check for scroll.
    if (pageYOffset + innerHeight >= 717 && !bio.className.includes('show')) {
      bio.classList.add('show');
    } else if (pageYOffset + innerHeight >= 1110 && !action.className.includes('show')) {
      action.classList.add('show');
    }
  }
});

function elt(type, props, ...children) {
  let dom = document.createElement(type);
  if (props) Object.assign(dom, props);

  for (const child of children) {
    if (typeof child !== 'string') dom.appendChild(child);
    else dom.appendChild(document.createTextNode(child));
  }
  return dom;
}

// LOCAL STORAGE
// Local storage save.
function saveStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  return 'Data saved.';
}

// Local storage load.
function loadStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Remove all from storage.
function removeStorage(key) {
  localStorage.removeItem(key);
  return 'Data removed.';
}

// Fetching and parsing as JSON object.
function retrieveJSON(path) {
  return new Promise((resolve, reject) => {
    fetch(path)
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

function notImplementedAlert(name) {
  alert(`I'm sorry. '${name}' functionality hasn't been implemented.`);
}
