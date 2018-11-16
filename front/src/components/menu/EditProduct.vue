<template>
	<div id="add_products">
		<div class="row no-gutters" id="body-row">
			<div class="col-lg-1 col-md-1 col-sm-1 col-xl-1">
				<sidebar></sidebar>
			</div>

			<div class="col-lg-11 col-md-11 col-sm-11 col-xl-11">
				<div class="container-fluid mt-2 mb-5">

					<div class="row">
						<div class="col-md-4 col-lg-5 mt-3 d-flex flex-row">
							<router-link to="/menu/products">
								<img class="back-arrow mt-2 mr-4" src="/static/image/arrow_back.png" alt="Back">
							</router-link>
							<h1 class="head-text">Редактирование товара</h1>
							<a class="main-text">{{$route.params.id}}</a>
						</div>
					</div>

					<hr class="line mt-4">

					<div class="row">
						<div class="col-lg-2 col-md-4">
							<p class="title-form mt-2">Название</p>
						</div>
						<div class="col-lg-4 col-md-4">
							<div class="form-group">
								<input type="text" ref="search" class="form-control input-param" v-model="product.title" placeholder="Введите">
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-lg-2">
							<p class="title-form mt-2">Категория</p>
						</div>
						<div class="col-lg-4">
							<div class="form-group">
								<multiselect class="my-multiselect" placeholder="Выберите" v-model="product.category" :multiple="false" :close-on-select="true" :options="categories"></multiselect>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-lg-2">
							<p class="title-form mt-2">Цех</p>
						</div>
						<div class="col-lg-4">
							<div class="form-group">
								<multiselect class="my-multiselect" placeholder="Выберите" :multiple="false" :close-on-select="true" v-model="product.shop" :options="shops"></multiselect>
								<!-- <input type="text" ref="search" class="form-control input-param" placeholder="Введите"> -->
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-lg-2">
							<p class="title-form mt-2">Цена и штрихкод</p>
						</div>
						<div class="col-lg-6 card-custom">
							<div class="card">
								<div class="card-body p-2">
									<div class="form-group">
										<p-radio style="font-size: 25px;" v-on:change="open_collapse" v-model="mod" value="without_mod" class="p-icon p-smooth check-custom mt-0 mb-2" color="success" >
											<i slot="extra" class="icon fa fa-check"></i>
											<div style="font-size: 18px;" class="main-text"><strong>Без модификаций </strong><small class="text-muted main-text">(один вид товара)</small></div>
										</p-radio>
										<b-collapse v-model="without_mod" class="mt-2" id="no-modif-collapse">
											<div class="row mt-4 ml-2">
												<div class="lg-8">
													<p class="main-text mb-2">Штрихкод</p>
													<div class="form-group">
														<input type="text" ref="search" class="form-control input-param" placeholder="Введите" v-model="product.bar_code">
													</div>
												</div>
											</div>
											<div class="row ml-2">
												<div class="col-lg-5">
													<div class="row">
														<div class="col-lg-7 p-0">
															<div class="main-text">Себестоимость</div>
															<div class="form-group">
																<input v-model.number="product.self_cost" type="text" ref="search" class="form-control input-param">
															</div>
														</div>
														<div class="col-lg-3 pr-0 align-self-center">
															<div class="main-text">руб.</div>
														</div>
														<div class="col-lg-2 align-self-center p-0">
															<div class="sign-mute-text"><strong>+</strong></div>
														</div>
													</div>
												</div>
												<div class="col-lg-4">
													<div class="row">
														<div class="col-lg-7 p-0">
															<div class="main-text">Наценка</div>
															<div class="form-group p-1">
																<input v-model.number="product.markup" type="text" ref="search" class="form-control input-param">
															</div>
														</div>
														<div class="col-lg-3 pr-0 align-self-center">
															<div class="main-text">%</div>
														</div>
														<div class="col-lg-2 align-self-center p-0">
															<div class="sign-mute-text"><strong>=</strong></div>
														</div>
													</div>
												</div>
												<div class="col-lg-3" style="display:inline-block;">
													<div class="row" style="overflow:auto;white-space:nowrap;">
														<div class="col-lg-7 p-0">
															<div class="main-text">Итого</div>
															<div class="form-group">
																<input v-model="getPrice" type="text" ref="search" class="form-control input-param">
															</div>
														</div>
														<div class="col-lg-3 pr-0 align-self-center">
															<div class="main-text">руб.</div>
														</div>
													</div>
												</div>
											</div>
										</b-collapse>
									</div>

									<hr class="hr-card-body">

									<div class="form-group">
										<p-radio style="font-size: 25px;" v-on:change="open_collapse" v-model="mod" value="with_mod" class="p-icon p-smooth check-custom mt-0 mb-2" color="success" >
											<i slot="extra" class="icon fa fa-check"></i>
											<div style="font-size: 18px;" class="main-text"><strong>С модификациями </strong></div>
										</p-radio>
										<b-collapse v-model="with_mod" class="mt-2" id="no-modif-collapse">
											<div class="mod" v-for="(mod_item,key) in product.modification">
												<hr>
												<div class="row mt-4 ml-2">
													<div class="col-lg-8">
														<div class="main-text mb-2">Название</div>
														<div class="form-group">
															<input type="text" ref="search" class="form-control input-param" placeholder="Введите" v-model="mod_item.title">
														</div>
													</div>
													<div class="col-lg-4" v-if="key">
														<b-link class="main-text" @click="deleteMod(key)">
															<div class="link-red link-hover">Удалить модификацию</div>
														</b-link>
													</div>
												</div>
												<div class="row ml-2">
													<div class="col-lg-8">
														<p class="main-text mb-2">Штрихкод</p>
														<div class="form-group">
															<input type="text" ref="search" class="form-control input-param" placeholder="Введите" v-model="mod_item.bar_code">
														</div>
													</div>
												</div>
												<div class="row ml-2">
													<div class="col-lg-5">
														<div class="row">
															<div class="col-lg-7 pr-0">
																<div class="main-text">Себестоимость</div>
																<div class="form-group">
																	<input v-model.number="mod_item.self_cost" type="text" ref="search" class="form-control input-param">
																</div>
															</div>
															<div class="col-lg-3 pr-0 align-self-center">
																<div class="main-text">руб.</div>
															</div>
															<div class="col-lg-2 align-self-center p-0">
																<div class="sign-mute-text"><strong>+</strong></div>
															</div>
														</div>
													</div>
													<div class="col-lg-3">
														<div class="row">
															<div class="col-lg-7 pr-0">
																<div class="main-text">Наценка</div>
																<div class="form-group p-1">
																	<input v-model.number="mod_item.markup" @input="updatePrice(key, mod_item.markup, mod_item.self_cost)" type="text" ref="search" class="form-control input-param">
																</div>
															</div>
															<div class="col-lg-3 pr-0 align-self-center">
																<div class="main-text">%</div>
															</div>
															<div class="col-lg-2 align-self-center p-0">
																<div class="sign-mute-text"><strong>=</strong></div>
															</div>
														</div>
													</div>
													<div class="col-lg-4" style="display:inline-block;">
														<div class="row" style="overflow:auto;white-space:nowrap;">
															<div class="col-lg-7 pr-0">
																<div class="main-text">Итого</div>
																<div class="form-group">
																	<input :value="mod_item.price" type="text" ref="search" class="form-control input-param">
																</div>
															</div>
															<div class="col-lg-3 pr-0 align-self-center">
																<div class="main-text">руб.</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="row ml-2">
												<b-link class="main-text" @click="addBlankMod">
													<div class="link-blue link-hover">Добавить еще одну модификацию</div>
												</b-link>
											</div>
										</b-collapse>
									</div>

								</div>
							</div>
						</div>
					</div>

					<hr class="hr-page">

					<div class="row">
						<div class="col-lg-2">
							<p class="title-form mt-2">Фотография</p>
						</div>
						<b-form-file accept="image/*" v-model="file" id="upload" class="mt-3" plain></b-form-file>
						<div class="col-lg-4 align-self-center">
							<b-link @click="selectFile" class="main-text">
								<div class="link-green link-hover">
									<u id="upload_link">Загрузить</u>
								</div>
							</b-link>

							<div v-if="!file" class="mt-3">
								<img v-b-modal.modal1 style="height: 50px; width: auto; cursor: pointer;" :src="photo_src" alt="" :href="photo_src" class="img-thumbnail">
								
								<i @click="resetFile" style="cursor: pointer;" class="fas fa-times"></i>
								<b-modal id="modal1" size="lg" :title="product.avatar" style="text-align: center;">
									<img :src="photo_src" alt=""  style="width: 600px; height: auto;">
								</b-modal>
							</div>
							<div v-else>
								{{file.name}}
								<i @click="resetFile" class="fas fa-times"></i>
							</div>


						</div>
					</div>

					<hr class="hr-page">

					<div class="row">
						<div class="col-lg-2">
							<p class="title-form mt-2">Цвет</p>
						</div>
						<div class="col-lg-10 d-inline-flex">
							<div class="container p-0 m-3" style="width: 80px;">
								<div class="row no-gutters">
									<div class="col pt-1">
										<p-radio style="font-size: 20px;" v-model="product.color" value="blue" class="p-icon p-smooth m-0" color="success" >
											<i slot="extra" class="icon fa fa-check"></i>
										</p-radio>
									</div>
									<div class="col p-0">
										<div class="elipse blue"></div>
									</div>
								</div>
							</div>

							<div class="container p-0 m-3" style="width: 80px;">
								<div class="row no-gutters">
									<div class="col p-0 pt-1">
										<p-radio style="font-size: 20px;" v-model="product.color" value="red" class="p-icon p-smooth m-0" color="success" >
											<i slot="extra" class="icon fa fa-check"></i>
										</p-radio>
									</div>
									<div class="col p-0">
										<div class="elipse red"></div>
									</div>
								</div>
							</div>

							<div class="container p-0 m-3" style="width: 80px;">
								<div class="row no-gutters">
									<div class="col p-0 pt-1">
										<p-radio style="font-size: 20px;" v-model="product.color" value="yellow" class="p-icon p-smooth m-0" color="success" >
											<i slot="extra" class="icon fa fa-check"></i>
										</p-radio>
									</div>
									<div class="col p-0">
										<div class="elipse yellow"></div>
									</div>
								</div>
							</div>

							<div class="container p-0 m-3" style="width: 80px;">
								<div class="row no-gutters">
									<div class="col p-0 pt-1">
										<p-radio style="font-size: 20px;" v-model="product.color" value="pink" class="p-icon p-smooth m-0" color="success" >
											<i slot="extra" class="icon fa fa-check"></i>
										</p-radio>
									</div>
									<div class="col p-0">
										<div class="elipse pink"></div>
									</div>
								</div>
							</div>

							<div class="container p-0 m-3" style="width: 80px;">
								<div class="row no-gutters">
									<div class="col p-0 pt-1">
										<p-radio style="font-size: 20px;" v-model="product.color" value="green" class="p-icon p-smooth m-0" color="success" >
											<i slot="extra" class="icon fa fa-check"></i>
										</p-radio>
									</div>
									<div class="col p-0">
										<div class="elipse green"></div>
									</div>
								</div>
							</div>

							<div class="container p-0 m-3" style="width: 80px;">
								<div class="row no-gutters">
									<div class="col p-0 pt-1">
										<p-radio style="font-size: 20px;" v-model="product.color" value="grey" class="p-icon p-smooth m-0" color="success" >
											<i slot="extra" class="icon fa fa-check"></i>
										</p-radio>
									</div>
									<div class="col p-0">
										<div class="elipse grey"></div>
									</div>
								</div>
							</div>

							<div class="container p-0 m-3" style="width: 80px;">
								<div class="row no-gutters">
									<div class="col p-0 pt-1">
										<p-radio style="font-size: 20px;" v-model="product.color" value="black" class="p-icon p-smooth m-0" color="success" >
											<i slot="extra" class="icon fa fa-check"></i>
										</p-radio>
									</div>
									<div class="col p-0">
										<div class="elipse black"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<hr class="hr-page">
					<div class="row">
						<div class="col-lg-2">
							<p class="title-form mt-2">Опции</p>
						</div>
						<div class="col-lg-10">
							<div class="row">
								<p-check style="font-size: 24px;" v-model="product.weight_goods" class="p-icon p-smooth mt-0 mb-2" color="success" >
									<i slot="extra" class="icon fa fa-check"></i>
									<div style="font-size: 18px;"  class="main-text">Весовой товар (цена за 100 гр)</div>
								</p-check>
							</div>
							<div class="row">
								<p-check v-model="product.no_dicsount" style="font-size: 24px;" class="p-icon p-smooth mt-0 mb-2" color="success" >
									<i slot="extra" class="icon fa fa-check"></i>
									<div style="font-size: 18px;" class="main-text">Не участвует в скидках</div>
								</p-check>
							</div>
						</div>
					</div>
					<hr class="hr-page">
					<button type="button" @click="sendProducts" class="btn btn-success btn-lg btn-save">
						<div v-if="!stateSaving" style="color: white;" class="main-text">Сохранить</div>
						<div v-if="stateSaving" style="color: white;" class="main-text">Сохранение...</div>
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
	
	name: 'edit_product',
	components: {
		'sidebar': Sidebar,
	},
	data() {
		return {
			editId: null,
			stateSaving: false,
			mod: 'without_mod',
			with_mod: false,
			without_mod: true,
			countMod: 1,

			photo_src: null,

			key: null,

			categories: [],
			shops: [],

			file: null,

			product: {
				title: '',
				category: '',
				shop: '',
				bar_code: null,
				self_cost: null,
				markup: null,
				price: null,
				color: [],
				weight_goods: 0,
				types: 0,
				SKU: 0,
				avatar: null,
				profit: null,
				no_dicsount: false,

				modification: [
				{
					bar_code: '',
					title_product: '',
					title: '',
					self_cost: null,
					markup: null,
					price: null,
					profit: null,
				}],
			}
		}
	},
	mounted() {
		this.getCategories()
		this.getShops()
		this.setEditId(this.$route.params.id)
		this.setValueIntoForm()
	},
	methods: {
		async setValueIntoForm(){
			const response = await ProductsService.fetchProducts()
			response.data.forEach(item => {
				if (item.id == this.editId){
					this.product = item
					if (this.product.types){
						this.mod = "with_mod"
					} else {
						this.mod = "without_mod"
					}
					this.open_collapse()
					if (this.product.photo != null){
							this.product.avatar = this.product.photo
							this.photo_src = 'http://89.223.27.152:8080/' + this.product.avatar
							console.log(this.photo_src);
						}
						/*if (this.product.avatar != null){
							this.file = this.product.avatar;
						}*/
						console.log(this.product);
						console.log(item);
					}
				})
		},
		setEditId(id){
			this.editId = id;
		},
		selectFile(){
			$("#upload:hidden").trigger('click');
		},
		resetFile(){
			this.product.avatar = null;
			this.photo_src = null;
			this.file = null;
		},
		sendProducts(){
			this.stateSaving = true;
			console.log(this.product);

			if (this.product.types == 0){
				this.product.modification = []
				this.product.profit = this.product.price - this.product.self_cost
			}

			if (this.product.color != null){
				if (this.product.color.length == 0){
					this.product.color = null;
				}
			}

			if (this.product.weight_goods == false){
				this.product.weight_goods = 0;
			} else if (this.product.weight_goods == true){
				this.product.weight_goods = 1;
			}


			this.product.photo = this.product.avatar;
			
			this.product.modification.forEach(item => {
				item.profit = item.price - item.self_cost
				item.title_product = this.product.title
			})

			var formData = new FormData();

			formData.append('product', JSON.stringify(this.product))


			console.log(this.product.id);

			if (this.file != null){
				ProductsService.deleteOnlyPhoto(this.product.id)
				formData.append('avatar', this.file);
			}

			ProductsService.deleteOnlyProduct(this.product.id)

			ProductsService.addProduct(formData)
			console.log(this.product)
			this.$router.push('/menu/products')
		},
		async getCategories (){
			var res = await ProductsService.fetchCategories()
			this.categories = res.data.map((item) => {
				return item.title
			})
		},
		async getShops(){
			const res = await ProductsService.fetchShops()
			this.shops = res.data.map((item) => {
				return item.title
			})
		},
		open_collapse() {
			if (this.mod == "without_mod"){
				this.without_mod = true;
				this.with_mod = false;
				this.product.types = 0;
			} else {
				this.without_mod = false;
				this.with_mod = true;
				this.product.types = 1;
			}
		},
		addBlankMod(){
			this.product.modification.push({
				bar_code: '',
				title_product: '',
				title_mode: '',
				self_cost: null,
				markup: null,
				price: null,
				profit: null,
			})
		},
		deleteMod(key){
			console.log(key);

			this.product.modification.splice(key, 1);
		},
		updatePrice(key, markup, self_cost){
			this.product.modification[key].markup = markup;
			this.product.modification[key].self_cost = self_cost;

			this.product.modification[key].price = this.product.modification[key].self_cost + (this.product.modification[key].self_cost / 100) * this.product.modification[key].markup;
		}
	},
	computed: {
		getPrice(){
			this.product.price = this.product.self_cost + (this.product.self_cost / 100) * this.product.markup;
			return this.product.price;
		},
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