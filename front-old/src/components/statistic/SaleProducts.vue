<template>
	<div class="products">
		
		<!-- Bootstrap row -->
		<div class="row" id="body-row">
			<sidebar></sidebar>
			<!-- MAIN -->
			<div class="col">
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


									<div class="btn-shadow btn-group btn-group-custom mt-3 pr-3" style="border-width: 2px;">
										<a class="btn main-text mt-1" style="vertical-align: middle; cursor: default;"><span>{{nameDate}}</span></a>

										<div class=" d-flex flex-column">
											<!-- <input style type="text" name="daterange"/> -->
											<button  type="button" name="daterange" class="btn btn-custom mt-1"><img class="" src="/static/image/down.png" alt="down"></button>
										</div>
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
										<button type="button" class="btn btn-custom-border" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<a class="main-text">Заведение</a><img class="m-1" src="/static/image/down.png" alt="down">
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

									<div class="btn-group btn-group-toggle" role="group">
										<button type="button" style="border-radius: 0px 16px 16px 0px;" class="btn btn-custom-border" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
											<a class="main-text">Официант</a><img class="m-1" src="/static/image/down.png" alt="down">
										</button>
										<div class="dropdown-menu btn-custom-border" aria-labelledby="btnGroupDrop1"  >
											<div class="group mr-3 ml-3 mb-2">      
												<input type="text" ref="search" class="form-control search-cat" placeholder="Поиск..." v-model="selectOficientsSearch">
											</div>
											<div v-for="(item, key) in FilterOficients " >
												<div class="form-check dropdown-item" >
													<input class="form-check-input"  type="checkbox"  v-bind:id="item.fio" v-model="selectOficiants" v-bind:value="item.fio">
													<label class="form-check-label" v-bind:for="item.fio">
														{{item.fio}}
													</label>
												</div>
											</div>
											<button type="button" class="btn btn-custom-border ml-2 mb-1"v-on:click="selectOficiants = [] ">Очистить</button> 
										</div>
									</div>
								</div>

								<div v-for="(item, index) in selectFiltersNames" class="btn-shadow btn-group btn-group-custom mr-2 mb-3">
									<a class="main-text btn">{{item}}</a>
									<button class="btn-container" v-on:click="deleteFilter(index)"><i class="fas fa-times"></i></button>
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
										<th @click="sortEvent('title')" class="td-th-custom" v-if=" ((selectColumn.indexOf('Товар')> -1 )||(selectColumn.length == 0))">Товар
											<div v-if="sortColumn == 'title'">
												<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
												<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
											</div></th>
											<th @click="sortEvent('count')" class="td-th-custom" v-if=" ((selectColumn.indexOf('Кол-во')> -1 )||(selectColumn.length == 0))">
												Кол-во
												<div v-if="sortColumn == 'count'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div>
											</th> 
											<th @click="sortEvent('gross_turnover')" class="td-th-custom" v-if=" ((selectColumn.indexOf('Валовый оборот')> -1)||(selectColumn.length == 0)) ">Валовый оборот
												<div v-if="sortColumn == 'gross_turnover'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div>
											</th> 
											<th @click="sortEvent('discount')" class="td-th-custom" v-if=" ((selectColumn.indexOf('Скидка')> -1 )||(selectColumn.length == 0))">Скидка
												<div v-if="sortColumn == 'discount'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div>
											</th> 
											<th @click="sortEvent('receipts')" class="td-th-custom" v-if=" ((selectColumn.indexOf('Выручка')> -1 )||(selectColumn.length == 0))">Выручка
												<div v-if="sortColumn == 'receipts'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div>
											</th> 
											<th @click="sortEvent('profit')" class="td-th-custom" v-if=" ((selectColumn.indexOf('Прибыль')> -1 )||(selectColumn.length == 0))">Прибыль
												<div v-if="sortColumn == 'profit'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div>
											</th>
											<th @click="sortEvent('category')" class="td-th-custom" v-if=" ((selectColumn.indexOf('Категории')> -1 )||(selectColumn.length == 0))">Категории
												<div v-if="sortColumn == 'category'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div>
											</th>
											<th @click="sortEvent('oficient')" class="td-th-custom" v-if=" ((selectColumn.indexOf('Официант')> -1 )||(selectColumn.length == 0))">Официант
												<div v-if="sortColumn == 'oficient'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div>
											</th>
											<th @click="sortEvent('restaurant')" class="td-th-custom"  v-if=" ((selectColumn.indexOf('Заведение')> -1 )||(selectColumn.length == 0))">Заведение
												<div v-if="sortColumn == 'restaurant'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div>
											</th>
											<th @click="sortEvent('shop')" class="td-th-custom" v-if=" ((selectColumn.indexOf('Цех')> -1 )||(selectColumn.length == 0))">Цех
												<div v-if="sortColumn == 'shop'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div>
											</th>
										</tr> 
									</thead>
									<tbody>
										<tr class="tr-td-custom" v-for="product in FilterProducts">
											<td class="td-custom" v-if=" ((selectColumn.indexOf('Товар')> -1 )||(selectColumn.length == 0))" >{{product.title }}</td>
											<td class="td-custom" v-if=" ((selectColumn.indexOf('Кол-во')> -1 )||(selectColumn.length == 0))">{{product.count}}</td>
											<td class="td-custom" v-if=" ((selectColumn.indexOf('Валовый оборот')> -1 )||(selectColumn.length == 0))">{{product.gross_turnover}}</td>
											<td class="td-custom" v-if=" ((selectColumn.indexOf('Скидка')> -1 )||(selectColumn.length == 0))">{{product.discount}}</td>
											<td class="td-custom" v-if=" ((selectColumn.indexOf('Выручка')> -1 )||(selectColumn.length == 0))">{{product.receipts}}</td>
											<td class="td-custom" v-if=" ((selectColumn.indexOf('Прибыль')> -1 )||(selectColumn.length == 0))">{{product.profit}}</td>
											<td class="td-custom" v-if=" ((selectColumn.indexOf('Категории')> -1 )||(selectColumn.length == 0))">{{product.category}}</td>
											<td class="td-custom" v-if=" ((selectColumn.indexOf('Официант')> -1 )||(selectColumn.length == 0))">{{product.oficient}}</td>
											<td class="td-custom" v-if=" ((selectColumn.indexOf('Заведение')> -1 )||(selectColumn.length == 0))">{{product.restaurant}}</td>
											<td class="td-custom" v-if=" ((selectColumn.indexOf('Цех')> -1 )||(selectColumn.length == 0))">{{product.shop}}</td>
										</tr>

										<tr v-if="FilterProducts.length != 0 ">
											<td><b>Итого</b></td>
											<td v-if=" ((selectColumn.indexOf('Кол-во')> -1 )||(selectColumn.length == 0))">{{sCount}}</td>
											<td v-if=" ((selectColumn.indexOf('Валовый оборот')> -1 )||(selectColumn.length == 0))">{{sGross_turnover}} руб.</td>
											<td v-if=" ((selectColumn.indexOf('Скидка')> -1 )||(selectColumn.length == 0))">{{sDiscount}} руб.</td>
											<td v-if=" ((selectColumn.indexOf('Выручка')> -1 )||(selectColumn.length == 0))"> {{sReceipts}} руб.</td>
											<td v-if=" ((selectColumn.indexOf('Прибыль')> -1 )||(selectColumn.length == 0))">{{sProfit}} руб.</td>
										</tr> 
									</tbody>
								</table>
								<p class="text-center" v-if=" FilterProducts.length == 0 "> Нет товаров, подходящим по выбранным фильтрам.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div><!-- body-row END -->
