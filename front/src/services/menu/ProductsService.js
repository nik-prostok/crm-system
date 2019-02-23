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
    return api().post('/cat_ing', category);
  },
  fetchCategoryIng() {
    return api().get('/cat_ing');
  },
  deleteCatIng(id) {
    return api().post(`/cat_ing/${id}`, id);
  },

  // Ingridients
  fetchIngridients() {
    return api().get('/ing');
  },
  addIngridients(ingridient) {
    return api().post('/ing', ingridient);
  },
  /*
    // Semi
    addSemi(semi) {
      return api().post('semi', semi)
    },
    fetchSemi() {
      return api().get('semi')
    },

      // Ingridients
      fetchIngridients() {
        return api().get('ingridients')
      },
      addIngridients(ingridient) {
        return api().post('ingridients', ingridient)
      },

      // Semi
      addSemi(semi) {
        return api().post('semi', semi)
      },
      fetchSemi() {
        return api().get('semi')
      },
*/

  // Map
  addMap(map) {
    return api().post('/api/map', map, {
      emulateJSON: true,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  fetchMaps() {
    return api().get('/api/map');
  },
  delMap(id) {
    return api().delete(`/api/map/${id}`);
  },
  updateMap(id, map) {
    return api().put(`/api/map/${id}`, map);
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
