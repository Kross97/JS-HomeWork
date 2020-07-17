function addBook(event) {
  event.preventDefault();
 const { valid,  mes } = validate(event.target);
 const spanError = document.querySelector('#errorInfo');
 if (!valid) {
   spanError.style.display = 'block';
   spanError.textContent = mes;
   return;
 }

 spanError.style.display = 'none';
 const newBook = new Book(event.target.name.value,
   event.target.nameAuthor.value,
   Number(event.target.yearCreate.value),
   event.target.nameCreator.value,
   Number(event.target.countPages.value),
   Number(event.target.countBooks.value));

 if (AllState.books.editBookId !== 0) {
   const indexEditBook = AllState.books.allBooks.findIndex((b) => b.id === AllState.books.editBookId);
   const editBook = AllState.books.allBooks.find((b) => b.id === AllState.books.editBookId);
   newBook.id = editBook.id;
   AllState.books.allBooks[indexEditBook] = newBook;
 } else {
   AllState.books.allBooks.push(newBook);
 }


 createTableBooks();
 toggleShowForm();
}

function validate(form) {
const fullYear = new Date().getFullYear();
const {
  name: { value: name },
  nameAuthor: { value: nameAuthor },
  yearCreate: { value: yearCreate },
  nameCreator: { value: nameCreator },
  countPages: { value: countPages },
  countBooks: { value: countBooks },
} = form;

  if(name === '' || Number(name)) {
    return { valid: false, mes: 'имя некоректно!' };
  }

  if(nameAuthor === '' || Number(nameAuthor)) {
    return { valid: false, mes: 'имя автора некоректно!' };
  }

  if(yearCreate === '' || yearCreate > fullYear || yearCreate < 0 || !Number(yearCreate)) {
    return { valid: false, mes: 'год издания некоректен!' };
  }

  if(nameCreator === '' || Number(nameCreator)) {
    return { valid: false, mes: 'название издательства некоректно!' };
  }

  if(countPages < 0 || !Number(countPages)) {
    return { valid: false, mes: 'кол-во страниц некоректно!' };
  }

  if (countBooks < 0 || !Number(countBooks)) {
    return { valid: false, mes: 'кол-во книг некоректно' };
  }

  return { valid: true, mes: 'ништячело!!!' };
}
