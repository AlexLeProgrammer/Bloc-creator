const bouldersList = document.querySelector('#boulders');

let filteredGrade = null;

function listBoulders(boulders) {
  bouldersList.innerHTML = '';
  for (let boulder of boulders) {
    bouldersList.innerHTML += `<a href="boulder.html?id=${boulder.id}">
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
  gradesInput(grade);

  // Apply filter
  document.dispatchEvent(new CustomEvent('boulders-search', { detail: document.querySelector('#searchbar').value }));
}