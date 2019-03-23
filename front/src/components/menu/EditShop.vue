<template>
	<div id="add_products">
		<div class="row no-gutters" id="body-row">
			<div class="col-2 col-sm-1">
				<sidebar></sidebar>
			</div>

			<div class="col-10 col-sm-11">
				<div class="container-fluid mt-2 mb-5">

					<div class="row">
						<div class="col-md-5 col-lg-5 mt-3 d-flex flex-row">
							<router-link to="/menu/shops">
								<img class="back-arrow mt-2 mr-4" src="/static/image/arrow_back.png" alt="Back">
							</router-link>
							<h1 class="head-text">Новый цех</h1>
						</div>
					</div>

					<hr class="line mt-4">

					<div class="row">
						<div class="col-lg-2">
							<p class="title-form mt-2">Название</p>
						</div>
						<div class="col-lg-4">
							<div class="form-group">
								<input type="text" ref="search" class="form-control input-param" v-model="shop.title" placeholder="Например, 'Кухня'">
							</div>
						</div>
					</div>

					<div class="row">
						<div class="col-lg-2">
							<!-- <p class="title-form mt-2">Печатать бегунки</p> -->
						</div>
						<div class="col-lg-10">
							<div class="row ml-1">
								<p-check v-model="shop.print_runners" style="font-size: 24px;" class="p-icon p-smooth mt-0 mb-2" color="success" >
									<i slot="extra" class="icon fa fa-check"></i>
									<div style="font-size: 18px;" class="main-text">Печатать бегунки</div>
								</p-check>
							</div>
						</div>
					</div>
					<hr class="hr-page">
					<button type="button" @click="sendShop" class="btn btn-success btn-lg btn-save">
						<div v-if="!stateSaving" style="color: white;" class="main-text">Сохранить цех</div>
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
  name: 'edit_shop',
  components: {
    sidebar: Sidebar,
  },
  data() {
    return {
      editId: null,
      stateSaving: false,

      shop: {
        title: '',
        print_runners: false,
      },
    };
  },
  mounted() {
    this.setEditId(this.$route.params.id);
    this.getShop();
  },
  methods: {
    async sendShop() {
      this.stateSaving = true;
      ProductsService.updateShop(this.editId, this.shop)
      .then(response => {
        this.$router.push('/menu/shops');
      })
      .catch(err => {
        console.log(err);
      })
      //
    },
    setEditId(id) {
      this.editId = id;
    },
    async getShop() {
			const vm = this
			const response = await ProductsService.fetchShops().catch(err => console.log(err))
			console.log(response.data)
      let [item] = response.data.filter(item => {
				return item._id === vm.$data.editId
			})
			console.log('item', item)
			vm.$data.shop.title = item.title
			vm.$data.shop.print_runners = item.print_runners
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
