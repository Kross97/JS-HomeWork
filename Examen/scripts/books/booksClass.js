class Book {

  static countMaxId = 1;

  constructor(name = '', nameAuthor = '', yearCreate = 2000, nameCreator = '', countPages = 1, countBooks = 1) {
    this.id = Book.countMaxId;
    this.name = name;
    this.nameAuthor = nameAuthor;
    this.yearCreate = yearCreate;
    this.nameCreator = nameCreator;
    this.countPages = countPages;
    this.countBooks = countBooks;
    this.statisticCount = 0;
    Book.countMaxId++;
  }

}
