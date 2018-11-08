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
							<router-link to="/menu/category_prod_cards">
								<img class="back-arrow mt-2 mr-4" src="/static/image/arrow_back.png" alt="Back">
							</router-link>
							<h1 class="head-text">Добавление категории</h1>
						</div>
					</div>

					<hr class="line mt-4">

					<div class="row">
						<div class="col-lg-2">
							<p class="title-form mt-2">Название</p>
						</div>
						<div class="col-lg-4">
							<div class="form-group">
								<input type="text" ref="search" class="form-control input-param" v-model="category.title" placeholder="Введите">
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-lg-2">
							<p class="title-form mt-2">Родительская категория</p>
						</div>
						<div class="col-lg-4">
							<div class="form-group">
								<multiselect class="my-multiselect" placeholder="Выберите" select-label="Нажмите Enter" deselectLabel="Enter для удаления" v-model="category.parent_title" :multiple="false" :close-on-select="true" :options="categories"></multiselect>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-lg-2">
							<p class="title-form mt-2">Допустимые транзакции</p>
						</div>
						<div class="col-lg-10">
							<div class="row ml-1">
								<p-check v-model="category.flag_income" style="font-size: 24px;" class="p-icon p-smooth mt-0 mb-2" color="success" >
									<i slot="extra" class="icon fa fa-check"></i>
									<div style="font-size: 18px;" class="main-text">Доходы</div>
								</p-check>
							</div>
							<div class="row ml-1">
								<p-check style="font-size: 24px;" v-model="category.flag_consumption" class="p-icon p-smooth mt-0 mb-2" color="success" >
									<i slot="extra" class="icon fa fa-check"></i>
									<div style="font-size: 18px;"  class="main-text">Расходы</div>
								</p-check>
							</div>
						</div>
					</div>
					<hr class="hr-page">
					<button type="button" @click="sendProducts" class="btn btn-success btn-lg btn-save">
						<div v-if="!stateSaving" style="color: white;" class="main-text">Добавить категорию</div>
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

				categories: [],

				category: {
					title: '',
					parent_title: '',
					flag_consumption: true,
					flag_income: false,
				},
			}
		},
		mounted() {
			this.getCategories()
		},
		methods: {
			async sendProducts(){
				
				console.log(this.category);

				ProductsService.addCategory(this.category)

				this.$router.push('/menu/category_prod_cards')
			},
			async getCategories (){
				var res = await ProductsService.fetchCategories()
				this.categories = res.data.map((item) => {
					return item.title
				})
			},
			
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