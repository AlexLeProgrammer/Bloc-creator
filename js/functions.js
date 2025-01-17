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