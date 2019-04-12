<template>
  <div class="tables">
    <div class="row no-gutters" id="body-row">
      <div class="col-2 col-sm-1">
        <sidebar></sidebar>
      </div>
      <div class="col-10 col-sm-11">
        <button v-on:click="newTable">New table</button>
        <div class="field-container" v-on:mousemove="moveTable">
          <div
            v-for="(el, index) in AllTables"
            v-bind:key="index"
            class="table"
            v-on:mousedown="getTable(index)"
            v-on:mouseup="releaseTable(index)"
            v-on:mouseleave="releaseTable(index)"
            v-on:mouseover="updateLayerValue"
            v-on:dbclick="changeRadius(index)"
            v-on:contextmenu.prevent="changeSize(index)"
            v-bind:class="{'inMove': el.active}"
            v-bind:style="{
                        'top': el.top+'px', 
                        'left': el.left+'px',
                        'width': el.width+'px',
                        'height': el.height+'px',
                        'border-radius': el.radius+'px'
                        }"
          >
            {{ el.text }}
            <div v-show="el.blocked">
              <button v-on:click="el.width += 20">+</button>
              <button v-on:click="el.width -= 20">-</button>
              <br>
              <button v-on:click="el.height += 20">+</button>
              <button v-on:click="el.height -= 20">-</button>
              <br>
              <button v-on:click="saveSize(index)">Save</button>
              <button v-on:click="deleteTable(index)">Delete Table</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";

export default {
  components: {
    sidebar: Sidebar
  },
  name: "Tables",
  data() {
    return {
      AllTables: [],
      countClicks: 0,
      clickInterval: null
    };
  },
  methods: {
    getTable(element) {
      if (!this.AllTables[element].blocked) {
        this.countClicks++;
        clearTimeout(this.clickInterval);
        this.clickInterval = setTimeout(() => (this.countClicks = 0), 200);
        switch (this.countClicks) {
          case 1:
            this.AllTables[element].active = true;
            break;
          case 2:
            this.changeRadius(element);
            break;
          case 3:
            this.changeText(element);
            break;
          default:
            this.AllTables[element].active = true;
        }
      }
    },
    newTable() {
      this.AllTables.push({
        text: "New Table",
        top: 20,
        left: 20,
        active: false,
        width: 200,
        height: 200,
        radius: 0,
        layerX: 0,
        layerY: 0,
        blocked: false
      });
    },
    changeSize(element) {
      this.AllTables[element].blocked = true;
    },
    saveSize(element) {
      this.AllTables[element].blocked = false;
      // И тут запрос в бд для сохраннеия. Сохранять весь AllTables
      // Ну или отдельной кнопкой всё сохранять, решай сам
    },
    deleteTable(element) {
      this.AllTables.splice(element, 1);
      // И тут запрос в бд для сохраннеия. Сохранять весь AllTables
      // Ну или отдельной кнопкой всё сохранять, решай сам
    },
    changeText(element) {
      const text = prompt("Enter new name");
      this.AllTables[element].text = text;
      // И тут запрос в бд для сохраннеия. Сохранять весь AllTables
      // Ну или отдельной кнопкой всё сохранять, решай сам
    },
    releaseTable(element) {
      this.AllTables[element].active = false;
    },
    changeRadius(element) {
      this.AllTables[element].radius =
        this.AllTables[element].radius == 50 ? 0 : 50;
    },
    updateLayerValue(element) {
      this.AllTables.forEach((el, index) => {
        if (el.active) {
          this.AllTables[index].layerX = event.layerX;
          this.AllTables[index].layerY = event.layerY;
        }
      });
    },
    moveTable(event) {
      let [active] = this.AllTables.filter(el => el.active);
      if (active && !active.blocked) {
        const newX = event.clientX - active.layerX / 2;
        const newY = event.clientY - active.layerY / 2;
        active.top = parseInt(parseInt(newY / 20) * 20 - active.height / 2);
        active.left = parseInt(parseInt(newX / 20) * 20 - active.width / 2);
        if ((active.top / 10) % 2 !== 0) {
          active.top += 10;
        }
        if ((active.left / 10) % 2 !== 0) {
          active.left += 10;
        }
      }
    }
  }
};
</script>

<style scoped>
.inMove {
  opacity: 0.7;
  z-index: 999;
  box-shadow: 4px 4px 2px black;
}
.table {
  position: absolute;
  background-color: #333;
  user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  -o-user-select: none;
  -moz-user-select: none;
  color: white;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tables {
  width: 100%;
  height: 100%;
}
.field-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  top: 00%;
  left: 0%;
  background: repeating-linear-gradient(
      transparent,
      transparent 18px,
      rgb(99, 90, 90) 20px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 18px,
      rgb(99, 90, 90) 20px
    );
  border: 2px solid rgb(99, 90, 90);
}
</style>
