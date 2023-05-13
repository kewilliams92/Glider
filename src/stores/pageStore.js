import { writable } from "svelte/store";


function createPageStore(){
    const title = writable("");
    const activeGlide = writable(null);
    const onGlidePosted = writable(() => console.log("hello world"))

    return {
        title,
        activeGlide,
        onGlidePosted
    }
}

export const pageStore = createPageStore();