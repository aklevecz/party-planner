/** @type {import('./$types').LayoutServerLoad} */
export async function load({cookies, url}) {
    /** @type {View | null} */
    const view = /** @type {View} */ (url.searchParams.get('view'));
    const applyId = cookies.get('applyId');
    console.log(`layout server load: ${applyId} ${view}`);
    return {applyId, view};
}