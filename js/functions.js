const formatDate = (date) => {
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}`;
};

function gradesInput(grade, nullable = true) {
  // Change the filtered grade
  if (grade === filteredGrade) {
    if (!nullable) {
      return;
    }
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
}

function getCurrentDate() {
  const today = new Date();

  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0
  const dd = String(today.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
}

// Profile image functionality
function getUserAscents() {
  // Use the global function from my-ascents.js module if available
  if (typeof window.getUserAscents === 'function') {
    return window.getUserAscents();
  }
  return [];
}

function getHighestGradeClimbed(allBoulders) {
  const ascents = getUserAscents();

  if (ascents.length === 0) {
    return 0;
  }

  let highestGrade = 0;

  for (let ascent of ascents) {
    const boulder = allBoulders.find(b => b.id === ascent.id);
    if (boulder && boulder.grade > highestGrade) {
      highestGrade = boulder.grade;
    }
  }

  return highestGrade || 0;
}

function getProfileImage(grade) {
  const profileMap = {
    0: 'images/profile/4.svg',
    1: 'images/profile/5.svg',
    2: 'images/profile/5c.svg',
    3: 'images/profile/6a.svg',
    4: 'images/profile/6b.svg',
    5: 'images/profile/6c.svg',
    6: 'images/profile/7a.svg',
    7: 'images/profile/7b.svg',
    8: 'images/profile/7c.svg',
    9: 'images/profile/8a.svg'
  };

  if (grade >= 10) {
    return 'images/profile/8a.svg';
  }

  return profileMap[grade] || 'images/profile/4.svg';
}

function updateProfileImage(allBoulders) {
  const profileImg = document.querySelector('#profile-image');
  if (profileImg && allBoulders) {
    const highestGrade = getHighestGradeClimbed(allBoulders);
    profileImg.src = getProfileImage(highestGrade);
    profileImg.title = `Niveau maximum: ${highestGrade} - Mes ascensions`;
  }
}
