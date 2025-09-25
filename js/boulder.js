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
  document.querySelector('#validate-project').href = `./validate-project.html?id=${id}`;

  document.querySelector('.project-marker').style.display = boulder.project ? 'unset' : 'none';
  document.querySelector('#project').style.display = boulder.project ? 'unset' : 'none';
  document.querySelector('#validate-project').style.display = boulder.project ? 'block' : 'none';

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

// Add to ascents functionality
document.querySelector('#add-to-ascents').addEventListener('click', async (e) => {
  e.stopPropagation();

  if (typeof addAscent !== 'undefined') {
    const success = await addAscent(parseInt(id));
    if (success) {
      setTimeout(updateButtonStates, 100);
    }
  }
});

// Delete ascent functionality
document.querySelector('#delete-ascent').addEventListener('click', async (e) => {
  e.stopPropagation();

  if (typeof deleteAscent !== 'undefined') {
    const success = await deleteAscent(parseInt(id));

    if (success) {
      setTimeout(updateButtonStates, 100);
    }
  }
});

// Update button states based on current ascents
function updateButtonStates() {
  const addButton = document.querySelector('#add-to-ascents');
  const deleteButton = document.querySelector('#delete-ascent');

  if (!addButton || !deleteButton) {
    return;
  }

  if (typeof getUserAscents !== 'undefined' && id && boulder) {
    if (boulder.project) {
      // For projects, hide both ascent buttons
      addButton.style.display = 'none';
      deleteButton.style.display = 'none';
    } else {
      // For non-projects, check ascent status
      const ascents = getUserAscents();
      const hasAscent = ascents.some(ascent => ascent.id === parseInt(id));

      if (hasAscent) {
        // Boulder is in ascents - show delete button, hide add button
        addButton.style.display = 'none';
        deleteButton.style.display = 'block';
      } else {
        // Boulder is not in ascents - show add button, hide delete button  
        addButton.style.display = 'block';
        deleteButton.style.display = 'none';
      }
    }
  } else {
    // If no data available, hide both buttons
    addButton.style.display = 'none';
    deleteButton.style.display = 'none';
  }
}

// Check ascent status when boulder data is loaded
const originalFillValues = fillValues;
fillValues = function (_boulder) {
  originalFillValues(_boulder);
  // Call updateButtonStates after a short delay to ensure my-ascents.js is loaded
  setTimeout(updateButtonStates, 200);
};

// Listen for when ascents are loaded from Firebase
document.addEventListener('ascents-loaded', () => {
  setTimeout(updateButtonStates, 100);
});