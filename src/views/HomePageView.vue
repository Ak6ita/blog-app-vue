<template>
  <div class="container">
    <div class="d-flex justify-content-center mt-5">
      <b-input-group class="mt-3">
        <b-form-input
          size="sm"
          v-model="searchUser"
          placeholder="Search User"
          v-on:keyup.enter="performSearch"
        />
        <b-input-group-append>
          <b-button
            style="position: absolute; right: 10px; top: 10px; z-index: 5"
            variant="outline-info"
            @click="performSearch"
          >
            <i class="fa fa-search"></i>Search
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
    <h1 style="padding: 40px; text-align: center">{{ userData.username }}</h1>
    <div class="text-center mb-5">
      <b-button :to="{ name: 'CreatePosts' }">Create Post</b-button>
    </div>
    <b-row align-h="center">
      <b-col md="6" v-for="post in posts" :key="post.id">
        <div style="max-width: 30rem" class="mb-3 mx-auto" align="center">
          <div style="border: 1px solid gray; border-radius: 4px">
            <b-card-text>
              <h3>{{ post.title }}</h3>
              <random-image />
              <p>{{ post.description }}</p>
              <b-button
                style="margin-bottom: 20px; font-size: 17px; margin-right: 10px"
                variant="btn btn-info"
                @click="
                  $router.push({
                    name: 'EditPost',
                    params: { id: post.id },
                  })
                "
                >Edit</b-button
              >
              <b-button
                style="margin-bottom: 20px"
                variant="btn btn-danger"
                @click="deletePost(post.id)"
                >Delete</b-button
              >
            </b-card-text>
          </div>
          <post-comment
            class="mt-3"
            @commentCreated="getPersonalPosts"
            :post="post"
          />
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RandomImage from "../components/RandomImage.vue";
import PostComment from "../components/PostComment.vue";
export default {
  name: "HomePageView",
  components: {
    RandomImage,
    PostComment,
  },
  data() {
    return {
      searchUser: "",
      userData: {
        id: "",
        username: "",
        email: "",
      },
      posts: [],
    };
  },
  methods: {
    performSearch() {
      this.$router.push({
        name: "UserPage",
        params: { username: this.searchUser },
      });
    },
    async getUserData() {
      const response = await fetch("http://localhost:8000/users/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const responseData = await response.json();
      this.userData = responseData;
    },
    async getPersonalPosts() {
      const response = await fetch("http://localhost:8000/posts/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      const responseData = await response.json();
      this.posts = responseData;
    },
    async deletePost(id) {
      await fetch(`http://localhost:8000/posts/blog/${id}/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      // Call the getPersonalPosts function
      await this.getPersonalPosts();
    },
  },
  async created() {
    await this.getUserData();
    await this.getPersonalPosts();
    if (!localStorage.getItem("token")) {
      this.$router.push({ name: "Login" });
    }
  },
};
</script>
<style scoped>
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px;
}

.btn-info {
  color: #fff;
  background-color: #17a2b8;
  border-color: #17a2b8;
}

.btn-info:hover {
  color: #fff;
  background-color: #138496;
  border-color: #117a8b;
}

.btn-danger {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  color: #fff;
  background-color: #c82333;
  border-color: #bd2130;
}
</style>>


