const bouldersList = document.querySelector('#boulders');

let filteredGrade = null;

function listBoulders(boulders) {
  bouldersList.innerHTML = '';
  for (const boulder of boulders) {
    bouldersList.innerHTML += `<a href="boulder.html">
        <img src="images/grades/${boulder.grade}.png">
        <div>
            <p class="title">${boulder.name}</p>
            <p class="routesetter">${boulder.setter}</p>
        </div>
        <p class="date">${formatDate(boulder.date)}</p>
    </a>`;
  }
}

document.querySelector('#searchbar').addEventListener('input', (e) => {
  document.dispatchEvent(new CustomEvent('boulders-search', { detail: e.target.value }));
});

function filterGrades(grade) {
  // Change the filtered grade
  if (grade === filteredGrade) {
    filteredGrade = null;
  } else {
    filteredGrade = grade;
  }

  // Set opacity of the filter buttons
  const gradeButtons = document.querySelectorAll('#filter-grades button');
  for (let i = 0; i < gradeButtons.length; i++) {
    if (i === filteredGrade || filteredGrade === null) {
      gradeButtons[i].style.opacity = 1;
    } else {
      gradeButtons[i].style.opacity = .2;
    }
  }

  // Apply filter
  document.dispatchEvent(new CustomEvent('boulders-search', { detail: document.querySelector('#searchbar').value }));
}