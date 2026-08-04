class BgTimer {
    // Curernt time is the time that the timer exited the app
    constructor(isCountUp, timerPaused) {
        this.isCountUp = isCountUp; // Decides whether the class is to do with count up or count down timer
        this.timerPaused = timerPaused; // Gets the status of the timer, whether its been paused or not
    }

    // This timestamp should be saved in a database
    getInitialQuitTime() {
    
    }

    // Gets the current time for when the user reopens the app
    getCurrentTime() {
        return Date.now();
    }

    // Gets the time elapsed for when the user reopens app the
    getTimeElapsed() {
        return this.getCurrentTime() - this.getInitialQuitTime();
    }


    // Boolean to track whether the timer was initally Paused or running
    getTimerIsPaused() {
        return this.timerPaused;
    }
}

const timer = new BgTimer(true, false)
console.log("The app was quit at time: " + timer.getQuitTime())
