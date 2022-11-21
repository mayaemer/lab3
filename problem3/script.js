// variable that increments every time it is called
let increment = (function (i) {
  return function () {
    i += 1;
    return i;
  };
})(0);

let childIncrement = (function (i) {
  return function () {
    i += 1;
    return i;
  };
})(0);

let create = document.getElementById("create");
let addbtn = document.getElementById("addbtn");

// function to create the note
function createNote() {
  event.preventDefault();
  let val = increment();
  var title = document.getElementById("title").value;
  let note = document.getElementById("notetext").value;
  let div = document.getElementById("notesection");
  let colour = document.getElementById("colourChoice").value;
  let noteid = "col" + val;

  const newparentDiv = document.createElement("div");
  newparentDiv.id = noteid;

  const titleElem = document.createElement("h1");
  titleElem.innerText = title;

  const noteElem = document.createElement("p");
  noteElem.innerText = note;

  const buttonElem = document.createElement("button");
  buttonElem.innerText = "Edit";

  const deleteBtnElem = document.createElement("button");
  deleteBtnElem.innerText = "Delete";

  const addChild = document.createElement("button");
  addChild.innerText = "Add note";

  newparentDiv.appendChild(titleElem);
  newparentDiv.appendChild(noteElem);
  newparentDiv.appendChild(buttonElem);
  newparentDiv.appendChild(deleteBtnElem);
  newparentDiv.appendChild(addChild);

  div.appendChild(newparentDiv);

  let noteSection = document.getElementById(noteid);
  noteSection.style.backgroundColor = colour;
  document.getElementById("create").style.display = "block";
  document.getElementById("addnote").style.display = "none";
  var title = document.getElementById("title").value;
  document.getElementById("title").value = "";
  document.getElementById("notetext").value = "";

  rxjs.fromEvent(buttonElem, "click").subscribe(() => {
    editNote(noteid, title, note);
  });

  rxjs.fromEvent(deleteBtnElem, "click").subscribe(() => {
    deleteNote(noteid, title);
  });

  rxjs.fromEvent(addChild, "click").subscribe(() => {
    addChildNote(noteid);
  });
}

function addChildNote(noteid) {
  const childDiv = document.createElement("div");
  childID= "child" + childIncrement();
  childDiv.id = childID;

  const addChildForm = document.createElement("form");
  addChildForm.id = "addChildForm";

  const textLabel = document.createElement("label");
  textLabel.innerText = "Add text:";
  textLabel.id = 'addTextLabel' + childID;

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.id = "addText" + childID;
  textInput.name = "addText";

  const saveBtn = document.createElement("button");
  saveBtn.innerText = "Save";
    saveBtn.id = 'save' + childID;

  addChildForm.appendChild(textLabel);
  addChildForm.appendChild(textInput);

  childDiv.appendChild(addChildForm);
  childDiv.appendChild(saveBtn);

  const parentDiv = document.getElementById(noteid);
  parentDiv.appendChild(childDiv);

  rxjs.fromEvent(saveBtn, 'click').subscribe(() => saveChildNote(childID));
}

function saveChildNote(childID){
    console.log(childID);
    let note = document.getElementById("addText" + childID).value;
    let childDiv = document.getElementById(childID);

    let addText = document.getElementById('addText' + childID);
    let addTextLabel = document.getElementById('addTextLabel' + childID);
    let saveBtn = document.getElementById('save' + childID);

    const noteText = document.createElement("p");
    noteText.innerText = note;

    saveBtn.remove();
    addText.remove();
    addTextLabel.remove();

    childDiv.appendChild(noteText);
  
}


// function to edit the note
function editNote(noteId, title, note) {
  let noteToEdit = document.getElementById(noteId);

  noteToEdit.innerHTML = "";

  const editForm = document.createElement("form");
  editForm.id = "editnote";

  const titleLabel = document.createElement("label");
  titleLabel.innerText = "Edit title:";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "editTitle";
  titleInput.name = "editTitle";
  titleInput.value = title;

  const textLabel = document.createElement("label");
  textLabel.innerText = "Edit text:";

  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.id = "editText";
  textInput.name = "editText";
  textInput.value = note;

  const colourLabel = document.createElement("label");
  colourLabel.innerText = "Choose a colour:";
  colourLabel.for = "colour:";

  const selectInput = document.createElement("select");
  selectInput.id = "editColour";
  selectInput.name = "editColour";

  const blue = document.createElement("option");
  blue.innerText = "Blue";
  blue.value = "#b3f0ff";

  const peach = document.createElement("option");
  peach.innerText = "Peach";
  peach.value = "#ffbb99";

  const pink = document.createElement("option");
  pink.innerText = "Pink";
  pink.value = "#ffcce6";

  const green = document.createElement("option");
  green.innerText = "Green";
  green.value = "#b3e6b3";

  const saveBtn = document.createElement("button");
  saveBtn.innerText = "Save";

  selectInput.appendChild(blue);
  selectInput.appendChild(peach);
  selectInput.appendChild(green);
  selectInput.appendChild(pink);

  editForm.appendChild(titleLabel);
  editForm.appendChild(titleInput);
  editForm.appendChild(textLabel);
  editForm.appendChild(textInput);
  editForm.appendChild(colourLabel);
  editForm.appendChild(selectInput);

  noteToEdit.appendChild(editForm);
  noteToEdit.appendChild(saveBtn);

  rxjs.fromEvent(saveBtn, "click").subscribe(() => {
    saveNote(noteToEdit);
  });
}

//function to save the inputted values to the note
function saveNote(noteId) {
  event.preventDefault();
  let title = document.getElementById("editTitle").value;
  let note = document.getElementById("editText").value;
  let colour = document.getElementById("editColour").value;
  let div = document.getElementById(noteId.id);
  div.innerHTML = "";

  const noteTitle = document.createElement("h1");
  noteTitle.innerText = title;

  const noteText = document.createElement("p");
  noteText.innerText = note;

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";

  div.appendChild(noteTitle);
  div.appendChild(noteText);
  div.appendChild(editBtn);
  div.appendChild(deleteBtn);

  div.style.backgroundColor = colour;

  rxjs.fromEvent(editBtn, "click").subscribe(() => {
    editNote(noteId.id, title, note);
  });

  rxjs.fromEvent(deleteBtn, "click").subscribe(() => {
    deleteNote(noteId.id, title);
  });
}

//function to delete the note
function deleteNote(noteId, title) {
  event.preventDefault();
  let div = document.getElementById(noteId);
  div.remove();
  alert(title + " successfully deleted!");
}

// function to show the note creation section
function showCreate() {
  document.getElementById("create").style.display = "none";
  document.getElementById("addnote").style.display = "block";
}

rxjs.fromEvent(create, "click").subscribe(() => showCreate());

rxjs.fromEvent(addbtn, "click").subscribe(() => createNote());
