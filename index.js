// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = document.querySelector('.nameInput');
const jobInput = document.querySelector('.jobInput');
//куда будут заноситься изменения
let titleName = document.querySelector('.titleName');
let titleJob = document.querySelector('.titleJob')


// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
// evt.preventDefault - убирает перезагрузку страницы
function formSubmitHandler (evt) {
  evt.preventDefault();

  let nameValue = nameInput.value;
  let jobValue = jobInput.value;

  console.log(nameValue, jobValue);

  //будут меняться в профиле
  titleName.textContent = nameValue;
  titleJob.textContent = jobValue;

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
