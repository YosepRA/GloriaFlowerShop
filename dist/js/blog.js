let container = document.querySelector('main .container');

// Retrieving data from server.
retrieveJSON('data/blog.json').then(generateElements);

function generateElements(data) {
  // Generate elements.
  for (const { title, image, text } of data) {
    let fileName = title.toLowerCase().replace(/ /g, '-');
    let dom = elt(
      'article',
      { className: 'blog' },
      elt(
        'header',
        { className: 'blog-title' },
        elt('a', { href: `${fileName}.html` }, elt('h2', null, title))
      ),
      elt('section', { className: 'blog-image' }, elt('img', { src: `images/${image}` })),
      elt('section', { className: 'blog-text' }),
      elt(
        'footer',
        { className: 'blog-action' },
        elt('a', { href: `${fileName}.html` }, 'Read more')
      )
    );
    let blogText = dom.querySelector('.blog-text');
    blogText.innerHTML = `${text.substring(0, 500)}...`;
    blogText.prepend(document.createElement('hr'));

    container.appendChild(dom);
  }
}
