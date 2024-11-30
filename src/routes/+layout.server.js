/** @type {import('./$types').LayoutServerLoad} */
export async function load({cookies, url}) {
    /** @type {View | null} */
    const view = /** @type {View} */ (url.searchParams.get('view')) || "intro";
    const applyId = cookies.get('applyId');
    return {applyId, view};
}