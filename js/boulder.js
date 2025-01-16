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

  document.querySelector('title').innerText = boulder.name;

  drawWall({
    "g31": 2,
    "j30": 0,
    "f22": 0,
    "l22": 0,
    "h18": 0,
    "h12": 0,
    "o15": 0,
    "v11": 0,
    "r6": 0,
    "l5": 0,
    "p1": 1,
    "s1": 1,
  });
}