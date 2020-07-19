function toggleShowFormVisior() {
  if(AllState.visitors.editVisitorId !== 0) {
    btnAddVisitor.textContent = 'Изменить';
    const idEditVisitor = AllState.visitors.editVisitorId;
    const visitorOnEdit = AllState.visitors.allVisitors.find((visitor) => visitor.id === idEditVisitor);
    const [name, surname] = visitorOnEdit.fullName.split(' ');
    formAddVisitor.name.value = name;
    formAddVisitor.surname.value = surname;
    formAddVisitor.phone.value = visitorOnEdit.phone;

  } else {
    btnAddVisitor.textContent = 'Добавить';
    formAddVisitor.name.value = '';
    formAddVisitor.surname.value = '';
    formAddVisitor.phone.value = '';
  }

  const displayForm = modalVisitors.style.display;
  if (displayForm === 'none') {
    modalVisitors.style.display = 'block';
  } else {
    AllState.visitors.editVisitorId = 0;
    modalVisitors.style.display = 'none';
  }
}

function toggleShowForm() {
  if(AllState.books.editBookId !== 0) {
    btnAddBook.textContent = 'Изменить';
    const idEditBook = AllState.books.editBookId;
    const bookOnEdit = AllState.books.allBooks.find((book) => book.id === idEditBook);
    formAddBook.name.value = bookOnEdit.name;
    formAddBook.nameAuthor.value = bookOnEdit.nameAuthor;
    formAddBook.yearCreate.value = bookOnEdit.yearCreate;
    formAddBook.nameCreator.value = bookOnEdit.nameCreator;
    formAddBook.countPages.value = bookOnEdit.countPages;
    formAddBook.countBooks.value = bookOnEdit.countBooks;
  } else {
    btnAddBook.textContent = 'Добавить';
    formAddBook.name.value = '';
    formAddBook.nameAuthor.value = '';
    formAddBook.yearCreate.value = '';
    formAddBook.nameCreator.value = '';
    formAddBook.countPages.value = '';
    formAddBook.countBooks.value = '';
  }

  const displayForm = modalBooks.style.display;
  if (displayForm === 'none') {
    modalBooks.style.display = 'block';
  } else {
    AllState.books.editBookId = 0;
    modalBooks.style.display = 'none';
  }
}

function toggleShowFormCard() {
  const displayForm = modalCards.style.display;
  if (displayForm === 'none') {
    modalCards.style.display = 'block';
    createSelectBooks();
    createSelectVisitors();
  } else {
    modalCards.style.display = 'none';
  }
}

function createSelectBooks() {
  const selectBooks = document.querySelector('#selectBooks');
  const newSelectBooks = document.createElement('select');
  newSelectBooks.setAttribute('id', 'selectBooks');
  newSelectBooks.classList.add('form-control');
  const books = AllState.books.allBooks;

  const booksFiltered = books.filter((b) => b.countBooks > 0);

  if (booksFiltered.length === 0 ) {
    const option = document.createElement('option');
    option.textContent = 'Нет книг в наличии';
    newSelectBooks.appendChild(option);
    newSelectBooks.disabled = true;
    selectBooks.replaceWith(newSelectBooks);
    return;
  }

  booksFiltered.map((book) => {
    const option = document.createElement('option');
    option.textContent = book.name;
    newSelectBooks.appendChild(option);
  });

   selectBooks.replaceWith(newSelectBooks);
}

function createSelectVisitors() {
  const selectVisitors = document.querySelector('#selectVisitors');
  const newSelectVisitors = document.createElement('select');
  newSelectVisitors.setAttribute('id', 'selectVisitors');
  newSelectVisitors.classList.add('form-control');
  const visitors = AllState.visitors.allVisitors;

  if (visitors.length === 0 ) {
    const option = document.createElement('option');
    option.textContent = 'Нет посетителей';
    newSelectVisitors.appendChild(option);
    newSelectVisitors.disabled = true;
    selectVisitors.replaceWith(newSelectVisitors);
    return;
  }

  visitors.map((visitor) => {
    const option = document.createElement('option');
    option.textContent = visitor.fullName;
    newSelectVisitors.appendChild(option);
  });

   selectVisitors.replaceWith(newSelectVisitors);
}
