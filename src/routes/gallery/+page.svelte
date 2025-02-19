<script>
	import { onMount } from 'svelte';

	let mediaFiles = [];

	// Fetch media file list on mount
	onMount(() => {
		fetch('/raptor-faight-1/output.json')
			.then((r) => r.text())
			.then((text) => {
				mediaFiles = JSON.parse(text);
			});
	});

	// Svelte action for lazy loading images
	export function lazyLoad(node) {
		// Initially, node.src is empty and we store the real URL in data-src
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
                    console.log('LOAD')
					// Set the src attribute from data-src when image is near viewport
					node.src = node.dataset.src;
					observer.unobserve(node);
				}
			});
		});
		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
			}
		};
	}
</script>

<div>
	{#each mediaFiles as file}
		<div>
			<!-- Use the Svelte action -->
			<img data-src={`/raptor-faight-1/${file}`} alt={file} use:lazyLoad />
		</div>
	{/each}
</div>

<style>
	img {
		width: 100%;
	}
</style>
