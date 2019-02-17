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
							<!-- <div class="col-md-8 col-lg-7">
								<div class="float-right">

									<button type="button" class="btn btn-custom-border" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img class="img-button" id="img-button-export" src="/static/image/icon1.png" alt="icon">
									</button>
									<div class="dropdown-menu btn-custom-border" aria-labelledby="btnGroupDrop1">
										<b-form-group class="ml-2" label="Отображать столбцы">
											<b-form-checkbox-group id="checkboxes1" name="flavour1" v-model="fieldsSet">
												<div v-for="field in fields">
													<b-form-checkbox :value="field">{{field.label}}</b-form-checkbox>
												</div>
											</b-form-checkbox-group>
										</b-form-group>
									</div>
									<button type="button" class="btn btn-custom-border"><a class="main-text">Экcпорт</a></button>
									<button  type="button" class="btn btn-custom-border">
										<img class="img-button" src="/static/image/print.png" alt="icon">
										<a class="main-text">Печать</a>
									</button>
								</div>

								<router-link  to="/menu/tech_maps/add" class="main-text" style="text-decoration: none;">
									<div class=" btn-group btn-group-custom mt-3">
										<div class="btn btn-shadow btn-custom-border" >
											<a class="main-text" style="text-decoration: none;">Добавить тех. карту</a>
										</div>

									</div>
								</router-link>
							</div> -->

							<div class="col-md-8 col-lg-7">
								<div class="float-right">
									<div class="btn-shadow btn-group btn-group-custom mt-3 " role="group">


										<button type="button" class="btn btn-custom-border" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img class="img-button" id="img-button-export" src="/static/image/icon1.png" alt="icon">
										</button>
										<div class="dropdown-menu btn-custom-border" aria-labelledby="btnGroupDrop1">
										<b-form-group class="ml-2" label="Отображать столбцы">
											<b-form-checkbox-group id="checkboxes1" name="flavour1" v-model="fieldsSet">
												<div v-for="field in fields" :key="field.label">
													<b-form-checkbox :value="field">{{field.label}}</b-form-checkbox>
												</div>
											</b-form-checkbox-group>
										</b-form-group>
									</div>
										<button type="button" class="btn btn-custom-border"><a class="main-text">Экcпорт</a></button>
										<button  type="button" class="btn btn-custom-border">
											<img class="img-button" src="/static/image/print.png" alt="icon">
											<a class="main-text">Печать</a>
										</button>
									</div>

									<router-link class=" btn-group btn-group-custom mt-3" style="text-decoration: none;" to="/menu/tech_maps/add">
										<div class="btn btn-shadow btn-custom-border main-text "  tag="button">
											<a class="main-text" style="text-decoration: none;">Добавить тех. карту</a>
										</div>
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
					</div>

					<div class="mt-4">
							<!-- <div class="table-responsive">
							-->
							<b-alert :show="dismissCountDown" dismissible variant="warning" @dismissed="dismissCountDown=0" @dismiss-count-down="countDownChanged">
								Ошибка удаления технологической карты!
							</b-alert>
							<b-table :items="maps" :fields="fieldsSet" class="table-custom">
								<template slot="id" slot-scope="data">
									{{data.item.id}}
								</template>

								<template slot="actions" slot-scope="row">
									<!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
									<!-- <b-button v-if="row.item.ingridients.length != 0" size="sm" @click.stop="row.toggleDetails" class="mr-2">
										{{ row.detailsShowing ? 'Скрыть' : 'Показать'}} состав
									</b-button> -->
									<div class="d-flex flex-row">
										<div class="mr-2">
											<b-link class="main-text" @click.stop="row.toggleDetails">
												<div class="link-blue link-hover">{{ row.detailsShowing ? 'Скрыть' : 'Показать'}} состав</div>
											</b-link>
										</div>

										<div class="mr-2">
											<b-link :to=getHrefEdit(row.item.id) class="main-text">
												<div class="link-blue link-hover">Ред.</div>
											</b-link>
										</div>

										<div class="ml-2">
											<button class="btn-icon popoverButton" :id=getPopoverId(row.item.id)>
												<i class="fa fa-ellipsis-h"></i>
											</button>
											<b-popover :target=getPopoverId(row.item.id) triggers="focus">
												<ul class="actions-popover">
													<li @click=deleteMaps(row.item.id) class="action-item"><a style="text-decoration: none; cursor: pointer;" class="main-text">Удалить</a></li>

													<li class="action-item"><a style="text-decoration: none; cursor: pointer;" href="" class="main-text">Скрыть</a></li>
												</ul>
											</b-popover>
										</div>
									</div>
								</template>

								<template slot="row-details" slot-scope="row">
									<b-card>
										<b-table :items="row.item.ingridients" :fields="fieldsDetails">

										</b-table>
									</b-card>
								</template>
							</b-table>

								<!-- <table class="table table-custom table-bordered">
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
															<div class="link-blue link-hover clickable" data-toggle="collapse" href="#collapseExample">Состав</div>
														</b-link>
													</div>
													<div class="mr-2">
														<b-link :to=getHrefEdit(ingridients.id) class="main-text">
															<div class="link-blue link-hover">Ред.</div>
														</b-link>
													</div>
													<div class="ml-2">
														<button class="btn-icon popoverButton" :id="getPopoverId(ingridients.id)">
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
										<tr class="tr-td-custom">
											<td>
												<div class="collapse" id="collapseExample">
												<div class="card card-body">
													Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
												</div>
											</div>
											</td>

										</tr>
									</tbody>
								</table> -->
								<!-- </div> -->
								<p class="text-center" v-if="length == 0 "> Нет категорий, подходящим по выбранным фильтрам.</p>
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

