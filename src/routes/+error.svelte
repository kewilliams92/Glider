<script>
    import {page} from "$app/stores";
</script>

<div class='text-white flex-it justify-center items-center h-full'>
<div class='text-center'>
    <div class='text-4xl font-bold'>
        {$page.status} - {$page.error.message}
    </div>
    <a href='/' class='block text-blue-400 hover:underline text-center'>
        Go to Homepage
    </a>
</div>
</div>