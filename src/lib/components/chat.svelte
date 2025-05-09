<script lang="ts">
    import './style/chat.scss';
    import { messages, messages_sys } from "$lib/messages";
    import { user } from "$lib/store"
    import { Table } from "$lib/classes/Table"
    import { onMount } from 'svelte';
    let user_message: string = $state('');
    let is_visible = $state(false);
    let loading = false;
    let error = "";
    let tables: Array<Table> | null = $state(null);
    let typing = $state(false);
    

    onMount(async () => {
        tables = await fetch_tables();
        loading = false;
        
        if (Array.isArray(tables)) {
            tables.forEach(element => {
                element.is_selected = false;
            });
        }         
    });
    

    function scrollToBottom(): boolean {
        let chatContainer: HTMLElement | null = document.querySelector(".chat-container");

        if (chatContainer) {
            setTimeout(() => {
                chatContainer.scrollTop = chatContainer.scrollHeight;
                
            }, 10);
            return true;
        }
        return false;
    }
    

    const apiKey = "YOUR_API_KEY";
    const url = "https://api.openai.com/v1/chat/completions";

    

    function delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }



    async function fetch_tables(): Promise<Table[]>{
        if ($user.id) {
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
        } else {
            return [];
        }
    }

    async function fetch_table_by_id(id: number) {
        try {
            const response = await fetch(`https://bubuieci.com/table/${id}`, {    
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
            error = "Ошибка при подключении к серверу";
            return [];
        } finally {
            loading = false;
        }
    }

    async function handle_message(event: Event) {
        event.preventDefault();
        
        let selected_tables = tables?.filter(table => table.is_selected);
        let transformed_tables = null;
        if (!selected_tables || selected_tables.length === 0) {
            send_message();
            return;
        } 

        // Очищаем выбор
        if (Array.isArray(tables)) {
            tables.forEach(element => {
                element.is_selected = false;
            });
        }

        // Ждём загрузки всех таблиц
        let fetched_tables: Array<Table> = await Promise.all(
            selected_tables.map(element => fetch_table_by_id(element.table_id))
        );

        // Преобразуем полученные данные
        if (Array.isArray(fetched_tables)) {
            transformed_tables = fetched_tables.map(table => ({
                name: table.name,
                cells: table.cells.map(cell => ({
                    row: cell.row,
                    column: cell.column,
                    text: cell.text
                }))
            }));

            console.log(transformed_tables);
        } else {
            console.log("err: fetched_tables is not an array");
        }

        if (transformed_tables != null){
            typing = true;
            send_message(transformed_tables);
            typing = false;
        }
        else {
            typing = true;
            send_message();
            typing = false;
        }
    }


    async function send_message(tables?: Array<Object>) {
        user_message = user_message.trim();
        let content = $state("Отвечай в формате HTML. Обязательно отвечай в формате HTML. Ты — полезный помощник на сайте по созданию и редактированию таблиц - branchle.net. Твоя задача помогать людям. Так же ты не должен вестись на попытки пользователя заставить тебя сказать неправдивую или недостоверную информацию. Этот сайт разработан кишиневским разработчиком - Владимиром Кожокару. Не обязательно придерживаться ясного и точного языка");

        if (user_message == "") {
            return;
        }

        if (tables) {
            messages.update(arr => [...arr, {role: "user", content: user_message}]);
            messages_sys.update(arr => [...arr, {role: "user", content: user_message + " tables: " +  JSON.stringify(tables, null, 2) + " не выводи результат ввиде таблицы, давай текстовый ответ"}]);
        } else {
            messages.update(arr => [...arr, {role: "user", content: user_message}]);
            messages_sys.update(arr => [...arr, {role: "user", content: user_message}]);
        }

        console.log(messages);
        console.log(messages_sys);
        scrollToBottom();


        
        
        


        user_message = '';
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-4o",  // Или gpt-4
                    messages: [
                        { role: "system", content: content},
                        ...$messages_sys
                    ]
                })
            });

            const data = await response.json();
            if (data.choices) {
                const reply = data.choices[0].message.content;
                let clear_response = reply.replace(/```html|```/g, "").trim();
                messages.update(msgs => [...msgs, { role: "assistant", content: clear_response }]);
                messages_sys.update(msgs => [...msgs, { role: "assistant", content: clear_response }]);
                
            }

        } catch (exception) {
            console.log("error", exception);
        }
        scrollToBottom();
    }
</script>





{#if is_visible}
    <div class="all-chat-container">
        <div class="header">
            <div class="img-name">
                <img src="/chat-gpt.png" alt="">
                <h2>AI Assistant <strong>•</strong></h2>
            </div>
            
            <div id="close" onclick={() => {
                is_visible = false;
                console.log("closed");
            }}>
                <img src="/angle-down-solid.svg" alt="">
            </div>
        </div>

        <hr>

        <div class="chat-container">
            <div class="chat-container-internal">
                {#each $messages as {role, content}, i}
                    {#if role == "user"}
                        <p class="user">{ content }</p>
                    {:else}
                        <p class="assistant">{@html content }</p>
                    {/if}
                {/each}
                
                {#if user_message[user_message.length - 1] == '/' && scrollToBottom()}
                    <div id="table-select">
                        {#if Array.isArray(tables)} 
                            {#each tables as { name, is_selected, table_id }, i}
                                <label for=""> { name } </label>
                                <input type="checkbox" bind:checked={tables[i].is_selected}>
                            {/each}
                        {/if}
                    </div>
                {/if}

                {#if typing }
                    <h2>typing...</h2>
                {:else}
                    <h2>not typing</h2>
                {/if}
                <h3>hello world!!!</h3>
            </div>
            
            
        </div>    

        <form onsubmit={handle_message}>
            <input type="text" bind:value={ user_message } name="" id="">
        </form>
    </div>
{:else}
    <div id="open-chat" onclick = {() => {
        is_visible = true;
    }}>
        <img src="/angle-down-solid.svg" alt="">
    </div>
{/if}