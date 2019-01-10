<template>
	<div id="add_map">
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
							<h1 class="head-text">Новая тех. карта</h1>
						</div>
					</div>

					<hr class="line mt-4">

					<div class="row">
						<div class="col-lg-3">
							<p class="title-form mt-2">Название</p>
						</div>
						<div class="col-lg-4">
							<div class="form-group">
								<input type="text" ref="search" class="form-control input-param" v-model="map.title" placeholder="Введите">
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-lg-3">
							<p class="title-form mt-2">Штрихкод</p>
						</div>
						<div class="col-lg-4">
							<div class="form-group">
								<input type="text" ref="search" class="form-control input-param" v-model="map.bar_code" placeholder="Введите">
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-lg-3">
							<p class="title-form mt-2">Категория</p>
						</div>
						<div class="col-lg-4">
							<div class="form-group">
								<multiselect class="my-multiselect" placeholder="Выберите" select-label="Нажмите Enter" deselectLabel="Enter для удаления" v-model="map.category" :multiple="false" :close-on-select="true" label="title" track-by="id" :options="categories"></multiselect>
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-lg-3">
							<p class="title-form mt-2">Цех</p>
						</div>
						<div class="col-lg-4">
							<div class="form-group">
								<multiselect class="my-multiselect" placeholder="Выберите" select-label="Нажмите Enter" deselectLabel="Enter для удаления" v-model="map.shop" :multiple="false" :close-on-select="true" label="title" track-by="id" :options="shops"></multiselect>
							</div>
						</div>
					</div>

					<hr class="hr-page">

					<div class="row">
						<div class="col-lg-2">
							<p class="title-form mt-2">Фотография</p>
						</div>
						<b-form-file accept="image/*" v-model="map.avatar" id="upload" class="mt-3" plain></b-form-file>
						<div class="col-lg-4 align-self-center">
							<b-link @click="selectFile" class="main-text">
								<div class="link-green link-hover">
									<u id="upload_link">Загрузить</u>
								</div>
							</b-link>
							<div v-if="map.avatar" class="mt-3">{{map.avatar && map.avatar.name}} <i @click="resetFile" class="fas fa-times"></i></div>

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
										<p-radio style="font-size: 20px;" v-model="map.color" value="blue" class="p-icon p-smooth m-0" color="success" >
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
										<p-radio style="font-size: 20px;" v-model="map.color" value="red" class="p-icon p-smooth m-0" color="success" >
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
										<p-radio style="font-size: 20px;" v-model="map.color" value="yellow" class="p-icon p-smooth m-0" color="success" >
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
										<p-radio style="font-size: 20px;" v-model="map.color" value="pink" class="p-icon p-smooth m-0" color="success" >
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
										<p-radio style="font-size: 20px;" v-model="map.color" value="green" class="p-icon p-smooth m-0" color="success" >
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
										<p-radio style="font-size: 20px;" v-model="map.color" value="grey" class="p-icon p-smooth m-0" color="success" >
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
										<p-radio style="font-size: 20px;" v-model="map.color" value="black" class="p-icon p-smooth m-0" color="success" >
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
								<p-check style="font-size: 24px;" v-model="map.weight" class="p-icon p-smooth mt-0 mb-2" color="success" >
									<i slot="extra" class="icon fa fa-check"></i>
									<div style="font-size: 18px;"  class="main-text">Весовая тех. карта</div>
								</p-check>
							</div>
							<div class="row">
								<p-check v-model="map.no_dicsount" style="font-size: 24px;" class="p-icon p-smooth mt-0 mb-2" color="success" >
									<i slot="extra" class="icon fa fa-check"></i>
									<div style="font-size: 18px;" class="main-text">Не участвует в скидках</div>
								</p-check>
							</div>
						</div>
					</div>
					<hr class="hr-page">

					<div class="row">
						<div class="col-lg-3">
							<p class="title-form mt-2">Время приготовления</p>
						</div>
						<div class="col-lg-2 ">
							<div class="form-group input-group">
								<input type="text" ref="search" class="form-control input-param" v-model="map.min_cook" placeholder="Введите">
								<div class="input-group-append">
									<span class="input-group-text" id="basic-addon2">мин</span>
								</div>
							</div>
						</div>
						<div class="col-lg-2 ">
							<div class="form-group input-group">
								<input type="text" ref="search" class="form-control input-param" v-model="map.sec_cook" placeholder="Введите">
								<div class="input-group-append">
									<span class="input-group-text" id="basic-addon2">сек</span>
								</div>
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
										<tr class="tr-td-custom" v-for="ing in map.ingridients">
											<td class="td-custom align-middle">
												<div class="form-group">
													<multiselect class="my-multiselect" placeholder="Выберите" select-label="Нажмите Enter" deselectLabel="Enter для удаления" v-model="ing.object_ing" :multiple="false" :close-on-select="true" label="title" track-by="id" :options="ingridientsList" :option-height="104"></multiselect>
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
											<td> {{map.sum_mass}} г.</td>
											<td>{{map.price}} <i style="font-size: 0.9em;" class="fas fa-ruble-sign"></i></td>
										</tr>

									</tbody>
								</table>
							</div>

							

						</div>
					</div>


					<div class="row background-green mt-3">
						<div class="col-lg-12">
							<h3 class="head-text">Модификаторы</h3>

							<p class="title-form" style="font-size: 1em;">Выбор среди разновидностей или возможность добавить дополнительные ингредиенты</p>
							<div v-for="mod in map.modificators" class="table-responsive">
								<span class="head-text" style="font-weight: bold; font-size: 1.2em;">{{mod.title}}</span>
								<span v-if="mod.type == 'one'" class="main-text">(Несколько из набора)</span>
								<span v-if="mod.type == 'some'" class="main-text">(Выбор одного вида из нескольких)</span>
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
										<tr class="tr-td-custom" v-for="ing in mod.ingridients">
											<td class="td-custom align-middle">
												<div class="form-group">
													<multiselect class="my-multiselect" placeholder="Выберите" select-label="Нажмите Enter" deselectLabel="Enter для удаления" v-model="ing.object_ing" :multiple="false" :close-on-select="true" label="title" track-by="id" :options="ingridientsList" :option-height="104"></multiselect>
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
												<p class="link-green link-hover" @click="addRowToMod(mod.id)">+ Добавить ингридиент</p>
											</td>
											<td></td>
											<td></td>
											<td>Выход:</td>
											<td> {{map.sum_mass}} г.</td>
											<td>{{map.price}} <i style="font-size: 0.9em;" class="fas fa-ruble-sign"></i></td>
										</tr>

									</tbody>
								</table>
							</div>
							<hr class="hr-page mt-2 mb-4">
							<div class="main-text">
								<p class="link-green link-hover" data-toggle="modal" data-target="#exampleModal">+ Добавить модификатор</p>
							</div>
						</div>
					</div>

					<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div class="modal-dialog modal-lg" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title head-text" id="exampleModalLabel">Новый набор модификаторов</h5>
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="modal-body">
									
									<div class="form-group">
										<multiselect class="my-multiselect" v-model="nowModif" placeholder="Выберите" select-label="Нажмите Enter" deselectLabel="Enter для удаления"  :multiple="false" :close-on-select="true" label="title" track-by="id" :options="listModificators"></multiselect>
									</div>
									
									<div v-if="nowModif.id == 0">
										<div class="form-group">
											<input type="text" ref="search" class="form-control input-param" v-model="nowNewModif.title" placeholder="Название набора">
										</div>

										<hr class="hr-page mt-2 mb-4">

										<p class="main-text">Сколько модификаторов можно выбрать одновременно:</p>
										<p-radio style="font-size: 20px;" v-model="nowNewModif.type" value='one' class="p-icon p-smooth m-2" color="success" >
											<i slot="extra" class="icon fa fa-check"></i>
											<p class="main-text" style="font-size: 0.9em; font-weight: bold;">Только один</p>
										</p-radio>
										<div class="row">
											<div class="col-lg-6">
												<p class="main-text ml-5" style="font-size: 0.9em;">Выбор одного варианта из нескольких.</p>
												<p class="main-text ml-5" style="font-size: 0.9em;">Например, диаметр пиццы.</p>
											</div>
											<div class="col-lg-6">
												<img width="80%" height="auto" src="/static/image/modification-group-type-1.png">
											</div>
											
										</div>
										

										<hr class="hr-page mt-2 mb-2">
										<p-radio style="font-size: 20px;" v-model="nowNewModif.type" value="some" class="p-icon p-smooth m-2" color="success" >
											<i slot="extra" class="icon fa fa-check"></i>
											<p class="main-text" style="font-size: 0.9em; font-weight: bold;">Несколько</p>
										</p-radio>
										<div class="row">
											<div class="col-lg-6">
												<p class="main-text ml-5" style="font-size: 0.9em;">Любое количество в заданном диапазоне.</p>
												<p class="main-text ml-5" style="font-size: 0.9em;">Например, добавки к пицце</p>
											</div>
											<div class="col-lg-6">
												<img width="80%" height="auto" src="/static/image/modification-group-type-2.png">
											</div>
											
										</div>
										<div class="row ml-5">
											<transition name="fade">
												<b-card v-if="nowNewModif.type == 'some'">
													<div class="row mb-2">
														<div class="col-lg-6">
															<p-check style="font-size: 24px;" v-model="nowNewModif.setMin" class="p-icon p-smooth mt-0 mb-2" color="success" >
																<i slot="extra" class="icon fa fa-check"></i>
																<div style="font-size: 18px;"  class="main-text">Установить минимум</div>
															</p-check>
														</div>

														<div class="col-lg-4">
															<transition name="fade">
																<input v-if="nowNewModif.setMin" type="text" ref="search" class="form-control input-param" v-model="nowNewModif.min" placeholder="Минимум">
															</transition>
														</div>
													</div>
													<div class="row">
														<div class="col-lg-6">
															<p-check style="font-size: 24px;" v-model="nowNewModif.setMax" class="p-icon p-smooth mt-0 mb-2" color="success" >
																<i slot="extra" class="icon fa fa-check"></i>
																<div style="font-size: 18px;"  class="main-text">Установить максимум</div>
															</p-check>
														</div>

														<div class="col-lg-4">
															<transition name="fade">
																<input v-if="nowNewModif.setMax" type="text" ref="search" class="form-control input-param" v-model="nowNewModif.max" placeholder="Максимум">
															</transition>
														</div>
													</div>
												</b-card>
											</transition>
										</div>

									</div>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-secondary" @click="resetNowNewModif" data-dismiss="modal">Отмена</button>
									<button type="button" class="btn btn-success" @click="addNewModificators" data-dismiss="modal">Добавить</button>
								</div>
							</div>
						</div>
					</div>


					<hr class="hr-page">
					<button type="button" @click="sendMap" class="btn btn-success btn-lg btn-save">
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
				idMod: -1,


				key: null,

				ingridientsList: [],
				categories: [],
				shops: [],
				listModificators: [
				{
					title: 'Создать новый набор',
					id: 0,
				},
				{
					title: 'Диаметр пиццы',
					id: 1,
				}],
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

				nowModif: {
					title: 'Создать новый набор',
					id: 0,
				},
				nowNewModif: {
					title: null,
					id: null,
					type: 'one',
					min: null,
					max: null,
					setMax: false,
					setMin: false,
					ingridients:[],
				},



				map: {
					title: '',
					avatar: null,
					category: null,
					shop: null,
					color: null,
					min: null,
					bar_code: null,
					sec: null,
					weight: false,
					no_dicsount: false,
					process_cooking: '',
					sum_mass: 0,
					price: 0,
					ingridients: [],
					modificators: [],
				},

			}
		},
		mounted() {
			this.fetchIngridients();
			this.fetchCategories();
			this.fetchShops();
		},
		methods: {
			async sendMap(){
				//this.map.cat_id = this.ingridient.category.cat_id;
				/*if (this.ingridient.round != null) 
				this.ingridient.round = this.ingridient.round.value;*/
				
				this.map.ingridients.forEach(item => {
					item.id = item.object_ing.id;
				})
				this.map.modificators.forEach(itemMod => {
					console.log(itemMod);
					itemMod.ingridients.forEach(itemIng => {
						itemIng.id = itemIng.object_ing.id;
					})
				})
				//console.log(this.map);
				ProductsService.addMap(this.map);
				//this.$router.push('/menu/tech_maps')
			},
			async fetchIngridients(){
				const response = await ProductsService.fetchIngridients();
				console.log(response.data)
				this.ingridientsList = response.data
			},
			async fetchCategories(){
				const response = await ProductsService.fetchCategories();
				console.log(response.data);
				this.categories = response.data;
			},
			async fetchShops(){
				const response = await ProductsService.fetchShops();
				console.log(response.data);
				this.shops = response.data;
			},
			resetNowNewModif(){
				this.nowNewModif = {
					title: null,
					id: null,
					type: 'one',
					min: null,
					max: null,
					setMax: false,
					setMin: false,
					ingridients:[],
				};
			},
			addRow(){
				this.map.ingridients.push({
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
			addRowToMod(id){
				console.log(id);
				this.map.modificators[id].ingridients.push({
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
			addNewModificators(){
				this.idMod++;
				this.nowNewModif.id = this.idMod;
				this.map.modificators.push(this.nowNewModif);
				this.resetNowNewModif();
			},
			changeBind(ing){
				ing.bind = !ing.bind;
			},
			selectFile(){
				$("#upload:hidden").trigger('click');
			},
			resetFile(){
				this.avatar = null;
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