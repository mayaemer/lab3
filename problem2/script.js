// testing rxjs
let create = document.getElementById('create');

rxjs.fromEvent(create, 'click').subscribe(() => console.log('Clicked!'));
