<template>
  <div class="home">
    <div v-if="isAuthorized">
      <img alt="Vue logo" src="../assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
    <div v-else>Please, login
      <hr>
      <router-link to="/login"></router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {
      isAuthorized: false
    };
  }
};
</script>
