<template>
  <div class="container">
    <b-card
      title="Sign Up"
      style="max-width: 20rem"
      class="mx-auto text-center mt-5"
    >
      <b-card-text>
        <b-form-input
          id="email"
          v-model="email"
          type="email"
          placeholder="Your Email"
          :state="emailState"
          class="mb-2"
        ></b-form-input>
        <b-form-invalid-feedback id="email-feedback">
          This field is required.
        </b-form-invalid-feedback>

        <b-form-input
          id="username"
          v-model="username"
          placeholder="Your Username"
          :state="usernameState"
          class="mb-2"
        ></b-form-input>
        <b-form-invalid-feedback id="username-feedback">
          This field is required.
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
        <b-form-input
          id="confirm-password"
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          :state="confirmPasswordState"
          class="mb-2"
        ></b-form-input>
        <b-form-invalid-feedback id="confirm-password-feedback">
          {{ confirmPasswordValidationMsg }}
        </b-form-invalid-feedback>
      </b-card-text>

      <b-button variant="primary" @click="signup">Sign Up</b-button>
      <div class="mt-2">
        <span>Already have an account?</span>
        <router-link :to="{ name: 'Login' }"> Login </router-link>
      </div>
      <b-alert class="mt-2" :show="visibleGeneralError" variant="danger">
        {{ generalErrorMsg }}
      </b-alert>
    </b-card>
  </div>
</template>
<script>
export default {
  name: "SignUpView",
  data() {
    return {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      emailState: null,
      usernameState: null,
      passwordState: null,
      confirmPasswordState: null,
      passwordValidationMsg: "This field is required.",
      confirmPasswordValidationMsg: "This field is required.",
      generalErrorMsg: "",
      visibleGeneralError: false,
    };
  },
  methods: {
    validateForm() {
      this.emailState = null;
      this.usernameState = null;
      this.passwordState = null;
      this.confirmPasswordState = null;
      let isFormValid = true;
      if (!this.email) {
        this.emailState = false;
        isFormValid = false;
      }
      if (!this.username) {
        this.usernameState = false;
        isFormValid = false;
      }
      if (!this.password) {
        this.passwordState = false;
        isFormValid = false;
      }
      if (!this.confirmPassword) {
        this.confirmPasswordState = false;
        isFormValid = false;
      }
      if (this.password !== this.confirmPassword) {
        this.passwordState = false;
        this.confirmPasswordState = false;
        this.passwordValidationMsg = "Passwords do not match";
        this.confirmPasswordValidationMsg = "Passwords do not match";
        isFormValid = false;
      }
      return isFormValid;
    },
    async signup() {
      console.log("tuka sme vo sign up");
      if (!this.validateForm()) {
        console.log("formot ne e validen");
        return;
      }

      const requestData = {
        username: this.username,
        email: this.email,
        password: this.password,
      };
      const response = await fetch("http://localhost:8000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const responseData = await response.json();
      if (response.status === 201) {
        localStorage.setItem("token", responseData.token);
        this.$router.push({ name: "HomePage" });
      } else {
        this.generalErrorMsg = "";
        for (const key in responseData) {
          let errorsArr = responseData[key];
          this.generalErrorMsg += errorsArr.join(" ");
          this.generalErrorMsg += " ";
        }
        this.visibleGeneralError = true;
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