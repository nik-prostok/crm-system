import api from '../api';

export default {
  // Products
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
  updateProduct(id) {
    return api().put(`/api/products/${id}`);
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
  updateShop(id) {
    return api().put(`/api/shop/${id}`);
  },


  /*     // CategoryIngridients
      addCategoryIng(category) {
        return api().post('catIngrid', category)
      },
      fetchCategoryIng() {
        return api().get('catIngrid')
      },
      deleteCatIng(id) {
        return api().post('deleteCatIng', id)
      },
      return api().post('shops', shop)
    },
  */
  // CategoryIngridients
  addCategoryIng(category) {
    return api().post('/cat_ing', category)
  },
  fetchCategoryIng() {
    return api().get('/cat_ing')
  },
  deleteCatIng(id) {
    return api().post('/cat_ing' + id, id)
  },

  // Ingridients
  fetchIngridients() {
    return api().get('/ing')
  },
  addIngridients(ingridient) {
    return api().post('/ing', ingridient)
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


      // Map
      addMap(map) {
        return api().post('addmap', map)
      },
      fetchMaps() {
        return api().get('map')
      },
      delMap(id) {
        return api().post('deleteCard', id)
      },
      fetchModificators() {
        return api().get('modificators')
      }, */
};
