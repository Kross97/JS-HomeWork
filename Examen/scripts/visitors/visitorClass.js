class Visitor {
  static visitorMaxId = 1;
  constructor(name = '', surname = '', phone = '#') {
    this.id = Visitor.visitorMaxId;
    this.fullName = name + ' ' + surname;
    this.phone = phone;
    this.statisticCount = 0;
    Visitor.visitorMaxId++;
  }
}
