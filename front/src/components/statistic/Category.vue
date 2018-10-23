<template>
	<div id="category">
		<div class="row" id="body-row">
			<sidebar></sidebar>
			
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';

	import Sidebar from '@/components/Sidebar'

	export default {
		name: 'category',
		components: {
			'sidebar': Sidebar,
		},
		data() {
			return {

			}
		}
	}
</script>