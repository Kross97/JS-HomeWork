function createTableBooks() {
  const blockBooks = document.body.querySelector('#booksList');
  const newBlockBooks = document.createElement('div');
  newBlockBooks.setAttribute('id', 'booksList');

  const table = document.createElement('table');
  table.classList.add('table');
  const thead = createHeadTable();
  const tbody = createBodyTable();
  table.appendChild(thead);
  table.appendChild(tbody);

  newBlockBooks.appendChild(table);
  blockBooks.replaceWith(newBlockBooks);
}

function createHeadTable() {
  const arrTitles = ['Id', 'Name', 'Author', 'Year', 'Publisher', 'CountPages', 'CountBooks', 'Remove', 'Edit'];

  const thead = document.createElement('thead');
  const tr = document.createElement('tr');

  for (let i = 0; i < 9; i++) {
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
  const { allBooks, sortName, searchName, sortAuthorName, sortCountBooks } = AllState.books;

  let proxyBooks = allBooks;

  if (sortName) {
    proxyBooks.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  if (sortAuthorName) {
    proxyBooks.sort((a, b) => {
      if (a.nameAuthor > b.nameAuthor) {
        return 1;
      } else if (a.nameAuthor < b.nameAuthor) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  if (sortCountBooks) {
    proxyBooks.sort((a, b) => a.countBooks - b.countBooks);
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
  for (let i=1; i < 7; i++) {
    const td = document.createElement('td');
    td.textContent = book[keysBook[i]];
    tr.appendChild(td);
  }

  const btnRemoveBook = document.createElement('button');
  const tdBtnRemove = document.createElement('td');
  btnRemoveBook.textContent = 'x';
  btnRemoveBook.classList.add('btn');
  btnRemoveBook.classList.add('btn-info');
  btnRemoveBook.addEventListener('click', () => {
    removeBook(book.id);
  });
  tdBtnRemove.appendChild(btnRemoveBook);

  const btnEditBook = document.createElement('button');
  const tdBtnEdit = document.createElement('td');
  btnEditBook.textContent = 'e';
  btnEditBook.classList.add('btn');
  btnEditBook.classList.add('btn-info');
  btnEditBook.addEventListener('click', () => {
    setOnEditBook(book.id);
  });

  tdBtnEdit.appendChild(btnEditBook);

  tr.appendChild(tdBtnRemove);
  tr.appendChild(tdBtnEdit);
  return tr;
}

function removeBook(id) {
 const newListBooks = AllState.books.allBooks.filter((book) => book.id !== id);
 AllState.books.allBooks = newListBooks;
 createTableBooks();
}

const setOnEditBook = function (id) {
  if(AllState.books.editBookId !== id) {
    AllState.books.editBookId = id;
    toggleShowForm();
  }
}

createTableBooks();
