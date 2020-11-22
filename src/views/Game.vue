<template>
  <div>
    <h2
      v-show='gameCompleted'
      style="color: red;"
    >Congratulations! You won! Your name and result recorded to leaderboard.</h2>
    <game-table
      ref='gameTable'
      :gameStarted='gameStarted'
      :gamePaused='gamePaused'
      @game-completed='completeGame'
    />
    <stopwatch ref='stopwatch' />
    <input
      class="input"
      type="text"
      placeholder="Enter your name before start"
      v-model="playerName"
    >
    <div>
      <button
        class="button button__rounded button__green"
        :disabled='!playerName'
        @click="startGame"
      >
        Start Game
      </button>
      <button
        class="button button__rounded button__blue"
        :disabled='!playerName'
        @click="pauseGame"
      >
        {{gamePaused ? 'Resume Game' : 'Pause Game'}}
      </button>
      <button
        class="button button__rounded button__red"
        :disabled='!playerName'
        @click="resetGame"
      >
        Reset Game
      </button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import gameTable from "../components/GameTable";
import stopwatch from "../components/Stopwatch";

export default {
  name: "Game",
  components: {
    "game-table": gameTable,
    stopwatch: stopwatch
  },
  data() {
    return {
      gameStarted: false,
      gamePaused: false,
      gameCompleted: false,
      playerName: ""
    };
  },
  methods: {
    startGame() {
      if (!this.gameStarted) {
        this.gameStarted = true;
        this.gameCompleted = false;
        this.$refs.stopwatch.startTimer();
      }
    },
    pauseGame() {
      if (this.gameStarted && !this.gameCompleted) {
        if (this.gamePaused) {
          this.gamePaused = false;
          this.$refs.stopwatch.startTimer();
        } else {
          this.gamePaused = true;
          this.$refs.stopwatch.stopTimer();
        }
      }
    },
    resetGame() {
      this.$refs.stopwatch.stopTimer();
      this.$refs.stopwatch.clearTimer();
      this.$refs.gameTable.initializeElementsArray();
      this.gameStarted = false;
      this.gamePaused = false;
      this.gameCompleted = false;
    },
    completeGame() {
      this.gameCompleted = true;
      this.$refs.stopwatch.stopTimer();
      this.$store.dispatch("writeNewResultToLeaderboard", {
        name: this.playerName,
        time: this.$refs.stopwatch.stopwatchDipslay
      });
    }
  }
};
</script>

<style>
.input {
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.button {
  border: none;
  color: white;
  padding: 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  outline: none;
}

.button:active {
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

.button:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.button:disabled {
  box-shadow: none;
  background-color: #666;
}

.button__rounded {
  border-radius: 12px;
}

.button__green {
  background-color: #4caf50;
}

.button__blue {
  background-color: #1976d2;
}

.button__red {
  background-color: #ff5252;
}
</style>
