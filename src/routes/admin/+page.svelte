<script>
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();
	let { records } = data;
	let searchTerm = $state('');

	let filteredRecords = $state(records);

	$effect(() => {
		filteredRecords = records.filter(
			(record) =>
				record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				record.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
				record.message.toLowerCase().includes(searchTerm.toLowerCase())
		);
	});

    /** @param {string} dateString */
	function formatDate(dateString) {
		return new Date(dateString).toLocaleString();
	}

    /** @param {number} id */
	function handleDelete(id) {
		records = records.filter((record) => record.id !== id);
	}
</script>

<div class="container">
	<h1>Admin Dashboard</h1>

	<div class="search-container">
		<input
			type="text"
			bind:value={searchTerm}
			placeholder="Search records..."
			class="search-input"
		/>
	</div>

	<div class="table-container">
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Email</th>
					<th>Message</th>
					<th>Feedback</th>
					<th>Created At</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredRecords as record (record.id)}
					<tr>
						<td>{record.id}</td>
						<td>{record.name}</td>
						<td>{record.email}</td>
						<td>{record.message}</td>
						<td>{record.feedback || '-'}</td>
						<td>{formatDate(record.created_at)}</td>
						<td>
							<button onclick={() => handleDelete(record.id)} class="delete-btn"> Delete </button>
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="7" class="empty-message">No records found</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	.container {
		padding: 20px;
		max-width: 1200px;
		margin: 0 auto;
	}

	h1 {
		font-size: 24px;
		margin-bottom: 20px;
	}

	.search-container {
		margin-bottom: 20px;
	}

	.search-input {
		padding: 8px 12px;
		width: 300px;
		border: 1px solid #ccc;
		border-radius: 4px;
		font-size: 14px;
	}

	.table-container {
		overflow-x: auto;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		/* background: white; */
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	th,
	td {
		padding: 12px;
		text-align: left;
		border-bottom: 1px solid #eee;
	}

	th {
		/* background: #f5f5f5; */
		font-weight: bold;
		font-size: 14px;
		text-transform: uppercase;
	}

	tr:hover {
		/* background: #f9f9f9; */
	}

	.delete-btn {
		padding: 6px 12px;
		background: #ff4444;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.delete-btn:hover {
		background: #cc0000;
	}

	.empty-message {
		text-align: center;
		color: #666;
		padding: 20px;
	}

	@media (max-width: 768px) {
		.container {
			padding: 10px;
		}

		.search-input {
			width: 100%;
			max-width: 100%;
		}

		th,
		td {
			padding: 8px;
		}
	}
</style>
