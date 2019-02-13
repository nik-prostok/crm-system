<template>

	<div id="sidebar">
		<!-- Sidebar -->
		

		<div id="mySidenav" class="sidenav bg-dark">
			<a v-on:click="navAction" data-toggle="collapse" aria-expanded="false" class="bg-dark list-group-item list-group-item-action flex-column align-items-start" style="height: 80px;">
				<div class="d-flex w-100 justify-content-start align-items-center">
					<img src="/static/image/sandwich.png" style="width: 23px;">
				</div>
			</a>
			<ul v-for="item in ul_list" class="list-group">

				<a :href=getHref(item.id) data-toggle="collapse" aria-expanded="false" class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
					<div class="d-flex w-100 justify-content-start align-items-center">
						<span class="mr-3" v-on:click="navAction"><img :src=item.icon style="width: 23px; height: 16;"></span>
						<span class="menu-collapsed">{{item.title}}</span>
						<span class="ml-3"><font-awesome-icon icon="caret-down"/></span>
					</div>
				</a>


				<div v-for="sub in item.submenu" :id=item.id class="collapse sidebar-submenu">
					<a :href=sub.id class="list-group-item list-group-item-action bg-dark text-white">
						<span class="menu-collapsed">{{ sub.title }}</span>
					</a>
				</div>

			</ul>
			
		</div>
	</div>
</template>

<script>

	export default {
		name: 'sidebar',
		data() {
			return {
				stateNav: false,
				ul_list: [
				{
					title: 'Статистика',
					id: 'StatisticSubmenu',
					icon: '/static/image/bars.png',
					submenu: [
					{
						title: "Продажи",
						id: "/sales",
					},
					{
						title: "Клиенты",
						id: "/sales/client"
					},
					{
						title: "Официанты",
						id: "/sales/officients"
					},
					{
						title: "Цеха",
						id: "/sales/shops"
					},
					{
						title: "Столы",
						id: "/sales/tables"
					},
					{
						title: "Категории",
						id: "/sales/category"
					},
					{
						title: "Товары",
						id: "/sales/products"
					}],
				},{
					title: 'Маркетинг',
					id: 'Marketing',
					icon: '/static/image/marketing.png',
					submenu: [
					{
						title: "Клиенты",
						id: "/clients"	
					},
					{
						title: "Группы клиентов",
						id: "/clients/groups"	
					},
					{
						title: "Программы лояльности",
						id: "/clients/loyalti"	
					},
					{
						title: "Исключения",
						id: "/clients/exceptions"
					},
					{
						title: "Акции",
						id: "/clients/stocks"
					}],
				},{
					title: 'Финансы',
					id: 'Finance',
					icon: '/static/image/finance.png',
					submenu: [
					{
						title: "Транзакции",
						id: "/finance/transactions"	
					},
					{
						title: "Отчет",
						id: "/finance/report"
					},
					{
						title: "Кассовые смены",
						id: "finance/cashier shifts"
					},
					{
						title: "Счета",
						id: "/finance/bills"
					},
					{
						title: "Категории",
						id: "/finance/category"
					}],
				},{
					title: 'Доступ',
					id: 'Access',
					icon: '/static/image/access.png',
					submenu: [
					{
						title: "Сотрудники",
						id: "/access/employees"	
					},
					{
						title: "Терминалы",
						id: "/access/terminals"
					},
					{
						title: "Заведения",
						id: "/access/restaurants"
					},
					{
						title: "Интеграции",
						id: "/access/integrations"
					}],
				},{
					title: 'Меню',
					id: 'Menu',
					icon: '/static/image/menu.png',
					submenu: [
					{
						title: "Товары",
						id: "/menu/products"	
					},
					{
						title: "Ингридиенты",
						id: "/menu/ingridients"
					},
					{
						title: "Тех. карты",
						id: "/menu/tech_maps"
					},
					{
						title: "Полуфабрикаты",
						id: "/menu/semi"
					},
					{
						title: "Категории товаров и тех. карт",
						id: "/menu/category_prod_cards"
					},
					{
						title: "Категории ингридиентов",
						id: "/menu/cat_ingridients"
					},
					{
						title: "Цеха",
						id: "/menu/shops"
					}],
				},{
					title: 'Склад',
					id: 'Storehouse',
					icon: '/static/image/storehouse.png',
					submenu: [
					{
						title: "Остатки",
						id: "/storehouse/stock_balance"	
					},
					{
						title: "Поставки",
						id: "/storehouse/supplies"
					},
					{
						title: "Перемещения",
						id: "/storehouse/displacement"
					},
					{
						title: "Списания",
						id: "/storehouse/write_offs"
					},
					{
						title: "Отчет по движению",
						id: "/storehouse/traffic_report"
					},
					{
						title: "Инвентаризация",
						id: "/storehouse/inventory"
					},
					{
						title: "Поставщики",
						id: "/storehouse/suppliers"
					},
					{
						title: "Склады",
						id: "/storehouse/storehouses"
					},
					{
						title: "Фасовки",
						id: "/storehouse/packing"
					}],
				},{
					title: 'Настройки',
					id: 'Settings',
					icon: '/static/image/settings.png',
					submenu: [
					{
						title: "Общие",
						id: "/settings/general"	
					},
					{
						title: "Оплата",
						id: "/setting/payment"
					},
					{
						title: "Столы",
						id: "/setting/tables"
					},
					{
						title: "Безопасность",
						id: "/setting/security"
					},
					{
						title: "Чек",
						id: "/setting/check"
					}],
				}]
			}
		},
		mounted () {
			this.SidebarCollapse()
		},
		methods: {
			navAction(){
				if (this.stateNav == true){
					document.getElementById("mySidenav").style.width = "60px";
					$('.menu-collapsed').toggleClass('d-none')
					$('.sidebar-submenu').toggleClass('d-none')
					//$('#mySidenav').toggleClass('sidebar-expanded sidebar-collapsed')
					this.stateNav = false;
				} else {
					document.getElementById("mySidenav").style.width = "230px";
					$('.menu-collapsed').toggleClass('d-none')
					$('.sidebar-submenu').toggleClass('d-none')
					$('#mySidenav').toggleClass('sidebar-expanded sidebar-collapsed')
					this.stateNav = true;
				}
			},
			SidebarCollapse () {
				$('.menu-collapsed').toggleClass('d-none')
				$('.sidebar-submenu').toggleClass('d-none')
				$('#mySidenav').toggleClass('sidebar-expanded sidebar-collapsed')
			},
			getHref(id){
				return ('#' + id);
			}
		},
		computed: {

		},
	}
</script>

<style>

.sidenav::-webkit-scrollbar {
	width: 1em;
}

.sidenav::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}

.sidenav::-webkit-scrollbar-thumb {
	background-color: darkgrey;
	outline: 1px solid slategrey;
}

.sidenav {
	height: 100%;
	width: 60px;
	position: fixed;
	z-index: 1;
	top: 0;
	left: 0;
	overflow-x: hidden;
	transition: 0.5s;
}

.sidenav a {
	text-decoration: none;
	font-size: 1rem;
	color: #818181;
	display: block;
	transition: 0.3s;
}

.sidenav a:hover {
	color: #f1f1f1;
}

.sidenav .closebtn {
	position: absolute;
	top: 0;
	right: 25px;
	font-size: 36px;
	margin-left: 50px;
}
</style>