export const delay = (/** @type {number} ms */ ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** @param {string} elementId */
export function generateScrollTo(elementId) {
	const generateScrollToEl = document.getElementById(elementId);
	if (generateScrollToEl) {
		generateScrollToEl.scrollIntoView({
			behavior: 'smooth'
		});
	}
}