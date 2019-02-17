import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // Login
    {
      path: '/login',
      component: () => import('./components/Login.vue'),
    },
    {
      path: '/menu/products',
      component: () => import('./components/menu/Products.vue')
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/menu/products/add',
      component: () => import('./components/menu/AddProducts.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
    {
      path: '/menu/category_prod_cards',
      component: require('./components/menu/Category').default,
    },
    {
      path: '/menu/category_prod_cards/add',
      component: require('./components/menu/AddCategory').default,
    },
    {
      path: '/menu/category_prod_cards/edit/:id',
      component: require('./components/menu/EditCategory').default,
    },
    {
      path: '/menu/cat_ingridients',
      component: require('./components/menu/CategoryIngridients').default,
    },

    {
      path: '/menu/cat_ingridients/add',
      component: require('./components/menu/AddCategoryIngridients').default,
    },

    {
      path: '/menu/ingridients',
      component: require('./components/menu/Ingridients').default,
    },
    {
      path: '/menu/ingridients/add',
      component: require('./components/menu/AddIngridients').default,
    },
  ],
});
