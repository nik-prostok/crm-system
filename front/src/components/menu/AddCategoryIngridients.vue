<template>
	<div id="add_products">
		<div class="row" id="body-row">
			<div class="col-2 col-sm-1">
				<sidebar></sidebar>
			</div>

			<div class="col-10 col-sm-11">
				<b-form class="container-fluid mt-2 mb-5" @submit="sendCatIng">

					<div class="row">
						<div class="col-md-5 col-lg-5 mt-3 d-flex flex-row">
							<router-link to="/menu/cat_ingridients">
								<img class="back-arrow mt-2 mr-4" src="/static/image/arrow_back.png" alt="Back">
							</router-link>
							<h1 class="head-text">Новая категория ингредиентов</h1>
						</div>
					</div>

					<hr class="line mt-4">

					<div class="row">
						<div class="col-lg-2">
							<p class="title-form mt-2">Название</p>
						</div>
						<div class="col-lg-4">
							<div class="form-group">
								<b-form-input required type="text" ref="search" class="form-control input-param" v-model="categoryIng.title" placeholder="Введите" />
							</div>
						</div>
					</div>

					<hr class="hr-page">
					<button type="submit" class="btn btn-success btn-lg btn-save">
						<div v-if="!stateSaving" style="color: white;" class="main-text">Добавить категорию</div>
						<div v-if="stateSaving" style="color: white;" class="main-text">Добавление...</div>
					</button>
				</b-form>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';

import ProductsService from '@/services/menu/ProductsService';
import Sidebar from '@/components/Sidebar';

export default {
  name: 'AddCatIng',
  components: {
    sidebar: Sidebar,
  },
  data() {
    return {

      stateSaving: false,

      categoryIng: {
        title: '',
      },
    };
  },
  mounted() {
  },
  methods: {
    async sendCatIng(evt) {
			evt.preventDefault();
      console.log(this.categoryIng);

      ProductsService.addCategoryIng(this.categoryIng);

      this.$router.push('/menu/cat_ingridients');
    },

  },
  computed: {

  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
#upload {
	display: none;
}
</style>
