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
							<h1 class="head-text">Новый цех</h1>
						</div>
					</div>

					<hr class="line mt-4">

					<div class="row">
						<div class="col-lg-2">
							<p class="title-form mt-2">Название</p>
						</div>
						<div class="col-lg-4">
							<div class="form-group">
								<input type="text" ref="search" class="form-control input-param" v-model="shop.title" placeholder="Например, 'Кухня'">
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-lg-2">
							<!-- <p class="title-form mt-2">Печатать бегунки</p> -->
						</div>
						<div class="col-lg-10">
							<div class="row ml-1">
								<p-check v-model="shop.print_runners" style="font-size: 24px;" class="p-icon p-smooth mt-0 mb-2" color="success" >
									<i slot="extra" class="icon fa fa-check"></i>
									<div style="font-size: 18px;" class="main-text">Печатать бегунки</div>
								</p-check>
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

				categories: [],

				shop: {
					title: '',
					print_runners: false,
				},
			}
		},
		mounted() {
			
		},
		methods: {
			async sendShop(){
				ProductsService.addShop(this.shop)
				this.$router.push('/menu/shops')
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