<template>
  <div class="products">
    <!-- Bootstrap row -->
    <div class="row no-gutters" id="body-row">
      <!-- MAIN -->
      <div class="col-2 col-sm-1">
        <sidebar></sidebar>
      </div>

      <div class="col-10 col-sm-11">
        <!-- <button @click="getProducts" class="btn">Обновить...</button> -->
        <div id="printMe">
          <div class="container-fluid mt-2 pl-0">
            <div class="row">
              <div class="col-md-4 col-lg-5">
                <h1 class="head-text mt-3">Категории ингридиентов
                  <small class="text-muted">{{length}}</small>
                </h1>
              </div>
              <div class="col-md-8 col-lg-7">
                <div class="float-right">
                  <router-link
                    to="/menu/cat_ingridients/add"
                    class="main-text"
                    style="text-decoration: none;"
                  >
                    <div class="btn-group btn-group-custom mt-3">
                      <div class="btn btn-shadow btn-custom-border">
                        <a class="main-text" style="text-decoration: none;">Добавить категорию</a>
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
                      <th
                        @click="sortEvent('count')"
                        class="td-th-custom align-content-start"
                      >Категория
                        <div v-if="sortColumn == 'category'">
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
                      v-for="category in getTransformCategories"
                      :key="category._id"
                    >
                      <td
                        class="td-custom align-middle"
                        style="text-align: left;"
                      >{{category.title}}</td>
                      <td class="td-custom align-middle">
                        <div class="d-flex flex-row">
                          <div class="mr-2">
                            <b-link :to="getHrefEdit(category._id)" class="main-text">
                              <div class="link-blue link-hover">Ред.</div>
                            </b-link>
                          </div>
                          <div class="ml-2">
                            <button class="btn-icon popoverButton" :id="getPopoverId(category._id)">
                              <i class="fa fa-ellipsis-h"></i>
                            </button>
                            <b-popover :target="getPopoverId(category._id)" triggers="focus">
                              <ul class="actions-popover">
                                <li @click="deleteCategory(category._id)" class="action-item">
                                  <a style="text-decoration: none;" class="main-text">Удалить</a>
                                </li>

                                <li class="action-item">
                                  <a style="text-decoration: none;" href class="main-text">Скрыть</a>
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
      categories: [],
      sortColumn: "count"
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    async deleteCategory(id) {
      console.log(id);
      const response = await ProductsService.deleteCatIng(id);

      if (response.status == 200) {
        this.getCategories();
      } else {
        console.error(response);
      }
    },
    async getCategories() {
      const response = await ProductsService.fetchCategoryIng();
      this.categories = response.data;
      console.log(this.categories);
    },
    filterBySearch(category) {
      if (this.search.length === 0) {
        return true;
      }
      return (
        category.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    },
    getPopoverId(id) {
      return `popover${id}`;
    },
    getHrefEdit(id) {
      return `/menu/cat_ingridients/edit/${id}`;
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
      this.categories.forEach(item => {
        length++;
      });
      return length;
    },
    getTransformCategories() {
      //Я сделал сортировку немного по своему, но работает нормально
      const vm = this;
      let filtered = vm.$data.categories.filter(el => {
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