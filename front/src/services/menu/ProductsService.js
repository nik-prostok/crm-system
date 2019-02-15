import api from '../api';

export default {
  // Products
  fetchProducts() {
    return api().get('/api/products');
  },
  addProduct(params) {
    return api().post('productsMod', params, {
      emulateJSON: true,
    });
  },
  deleteProduct(id) {
    return api().post('deleteProduct', id);
  },
  /* deleteOnlyProduct(id) {
    return api().post('deleteOnlyProduct', {id: id})
  },
  deleteOnlyPhoto(id) {
    return api().post('deleteOnlyPhoto', {id: id})
  },
*/
  // Categories
  fetchCategories() {
    return api().get('/category')
  },
  addCategory(category) {
    return api().post('/category', category, { headers: {'Content-Type': 'multipart/form-data' }})
  },
  deleteCategory(id) {
    return api().delete('/category/'+id, {id: id})
  },
/*
  // Shops
  fetchShops () {
    return api().get('shops')
  },
  addShop(shop) {
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
    return api().post('/cat_ing'+id, id)
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
