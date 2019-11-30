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
