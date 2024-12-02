<script>
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();
</script>

<h1>Team</h1>
<div style="padding: 10px;">
	<div class="team-member">
		<img src="/dj_baobao.jpg" alt="baobao" />
		<div class="team-member-info">
			<h3>Dj Baobao</h3>
			<div>Director of vibes</div>
		</div>
	</div>
</div>

<style>
	h1 {
		text-align: center;
	}

	h3 {
		margin:0;
	}

	.team-member {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 200px;
		gap: 1rem;
		flex-direction: column;
		margin: auto;
	}
	.team-member img {
		width: 200px;
		height: 200px;
	}
	.team-member-info {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
	}
</style>
