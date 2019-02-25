<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import ProductsService from '@/services/menu/ProductsService';

export default {
	name: 'start',
	data () {
		return {

		}
	},
	methods: {
		logout () {
			localStorage.removeItem('token');
		},
		checkToken () {
			ProductsService.verifyToken()
			.then(res => {
				if(!res.data) return this.logout()
				if(!res.data.success) return this.logout()
			})
			.catch(err => this.logout())
		}
	},
	mounted() {
		this.checkToken()
	}
}
</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="less">
@font-face {
  font-family: "Myriad Pro Regular";
  src: url("./assets/fonts/MyriadPro-Regular.eot");
  src: url("./assets/fonts/MyriadPro-Regular.eot?#iefix")
      format("embedded-opentype"),
    url("./assets/fonts/MyriadPro-Regular.woff") format("woff"),
    url("./assets/fonts/MyriadPro-Regular.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
body::-webkit-scrollbar {
	width: 1em;
}

body::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}

body::-webkit-scrollbar-thumb {
	background-color: darkgrey;
	outline: 1px solid slategrey;
}

.background-green{
	background-color: #EEFFFA;
	margin-right: 50px;
}

h1.head-text {
	font-family: 'Myriad Pro Regular';
	font-size: 36px;
}

.back-arrow {
	width: 31px;
	height: 22px;
}

li.action-item{
	list-style-type: none;
}

li.action-item:hover{
	background-color: #E0E0E0;
}

ul.actions-popover {
	margin-left: 0; /* Отступ слева в браузере IE и Opera */
	padding-left: 0; /* Отступ слева в браузере Firefox, Safari, Chrome */
}

button.btn-icon {
	background-color: transparent;
	border: none;
	cursor: pointer;
}

.back-arrow:hover {
	border-radius: 4px;
	border-width: 1px;
	border-color: rgb(236, 235, 235);
	border-style: solid;
}

.clipse-active {
	background-color: rgb(230, 230, 230);
	padding: 10px;
	border-radius: 10px;
	font-size: 1.7em;
	cursor: pointer;
}

.clipse-active:hover{
	background-color: rgb(235, 235, 235);
}

.clipse-disactive {
	background-color: rgb(180, 180, 180);
	padding: 10px;
	border-radius: 10px;
	font-size: 1.7em;
	cursor: pointer;
}

.clipse-disactive:hover{
	background-color: rgb(175, 175, 175);
}


hr.line {
	background-color: rgb(232, 232, 232);
	height: 1px;
}

.sign-mute-text{
	font-size: 45.333px;
	font-family: "OpenSans";
	color: rgb(195, 195, 195);
}
.main-text {
	font-family: 'Open Sans', sans-serif;
	size: 18px;
	color: black;
	text-decoration: none;
	margin: 0px;
	.link-green {
		cursor: pointer;
		color: rgb(54, 187, 76);
	}
	.link-blue {
		color: #2a6496;
	}
	.link-red {
		color: #bb3c3c;
	}
	.link-hover:hover {
		text-decoration: underline;
		color: #99cc00;
	}
}
h1.head-text {
	font-family: 'Myriad Pro Regular';
	font-size: 36px;
	color: rgb(0, 0, 0);
}
.title-form {
	font-family: 'Open Sans', sans-serif;
	font-size: 20px;
	color: black;
	text-decoration: none;
}
.btn-save{
	border-width: 1px;
	border-color: rgb(236, 235, 235);
	border-style: solid;
	border-radius: 7px;
	background-color: rgb(54, 187, 76);
	box-shadow: 0.837px 11.971px 29px 0px rgba(25, 21, 21, 0.13);
	width: 327px;
	height: 57px;
}

.btn-add {
	border-width: 1px;
	border-color: rgb(236, 235, 235);
	border-style: solid;
	border-radius: 7px;
	background-color: rgb(54, 187, 76);
	box-shadow: 0.837px 11.971px 29px 0px rgba(25, 21, 21, 0.13);
	width: 327px;
	height: 40px;
}

.hr-card-body {
	background-color: rgb(255, 255, 255);
	height: 6px;
}

.hr-page {
	height: 1px;
	background-color: rgb(232, 232, 232);
}

.card-custom{
	.card {
		border-radius: 11px;
		border: none;
		.card-body{
			border-radius: 11px;
			background-color: rgb(231, 230, 230);
		}
	}
}

.elipse {
	border-radius: 50%;
	width: 40px;
	height: 40px;
}

.check-custom {
	box-shadow: 0px 10px 15px 0px rgba(232, 231, 231, 0.004);
}


.blue {
	background-color: rgb(100, 140, 223);
}

.red {
	background-color: rgb(225, 9, 9);
}

.yellow {
	background-color: rgb(255, 234, 0);
}

.pink {
	background-color: rgb(255, 0, 234);
}

.green {
	background-color: rgb(44, 174, 50);
}

.grey {
	background-color: rgb(192, 192, 192);
}

.black {
	background-color: rgb(0, 0, 0);
}

.rectangle {
	width: 50px;
	height: 40px;
}

.table-ing {

}

.tr-ing {
	.th-ing {
		border: 0px;
		background-color: rgb(249, 249, 249);
	}
	border: 0px;
}

.form-group {
	.checkbox-custom{
		border-style: solid;
		border-width: 22px;
		border-color: rgb(237, 237, 237);
		border-radius: 4px;
		background-color: rgb(255, 255, 255);
		box-shadow: 0px 10px 15px 0px rgba(232, 231, 231, 0.004);
		width: 20px;
		height: 20px;
	}
	.my-multiselect {
		box-shadow: 0.837px 11.971px 29px 0px rgba(25, 21, 21, 0.13);
		background-color: rgb(255, 255, 255);
		border-width: 1px;
		border-color: rgb(236, 235, 235);
		border-style: solid;
		border-radius: 7px;
		height: 40px;

		.multiselect__tags {
			height: 40px;
			.multiselect__placeholder{
				font-size: 1rem;
				line-height: 1.5;
				color: #495057;
			}
		}
		.multiselect__content-wrapper {
			.multiselect__content{
				.multiselect__element{
					.multiselect__option--highlight{
						background-color: #586272;
					}
					.multiselect__option--highlight::after{
						background-color: #586272;
					}

				}
			}
		}
	}
	.input-param {
		box-shadow: 0.837px 11.971px 29px 0px rgba(25, 21, 21, 0.13);
		background-color: rgb(255, 255, 255);
		border-width: 1px;
		border-color: rgb(236, 235, 235);
		border-style: solid;
		border-radius: 7px;
		height: 50px;
	}
	.form-control:focus {
		border-color: #637084;
		outline: 0;
		-webkit-box-shadow: 5px 17px 36px 4px rgba(25, 21, 21, 0.13);
		box-shadow: 5px 17px 36px 4px rgba(25, 21, 21, 0.13);
	}
}

i.arrow-more {
	font-size: 18px;
	cursor: pointer;
	background-color: transparent;
}

i.arrow-more:hover {
	font-size: 22px;
}

.btn:focus {
	border-color: #637084;
	outline: 0;
	-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(143, 153, 170,.6);
	box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(143, 153, 170,.6);
}

.btn-group .btn:focus {
	border-color: #637084;
	outline: 0;
	-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(143, 153, 170,.6);
	box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(143, 153, 170,.6);
}

.form-group .form-control:focus{
	border-color: #637084;
	outline: 0;
	-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(143, 153, 170,.6);
	box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(143, 153, 170,.6);
}

.form-group .search {
	box-shadow: 0.837px 11.971px 29px 0px rgba(25, 21, 21, 0.13);
	background-color: rgb(255, 255, 255);
	border-width: 1px;
	border-color: rgb(236, 235, 235);
	border-style: solid;
	border-radius: 7px;
	height: 57px;
}

.dropdown-menu .search-cat {
	border: none;
	border-bottom: 1px solid #ccc;
}

.group .search-cat:focus {
	border-color: #637084;
	outline: 0;
	box-shadow: none;
}

.fa-input { font-family: FontAwesome, 'Helvetica Neue', Helvetica, Arial, sans-serif; }

/* enable absolute positioning */
.inner-addon {
	position: relative;
}

/* style glyph */
.inner-addon .fas {
	position: absolute;
	padding: 15px;
}

/* align glyph */
.left-addon .fas  { left:  0px;}
.right-addon .fas { right: 0px;}

/* add padding  */
.left-addon input  { padding-left:  30px; }
.right-addon input { padding-right: 30px; }

.btn-shadow {
	border: 0px;
	box-shadow: 0px 15px 25px 0px rgba(0, 0, 0, 0.15);
}

.btn-shadow .btn-transparent {
	background-color: transparent;
	outline: none;
	border: none;
}

button.btn-filter:focus {
	border-color: #637084;
	outline: 0;
	box-shadow: none;
}

.right-addon .btn-container {
	background-color: transparent;
	font-size: 22px;
	color: gray;
	outline: none;
	border: none;
}

.btn-custom {
	background-color: white;
}

.btn-group .btn-custom-border {
	background-color: white;
	border-radius: 16px 16px 16px 16px;
	border: 1px solid #dfdfdf;
}

.btn-group-custom {
	border-radius: 16px 16px 16px 16px;
	height: 53px;
	border: 1px solid #dfdfdf;
}

.btn:focus {
	outline: none;
}

#img-button-export {
	margin-left: 15px;
	margin-right: 5px;
	text-align: center;
}

