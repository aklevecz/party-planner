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

/** @param {string} phoneNumber */
export function hashPhoneNumber(phoneNumber) {
	// Remove any non-numeric characters
	const cleaned = phoneNumber.replace(/\D/g, '');
	
	// Simple multiplicative hash
	let hash = 0;
	for (let i = 0; i < cleaned.length; i++) {
		// Use prime numbers for better distribution
		hash = ((hash << 5) - hash + parseInt(cleaned[i])) | 0;
	}
	
	// Ensure positive number and convert to string
	return Math.abs(hash).toString(16);
}