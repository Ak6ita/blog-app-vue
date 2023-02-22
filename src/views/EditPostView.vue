<template>
  <div class="container">
    <div class="edit-post-container">
      <div class="d-flex align-items-center">
        <p style="font-weight: bold">Title:</p>
        <div style="width: 100%" class="ms-2">
          <b-form-input
            v-model="postData.title"
            id="title"
            class="mb-2"
            :state="titleState"
          >
          </b-form-input>
          <b-form-invalid-feedback id="title-feedback">
            This field is required.
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <p style="font-weight: bold">Text:</p>
        <div style="width: 100%" class="ms-2">
          <b-form-input
            v-model="postData.description"
            id="textarea-rows"
            rows="8"
            :state="descriptionState"
          >
          </b-form-input>
          <b-form-invalid-feedback id="title-feedback">
            This field is required.
          </b-form-invalid-feedback>
        </div>
      </div>
      <div class="mt-5">
        <b-button variant="primary" @click="submit">Edit</b-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "EditPostView",
  data() {
    return {
      postData: {
        title: "",
        description: "",
      },
      descriptionState: null,
      titleState: null,
    };
  },
  methods: {
    validateForm() {
      this.descriptionState = null;
      this.titleState = null;
      let isFormValid = true;
      if (!this.postData.title) {
        this.titleState = false;
        isFormValid = false;
      }
      if (!this.postData.description) {
        this.descriptionState = false;
        isFormValid = false;
      }
      return isFormValid;
    },
    async submit() {
      if (!this.validateForm()) {
        return;
      }
      await this.editPost();
    },
    async getPostData() {
      const response = await fetch(
        `http://localhost:8000/posts/blog/${this.$route.params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      this.postData = responseData;
    },
    async editPost() {
      try {
        let requestData = {
          title: this.postData.title,
          description: this.postData.description,
        };
        const response = await fetch(
          `http://localhost:8000/posts/blog/${this.$route.params.id}/edit`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(requestData),
          }
        );
        if (response.ok) {
          console.log("Post edited successfully.");
          this.$router.push({ name: "HomePage" });
        } else {
          console.error("Error editing post.");
        }
      } catch (error) {
        console.error("Error editing post:", error);
      }
    },
  },
  async created() {
    await this.getPostData();
    if (!localStorage.getItem("token")) {
      this.$router.push({ name: "Login" });
    }
  },
};
</script>
<style>
.edit-post-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  margin-top: 50px;
  box-shadow: #5c9fe650;
}

.edit-post-container input:focus,
.edit-post-container textarea:focus {
  outline: none;
  box-shadow: 0 0 3px #007bff50;
}

.edit-post-container input,
.edit-post-container textarea {
  width: 100%;
  margin: 0 auto;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid #ced4da;
  border-radius: 3px;
}

.edit-post-container button {
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 auto;
}

.edit-post-container button:hover,
.edit-post-container button:focus {
  background-color: #0069d9;
}
</style>