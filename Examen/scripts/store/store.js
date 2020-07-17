
const bookInitial = new Book('Война и мир', "Л.Н.Толстой", 1870, "Царская Россия", 907, 23);
const visitorInitial = new Visitor('Никита', 'Беженарь', '+37377871818');
const AllState = {
  books: {
    allBooks: [bookInitial],
    sortName: false,
    sortAuthorName: false,
    sortCountBooks: false,
    searchName: '',
    editBookId: 0,
  },
  visitors: {
    allVisitors: [visitorInitial],
    editVisitorId: 0,
  },
};
