<template>
  <div>
    <hr v-if="hasHr" />
    <ul v-if="post.comment_set.length">
      <li v-for="comment in post.comment_set" :key="comment.id" class="comment">
        <div class="profile-picture">
          <img
            v-if="comment.user.image"
            :src="comment.user.image"
            alt="User Avatar"
          />
          <img
            v-else
            src="https://picsum.photos/id/1025/30/30"
            alt="Default Profile Picture"
          />
        </div>
        <div class="comment-content">
          <div class="comment-text">
            <span class="comment-user">{{ comment.user.username }}</span>
            <span class="comment-message">{{ comment.body }}</span>
          </div>
        </div>
      </li>
    </ul>
    <p v-else>No comments yet.</p>
    <div class="form-group">
      <label for="newComment">Add Comment</label>
      <textarea
        v-model="newComment"
        id="newComment"
        class="form-control"
      ></textarea>
    </div>
    <b-button @click="postComment" class="btn btn-primary mt-3">
      Post Comment
    </b-button>
  </div>
</template>

<script>
export default {
  name: "PostComment",
  props: ["post", "hasHr"],
  data() {
    return {
      newComment: "",
    };
  },
  methods: {
    async postComment() {
      if (!this.newComment) {
        return;
      }
      const response = await fetch(
        `http://localhost:8000/posts/${this.post.id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            body: this.newComment,
          }),
        }
      );
      if (response.ok) {
        this.$emit("commentCreated");
        this.newComment = "";
      }
      console.log(response);
    },
  },
};
</script>


<style>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.comment {
  display: flex;
  margin-bottom: 10px;
}

.profile-picture {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  position: relative;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.profile-picture::before {
  content: "";
  background-image: url("https://picsum.photos/id/1025/30/30");
  background-size: cover;
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.comment .comment-content {
  display: flex;
  flex-direction: column;
}

.comment .comment-user {
  font-weight: bold;
  white-space: nowrap;
}

.comment .comment-message {
  font-size: 14px;
  margin-left: 5px;
}

.comment .comment-text {
  background-color: #f2f3f5;
  padding: 10px;
  border-radius: 20px;
}

.comment .comment-text p {
  margin: 0;
}

.comment .comment-date {
  font-size: 12px;
  color: #8c8d8f;
  margin-left: 40px;
}
.form-control {
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  font-size: 16px;
  resize: vertical;
  height: 60px;
}
</style>