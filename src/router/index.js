import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUpView from "../views/SignUpView.vue"
import LoginView from '../views/LoginView.vue'
import PostCreateView from "../views/PostCreateView.vue"
import EditPostView from "../views/EditPostView.vue"
import HomePageView from "../views/HomePageView.vue"
import UserPageView from "../views/UserPageView.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: "/signup",
    name: "SignUp",
    component: SignUpView
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView
  },
  {
    path: "/post/create",
    name: "CreatePosts",
    component: PostCreateView
  },
  {
    path: "/post/:id",
    name: "EditPost",
    component: EditPostView
  },
  {
    path: "/home",
    name: "HomePage",
    component: HomePageView
  },
  {
    path: "/user/:username",
    name: "UserPage",
    component: UserPageView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
