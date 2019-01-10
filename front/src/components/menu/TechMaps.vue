<template>
	<div class="tech_maps">
		
		<!-- Bootstrap row -->
		<div class="row no-gutters" id="body-row">
			<!-- MAIN -->
			<div class="col-lg-1 col-md-1 col-sm-1 col-xl-1">
				<sidebar></sidebar>
			</div>
			



			<div class="col-lg-11 col-md-11 col-sm-11 col-xl-11">
				<!-- <button @click="getProducts" class="btn">Обновить...</button> -->
				<div id="printMe">
					<div class="container-fluid mt-2 pl-0">
						<div class="row">
							<div class="col-md-4 col-lg-5">
								<h1 class="head-text mt-3">Тех. карты <small class="text-muted">{{length}}</small></h1>
							</div>
							<div class="col-md-8 col-lg-7">
								<div class="float-right">

									<router-link  to="/menu/ingridients/add" class="main-text" style="text-decoration: none;">
										<div class=" btn-group btn-group-custom mt-3">
											<div class="btn btn-shadow btn-custom-border" >
												<a class="main-text" style="text-decoration: none;">Добавить тех. карту</a>
											</div>

										</div>
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
										<tr class="tr-th-custom"> 
											<th @click="sortEvent('title')" class="td-th-custom">
												Блюдо
												<div v-if="sortColumn == 'title'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div>
											</th> 
											<th @click="sortEvent('cat')" class="td-th-custom">
												Категория
												<div v-if="sortColumn == 'cat'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div>
											</th> 
											<th @click="sortEvent('bar')" class="td-th-custom">
												Штрихкод
												<div v-if="sortColumn == 'bar'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div>
											</th> 
											<th @click="sortEvent('losses')" class="td-th-custom">
												Цех
												<div v-if="sortColumn == 'weight'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div>
											</th>
											<th @click="sortEvent('losses')" class="td-th-custom">
												Весовая тех. карта
												<div v-if="sortColumn == 'losses'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div>
											</th> 
											<th @click="sortEvent('remains')" class="td-th-custom">
												Выход
												<div v-if="sortColumn == 'remains'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div>
											</th> 
											<th @click="sortEvent('cost')" class="td-th-custom">
												Себестоимость
												<div v-if="sortColumn == 'cost'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div>
											</th>
											<th @click="sortEvent('amount_balances')" class="td-th-custom">
												Цена	
												<div v-if="sortColumn == 'amount_balances'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div>
											</th> 
											<th @click="sortEvent('amount_balances')" class="td-th-custom">
												Прибыль	
												<div v-if="sortColumn == 'amount_balances'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div>
											</th>
											<th @click="sortEvent('amount_balances')" class="td-th-custom">
												Наценка	
												<div v-if="sortColumn == 'amount_balances'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div>
											</th>
											<th class="td-th-custom" style="width: 50px;">

											</th>
										</tr> 
									</thead>
									<tbody >
										<tr class="tr-td-custom" v-for="map in maps">
											
											<td class="td-custom align-middle" style="">{{map.title}}</td>
											<td class="td-custom align-middle" style="">{{map.cat_title}}</td>
											<td class="td-custom align-middle" style="">{{map.bar_code}}</td>
											<td class="td-custom align-middle" style="">{{map.shop_title}}</td>
											
											<td v-if="map.weight" class="td-custom align-middle" style="">Да</td>
											<td v-else class="td-custom align-middle" style="width: 100%;">
												Нет
											</td>
											
											<td class="td-custom align-middle" style="">{{map.netto}}</td>
											<td class="td-custom align-middle" style="">—</td>
											<td class="td-custom align-middle" style="">—</td>
											<td class="td-custom align-middle" style="">—</td>
											<td class="td-custom align-middle" style="">—</td>
											<td class="td-custom align-middle">
												<div class="d-flex flex-row">
													<div class="mr-2">
														<b-link class="main-text">
															<div class="link-blue link-hover" @click>Состав</div>
														</b-link>
													</div>
													<div class="mr-2">
														<b-link :to=getHrefEdit(ingridients.id) class="main-text">
															<div class="link-blue link-hover">Ред.</div>
														</b-link>
													</div>
													<div class="ml-2">
														<button class="btn-icon popoverButton" :id=getPopoverId(ingridients.id)>
															<i class="fa fa-ellipsis-h"></i>
														</button>
														<b-popover :target=getPopoverId(ingridients.id) triggers="focus">
															<ul class="actions-popover">
																<li @click=deleteIngridients(ingridients.id) class="action-item"><a style="text-decoration: none;"class="main-text">Удалить</a></li>

																<li class="action-item"><a style="text-decoration: none;" href="" class="main-text">Скрыть</a></li>
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

export default {
	name: 'TechMaps',
	components: {
		'sidebar': Sidebar,
	},
	data () {
		return {
			search: '',
			ingridients: [],
			maps: [],
			sortColumn: 'count',

		}
	},
	mounted () {
		//this.getIngridients()
		this.getMaps()
	},
	methods: {
		async deleteIngridients(id){
			console.log(id);
			const response = await ProductsService.deleteProduct({
				'id': id
			});

			if (response.status == 200){
				this.products = [];
				this.getCategories();
			}
		},
		async getIngridients () {
			const response = await ProductsService.fetchIngridients()
			this.ingridients = response.data
			this.ingridients.forEach(item => {
				if (item.weight == null){
					item.weight = "—";
				}
			})
			console.log(this.ingridients);
		},
		async getMaps() {
			const response = await ProductsService.fetchMaps()
			this.maps = response.data
			this.maps.forEach(map => {
				map.netto = 0;
				if (map.modificators != null){
					map.modificators.forEach(mod => {
						mod.ingridients.forEach(ing => {
							map.netto += Number(ing.netto);
						})
					})
				}
				if (map.ingridients != null){
					map.ingridients.forEach(ing => {
						map.netto += Number(ing.netto);
					})
				}
			})
			console.log(this.maps);
		},
		filterBySearch(ingridients){
			if (this.search.length === 0) {
				return true;
			}
			return ingridients.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1 
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
	},
	computed: {
		length(){
			let length = 0;
			this.maps.forEach(item => {
				length++
			})
			return length;
		}
	}
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="../../../static/style/main.css"></style>
<style lang="scss">
@import '../../assets/less/menu.less'
</style>