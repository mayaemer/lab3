const { interval, timer } = rxjs;
 
const start = document.getElementById('start');
const hourCount = document.getElementById('hourCount');
const minCount = document.getElementById('minCount');
const secCount = document.getElementById('secCount');

rxjs.fromEvent(start, 'click')
    .subscribe(() => {
        startTimer();
    })

function startTimer(){

    const timerHours = document.getElementById('hour').value;
    const timerMins = document.getElementById('minute').value;
    const timerSecs = document.getElementById('second').value;

    const hourInSecs = timerHours * 60 * 60;
    const minInSecs = timerMins * 60;
    timeInSecs = hourInSecs + minInSecs + timerSecs;
    let countdown = timeInSecs;
    const t = timerMins * 60 * 1000;


    const obs = interval(1000);
 
    const sub = obs
        .subscribe(x => {
            if(x == (timeInSecs - 1)){
                console.log('Finished')
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
        secCount.innerHTML = countdown;
    }else{
        // found on stack overflow https://stackoverflow.com/questions/37096367/how-to-convert-seconds-to-minutes-and-hours-in-javascript
        let hour = Math.floor(countdown / 36000);
        let min = Math.floor(countdown % 3600 / 60);
        let sec = Math.floor(countdown % 3600 % 60);

        hourCount.innerHTML = hour;
        minCount.innerHTML = min;
        secCount.innerHTML = sec;
    }
}
