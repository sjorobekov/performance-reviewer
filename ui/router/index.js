import Vue from 'vue'
import Router from 'vue-router'
import Authentication from '@/pages/authentication'
import Users from '@/pages/users'
import Reviews from '@/pages/reviews'
import DoReview from '@/pages/do_review'
import ReviewDetails from '@/pages/review_details'
import store from '../store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'DoReview',
      component: DoReview,
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: Authentication,
      meta: { anonymous: true },
    },
    {
      path: '/users',
      name: 'Users',
      component: Users,
    },
    {
      path: '/reviews',
      name: 'Reviews',
      component: Reviews,
    },
    {
      path: '/reviews/:reviewId',
      name: 'ReviewDetails',
      props: true,
      component: ReviewDetails,
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => !record.meta.anonymous)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters['security/isLoggedIn']) {
      next({
        path: '/signin',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
