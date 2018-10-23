<template>
	<div class="products">
		
		<!-- Bootstrap row -->
		<div class="row" id="body-row">
			<sidebar></sidebar>
			<!-- MAIN -->
			<div class="col">
				<button @click="getProducts" class="btn">Обновить</button>
				<div id="printMe">
					<div class="container-fluid mt-2 ml-1">
						<div class="row">
							<div class="col-md-4 col-lg-5">
								<h1 class="head-text mt-3">Товары <small class="text-muted">{{FilterProducts.length}}</small></h1>
							</div>
							<div class="col-md-8 col-lg-7">
								<div class="float-lg-right">
									<div class="btn-shadow btn-group btn-group-custom mt-3 " role="group">


										<button type="button" class="btn btn-custom-border" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img class="img-button" id="img-button-export" src="/static/image/icon1.png" alt="icon">
										</button>
										<div class="dropdown-menu btn-custom-border" aria-labelledby="btnGroupDrop1"  >
											<a>Отображать столбцы</a>

											<div v-for="(item, key) in NameColumn " >
												<div class="form-check dropdown-item">
													<input class="form-check-input"   v-model="selectColumn" v-bind:value="item" type="checkbox" v-bind:id="item">
													<label class="form-check-label" v-bind:for="item">
														{{item}}
													</label>
												</div>
											</div>
										</div>
										<button type="button" class="btn btn-custom-border"><a class="main-text">Экcпорт</a></button>
										<button @click="print" type="button" class="btn btn-custom-border">
											<img class="img-button" src="/static/image/print.png" alt="icon">
											<a class="main-text">Печать</a>
										</button>
									</div>

									<div class=" btn-group btn-group-custom mt-3 ">
										<router-link class="btn btn-shadow btn-custom-border" to="/menu/products/add" tag="button">
											<a class="main-text" style="text-decoration: none;">Добавить товар</a>
										</router-link>
									</div>
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
							<div class="col-md-5 col-lg-10 col-xl-8">
								<div class="text-center btn-shadow btn-group btn-group-custom mb-3" role="group">
									<div class="btn-group btn-group-toggle" role="group">
										<button type="button" class="btn btn-custom-border" style=" border-radius: 16px 0 0px 16px;" data-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
											<a class="main-text">Категории </a>
											<img class="m-1" src="/static/image/down.png" alt="down">
										</button>
										<div class="dropdown-menu btn-custom-border" aria-labelledby="btnGroupDrop1"  >
											<div class="group mr-3 ml-3 mb-2">      
												<input type="text" ref="search" class="form-control search-cat" placeholder="Поиск..." v-model="selectCategoriesSearch">
											</div>
											<div v-for="(item, key) in FilterCategories " >
												<div class="form-check dropdown-item" >
													<input class="form-check-input"  type="checkbox"  v-bind:id="item.title" v-model="selectCategories" v-bind:value="item.title">
													<label class="form-check-label" v-bind:for="item.title">
														{{item.title}}
													</label>
												</div>
											</div>
											<button type="button" class="btn btn-custom-border ml-2 mb-1"v-on:click="selectCategories = [] ">Очистить</button> 
										</div>
									</div>

									<div class="btn-group btn-group-toggle" role="group">
										<button type="button" style="border-radius: 0px 16px 16px 0px;" class="btn btn-custom-border" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<a class="main-text">Цех</a><img class="m-1" src="/static/image/down.png" alt="down">
										</button>
										<div class="dropdown-menu btn-custom-border" aria-labelledby="btnGroupDrop1"  >
											<div class="group mr-3 ml-3 mb-2">      
												<input type="text" ref="search" class="form-control search-cat" placeholder="Поиск..." v-model="selectRestaurantsSearch">
											</div>
											<div v-for="(item, key) in FilterRestaurants " >
												<div class="form-check dropdown-item" >
													<input class="form-check-input"  type="checkbox"  v-bind:id="item.title" v-model="selectRestaurants" v-bind:value="item.title">
													<label class="form-check-label" v-bind:for="item.title">
														{{item.title}}
													</label>
												</div>
											</div>
											<button type="button" class="btn btn-custom-border ml-2 mb-1"v-on:click="selectRestaurants = [] ">Очистить</button> 
										</div>
									</div>
								</div>

								<div v-for="(item, index) in selectFiltersNames" class="btn-shadow btn-group btn-group-custom mr-2 mb-3">
									<a class="main-text btn mt-1">{{item}}</a>
									<button class="btn-transparent" v-on:click="deleteFilter(index)"><i class="fas fa-times"></i></button>
								</div>


								<button id="popoverButton-event" class="btn btn-filter mb-3">
									<img src="/static/image/+.png" alt="+">
									Фильтр
								</button>
								<b-popover ref="popover" placement="bottom" target="popoverButton-event" title="Показать только те, в которых:">
									<div class="mr-1 ml-1">
										<div class="text-center" v-if="FilterFilter.length === 0">Нет параметров</div>
										<div class="mb-2">
											<multiselect v-model="selectFilterSearch" :multiple="false" :close-on-select="true" :options="FilterFilter"></multiselect>
										</div>
										<div v-if="getNameFilterList.indexOf(selectFilterSearch) > -1">
											<div class="mb-2">
												<multiselect v-model="selectConditionSearch" :multiple="false" :close-on-select="true" :options="getOptionsFilter"></multiselect>
											</div>
											<div v-if="selectFilterSearch != 'Цех'" class="mb-2">
												<input @keyup.enter="addFilter" type="text" ref="search" class="form-control search-cat" placeholder="Введите..." v-model="countFilterValue">
											</div>
										</div>
										<div class="container-fluid mt-1">
											<b-btn @click="addFilter">Добавить</b-btn>
											<b-btn @click="clearFilter">Очистить</b-btn>
										</div>
									</div>
								</b-popover>
							</div>
						</div>

						<div class="container-fluid mt-4">
							<table class="table table-custom table-bordered">
								<thead>
									<tr class="tr-th-custom"> 
										<th @click="sortEvent('title')" class="td-th-custom" v-if="((selectColumn.indexOf('Название')> -1 )||(selectColumn.length == 0))">Название
											<div v-if="sortColumn == 'title'">
												<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
												<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
											</div>
										</th>
										<th @click="sortEvent('count')" class="td-th-custom" v-if=" ((selectColumn.indexOf('Категория')> -1 )||(selectColumn.length == 0))">
											Категория
											<div v-if="sortColumn == 'category'">
												<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
												<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
											</div>
										</th> 
										<th @click="sortEvent('barcode')" class="td-th-custom" v-if=" ((selectColumn.indexOf('Штрихкод')> -1 )||(selectColumn.length == 0))">
											Штрихкод
											<div v-if="sortColumn == 'barcode'">
												<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
												<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
											</div>
										</th>
										<th @click="sortEvent('SKU')" class="td-th-custom" v-if=" ((selectColumn.indexOf('SKU')> -1 )||(selectColumn.length == 0))">
											SKU
											<div v-if="sortColumn == 'SKU'">
												<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
												<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
											</div>
										</th>
										<th @click="sortEvent('shop')" class="td-th-custom" v-if=" ((selectColumn.indexOf('Цех')> -1 )||(selectColumn.length == 0))">
											Цех
											<div v-if="sortColumn == 'shop'">
												<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
												<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
											</div>
										</th>
										<th @click="sortEvent('types')" class="td-th-custom" v-if=" ((selectColumn.indexOf('Тип')> -1 )||(selectColumn.length == 0))">
											Тип
											<div v-if="sortColumn == 'types'">
												<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
												<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
											</div>
										</th>
										<th @click="sortEvent('weight_goods')" class="td-th-custom" v-if=" ((selectColumn.indexOf('Весовой товар')> -1 )||(selectColumn.length == 0))">
											Весовой товар
											<div v-if="sortColumn == 'weight_goods'">
												<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
												<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
											</div>
										</th>
										<th @click="sortEvent('unit')" class="td-th-custom" v-if=" ((selectColumn.indexOf('Единица измерения')> -1 )||(selectColumn.length == 0))">
											Единица измерения
											<div v-if="sortColumn == 'unit'">
												<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
												<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
											</div>
										</th>
										<th @click="sortEvent('self_cost')" class="td-th-custom" v-if=" ((selectColumn.indexOf('Себестоимость')> -1 )||(selectColumn.length == 0))">
											Себестоимость
											<div v-if="sortColumn == 'self_cost'">
												<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
												<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
											</div>
										</th>
										<th @click="sortEvent('price')" class="td-th-custom" v-if=" ((selectColumn.indexOf('Цена')> -1 )||(selectColumn.length == 0))">
											Цена
											<div v-if="sortColumn == 'price'">
												<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
												<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
											</div>
										</th>
										<th @click="sortEvent('profit')" class="td-th-custom" v-if=" ((selectColumn.indexOf('Прибыль')> -1 )||(selectColumn.length == 0))">
											Прибыль
											<div v-if="sortColumn == 'profit'">
												<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
												<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
											</div>
										</th>
										<th @click="sortEvent('markup')" class="td-th-custom" v-if=" ((selectColumn.indexOf('Наценка')> -1 )||(selectColumn.length == 0))">
											Наценка
											<div v-if="sortColumn == 'markup'">
												<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
												<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
											</div>
										</th>
										<th class="td-th-custom">
											Действия
										</th>
									</tr> 
								</thead>
								<tbody>
									<tr v-for="product in FilterProducts" class="tr-td-custom">
										<td class="td-custom" v-if=" ((selectColumn.indexOf('Название')> -1 )||(selectColumn.length == 0))" >
											<div class="row">
												<div v-if="product.photo != 'null'" class="col-6 pr-1">
													<img style="height: 40px; width: auto;" :src=product.photo alt="">
												</div>
												<div v-else class="rectangle col-6 pr-1">
													<div :class=product.color class="h-100">
														<p style="color: white;" class="p-2">{{ product.title.slice(0,1) }}</p>
													</div>
												</div>
												<div class="col-6 pl-0 align-self-center">{{ product.title }}</div>
											</div>
										</td>
										<td class="td-custom align-middle" v-if=" ((selectColumn.indexOf('Категория')> -1 )||(selectColumn.length == 0))">{{product.category}}</td>
										<td class="td-custom align-middle" v-if=" ((selectColumn.indexOf('Штрихкод')> -1 )||(selectColumn.length == 0))">
											<div v-if="product.types == 0">
												{{product.bar_code}}
											</div>
										</td>
										<td class="td-custom align-middle" v-if=" ((selectColumn.indexOf('SKU')> -1 )||(selectColumn.length == 0))">{{product.SKU}}</td>
										<td class="td-custom align-middle" v-if=" ((selectColumn.indexOf('Цех')> -1 )||(selectColumn.length == 0))">{{product.shop}}</td>
										<td class="td-custom align-middle" v-if=" ((selectColumn.indexOf('Тип')> -1 )||(selectColumn.length == 0))">
											<div v-if="product.types == 0">
												Товар
											</div>
											<div v-else>
												Мод. товара
											</div>
										</td>
										<td class="td-custom align-middle" v-if=" ((selectColumn.indexOf('Весовой товар')> -1 )||(selectColumn.length == 0))">
											<div v-if="product.weight_goods == '1'">
												Да
											</div>
											<div v-else>Нет</div>
										</td>
										<td class="td-custom align-middle" v-if=" ((selectColumn.indexOf('Единица измерения')> -1 )||(selectColumn.length == 0))">{{product.unit}}</td>
										<td class="td-custom align-middle" v-if=" ((selectColumn.indexOf('Себестоимость')> -1 )||(selectColumn.length == 0))">
											<div v-if="product.types == 0">
												{{product.self_cost}} <i class="fas fa-ruble-sign ml-1"></i>
											</div>
											<div v-else>-</div>
										</td>
										<td class="td-custom align-middle" v-if="((selectColumn.indexOf('Цена')> -1 )||(selectColumn.length == 0))">
											<div v-if="product.types == 0">
												{{product.price}} <i class="fas fa-ruble-sign ml-1"></i>
											</div>
											<div v-else>-</div>
										</td>
										<td class="td-custom align-middle" v-if=" ((selectColumn.indexOf('Прибыль')> -1 )||(selectColumn.length == 0))">
											<div v-if="product.types == 0">
												{{product.profit}}<i class="fas fa-ruble-sign ml-1"></i>
											</div>
											<div v-else>-</div>
										</td>
										<td class="td-custom align-middle" v-if=" ((selectColumn.indexOf('Наценка')> -1 )||(selectColumn.length == 0))">
											<div v-if="product.types == 0">
												{{product.markup}} <i class="fas fa-percent ml-1"></i>
											</div>
											<div v-else>-</div>
										</td>
										<td class="td-custom align-middle">
											<button @click=deleteProduct(product.id) class="btn btn-danger">Удалить</button>
										</td>
									</tr>
											<!-- <tr v-if="product.modification.length != 0" class="tr-td-custom" v-for="mod in product.modification">
												<td class="td-custom" v-if=" ((selectColumn.indexOf('Название')> -1 )||(selectColumn.length == 0))" >{{ mod.title }}
												</td>
												<td class="td-custom" v-if=" ((selectColumn.indexOf('Категория')> -1 )||(selectColumn.length == 0))"></td>
												<td class="td-custom" v-if=" ((selectColumn.indexOf('Штрихкод')> -1 )||(selectColumn.length == 0))">
														{{mod.bar_code}}
												</td>
												<td class="td-custom" v-if=" ((selectColumn.indexOf('SKU')> -1 )||(selectColumn.length == 0))">{{product.SKU}}</td>
												<td class="td-custom" v-if=" ((selectColumn.indexOf('Цех')> -1 )||(selectColumn.length == 0))"></td>
												<td class="td-custom" v-if=" ((selectColumn.indexOf('Тип')> -1 )||(selectColumn.length == 0))"></td>
												<td class="td-custom" v-if=" ((selectColumn.indexOf('Весовой товар')> -1 )||(selectColumn.length == 0))"></td>
												<td class="td-custom" v-if=" ((selectColumn.indexOf('Единица измерения')> -1 )||(selectColumn.length == 0))">{{product.unit}}</td>
												<td class="td-custom" v-if=" ((selectColumn.indexOf('Себестоимость')> -1 )||(selectColumn.length == 0))">
													mod.self_cost
												</td>
												<td class="td-custom" v-if="((selectColumn.indexOf('Цена')> -1 )||(selectColumn.length == 0))">
													mod.price
												</td>
												<td class="td-custom" v-if=" ((selectColumn.indexOf('Прибыль')> -1 )||(selectColumn.length == 0))">
													mod.profit
												</td>
												<td class="td-custom" v-if=" ((selectColumn.indexOf('Наценка')> -1 )||(selectColumn.length == 0))">
													mod.markup
												</td>
											</tr> -->
										</tbody>
									</table>
									<p class="text-center" v-if=" FilterProducts.length == 0 "> Нет товаров, подходящим по выбранным фильтрам.</p>
								</div>
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

	var menuListWord = [
	{
		title: "Равно", 
		sign: "==",
	},
	{
		title: "Не равно",
		sign: "!=",
	},
	{
		title: "Содержит",
		sign: ".indexOf",
	}];

	var menuListNum = [
	{
		title: "Больше", 
		sign: ">",
	},
	{
		title: "Меньше",
		sign: "<",
	},
	{
		title: "Равно",
		sign: "==",
	},
	{
		title: "Не равно",
		sign: "!=",
	}];

	export default {
		name: 'products',
		components: {
			'sidebar': Sidebar,
		},
		data () {
			return {
				NameColumn: ["Название","Категория","Штрихкод","SKU","Цех","Тип","Весовой товар","Ед.измерения","Себестоимость","Цена","Прибыль","Наценка"],

				filterList: [
				{
					NameFilter: 'Цех',
					NameVar: 'shop',
					MenuList: [],
				},{
					NameFilter: 'Товар',
					NameVar: 'title',
					MenuList: this.getMenuListWordName(),
				},{
					NameFilter: 'Кол-во',
					NameVar: 'count',
					MenuList: this.getMenuListNumName(),
				},{
					NameFilter: 'Валовый оборот',
					NameVar: 'gross_turnover',
					MenuList: this.getMenuListNumName(),
				},{
					NameFilter: 'Скидка',
					NameVar: 'discount',
					MenuList: this.getMenuListNumName(),
				},
				{
					NameFilter: 'Выручка',
					NameVar: 'receipts',
					MenuList: this.getMenuListNumName(),
				},
				{
					NameFilter: 'Прибыль',
					NameVar: 'profit',
					MenuList: this.getMenuListNumName(),
				},
				],
				products: [],
				filtered: [],
				categories: [],
				oficients: [],
				shops: [],
				restaurants: [],
				selectCategoriesSearch:'',
				selectRestaurantsSearch:'',
				selectOficientsSearch:'',
				search: '',
				sort: false,
				printFlag: false,
				selectCategories: [],
				selectRestaurants: [],
				selectOficiants: [],
				//selectColumn: ["Название", "Категория", "Себестоимость", "Цена", "Наценка"],
				selectColumn: ["Название","Категория","Штрихкод","SKU","Цех","Тип","Весовой товар","Ед.измерения","Себестоимость","Цена","Прибыль","Наценка"],

				selectFilterSearch: '',
				selectConditionSearch: '',
				countFilterValue: '',
				selectFilter: '',
				selectFilters: [],
				selectFiltersNames: [],

				startDate: 1539032429,
				endDate: 1546117229,
				nameDate: '9 октября 2018 - 30 декабря 2018',

				sortColumn: 'count',
			}
		},
		mounted () {
			this.getProducts()
		},
		methods: {
			async deleteProduct(id){
				console.log(id);
				const response = await ProductsService.deleteProduct({
					'id': id
				});

				if (response.status == 200){
					this.products = [];
					this.getProducts();
				}
			},
			async getProducts(){
				const response = await ProductsService.fetchProducts()
				console.log(response);
				this.products = response.data
				this.products.forEach(item => {
					if (item.photo != 'null'){
						item.photo = "http://89.223.27.152:8080/" + item.photo;
					}
				})
			},
			print () {
				this.$htmlToPaper('printMe');
			},
			clearFilter() {
				this.selectFilterSearch = '';
				this.selectConditionSearch = '';
				this.countFilterValue = '';
			},
			filterBySearch(product){
				if (this.search.length === 0) {
					return true;
				}
				return product.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1 
			},
			filterByCategory(product){
				if (this.selectCategories.length === 0){
					return true
				} else {
					return this.selectCategories.some(function(item){
						return product.category.toLowerCase().indexOf(item.toLowerCase()) > -1
					})
				}
			},
			filterByRestaurant(product){
				if (this.selectRestaurants.length === 0){
					return true
				} else {
					return this.selectRestaurants.some(function(item){
						return product.restaurant.toLowerCase().indexOf(item.toLowerCase()) > -1
					})
				}
			},
			filterByOficiants(product){
				if (this.selectOficiants.length === 0){
					return true
				} else {
					return this.selectOficiants.some(function(item){
						return product.oficient.toLowerCase().indexOf(item.toLowerCase()) > -1
					})
				}
			},
			filterByONews(product){
				if (this.selectFilters.length === 0){
					return true
				} else {
					return this.selectFilters.every(item => {
						return this.filterByONews2(product, item)
					})
				}

			},
			filterByDate(product){
				if ((this.startDate != 0) || (this.endDate != 0)){
					if ((product.date > this.startDate) && (product.date < this.endDate)){
						return true;
					} else return false;
				} else return true;
			},
			filterByONews2(product,val){
				if (val.length === 0){
					return true
				} else {
					return (eval(val))
				}
			},
			sortByColumn(productA, productB){
				if ((this.sortColumn == 'title') || (this.sortColumn == 'category') || (this.sortColumn == 'oficient') || (this.sortColumn == 'restaurant') ||(this.sortColumn == 'shop')){
					if (this.sort){
						return productA[this.sortColumn].localeCompare(productB[this.sortColumn]);
					} else {
						return !productA[this.sortColumn].localeCompare(productB[this.sortColumn]);
					}
				} else if (this.sort){
					return productA.count - productB.count;
				} else {
					return productB.count - productA.count;
				}
			},
			sortEvent(message){
				console.log(message);
				if (this.sortColumn == message){
					this.sort = !this.sort;
				} else {
					this.sortColumn = message;
				}
			},
			filterBySearchCategories(categories){
				if (this.selectCategoriesSearch.length === 0) {
					return true;
				}
				return categories.title.toLowerCase().indexOf(this.selectCategoriesSearch.toLowerCase()) > -1 
			},
			filterBySearchRestaurants(restaurants){
				if (this.selectRestaurantsSearch.length === 0) {
					return true;
				}
				return restaurants.title.toLowerCase().indexOf(this.selectRestaurantsSearch.toLowerCase()) > -1 
			},
			filterBySearchOficients(oficients){
				if (this.selectOficientsSearch.length === 0) {
					return true;
				}
				return oficients.fio.toLowerCase().indexOf(this.selectOficientsSearch.toLowerCase()) > -1
			},
			filterBySearchfilter(NameFilter){
				if (this.selectFilter.length === 0) {
					return true;
				}
				return NameFilter.toLowerCase().indexOf(this.selectFilter.toLowerCase()) > -1
			},
			addFilter() {
				self = this;

				this.filterList.forEach(function(item, i){
					var NameFilter = '';
					if (self.selectFilterSearch == item.NameFilter){
						self.selectFilter = 'product.' + item.NameVar;
						NameFilter += item.NameFilter;
						console.log(self.selectFilter);
						item.MenuList.forEach((menuItem, index) => {
							if (self.selectConditionSearch == menuItem){

								NameFilter += ' ' + menuItem + ' ' + self.countFilterValue;

								if (item.NameFilter == 'Товар'){
									if (menuItem == "Содержит"){
										self.selectFilter += menuItem + '("' + self.countFilterValue + '") > -1';
										menuListWord.forEach((item) => {
											self.selectFilter = self.selectFilter.replace(item.title, item.sign);
										})
									} else {
										self.selectFilter += menuItem + '("' + self.countFilterValue + '")';
										menuListWord.forEach((item) => {
											self.selectFilter = self.selectFilter.replace(item.title, item.sign);
										})
									}
								} else if (item.NameFilter == 'Цех'){
									self.selectFilter += "==" + "('" +  self.selectConditionSearch + "')";
									console.log(self.selectFilter); 
								} else {
									self.selectFilter += menuItem + self.countFilterValue;
									menuListNum.forEach((item) => {
										self.selectFilter = self.selectFilter.replace(item.title, item.sign);
									})
								}


								console.log(self.selectFilter);
								self.selectFilters.push(self.selectFilter);
								self.selectFiltersNames.push(NameFilter);
								console.log(self.selectFiltersNames);
								console.log(self.selectFilters);
								self.selectFilterSearch = '';
								self.selectFilter = ''
								self.countFilterValue = ''
							}
						})
					}

				})
			},
			getMenuListWordName(){
				return menuListWord.map((item, i) => {
					return item.title;
				})
			},
			getMenuListNumName(){
				return menuListNum.map((item, i) => {
					return item.title;
				})
			},
			getMenuListWordSign(){
				return menuListWord.map((item, i) => {
					return item.sign;
				})
			},
			getMenuListNumSign(){
				return menuListNum.map((item, i) => {
					return item.sign;
				})
			},
			deleteFilter(index){
				console.log(index);
				this.selectFiltersNames.splice(index, 1);
				this.selectFilters.splice(index, 1);
			},
		},
		computed: {

			sCount(){
				return this.FilterProducts.reduce(function(sum, current){
					return sum + Number(current.count);
				}, 0);
			},
			sGross_turnover(){
				return this.FilterProducts.reduce(function(sum, current){
					return sum + Number(current.gross_turnover);
				}, 0).toFixed(2);
			},
			sDiscount(){
				return this.FilterProducts.reduce(function(sum, current){
					return sum + Number(current.discount);
				}, 0).toFixed(2);
			},
			sReceipts(){
				return this.FilterProducts.reduce(function(sum, current){
					return sum + Number(current.receipts);
				}, 0).toFixed(2);
			},
			sProfit(){
				return this.FilterProducts.reduce(function(sum, current){
					return sum + Number(current.profit);
				}, 0).toFixed(2);
			},
			FilterProducts(){
				return this.products
				.filter(this.filterBySearch)
				.filter(this.filterByCategory)
				.sort(this.sortByColumn);
			},
			FilterCategories(){
				return this.categories
				.filter(this.filterBySearchCategories)
			},
			FilterRestaurants(){
				return this.restaurants
				.filter(this.filterBySearchRestaurants)
			},
			FilterOficients(){
				return this.oficients
				.filter(this.filterBySearchOficients)
			},
			FilterFilter(){
				return this.getNameFilterList
				.filter(this.filterBySearchfilter)
			},
			getNameFilterList(){
				return this.filterList.map(function(item, i){
					return item.NameFilter;
				})
			},
			getNameVarFilterList(){
				return this.filterList.map(function(item, i){
					return item.NameVar;
				})
			},
			getShopNames(){
				return this.shops.map((item, i) => {
					return item.title;
				})
			},
			getOptionsFilter(){
				console.log(this.filterList[this.getNameFilterList.indexOf(this.selectFilterSearch)].MenuList);
				return this.filterList[this.getNameFilterList.indexOf(this.selectFilterSearch)].MenuList;
			},
		}
	}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="../../../static/style/main.css"></style>
<style lang="scss">
@import '../../assets/less/menu.less'
</style>