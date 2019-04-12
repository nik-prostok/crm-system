import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/menu/products',
    },
    // Login
    {
      path: '/login',
      component: () => import('./components/Login.vue'),
    },
    {
      path: '/tables',
      component: () => import('./components/settings/tables/Tables.vue'),
    },
    {
      path: '/menu/products',
      component: () => import('./components/menu/Products.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/menu/products/add',
      component: () => import('./components/menu/AddProducts.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/menu/products/edit/:id',
      component: () => import('./components/menu/EditProduct.vue'),
      meta: { requiresAuth: true },
    },

    {
      path: '/menu/category_prod_cards',
      component: () => import('./components/menu/Category'),
      meta: { requiresAuth: true },
    },
    {
      path: '/menu/category_prod_cards/add',
      component: () => import('./components/menu/AddCategory'),
      meta: { requiresAuth: true },
    },
    {
      path: '/menu/category_prod_cards/edit/:id',
      component: () => import('./components/menu/EditCategory'),
      meta: { requiresAuth: true },
    },
    {
      path: '/menu/cat_ingridients',
      component: () => import('./components/menu/CategoryIngridients'),
      meta: { requiresAuth: true },
    },
    {
      path: '/menu/cat_ingridients/edit/:id',
      component: () => import('./components/menu/EditCategoryIngridients'),
      meta: { requiresAuth: true },
    },
    {
      path: '/menu/cat_ingridients/add',
      component: () => import('./components/menu/AddCategoryIngridients'),
      meta: { requiresAuth: true },
    },

    {
      path: '/menu/ingridients',
      component: () => import('./components/menu/Ingridients'),
      meta: { requiresAuth: true },
    },
    {
      path: '/menu/ingridients/add',
      component: () => import('./components/menu/AddIngridients'),
      meta: { requiresAuth: true },
    },
    {
      path: '/menu/ingridients/edit/:id',
      component: () => import('./components/menu/EditIngredients'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/menu/shops',
      component: () => import('./components/menu/Shops'),
      meta: { requiresAuth: true },
    },
    {
      path: '/menu/shops/add',
      component: () => import('./components/menu/AddShop'),
      meta: { requiresAuth: true },
    },
    {
      path: '/menu/shops/edit/:id',
      component: () => import('./components/menu/EditShop'),
      meta: { requiresAuth: true },
    },
    {
      path: '/menu/maps',
      component: () => import('./components/menu/TechMaps'),
      meta: { requiresAuth: true },
    },
    {
      path: '/menu/maps/add',
      component: () => import('./components/menu/AddTechMaps'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/menu/maps/edit/:id',
      component: () => import('./components/menu/EditTechMaps'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/menu/semi',
      component: () => import('./components/menu/Semi'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/menu/semi/add',
      component: () => import('./components/menu/AddSemi'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/menu/semi/edit/:id',
      component: () => import('./components/menu/EditSemi'),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});
