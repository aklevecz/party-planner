<script>
    let { name, role, imgUrl } = $props();
</script>
<div class="team-member">
	<img src={imgUrl} alt="{name}" />
	<div class="team-member-info">
		<h3>{name}</h3>
		<div>{role}</div>
	</div>
</div>

<style>
	h3 {
		margin: 0;
	}

	.team-member {
        flex: 0 1 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		/* width: 200px; */
		gap: 1rem;
		flex-direction: column;
		/* margin: auto; */
	}
	.team-member img {
		width: 200px;
		height: 200px;
	}
	.team-member-info {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 100%;
	}
</style>
