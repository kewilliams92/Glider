import { fetchSubglides } from '@api/glides';
import { writable, get } from 'svelte/store';

const FIRST_PAGE = 1;

export function createSubglideStore() {
	const pages = writable({ [FIRST_PAGE]: { glides: [] } });
	const page = writable(FIRST_PAGE);
	const loading = writable(false);

	let lastGlideDoc;

	async function loadGlides(glideLookup) {
		const _page = get(page);

		//if we are on the first page and we have already loaded glides, we will not load any more glides
		if (_page > 1 && !lastGlideDoc) return;

		loading.set(true);
		try {
			const { glides, lastGlideDoc: _lastGlideDoc } = await fetchSubglides(lastGlideDoc, glideLookup);

			if (glides.length > 0) {
				//if we have glides, we will update the pages object with the new glides
				pages.update((_pages) => ({ ..._pages, [_page]: { glides } }));
				//after each load we will update the page number, and add a new page to our pages object
				page.update((_page) => _page + 1);
			}

			lastGlideDoc = _lastGlideDoc;
		} catch (err) {
			console.log(err.message);
		} finally {
			loading.set(false);
		}
	}

	function addGlide(glide) {
		//this is a function that will add a glide to the first page
		pages.update((_pages) => {
			_pages[FIRST_PAGE].glides.unshift(glide);
			return _pages;
		});
	}

	function resetPagination() {
		pages.update(_pages => {
			for(let i = 1; i <= Object.keys(_pages).length; i++){
				_pages[i] ={
					glides: []
				}};
			return _pages;
		});

		lastGlideDoc = null;
		page.set(1);
	};

	return {
		pages: { subscribe: pages.subscribe },
		loading: { subscribe: loading.subscribe },
		loadGlides,
		addGlide,
		resetPagination
	};

}
