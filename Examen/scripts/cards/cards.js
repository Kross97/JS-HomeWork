function createTableCards() {
  const blockCards = document.body.querySelector('#cardsList');
  const newBlockCards = document.createElement('div');
  newBlockCards.setAttribute('id', 'cardsList');

  const table = document.createElement('table');
  table.classList.add('table');
  const thead = createHeadTableCards();
  const tbody = createBodyTableCards();
  table.appendChild(thead);
  table.appendChild(tbody);

  newBlockCards.appendChild(table);
  blockCards.replaceWith(newBlockCards);
}

function createHeadTableCards() {
  const arrTitles = ['Id', 'Name Visitor', 'Name Book', 'Data Start', 'Data End'];

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

 function createBodyTableCards() {
  const tbody = document.createElement('tbody');
  const { allCards } = AllState.cards;
  if (AllState.books.allBooks.length === 0 || AllState.visitors.allVisitors.length === 0) {
    return tbody;
  }
  allCards.map((card) => {
    const tr = createCardItem(card);
    if (tr) {
      tbody.appendChild(tr);  
    }
  });

  return tbody;
}


function createCardItem(cardData) {

  const card = Object.assign({}, cardData);
  const bookCard = AllState.books.allBooks.find((book) => book.id === card.bookId) || 0;
  const visitorCard = AllState.visitors.allVisitors.find((vis) => vis.id === card.visitorId) || 0;
  if(bookCard === 0 || visitorCard === 0) {
    return null;
  }

  const tr = document.createElement('tr');
  const th = document.createElement('th');
  th.setAttribute('scope', 'row');
  th.textContent = cardData.id;
  tr.appendChild(th);

  card.bookId = bookCard.name;
  card.visitorId = visitorCard.fullName;
  const keysCard = Object.keys(card);

  for (let i=1; i < keysCard.length; i++) {
    const td = document.createElement('td');
    if (keysCard[i] === 'endData') {
      if (card[keysCard[i]]) {
        td.textContent = card[keysCard[i]];
      } else {
        const btnReturnBook = document.createElement('button');
        btnReturnBook.textContent = 'return';
        btnReturnBook.classList.add('btn');
        btnReturnBook.classList.add('btn-warning');
        btnReturnBook.addEventListener('click', () => {
          returnBook(card.id);
        });
        td.appendChild(btnReturnBook);
      }
    }
    else if (keysCard[i] === 'startData') {
      td.textContent = card[keysCard[i]];
    } else {
        td.textContent = card[keysCard[i]];
    }
    tr.appendChild(td);
  }

  return tr;
}

function returnBook(cardId) {
  const cardIndex = AllState.cards.allCards.findIndex((card) => card.id === cardId);
  const card = AllState.cards.allCards.find((card) => card.id === cardId);
  const bookCard = AllState.books.allBooks.find((book) => book.id === card.bookId);
  const bookCardIndex = AllState.books.allBooks.findIndex((book) => book.id === card.bookId);

  const dataCard = new Date();
  const dataReturnCard = `${dataCard.getFullYear()}/${dataCard.getMonth()}/${dataCard.getDate()} ${dataCard.getHours()}:${dataCard.getMinutes()}:${dataCard.getSeconds()}`;

  bookCard.countBooks++;
  card.endData = dataReturnCard;
  AllState.cards.allCards[cardIndex] = card;
  AllState.books.allBooks[bookCardIndex] = bookCard;
  createTableCards();
  createTableBooks();
}

createTableCards();
