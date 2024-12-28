<script lang="ts">
	import { TelInput, normalizedCountries } from 'svelte-tel-input';
	import type { DetailedValue, CountryCode, E164Number } from 'svelte-tel-input/types';

	let { phoneNumber = $bindable(), valid = $bindable(), detailedValue = $bindable(), selectedCountry = $bindable("US") } = $props();

	// Any Country Code Alpha-2 (ISO 3166)
	// let selectedCountry: CountryCode | null = 'US';

	// You must use E164 number format. It's guarantee the parsing and storing consistency.
	let value: E164Number | null = '+36301234567';

	// Validity
	// let valid = $state(true);

	// Optional - Extended details about the parsed phone number
	// let detailedValue: DetailedValue | null = $state(null);
</script>

<div class="wrapper">
	<select
		class="country-select {!valid ? 'invalid' : ''}"
		aria-label="Default select example"
		name="Country"
		bind:value={selectedCountry}    
	>
		<option value={null} hidden={selectedCountry !== null}>Please select</option>
		{#each normalizedCountries as currentCountry (currentCountry.id)}
			<option
				value={currentCountry.iso2}
				selected={currentCountry.iso2 === selectedCountry}
				aria-selected={currentCountry.iso2 === selectedCountry}
			>
				{currentCountry.iso2} (+{currentCountry.dialCode})
			</option>
		{/each}
	</select>
	<TelInput
		bind:country={selectedCountry}
		bind:value={phoneNumber}
		bind:valid
		bind:detailedValue
		class="basic-tel-input {!valid ? 'invalid' : ''}"
	/>
</div>

<style>
	.wrapper :global(.basic-tel-input) {
		height: 32px;
		padding-left: 12px;
		padding-right: 12px;
		border-radius: 6px;
		border: 1px solid;
		outline: none;
	}

	.wrapper :global(.country-select) {
		height: 36px;
		padding-left: 12px;
		padding-right: 12px;
		border-radius: 6px;
		border: 1px solid;
		outline: none;
	}

	.wrapper :global(.invalid) {
		border-color: red;
	}
</style>
