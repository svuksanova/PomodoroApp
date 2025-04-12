class PomodoroTimer {
    constructor() {
        this.minutes = 25;
        this.seconds = 0;
        this.isRunning = false;
        this.interval = null;
        this.sessions = [];

        this.startBtn = document.getElementById('start-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.timerDisplay = document.getElementById('timer-display');
        this.historyList = document.getElementById('history-list');
        this.timerCircle = document.querySelector('.timer-circle');

        this.initialize();
    }

    initialize() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());

        this.updateDisplay();
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timerCircle.classList.add('active');

            this.interval = setInterval(() => {
                if (this.seconds === 0) {
                    if (this.minutes === 0) {
                        this.completeSession();
                        return;
                    }
                    this.minutes--;
                    this.seconds = 59;
                } else {
                    this.seconds--;
                }
                this.updateDisplay();
            }, 1000);
        }
    }

    pause() {
        if (this.isRunning) {
            clearInterval(this.interval);
            this.isRunning = false;
            this.timerCircle.classList.remove('active');
        }
    }

    reset() {
        this.pause();
        this.minutes = 25;
        this.seconds = 0;
        this.updateDisplay();
    }

    completeSession() {
        clearInterval(this.interval);
        this.isRunning = false;
        this.timerCircle.classList.remove('active');

        // Play sound
        const audio = new Audio('/sounds/cat-meow-85175.mp3');
        audio.play();

        // Add to history
        const now = new Date();
        const session = {
            date: now.toLocaleDateString(),
            time: now.toLocaleTimeString(),
            duration: '25:00'
        };

        this.sessions.unshift(session);
        this.updateHistory();

        // Show notification
        alert('Pomodoro session completed! Time for a break.');

        // Reset timer
        this.reset();
    }

    updateDisplay() {
        const mins = this.minutes.toString().padStart(2, '0');
        const secs = this.seconds.toString().padStart(2, '0');
        this.timerDisplay.textContent = `${mins}:${secs}`;

        // Add pulse animation
        this.timerDisplay.style.transform = 'scale(1.05)';
        setTimeout(() => {
            this.timerDisplay.style.transform = 'scale(1)';
        }, 200);
    }

    updateHistory() {
        this.historyList.innerHTML = this.sessions
            .slice(0, 5)
            .map(session =>
                `<li>${session.date} ${session.time} - ${session.duration}</li>`
            )
            .join('');
    }
}

// Initialize timer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
});