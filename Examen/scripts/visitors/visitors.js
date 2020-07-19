function createTableVisitors() {
  const blockVisitors = document.body.querySelector('#visitorsList');
  const newBlockVisitors = document.createElement('div');
  newBlockVisitors.setAttribute('id', 'visitorsList');

  const table = document.createElement('table');
  table.classList.add('table');
  const thead = createHeadTableVisitor();
  const tbody = createBodyTableVisitor();
  table.appendChild(thead);
  table.appendChild(tbody);
  newBlockVisitors.appendChild(table);
  blockVisitors.replaceWith(newBlockVisitors);
}

function createHeadTableVisitor() {
  const arrTitles = ['Id', 'Name', 'Phone', 'Remove', 'Edit'];
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');

  for(let i = 0; i < arrTitles.length ; i++) {
    const th = document.createElement('th');
    th.setAttribute('scope', 'col');
    th.textContent = arrTitles[i];
    tr.appendChild(th);
  }

  thead.appendChild(tr);
  return thead;
}

function createBodyTableVisitor() {
  const tbody = document.createElement('tbody');

  const { allVisitors, searchParam } = AllState.visitors;
  const { sortName, sortCount } = AllState.visitors.sorts;
  let proxyVisitors = [...allVisitors];

  if (sortName === 'name') {
    proxyVisitors.sort((a, b) => {
      if (a.fullName > b.fullName) {
        return 1;
      } else if (a.fullName < b.fullName) {
        return -1;
      } else {
        return 0;
      }
    });
  } else if (sortName === 'nameDesc') {
    proxyVisitors.sort((a, b) => {
      if (b.fullName > a.fullName) {
        return 1;
      } else if (b.fullName < a.fullName) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  if (sortCount === 'id') {
    proxyVisitors.sort((a, b) => a.id - b.id);
  } else if (sortCount === 'idDesc') {
    proxyVisitors.sort((a, b) => b.id - a.id);
  }

  if (searchParam !== '') {
    proxyVisitors = proxyVisitors.filter((vis) => vis.fullName.includes(searchParam) || vis.phone.includes(searchParam));
  }

  proxyVisitors.map((visitor) => {
    const tr = createVisitorItem(visitor);
    tbody.appendChild(tr);
  });

  return tbody;
}

function createVisitorItem(visitor) {
  const tr = document.createElement('tr');

  const th = document.createElement('th');
  th.setAttribute('scope', 'row');
  th.textContent = visitor.id;
  tr.appendChild(th);

  const keysVisitor = Object.keys(visitor);
  for(let i = 1; i < keysVisitor.length - 1 ; i++) {
    const td = document.createElement('td');
    td.textContent = visitor[keysVisitor[i]];
    tr.appendChild(td);
  }

  const btnRemoveVisitor = document.createElement('button');
  btnRemoveVisitor.addEventListener('click', () => {
    removeVisitor(visitor.id);
  });
  btnRemoveVisitor.textContent = 'x';
  btnRemoveVisitor.classList.add('btn');
  btnRemoveVisitor.classList.add('btn-success');
  const tdBtnRemove = document.createElement('td');

  const btnEditVisitor = document.createElement('button');
  btnEditVisitor.addEventListener('click', () => {
    setEditVisitor(visitor.id);
  });
  btnEditVisitor.textContent = 'e';
  btnEditVisitor.classList.add('btn');
  btnEditVisitor.classList.add('btn-success');
  const tdBtnEdit = document.createElement('td');

  tdBtnRemove.appendChild(btnRemoveVisitor);
  tdBtnEdit.appendChild(btnEditVisitor);

  tr.appendChild(tdBtnRemove);
  tr.appendChild(tdBtnEdit);
  return tr;
}

function removeVisitor(id) {
  const newAllvisitors = AllState.visitors.allVisitors.filter((vis) => vis.id !== id);
  const newListCards = AllState.cards.allCards.filter((card) => card.visitorId === id);
  AllState.cards.allCards = newListCards;
  AllState.visitors.allVisitors = newAllvisitors;
  createTableCards();
  createTableVisitors();
  createListsStatistics();
}

function setEditVisitor(id) {
  AllState.visitors.editVisitorId = id;
  toggleShowFormVisior();
}

createTableVisitors();