import ProductsService from '@/services/menu/ProductsService';
import Sidebar from '@/components/Sidebar';

export default {
  name: 'TechMaps',
  components: {
    sidebar: Sidebar,
  },
  data() {
    return {
      fieldsSet: [{
        key: 'title',
        label: 'Блюдо',
        sortable: true,
        thClass: 'tr-th-custom tr-td-custom',
        tdClass: 'tr-td-custom',
      },
      {
        key: 'cat_title',
        label: 'Категория',
        sortable: true,
        thClass: 'tr-th-custom tr-td-custom',
        tdClass: 'tr-td-custom',
      },
      {
        key: 'bar_code',
        label: 'Штрихкод',
        sortable: true,
        thClass: 'tr-th-custom tr-td-custom',
        tdClass: 'tr-td-custom',
      },
      {
        key: 'shop_title',
        label: 'Цех',
        sortable: true,
        thClass: 'tr-th-custom tr-td-custom',
        tdClass: 'tr-td-custom',
      },
      {
        key: 'weight',
        label: 'Весовая тех. карта',
        sortable: false,
        thClass: 'tr-th-custom tr-td-custom',
        tdClass: 'tr-td-custom',
      },
      {
        key: 'netto',
        label: 'Выход',
        sortable: true,
        thClass: 'tr-th-custom tr-td-custom',
        tdClass: 'tr-td-custom',
      },
      {
        key: 'actions',
        label: 'Действия',
        thClass: 'tr-th-custom tr-td-custom',
        tdClass: 'tr-td-custom',
      }],
      fields: [
        {
          key: 'title',
          label: 'Блюдо',
          sortable: true,
          thClass: 'tr-th-custom tr-td-custom',
          tdClass: 'tr-td-custom',
        },
        {
          key: 'cat_title',
          label: 'Категория',
          sortable: true,
          thClass: 'tr-th-custom tr-td-custom',
          tdClass: 'tr-td-custom',
        },
        {
          key: 'bar_code',
          label: 'Штрихкод',
          sortable: true,
          thClass: 'tr-th-custom tr-td-custom',
          tdClass: 'tr-td-custom',
        },
        {
          key: 'shop_title',
          label: 'Цех',
          sortable: true,
          thClass: 'tr-th-custom tr-td-custom',
          tdClass: 'tr-td-custom',
        },
        {
          key: 'weight',
          label: 'Весовая тех. карта',
          sortable: false,
          thClass: 'tr-th-custom tr-td-custom',
          tdClass: 'tr-td-custom',
        },
        {
          key: 'netto',
          label: 'Выход',
          sortable: true,
          thClass: 'tr-th-custom tr-td-custom',
          tdClass: 'tr-td-custom',
        },
        {
          key: 'actions',
          label: 'Действия',
          thClass: 'tr-th-custom tr-td-custom',
          tdClass: 'tr-td-custom',
        },
      ],

      fieldsDetails: [
        {
          key: 'title_ing',
          label: 'Ингридиент',
          sortable: true,
        },
        {
          key: 'netto',
          label: 'Нетто',
          sortable: true,
        },
        {
          key: 'brutto',
          label: 'Брутто',
          sortable: true,
        },
        {
          key: 'price',
          label: 'Цена',
          sortable: true,
        },
      ],

      search: '',
      ingridients: [],
      maps: [],
      sortColumn: 'count',
      dismissSecs: 15,
      dismissCountDown: 0,

    };
  },
  mounted() {
    this.getIngridients();
    this.getMaps();
  },
  methods: {
    async deleteMaps(id) {
      console.log(id);

      const response = await ProductsService.delMap({
        id,
      })
        .then((response) => {
          console.log(response);
          this.maps = [];
          this.getMaps();
          console.log('Ok del');
        })
        .catch((error) => {
          console.log(error.response);
          console.log('error del');
          this.showAlert();
        });

      /* if (response.status == 200){

				} else {

				} */
    },
    async getIngridients() {
      const response = await ProductsService.fetchIngridients();
      this.ingridients = response.data;
      this.ingridients.forEach((item) => {
        if (item.weight == null) {
          item.weight = '—';
        }
      });
      console.log(this.ingridients);
    },
    async getMaps() {
      const response = await ProductsService.fetchMaps();
      this.maps = response.data;
      this.maps.forEach((map) => {
        map.netto = 0;
        if (map.modificators != null) {
          map.modificators.forEach((mod) => {
            mod.ingridients.forEach((ing) => {
              map.netto += Number(ing.netto);
            });
          });
        }
        if (map.ingridients != null) {
          map.ingridients.forEach((ing) => {
            this.ingridients.forEach((ingItem) => {
              if (ing.id_ingridients == ingItem.id) {
                ing.title_ing = ingItem.title;
              }
            });
            map.netto += Number(ing.netto);
          });
        }
        map.netto = `${String(map.netto)} кг`;
        if (map.weight) {
          map.weight = 'Да';
        } else {
          map.weight = 'Нет';
        }
      });
      console.log(this.maps);
    },
    filterBySearch(ingridients) {
      if (this.search.length === 0) {
        return true;
      }
      return ingridients.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
    },
    getPopoverId(id) {
      return `popover${id}`;
    },
    getHrefEdit(id) {
      return `/menu/category_prod_cards/edit/${id}`;
    },
    sortEvent(message) {
      console.log(message);
      if (this.sortColumn == message) {
        this.sort = !this.sort;
      } else {
        this.sortColumn = message;
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
  computed: {
    length() {
      let length = 0;
      this.maps.forEach((item) => {
        length++;
      });
      return length;
    },
  },
};
</script>

	<style scoped>
	.tr-table {
		border: 10px solid #F2F3F4;
		text-align: center;
	}
	</style>

	<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

	<style src="../../../static/style/main.css"></style>

	<style lang="scss">
	@import '../../assets/less/menu.less'
	</style>
