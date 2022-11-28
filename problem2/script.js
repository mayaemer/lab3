const { interval, timer } = rxjs;
 
const start = document.getElementById('start');
const minCount = document.getElementById('minCount');
const secCount = document.getElementById('secCount');

rxjs.fromEvent(start, 'click')
    .subscribe(() => {
        startTimer();
    })

function startTimer(){

    const timerMins = document.getElementById('minute').value;
    const timeInSecs = timerMins * 60;
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


