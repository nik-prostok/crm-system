<template>
  <div id="add_products">
    <div class="row no-gutters" id="body-row">
      <div class="col-2 col-sm-1">
        <sidebar></sidebar>
      </div>

      <div class="col-10 col-sm-11">
        <b-form class="container-fluid mt-2 mb-5" @submit="sendProducts">
          <div class="row">
            <div class="col-md-5 col-lg-5 mt-3 d-flex flex-row">
              <router-link to="/menu/products">
                <img class="back-arrow mt-2 mr-4" src="/static/image/arrow_back.png" alt="Back">
              </router-link>
              <h1 class="head-text">Новый товар</h1>
            </div>
          </div>

          <hr class="line mt-4">

          <div class="row">
            <div class="col-lg-2">
              <p class="title-form mt-2">Название</p>
            </div>
            <div class="col-lg-4">
              <div class="form-group">
                <b-form-input
                  required
                  type="text"
                  ref="search"
                  class="form-control input-param"
                  v-model="product.title"
                  placeholder="Введите"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-2">
              <p class="title-form mt-2">Категория</p>
            </div>
            <div class="col-lg-4">
              <div class="form-group">
                <b-form-select
                  required
                  v-model="product.category"
                  :options="categories"
                  class="form-control input-param"
                  placeholder="Выберите"
                />
              </div>
            </div>
          </div>

          <div class="row mt-2 mb-4" v-if="product.category === 0">
            <div class="col-lg-2">
              <!-- <p class="title-form mt-2">Новая категория</p> -->
            </div>
            <div class="col-lg-4 card-custom">
              <b-card>
                <b-form-group>
                  <b-form-input
                    required
                    v-model="category.title"
                    class="form-control input-param"
                    placeholder="Имя новой категории"
                  />
                </b-form-group>
                <b-form-group description="Родительская категория">
                  <b-form-select
                    required
                    v-model="category.parent"
                    :options="categoriesParent"
                    class="form-control input-param"
                    placeholder="Выберите"
                  />
                </b-form-group>
                <div class="row">
                  <div class="col-lg-5">
                    <p class="mt-2">Фотография</p>
                  </div>
                  <b-form-file
                    accept="image/*"
                    v-model="avatarCategory"
                    id="upload"
                    class="mt-3"
                    plain
                  ></b-form-file>
                  <div class="col-lg-4 align-self-center">
                    <b-link @click="selectFile" class="main-text">
                      <div class="link-green link-hover">
                        <u id="upload_link">Загрузить</u>
                      </div>
                    </b-link>
                    <div v-if="avatarCategory" class="mt-3">
                      {{avatarCategory && avatarCategory.name}}
                      <i
                        @click="avatarCategory = null"
                        class="fas fa-times"
                      ></i>
                    </div>
                  </div>
                </div>
                <div slot="footer">
                  <button @click="saveCategory" class="btn btn-success btn-save">
                    <div style="color: white;" class="main-text">Сохранить</div>
                  </button>
                </div>
              </b-card>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-2">
              <p class="title-form mt-2">Цех</p>
            </div>
            <div class="col-lg-4">
              <div class="form-group">
                <b-form-select
                  required
                  v-model="product.shop"
                  :options="shops"
                  class="form-control input-param"
                  placeholder="Выберите"
                />
              </div>
            </div>
          </div>

          <div class="row mt-2 mb-4" v-if="product.shop === 0">
            <div class="col-lg-2">
              <!-- <p class="title-form mt-2">Новый цех</p> -->
            </div>
            <div class="col-lg-4 card-custom">
              <b-card>
                <b-form-group>
                  <b-form-input
                    required
                    v-model="shop.title"
                    class="form-control input-param"
                    placeholder="Имя нового цеха"
                  />
                </b-form-group>
                <b-form-group>
                  <p-check
                    v-model="shop.print_runners"
                    style="font-size: 18px;"
                    class="p-icon p-smooth mt-0"
                    color="success"
                  >
                    <i slot="extra" class="icon fa fa-check"></i>
                    <div style="font-size: 16px;" class="main-text">Печатать бегунки</div>
                  </p-check>
                </b-form-group>
                <div slot="footer">
                  <button @click="saveShop" class="btn btn-success btn-save">
                    <div style="color: white;" class="main-text">Сохранить</div>
                  </button>
                </div>
              </b-card>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-2">
              <p class="title-form mt-2">Цена и штрихкод</p>
            </div>
            <div class="col-lg-6 card-custom">
              <div class="card">
                <div class="card-body p-2">
                  <div class="form-group">
                    <p-radio
                      style="font-size: 25px;"
                      v-on:change="open_collapse"
                      v-model="mod"
                      value="without_mod"
                      class="p-icon p-smooth check-custom mt-0 mb-2"
                      color="success"
                    >
                      <i slot="extra" class="icon fa fa-check"></i>
                      <div style="font-size: 18px;" class="main-text">
                        <strong>Без модификаций</strong>
                        <small class="text-muted main-text">(один вид товара)</small>
                      </div>
                    </p-radio>
                    <b-collapse v-model="without_mod" class="mt-2" id="no-modif-collapse">
                      <div class="row mt-4 ml-2">
                        <div class="lg-8">
                          <p class="main-text mb-2">Штрихкод</p>
                          <div class="form-group">
                            <input
                              type="text"
                              ref="search"
                              class="form-control input-param"
                              placeholder="Введите"
                              v-model="product.bar_code"
                            >
                          </div>
                        </div>
                      </div>
                      <div class="row ml-2">
                        <div class="col-lg-5">
                          <div class="row">
                            <div class="col-lg-7 p-0">
                              <div class="main-text">Себестоимость</div>
                              <div class="form-group">
                                <input
                                  v-model.number="product.self_cost"
                                  type="text"
                                  ref="search"
                                  class="form-control input-param"
                                >
                              </div>
                            </div>
                            <div class="col-lg-3 pr-0 align-self-center">
                              <div class="main-text">руб.</div>
                            </div>
                            <div class="col-lg-2 align-self-center p-0">
                              <div class="sign-mute-text">
                                <strong>+</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-4">
                          <div class="row">
                            <div class="col-lg-7 p-0">
                              <div class="main-text">Наценка</div>
                              <div class="form-group p-1">
                                <input
                                  v-model.number="product.markup"
                                  type="text"
                                  ref="search"
                                  class="form-control input-param"
                                >
                              </div>
                            </div>
                            <div class="col-lg-3 pr-0 align-self-center">
                              <div class="main-text">%</div>
                            </div>
                            <div class="col-lg-2 align-self-center p-0">
                              <div class="sign-mute-text">
                                <strong>=</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-3" style="display:inline-block;">
                          <div class="row" style="overflow:auto;white-space:nowrap;">
                            <div class="col-lg-7 p-0">
                              <div class="main-text">Итого</div>
                              <div class="form-group">
                                <input
                                  v-model="getPrice"
                                  type="text"
                                  ref="search"
                                  class="form-control input-param"
                                >
                              </div>
                            </div>
                            <div class="col-lg-3 pr-0 align-self-center">
                              <div class="main-text">руб.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </b-collapse>
                  </div>

                  <hr class="hr-card-body">

                  <div class="form-group">
                    <p-radio
                      style="font-size: 25px;"
                      v-on:change="open_collapse"
                      v-model="mod"
                      value="with_mod"
                      class="p-icon p-smooth check-custom mt-0 mb-2"
                      color="success"
                    >
                      <i slot="extra" class="icon fa fa-check"></i>
                      <div style="font-size: 18px;" class="main-text">
                        <strong>С модификациями</strong>
                      </div>
                    </p-radio>
                    <b-collapse v-model="with_mod" class="mt-2" id="no-modif-collapse">
                      <div class="mod" :key="key" v-for="(mod_item,key) in product.modification">
                        <hr>
                        <div class="row mt-4 ml-2">
                          <div class="col-lg-8">
                            <p class="main-text mb-2">Название</p>
                            <div class="form-group">
                              <input
                                type="text"
                                class="form-control input-param"
                                placeholder="Введите"
                                v-model="mod_item.title_mode"
                              >
                            </div>
                          </div>
                          <div class="col-lg-4" v-if="key">
                            <b-link class="main-text" @click="deleteMod(key)">
                              <div class="link-red link-hover">Удалить модификацию</div>
                            </b-link>
                          </div>
                        </div>
                        <div class="row ml-2">
                          <div class="col-lg-8">
                            <p class="main-text mb-2">Штрихкод</p>
                            <div class="form-group">
                              <input
                                type="text"
                                ref="search"
                                class="form-control input-param"
                                placeholder="Введите"
                                v-model="mod_item.bar_code"
                              >
                            </div>
                          </div>
                        </div>
                        <div class="row ml-2">
                          <div class="col-lg-5">
                            <div class="row">
                              <div class="col-lg-7 pr-0">
                                <div class="main-text">Себестоимость</div>
                                <div class="form-group">
                                  <input
                                    v-model.number="mod_item.self_cost"
                                    type="text"
                                    ref="search"
                                    class="form-control input-param"
                                  >
                                </div>
                              </div>
                              <div class="col-lg-3 pr-0 align-self-center">
                                <div class="main-text">руб.</div>
                              </div>
                              <div class="col-lg-2 align-self-center p-0">
                                <div class="sign-mute-text">
                                  <strong>+</strong>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-3">
                            <div class="row">
                              <div class="col-lg-7 pr-0">
                                <div class="main-text">Наценка</div>
                                <div class="form-group p-1">
                                  <input
                                    v-model.number="mod_item.markup"
                                    @input="updatePrice(key, mod_item.markup, mod_item.self_cost)"
                                    type="text"
                                    ref="search"
                                    class="form-control input-param"
                                  >
                                </div>
                              </div>
                              <div class="col-lg-3 pr-0 align-self-center">
                                <div class="main-text">%</div>
                              </div>
                              <div class="col-lg-2 align-self-center p-0">
                                <div class="sign-mute-text">
                                  <strong>=</strong>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-4" style="display:inline-block;">
                            <div class="row" style="overflow:auto;white-space:nowrap;">
                              <div class="col-lg-7 pr-0">
                                <div class="main-text">Итого</div>
                                <div class="form-group">
                                  <input
                                    :value="mod_item.price"
                                    type="text"
                                    ref="search"
                                    class="form-control input-param"
                                  >
                                </div>
                              </div>
                              <div class="col-lg-3 pr-0 align-self-center">
                                <div class="main-text">руб.</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row ml-2">
                        <b-link class="main-text" @click="addBlankMod">
                          <div class="link-blue link-hover">Добавить еще одну модификацию</div>
                        </b-link>
                      </div>
                    </b-collapse>
                  </div>
                </div>
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
                <i @click="avatar = null" class="fas fa-times"></i>
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
                      v-model="product.color"
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
                      v-model="product.color"
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
                      v-model="product.color"
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
                      v-model="product.color"
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
                      v-model="product.color"
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
                      v-model="product.color"
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
                      v-model="product.color"
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
          <div class="row">
            <div class="col-lg-2">
              <p class="title-form mt-2">Опции</p>
            </div>
            <div class="col-lg-10">
              <div class="row">
                <p-check
                  style="font-size: 24px;"
                  v-model="product.weight_goods"
                  class="p-icon p-smooth mt-0 mb-2"
                  color="success"
                >
                  <i slot="extra" class="icon fa fa-check"></i>
                  <div style="font-size: 18px;" class="main-text">Весовой товар (цена за 100 гр)</div>
                </p-check>
              </div>
              <div class="row">
                <p-check
                  v-model="product.no_dicsount"
                  style="font-size: 24px;"
                  class="p-icon p-smooth mt-0 mb-2"
                  color="success"
                >
                  <i slot="extra" class="icon fa fa-check"></i>
                  <div style="font-size: 18px;" class="main-text">Не участвует в скидках</div>
                </p-check>
              </div>
            </div>
          </div>
          <hr class="hr-page">
          <button type="submit" class="btn btn-success btn-lg btn-save">
            <div v-if="!stateSaving" style="color: white;" class="main-text">Сохранить</div>
            <div v-if="stateSaving" style="color: white;" class="main-text">Сохранение...</div>
          </button>
        </b-form>
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

      isShowAddCat: false,

      key: null,

      categories: [],
      shops: [],

      categoriesParent: null,

      avatarCategory: null,
      category: {
        title: "",
        parent_id: null,
        color: ""
      },

      shop: {
        title: "",
        print_runners: false
      },

      avatar: null,
      product: {
        title: "",
        category: "",
        shop: "",
        bar_code: null,
        self_cost: null,
        markup: null,
        price: null,
        color: [],
        weight_goods: 0,
        types: false,
        SKU: 0,
        profit: null,
        no_dicsount: false,

        modification: [
          {
            bar_code: "",
            title_product: "",
            title_mode: "",
            self_cost: null,
            markup: null,
            price: null,
            profit: null
          }
        ]
      }
    };
  },
  mounted() {
    this.getCategories();
    this.getShops();
  },
  methods: {
    async saveCategory() {
      this.category.parent_id = this.category.parent;
      const formData = new FormData();
      formData.append("category", JSON.stringify(this.category));
      formData.append("avatar", this.avatarCategory);
      await ProductsService.addCategory(formData)
        .then(res => {
          this.getCategories();
          this.product.category = res.data._id;
          this.category = {
            title: "",
            parent_id: null,
            color: ""
          };
          console.log(res);
        })
        .catch(error => {
          console.error(error);
          alert("Ошибка добавления!");
        });
    },
    async saveShop() {
      await ProductsService.addShop(this.shop)
        .then(res => {
          this.getShops();
          this.product.shop = res.data._id;
          this.shop = {
            title: "",
            print_runners: false
          };
          console.log(res);
        })
        .catch(error => {
          console.error(error);
          alert("Ошибка добавления!");
        });
    },
    selectFile() {
      $("#upload:hidden").trigger("click");
    },
    async sendProducts(evt) {
      evt.preventDefault();
      this.stateSaving = true;

      if (this.product.types == false) {
        this.product.bar_code = null;
        this.product.self_cost = null;
        this.product.markup = null;
        this.product.price = null;

        this.product.modification = [];
        this.product.profit = this.product.price - this.product.self_cost;
      }

      if (this.product.color.length == 0) {
        this.product.color = null;
      }

      this.product.modification.forEach(item => {
        item.profit = item.price - item.self_cost;
        item.title_product = this.product.title;
      });

      console.log(this.product);

      let vm = this;
      const formData = new FormData();
      formData.append("product", JSON.stringify(vm.$data.product));
      formData.append("avatar", vm.$data.avatar);
      ProductsService.addProduct(formData)
        .then(response => {
          this.$router.push("/menu/products");
        })
        .catch(error => {
          alert("Ошибка отправки");
        });
    },
    async getCategories() {
      const response = await ProductsService.fetchCategories()
        .then(response => {
          this.categories = response.data;
          this.categories.forEach(cat => {
            cat.value = cat._id;
            cat.text = cat.title;
          });
          this.categoriesParent = JSON.parse(JSON.stringify(this.categories));
          this.categories.push({
            value: 0,
            text: "Добавить новую категорию"
          });
        })
        .catch(error => {
          console.error(error.response);
        });
    },
    async getShops() {
      const res = await ProductsService.fetchShops()
        .then(response => {
          this.shops = response.data;
          this.shops.forEach(shop => {
            shop.value = shop._id;
            shop.text = shop.title;
          });
          this.shops.push({
            value: 0,
            text: "Добавить новый цех"
          });
        })
        .catch(error => {
          console.error(error.response);
        });
    },
    open_collapse() {
      if (this.mod == "without_mod") {
        this.without_mod = true;
        this.with_mod = false;
        this.product.types = false;
      } else {
        this.without_mod = false;
        this.with_mod = true;
        this.product.types = true;
      }
    },
    addBlankMod() {
      this.product.modification.push({
        bar_code: "",
        title_product: "",
        title_mode: "",
        self_cost: null,
        markup: null,
        price: null,
        profit: null
      });
    },
    deleteMod(key) {
      console.log(key);

      this.product.modification.splice(key, 1);
    },
    updatePrice(key, markup, self_cost) {
      this.product.modification[key].markup = markup;
      this.product.modification[key].self_cost = self_cost;

      this.product.modification[key].price =
        this.product.modification[key].self_cost +
        (this.product.modification[key].self_cost / 100) *
          this.product.modification[key].markup;
    }
  },
  computed: {
    getPrice() {
      this.product.price =
        this.product.self_cost +
        (this.product.self_cost / 100) * this.product.markup;
      if (this.product.price == 0) {
        this.product.price = null;
      }
      return this.product.price;
    }
  }
};
</script>
<style>
#upload {
  display: none;
}
</style>
