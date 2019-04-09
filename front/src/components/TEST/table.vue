<template>
    <div class="table">
        <div class="field">
            <div class="field-container" v-on:mousemove="moveTable">
                <div class="table" 
                    v-on:mousedown="getTable(0)" 
                    v-on:mouseup="releaseTable(0)" 
                    v-on:mouseleave="releaseTable(0)" 
                    v-bind:class="{'inMove': tables[0].active}"
                    v-bind:style="{'top': tables[0].top+'px', 'left': tables[0].left+'px'}">Some Text</div>
                <div class="table" 
                    v-on:mousedown="getTable(1)" 
                    v-on:mouseup="releaseTable(1)" 
                    v-on:mouseleave="releaseTable(1)" 
                    v-bind:class="{'inMove': tables[1].active}"
                    v-bind:style="{'top': tables[1].top+'px', 'left': tables[1].left+'px'}">Some Text</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'table',
    data () {
        return {
            tables: [
                {top: 10, left: 50, active: false, boxTop: 91, boxLeft: 128, clientX: 100, clientY: 50 },
                {top: 10, left: 50, active: false, boxTop: 91, boxLeft: 140, clientX: 100, clientY: 50  },
                {top: 10, left: 50, active: false, boxTop: 91, boxLeft: 140, clientX: 100, clientY: 50  }
            ]
        }
    },
    methods: {
        getTable (element, event) {
            this.tables[element].active = true
        },
        releaseTable (element) {
            this.tables[element].active = false
        },
        moveTable (event) {
            console.log('MAIN X', event.clientX)
            console.log('MAIN Y', event.clientY)
            let [ active ] = this.tables.filter(el => el.active)
            const newX = event.clientX - active.boxLeft 
            const newY = event.clientY - active.boxTop
            console.log("NEW X", parseInt(newX/10))
            console.log("NEW Y", parseInt(newY/10))
            active.top = parseInt(newY/10)*10 - 50
            active.left = parseInt(newX/10)*10 - 100
        }
    }
}
</script>

<style scoped>
    .inMove {
        background-color: red!important;
    }




    .field {
        position: absolute;
        top: 0%;
        left: 0%;
        width: 100vw;
        height: 100vh;
        background-color: #777;
    }
    .field-container {
        position: relative;
        width: 80%;
        height: 80%;
        top: 10%;
        left: 10%;
        background-color: black;
    }
    .table {
        position: absolute;
        width: 200px;
        height: 100px;
        background-color: blue;
        top: 0px;
        left: 0px;
    }
</style>
