class User {

    constructor(fName,lName) {
     this.name = fName;
     this.surname = lName;
    }

    getFullName() {
     return this.name + " " + this.surname;
    }

}


class Student extends User {

  constructor(name, surname, year = 2020) {
    super(name, surname);
    this._year = year;
  }

  getFullName() {
    return super.getFullName();
  }

  getCourse() {
    const courses = new Date().getFullYear() - this._year;
    if ( courses > 3) {
      return 'Закончил учебу давно!!';
    }

    return courses;
  }
}
