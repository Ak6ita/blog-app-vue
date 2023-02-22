<template>
  <div id="app">
    <b-navbar
      class="d-flex justify-content-between px-5"
      toggleable="lg"
      type="dark"
      variant="dark"
    >
      <b-navbar-brand href="#" :to="{ name: 'HomePage' }">Home</b-navbar-brand>

      <b-navbar-nav v-if="!['Login', 'SignUp'].includes($route.name)">
        <b-navbar-brand href="#" @click="logOut">Sign Out</b-navbar-brand>
      </b-navbar-nav>
    </b-navbar>
    <router-view />
  </div>
</template>
<script>
export default {
  methods: {
    async logOut() {
      const response = await fetch(`http://localhost:8000/users/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        localStorage.removeItem("token");
        this.$router.push({ name: "Login" });
      }
    },
  },
};
</script>

<style>
</style>
