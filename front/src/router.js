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
      component: () => import('./components/menu/Products.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/menu/products/add',
      component: () => import('./components/menu/AddProducts.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/menu/products/edit/:id',
      component: () => import('./components/menu/EditProduct.vue'),
      meta: { requiresAuth: true }
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
      meta: { requiresAuth: true }
    },
    {
      path: '/menu/category_prod_cards/add',
      component: require('./components/menu/AddCategory').default,
      meta: { requiresAuth: true }
    },
    {
      path: '/menu/category_prod_cards/edit/:id',
      component: require('./components/menu/EditCategory').default,
      meta: { requiresAuth: true }
    },
    {
      path: '/menu/cat_ingridients',
      component: require('./components/menu/CategoryIngridients').default,
      meta: { requiresAuth: true }
    },

    {
      path: '/menu/cat_ingridients/add',
      component: require('./components/menu/AddCategoryIngridients').default,
      meta: { requiresAuth: true }
    },

    {
      path: '/menu/ingridients',
      component: require('./components/menu/Ingridients').default,
      meta: { requiresAuth: true }
    },
    {
      path: '/menu/ingridients/add',
      component: require('./components/menu/AddIngridients').default,
      meta: { requiresAuth: true }
    },
    {
      path: '/menu/shops',
      component: require('./components/menu/Shops').default,
      meta: { requiresAuth: true }
    },
    {
      path: '/menu/shops/add',
      component: require('./components/menu/AddShop').default,
      meta: { requiresAuth: true }
    },
    {
      path: '/menu/shops/edit/:id',
      component: require('./components/menu/EditShop').default,
      meta: { requiresAuth: true }
    },
  ],
});
