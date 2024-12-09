export const delay = (/** @type {number} ms */ ms) =>
	new Promise((resolve) => setTimeout(resolve, ms));

/** @param {string} elementId */
export function generateScrollTo(elementId) {
	const generateScrollToEl = document.getElementById(elementId);
	if (generateScrollToEl) {
		generateScrollToEl.scrollIntoView({
			behavior: 'smooth'
		});
	}
}

/** @param {string} text */
export function camelToPhrase(text) {
	return (
		text
			// Add space before capital letters
			.replace(/([A-Z])/g, ' $1')
			// Capitalize first letter
			.replace(/^./, (str) => str.toUpperCase())
			.trim()
	);
}