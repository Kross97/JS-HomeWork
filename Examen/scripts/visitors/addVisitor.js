function addVisitor(event) {
 event.preventDefault();
 const spanError = document.querySelector('#errorInfoVisitor');
 const { valid, mes } = validateFormVisitors(event.target);
 if (!valid) {
   spanError.style.display = 'block';
   spanError.textContent = mes;
   return;
 }
 spanError.style.display = 'none';
 const newVisitor = new Visitor(
   event.target.name.value,
   event.target.surname.value,
   event.target.phone.value,
 );

 if (AllState.visitors.editVisitorId !== 0) {
   const idEditVisitors = AllState.visitors.editVisitorId;
   const indexVisitorEdit = AllState.visitors.allVisitors.findIndex((vis) => vis.id === idEditVisitors);
   const visitorOnEdit = AllState.visitors.allVisitors.find((vis) => vis.id === idEditVisitors);
   newVisitor.id = visitorOnEdit.id;
   AllState.visitors.allVisitors[indexVisitorEdit] = newVisitor;
 } else {
   AllState.visitors.allVisitors.push(newVisitor);
 }

 createTableVisitors();
 toggleShowFormVisior();
}

function validateFormVisitors(form) {
  const {
    name: { value: name },
    surname: { value: surname },
    phone: { value: phone },
  } = form;

  if(name === '' || Number(name)) {
    return { valid: false, mes: 'имя некоректно!' };
  }

  if(surname === '' || Number(surname)) {
    return { valid: false, mes: 'фамилия некоректна!' };
  }

  const regExpPhone = /^\d[^a-z!@#$%^&*()"№;:?]+/gi;
  if(!regExpPhone.test(phone)) {
    return { valid: false, mes: 'телефон некоректен!' };
  }

  return { valid: true, mes: 'ништячеллоо!!' };
}
