<template>
  <div class="game-table">
    <table
      border="1"
      bordercolor="#2c3e50"
    >
      <tbody>
        <tr
          v-for="(row, rowIndex) in elementsArray"
          :key="rowIndex"
        >
          <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            style="height:80px; width: 80px"
          >
            <font-awesome-icon
              v-if="!cell.isGuessed && gameStarted"
              size="4x"
              :icon="cell.isOpen ? cell.icon : 'square-full'"
              @click="onElementClick(cell)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "GameTable",
  props: {
    gameStarted : Boolean,
    gamePaused : Boolean
  },
  data() {
    return {
      elementsArray: [],
      selectedElementsArray: [],
      iconsArray: [
        "egg",
        "fish",
        "hamburger",
        "cheese",
        "cookie",
        "apple-alt",
        "pepper-hot",
        "bomb",
        "bolt",
        "crow",
        "frog",
        "flask",
        "leaf",
        "play",
        "laptop",
        "plug",
        "plus",
        "lemon",
        "egg",
        "fish",
        "hamburger",
        "cheese",
        "cookie",
        "apple-alt",
        "pepper-hot",
        "bomb",
        "bolt",
        "crow",
        "frog",
        "flask",
        "leaf",
        "play",
        "laptop",
        "plug",
        "plus",
        "lemon"
      ]
    };
  },
  created() {
    this.initializeElementsArray();
  },
  computed: {
    isAllElemntsGuessed(){
      //check that game started and elementsArray initialized
      if (this.gameStarted && this.elementsArray.length) {
        let elementsArrayFlat = this.elementsArray.flat();
        //check that selectedElementsArray does not contain unguessed element (contains at least one guessed element and doesnt contain unguessed element)
        if (elementsArrayFlat.some(element => element.isGuessed) && !elementsArrayFlat.some(element => !element.isGuessed)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  },
  watch: {
    isAllElemntsGuessed(val){
      if (val) {
        this.$emit('game-completed');
      }
    }
  },
  methods: {
    initializeElementsArray() {
      //clear array
      this.elementsArray.length = 0
      //shuffle icons array
      let shuffledIconsArray = this.iconsArray.sort(() => Math.random() - 0.5);
      for (let row = 0; row < 6; row++) {
        let rowArray = [];
        for (let cell = 0; cell < 6; cell++) {
          let icon = shuffledIconsArray[0];
          shuffledIconsArray = shuffledIconsArray.slice(1);
          let element = {
            cell: cell,
            row: row,
            icon: icon,
            isOpen: false,
            isGuessed: false,
            isTimeoutActivated: false
          };
          rowArray.push(element);
        }
        this.elementsArray.push(rowArray);
      }
    },
    onElementClick(element) {
      //affect only closed elements
      if (!element.isOpen && !this.gamePaused) {
        //open element, set timeout and isTeimeoutActivated bool, add to selectedElementsArray
        element.isOpen = true;
        //timeout that closes element and removes from selectedElementsArray, if activated
        setTimeout(() => {
          if (element.isTimeoutActivated) {
            element.isOpen = false;
            element.isTimeoutActivated = false;
            this.selectedElementsArray.splice(
              this.selectedElementsArray.indexOf(element),
              1
            );
          }
        }, 5000);
        element.isTimeoutActivated = true;
        this.selectedElementsArray.push(element);

        //if two elements selected have same icon, then deactivate timeout,set isGuessed to true and remove from selectedElementsArray
        if (
          this.selectedElementsArray?.length == 2 &&
          this.selectedElementsArray[0]?.icon ==
            this.selectedElementsArray[1]?.icon
        ) {
          this.selectedElementsArray[0].isGuessed = true;
          this.selectedElementsArray[1].isGuessed = true;
          this.selectedElementsArray[0].isTimeoutActivated = false;
          this.selectedElementsArray[1].isTimeoutActivated = false;
          this.selectedElementsArray.splice(0, 2);
        }

        //if third element is opened close previous two and remove them from selectedElementsArray
        if (this.selectedElementsArray?.length == 3) {
          this.selectedElementsArray[0].isTimeoutActivated = false;
          this.selectedElementsArray[1].isTimeoutActivated = false;
          this.selectedElementsArray[0].isOpen = false;
          this.selectedElementsArray[1].isOpen = false;
          this.selectedElementsArray.splice(0, 2);
        }
      }
    }
  }
}
</script>

<style>
.game-table {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>