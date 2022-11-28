const { interval, timer } = rxjs;
 
const start = document.getElementById('start');
const hourCount = document.getElementById('hourCount');
const minCount = document.getElementById('minCount');
const secCount = document.getElementById('secCount');
const endTimer = document.getElementById('endTimer');

rxjs.fromEvent(start, 'click')
    .subscribe(() => {
        startTimer();
    })

function startTimer(){

    endTimer.style.display = 'none';

    const timerHours = document.getElementById('hour').value;
    const timerMins = document.getElementById('minute').value;
    const timerSecs = document.getElementById('second').value;

    const hourInSecs = (timerHours * 60) * 60;
    const minInSecs = timerMins * 60;

    timeInSecs = parseInt(hourInSecs) + parseInt(minInSecs) + parseInt(timerSecs);

    let countdown = timeInSecs;
    const t = timeInSecs  * 1000;

    const obs = interval(1000);
 
    const sub = obs
        .subscribe(x => {
            if(x == (timeInSecs - 1)){
                endTimer.style.display = 'block';
            }else{
                countdown = countdown - 1;
                displayCountdown(countdown)
            }
        });


    setTimeout(() => {
        // Unsubscribes BOTH subscription and childSubscription
        sub.unsubscribe();
    }, t);
}

function displayCountdown(countdown){
    if( countdown < 59)
    {
        secCount.innerHTML = countdown + 's';
    }else{
        // found on stack overflow https://stackoverflow.com/questions/37096367/how-to-convert-seconds-to-minutes-and-hours-in-javascript
        let hour = Math.floor(countdown / 3600);
        let min = Math.floor(countdown % 3600 / 60);
        let sec = Math.floor(countdown % 3600 % 60);

        hourCount.innerHTML = hour + 'h';
        minCount.innerHTML = min + 'm';
        secCount.innerHTML = sec + 's';
    }
}