</template>

<script>

	$(document).on('click', '.dropdown-menu', function (e) {
		e.stopPropagation();
	});

	import Vue from 'vue';

	import ProductsService from '@/services/statistic/SalesProductsService'
	import Sidebar from '@/components/Sidebar'

	import VueHtmlToPaper from 'vue-html-to-paper';

	const options = {
		name: '_blank',
		specs: [
		'fullscreen=yes',
		'titlebar=yes',
		'scrollbars=yes'
		],
		styles: [
		'https://fonts.googleapis.com/css?family=Open+Sans',
		'/static/style/main.css',
		'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
		'https://use.fontawesome.com/releases/v5.3.1/css/all.css'
		]
	}

	Vue.use(VueHtmlToPaper, options);

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
		name: 'salesproducts',
		components: {
			'sidebar': Sidebar,
		},
		data () {
			return {

				selectColumn:[],
				NameColumn: ["Категории","Цех","Товар","Заведение","Официант","Кол-во","Валовый оборот","Скидка","Выручка","Прибыль","Бонусами","Средняя себест.","Средняя цена","% наценки","food cost"],

				filterList: [
				{
					NameFilter: 'Цех',
					NameVar: 'shop',
					MenuList: [],
				},
				{
					NameFilter: 'Товар',
					NameVar: 'title',
					MenuList: this.getMenuListWordName(),
				},{
					NameFilter: 'Кол-во',
					NameVar: 'count',
					MenuList: this.getMenuListNumName(),
				}
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
				selectColumn: [],

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
			this.getCategories()
			this.getOficients()
			this.getShops()
			this.getRestaurants()
			this.rangeDatePicker()
		},
		methods: {
			clearFilter() {
				this.selectFilterSearch = '';
				this.selectConditionSearch = '';
				this.countFilterValue = '';
			},
			rangeDatePicker(){
				var $vm = this;
				moment.locale('ru'); 
				$(function() {
					$('button[name="daterange"]').daterangepicker({
						ranges: {
							'Сегодня': [moment(), moment()],
							'Вчера': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
							'Последние 7 дней': [moment().subtract(6, 'days'), moment()],
							'Последние 30 дней': [moment().subtract(29, 'days'), moment()],
							'Этот месяц': [moment().startOf('month'), moment().endOf('month')],
							'Прошлый месяц': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
						},
						locale: {
							"format": "DD/MM/YYYY",
							"separator": " - ",
							"applyLabel": "Принять",
							"cancelLabel": "Отмена",
							"fromLabel": "From",
							"toLabel": "To",
							"customRangeLabel": "Заданный",
							"weekLabel": "W",
							"daysOfWeek": [
							"Пн",
							"Вт",
							"Ср",
							"Чт",
							"Пт",
							"Сб",
							"Вс"],
							"monthNames": [
							"Январь",
							"Февраль",
							"Март",
							"Апрель",
							"Май",
							"Июнь",
							"Июль",
							"Август",
							"Сентябрь",
							"Октябрь",
							"Ноябрь",
							"Декабрь"
							],
							"firstDay": 0
						},
						"alwaysShowCalendars": true,
						"startDate": "03/10/2018",
						"endDate": "10/12/2018",
						"minDate": "DD/MM/YYYY",
						"maxDate": "DD/MM/YYYY",
						"opens": "left"
					}, function(start, end, label) {
						/*this.startDate = 0;
						this.endDate = 0;*/

						var startD = moment(start).format('X');
						var endD = moment(end).format('X');

						
						$vm.startDate = startD;
						$vm.endDate = endD;
						
						$vm.nameDate = moment(start).format('DD MMMM YYYY') + " - " + moment(end).format('DD MMMM YYYY');
						console.log('New date range selected: ' + startD + ' to ' + endD + ' (predefined range: ' + label + ')');
					});
				});
			},
			print () {
				this.$htmlToPaper('printMe');
			},
			async getProducts () {
				const response = await ProductsService.fetchProduct()
				this.products = response.data
				this.filtered = response.data
			},
			async getCategories () {
				const response = await ProductsService.fetchCategories()
				this.categories = response.data
			},
			async getOficients () {
				const response = await ProductsService.fetchOficients()
				this.oficients = response.data
			},
			async getShops () {
				const response = await ProductsService.fetchShops()
				this.shops = response.data
				this.filterList[0].MenuList = this.shops.map((item, i) => {
					return item.title;
				})
			},
			async getRestaurants(){
				const response = await ProductsService.fetchRestaurants()
				this.restaurants = response.data
			},
			clear: function(e) {
				e.preventDefault()
				this.$data.search = ""
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
			onDateSelected: function (daterange) {
				console.log(daterange);
				console.log(Date.parse(daterange.end));
				this.selectedDate = daterange
			}
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
				.filter(this.filterByRestaurant)
				.filter(this.filterByOficiants)
				.filter(this.filterByONews)
				.filter(this.filterByDate)
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