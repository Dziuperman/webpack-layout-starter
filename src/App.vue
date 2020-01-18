<template>
	<section>
		<div class="container">
			<p>{{ message }}</p>
		</div>
	</section>
</template>

<script>
	import Example from './components/Example.vue';

	export default {
		data() {
			return {
				message: "Example Vue component"
			};
		},
		components: {
			exampleComponent: Example,
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		text-align: center;
	}

	img {
		max-width: 200px;
	}
</style>