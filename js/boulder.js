const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

const nameText = document.querySelector('#name');
const setterText = document.querySelector('#setter');
const dateText = document.querySelector('#date');
const gradeImg = document.querySelector('#grade');
const descText = document.querySelector('#desc');

let showHolds = true;
let boulder = null;

function reload() {
  if (id === 'random') {
    fillValues();
  }
}

function fillValues(_boulder) {
  if (id === 'random') {
    boulder = {
      name: 'random',
      setter: 'random',
      desc: '',
      grade: 0,
      holds: {},
      date: getCurrentDate()
    }

    const holdsName = ["a1","a11","a13","a15","a18","a16","a17","a21","a19","a20","a26","a22","a30","a24","a4","a31","a9","a7","a5","b12","b11","b10","b15","b14","b13","b19","b17","b18","b22","b20","b21","b26","b25","b23","b27","b29","b28","b5","b30","b3","b8","c11","c1","c12","c13","c14.5","c14","c16","c15","c18","c19","c17","c21","c20","c20.5","c24","c22","c23","c25","c27","c26","c3","c29","c28","c7","c31","c6","c9","d10","d1","d13","d12","d14","d17","d15","d16","d19","d20","d18","d22","d21","d23","d24","d26","d25","d28","d27","d29","d5","d31","d4","d7","d8","e10","e15","e12","e14","e16","e18","e19","e20","e22","e23","e27","e25","e24","e28","e3","e29","e7","e5","e31","f12","f11","f1","f14","f15","f16","f19","f17","f18","f22","f21","f20","f24","f23","f25","f26","f29","f27","f31","f7","f5","f9","g10","g1","g11","g13","g14","g15","g16.5","g16","g18.5","g17","g18","g20","g19","g19.5","g25","g22","g24","g28","g3","g26","g31","g5","g7","h11","h12","g8","h1","h15","h16","h14","h18","h17","h19","h22","h21","h20","h23","h25","h24","h26","h28","h27","h30","h31","h29","h6","h5","h7","i10","i11","h9","i12","i14","i15","i16","i17","i18","i2","i19","i20","i22","i21","i24","i25","i26","i27","i29","i28","i31","i5","i7","i9","j1","j10","j12","j14","j15","j16","j17","j18","j21","j22","j23","j30","j24","j27","j4","j31","j5","j8","k10","k1","k11","k13","k15","k14","k18","k16","k20","k23","k24","k22","k31","k26","k28","k7","k8","k5","l12","l13","l11","l17","l15","l16","l19","l18","l20","l22","l23","l21","l25","l27","l24","l26","l28","l29","l3","l5","l30","l31","m11","m10","m1","m15","m14","m16","m18","m17","m17.5","m21","m19","m20","m24","m23","m22","m25","m26","m27","m29","m31","m28","m7","m6","m4","n1","m8","n10","n15","n12","n13","n18","n17","n19","n20","n21","n22","n25","n24","n23","n28","n29","n27","n31","n5","n3","o11","n8","o13","o15","o19","o16","o22","o21","o27","o28","o30","o4","p1","o7","o9","p12","p10","p13","p15"];

    let nbrHolds = Math.floor(Math.random() * 15) + 3;
    for (let i = 0; i < nbrHolds; i++) {
      boulder.holds[holdsName[Math.floor(Math.random() * holdsName.length)]] = 0;
    }

    const keys = Object.keys(boulder.holds);
    boulder.holds[keys[Math.floor(Math.random() * keys.length)]] = 1;
    boulder.holds[keys[Math.floor(Math.random() * keys.length)]] = 2;
    gradeImg.src = `images/reload.svg`;
  } else {
    boulder = _boulder;
    gradeImg.src = `images/grades/${boulder.grade}.png`;
  }
  console.log(boulder);
  nameText.innerText = boulder.name;
  setterText.innerText = boulder.setter;
  dateText.innerText = formatDate(boulder.date);
  descText.innerHTML = boulder.desc;

  document.querySelector('title').innerText = `${boulder.name} | Mémorial Phil`;

  document.querySelector('#edit').href = `./new-boulder.html?id=${id}`;

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