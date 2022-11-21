let start = document.getElementById("start");

rxjs.fromEvent(start, "click")
.subscribe(() => getInput());

function getInput(){
    let hour = document.getElementById('hour').value;
    let minute = document.getElementById('minute').value;
    let second = document.getElementById('second').value;

    console.log(hour, minute, second);


}