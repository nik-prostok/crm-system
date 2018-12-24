<template>
	<div id="add_semi">
		<div class="row no-gutters" id="body-row">
			<div class="col-lg-1">
				<sidebar></sidebar>
			</div>

			<div class="col-lg-11">
				<div class="container-fluid mt-2 mb-5">

					<div class="row">
						<div class="col-md-5 col-lg-5 mt-3 d-flex flex-row">
							<router-link to="/menu/ingridients">
								<img class="back-arrow mt-2 mr-4" src="/static/image/arrow_back.png" alt="Back">
							</router-link>
							<h1 class="head-text">Новый полуфабрикат</h1>
						</div>
					</div>

					<hr class="line mt-4">

					<div class="row">
						<div class="col-lg-3">
							<p class="title-form mt-2">Название</p>
						</div>
						<div class="col-lg-4">
							<div class="form-group">
								<input type="text" ref="search" class="form-control input-param" v-model="semi.title" placeholder="Введите">
							</div>
						</div>
					</div>

					<!-- <div class="row">
						<div class="col-lg-3">
							<p class="title-form mt-2">Категория</p>
						</div>
						<div class="col-lg-4">
							<div class="form-group">
								<multiselect class="my-multiselect" placeholder="Выберите" select-label="Нажмите Enter" deselectLabel="Enter для удаления" v-model="ingridient.category" :multiple="false" :close-on-select="true" label="cat_title" track-by="cat_id" :options="categoriesIng"></multiselect>
							</div>
						</div>
					</div> -->

					<div class="row">
						<div class="col-lg-3">
							<p class="title-form mt-2">Процесс приготовления</p>
						</div>
						<div class="col-lg-4">
							<div class="form-group">
								<textarea type="textarea" ref="search" class="form-control input-param" v-model="semi.process_cooking" placeholder="Введите"></textarea>
							</div>
						</div>
					</div>

					
					<div class="row background-green">
						<div class="col-lg-12">
							<h3 class="head-text">Ингридиенты</h3>

							<p class="title-form" style="font-size: 1em;">Основные составляющие тех. карты</p>
							<div class="table-responsive">
								<table class="table table-ing">
									<thead>
										<tr class="tr-ing"> 
											<!-- @click="sortEvent('ingridient')" -->
											<th class="th-ing align-content-start">
												<p class="main-text">Ингридиент</p>
												<!-- <div v-if="sortColumn == 'ingridient'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div> -->
											</th>
											<th class="th-ing align-content-start">
												<p class="main-text">Метод приготовления</p>
												<!-- <div v-if="sortColumn == 'ingridient'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div> -->
											</th>
											<th class="th-ing align-content-start">
												<p class="main-text">Брутто</p>
												<!-- <div v-if="sortColumn == 'ingridient'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div> -->
											</th>
											<th class="th-ing align-content-start">

											</th>
											<th class="th-ing align-middle">
												<p class="main-text">Нетто</p>
												<!-- <div v-if="sortColumn == 'ingridient'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div> -->
											</th>
											<th class="th-ing align-content-start">
												<p class="main-text">Цена</p>
												<!-- <div v-if="sortColumn == 'ingridient'">
													<img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
													<img v-else="!sort" class="m-1" src="/static/image/up.png" alt="up">
												</div> -->
											</th>
										</tr> 
									</thead>
									<tbody>
										<tr class="tr-td-custom" v-for="ing in semi.ingridients">
											<td class="td-custom align-middle">
												<div class="form-group">
													<multiselect class="my-multiselect" placeholder="Выберите" select-label="Нажмите Enter" deselectLabel="Enter для удаления" v-model="ing.object_ing" :multiple="false" :close-on-select="true" label="title" track-by="id" :options="ingridientsList"></multiselect>
												</div>
											</td>
											<td class="td-custom align-middle" >
												<div v-if="ing.object_ing.unit == 'кг'" class="form-group">
													<multiselect class="my-multiselect" placeholder="Выберите" select-label="Нажмите Enter" deselectLabel="Enter для удаления" v-model="ing.method_cooking" :multiple="true" :close-on-select="false" label="title" track-by="id" :options="listMethodsCooking"></multiselect>
												</div>
											</td>
											<td class="td-custom align-middle">
												<div class="form-group">
													<div class="row no-gutters">
														<div class="col-lg-11">
															<input type="text" ref="search" class="form-control input-param" v-model="ing.brutto" placeholder="Введите">
														</div>
														<div class="col-lg-1">
															<p class="main-text ml-1 mt-2">{{ing.object_ing.unit}}</p>
														</div>
													</div>	
												</div>
											</td>
											<td class="td-custom">

												<i @click="changeBind(ing)" v-if="ing.bind" class="fas fa-paperclip clipse-active">
												</i>
												<i @click="changeBind(ing)" v-else class="fas fa-paperclip clipse-disactive"></i>
											</td>
											<td class="td-custom align-middle">
												<div class="form-group">
													<div class="row no-gutters">
														<div class="col-lg-11">
															<input type="text" ref="search" class="form-control input-param" v-model="ing.netto" placeholder="Введите">
														</div>
														<div class="col-lg-1">
															<p class="main-text ml-1 mt-2">g.</p>
														</div>
													</div>
												</div>
											</td>
											<td class="td-custom align-middle">
												<div class="form-group">
													<p class="main-text ml-1 mt-2">{{ing.price}} <i style="font-size: 0.9em;" class="fas fa-ruble-sign"></i></p>
												</div>
											</td>
										</tr>
										<tr>
											<td class="main-text">
												<p class="link-green link-hover" @click="addRow">+ Добавить ингридиент</p>
											</td>
											<td></td>
											<td></td>
											<td>Выход:</td>
											<td> {{semi.sum_mass}} г.</td>
											<td>{{semi.price}} <i style="font-size: 0.9em;" class="fas fa-ruble-sign"></i></td>
										</tr>

									</tbody>
								</table>
							</div>
						</div>
					</div>


					<hr class="hr-page">
					<button type="button" @click="sendSemi" class="btn btn-success btn-lg btn-save">
						<div v-if="!stateSaving" style="color: white;" class="main-text">Добавить полуфабрикат</div>
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

				ingridientsList: [],
				setIngridient: [],

				listMethodsCooking: [
				{
					title: 'Очистка',
					id: 1,
				},
				{
					title: 'Варка',
					id: 2,
				},
				{
					title: 'Жарка',
					id: 3,
				},
				{
					title: 'Тушение',
					id: 4,
				},
				{
					title: 'Запекание',
					id: 5,
				}
				],


				semi: {
					title: '',
					process_cooking: '',
					sum_mass: 0,
					price: 0,
					ingridients: [],
				},

			}
		},
		mounted() {
			this.fetchIngridients();
		},
		methods: {
			async sendSemi(){
				//this.semi.cat_id = this.ingridient.category.cat_id;
				/*if (this.ingridient.round != null) 
				this.ingridient.round = this.ingridient.round.value;*/
				ProductsService.addSemi(this.semi)
				//this.$router.push('/menu/semi')
			},
			async fetchIngridients(){
				const response = await ProductsService.fetchIngridients();
				console.log(response.data)
				this.ingridientsList = response.data
			},
			addRow(){
				this.semi.ingridients.push({
					object_ing: {
						unit: '',
					},
					title: null,
					id_ingridient: null,
					method_cooking: null,
					brutto: 0,
					netto: 0,
					price: 0,	
					bind: false,						
				})
			},
			changeBind(ing){
				ing.bind = !ing.bind;
			}
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