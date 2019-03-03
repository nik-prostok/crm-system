<template>
	<div id="edit_category_ingridients">
		<div class="row no-gutters" id="body-row">
			<div class="col-lg-1">
				<sidebar></sidebar>
			</div>

			<div class="col-lg-11">
				<div class="container-fluid mt-2 mb-5">

					<div class="row">
						<div class="col-md-5 col-lg-5 mt-3 d-flex flex-row">
							<router-link to="/menu/cat_ingridients">
								<img class="back-arrow mt-2 mr-4" src="/static/image/arrow_back.png" alt="Back">
							</router-link>
							<h1 class="head-text">Редактирование категории ингредиентов</h1>
						</div>
					</div>

					<hr class="line mt-4">

					<div class="row">
						<div class="col-lg-2">
							<p class="title-form mt-2">Название</p>
						</div>
						<div class="col-lg-4">
							<div class="form-group">
								<input type="text" ref="search" class="form-control input-param" v-model="cat.title" placeholder="Например, 'Напитки'">
							</div>
						</div>
					</div>

					<hr class="hr-page">
					<button type="button" @click="sendCat" style="height: auto;" class="btn btn-success btn-lg btn-save">
						<div v-if="!stateSaving" style="color: white;" class="main-text">Сохранить категорию ингредиентов</div>
						<div v-if="stateSaving" style="color: white;" class="main-text">Сохранение...</div>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';

import ProductsService from '@/services/menu/ProductsService';
import Sidebar from '@/components/Sidebar';

export default {
  name: 'edit_cat_ing',
  components: {
    sidebar: Sidebar,
  },
  data() {
    return {
      editId: null,
      stateSaving: false,

      cat: {
        title: '',
      },
    };
  },
  mounted() {
    this.setEditId(this.$route.params.id);
    this.getCat();
  },
  methods: {
    async sendCat() {
      this.stateSaving = true;
      ProductsService.editCategoryIng(this.editId, this.cat)
      .then(response => {
        this.$router.push('/menu/cat_ingridients');
      })
      .catch(err => {
        console.log(err);
      })
      //
    },
    setEditId(id) {
      this.editId = id;
    },
    async getCat() {
			const vm = this
			const response = await ProductsService.fetchCategoryIng().catch(err => console.log(err))
			console.log(response.data)
      let [item] = response.data.filter(item => {
				return item._id === vm.$data.editId
			})
			console.log('item', item)
			vm.$data.cat.title = item.title
    },
  },
  computed: {

  },
};
</script>

<style>
#upload {
	display: none;
}
</style>
