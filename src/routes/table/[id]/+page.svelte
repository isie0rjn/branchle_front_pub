<script lang="ts">
    import { setContext } from "svelte";
    import TableDraw from "$lib/components/Table_draw.svelte";
    import { Table, Cell } from "$lib/classes/Table"

    import { onMount } from 'svelte';
    import { user } from '$lib/store';
    import "./style.scss"

    export let data;
    let loading = true;
    let error = "";

    let table_data: Table | null = null;

    onMount(async () => {
        table_data = await fetch_table_by_id();
        loading = false;
    });

    async function fetch_table_by_id(){
        try {
            const response = await fetch(`https://bubuieci.com/table/${data.id}`, {    
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
    
            if (response.ok) {
                let data = await response.json();
                return data;
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
</script>

{#if table_data } 

    <TableDraw table_data_raw={ table_data } /> 

{/if}


<!-- {#if table_data}
<p>Rows { table_data["rows"] }</p>
<p>Cols { table_data["columns"] }</p>


    {#each table_data["cells"] as { color, text }, i}
        <p>{ text }</p>
    {/each} 

    
{/if} -->




    