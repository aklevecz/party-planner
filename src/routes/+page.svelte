<script>
	import ApplyContainer from '$lib/components/apply/apply-container.svelte';
	import RsvpContainer from '$lib/components/rsvp/rsvp-container.svelte';
	import app from '$lib/store/app.svelte.js';
	import applySvelte from '$lib/store/apply.svelte.js';
	let { data } = $props();

	$effect(() => {
		// Set the current view (or perform any other logic)
		app.setView(data.view);
	});
</script>

<div class="container">
	<div class="header">
		<img
			src="concert-raptors-text-logo.png"
			style="width:200px;"
			alt="concert raptors text logo"
		/>
		<svg class="animated-x" viewBox="0 0 100 100" width="50" height="50">
			<!-- First diagonal of the X -->
			<path
				class="line first"
				d="M10,10 L90,90"
				stroke="black"
				stroke-width="9"
				fill="none"
			/>
			<!-- Second diagonal of the X -->
			<path
				class="line second"
				d="M90,10 L10,90"
				stroke="black"
				stroke-width="8"
				fill="none"
			/>
		</svg>
		<img
			src="faight-assets/FaightLogoW_Aura.png"
			style="width:250px; margin: auto; display: block;"
			alt="faight logo"
		/>
	</div>
	<!-- <div class="divider"></div> -->
	<div class="image-container">
		<!-- Base image -->
		<img
			src="/raptor-faight-1/00623E41-9A2E-4195-B455-50142A8FB33F.JPG"
			alt="Team"
			class="base-image"
		/>

		<!-- Overlay image with blend mode and ripple animation -->
		<img src="/raptor-svg.svg" alt="Raptor overlay" class="raptor-overlay" />
	</div>
	<ApplyContainer />
	<!-- <RsvpContainer rsvpId={data.rsvpId}/> -->
	<!-- {#if authSvelte.state.authorized}<VoteContainer />{/if} -->
	<!-- <AuthFlow /> -->
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 1rem;
		gap: 0.5rem;
		margin: auto;
		max-width: 500px;
		align-items: center;
	}

	.header {
		font-weight: 600;
		font-size: 2rem;
		width: 100%;
		margin-left: 2rem;
	}

	.divider {
		background-color: var(--color-interactive);
		height: 4px;
		width: 100%;
		margin: 1rem 0;
	}

	.image-container {
		position: relative;
		display: inline-block;
	}

	.base-image {
		width: 300px;
		border-radius: 10px;
		display: block;
	}

	.raptor-overlay {
		position: absolute;
		top: 20px;
		left: 60px;
		width: 170px;
		height: 170px;
		mix-blend-mode: difference;
		pointer-events: none;
		transform-origin: center;
		animation: ripple 3s ease-in-out infinite;
	}

	@keyframes ripple {
		0% {
			transform: scale(1) skew(0deg, 0deg);
		}
		20% {
			/* A bulge with a slight skew */
			transform: scale(1.75, 1.2) skew(4deg, 4deg);
		}
		40% {
			/* Reverse bulge and skew */
			transform: scale(0.9, 1.1) skew(-4deg, -4deg);
		}
		60% {
			/* Ease back toward normal, with a subtle skew */
			transform: scale(1.05, 0.95) skew(2deg, 2deg);
		}
		80% {
			transform: scale(0.95, 1.05) skew(-2deg, -2deg);
		}
		100% {
			transform: scale(1) skew(0deg, 0deg);
		}
	}

/* Both lines share the basic dash settings */
.animated-x .line {
	stroke-dasharray: 113; /* Approximate length of one diagonal */
	stroke-dashoffset: 113;
	animation: draw-x 1s ease forwards;
}

/* Delay the second line so it draws after the first */
.animated-x .second {
	animation-delay: 1s;
}

@keyframes draw-x {
	to {
		stroke-dashoffset: 0;
	}
}
</style>
