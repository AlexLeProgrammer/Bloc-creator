const bouldersList = document.querySelector('#boulders');

let filteredGrade = null;

function listBoulders(boulders) {
  bouldersList.innerHTML = '';
  for (let boulder of boulders) {
    // Check if this boulder is in user's ascents
    const userAscents = window.getUserAscents ? window.getUserAscents() : [];
    const isCompleted = userAscents.some(ascent => ascent.id === boulder.id);
    const completedClass = isCompleted ? 'completed-ascent' : '';

    bouldersList.innerHTML += `<a href="boulder.html?id=${boulder.id}"${completedClass ? ` class="${completedClass}"` : ''}>
        <img src="images/grades/${boulder.grade}.png">
        <img class="project-marker" src="images/projectMarker.png" ${boulder.project ? '' : 'style="display: none"'}>
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

// Listen for when ascents are loaded from Firebase to refresh the boulder list
document.addEventListener('ascents-loaded', () => {
  // Refresh the boulder list to show updated completion status
  if (window.boulders && typeof listBoulders !== 'undefined') {
    // Re-apply current search/filter
    document.dispatchEvent(new CustomEvent('boulders-search', { detail: document.querySelector('#searchbar').value }));
  }
});
