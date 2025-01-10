import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getDatabase, ref, onValue, update} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://memorial-phil-default-rtdb.europe-west1.firebasedatabase.app/",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

let boulders = [];

function getBoulders() {
  if (filteredGrade === null) {
    return boulders;
  }
  return boulders.filter(item => item.grade === filteredGrade);
}

onValue(ref(database, 'boulders'), (snapshot) => {
  boulders = snapshot.val().reverse();

  // load home page
  if (typeof listBoulders !== 'undefined') {
    listBoulders(getBoulders());
  }

  // load boulder values
  if (typeof id !== 'undefined') {
    fillValues(snapshot.val()[id]);
  }
});

document.addEventListener("boulders-search", (e) => {
  const result = getBoulders().filter(item =>
    item.name.toLowerCase().includes(e.detail.toLowerCase()) ||
    item.setter.toLowerCase().includes(e.detail.toLowerCase())
  );
  listBoulders(result);
});