<template>
  <div id="add_products">
    <div class="row no-gutters" id="body-row">
      <div class="col-lg-1">
        <sidebar></sidebar>
      </div>

      <div class="col-lg-11">
        <div class="container-fluid mt-2 mb-5">
          <div class="row">
            <div class="col-md-5 col-lg-5 mt-3 d-flex flex-row">
              <router-link to="/menu/category_prod_cards">
                <img class="back-arrow mt-2 mr-4" src="/static/image/arrow_back.png" alt="Back">
              </router-link>
              <h1 class="head-text">Добавление категории</h1>
            </div>
          </div>

          <hr class="line mt-4">

          <div class="row">
            <div class="col-lg-2">
              <p class="title-form mt-2">Название</p>
            </div>
            <div class="col-lg-4">
              <div class="form-group">
                <input
                  type="text"
                  ref="search"
                  class="form-control input-param"
                  v-model="category.title"
                  placeholder="Введите"
                >
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-2">
              <p class="title-form mt-2">Родительская категория</p>
            </div>
            <div class="col-lg-4">
              <div class="form-group">
                <multiselect
                  class="my-multiselect"
                  placeholder="Выберите"
                  select-label="Нажмите Enter"
                  deselectLabel="Enter для удаления"
                  v-model="parent"
                  :multiple="false"
                  :close-on-select="true"
                  label="title"
                  :options="categories"
                ></multiselect>
              </div>
            </div>
          </div>

          <hr class="hr-page">

          <div class="row">
            <div class="col-lg-2">
              <p class="title-form mt-2">Фотография</p>
            </div>
            <b-form-file accept="image/*" v-model="avatar" id="upload" class="mt-3" plain></b-form-file>
            <div class="col-lg-4 align-self-center">
              <b-link @click="selectFile" class="main-text">
                <div class="link-green link-hover">
                  <u id="upload_link">Загрузить</u>
                </div>
              </b-link>
              <div v-if="avatar" class="mt-3">
                {{avatar && avatar.name}}
                <i @click="resetFile" class="fas fa-times"></i>
              </div>
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
                    <p-radio
                      style="font-size: 20px;"
                      v-model="category.color"
                      value="blue"
                      class="p-icon p-smooth m-0"
                      color="success"
                    >
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
                    <p-radio
                      style="font-size: 20px;"
                      v-model="category.color"
                      value="red"
                      class="p-icon p-smooth m-0"
                      color="success"
                    >
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
                    <p-radio
                      style="font-size: 20px;"
                      v-model="category.color"
                      value="yellow"
                      class="p-icon p-smooth m-0"
                      color="success"
                    >
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
                    <p-radio
                      style="font-size: 20px;"
                      v-model="category.color"
                      value="pink"
                      class="p-icon p-smooth m-0"
                      color="success"
                    >
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
                    <p-radio
                      style="font-size: 20px;"
                      v-model="category.color"
                      value="green"
                      class="p-icon p-smooth m-0"
                      color="success"
                    >
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
                    <p-radio
                      style="font-size: 20px;"
                      v-model="category.color"
                      value="grey"
                      class="p-icon p-smooth m-0"
                      color="success"
                    >
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
                    <p-radio
                      style="font-size: 20px;"
                      v-model="category.color"
                      value="black"
                      class="p-icon p-smooth m-0"
                      color="success"
                    >
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
          <button type="button" @click="sendProducts" class="btn btn-success btn-lg btn-save">
            <div v-if="!stateSaving" style="color: white;" class="main-text">Добавить категорию</div>
            <div v-if="stateSaving" style="color: white;" class="main-text">Добавление...</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

import $ from "jquery";

import ProductsService from "@/services/menu/ProductsService";
import Sidebar from "@/components/Sidebar";

export default {
  name: "add_products",
  components: {
    sidebar: Sidebar
  },
  data() {
    return {
      stateSaving: false,
      mod: "without_mod",
      with_mod: false,
      without_mod: true,
      countMod: 1,

      avatar: null,

      key: null,

      parent: null,

      categories: [],

      category: {
        title: "",
        parent_id: null,
        color: ""
      }
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    resetFile() {
      this.avatar = null;
    },
    selectFile() {
      $("#upload:hidden").trigger("click");
    },
    async sendProducts() {
      let vm = this;
      vm.$data.category.parent_id = this.parent.id;
      console.log(vm.$data.category)
      const formData = new FormData();
      formData.append("category", JSON.stringify(vm.$data.category));
      formData.append("avatar", vm.$data.avatar);
      ProductsService.addCategory(formData);

      vm.$router.push("/menu/category_prod_cards");
    },
    async getCategories() {
      const vm = this;
      ProductsService.fetchCategories()
        .then(res => {
          console.log(res.data)
          vm.$data.categories = res.data.map(item => ({
            id: item._id,
            title: item.title,
            parent_id: item.parent_id
          }));
        })
        .catch(err => console.log);
    }
  },
  computed: {}
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
#upload {
  display: none;
}
</style>
