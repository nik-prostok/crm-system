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
                  Категории
                  <small class="text-muted">{{length}}</small>
                </h1>
              </div>
              <div class="col-md-8 col-lg-7">
                <div class="float-right">
                  <router-link
                    to="/menu/category_prod_cards/add"
                    class="main-text"
                    style="text-decoration: none;"
                  >
                    <button class="btn mt-3 btn-success btn-add btn-lg">
                      <div style="color: white;" class="main-text">Добавить категорию</div>
                    </button>
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
                        Категория
                        <div v-if="sortColumn == 'category'">
                          <img v-if="sort" class="m-1" src="/static/image/down.png" alt="down">
                          <img v-else class="m-1" src="/static/image/up.png" alt="up">
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <item
                      :field="1"
                      style="width: 100%"
                      :model="getTransformCategories"
                      @deleteCat="deleteCategory"
                    ></item>
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
import item from "@/components/menu/TreeList";

var arrayToTree = require("array-to-tree");

export default {
  name: "category",
  components: {
    sidebar: Sidebar,
    item: item
  },
  data() {
    return {
      open: false,

      search: "",
      categories: [],
      parentCategory: [],
      sortColumn: "count",
      transformListCategories: null
    };
  },
  mounted() {
    this.getCategories();
  },
  created() {
    this.$root.$on("deleteCat", id => {
      this.deleteCategory(id);
    });
  },
  watch: {
    $route() {
      this.getCategories();
    }
  },
  methods: {
    async deleteCategory(id) {
      const response = await ProductsService.deleteCategory(id);

      if (response.status == 200) {
        this.category = [];
        this.getCategories();
      }
    },
    async getCategories() {
      const response = await ProductsService.fetchCategories();
      this.categories = response.data;
      console.log(this.categories);
      this.categories.forEach(cat => {
        if (cat.id != 60) {
          cat.id = cat._id;
        }
      });

      //	console.log(this.categories);
    },
    setCollapse(category) {
      //	this.getTransformCategories()
      this.transformListCategories.forEach(item => {
        if (item.id == category.id) {
          console.log("title: " + category.title + " id: " + category.collapse);
          item.collapse = !category.collapse;
        }
      });
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
      return "popover" + id;
    },
    getHrefEdit(id) {
      return "/menu/category_prod_cards/edit/" + id;
    },
    sortEvent(message) {
      //	console.log(message);
      if (this.sortColumn == message) {
        this.sort = !this.sort;
      } else {
        this.sortColumn = message;
      }
    },
    filterByParentCategory(category) {
      if (category.parent_id == 60) {
        return true;
      } else {
        return false;
      }
    },
    getParentCategory() {
      this.parentCategory = this.categories.filter(this.filterByParentCategory);
    }
    /*getTransformCategories(){
				var withoutStart = this.categories.filter(item => {
					if (item.id != 60) return true;
					else return false;
				})
				withoutStart.forEach(item => {
					if ((item.children == null) && (item.collapse == null)){
						item.collapse = false;
					}
				})
				this.transformListCategories = arrayToTree(withoutStart);
				console.log(this.transformListCategories)
			},*/
  },
  computed: {
    getTransformCategories() {
      var withoutStart = this.categories.filter(item => {
        if (item.id != 60) return true;
        else return false;
      });
      withoutStart.forEach(item => {
        if (item.children == null && item.collapse == null) {
          item.collapse = false;
        }
      });
      this.transformListCategories = {
        children: arrayToTree(withoutStart),
        title: "My tree",
        id: 60
      };
      //console.log(this.transformListCategories)
      return this.transformListCategories;
    },
    length() {
      let length = 0;
      this.categories.forEach(item => {
        length++;
      });
      return length - 1;
    },
    getParentCategories() {
      return this.categories.filter(this.filterByParentCategory);
    }
  }
};
</script>
