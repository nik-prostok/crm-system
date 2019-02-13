import api from '@/services/api'

export default {
  fetchCategories () {
    return api().get('categories')
  },
 fetchProduct () {
    return api().get('products')
  },
  fetchShops () {
    return api().get('shops')
  },
  fetchOficients () {
    return api().get('oficients')
  },
  fetchRestaurants(){
	return api().get('restaurants')
  },
  addProduct (params) {
    return api().post('products', params)
  }
}