class Card {

  static cardMaxId = 1;
  constructor(visitorId, bookId, startData) {
   this.id = Card.cardMaxId;
   this.visitorId = visitorId;
   this.bookId = bookId;
   this.startData = startData;
   this.endData = null;
   Card.cardMaxId++;
  }

}
