console.log("Notes Project");
showNotes();

// Variables
const addBtn = document.getElementById("addBtn");
const action = document.getElementById("action");
const search = document.getElementById("search");
var edit = false;
var activeIndex = null;

// Adds note
addBtn.addEventListener("click", function () {
  let addTitle = document.getElementById("addTitle");
  let addText = document.getElementById("addTxt");
  let title = localStorage.getItem("title");
  let notes = localStorage.getItem("notes");

  // checking if notes exists in local storage
  if (notes == null) {
    titleObj = [];
    notesObj = [];
  } else {
    titleObj = JSON.parse(title);
    notesObj = JSON.parse(notes);
  }

  if (addText.value.length == 0) {
    return;
  } else if (addTitle.value.length == 0) {
    return;
  }

  if (edit) {
    titleObj[activeIndex] = addTitle.value;
    notesObj[activeIndex] = addText.value;
    edit = false;
    activeIndex = null;
    addBtn.innerText = "Add New Note";
    action.innerText = "Add a Note";
  } else {
    titleObj.push(addTitle.value);
    notesObj.push(addText.value);
  }

  // adding note & title to local storage
  localStorage.setItem("title", JSON.stringify(titleObj));
  localStorage.setItem("notes", JSON.stringify(notesObj));

  addTitle.value = "";
  addText.value = "";
  showNotes();
});

// Searches for note
search.addEventListener("input", function (e) {
  let inputVal = search.value.toLowerCase();

  let noteCards = document.getElementsByClassName("noteCard");
  Array.from(noteCards).forEach(function (element) {
    let titleText = element.getElementsByTagName("h5")[0].innerText;
    let cardText = element.getElementsByTagName("p")[0].innerText;

    if (
      cardText.toLowerCase().includes(inputVal) ||
      titleText.toLowerCase().includes(inputVal)
    ) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  });
});

// Displays all notes
function showNotes() {
  let title = localStorage.getItem("title");
  let notes = localStorage.getItem("notes");
  let notesElem = document.getElementById("notes");

  // checking if notes exists in local storage
  if (notes == null) {
    titleObj = [];
    notesObj = [];
  } else {
    titleObj = JSON.parse(title);
    notesObj = JSON.parse(notes);
  }

  let html = `<h1>Your DISPLAYED Note(s)</h1>`;
  notesObj.forEach(function (element, index) {
    html += `
    <div class="noteCard card my-2 mx-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${titleObj[index]}</h5>
            <p class="card-text">${element}</p>
            <button id="editBtn${index}" class="btn btn-primary" onclick="editNote(this.id)">Edit Note</button>
            <button id="delBtn${index}" class="btn btn-primary" onclick="deleteNote(this.id)">Delete Note</button>
        </div>
    </div>
        `;
  });

  if (notesObj.length != 0) {
    notesElem.innerHTML = html;
  } else {
    notesElem.innerHTML = `<h1>Nothing to display</h1>`;
  }
}

// Edits the selected note
function editNote(index) {
  let title = localStorage.getItem("title");
  let notes = localStorage.getItem("notes");
  let addTitle = document.getElementById("addTitle");
  let addTxt = document.getElementById("addTxt");
  let numb = index.match(/\d/g);

  if (notes == null) {
    titleObj = [];
    notesObj = [];
  } else {
    titleObj = JSON.parse(title);
    notesObj = JSON.parse(notes);
  }

  addBtn.innerText = "Edit Note";
  action.innerText = "Edit Note";
  addTitle.value = titleObj[numb];
  addTxt.value = notesObj[numb];
  edit = true;
  activeIndex = numb;
}

// Deletes the selected note
function deleteNote(index) {
  let title = localStorage.getItem("title");
  let notes = localStorage.getItem("notes");

  if (notes == null) {
    titleObj = [];
    notesObj = [];
  } else {
    titleObj = JSON.parse(notes);
    notesObj = JSON.parse(notes);
  }

  titleObj.splice(index, 1);
  notesObj.splice(index, 1);
  localStorage.setItem("title", JSON.stringify(notesObj));
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}
