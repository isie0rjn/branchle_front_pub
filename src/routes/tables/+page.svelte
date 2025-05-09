<script lang="ts">
    import { goto } from "$app/navigation";
    import { user } from "$lib/store";
    import Table from "$lib/components/Table-thn.svelte";
    import { onMount } from "svelte";

    
    let loading = $state(true);
    let error = $state("");
    let modal_active: boolean = $state(false);
    let name = $state("");


    let tables: Array<{ 
        table_id: number; 
        user_id: number; 
        name: string; 
        columns: number; 
        rows: number; 
        creation_date: string; 
        is_deleted: boolean; 
    }> = $state([]);
    

    if (typeof $user.id !== "undefined") {
        if ($user.id != null) {
        onMount(async () => {
            tables = await fetch_tables();
            loading = false;
        });
        } else {
            goto('/');
        }
    }
    
    if (error) {
        console.error(error);
    }

    

    async function fetch_tables(){
        try {

            const response = await fetch("https://bubuieci.com/table", {    
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "user_id": ($user.id)?.toString(), "get_all": true }),
            });

    
            if (response.ok) {
                return await response.json();
            } else {
                error = "Неверный логин или пароль";
                throw new Error("Ошибка при получении данных");
            }
            
        
        } catch (err) {
            console.log(JSON.stringify({ "user_id": ($user.id)?.toString() }));
            console.log('hierr')
            error = "Ошибка при подключении к серверу";
            return [];
        } finally {
            loading = false;
        }
    }
    
    function exit(event: Event) {
        event.preventDefault();
        user.set({ email: null, name: null, id: null});
    }

    async function create_new_table(event: Event) {
        event.preventDefault();
        if (name.trim() == "") {
            return;
        } 

        try {
            let response = await fetch("https://bubuieci.com/table", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({"user_id": ($user.id)?.toString(), "name": name })
            });

            if (response.ok) {
                let data = await response.json();
                goto(`/table/${data['id']}`)
            } else {
                let data = await response.json();
                console.log(`error: ${data.errors}`);
            }
        } catch(error) {
            console.log(error);
        }
        
    }

    function toggle_modal_window(event: Event) {
        event.preventDefault();

        if (modal_active == false) {
            modal_active = true;
        } else {
            modal_active = false;
        }
    }


</script>

<header>
    <div class="logo-routes">
        <!-- <img src="/favicon.png" alt="" on:click={ go_to_main }> -->
        <a class="smooth-sans" href="/" role="button" data-sveltekit-prefetch>BRANCHLE</a>
        <nav>
            <ul>
                <li><a href="/tables" role="button" data-sveltekit-prefetch>Tables</a></li>
                <li><a >Friends</a></li>
            </ul>
        </nav>
    </div>

    <div class="user">
        {#if $user.email} 
            {$user.email}
            <a href="/exit" role="button" on:click={exit}>exit</a>
        {:else}
            <a href="/login" role="button" data-sveltekit-prefetch>вход</a>
        {/if}
    </div>
</header>

{#if modal_active}
    <div id="modal-container">

        <div id="close-bg" on:click={toggle_modal_window}>

        </div>
        <div id="modal">
            <h1>Create table</h1>
            <div class="input-label">
                <label for="name">Name</label>
                <input type="text" bind:value={ name }>
            </div>
            <button on:click={ create_new_table }>
                Create
            </button>
            
        </div>
    </div>
{/if}

{#if error} 
    <p> { error} </p>
{/if}

<div id="new">
    <a  href="/new" role="button" on:click={toggle_modal_window}>new</a>
</div>


<!-- <Table table={ tables[0] }/>  -->



{#if loading}
    <p>Загрузка...</p>
{:else}
    <div class="table-thumbnail-container">
        {#each tables as table}
            <Table table={ table }/>
        {/each}
    </div>
{/if}