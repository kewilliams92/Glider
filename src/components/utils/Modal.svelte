<script>
	import Portal from './Portal.svelte';
    import { clickOutside } from '@actions/clickOutside';

    let isOpen = false;

    $: {
        isOpen ? disableScroll() : enableScroll();
    }

    function enableScroll(){
        document.body.classList.remove('no-scroll');
    }

    function disableScroll(){
        document.body.classList.add('no-scroll');
    }
</script>

<slot name="opener" openModal={() => isOpen = true} />
{#if isOpen}
	<Portal>
		<div class="openModal">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div 
            use:clickOutside
            on:outclick={() => isOpen = false}
            class="modal fixed min-w-160 top-14 left-2/4 p-8 -translate-x-1/2 rounded-2xl">
                <slot 
                name="modal-content" 
                closeModal={() => isOpen = false}
                />
			</div>
		</div>
	</Portal>
{/if}
