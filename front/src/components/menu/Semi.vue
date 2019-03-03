<template>
  <div class="semi">
    <!-- Bootstrap row -->
    <div class="row no-gutters" id="body-row">
      <!-- MAIN -->
      <div class="col-lg-1 col-md-1 col-sm-1 col-xl-1">
        <sidebar></sidebar>
      </div>

      <div class="col-lg-11 col-md-11 col-sm-11 col-xl-11">
        <div id="printMe">
          <div class="container-fluid mt-2 pl-0">
            <div class="row">
              <div class="col-md-4 col-lg-5">
                <h1 class="head-text mt-3">
                  Полуфабрикаты
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
                        <div class="form-check dropdown-item">
                          <div class="pretty p-switch p-fill">
                            <input
                              @change="sortFields"
                              v-model="fieldsSet"
                              v-bind:value="item"
                              type="checkbox"
                              v-bind:id="item.key"
                            >
                            <div class="state">
                              <label class="form-check-label" v-bind:for="item">{{item.label}}</label>
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
                    to="/menu/semi/add"
                  >
                    <div class="btn btn-shadow btn-custom-border main-text" tag="button">
                      <a class="main-text" style="text-decoration: none;">Добавить полуфабрикат</a>
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
            <b-table :items="FilterSemi" :fields="fieldsSet" class="table-custom">
              <template slot="title" slot-scope="data">
                <div class="align-self-center">{{ data.item.title }}</div>
              </template>

              <template slot="sum_mass" slot-scope="data">
                <div>{{data.item.sum_mass}}</div>
              </template>

              <template slot="price" slot-scope="data">
                <div>
                  {{data.item.price}}
                  <i class="fas fa-ruble-sign ml-1"></i>
                </div>
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
                    <button
                      class="btn-icon popoverButton"
                      style="cursor: pointer;"
                      :id="getPopoverId(data.item._id)"
                    >
                      <i class="fa fa-ellipsis-h"></i>
                    </button>
                    <b-popover :target="getPopoverId(data.item._id)" triggers="focus">
                      <ul class="actions-popover">
                        <li @click="deleteSemi(data.item._id)" class="action-item">
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
            >Нет полуфабрикатов, подходящим по выбранным фильтрам.</p>
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
  name: "Semi",
  components: {
    sidebar: Sidebar
  },
  data() {
    return {
      fieldsSet: [
        {
          key: "title",
          label: "Название",
          sortable: true,
          thClass: "tr-th-custom tr-td-custom",
          tdClass: "tr-td-custom",
          position: 0
        },
        {
          key: "sum_mass",
          label: "Выход",
          sortable: true,
          thClass: "tr-th-custom tr-td-custom",
          tdClass: "tr-td-custom",
          position: 1
        },
        {
          key: "price",
          label: "Себестоимость",
          sortable: true,
          thClass: "tr-th-custom tr-td-custom",
          tdClass: "tr-td-custom",
          position: 2
        },
        {
          key: "actions",
          label: "Действия",
          thClass: "tr-th-custom tr-td-custom",
          tdClass: "tr-td-custom",
          position: 3
        }
      ],
      fields: [
        {
          key: "title",
          label: "Название",
          sortable: true,
          thClass: "tr-th-custom tr-td-custom",
          tdClass: "tr-td-custom",
          position: 0
        },
        {
          key: "sum_mass",
          label: "Выход",
          sortable: true,
          thClass: "tr-th-custom tr-td-custom",
          tdClass: "tr-td-custom",
          position: 1
        },
        {
          key: "price",
          label: "Себестоимость",
          sortable: true,
          thClass: "tr-th-custom tr-td-custom",
          tdClass: "tr-td-custom",
          position: 2
        },
        {
          key: "actions",
          label: "Действия",
          thClass: "tr-th-custom tr-td-custom",
          tdClass: "tr-td-custom",
          position: 3
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
      semi: [],

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
    this.getSemi();
  },
  methods: {
    sortFields() {
      this.fieldsSet.sort((a, b) => {
        if (a.position < b.position) return -1;
        if (a.position > b.position) return 1;
      });
    },
    async deleteSemi(id) {
      ProductsService.deleteSemi(id)
        .then(response => {
          this.getSemi();
          this.showAlertSuccess("Полуфабрикат успешно удален!");
        })
        .catch(error => {
          this.showAlertDanger("Ошибка удаления полуфабриката!");
        });
    },
    async getSemi() {
      ProductsService.fetchSemi()
        .then(res => {
          this.semi = res.data;
          this.semi.forEach(semi => {
            let mass = 0;
            semi.ingridients.forEach(ing => {
              mass = mass + Number(ing.netto.$numberDecimal);
            });
            semi.sum_mass = mass;
          });
        })
        .catch(err => {
          console.error(err);
          this.showAlertDanger("Ошибка загрузки полуфабрикатов!");
        });
    },
    getPopoverId(id) {
      return `popover${id}`;
    },
    getHrefEdit(id) {
      return `/menu/semi/edit/${id}`;
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
    filterBySearch(semi) {
      if (this.search.length === 0) {
        return true;
      }
      return semi.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
    }
  },
  computed: {
    length() {
      let length = 0;
      this.semi.forEach(item => {
        length++;
      });
      return length;
    },
    FilterSemi() {
      return this.semi.filter(this.filterBySearch);
    }
  }
};
</script>
