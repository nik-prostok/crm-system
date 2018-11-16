<template>
	<div id="add_products">
		<div class="row no-gutters" id="body-row">
			<div class="col-lg-1">
				<sidebar></sidebar>
			</div>

			<div class="col-lg-11">
				<div class="container-fluid mt-2 mb-5">

					<div class="row">
						<div class="col-md-5 col-lg-5 mt-3 d-flex flex-row">
							<router-link to="/menu/shops">
								<img class="back-arrow mt-2 mr-4" src="/static/image/arrow_back.png" alt="Back">
							</router-link>
							<h1 class="head-text">Новый ингридиент</h1>
						</div>
					</div>

					<hr class="line mt-4">

					<div class="row">
						<div class="col-lg-2">
							<p class="title-form mt-2">Название</p>
						</div>
						<div class="col-lg-4">
							<div class="form-group">
								<input type="text" ref="search" class="form-control input-param" v-model="ingridient.title" placeholder="Введите">
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-lg-2">
							<p class="title-form mt-2">Категория</p>
						</div>
						<div class="col-lg-4">
							<div class="form-group">
								<multiselect class="my-multiselect" placeholder="Выберите" select-label="Нажмите Enter" deselectLabel="Enter для удаления" v-model="ingridient.category" :multiple="false" :close-on-select="true" :options="categoriesIng"></multiselect>
							</div>
						</div>
					</div>

					<hr class="hr-page">
					<button type="button" @click="sendShop" class="btn btn-success btn-lg btn-save">
						<div v-if="!stateSaving" style="color: white;" class="main-text">Добавить цех</div>
						<div v-if="stateSaving" style="color: white;" class="main-text">Добавление...</div>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';

	import ProductsService from '@/services/menu/ProductsService'
	import Sidebar from '@/components/Sidebar'

	export default {
		name: 'add_products',
		components: {
			'sidebar': Sidebar,
		},
		data() {
			return {
				stateSaving: false,
				mod: 'without_mod',
				with_mod: false,
				without_mod: true,
				countMod: 1,

				key: null,

				categoriesIng: [],

				ingridient: {
					title: '',
					category: '',

				},
			}
		},
		mounted() {
			fetchCategoryIng();
		},
		methods: {
			async sendShop(){
				ProductsService.addShop(this.shop)
				this.$router.push('/menu/shops')
			},
			async fetchCategoryIng(){
				const response = await ProductsService.fetchCategoryIng();
				this.categoriesIng = response.data
			}
		},
		computed: {
			
		},
	}
</script>

<style lang="scss">
@import '../../assets/less/menu.less'
</style>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
#upload {
	display: none;
}
</style>