<script>
	import TeamMember from '$lib/components/team/team-member.svelte';

	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();
</script>

<h1>Team</h1>
<div class="container">
	<TeamMember name="DJ Baobao" role="Director of Vibes" imgUrl="/dj_baobao.jpg" />
	<TeamMember name="Tise Ben-Eka" role="Chief Curiosity Officer" imgUrl="/tise-raptor.jpeg" />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 50px;
	}
	h1 {
		text-align: center;
	}

	@media (min-width: 768px) {
		.container {
			flex-direction: row;
			justify-content: center;
		}
	}
</style>
