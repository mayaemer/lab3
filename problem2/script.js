// variable that increments every time it is called
let increment = (function(i) {
  return function() {
    i += 1;
    return i;
  }
}(0));


let create = document.getElementById('create');

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

rxjs.fromEvent(create, 'click')
  .subscribe(() => createNote()
);





