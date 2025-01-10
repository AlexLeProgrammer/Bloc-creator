import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getDatabase, ref, onValue, update} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://memorial-phil-default-rtdb.europe-west1.firebasedatabase.app/",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

let boulders = [];

onValue(ref(database, 'boulders'), (snapshot) => {
  boulders = snapshot.val();
  listBoulders(boulders);
});

document.addEventListener("boulders-search", (e) => {
  const result = boulders.filter(item =>
    item.name.toLowerCase().includes(e.detail.toLowerCase()) ||
    item.setter.toLowerCase().includes(e.detail.toLowerCase())
  );
  listBoulders(result);
});