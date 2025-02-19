<script>
	import TeamMember from '$lib/components/team/team-member.svelte';

	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();

	const teamMembers = [
		{name: "DJ Baobao", role: "Director of Vibes", imgUrl: "team/images/dj_baobao.jpg"},
		{name: "Tise Ben-Eka", role: "Chief Curiosity Officer", imgUrl: "team/images/tise-ben-eka.jpeg"},
		{name: "Keith Herrington", role: "", imgUrl: "team/images/keith-herrington.jpeg"},
		{name: "Jade Sophie-Claire", role: '', imgUrl: "team/images/jade-sophie-claire.jpeg"},
		{name: "Darren Lee", role: "", imgUrl: "team/images/darren-lee.jpeg"},
		{name: "Hannibal Gardenhaus", role: "", imgUrl: "team/images/hannibal-gardenhaus.jpeg"},
		{name: "Marisa Cruz", role: "", imgUrl: "team/images/marisa-cruz.jpeg"},
		{name: "Dariel Med", role: "", imgUrl: "team/images/dariel-med.jpeg"},
		{name: "Conor Agnew", role: "", imgUrl: "team/images/conor-agnew.jpeg"},
		{name: "Linda Song", role: "", imgUrl: "team/images/linda-song.jpeg"},
	]
</script>

<h1>Team</h1>
<div class="container">
	{#each teamMembers as member}
		<TeamMember {...member} />
	{/each}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
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
