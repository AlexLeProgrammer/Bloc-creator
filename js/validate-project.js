const boulderID = new URLSearchParams(window.location.search).get('id');

let filteredGrade = null;
let boulder = null;

function fillValues(_boulder) {
  boulder = _boulder;

  gradesInput(boulder.grade);

  document.querySelector('#boulder-name').innerText = boulder.name;
  document.querySelector('#setter').innerText = boulder.setter;
  document.querySelector('#proposed-grade').src = `images/grades/${boulder.grade}.svg`;

  document.querySelector('#cancel').href = `./boulder.html?id=${boulderID}`;
}

document.querySelector('#validate').addEventListener('click', () => {
  document.dispatchEvent(new CustomEvent('validate-project', {
    detail: {
      id: boulderID,
      grade: filteredGrade,
    }
  }));
});