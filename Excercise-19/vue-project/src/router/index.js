import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import QuestionView from '../views/QuestionView.vue'
import ResultView from '../views/ResultView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/question/:id',
    name: 'Question',
    component: QuestionView,
    props: true
  },
  {
    path: '/result',
    name: 'Result',
    component: ResultView
  },
  // Redirect any unknown paths to Home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router