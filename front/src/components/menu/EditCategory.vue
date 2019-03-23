<template>
	<div id="edit_category">
		<div class="row no-gutters" id="body-row">
			<div class="col-2 col-sm-1">
				<sidebar></sidebar>
			</div>

			<div class="col-10 col-sm-11">
				<div class="container-fluid mt-2 mb-5">

					<div class="row">
						<div class="col-md-5 col-lg-5 mt-3 d-flex flex-row">
							<router-link to="/menu/category_prod_cards">
								<img class="back-arrow mt-2 mr-4" src="/static/image/arrow_back.png" alt="Back">
							</router-link>
							<h1 class="head-text">Редактировать категорию</h1>
						</div>
					</div>

					<hr class="line mt-4">

					<div class="row">
						<div class="col-lg-2">
							<p class="title-form mt-2">Название</p>
						</div>
						<div class="col-lg-4">
							<div class="form-group">
								<input type="text" ref="search" class="form-control input-param" v-model="category.title" placeholder="Введите">
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-lg-2">
							<p class="title-form mt-2">Родительская категория</p>
						</div>
						<div class="col-lg-4">
							<div class="form-group">
								<multiselect class="my-multiselect" placeholder="Выберите" select-label="Нажмите Enter" deselectLabel="Enter для удаления" v-model="parent" :multiple="false" :close-on-select="true" label="title" track-by="title" :options="categories"></multiselect>
							</div>
						</div>
					</div>

					<hr class="hr-page">

					<div class="row">
						<div class="col-lg-2">
							<p class="title-form mt-2">Фотография</p>
						</div>
						<b-form-file accept="image/*" v-model="file" id="upload" class="mt-3" plain></b-form-file>
						<div class="col-lg-4 align-self-center">
							<b-link @click="selectFile" class="main-text">
								<div class="link-green link-hover">
									<u id="upload_link">Загрузить</u>
								</div>
							</b-link>
							<div v-if="!file" class="mt-3">
								<div v-if="category.avatar != null">
									<img v-b-modal.modal1 style="height: 50px; width: auto; cursor: pointer;" :src="photo_src" alt="" :href="photo_src" class="img-thumbnail">
									<i @click="resetFile" style="cursor: pointer;" class="fas fa-times"></i>
								</div>

								<b-modal id="modal1" size="lg" :title="category.avatar" style="text-align: center;">
									<img :src="photo_src" alt=""  style="width: 600px; height: auto;">
								</b-modal>
							</div>
							<div v-else>
								{{file.name}}
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
										<p-radio style="font-size: 20px;" v-model="category.color" value="blue" class="p-icon p-smooth m-0" color="success" >
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
										<p-radio style="font-size: 20px;" v-model="category.color" value="red" class="p-icon p-smooth m-0" color="success" >
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
										<p-radio style="font-size: 20px;" v-model="category.color" value="yellow" class="p-icon p-smooth m-0" color="success" >
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
										<p-radio style="font-size: 20px;" v-model="category.color" value="pink" class="p-icon p-smooth m-0" color="success" >
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
										<p-radio style="font-size: 20px;" v-model="category.color" value="green" class="p-icon p-smooth m-0" color="success" >
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
										<p-radio style="font-size: 20px;" v-model="category.color" value="grey" class="p-icon p-smooth m-0" color="success" >
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
										<p-radio style="font-size: 20px;" v-model="category.color" value="black" class="p-icon p-smooth m-0" color="success" >
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
						<div v-if="!stateSaving" style="color: white;" class="main-text">Сохранить категорию</div>
						<div v-if="stateSaving" style="color: white;" class="main-text">Сохранение...</div>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';

import ProductsService from '@/services/menu/ProductsService';
import Sidebar from '@/components/Sidebar';


export default {
  name: 'edit_category',
  components: {
    sidebar: Sidebar,
  },
  data() {
    return {
      stateSaving: false,
      mod: 'without_mod',
      with_mod: false,
      without_mod: true,
      countMod: 1,

      editId: null,

      avatar: null,
      photo_src: null,
      file: null,

      key: null,

      parent: {
        _id: null,
        title: null,
      },

      categories: [],

      category: {
        title: '',
        parent_id: null,
        color: '',

      },
    };
	},
	watch: {
		parent (newVal) {
			console.log(newVal)
		}
	},
  mounted() {
    this.getCategories();
    this.setEditId(this.$route.params.id);
  },
  methods: {
    setEditId(id) {
      this.editId = id;
    },
    resetFile() {
      this.file = null;
    },
    selectFile() {
      $('#upload:hidden').trigger('click');
		},
		
    async sendProducts() {
      //console.log(this.category);

			this.category.parent = this.parent._id;

			console.log('category', this.category)

      const formData = new FormData();
      formData.append('category', JSON.stringify(this.category));
      if (this.file != null) {
        formData.append('avatar', this.file);
      }

      ProductsService.editCategory(formData);

      this.$router.push('/menu/category_prod_cards');
		},
		
    async getCategories() {
      const res = await ProductsService.fetchCategories()
			const id = location.pathname.replace('/menu/category_prod_cards/edit/', '')
			
			this.categories = res.data
			this.category = res.data.filter(item => {return item._id == id});
			
			[this.category] = this.category

			console.log('categories', this.categories)
			console.log('category', this.category)

			this.parent._id =  this.category.parent._id
			this.parent.title =  this.category.parent.title

			console.log('parent', this.parent)

      if (this.category.photo != null) {
        this.category.avatar = this.category.photo;
        this.photo_src = `${this.category.avatar}`;
        console.log(this.photo_src);
      }

      //this.categories = res.data.map(item => ({ id: item.id, title: item.title }));
    },
    resetFile() {
      this.category.avatar = null;
      this.photo_src = null;
      this.file = null;
    },
  },
  computed: {

  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
#upload {
	display: none;
}
</style>
