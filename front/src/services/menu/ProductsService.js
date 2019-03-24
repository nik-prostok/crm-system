import api from '../api';

export default {
  // Products
  verifyToken() {
    return api().post('/api/verifyToken');
  },
  fetchProducts() {
    return api().get('/api/products');
  },
  addProduct(product) {
    return api().post('/api/products', product, {
      emulateJSON: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteProduct(id) {
    return api().delete(`/api/products/${id}`);
  },
  updateProduct(product, id) {
    return api().put(`/api/products/${id}`, product, {
      emulateJSON: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getProduct(id) {
    return api().get(`/api/products/${id}`);
  },
  copyProduct(id) {
    return api().post(`/api/products/${id}`, {
      emulateJSON: true,
    });
  },
  // Categories
  fetchCategories() {
    return api().get('/api/category');
  },
  addCategory(category) {
    return api().post('/api/category', category, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteCategory(id) {
    return api().delete(`/api/category/${id}`);
  },
  editCategory(category) {
    // eslint-disable-next-line no-underscore-dangle
    return api().put(`/api/category/${category._id}`, category, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // Shops
  fetchShops() {
    return api().get('/api/shop');
  },
  addShop(shop) {
    return api().post('/api/shop', shop);
  },
  deleteShop(id) {
    return api().delete(`/api/shop/${id}`);
  },
  updateShop(id, shop) {
    return api().put(`/api/shop/${id}`, shop);
  },

  // CategoryIngridients
  addCategoryIng(category) {
    return api().post('/api/cat_ing', category);
  },
  fetchCategoryIng() {
    return api().get('/api/cat_ing');
  },
  deleteCatIng(id) {
    return api().delete(`/api/cat_ing/${id}`);
  },
  editCategoryIng(id, catIng) {
    return api().put(`/api/cat_ing/${id}`, catIng);
  },

  // Ingridients
  fetchIngridients() {
    return api().get('/api/ing');
  },
  addIngridients(ingridient) {
    return api().post('/api/ing', ingridient);
  },
  deleteIngridients(id) {
    return api().delete(`/api/ing/${id}`);
  },
  updateIngridients(id, ing) {
    return api().put(`/api/ing/${id}`, ing);
  },

  // Semi
  addSemi(semi) {
    return api().post('/api/semi', semi);
  },
  fetchSemi() {
    return api().get('/api/semi');
  },
  deleteSemi(id) {
    return api().delete(`/api/semi/${id}`);
  },
  updateSemi(id, semi) {
    return api().put(`/api/semi/${id}`, semi);
  },

  // Map
  addMap(map) {
    return api().post('/api/map', map, {
      emulateJSON: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getMap(id) {
    return api().get(`/api/map/${id}`);
  },
  fetchMaps() {
    return api().get('/api/map');
  },
  delMap(id) {
    return api().delete(`/api/map/${id}`);
  },
  updateMap(id, map) {
    return api().put(`/api/map/${id}`, map, {
      emulateJSON: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  copyMap(id) {
    return api().post(`/api/map/${id}`);
  },

  // Modificators
  addModificator(mod) {
    return api().post('/api/modificator', mod);
  },
  fetchModificator() {
    return api().get('/api/modificator');
  },
  deleteModificator(id) {
    return api().delete(`/api/modificator/${id}`);
  },
  updateModificator(id, mod) {
    return api().put(`/api/modificator/${id}`, mod);
  },
};
