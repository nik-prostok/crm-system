<template>
  <div id="edit_map">
    <div class="row no-gutters" id="body-row">
      <div class="col-lg-1">
        <sidebar></sidebar>
      </div>

      <div class="col-lg-11">
        <div class="container-fluid mt-2 mb-5">
          <div class="row">
            <div class="col-md-5 col-lg-5 mt-3 d-flex flex-row">
              <router-link to="/menu/maps">
                <img class="back-arrow mt-2 mr-4" src="/static/image/arrow_back.png" alt="Back">
              </router-link>
              <h1 class="head-text">Редактирование тех. карты</h1>
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
                  v-model="map.title"
                  placeholder="Введите"
                >
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-3">
              <p class="title-form mt-2">Штрихкод</p>
            </div>
            <div class="col-lg-4">
              <div class="form-group">
                <input
                  type="text"
                  ref="search"
                  class="form-control input-param"
                  v-model="map.bar_code"
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
                  v-model="map.category"
                  :multiple="false"
                  :close-on-select="true"
                  label="title"
                  track-by="_id"
                  :options="categories"
                ></multiselect>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-3">
              <p class="title-form mt-2">Цех</p>
            </div>
            <div class="col-lg-4">
              <div class="form-group">
                <multiselect
                  class="my-multiselect"
                  placeholder="Выберите"
                  select-label="Нажмите Enter"
                  deselectLabel="Enter для удаления"
                  v-model="map.shop"
                  :multiple="false"
                  :close-on-select="true"
                  label="title"
                  track-by="_id"
                  :options="shops"
                ></multiselect>
              </div>
            </div>
          </div>

          <hr class="hr-page">

          <div class="row">
            <div class="col-lg-2">
              <p class="title-form mt-2">Фотография</p>
            </div>
            <b-form-file
              accept="image/*"
              style="display: none;"
              v-model="avatar"
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
                      v-model="map.color"
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
                      v-model="map.color"
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
                      v-model="map.color"
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
                      v-model="map.color"
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
                      v-model="map.color"
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
                      v-model="map.color"
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
                      v-model="map.color"
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
                  v-model="map.weight"
                  class="p-icon p-smooth mt-0 mb-2"
                  color="success"
                >
                  <i slot="extra" class="icon fa fa-check"></i>
                  <div style="font-size: 18px;" class="main-text">Весовая тех. карта</div>
                </p-check>
              </div>
              <div class="row">
                <p-check
                  v-model="map.no_dicsount"
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

          <div class="row">
            <div class="col-lg-3">
              <p class="title-form mt-2">Время приготовления</p>
            </div>
            <div class="col-lg-2">
              <div class="form-group input-group">
                <input
                  type="text"
                  ref="search"
                  class="form-control input-param"
                  v-model="map.min"
                  placeholder="Введите"
                >
                <div class="input-group-append">
                  <span class="input-group-text" id="basic-addon2">мин</span>
                </div>
              </div>
            </div>
            <div class="col-lg-2">
              <div class="form-group input-group">
                <input
                  type="text"
                  ref="search"
                  class="form-control input-param"
                  v-model="map.sec"
                  placeholder="Введите"
                >
                <div class="input-group-append">
                  <span class="input-group-text" id="basic-addon2">сек</span>
                </div>
              </div>
            </div>
          </div>

          <div class="row background-green">
            <div class="col-lg-12">
              <h3 class="head-text">Ингридиенты</h3>

              <p class="title-form" style="font-size: 1em;">Основные составляющие тех. карты</p>
              <div class="table-responsive">
                <table class="table table-ing">
                  <thead>
                    <tr class="tr-ing">
                      <th class="th-ing align-content-start">
                        <p class="main-text">Ингридиент</p>
                      </th>
                      <th class="th-ing align-content-start">
                        <p class="main-text">Метод приготовления</p>
                      </th>
                      <th class="th-ing align-content-start">
                        <p class="main-text">Брутто</p>
                      </th>
                      <th class="th-ing align-content-start"></th>
                      <th class="th-ing align-middle">
                        <p class="main-text">Нетто</p>
                      </th>
                      <th class="th-ing align-content-start">
                        <p class="main-text">Цена</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="tr-td-custom" :key="ing._id" v-for="ing in map.ingridients">
                      <td class="td-custom align-middle">
                        <div class="form-group">
                          <multiselect
                            class="my-multiselect"
                            placeholder="Выберите"
                            select-label="Нажмите Enter"
                            deselectLabel="Enter для удаления"
                            v-model="ing.ingridient"
                            :multiple="false"
                            :close-on-select="true"
                            label="title"
                            track-by="_id"
                            :options="ingridientsList"
                            :option-height="104"
                          ></multiselect>
                        </div>
                      </td>
                      <td class="td-custom align-middle">
                        <div v-if="ing.unit == 'кг'" class="form-group">
                          <multiselect
                            class="my-multiselect"
                            placeholder="Выберите"
                            select-label="Нажмите Enter"
                            deselectLabel="Enter для удаления"
                            v-model="ing.method_cooking"
                            :multiple="true"
                            :close-on-select="false"
                            label="title"
                            track-by="_id"
                            :options="listMethodsCooking"
                          ></multiselect>
                        </div>
                      </td>
                      <td class="td-custom align-middle">
                        <div class="form-group">
                          <div class="row no-gutters">
                            <div class="col-lg-11">
                              <input
                                type="text"
                                ref="search"
                                class="form-control input-param"
                                v-model="ing.brutto.$numberDecimal"
                                placeholder="Введите"
                                @change="bindChangeBrutto(ing)"
                              >
                            </div>
                            <div class="col-lg-1">
                              <p class="main-text ml-1 mt-2">{{ing.unit}}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="td-custom">
                        <i
                          @click="changeBind(ing)"
                          v-if="ing.bind"
                          class="fas fa-paperclip clipse-active"
                        ></i>
                        <i
                          @click="changeBind(ing)"
                          v-else
                          class="fas fa-paperclip clipse-disactive"
                        ></i>
                      </td>
                      <td class="td-custom align-middle">
                        <div class="form-group">
                          <div class="row no-gutters">
                            <div class="col-lg-11">
                              <input
                                type="text"
                                ref="search"
                                class="form-control input-param"
                                v-model="ing.netto.$numberDecimal"
                                placeholder="Введите"
                                @change="bindChangeNetto(ing)"
                              >
                            </div>
                            <div class="col-lg-1">
                              <p class="main-text ml-1 mt-2">g.</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="td-custom align-middle">
                        <div class="form-group">
                          <p class="main-text ml-1 mt-2">
                            {{ing.price}}
                            <i style="font-size: 0.9em;" class="fas fa-ruble-sign"></i>
                          </p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="main-text">
                        <p class="link-green link-hover" @click="addRow">+ Добавить ингридиент</p>
                      </td>
                      <td></td>
                      <td></td>
                      <td>Выход:</td>
                      <td>{{map.sum_mass}} г.</td>
                      <td>
                        {{map.price}}
                        <i style="font-size: 0.9em;" class="fas fa-ruble-sign"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div class="row background-green mt-3">
            <div class="col-lg-12">
              <h3 class="head-text">Модификаторы</h3>

              <p
                class="title-form"
                style="font-size: 1em;"
              >Выбор среди разновидностей или возможность добавить дополнительные ингредиенты</p>
              <div v-for="mod in map.modificators" class="table-responsive" :key="mod._id">
                <span class="head-text" style="font-weight: bold; font-size: 1.2em;">{{mod.title}}</span>
                <span v-if="mod.type == 'one'" class="main-text">(Выбор одного вида из нескольких)</span>
                <span v-if="mod.type == 'some'" class="main-text">(Несколько из набора)</span>
                <table class="table table-ing">
                  <thead>
                    <tr class="tr-ing">
                      <th class="th-ing align-content-start">
                        <p class="main-text">Ингридиент</p>
                      </th>
                      <th class="th-ing align-content-start">
                        <p class="main-text">Метод приготовления</p>
                      </th>
                      <th class="th-ing align-content-start">
                        <p class="main-text">Брутто</p>
                      </th>
                      <th class="th-ing align-content-start"></th>
                      <th class="th-ing align-middle">
                        <p class="main-text">Нетто</p>
                      </th>
                      <th class="th-ing align-content-start">
                        <p class="main-text">Цена</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="tr-td-custom" v-for="ing in mod.ingridients" :key="ing._id">
                      <td class="td-custom align-middle">
                        <div class="form-group">
                          <multiselect
                            class="my-multiselect"
                            placeholder="Выберите"
                            select-label="Нажмите Enter"
                            deselectLabel="Enter для удаления"
                            v-model="ing.ingridient"
                            :multiple="false"
                            :close-on-select="true"
                            label="title"
                            track-by="_id"
                            :options="ingridientsList"
                            :option-height="104"
                          ></multiselect>
                        </div>
                      </td>
                      <td class="td-custom align-middle">
                        <div v-if="ing.unit == 'кг'" class="form-group">
                          <multiselect
                            class="my-multiselect"
                            placeholder="Выберите"
                            select-label="Нажмите Enter"
                            deselectLabel="Enter для удаления"
                            v-model="ing.method_cooking"
                            :multiple="true"
                            :close-on-select="false"
                            label="title"
                            track-by="_id"
                            :options="listMethodsCooking"
                          ></multiselect>
                        </div>
                      </td>
                      <td class="td-custom align-middle">
                        <div class="form-group">
                          <div class="row no-gutters">
                            <div class="col-lg-11">
                              <input
                                type="text"
                                ref="search"
                                class="form-control input-param"
                                v-model="ing.brutto.$numberDecimal"
                                placeholder="Введите"
                                @change="bindChangeBrutto(ing)"
                              >
                            </div>
                            <div class="col-lg-1">
                              <p class="main-text ml-1 mt-2">{{ing.unit}}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="td-custom">
                        <i
                          @click="changeBind(ing)"
                          v-if="ing.bind"
                          class="fas fa-paperclip clipse-active"
                        ></i>
                        <i
                          @click="changeBind(ing)"
                          v-else
                          class="fas fa-paperclip clipse-disactive"
                        ></i>
                      </td>
                      <td class="td-custom align-middle">
                        <div class="form-group">
                          <div class="row no-gutters">
                            <div class="col-lg-11">
                              <input
                                type="text"
                                ref="search"
                                class="form-control input-param"
                                v-model="ing.netto.$numberDecimal"
                                placeholder="Введите"
                                @change="bindChangeNetto(ing)"
                              >
                            </div>
                            <div class="col-lg-1">
                              <p class="main-text ml-1 mt-2">g.</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="td-custom align-middle">
                        <div class="form-group">
                          <p class="main-text ml-1 mt-2">
                            {{ing.price}}
                            <i style="font-size: 0.9em;" class="fas fa-ruble-sign"></i>
                          </p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="main-text">
                        <p
                          class="link-green link-hover"
                          @click="addRowToMod(mod._id)"
                        >+ Добавить ингридиент</p>
                      </td>
                      <td></td>
                      <td></td>
                      <td>Выход:</td>
                      <td>{{map.sum_mass}} г.</td>
                      <td>
                        {{map.price}}
                        <i style="font-size: 0.9em;" class="fas fa-ruble-sign"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <hr class="hr-page mt-2 mb-4">
              <div class="main-text">
                <p
                  class="link-green link-hover"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >+ Добавить модификатор</p>
              </div>
            </div>
          </div>

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-lg" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title head-text" id="exampleModalLabel">Новый набор модификаторов</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <multiselect
                      class="my-multiselect"
                      v-model="nowModif"
                      placeholder="Выберите"
                      select-label="Нажмите Enter"
                      deselectLabel="Enter для удаления"
                      :multiple="false"
                      :close-on-select="true"
                      label="title"
                      track-by="_id"
                      :options="listModificators"
                    ></multiselect>
                  </div>

                  <div v-if="nowModif._id == 0">
                    <div class="form-group">
                      <input
                        type="text"
                        ref="search"
                        class="form-control input-param"
                        v-model="nowNewModif.title"
                        placeholder="Название набора"
                      >
                    </div>

                    <hr class="hr-page mt-2 mb-4">

                    <p class="main-text">Сколько модификаторов можно выбрать одновременно:</p>
                    <p-radio
                      style="font-size: 20px;"
                      v-model="nowNewModif.type"
                      value="one"
                      class="p-icon p-smooth m-2"
                      color="success"
                    >
                      <i slot="extra" class="icon fa fa-check"></i>
                      <p class="main-text" style="font-size: 0.9em; font-weight: bold;">Только один</p>
                    </p-radio>
                    <div class="row">
                      <div class="col-lg-6">
                        <p
                          class="main-text ml-5"
                          style="font-size: 0.9em;"
                        >Выбор одного варианта из нескольких.</p>
                        <p class="main-text ml-5" style="font-size: 0.9em;">Например, диаметр пиццы.</p>
                      </div>
                      <div class="col-lg-6">
                        <img
                          width="80%"
                          height="auto"
                          src="/static/image/modification-group-type-1.png"
                        >
                      </div>
                    </div>

                    <hr class="hr-page mt-2 mb-2">
                    <p-radio
                      style="font-size: 20px;"
                      v-model="nowNewModif.type"
                      value="some"
                      class="p-icon p-smooth m-2"
                      color="success"
                    >
                      <i slot="extra" class="icon fa fa-check"></i>
                      <p class="main-text" style="font-size: 0.9em; font-weight: bold;">Несколько</p>
                    </p-radio>
                    <div class="row">
                      <div class="col-lg-6">
                        <p
                          class="main-text ml-5"
                          style="font-size: 0.9em;"
                        >Любое количество в заданном диапазоне.</p>
                        <p
                          class="main-text ml-5"
                          style="font-size: 0.9em;"
                        >Например, добавки к пицце</p>
                      </div>
                      <div class="col-lg-6">
                        <img
                          width="80%"
                          height="auto"
                          src="/static/image/modification-group-type-2.png"
                        >
                      </div>
                    </div>
                    <div class="row ml-5">
                      <transition name="fade">
                        <b-card v-if="nowNewModif.type == 'some'">
                          <div class="row mb-2">
                            <div class="col-lg-6">
                              <p-check
                                style="font-size: 24px;"
                                v-model="nowNewModif.setMin"
                                class="p-icon p-smooth mt-0 mb-2"
                                color="success"
                              >
                                <i slot="extra" class="icon fa fa-check"></i>
                                <div style="font-size: 18px;" class="main-text">Установить минимум</div>
                              </p-check>
                            </div>

                            <div class="col-lg-4">
                              <transition name="fade">
                                <input
                                  v-if="nowNewModif.setMin"
                                  type="text"
                                  ref="search"
                                  class="form-control input-param"
                                  v-model="nowNewModif.min"
                                  placeholder="Минимум"
                                >
                              </transition>
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-lg-6">
                              <p-check
                                style="font-size: 24px;"
                                v-model="nowNewModif.setMax"
                                class="p-icon p-smooth mt-0 mb-2"
                                color="success"
                              >
                                <i slot="extra" class="icon fa fa-check"></i>
                                <div style="font-size: 18px;" class="main-text">Установить максимум</div>
                              </p-check>
                            </div>

                            <div class="col-lg-4">
                              <transition name="fade">
                                <input
                                  v-if="nowNewModif.setMax"
                                  type="text"
                                  ref="search"
                                  class="form-control input-param"
                                  v-model="nowNewModif.max"
                                  placeholder="Максимум"
                                >
                              </transition>
                            </div>
                          </div>
                        </b-card>
                      </transition>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="resetNowNewModif"
                    data-dismiss="modal"
                  >Отмена</button>
                  <button
                    type="button"
                    class="btn btn-success"
                    @click="addNewModificators"
                    data-dismiss="modal"
                  >Добавить</button>
                </div>
              </div>
            </div>
          </div>

          <hr class="hr-page">
          <button type="button" @click="sendMap" class="btn btn-success btn-lg btn-save">
            <div v-if="!stateSaving" style="color: white;" class="main-text">Добавить полуфабрикат</div>
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
  name: "EditTechMaps",
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
      idMod: -1,

      key: null,

      ingridientsList: [],
      categories: [],
      shops: [],
      listModificators: [
        {
          title: "Создать новый набор",
          _id: 0
        }
      ],
      setIngridient: [],

      listMethodsCooking: [
        {
          title: "Очистка",
          _id: 1
        },
        {
          title: "Варка",
          _id: 2
        },
        {
          title: "Жарка",
          _id: 3
        },
        {
          title: "Тушение",
          _id: 4
        },
        {
          title: "Запекание",
          _id: 5
        }
      ],

      nowModif: {
        title: "Создать новый набор",
        _id: 0
      },
      nowNewModif: {
        title: null,
        _id: null,
        type: "one",
        min: null,
        max: null,
        setMax: false,
        setMin: false,
        ingridients: []
      },

      avatar: null,
      map: {
        title: "",
        category: null,
        shop: null,
        color: null,
        min: null,
        bar_code: null,
        sec: null,
        weight: false,
        no_dicsount: false,
        process_cooking: "",
        sum_mass: 0,
        price: 0,
        ingridients: [],
        modificators: []
      },
      editId: null
    };
  },
  mounted() {
    this.setEditId(this.$route.params.id);
    this.fetchIngridients();
    this.fetchCategories();
    this.fetchShops();
    this.fetchModificators();
    this.setTechMapsInfo();
  },
  methods: {
    setEditId(id) {
      this.editId = id;
    },
    async setTechMapsInfo() {
      ProductsService.getMap(this.editId)
        .then(res => {
          console.log(res.data);
          this.map = res.data;
          this.map.ingridients.forEach(ing => {
            ing.unit = ing.ingridient.unit;
          });
          this.map.modificators.forEach(mod => {
            mod.ingridients.forEach(ing => {
              ing.unit = ing.ingridient.unit;
            });
          });
        })
        .error(err => {
          alert("Ошибка загрузки данных.");
          console.error(err);
        });
    },
    async fetchModificators() {
      ProductsService.fetchModificators()
        .then(res => {
          listModificators = res.data;
        })
        .catch(err => {
          console.error(err);
        });
    },
    async sendMap() {
      let vm = this;
      this.stateSaving = true;
      this.map.category = this.map.category._id;
      this.map.shop = this.map.shop._id;

      this.map.modificators.forEach(mod => {
        delete mod._id;
        mod.ingridients.forEach(ing => {
          ing._id = ing.ingridient._id;
        });
      });
      console.log(this.map);

      const formData = new FormData();
      formData.append("map", JSON.stringify(this.map));
      console.log(formData.getAll("map"));
      formData.append("avatar", vm.$data.avatar);
      ProductsService.addMap(formData)
        .then(response => {
          alert("Успешно");
          this.$router.push("/menu/maps");
        })
        .catch(error => {
          console.error(error);
          alert("Ошибка отправки");
          this.$router.push("/menu/maps");
        });
    },
    async fetchIngridients() {
      const response = await ProductsService.fetchIngridients();
      console.log(response.data);
      this.ingridientsList = response.data;
    },
    async fetchCategories() {
      const response = await ProductsService.fetchCategories();
      console.log(response.data);
      this.categories = response.data;
    },
    async fetchShops() {
      const response = await ProductsService.fetchShops();
      console.log(response.data);
      this.shops = response.data;
    },
    resetNowNewModif() {
      this.nowNewModif = {
        title: null,
        _id: null,
        type: "one",
        min: null,
        max: null,
        setMax: false,
        setMin: false,
        ingridients: []
      };
    },
    addRow() {
      this.map.ingridients.push({
        method_cooking: null,
        brutto: 0,
        netto: 0,
        price: 0,
        bind: false,
        unit: null
      });
    },
    addRowToMod(id) {
      console.log(id);
      this.map.modificators[id].ingridients.push({
        method_cooking: null,
        brutto: 0,
        netto: 0,
        price: 0,
        bind: false,
        unit: null
      });
    },
    addNewModificators() {
      this.idMod++;
      this.nowNewModif._id = this.idMod;

      if (this.nowModif != null) {
        if (this.nowModif._id == 0) {
          this.map.modificators.push(this.nowNewModif);
        } else {
          this.map.modificators.push(this.nowModif);
        }
      }

      this.resetNowNewModif();
    },
    changeBind(ing) {
      ing.bind = !ing.bind;
      if (ing.bind) {
        ing.brutto.$numberDecimal = ing.netto.$numberDecimal;
      }
    },
    bindChangeNetto(ing) {
      if (ing.bind) ing.brutto.$numberDecimal = ing.netto.$numberDecimal;
    },
    bindChangeBrutto(ing) {
      if (ing.bind) ing.netto.$numberDecimal = ing.brutto.$numberDecimal;
    },
    selectFile() {
      $("#upload:hidden").trigger("click");
    },
    resetFile() {
      this.avatar = null;
    }
  }
};
</script>

