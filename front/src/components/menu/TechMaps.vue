<template>
  <div class="tech_maps">
    <!-- Bootstrap row -->
    <div class="row no-gutters" id="body-row">
      <!-- MAIN -->
      <div class="col-2 col-sm-1">
        <sidebar></sidebar>
      </div>

      <div class="col-10 col-sm-11">
        <div id="printMe">
          <div class="container-fluid mt-2 pl-0">
            <div class="row">
              <div class="col-md-4 col-lg-5">
                <h1 class="head-text mt-3">
                  Тех. карты
                  <small class="text-muted">{{length}}</small>
                </h1>
              </div>
              <div class="col-md-8 col-lg-7">
                <div class="float-right">
                  <div class="btn-shadow btn-group btn-group-custom mt-3" role="group">
                    <button
                      type="button"
                      class="btn btn-custom-border"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img
                        class="img-button"
                        id="img-button-export"
                        src="/static/image/icon1.png"
                        alt="icon"
                      >
                    </button>
                    <div class="dropdown-menu btn-custom-border" aria-labelledby="btnGroupDrop1">
                      <a class="m-2">Отображать столбцы</a>
                      <div v-bind:key="key" v-for="(item, key) in fields ">
                        <div class="form-check dropdown-item" @click="changeColumn(item)">
                          <div class="pretty p-switch p-fill">
                            <input
                              @change="sortFields"
                              v-model="fieldsSet"
                              v-bind:value="item"
                              type="checkbox"
                              v-bind:id="item._id"
                            >
                            <div class="state">
                              <label class="form-check-label">{{item.label}}</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button type="button" class="btn btn-custom-border">
                      <a class="main-text">Экcпорт</a>
                    </button>
                    <button type="button" class="btn btn-custom-border">
                      <img class="img-button" src="/static/image/print.png" alt="icon">
                      <a class="main-text">Печать</a>
                    </button>
                  </div>

                  <router-link
                    class="btn-group btn-group-custom mt-3 ml-2"
                    style="text-decoration: none;"
                    to="/menu/maps/add"
                  >
                    <div class="btn btn-shadow btn-custom-border main-text" tag="button">
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
              <div class="form-group inner-addon">
                <div class="left-addon">
                  <img class="fas fa-search" src="/static/image/search.png">
                </div>
                <div v-if="search != ''" class="right-addon">
                  <button class="fas btn-container" v-on:click="search = ''">
                    <img src="/static/image/close.png">
                  </button>
                </div>
                <input
                  type="text"
                  ref="search"
                  class="form-control search pl-5"
                  id="search"
                  placeholder="Быстрый поиск"
                  v-model="search"
                >
              </div>
            </div>
            <div class="col-md-5 col-lg-10 col-xl-8">
              <div class="text-center btn-shadow btn-group btn-group-custom mb-3" role="group">
                <div class="btn-group btn-group-toggle" role="group">
                  <button
                    type="button"
                    class="btn btn-custom-border"
                    style=" border-radius: 16px 0 0px 16px;"
                    data-toggle="dropdown"
                  >
                    <a class="main-text">Категории</a>
                    <img class="m-1" src="/static/image/down.png" alt="down">
                  </button>
                  <div class="dropdown-menu btn-custom-border" aria-labelledby="btnGroupDrop1">
                    <div class="group mr-3 ml-3 mb-2">
                      <input
                        type="text"
                        ref="search"
                        class="form-control search-cat"
                        placeholder="Поиск..."
                        v-model="selectCategoriesSearch"
                      >
                    </div>
                    <div v-bind:key="item.id" v-for="(item) in FilterCategories ">
                      <div class="form-check dropdown-item" @click="changeSelectCategories(item)">
                        <div class="pretty p-switch p-fill">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            v-bind:id="item._id"
                            v-model="selectCategories"
                            v-bind:value="item"
                          >
                          <div class="state">
                            <label class="form-check-label">{{item.title}}</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      class="btn btn-custom-border ml-2 mb-1"
                      v-on:click="selectCategories = [] "
                    >Очистить</button>
                  </div>
                </div>

                <div class="btn-group btn-group-toggle" role="group">
                  <button
                    type="button"
                    style="border-radius: 0px 16px 16px 0px;"
                    class="btn btn-custom-border"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <a class="main-text">Цех</a>
                    <img class="m-1" src="/static/image/down.png" alt="down">
                  </button>
                  <div class="dropdown-menu btn-custom-border" aria-labelledby="btnGroupDrop1">
                    <div class="group mr-3 ml-3 mb-2">
                      <input
                        type="text"
                        ref="search"
                        class="form-control search-cat"
                        placeholder="Поиск..."
                        v-model="selectShopsSearch"
                      >
                    </div>
                    <div v-bind:key="key" v-for="(item, key) in FilterShops ">
                      <div class="form-check dropdown-item" @click="changeSelectShops(item)">
                        <div class="pretty p-switch p-fill">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            :id="item._id"
                            v-model="selectShops"
                            :value="item"
                          >
                          <div class="state">
                            <label class="form-check-label">{{item.title}}</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      class="btn btn-custom-border ml-2 mb-1"
                      v-on:click="selectShops = [] "
                    >Очистить</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <b-alert
              :show="dismissCountDownDanger"
              dismissible
              variant="danger"
              @dismissed="dismissCountDownDanger=0"
              @dismiss-count-down="countDownChangedDanger"
            >
              <p class="main-text">{{msgDanger}}</p>
            </b-alert>
            <b-alert
              :show="dismissCountDownSuccess"
              dismissible
              variant="success"
              @dismissed="dismissCountDownSuccess=0"
              @dismiss-count-down="countDownChangedSuccess"
            >
              <p class="main-text">{{msgSuccess}}</p>
            </b-alert>
            <b-table :items="FilterMaps" :fields="fieldsSet" class="table-custom">
              <template slot="title" slot-scope="data">
                <div class="d-flex flex-row">
                  <div v-if="data.item.photo != null" class="mr-2">
                    <img class="img-fluid" width="50" :src="data.item.photo" alt>
                  </div>
                  <div v-else class="rectangle mr-2">
                    <div :class="data.item.color" class="h-100">
                      <p
                        class="pt-2"
                        style="color: white; text-align: center;"
                      >{{ data.item.title.slice(0,1) }}</p>
                    </div>
                  </div>
                  <div class="align-self-center">{{ data.item.title }}</div>
                </div>
              </template>

              <template slot="cat_title" slot-scope="data">
                <div>{{data.item.category.title}}</div>
              </template>

              <template slot="shop_title" slot-scope="data">
                <div>{{data.item.shop.title}}</div>
              </template>

              <template slot="actions" slot-scope="data">
                <div class="d-flex flex-row">
                  <div class="mr-2">
                    <b-link class="main-text" @click.stop="data.toggleDetails">
                      <div
                        class="link-blue link-hover"
                      >{{ data.detailsShowing ? 'Скрыть' : 'Показать'}} состав</div>
                    </b-link>
                  </div>

                  <div class="mr-2">
                    <b-link :to="getHrefEdit(data.item._id)" class="main-text">
                      <div class="link-blue link-hover">Ред.</div>
                    </b-link>
                  </div>

                  <div class="ml-2">
                    <button class="btn-icon popoverButton" :id="getPopoverId(data.item._id)">
                      <i class="fa fa-ellipsis-h"></i>
                    </button>
                    <b-popover :target="getPopoverId(data.item._id)" triggers="focus">
                      <ul class="actions-popover">
                        <li @click="deleteMaps(data.item._id)" class="action-item">
                          <a
                            style="text-decoration: none; cursor: pointer;"
                            class="main-text"
                          >Удалить</a>
                        </li>

                        <li class="action-item">
                          <a
                            style="text-decoration: none; cursor: pointer;"
                            href
                            class="main-text"
                          >Скрыть</a>
                        </li>
                      </ul>
                    </b-popover>
                  </div>
                </div>
              </template>

              <template slot="row-details" slot-scope="row">
                <b-card>
                  <b-table :items="row.item.ingridients" :fields="fieldsDetails"></b-table>
                </b-card>
              </template>
            </b-table>
            <p
              class="text-center"
              v-if="length == 0 "
            >Нет категорий, подходящим по выбранным фильтрам.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import ProductsService from "@/services/menu/ProductsService";
