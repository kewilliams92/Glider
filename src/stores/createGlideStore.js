import { fetchGlides, onGlideSnapShot } from '@api/glides';
import { onMount } from 'svelte';
import { writable, get } from 'svelte/store';

const FIRST_PAGE = 1;

export function createGlideStore(loggedInUser) {
	const pages = writable({ [FIRST_PAGE]: { glides: [] } });
	const page = writable(FIRST_PAGE);
	const freshGlides = writable([]);
	const loading = writable(false);

	let lastGlideDoc;
	let unsub;

	onMount(() => {
		loadGlides();
		subscribeToNewGlides();

		return () => {
			unsubscribeFromNewGlides();
		}
	});

	async function loadGlides() {
		const _page = get(page);

		//if we are on the first page and we have already loaded glides, we will not load any more glides
		if (_page > 1 && !lastGlideDoc) return;

		loading.set(true);
		try {
			const { glides, lastGlideDoc: _lastGlideDoc } = await fetchGlides(lastGlideDoc, loggedInUser);

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

	function subscribeToNewGlides() {
		if (loggedInUser.length === 0) {
			return;
		}
		unsub = onGlideSnapShot(loggedInUser, (newGlides) => {
			freshGlides.set(newGlides);
		});
	}

	function unsubscribeFromNewGlides() {
		if (unsub) {
			unsub();
		}
	}

	function resubToGlides(){
		unsubscribeFromNewGlides();
		subscribeToNewGlides();
	}

	function displayFreshGlides(){
		get(freshGlides).forEach(freshGlide => {
			addGlide(freshGlide);
		});

		//after we have added all of the fresh glides to the first page, we will resubscribe to new glides
		resubToGlides();
		//all of the fresh glides have been added to the first page, so we will clear the fresh glides array
		freshGlides.set([]);
	}

	return {
		pages: { subscribe: pages.subscribe },
		loading: { subscribe: loading.subscribe },
		freshGlides: { subscribe: freshGlides.subscribe },
		addGlide,
		loadGlides,
		subscribeToNewGlides,
		displayFreshGlides
	};
}