.img-toggle {
	margin: 5px;
}

.btn-filter {
	background-color: transparent;
	height: 53px;
}

.btn-group .filter-button:focus {
	border: 1px solid #dfdfdf;
	outline: 0;
	-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(143, 153, 170,.6);
	box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(143, 153, 170,.6);
}

hr.line {
	background-color: rgb(232, 232, 232);
	height: 1px;
}

.container-fluid .table-custom{
	background: white; /* Цвет фона таблицы */
	border: 10px solid #F2F3F4;
}


.tr-th-custom {
	border: 10px solid #F2F3F4;
	text-align: center;
}

.tr-th-custom-left {
	border: 10px solid #F2F3F4;
	text-align: left;
}

.tr-th-custom .td-th-custom:hover {
	background-color: #dfdfdf;
}

.tr-th-custom .td-th-custom {
	border: 5px solid #F2F3F4;
	font-family: 'Open Sans', sans-serif;
}

.tr-td-custom {
	background: #FFFFFF; /* Цвет фона */
	border: 5px solid #F2F3F4; /* Граница вокруг ячеек */
	font-family: 'Open Sans', sans-serif; /* Выбор гарнитуры */
	font-size: 15px; /* Размер текста */
	text-align: center;
}

.tr-td-custom .td-custom-left {
	background: #FFFFFF; /* Цвет фона */
	border: 5px solid #F2F3F4; /* Граница вокруг ячеек */
	font-family: 'Open Sans', sans-serif; /* Выбор гарнитуры */
	font-size: 15px; /* Размер текста */
	text-align: left;
}

</style>