import Sidebar from "@/components/Sidebar";

export default {
  name: "TechMaps",
  components: {
    sidebar: Sidebar
  },
  data() {
    return {
      fieldsSet: [
        {
          key: "title",
          label: "Блюдо",
          sortable: true,
          thClass: "tr-th-custom tr-td-custom",
          tdClass: "tr-td-custom",
          position: 0,
        },
        {
          key: "cat_title",
          label: "Категория",
          sortable: true,
          thClass: "tr-th-custom tr-td-custom",
          tdClass: "tr-td-custom",
          position: 1,
        },
        {
          key: "bar_code",
          label: "Штрихкод",
          sortable: true,
          thClass: "tr-th-custom tr-td-custom",
          tdClass: "tr-td-custom",
          position: 2,
        },
        {
          key: "shop_title",
          label: "Цех",
          sortable: true,
          thClass: "tr-th-custom tr-td-custom",
          tdClass: "tr-td-custom",
          position: 3,
        },
        {
          key: "weight",
          label: "Весовая тех. карта",
          sortable: false,
          thClass: "tr-th-custom tr-td-custom",
          tdClass: "tr-td-custom",
          position: 4,
        },
        {
          key: "netto",
          label: "Выход",
          sortable: true,
          thClass: "tr-th-custom tr-td-custom",
          tdClass: "tr-td-custom",
          position: 5,
        },
        {
          key: "actions",
          label: "Действия",
          thClass: "tr-th-custom tr-td-custom",
          tdClass: "tr-td-custom",
          position: 6,
        }
      ],
      fields: [
        {
          key: "title",
          label: "Блюдо",
          sortable: true,
          thClass: "tr-th-custom tr-td-custom",
          tdClass: "tr-td-custom",
          position: 0,
        },
        {
          key: "cat_title",
          label: "Категория",
          sortable: true,
          thClass: "tr-th-custom tr-td-custom",
          tdClass: "tr-td-custom",
          position: 1,
        },
        {
          key: "bar_code",
          label: "Штрихкод",
          sortable: true,
          thClass: "tr-th-custom tr-td-custom",
          tdClass: "tr-td-custom",
          position: 2,
        },
        {
          key: "shop_title",
          label: "Цех",
          sortable: true,
          thClass: "tr-th-custom tr-td-custom",
          tdClass: "tr-td-custom",
          position: 3,
        },
        {
          key: "weight",
          label: "Весовая тех. карта",
          sortable: false,
          thClass: "tr-th-custom tr-td-custom",
          tdClass: "tr-td-custom",
          position: 4,
        },
        {
          key: "netto",
          label: "Выход",
          sortable: true,
          thClass: "tr-th-custom tr-td-custom",
          tdClass: "tr-td-custom",
          position: 5,
        },
        {
          key: "actions",
          label: "Действия",
          thClass: "tr-th-custom tr-td-custom",
          tdClass: "tr-td-custom",
          position: 6
        }
      ],

      fieldsDetails: [
        {
          key: "ingridient.title",
          label: "Ингридиент",
          sortable: true
        },
        {
          key: "netto.$numberDecimal",
          label: "Нетто",
          sortable: true
        },
        {
          key: "brutto.$numberDecimal",
          label: "Брутто",
          sortable: true
        },
        {
          key: "ingridient.price",
          label: "Цена",
          sortable: true
        }
      ],

      search: "",
      ingridients: [],
      maps: [],
      shops: [],
      categories: [],

      // Search
      selectCategoriesSearch: "",
      selectCategories: [],
      selectShopsSearch: "",
      selectShops: [],

      //Alert
      dismissSecsDanger: 10,
      dismissCountDownDanger: 0,
      msgDanger: "Error!",

      dismissSecsSuccess: 10,
      dismissCountDownSuccess: 0,
      msgSuccess: "Success"
    };
  },
  mounted() {
    this.getMaps();
    this.getCategories();
    this.getShops();
  },
  methods: {
    changeSelectShops(item){
      let isWrite = false;
      this.selectShops.forEach((shop, index, arr) => {
        if (shop === item) {
          arr.splice(index, 1);
          isWrite = true;
        }
      });
      if (!isWrite) this.selectShops.push(item);
    },
    changeSelectCategories(item){
      let isWrite = false;
      this.selectCategories.forEach((cat, index, arr) => {
        if (cat === item) {
          arr.splice(index, 1);
          isWrite = true;
        }
      });
      if (!isWrite) this.selectCategories.push(item);
    }, 
    changeColumn(item) {
      let isWrite = false;
      this.fieldsSet.forEach((col, index, arr) => {
        if (col.key === item.key) {
          console.log(col);
          arr.splice(index, 1);
          isWrite = true;
        }
      });
      if (!isWrite) this.fieldsSet.push(item);
    },
    sortFields() {
      this.fieldsSet.sort((a, b) => {
        if (a.position < b.position) return -1;
        if (a.position > b.position) return 1;
      });
    },
    async deleteMaps(id) {
      ProductsService.delMap(id)
        .then(response => {
          this.getMaps();
          this.showAlertSuccess("Технологическая карта успешно удалена!");
        })
        .catch(error => {
          this.showAlertDanger("Ошибка удаления технологической карты!");
        });
    },
    async getCategories() {
      ProductsService.fetchCategories()
        .then(res => {
          this.categories = res.data;
        })
        .catch(err => {
          console.log(err);
          this.showAlertDanger("Ошибка загрузки категорий!");
        });
    },
    async getShops() {
      ProductsService.fetchShops()
        .then(res => {
          this.shops = res.data;
        })
        .catch(err => {
          console.log(err);
          this.showAlertDanger("Ошибка загрузки цехов!");
        });
    },
    async getMaps() {
      ProductsService.fetchMaps()
        .then(res => {
          this.maps = res.data;
          this.maps.forEach(map => {
            map._rowVariant = 'added-row'
            map.netto = 0;
            if (map.modificators != null) {
              map.modificators.forEach(mod => {
                mod.ingridients.forEach(ing => {
                  map.netto += Number(ing.netto.$numberDecimal);
                });
              });
            }
            if (map.ingridients != null) {
              map.ingridients.forEach(ing => {
                /* this.ingridients.forEach(ingItem => {
                  if (ing.id_ingridients == ingItem.id) {
                    ing.title_ing = ingItem.title;
                  }
                }); */
                map.netto += Number(ing.netto.$numberDecimal);
              });
            }
            map.netto = `${String(map.netto / 1000)} кг`;
            if (map.weight) {
              map.weight = "Да";
            } else {
              map.weight = "Нет";
            }
          });
        })
        .catch(err => {
          console.error(err);
          this.showAlertDanger("Ошибка загрузки технологических карт!");
        });
    },
    filterBySearch(ingridients) {
      if (this.search.length === 0) {
        return true;
      }
      return (
        ingridients.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    },
    getPopoverId(id) {
      return `popover${id}`;
    },
    getHrefEdit(id) {
      return `/menu/maps/edit/${id}`;
    },
    sortEvent(message) {
      console.log(message);
      if (this.sortColumn == message) {
        this.sort = !this.sort;
      } else {
        this.sortColumn = message;
      }
    },
    countDownChangedDanger(dismissCountDown) {
      this.dismissCountDownDanger = dismissCountDown;
    },
    countDownChangedSuccess(dismissCountDown) {
      this.dismissCountDownSuccess = dismissCountDown;
    },
    showAlertDanger(msg) {
      this.msgDanger = msg;
      this.dismissCountDownDanger = this.dismissSecsDanger;
    },
    showAlertSuccess(msg) {
      this.msgSuccess = msg;
      this.dismissCountDownSuccess = this.dismissSecsSuccess;
    },
    filterBySearchCategories(categories) {
      if (this.selectCategoriesSearch.length === 0) {
        return true;
      }
      return (
        categories.title
          .toLowerCase()
          .indexOf(this.selectCategoriesSearch.toLowerCase()) > -1
      );
    },
    filterBySearchShops(shops) {
      if (this.selectShopsSearch.length === 0) {
        return true;
      }
      return (
        shops.title
          .toLowerCase()
          .indexOf(this.selectShopsSearch.toLowerCase()) > -1
      );
    },
    filterBySearch(product) {
      if (this.search.length === 0) {
        return true;
      }
      return (
        product.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    },
    filterByCategory(product) {
      if (this.selectCategories.length === 0) {
        return true;
      }
      return this.selectCategories.some(
        item =>
          product.category.title
            .toLowerCase()
            .localeCompare(item.title.toLowerCase()) == 0
      );
    },
    filterByShop(product) {
      if (this.selectShops.length === 0) {
        return true;
      }
      return this.selectShops.some(
        item =>
          product.shop.title.toLowerCase().localeCompare(item.title.toLowerCase()) ==
          0
      );
    }
  },
  computed: {
    length() {
      let length = 0;
      this.maps.forEach(item => {
        length++;
      });
      return length;
    },
    FilterMaps() {
      return this.maps
        .filter(this.filterBySearch)
        .filter(this.filterByCategory)
        .filter(this.filterByShop);
    },
    FilterCategories() {
      return this.categories.filter(this.filterBySearchCategories);
    },
    FilterShops() {
      return this.shops.filter(this.filterBySearchShops);
    },
    FilterCategories() {
      return this.categories.filter(this.filterBySearchCategories);
    },
    FilterShops() {
      return this.shops.filter(this.filterBySearchShops);
    }
  }
};
</script>

<style scoped>
  .table tr.table-added-row {
	animation-name: addedrow;
	animation-duration: 2s;
}

.table tr.table-added-row td {
	animation-name: addedrowcell;
	animation-duration: 2s;
}

.table tr.table-added-row td > div {
	animation-name: addedrowcelldiv;
	animation-duration: 2s;
}

@keyframes addedrow {
	50%  { background-color: #c3e6cb; }
	75%  { background-color: #c3e6cb; }
}

@keyframes addedrowcell {
	0%   { padding: 0 .75rem; }
	50%  { padding: .75rem; }
}

@keyframes addedrowcelldiv {
	0%   { transform: scale(1, 0); }
	50%  { transform: scale(1, 1); }
}
</style>
