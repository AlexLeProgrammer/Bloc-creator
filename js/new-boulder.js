const DESCRIPTIONS = [
  'Sélectionnez les prises que vous allez utiliser',
  'Sélectionnez le start (1-2 prises)',
  'Selectionnez le top (1 prise)',
  'Entrez les informations suivantes'
];

let boulder = {};
let step = 1;
let filteredGrade = null;

let boulderPositions = {};
let startsSelected = [];
let topSelected = null;

document.addEventListener('loaded-images', () => {
  drawWall(boulder);
});

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const posX = (e.clientX - rect.left) * canvas.width / rect.width / zoom - x;
  const posY = (e.clientY - rect.top) * canvas.height / rect.height / zoom - y;

  if (step === 1) {
    for (let i in Object.values(holdsPositions)) {
      const pos = Object.values(holdsPositions)[i];
      if (posX > pos.left && posX < pos.right && posY > pos.top && posY < pos.bottom) {
        const hold = Object.keys(holdsPositions)[i];
        if (boulder.hasOwnProperty(hold)) {
          delete boulder[hold];
          delete boulderPositions[hold];
        } else {
          boulder[hold] = 0;
          boulderPositions[hold] = pos;
        }
        drawWall(boulder);
        break;
      }
    }
  }

  if (step !== 1) {
    const value = step === 2 ? 1 : 2;

    for (let i in Object.values(boulderPositions)) {
      const pos = Object.values(boulderPositions)[i];
      if (posX > pos.left && posX < pos.right && posY > pos.top && posY < pos.bottom) {
        const hold = Object.keys(boulderPositions)[i];
        if (step === 3 && boulder[hold] === 1) {
          return;
        }
        if (boulder[hold] === value) {
          boulder[hold] = 0;
          if (step === 2) {
            startsSelected.splice(startsSelected.indexOf(hold), 1);
          }
          if (step === 3) {
            topSelected = null;
          }
        } else if (startsSelected.length >= (Object.keys(boulder).length > 2 ? 2 : 1) && step === 2) {
          boulder[startsSelected[0]] = 0;
          startsSelected.shift();
          boulder[hold] = value;
          startsSelected.push(hold);
        } else if (topSelected !== null && step === 3) {
          boulder[topSelected] = 0;
          boulder[hold] = value;
          topSelected = hold;
        } else {
          boulder[hold] = value;
          if (step === 2) {
            startsSelected.push(hold);
          }
          if (step === 3) {
            topSelected = hold;
          }
        }
        drawWall(boulder, false);
        break;
      }
    }
  }
});

document.querySelector('#next').addEventListener('click', (e) => {
  document.querySelector('#error').style.display = 'none';
  if (step === 1 && Object.keys(boulder).length < 2) {
    document.querySelector('#error').innerText = 'Sélectionnez au moins 2 prises';
    document.querySelector('#error').style.display = 'block';
    return;
  }
  if (step === 2 && startsSelected.length === 0) {
    document.querySelector('#error').innerText = 'Sélectionnez au moins 1 start';
    document.querySelector('#error').style.display = 'block';
    return;
  }
  if (step === 3 && topSelected === null) {
    document.querySelector('#error').innerText = 'Sélectionnez un top';
    document.querySelector('#error').style.display = 'block';
    return;
  }
  if (step === 4 && document.querySelector('#name').value === '') {
    document.querySelector('#error').innerText = 'Entrez le nom du bloc';
    document.querySelector('#error').style.display = 'block';
    return;
  }
  if (step === 4 && document.querySelector('#setter').value === '') {
    document.querySelector('#error').innerText = 'Entrez le nom du monteur';
    document.querySelector('#error').style.display = 'block';
    return;
  }
  if (step === 4 && filteredGrade === null) {
    document.querySelector('#error').innerText = 'Entrez la cotation du bloc';
    document.querySelector('#error').style.display = 'block';
    return;
  }
  step++;
  document.querySelector('#step').innerText = `${step} / 4`;
  document.querySelector('#step-desc').innerText = DESCRIPTIONS[step - 1];
  if (step === 2) {
    drawWall(boulder, false);
  }
  if (step === 4) {
    document.querySelector('#wall').style.display = 'none';
    document.querySelector('#fields').style.display = 'block';
    document.querySelector('#next').innerText = 'Publier';
  }
});