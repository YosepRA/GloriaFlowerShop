let main = document.querySelector('main');
let blogTitle = fileNameFromURI(document.documentURI);

// Retrieving data from server.
retrieveJSON('data/blog.json').then(generateElements);

function generateElements(data) {
  // Finding blog entry based on file name string.
  let { title, image, postedDate, tags, text } = data.find(
    ({ title }) => dashedText(title) === blogTitle
  );
  let blogIndex = data.findIndex(p => p.title === title);

  // Create breadcrumb.
  createBreadcrumb(title);

  // Generating page elements.
  let pageDOM = elt(
    'div',
    { className: 'container' },
    elt('header', { className: 'blog-title' }, elt('h2', null, title)),
    elt(
      'section',
      { className: 'blog-info' },
      elt('div', { className: 'info-image' }, elt('img', { src: `images/${image}`, alt: title })),
      elt('div', { className: 'info-date' }, `Date posted: ${new Date(postedDate).toDateString()}`),
      elt('div', { className: 'info-tag' }, `Tag: ${tags.join(', ')}`)
    ),
    elt('section', { className: 'blog-text' }),
    elt(
      'section',
      { className: 'blog-traverse' },
      elt(
        'a',
        {
          href: `${dashedText(data[blogIndex - 1] ? data[blogIndex - 1].title : 'blog')}.html`,
          className: 'traverse-btn prev'
        },
        'Prev post'
      ),
      elt(
        'a',
        {
          href: `${dashedText(data[blogIndex + 1] ? data[blogIndex + 1].title : 'blog')}.html`,
          className: 'traverse-btn next'
        },
        'Next post'
      )
    )
  );

  pageDOM.querySelector('.blog-text').innerHTML = text;

  main.appendChild(pageDOM);
}

// Retrieve file name from document's URI.
function fileNameFromURI(uri) {
  let match = uri.match(/([\w-]*).html/);
  return match[1];
}

function dashedText(text) {
  return text.toLowerCase().replace(/ /g, '-');
}

function createBreadcrumb(title) {
  let crumbContainer = document.querySelector('.breadcrumb').closest('.container');
  let dashedTitle = dashedText(title);
  // let trimmed = breadcrumb.replace(/[ \n]/g, '');
  // let parts = trimmed.match(/(\w+-*)+/g);
  let dom = elt(
    'div',
    { className: 'breadcrumb' },
    ' / ',
    elt('a', { className: 'breadcrumb-link', href: 'index.html' }, 'Home'),
    ' / ',
    elt('a', { className: 'breadcrumb-link', href: 'blog.html' }, 'TipsTricks'),
    ' / ',
    elt('a', { className: 'breadcrumb-link', href: `${dashedTitle}.html` }, dashedTitle)
  );

  crumbContainer.replaceChild(dom, document.querySelector('.breadcrumb'));
}
