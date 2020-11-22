<template>
  <div>
    <h1>{{stopwatchDipslay}}</h1>
  </div>
</template>

<script>
export default {
  name:'Stopwatch',
  data(){
    return{
      hours: 0,
      minutes: 0,
      seconds: 0,
      timerId: undefined
    }
  },
  computed: {
    stopwatchDipslay(){
      return ((this.hours ? (this.hours > 9 ? this.hours : "0" + this.hours) : "00") + 
              ":" + 
              (this.minutes ? (this.minutes > 9 ? this.minutes : "0" + this.minutes) : "00") + 
              ":" + 
              (this.seconds > 9 ? this.seconds : "0" + this.seconds))
    }
  },
  methods: {
    startTimer() {
      this.timer = setInterval(this.add, 1000);
    },
    stopTimer(){
      clearInterval(this.timer);
    },
    clearTimer(){
      this.seconds = 0; 
      this.minutes = 0; 
      this.hours = 0;
    },
    add() {
      this.seconds++;
      if (this.seconds >= 60) {
          this.seconds = 0;
          this.minutes++;
          if (this.minutes >= 60) {
              this.minutes = 0;
              this.hours++;
          }
      }
    },
    
    }
}
</script>

<style>
</style>