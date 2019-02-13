<template>
  <div class="login">
    <form v-on:submit.prevent="logout" v-if="isLoggedIn">
      <input type="submit" value="Logout">
    </form>
    <form v-on:submit.prevent="login" v-else>
      <input type="text" placeholder="Username" name="name" v-model="name">
      <input type="password" placeholder="Password" name="password" v-model="password">
      <input type="submit" value="Login">
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  created() {
    if (typeof localStorage !== typeof undefined) {
      if (localStorage.getItem("token")) this.$data.isLoggedIn = true;
    }
  },
  data() {
    return {
      name: "",
      password: "",
      isLoggedIn: false
    };
  },
  methods: {
    login() {
      let vm = this;
      if (localStorage.getItem("token")) return (vm.$data.isLoggedIn = true);
      if (vm.$data.username != "" && vm.$data.password != "") {
        axios
          .post("/auth", {
            name: vm.$data.name,
            password: vm.$data.password
          })
          .then(response => {
            console.log(response.data);
            axios.defaults.headers.post["Authorization"] =
              "Bearer " + response.data.token;
            localStorage.setItem(
              "token",
              JSON.stringify({ token: "Bearer " + response.data.token })
            );
            return (vm.$data.isLoggedIn = true);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log("username or password empty");
      }
    },
    logout() {
      localStorage.removeItem("token");
      return (this.$data.isLoggedIn = false);
    }
  }
};
</script>

