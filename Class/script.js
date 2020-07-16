class Worker {


  constructor(name = '', surname = '', rate = 1, days = 0) {
    this._name = name;
    this._surname = surname;
    this._rate = rate;
    this._days = days;
  }

  set rate(value) {
    if (value < 0) {
      this._rate = 0;
      return;
    }

    this._rate = value;
  }

  get rate() {
    return this._rate;
  }

  set days(value) {
    if (value < 0) {
      this._days = 0;
      return;
    }

    this._days = value;
  }

  get days() {
    return this._days;
  }

  addOneWorkDay() {
    this._days = this._days + 1;
  }

  getSalary() {
    return this._rate * this._days;
  }

  getFullName() {
    return `${this._name} ${this._surname}`.toUpperCase();
  }
}
