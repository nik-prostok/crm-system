<template>
  <div class="ingridients">
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
                <h1 class="head-text mt-3">Ингредиенты
                  <small class="text-muted">{{length}}</small>
                </h1>
              </div>
              <div class="col-md-8 col-lg-7">
                <div class="float-right">
                  <router-link
                    to="/menu/ingridients/add"
                    class="main-text"
                    style="text-decoration: none;"
                  >
                    <div class="btn-group btn-group-custom mt-3">
                      <div class="btn btn-shadow btn-custom-border">
                        <a class="main-text" style="text-decoration: none;">Добавить ингредиент</a>
                      </div>
                    </div>
                  </router-link>
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
              <div class="table-responsive">
                <table class="table table-custom table-bordered">
                  <thead>
                    <tr class="tr-th-custom">
                      <th @click="sortEvent('title')" class="td-th-custom">Название
                        <div v-if="sortColumn == 'title'">
                          <img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
                          <img v-else class="m-1" src="/static/image/up.png" alt="up">
                        </div>
                      </th>
                      <th @click="sortEvent('ingridients')" class="td-th-custom">Категория
                        <div v-if="sortColumn == 'cat'">
                          <img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
                          <img v-else class="m-1" src="/static/image/up.png" alt="up">
                        </div>
                      </th>
                      <th @click="sortEvent('losses')" class="td-th-custom">Единица измерения
                        <div v-if="sortColumn == 'unit'">
                          <img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
                          <img v-else class="m-1" src="/static/image/up.png" alt="up">
                        </div>
                      </th>
                      <th @click="sortEvent('losses')" class="td-th-custom">Вес шт. ингредиента
                        <div v-if="sortColumn == 'weight'">
                          <img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
                          <img v-else class="m-1" src="/static/image/up.png" alt="up">
                        </div>
                      </th>
                      <th @click="sortEvent('losses')" class="td-th-custom">Потери
                        <div v-if="sortColumn == 'losses'">
                          <img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
                          <img v-else class="m-1" src="/static/image/up.png" alt="up">
                        </div>
                      </th>
                      <th @click="sortEvent('remains')" class="td-th-custom">Остатки на складах
                        <div v-if="sortColumn == 'remains'">
                          <img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
                          <img v-else class="m-1" src="/static/image/up.png" alt="up">
                        </div>
                      </th>
                      <th @click="sortEvent('cost')" class="td-th-custom">Себестоимость
                        <div v-if="sortColumn == 'cost'">
                          <img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
                          <img v-else class="m-1" src="/static/image/up.png" alt="up">
                        </div>
                      </th>
                      <th @click="sortEvent('amount_balances')" class="td-th-custom">Сумма остатков
                        <div v-if="sortColumn == 'amount_balances'">
                          <img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
                          <img v-else class="m-1" src="/static/image/up.png" alt="up">
                        </div>
                      </th>
                      <th class="td-th-custom" style="width: 50px;"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="tr-td-custom"
                      :key="ingridient._id"
                      v-for="ingridient in getTransformCategories"
                    >
                      <td class="td-custom align-middle" style>{{ingridient.title}}</td>
                      <td class="td-custom align-middle" style>{{ingridient.category.title}}</td>
                      <td class="td-custom align-middle" style>{{ingridient.unit}}</td>
                      <td class="td-custom align-middle" style>{{ingridient.weight}}</td>
                      <td v-if="ingridient.unit != 'кг'" class="td-custom align-middle" style>—</td>

                      <td v-else class="td-custom align-middle" style="width: 100%;">
                        {{ingridient.losses_clean}}%
                        {{ingridient.losses_cooking}}%
                        {{ingridient.losses_frying}}%
                        {{ingridient.losses_stew}}%
                        {{ingridient.losses_bak}}%
                      </td>
                      <td class="td-custom align-middle" style>—</td>
                      <td class="td-custom align-middle" style>—</td>
                      <td class="td-custom align-middle" style>—</td>
                      <td class="td-custom align-middle">
                        <div class="d-flex flex-row">
                          <div class="mr-2">
                            <b-link class="main-text">
                              <div class="link-blue link-hover">Детали</div>
                            </b-link>
                          </div>
                          <div class="mr-2">
                            <b-link :to="getHrefEdit(ingridient._id)" class="main-text">
                              <div class="link-blue link-hover">Ред.</div>
                            </b-link>
                          </div>
                          <div class="ml-2">
                            <button
                              class="btn-icon popoverButton"
                              :id="getPopoverId(ingridient._id)"
                            >
                              <i class="fa fa-ellipsis-h"></i>
                            </button>
                            <b-popover :target="getPopoverId(ingridient._id)" triggers="focus">
                              <ul class="actions-popover">
                                <li @click="deleteIngridients(ingridient._id)" class="action-item">
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
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p
                class="text-center"
                v-if="length == 0 "
              >Нет категорий, подходящим по выбранным фильтрам.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- body-row END -->
</template>

<script>
import Vue from "vue";

import ProductsService from "@/services/menu/ProductsService";
import Sidebar from "@/components/Sidebar";

export default {
  name: "ingridients",
  components: {
    sidebar: Sidebar
  },
  data() {
    return {
      search: "",
      ingridients: [],
      sortColumn: "count"
    };
	},
	created() {
		this.getIngridients();
	},
  mounted() {
    this.getIngridients();
  },
  methods: {
    async deleteIngridients(id) {
      const response = await ProductsService.deleteIngridients(id);

      if (response.status == 200) {
        this.getIngridients();
      }
    },
    async getIngridients() {
      const response = await ProductsService.fetchIngridients();
      this.ingridients = response.data;
      this.ingridients.forEach(item => {
        if (item.weight == null) {
          item.weight = "—";
        }
      });
      console.log(this.ingridients);
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
      return `${id}`;
    },
    getHrefEdit(id) {
      return `/menu/ingridients/edit/${id}`;
    },
    sortEvent(message) {
      console.log(message);
      if (this.sortColumn == message) {
        this.sort = !this.sort;
      } else {
        this.sortColumn = message;
      }
    }
  },
  computed: {
    length() {
      let length = 0;
      this.ingridients.forEach(item => {
        length++;
      });
      return length;
    },
    getTransformCategories() {
      //Я сделал сортировку немного по своему, но работает нормально
      const vm = this;
      let filtered = vm.$data.ingridients.filter(el => {
        if (el.title.toLowerCase().indexOf(vm.$data.search.toLowerCase()) > -1)
          return true;
        else return false;
      });
      console.log("filtered", filtered);
      return filtered;
    }
  }
};
</script>