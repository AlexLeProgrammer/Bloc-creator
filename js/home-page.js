const bouldersList = document.querySelector('#boulders');

function listBoulders(boulders) {
  bouldersList.innerHTML = '';
  for (const boulder of boulders) {
    bouldersList.innerHTML += `<a href="boulder.html">
        <img src="images/cotations/${boulder.grade}.png">
        <div>
            <p class="title">${boulder.name}</p>
            <p class="routesetter">${boulder.setter}</p>
        </div>
        <p class="date">${boulder.date}</p>
    </a>`;
  }
}