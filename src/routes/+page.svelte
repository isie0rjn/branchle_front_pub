<script lang="ts">
    import { goto } from '$app/navigation';
    import { user } from '$lib/store';
    import Chat from '$lib/components/Chat.svelte'


    function exit(event: Event) {
        event.preventDefault();
        user.set({ email: null, name: null, id: null});
    }

    
</script>

<header>
    <div class="logo-routes">
        <!-- <img src="/favicon.png" alt="" on:click={go_to_main}> -->
        <a class="smooth-sans" href="/" role="button" data-sveltekit-prefetch>BRANCHLE</a>

        <nav>
            <ul>
                <li><a href="/tables" role="button" data-sveltekit-prefetch>Tables</a></li>
                <li><a href="/">Friends</a></li>
            </ul>
        </nav>
    </div>

    <div class="user">
        {#if $user.email}
            {$user.email}
            <a href="/exit" role="button" on:click={exit}>exit</a>
        {:else}
            <a href="/login" role="button" data-sveltekit-prefetch>Login</a> /
            <a href="/register" role="button" data-sveltekit-prefetch>Register</a>
        {/if}
    </div>
</header>



<div id="chat-container">
    <Chat /> 
</div>



