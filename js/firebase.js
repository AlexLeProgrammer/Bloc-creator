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
})