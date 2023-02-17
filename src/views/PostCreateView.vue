<template>
  <b-container>
    <b-row align-h="center">
      <b-col cols="6">
        <div class="create-post-card">
          <h1>Create Post</h1>
          <br />
          <div class="wrapper">
            <p>
              <b>Title:</b>
              <b-form-input
                id="title"
                v-model="title"
                placeholder="Write Title for the Blog"
                class="mb-2 w-100"
                :state="titleState"
              ></b-form-input>
              <b-form-invalid-feedback id="title-feedback">
                This field is required.
              </b-form-invalid-feedback>
            </p>
            <br />
            <div>
              <p>
                <b>Text:</b>
              </p>
              <b-form-input
                v-model="description"
                id="textarea-rows"
                placeholder="What's on your mind?"
                class="w-100"
                :state="descriptionState"
              ></b-form-input>
            </div>
            <b-form-invalid-feedback id="title-feedback">
              This field is required.
            </b-form-invalid-feedback>
            <br />
            <br />
          </div>
          <b-row class="text-center" align-v="center">
            <b-col
              ><b-button
                class="main-navigation-button"
                @click="submit"
                variant="primary"
                >Post</b-button
              ></b-col
            >
          </b-row>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  name: "PostCreateView",
  data() {
    return {
      title: "",
      description: "",
      descriptionState: null,
      titleState: null,
      posts: [],
    };
  },
  methods: {
    validateForm() {
      this.descriptionState = null;
      this.titleState = null;
      let isFormValid = true;
      if (!this.title) {
        this.titleState = false;
        isFormValid = false;
      }
      if (!this.description) {
        this.descriptionState = false;
        isFormValid = false;
      }
      return isFormValid;
    },
    async submit() {
      if (!this.validateForm()) {
        return;
      }
      const requestData = {
        title: this.title,
        description: this.description,
      };
      const response = await fetch("http://localhost:8000/posts/blog/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(requestData),
      });
      const responseData = await response.json();
      if (response.status === 201) {
        this.$router.push({ name: "HomePage" });
        this.posts.push(responseData);
      }
    },
  },
};
</script>
<style scoped>
.create-post-card {
  border: 1px solid rgb(122, 119, 119);
  border-radius: 8px;
  padding: 20px;
  margin: 0 auto;
  margin-top: 20px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

p {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

b {
  margin-bottom: 10px;
  font-size: 18px;
}

b-form-input {
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 10px;
  font-size: 16px;
  display: inline;
  margin-bottom: 20px;
  width: 100%;
}

#textarea-rows {
  height: 350px;
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 10px;
  font-size: 16px;
  width: 100%;
}

.button-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
button {
  background-color: #1778f2;
  color: #fff;
  border-radius: 8px;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
}

button:hover {
  background-color: #1366c6;
}

button:active {
  background-color: #1255b2;
}

.b-form-invalid-feedback {
  color: #dc3545;
  font-size: 14px;
  margin-top: 5px;
}
</style>