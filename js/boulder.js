const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const nameText = document.querySelector('#name');
const setterText = document.querySelector('#setter');
const dateText = document.querySelector('#date');
const gradeImg = document.querySelector('#grade');
const descText = document.querySelector('#desc');

function fillValues(boulder) {
  nameText.innerText = boulder.name;
  setterText.innerText = boulder.setter;
  dateText.innerText = formatDate(boulder.date);
  gradeImg.src = `images/grades/${boulder.grade}.png`;
  descText.innerHTML = boulder.desc;
}