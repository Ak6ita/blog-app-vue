<template>
  <b-container>
    <h1 class="mb-5">{{ userData.username }}</h1>
    <b-row>
      <b-col md="6" v-for="post in posts" :key="post.id">
        <b-card
          border-variant="secondary"
          header-class="font-weight: bold; font-size: 25px"
          header-border-variant="secondary"
          style="max-width: 30rem"
          class="mb-3"
          align="center"
        >
          <b-card-text>
            <h3 style="text-align: left">
              {{ post.title }}
            </h3>
            <p>{{ post.description }}</p>
            <random-image />
            <post-comment
              :hasHr="true"
              @commentCreated="getAllPosts"
              :post="post"
            />
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import PostComment from "../components/PostComment.vue";
import RandomImage from "../components/RandomImage.vue";
export default {
  name: "UserPageView",
  components: {
    PostComment,
    RandomImage,
  },
  data() {
    return {
      userData: {
        id: "",
        username: "",
        email: "",
      },
      posts: [],
      comments: [
        {
          user: "",
          body: "",
          post: "",
        },
      ],
      newComment: "",
    };
  },
  methods: {
    async getUserData() {
      const response = await fetch(
        `http://localhost:8000/users/${this.$route.params.username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      this.userData = responseData;
    },
    async getAllPosts() {
      const response = await fetch(
        `http://localhost:8000/posts/users/${this.$route.params.username}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        }
      );
      const responseData = await response.json();
      this.posts = responseData;
    },
  },
  async created() {
    await this.getUserData();
    await this.getAllPosts();
  },
};
</script>

<style scoped>
h1 {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
}

b-card {
  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
}

h3 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

p {
  font-size: 18px;
  margin-bottom: 20px;
}

.post-comment {
  margin-top: 20px;
}

.random-image {
  margin-bottom: 20px;
}
</style>

