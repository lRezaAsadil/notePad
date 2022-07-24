//variables

let noteList = document.querySelector("#note-list");

// eventlisteners

submitevent();

function submitevent() {
  // submit form
  let submitForm = document.querySelector("#form");
  submitForm.addEventListener("submit", newNote);
  // remove note
  noteList.addEventListener("click", removeNote);
  // dom content loaded
  document.addEventListener("DOMContentLoaded", domContentLoaded);
}

// functions

// adding new note to de list
function newNote(e) {
  e.preventDefault();

  // acces to the value
  let note = document.querySelector("#note").value;

  // creat <li> tag
  let li = document.createElement("li");
  li.innerHTML = note;

  // creat remove btn
  let removeBtn = document.createElement("a");
  removeBtn.innerHTML = "X";

  // add class to removeBtn
  removeBtn.classList = "remove-note";

  // add remove btn to li
  li.appendChild(removeBtn);

  // add li to noteList
  noteList.appendChild(li);

  // add to localStorage
  addNoteTolocalStorage(note);
  this.reset();
  alert("Successfully deposited");
}

// remove note
function removeNote(e) {
  if (e.target.classList.contains("remove-note")) {
    e.target.parentElement.remove();
  }

  removeNoteLS(e.target.parentElement.textContent);
}

// adding note to de localstorage
function addNoteTolocalStorage(note) {
  // get the notes from local storage
  let notes = getNoteFromLocalStorage();
  // add new note to the notes array
  notes.push(note);
  // add new notes array to the local storage
  localStorage.setItem("notes", JSON.stringify(notes));
}

// get notes from local storage
function getNoteFromLocalStorage() {
  let notes;
  let getFromLS = localStorage.getItem("notes");
  if (getFromLS === null) {
    // if not exist creat empty array
    notes = [];
  } else {
    //else exist convert to array
    notes = JSON.parse(getFromLS);
  }
  return notes;
}

// get data from LS on load
function domContentLoaded() {
  let notes = getNoteFromLocalStorage();
  notes.forEach((note) => {
    // creat <li> tag
    let li = document.createElement("li");
    li.innerHTML = note;

    // creat remove btn
    let removeBtn = document.createElement("a");
    removeBtn.innerHTML = "X";

    // add class to removeBtn
    removeBtn.classList = "remove-note";

    // add remove btn to li
    li.appendChild(removeBtn);

    // add li to noteList
    noteList.appendChild(li);
  });
}

// remove note from LS
function removeNoteLS(noteContent) {
  // delet X from the content
  let noteDelete = noteContent.substring(0, noteContent.length - 1);

  //   get note from lS
  let notes = getNoteFromLocalStorage();
  notes.forEach((note, index) => {
    if (note === noteDelete) {
      notes.splice(index, 1);
      alert("Removed successfully");
    }
  });

  // add new array of notes to LS
  localStorage.setItem("notes", JSON.stringify(notes));
}
