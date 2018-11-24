<template>
	<div class="products">
		
		<!-- Bootstrap row -->
		<div class="row no-gutters" id="body-row">
			<!-- MAIN -->
			<div class="col-lg-1 col-md-1 col-sm-1 col-xl-1">
				<sidebar></sidebar>
			</div>
			


			<div class="col-lg-11 col-md-11 col-sm-11 col-xl-11">
				<button class="btn" @click="getCategories">Обновить</button>
				<div id="printMe">
					<div class="container-fluid mt-2 pl-0">
						<div class="row">
							<div class="col-md-4 col-lg-5">
								<h1 class="head-text mt-3">Категории <small class="text-muted">{{length}}</small></h1>
							</div>
							<div class="col-md-8 col-lg-7">
								<div class="float-right">

									<router-link  to="/menu/category_prod_cards/add" class="main-text" style="text-decoration: none;">
										<button class="btn mt-3 btn-success btn-add btn-lg">
											<div  style="color: white;" class="main-text">Добавить категорию</div>
											
										</button>
									</router-link>
								</div>


							</div>
						</div>

						<hr class="line mt-4"> 

						<div class="row">

							<div class="col-md-7 col-lg-2 col-xl-4">
								<div class="form-group inner-addon "> 
									<div class="left-addon"> 
										<img class="fas fa-search" src="/static/image/search.png"> 
									</div> 
									<div v-if="search != ''" class="right-addon"> 
										<button class="fas btn-container" v-on:click="search = ''">
											<img src="/static/image/close.png">
										</button> 
									</div> 
									<input type="text" ref="search" class="form-control search pl-5" id="search" placeholder="Быстрый поиск" v-model="search"> 
								</div>


							</div>
						</div>

						<div class="mt-4">
							<div class="table-responsive">
								<table class="table table-custom table-bordered">
									<thead>
										<tr class="tr-th-custom-left"> 
											<th @click="sortEvent('count')" class="td-th-custom align-content-start">
												Категория
												<div v-if="sortColumn == 'category'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div>
											</th> 
											<th class="td-th-custom" style="width: 50px;">

											</th>
										</tr> 
									</thead>
									<tbody >
										<tr class="tr-td-custom" v-for="category in parentCategory">
											<td class="td-custom align-middle" style="text-align: left;">
												
												<!-- <div class="row ml-1">
													<div v-if="!category.collapse">
														<i @click="setCollapse(category)" v-b-toggle='category.id' class="fas fa-angle-right arrow-more mt-1"></i>
													</div>
													<div v-if="category.collapse">
														<i @click="setCollapse(category)" v-b-toggle='category.id' class="fas fa-angle-down arrow-more mt-1"></i>
													</div>
													
													<div v-if="category.photo != 'null'" class="col-1">
														<img class="img-fluid" :src=category.photo alt="">
													</div>
													<div v-else class="rectangle col-1">
														<div :class=category.color class="h-100">
															<p style="color: white; text-align: center;" class="pt-2">{{ category.title.slice(0,1) }}</p>
														</div>
													</div>

													<div class="col-6 align-self-center">{{ category.title }}</div>
												</div>
												<b-collapse :id="category.id">
													<div class="row ml-5 mt-2">
														<div v-if="!category.collapse">
															<i @click="setCollapse(category)" v-b-toggle='category.id' class="fas fa-angle-right arrow-more mt-1"></i>
														</div>
														<div v-if="category.collapse">
															<i @click="setCollapse(category)" v-b-toggle='category.id' class="fas fa-angle-down arrow-more mt-1"></i>
														</div>
														
														<div v-if="category.photo != 'null'" class="col-1">
															<img class="img-fluid" :src=category.photo alt="">
														</div>
														<div v-else class="rectangle col-1">
															<div :class=category.color class="h-100">
																<p style="color: white; text-align: center;" class="pt-2">{{ category.title.slice(0,1) }}</p>
															</div>
														</div>

														<div class="col-6 align-self-center">{{ category.title }}</div>
													</div>
													
												</b-collapse> -->
											</td>

											<td class="td-custom align-middle">
												<div class="d-flex flex-row">
													<div class="mr-2">
														<b-link :to=getHrefEdit(category.id) class="main-text">
															<div class="link-blue link-hover">Ред.</div>
														</b-link>
													</div>
													<div class="ml-2">
														<button class="btn-icon popoverButton" :id=getPopoverId(category.id)>
															<i class="fa fa-ellipsis-h"></i>
														</button>
														<b-popover :target=getPopoverId(category.id) triggers="focus">
															<ul class="actions-popover">
																<li @click=deleteCategory(category.id) class="action-item"><a style="text-decoration: none; cursor: pointer;" class="main-text">Удалить</a></li>

																<li class="action-item"><a style="text-decoration: none; cursor: pointer;" class="main-text">Скрыть</a></li>
															</ul>
														</b-popover>
													</div>
												</div>
											</td>
										</tr>

									</tbody>
								</table>
							</div>
							<p class="text-center" v-if="length == 0 "> Нет категорий, подходящим по выбранным фильтрам.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div><!-- body-row END -->
</template>

<script>

	import Vue from 'vue';

	import ProductsService from '@/services/menu/ProductsService'
	import Sidebar from '@/components/Sidebar'
	var arrayToTree = require('array-to-tree');

	export default {
		name: 'category',
		components: {
			'sidebar': Sidebar,
		},
		data () {
			return {
				search: '',
				categories: [],
				parentCategory:[],
				sortColumn: 'count',
				transformListCategories: [],

			}
		},
		mounted () {
			this.getCategories()
		},
		watch: {
			'$route'(){
				this.getCategories()
			}
		},
		methods: {
			async deleteCategory(id){
				console.log(id);
				const response = await ProductsService.deleteCategory(id);

				if (response.status == 200){
					this.category = [];
					this.getCategories();
				}
			},

			async getCategories () {
				const response = await ProductsService.fetchCategories()
				this.categories = response.data
				this.categories.forEach(item => {
					if (item.photo != 'null'){
						item.photo = "http://89.223.27.152:8080/" + item.photo;
					}
					if (item.parent_id != 60){
						item.collapse = false;
					}
				})
				this.getParentCategory()
				this.getTransformCategories()

				console.log(this.categories);
			},
			setCollapse(category){
				this.getParentCategory()
				this.parentCategory.forEach(item => {
					if (item.id == category.id){
						item.collapse = !item.collapse;
					}
				})
			},
			filterBySearch(category){
				if (this.search.length === 0) {
					return true;
				}
				return category.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1 
			},
			getPopoverId(id){
				return "popover" + id;
			},
			getHrefEdit(id){
				return '/menu/category_prod_cards/edit/' + id;
			},
			sortEvent(message){
				console.log(message);
				if (this.sortColumn == message){
					this.sort = !this.sort;
				} else {
					this.sortColumn = message;
				}
			},
			filterByParentCategory(category){
				if (category.parent_id == 60){
					return true;
				} else {
					return false;
				}
			},
			getParentCategory(){
				this.parentCategory = this.categories.filter(this.filterByParentCategory)
			},
			getTransformCategories(){
				console.log(arrayToTree(this.categories))
			}

		},
		computed: {
			length(){
				let length = 0;
				this.categories.forEach(item => {
					length++
				})
				return length;
			},
			getParentCategories(){
				return this.categories.filter(this.filterByParentCategory)
			}
		}
	}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="../../../static/style/main.css"></style>
<style lang="scss">
@import '../../assets/less/menu.less'
</style>