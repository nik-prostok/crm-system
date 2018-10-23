<template>

	<div id="sidebar">
		<!-- Sidebar -->

		<div id="sidebar-container" class="sidebar-expanded d-none d-md-block"><!-- d-* hiddens the Sidebar in smaller devices. Its itens can be kept on the Navbar 'Menu' -->
			<!-- Bootstrap List Group -->


			<a v-on:click="SidebarCollapse" data-toggle="collapse" aria-expanded="false" class="bg-dark list-group-item list-group-item-action flex-column align-items-start" style="height: 80px;">
				<div class="d-flex w-100 justify-content-start align-items-center">
					<img src="/static/image/sandwich.png" style="width: 23px; height: 16;">
				</div>
			</a>

			<ul v-for="item in ul_list" class="list-group">
				<!-- Menu with submenu -->

				<a :href=getHref(item.id) data-toggle="collapse" aria-expanded="false" class="bg-dark list-group-item list-group-item-action flex-column align-items-start">
					<div class="d-flex w-100 justify-content-start align-items-center">
						<span class="mr-3"><img :src=item.icon style="width: 23px; height: 16;"></span>
						<span class="menu-collapsed">{{item.title}}</span>
						<span class="ml-3"><font-awesome-icon icon="caret-down" /></span>
					</div>
				</a>

				<!-- Submenu content -->

				<div v-for="sub in item.submenu" :id=item.id class="collapse sidebar-submenu">
					<a :href=sub.id class="list-group-item list-group-item-action bg-dark text-white">
						<span class="menu-collapsed">{{ sub.title }}</span>
					</a>
				</div>

			</ul><!-- List Group END-->
		</div><!-- sidebar-container END -->
	</div>
</template>

<script>
	export default {
		name: 'sidebar',
		data() {
			return {
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
						title: "Тех. карты",
						id: "/menu/tech_cards"
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
			SidebarCollapse () {
				$('.menu-collapsed').toggleClass('d-none')
				$('.sidebar-submenu').toggleClass('d-none')
				$('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed')
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
#body-row {
	margin-left:0;
	margin-right:0;
}
#sidebar-container {
	min-height: 100vh;   
	background-color: #333;
	padding: 0;
	height: 100%;
}

/* Sidebar sizes when expanded and expanded */
.sidebar-expanded {
	width: 230px;
}
.sidebar-collapsed {
	width: 60px;
}

/* Menu item*/
#sidebar-container .list-group a {
	height: 50px;
	color: white;
}

/* Submenu item*/
#sidebar-container .list-group .sidebar-submenu a {
	height: 45px;
	padding-left: 30px;
}
.sidebar-submenu {
	font-size: 0.9rem;
}

/* Separators */
.sidebar-separator-title {
	background-color: #333;
	height: 35px;
}
.sidebar-separator {
	background-color: #333;
	height: 25px;
}
.logo-separator {
	background-color: #333;    
	height: 60px;
}

/* Closed submenu icon */
#sidebar-container .list-group .list-group-item[aria-expanded="false"] .submenu-icon::after {
	content: " \f0d7";
	font-family: FontAwesome;
	display: inline;
	text-align: right;
	padding-left: 10px;
}
/* Opened submenu icon */
#sidebar-container .list-group .list-group-item[aria-expanded="true"] .submenu-icon::after {
	content: " \f0da";
	font-family: FontAwesome;
	display: inline;
	text-align: right;
	padding-left: 10px;
}
</style>