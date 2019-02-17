<template type="text/x-template" id="item-template">
	<!-- :class="{bold: isFolder}" -->
	<div>
		<tr class="tr-td-custom" v-show="model.id != 60">
			<td class="td-custom align-middle ml-3" style="text-align: left; width: 100%" >
				<div class="row" :style="styleOb">
					<i @click="toggle" v-b-toggle=model.id :class="[open ? 'fas fa-angle-down arrow-more mt-1' : 'fas fa-angle-right arrow-more mt-1']" v-if="isFolder"></i>
					<div v-else style="margin-left: 11.39px"></div>
					<div v-if="model.photo != null" class="col-1">
						<img class="img-fluid" :src=model.photo alt="">
					</div>
					<div v-else class="rectangle col-1">
						<div :class=model.color class="h-100">
							<p style="color: white; text-align: center; width: 100%" class="pt-2">{{ model.title.slice(0,1) }}</p>
						</div>
					</div>

					<div class="col-6 align-self-center" style="width: 100%">{{ model.title }}</div>
				</div>
			</td>
			<td class="td-custom align-middle">
				<div class="d-flex flex-row" >
					<div class="mr-2">
						<b-link :to=getHrefEdit(model.id) class="main-text">
							<div class="link-blue link-hover">Ред.</div>
						</b-link>
					</div>
					<div class="ml-2">
						<button class="btn-icon popoverButton" :id="getPopoverId(model.id)">
							<i class="fa fa-ellipsis-h"></i>
						</button>
						<b-popover :target=getPopoverId(model.id) triggers="focus">
							<ul class="actions-popover">
								<li class="action-item"><button v-on:click="deleteCateg" style="text-decoration: none; background-color: transparent; border: 0px; cursor: pointer;" class="main-text">Удалить</button></li>
								<li class="action-item"><button style="text-decoration: none; background-color: transparent; border: 0px; cursor: pointer;" class="main-text">Скрыть</button></li>
							</ul>
						</b-popover>
					</div>
				</div>
			</td>
		</tr>
		<!-- v-show="open"  -->
		<b-collapse :id='"collapse" + model.id' v-model=open class="tr-td-custom" v-if="isFolder" style="width: 100%; border: 0px;">
			<item style="width: 100%; border: 0px;" :key="index" class="tr-td-custom" v-for="(model, index) in model.children" :model="model" :field="nextField"></item>
		</b-collapse>
  <!-- <tr class="tr-td-custom" v-show="open" v-if="isFolder" style="width: 100%">
    <item style="width: 100%" class="tr-td-custom" v-for="(model, index) in model.children" :key="index" :model="model"></item>
</tr> -->
</div>
</template>

<script type="text/javascript">
	import Vue from 'vue';
	import ProductsService from '@/services/menu/ProductsService'

	export default {
		name: 'item',
		template: '#item-template',
		props: ['model', 'field'],
		data () {
			return {
				nextField: this.field + 20,
				styleOb: {
					marginLeft: this.field + 'px',
				},
				open: false
			}
		},
		computed: {
			isFolder: function () {
				return this.model.children &&
				this.model.children.length
			}
		},
		mounted() {
			this.openStartMenu()
		},
		methods: {
			deleteCateg(){
				this.$root.$emit('deleteCat', this.model.id);
			},
			openStartMenu(){
				if (this.model.id == 60){
					this.open = true;
				}
			},
			getPopoverId(id){
				return "popover" + id;
			},
			getHrefEdit(id){
				return '/menu/category_prod_cards/edit/' + id;
			},
			/*async deleteCategory(id){
				console.log(id);
				const response = await ProductsService.deleteCategory(id);

				if (response.status == 200){
					this.category = [];
					this.getCategories();
				}
			},*/
			toggle: function () {
				if (this.isFolder) {
					this.open = !this.open
				}
			},
		}
	}
</script>
