import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getDatabase, ref, onValue, set, update} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://memorial-phil-default-rtdb.europe-west1.firebasedatabase.app/",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

let boulders = [];
let nextFreeId = null;

function getBoulders() {
  if (filteredGrade === null) {
    return boulders;
  }
  return boulders.filter(item => item.grade === filteredGrade);
}

onValue(ref(database, 'boulders'), (snapshot) => {
  let i = 0;
  for (let boulder of snapshot.val()) {
    if (boulder !== undefined) {
      boulder.id = i;
      boulders.unshift(boulder);
    }
    i++;
  }

  // load home page
  if (typeof listBoulders !== 'undefined') {
    listBoulders(getBoulders());
  }

  // load boulder values
  if (typeof id !== 'undefined') {
    fillValues(snapshot.val()[id]);
  }

  // load edit boulder
  if (typeof boulderID !== 'undefined') {
    if (boulderID === null) {
      return;
    }
    const _boulder = snapshot.val()[boulderID];
    console.log(_boulder);
    boulder = _boulder.holds;
    document.querySelector('#name').value = _boulder.name;
    document.querySelector('#setter').value = _boulder.setter;
    gradesInput(_boulder.grade);
    document.querySelector('#desc').value = _boulder.desc.replace('<br>', '\n');
    drawWall(boulder, true, false, false);

    for (let hold of Object.keys(boulder)) {
      if (boulder[hold] === 1) {
        startsSelected.push(hold);
      }
      if (boulder[hold] === 2) {
        topSelected = hold;
      }
    }
  }
});

onValue(ref(database, 'nextFreeId'), (snapshot) => {
  nextFreeId = snapshot.val();
});

document.addEventListener("boulders-search", (e) => {
  const result = getBoulders().filter(item =>
    item.name.toLowerCase().includes(e.detail.toLowerCase()) ||
    item.setter.toLowerCase().includes(e.detail.toLowerCase())
  );
  listBoulders(result);
});

document.addEventListener('publish-boulder', (e) => {
  const id = nextFreeId;
  set(ref(database, `boulders/${id}`), {
    name: e.detail.name,
    setter: e.detail.setter,
    desc: e.detail.desc,
    grade: e.detail.grade,
    holds: e.detail.holds,
    date: getCurrentDate()
  }).then(() => {
    update(ref(database), {
      nextFreeId: id + 1,
    }).then(() => {
      window.location = `./boulder.html?id=${id}`;
    });
  });
});

document.addEventListener('edit-boulder', (e) => {
  update(ref(database, `boulders/${e.detail.id}`), {
    name: e.detail.name,
    setter: e.detail.setter,
    desc: e.detail.desc,
    grade: e.detail.grade,
    holds: e.detail.holds
  }).then(() => {
    window.location = `./boulder.html?id=${e.detail.id}`;
  });
});