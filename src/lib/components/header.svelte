<script>
	import { afterNavigate } from '$app/navigation';

	let isNavOpen = $state(false);

	function toggleNav() {
		isNavOpen = !isNavOpen;
		// Prevent scrolling when nav is open
		if (isNavOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}

	/** @param {*} event */
	function handleClickOutside(event) {
		if (isNavOpen && !event.target.closest('.mobile-nav') && !event.target.closest('button')) {
			toggleNav();
		}
	}
</script>

{#snippet navLinks()}
	<ul>
		<!-- <li><a onclick={toggleNav} href="/">Home</a></li>
		<li><a onclick={toggleNav} href="/vote">Vote</a></li>
		<li><a onclick={toggleNav} href="/team">Team</a></li>
		<li><a onclick={toggleNav} href="/profile">Profile</a></li> -->
		<li><a href="/">Home</a></li>
		<li><a href="/vote">Vote</a></li>
		<li><a href="/team">Team</a></li>
		<li><a href="/gallery">Gallery</a></li>
		<li><a href="/profile">Profile</a></li>
	</ul>
{/snippet}
<div class="container">
	<!-- <img src="/raptor-svg.svg" alt="raptor" /> -->
	<h1>Raptor Faight</h1>
	<nav class="desktop-nav">
		{@render navLinks()}
	</nav>
	<button class="nav-toggle" onclick={toggleNav} aria-label="Toggle navigation">
		<span class="hamburger {isNavOpen ? 'open' : ''}"></span>
	</button>
</div>

<!-- Overlay -->
{#if isNavOpen}
	<div
		class="overlay"
		onclick={handleClickOutside}
		onkeydown={handleClickOutside}
		role="button"
		tabindex="0"
		aria-label="Close navigation"
	></div>
{/if}

<!-- Mobile Navigation -->
<nav class="mobile-nav {isNavOpen ? 'open' : ''}" aria-hidden={!isNavOpen} onclick={toggleNav}>
	{@render navLinks()}
</nav>

<style>
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		position: relative;
		padding: 1rem;
		background-color: var(--nav-green);
		height:50px;
	}

	h1 {
		font-size: 1.5rem;
		margin: 0;
		color: white;
	}

	img {
		width: 50px;
	}

	.nav-toggle {
		position: absolute;
		right: 1rem;
		background: none;
		border: none;
		cursor: pointer;
		padding: 0.5rem;
		z-index: 1000;
	}

	.hamburger {
		display: block;
		width: 24px;
		height: 2px;
		background: white;
		position: relative;
		transition: background 0.2s ease-out;
	}

	.hamburger::before,
	.hamburger::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 2px;
		background: white;
		transition: all 0.2s ease-out;
	}

	.hamburger::before {
		top: -6px;
	}

	.hamburger::after {
		bottom: -6px;
	}

	.hamburger.open {
		background: transparent;
	}

	.hamburger.open::before {
		transform: rotate(45deg);
		top: 0;
	}

	.hamburger.open::after {
		transform: rotate(-45deg);
		bottom: 0;
	}

	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 100;
	}

	.mobile-nav {
		position: fixed;
		bottom: 0;
		right: -380px;
		width: 170px;
		height: 235px;
		background: var(--color-interactive);
		background: var(--nav-green);
		padding: 0rem 20px;
		box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease-out;
		z-index: 1000;
	}

	.mobile-nav.open {
		transform: translateX(-310px);
	}

	ul {
		list-style: none;
	}

	.mobile-nav ul {
		padding: 0;
		margin: 0;
	}

	.mobile-nav li {
		margin: 1rem 0;
	}

	.desktop-nav {
		display: none;
	}
    
    .desktop-nav ul {
        display: flex;
        gap: 1rem;
    }

	.mobile-nav a,
	.desktop-nav a {
		color: var(--color-foreground);
		color: white;
		text-decoration: none;
		font-size: 1.2rem;
		font-weight: 600;
		display: block;
		padding: 0.5rem 0;
		transition: color 0.2s ease;
	}

	.mobile-nav a:hover {
		color: #666;
	}

	@media (min-width: 768px) {
		.nav-toggle {
			display: none;
		}
		.desktop-nav {
			display: flex;
		}
	}
</style>
