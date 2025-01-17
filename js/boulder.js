const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const nameText = document.querySelector('#name');
const setterText = document.querySelector('#setter');
const dateText = document.querySelector('#date');
const gradeImg = document.querySelector('#grade');
const descText = document.querySelector('#desc');

let showHolds = true;
let boulder = null;

function fillValues(_boulder) {
  boulder = _boulder;

  nameText.innerText = boulder.name;
  setterText.innerText = boulder.setter;
  dateText.innerText = formatDate(boulder.date);
  gradeImg.src = `images/grades/${boulder.grade}.png`;
  descText.innerHTML = boulder.desc;

  document.querySelector('title').innerText = `${boulder.name} | Mémorial Phil`;

  document.querySelector('#edit').href = `./new-boulder.html?id=${id}`;

  drawWall(boulder.holds, showHolds);
}

document.querySelector('#open-menu').addEventListener('click', (e) => {
  setTimeout(() => {
    document.querySelector('#menu').style.display = 'block';
  }, 100);
});

document.addEventListener('click', (e) => {
  if (document.querySelector('#menu').style.display === 'block') {
    setTimeout(() => {
      document.querySelector('#menu').style.display = 'none';
    }, 100);
  }
});

document.querySelector('#wall').addEventListener('click', (e) => {
  if (document.querySelector('#menu').style.display === 'none') {
    showHolds = !showHolds;
    drawWall(boulder.holds, showHolds);
  }
});