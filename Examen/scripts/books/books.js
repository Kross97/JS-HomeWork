const blockBooks = document.body.querySelector('#booksList');

function createTableBooks() {
  blockBooks.innerHtml = '';
  const table = document.createElement('table');
  table.classList.add('table');
  const thead = createHeadTable();
  const tbody = createBodyTable();
  table.appendChild(thead);
  table.appendChild(tbody);
  blockBooks.replaceWith(table);
}

function createHeadTable() {
  const arrTitles = ['Id', 'Author', 'Year', 'Publisher', 'CountPages', 'CountBooks'];

  const thead = document.createElement('thead');
  const tr = document.createElement('tr');

  for (let i = 0; i < 6; i++) {
   const th = document.createElement('th');
   th.setAttribute('scope', 'col');
   th.textContent = arrTitles[i];
   tr.appendChild(th);
  }

  thead.appendChild(tr);
  return thead;
}

function createBodyTable() {
  const tbody = document.createElement('tbody');
  const { allBooks, sortName, searchName } = AllState.books;
  console.log('SEARCH', searchName);
  let proxyBooks = allBooks;
  if (sortName) {
    proxyBooks.sort((a, b) => a.name > b.name);
  }
  if (searchName !== '') {
    proxyBooks = proxyBooks.filter((el) => el.name.includes(searchName));
  }

  proxyBooks.map((book) => {
    const tr = createBookItem(book);
    tbody.appendChild(tr);
  });

  return tbody;
}

function createBookItem(book) {
  const tr = document.createElement('tr');
  const th = document.createElement('th');
  th.setAttribute('scope', 'row');
  th.textContent = book.id;
  tr.appendChild(th);

  const keysBook = Object.keys(book);

  for (let i=1; i < 6; i++) {
    const td = document.createElement('td');
    td.textContent = book[keysBook[i]];
    tr.appendChild(td);
  }
  return tr;
}

createTableBooks();
