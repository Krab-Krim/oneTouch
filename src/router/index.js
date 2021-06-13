import Vue from 'vue'
import Router from 'vue-router'
import Content from '../components/Content'
import Login from '../components/Login'
import Register from '../components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/content/:id',
      name: 'Content',
      component: Content
    }
  ],
  mode: 'history'
})
