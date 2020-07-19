function addCard(event) {
  event.preventDefault();
  const { valid, mes } = validCard(event.target);
  if(!valid) {
    errorInfoCard.style.display = 'block';
    errorInfoCard.textContent = mes;
    return;
  }
  errorInfoCard.style.display = 'none';

  const {
    selectBooks: { value: books },
    selectVisitors: { value: visitors },
  } = event.target;

  const bookId = AllState.books.allBooks.find((book) => book.name === books).id;
  const visitor = AllState.visitors.allVisitors.find((vis) => vis.fullName === visitors);
  const visitorIndex = AllState.visitors.allVisitors.findIndex((vis) => vis.fullName === visitors);

  visitor.statisticCount++;
  AllState.visitors.allVisitors[visitorIndex] = visitor;

  const indexEditBook = AllState.books.allBooks.findIndex((b) => b.id === bookId);
  const editBook = AllState.books.allBooks.find((b) => b.id === bookId);
  editBook.countBooks--;
  editBook.statisticCount++;
  AllState.books.allBooks[indexEditBook] = editBook;

  const dataCard = new Date();
  const dataNewCard = `${dataCard.getFullYear()}/${dataCard.getMonth()}/${dataCard.getDate()} ${dataCard.getHours()}:${dataCard.getMinutes()}:${dataCard.getSeconds()}`;
  const newCard = new Card(visitor.id, bookId, dataNewCard);
  AllState.cards.allCards.push(newCard);

  createListsStatistics();
  createTableBooks();
  createTableCards();
  toggleShowFormCard();
}

function validCard(form) {
  const {
    selectBooks: { value: books },
    selectVisitors: { value: visitors },
  } = form;

  if (books === 'Нет книг в наличии') {
     return { valid: false, mes: 'Нет книг в наличии' };
  }

  if (visitors === 'Нет посетителей') {
    return { valid: false, mes: 'Нет посетителей' };
  }

  return { valid: true, mes: 'юхххууу!!!' };
}
