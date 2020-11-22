<template>
  <div>
    <h1>Leaderboard</h1>
    <div class="leaderboard__wrapper">
      <table class="leaderboard__table">
        <tr>
          <th>Name</th>
          <th>Time</th>
        </tr>
        <tr v-for="(player, index) in leaderboard" :key="index">
          <td>{{player.name}}</td>
          <td>{{player.time}}</td>
        </tr>        
      </table>
    </div>

  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      leaderboard: state => state.leaderboard
    })
  }
};
</script>

<style>
.leaderboard__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.leaderboard__table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
}

.leaderboard__table td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

.leaderboard__table tr:nth-child(even) {
  background-color: #dddddd;
}
</style>