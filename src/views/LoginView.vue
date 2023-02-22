<template>
  <div>
    <div class="container">
      <b-card
        title="Login"
        style="max-width: 20rem"
        class="mx-auto text-center mt-5"
      >
        <b-card-text>
          <b-form-input
            id="username"
            v-model="username"
            placeholder="Your Username"
            :state="usernameState"
            class="mb-2"
          ></b-form-input>
          <b-form-invalid-feedback id="username-feedback">
            {{ usernameValidationMsg }}
          </b-form-invalid-feedback>
          <b-form-input
            id="password"
            v-model="password"
            type="password"
            placeholder="Your Password"
            :state="passwordState"
            class="mb-2"
          ></b-form-input>
          <b-form-invalid-feedback id="password-feedback">
            {{ passwordValidationMsg }}
          </b-form-invalid-feedback>
        </b-card-text>
        <b-button variant="primary" @click="login">Log In</b-button>
        <div class="mt-2">
          <span>Don't have an account?</span>
          <router-link :to="{ name: 'SignUp' }"> Sign Up </router-link>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      username: "",
      password: "",
      usernameState: null,
      passwordState: null,
      passwordValidationMsg: "This field is required.",
      usernameValidationMsg: "This field is required.",
    };
  },
  methods: {
    validateForm() {
      this.usernameState = null;
      this.passwordState = null;
      let isFormValid = true;
      if (!this.username) {
        this.usernameState = false;
        isFormValid = false;
      }
      if (!this.password) {
        this.passwordState = false;
        isFormValid = false;
      }
      return isFormValid;
    },
    async login() {
      if (!this.validateForm()) {
        return;
      }

      const requestData = {
        username: this.username,
        password: this.password,
      };
      const response = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const responseData = await response.json();
      if (response.status === 200) {
        localStorage.setItem("token", responseData.token);
        this.$router.push({ name: "HomePage" });
      } else {
        this.usernameState = false;
        this.passwordState = false;
        this.usernameValidationMsg = "Invalid credentials.";
        this.passwordValidationMsg = "Invalid credentials.";
      }
    },
  },
  created() {
    if (localStorage.getItem("token")) {
      this.$router.push({ name: "HomePage" });
    }
  },
};
</script>