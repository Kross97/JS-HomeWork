function createListsStatistics() {
   createListBooks();
   createListVisitors();
}


function createListBooks() {
  const oldUl = document.querySelector('#listBooks');
  const newUl = document.createElement('ul');
  newUl.setAttribute('id', 'listBooks');
  newUl.classList.add('list-group');

  const { allBooks } = AllState.books;

  let proxyAllBooks = [...allBooks];

  proxyAllBooks = proxyAllBooks.sort((a, b) => b.statisticCount - a.statisticCount).slice(0, 4);

  const liBooks = document.createElement('li');
  liBooks.classList.add('list-group-item');
  liBooks.classList.add('active');
  liBooks.textContent = '5-ка самых популярных книг';
  newUl.appendChild(liBooks);

  proxyAllBooks.map((book, i) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.textContent = `Книга: ${book.name}, Автор: ${book.nameAuthor}`;
    newUl.appendChild(li);
  });

  oldUl.replaceWith(newUl);
}

function createListVisitors() {
  const oldUl = document.querySelector('#listVisitors');
  const newUl = document.createElement('ul');
  newUl.setAttribute('id', 'listVisitors');
  newUl.classList.add('list-group');

  const { allVisitors } = AllState.visitors;

  let proxyAllVisitors = [...allVisitors];

  proxyAllVisitors = proxyAllVisitors.sort((a, b) => b.statisticCount - a.statisticCount).slice(0, 4);

  const liVisitors = document.createElement('li');
  liVisitors.classList.add('list-group-item');
  liVisitors.classList.add('active');
  liVisitors.textContent = '5-ка самых популярных посетителей';
  newUl.appendChild(liVisitors);

  proxyAllVisitors.map((vis, i) => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.textContent = `Имя: ${vis.fullName}, Телефон: ${vis.phone}`;
    newUl.appendChild(li);
  });

  oldUl.replaceWith(newUl);
}
