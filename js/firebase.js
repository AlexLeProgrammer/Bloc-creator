import {initializeApp} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getDatabase, ref, onValue, update} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://memorial-phil-default-rtdb.europe-west1.firebasedatabase.app/",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

onValue(ref(database, 'boulders'), (snapshot) => {
  listBoulders(snapshot.val());
});

document.addEventListener("boulders-search", (e) => {
  update(ref(database), {
    [`${e.detail.x};${e.detail.y}`]: (selectedColor === "#ffffff" ? null : selectedColor)
  });
});