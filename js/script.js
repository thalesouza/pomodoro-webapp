let pomodoro = {
    started : false,
    minutes : 0,
    seconds : 0,
    interval : null,
    minutesDom : null,
    secondsDom: null,
    init : function(){
        let self = this;
        let btnAudio = new Audio('./btn-sound.mp3')
        let startTime = new Audio('./pomodoro.mp3')
        startTime.volume = 0.4
        
      this.minutesDom = document.querySelector('#pomodoro-minute');
      this.secondsDom = document.querySelector('#pomodoro-seconds');
      this.interval = setInterval(function(){
        self.intervalCallback.apply(self);
      }, 1000);
        document.querySelector('#btn-start').onclick = function () {
            startTime.play();
            self.startWork.apply(self);
      };
        document.querySelector('#pomodoro-button').onclick = function () {
            startTime.play();
            self.startWork.apply(self);
      };
        document.querySelector('#pomodoro-short').onclick = function () {
            btnAudio.play();
            self.startShortBreak.apply(self);
      };
      document.querySelector('#pomodoro-long').onclick = function(){
            btnAudio.play();
            self.startLongBreak.apply(self);
      };
        document.querySelector('#btn-stop').onclick = function () {
            btnAudio.play();
            self.stopTimer.apply(self);
        };
    },
    resetVariables : function(mins, secs, started){
      this.minutes = mins;
      this.seconds = secs;
      this.started = started; 
    },
    startWork: function() {
      this.resetVariables(25, 1, true);
    },
    startShortBreak : function(){
      this.resetVariables(5, 1, true);
    },
    startLongBreak : function(){
      this.resetVariables(15, 1, true);
    },
    stopTimer : function(){
      this.resetVariables(25, 0, false);
      this.updateDom();
    },
    toDoubleDigit : function(num){
      if(num < 10) {
        return "0" + parseInt(num, 10);
      }
      return num;
    },
    updateDom : function(){
      this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
      this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
    },
    intervalCallback : function(){
      if(!this.started) return false;
      if(this.seconds == 0) {
        if(this.minutes == 0) {
          this.timerComplete();
          return;
        }
        this.seconds = 59;
        this.minutes--;
      } else {
        this.seconds--;
      }
      this.updateDom();
    },
    timerComplete: function () {
        let stopTimer = new Audio('./break.mp3')
        stopTimer.volume = 0.4
        stopTimer.play();
        this.started = false;
    }
};
window.onload = function(){
  pomodoro.init();
};