// variable that increments every time it is called
let increment = (function(i) {
  return function() {
    i += 1;
    return i;
  }
}(0));


let create = document.getElementById('create');
let addbtn = document.getElementById('addbtn');


// function to create the note
function createNote(){
  event.preventDefault();
  let val = increment();
  var title = document.getElementById('title').value;
  let note = document.getElementById('notetext').value;
  let div = document.getElementById('notesection');
  let colour = document.getElementById('colourChoice').value;
  let noteid = 'col' + val;
  div.innerHTML += `<div id='` + noteid + `'> <h1>` + title + `</h1> </p>` + note + `</p> <button onClick='editNote("` + noteid + `","` + title + `","` + note + `")'>Edit</button> <button onClick='deleteNote("` + noteid + `","` + title + `")'>Delete</button></div>`;
	let noteSection = document.getElementById(noteid);
  noteSection.style.backgroundColor = colour;
  document.getElementById('create').style.display ='block';
  document.getElementById('addnote').style.display = 'none';
  var title = document.getElementById('title').value;
  document.getElementById('title').value = '';
  document.getElementById('notetext').value = '';
}

// function to edit the note
function editNote(noteId, title, note){
  let noteToEdit = document.getElementById(noteId);
  noteToEdit.innerHTML = '';
  noteToEdit.innerHTML = `<form id="editnote">
    <label>Edit title:</label>
    <input type="text" id="editTitle" name="editTitle" value="` + title + `">
    <label>Edit note:</label>
    <input type='text' id="editText" name="editText" value="` + note + `">
    <label for="colour">Choose a colour:</label>
    <select id="editColour" name="editColour">
      <option value="#b3f0ff">Blue</option>
      <option value="#ffbb99">Peach</option>
      <option value="#b3e6b3">Green</option>
      <option value="#ffcce6">Pink</option>
    </select>
    <button onClick='saveNote("` + noteId + `")'>Save</button>
    </form>`;
};

//function to save the inputted values to the note
function saveNote(noteId){
  event.preventDefault();
  let noteid = noteId;
  let title = document.getElementById('editTitle').value;
  let note = document.getElementById('editText').value;
  let colour = document.getElementById('editColour').value;
  let div = document.getElementById(noteId);
  div.innerHTML = `<h1>` + title + `</h1> </p>` + note + `</p> <button onClick='editNote("` + noteid + `","` + title + `","` + note + `")'>Edit</button> <button onClick='deleteNote("` + noteid + `","` + title + `")'>Delete</button>`;
  let noteSection = document.getElementById(noteid);
  noteSection.style.backgroundColor = colour;
};


//function to delete the note
function deleteNote(noteId, title){
  event.preventDefault();
  let div = document.getElementById(noteId);
  div.remove();
  alert(title + ' successfully deleted!');
}

// function to show the note creation section
function showCreate(){
	document.getElementById('create').style.display ='none';
  document.getElementById('addnote').style.display = 'block'
}


rxjs.fromEvent(create, 'click')
  .subscribe(() => showCreate()
);

rxjs.fromEvent(addbtn, 'click')
  .subscribe(() => createNote()
);







