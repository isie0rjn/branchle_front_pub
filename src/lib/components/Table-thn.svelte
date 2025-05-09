<script lang="ts">
    import { goto } from "$app/navigation";
    import "./style/table-thn.scss";
    let { table } = $props();

    function go_to_table() {
        goto(`/table/${table.table_id}`);
    }
</script>


<div class="table-thumbnail" on:click={go_to_table}>
    <h2>{ table.name }</h2>
    <h4>{ table.creation_date }</h4>
</div>
