<template type="text/x-template" id="item-template">
  <li>
    <div :class="{bold: isFolder}" @click="toggle" @dblclick="changeType">
      {{ model.title }}
      <span v-if="isFolder">[{{ open ? '-' : '+' }}]</span>
    </div>
    <ul v-show="open" v-if="isFolder">
      <item class="item" v-for="(model, index) in model.children" :key="index" :model="model"></item>
    </ul>
  </li>
</template>

<script type="text/javascript">
  import Vue from 'vue';

  export default {
    name: 'item',
    template: '#item-template',
    props: ['model'],
    data () {
      return {
        open: false
      }
    },
    computed: {
      isFolder: function () {
        return this.model.children &&
        this.model.children.length
      }
    },
    methods: {
      toggle: function () {
        if (this.isFolder) {
          this.open = !this.open
        }
      },
      changeType: function () {
        if (!this.isFolder) {
          Vue.set(this.model, 'children', [])
          this.addChild()
          this.open = true
        }
      },
      addChild: function () {
        this.model.children.push({
          title: 'new stuff'
        })
      }
    }
  }
</script>

<style scoped>
body {
  font-family: Menlo, Consolas, monospace;
  color: #444;
}
.item {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
</style>
