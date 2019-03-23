<template>
  <div id="add_ing">
    <div class="row no-gutters" id="body-row">
      <div class="col-2 col-sm-1">
        <sidebar></sidebar>
      </div>

      <div class="col-10 col-sm-11">
        <div class="container-fluid mt-2 mb-5">
          <div class="row">
            <div class="col-md-5 col-lg-5 mt-3 d-flex flex-row">
              <router-link to="/menu/ingridients">
                <img class="back-arrow mt-2 mr-4" src="/static/image/arrow_back.png" alt="Back">
              </router-link>
              <h1 class="head-text">Редактирование ингредиента</h1>
            </div>
          </div>

          <hr class="line mt-4">

          <div class="row">
            <div class="col-lg-3">
              <p class="title-form mt-2">Название</p>
            </div>
            <div class="col-lg-4">
              <div class="form-group">
                <input
                  type="text"
                  ref="search"
                  class="form-control input-param"
                  v-model="ingridient.title"
                  placeholder="Введите"
                >
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-3">
              <p class="title-form mt-2">Категория</p>
            </div>
            <div class="col-lg-4">
              <div class="form-group">
                <multiselect
                  class="my-multiselect"
                  placeholder="Выберите"
                  select-label="Нажмите Enter"
                  deselectLabel="Enter для удаления"
                  v-model="ingridient.category"
                  :multiple="false"
                  :close-on-select="true"
                  label="title"
                  track-by="_id"
                  :options="categoriesIng"
                ></multiselect>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-3">
              <p class="title-form mt-2">Ед. измерения</p>
            </div>
            <div class="col-lg-4">
              <div class="form-group">
                <multiselect
                  class="my-multiselect"
                  placeholder="Выберите"
                  select-label="Нажмите Enter"
                  deselectLabel="Enter для удаления"
                  v-model="ingridient.unit"
                  :multiple="false"
                  :close-on-select="true"
                  :options="unitIng"
                ></multiselect>
              </div>
            </div>
          </div>

          <div v-if="ingridient.unit == 'кг'">
            <div class="row">
              <div class="col-lg-3">
                <p class="title-form mt-2">% потерь при очистке</p>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <input
                    type="text"
                    ref="search"
                    class="form-control input-param"
                    v-model="ingridient.losses_clean"
                    placeholder="Введите"
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-3">
                <p class="title-form mt-2">% потерь при варке</p>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <input
                    type="text"
                    ref="search"
                    class="form-control input-param"
                    v-model="ingridient.losses_cooking"
                    placeholder="Введите"
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-3">
                <p class="title-form mt-2">% потерь при жарке</p>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <input
                    type="text"
                    ref="search"
                    class="form-control input-param"
                    v-model="ingridient.losses_frying"
                    placeholder="Введите"
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-3">
                <p class="title-form mt-2">% потерь при тушении</p>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <input
                    type="text"
                    ref="search"
                    class="form-control input-param"
                    v-model="ingridient.losses_stew"
                    placeholder="Введите"
                  >
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-3">
                <p class="title-form mt-2">% потерь при запекании</p>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <input
                    type="text"
                    ref="search"
                    class="form-control input-param"
                    v-model="ingridient.losses_bak"
                    placeholder="Введите"
                  >
                </div>
              </div>
            </div>
          </div>

          <div v-if="ingridient.unit=='шт'">
            <div class="row">
              <div class="col-lg-3">
                <p class="title-form mt-2">Округлять</p>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <multiselect
                    class="my-multiselect"
                    placeholder="Выберите"
                    select-label="Нажмите Enter"
                    deselectLabel="Enter для удаления"
                    v-model="ingridient.round"
                    :multiple="false"
                    :close-on-select="true"
                    label="title"
                    track-by="value"
                    :options="roundParamList"
                  ></multiselect>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-3">
                <p class="title-form mt-2">Вес ингридиента в граммах</p>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <input
                    type="text"
                    ref="search"
                    class="form-control input-param"
                    v-model="ingridient.weight"
                    placeholder="Введите"
                  >
                </div>
              </div>
            </div>
          </div>

          <hr class="hr-page">
          <button type="button" @click="sendIng" class="btn btn-success btn-lg btn-save">
            <div v-if="!stateSaving" style="color: white;" class="main-text">Добавить ингредиент</div>
            <div v-if="stateSaving" style="color: white;" class="main-text">Добавление...</div>
          </button>
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

      key: null,
      roundParamList: [
        {
          title: "Округлять",
          value: "1"
        },
        {
          title: "Не округлять",
          value: "0"
        }
      ],

      unitIng: ["кг", "шт", "л"],
      categoriesIng: [],
      /* {id: 1,title:"Первая категория"},{id: 2, title:"Вторая категория"} */

      ingridients: [],

      ingridient: {
        title: "",
        cat_id: "",
        unit: "кг",
        losses_clean: 0,
        losses_cooking: 0,
        losses_frying: 0,
        losses_stew: 0,
        losses_bak: 0,
        round: null,
        weight: null
      },
      editId: null
    };
  },
  mounted() {
    this.setEditId(this.$route.params.id);
    this.getIng();
    this.fetchCategoryIng();
  },
  methods: {
    setEditId(id) {
      this.editId = id;
    },
    getIng() {
      let vm = this;
      ProductsService.fetchIngridients()
        .then(res => {
          vm.$data.ingridients = res.data;
          vm.$data.ingridients.forEach(ing => {
            if (ing._id == vm.$data.editId) {
              vm.$data.ingridient = ing;
            }
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    async sendIng() {
      this.stateSaving = true;
      this.ingridient.category = this.ingridient.category._id;
      if (this.ingridient.round != null) {
        this.ingridient.round = this.ingridient.round.value;
      }
      ProductsService.updateIngridients(this.editId, this.ingridient)
        .then(res => {
          this.$router.push("/menu/ingridients");
        })
        .catch(err => {
          console.error(err);
          alert("Ошибка сохранения!");
        });
    },
    async fetchCategoryIng() {
      const vm = this;
      ProductsService.fetchCategoryIng()
        .then(res => {
          vm.categoriesIng = res.data;
        })
        .catch(err => console.error(err));
    }
  },
  computed: {}
};
</script>

<style>
#upload {
  display: none;
}
</style>
