<template>
  <div class="products">
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
                  Цеха
                  <small class="text-muted">{{length}}</small>
                </h1>
              </div>
              <div class="col-md-8 col-lg-7">
                <div class="float-right">
                  <router-link
                    to="/menu/shops/add"
                    class="main-text"
                    style="text-decoration: none;"
                  >
                    <div class="btn-group btn-group-custom mt-3">
                      <div class="btn btn-shadow btn-custom-border">
                        <a class="main-text" style="text-decoration: none;">Добавить цех</a>
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
                    <tr class="tr-th-custom-left">
                      <th @click="sortEvent('count')" class="td-th-custom align-content-start">
                        Название
                        <div v-if="sortColumn == 'title'">
                          <img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
                          <img class="m-1" src="/static/image/up.png" alt="up">
                        </div>
                      </th>
                      <th class="td-th-custom align-content-start">Бегунки</th>
                      <th class="td-th-custom" style="width: 50px;"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr :key="shop._id" class="tr-td-custom" v-for="shop in getTransformCategories">
                      <td class="td-custom align-middle" style="text-align: left;">{{shop.title}}</td>
                      <td
                        class="td-custom align-middle"
                        style="text-align: left;"
                      >{{shop.print_runners}}</td>
                      <td class="td-custom align-middle">
                        <div class="d-flex flex-row">
                          <div class="mr-2">
                            <b-link :to="getHrefEdit(shop._id)" class="main-text">
                              <div class="link-blue link-hover">Ред.</div>
                            </b-link>
                          </div>
                          <div class="ml-2">
                            <button class="btn-icon popoverButton" :id="getPopoverId(shop._id)">
                              <i class="fa fa-ellipsis-h"></i>
                            </button>
                            <b-popover :target="getPopoverId(shop._id)" triggers="focus">
                              <ul class="actions-popover">
                                <li @click="deleteShop(shop._id)" class="action-item">
                                  <a style="text-decoration: none;" class="main-text">Удалить</a>
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
              >Нет цехов, подходящим по выбранным фильтрам.</p>
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
  name: "category",
  components: {
    sidebar: Sidebar
  },
  data() {
    return {
      search: "",
      shops: [],
      sortColumn: "count"
    };
  },
  mounted() {
    this.getShop();
  },
  watch: {
    $route() {
      this.getShop();
    }
  },
  methods: {
    async deleteShop(id) {
      console.log(id);
      const vm = this;
      ProductsService.deleteShop(id).then(res => {
        vm.getShop();
      });
    },
    async getShop() {
      const response = await ProductsService.fetchShops();
      this.shops = response.data;
      this.shops.forEach(item => {
        if (item.print_runners) {
          item.print_runners = "Да";
        } else {
          item.print_runners = "Нет";
        }
      });
      console.log(this.shops);
    },
    filterBySearch(shop) {
      if (this.search.length === 0) {
        return true;
      }
      return shop.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
    },
    getPopoverId(id) {
      return `popover${id}`;
    },
    getHrefEdit(id) {
      return `/menu/shops/edit/${id}`;
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
      this.shops.forEach(item => {
        length++;
      });
      return length;
    },
    getTransformCategories() {
      const vm = this;
      let filtered = vm.$data.shops.filter(el => {
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

