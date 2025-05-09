<script lang="ts">
    import "./style/table_draw.scss"
    import { Table, Cell } from "$lib/classes/Table"
    import { Column } from "$lib/classes/Column"
    import { onMount, tick } from "svelte";

    let { table_data_raw } = $props();

    let table_data: Table = $state(table_data_raw);


    

    const add_btn = document.getElementById("add_row");

    const alphabetDictionary = Object.fromEntries(
        Array.from({ length: 26 }, (_, i) => [i + 1, String.fromCharCode(65 + i)])
    );

    // if (add_btn != null)
    // add_btn.onclick = (event) => {
    //     row_qty++;
    //     console.log(row_qty);
    // }

    
    async function save_data(text: string, row: number, column: number) {
        // if (text.trim() === '') return; 


        try {
            const response = await fetch('https://bubuieci.com/table', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    table_id: table_data.table_id,
                    row: row,
                    column: column,
                    text: text,
                    cell: true
                })
            });

        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    function create_numbers() {
      const numbers_container = document.getElementById('numbers-container');
      if (numbers_container) {
          for (let i = 1; i <= table_data["rows"]; i++) {
              numbers_container.innerHTML += `<div class="col-element numbers">${i}</div>`;
          }
      } else {
          console.log("numbers_container не найден");
      }
    }

    

    
    function create_columns(): Array<Column> {
        let columns: Array<Column> = $state([]);
        let elements: Array<Cell> = [];
        for (let i = 1; i < table_data["columns"]; i++) {
            

            for (let j = 1; j < table_data["rows"] + 1; j++) {
                let cell: Cell | undefined = table_data["cells"].find((cell: Cell) => cell.row === j && cell.column === i);

                if (cell) {
                    elements.push(cell);
                    cell = undefined;
                } else {
                    elements.push(new Cell(1, i, j, "", "", 0, ""));
                }
            }

            columns.push(new Column(elements));
            elements = [];
        }

        return columns;
    }

    function handleMouseUp_top(event: Event) {
            const resizeHandle = event.target as HTMLElement; 

            const parentDiv = resizeHandle?.closest('.col-top') || null;

            if (parentDiv != null)            
            if (resizeHandle instanceof HTMLElement && parentDiv instanceof HTMLElement) {
                init_top(resizeHandle, parentDiv);
            }
    }

    function init_top(handle: HTMLElement, rectangle: HTMLElement) {

        if (!rectangle || !handle) {
            return;
        }

        // Handle for touch and mouse events
        const startResize = (event: MouseEvent | TouchEvent) => {
            event.preventDefault();

            const initialWidth = rectangle.offsetWidth;
            const startX = "touches" in event ? (event as TouchEvent).touches[0].clientX : (event as MouseEvent).clientX;

            // Function to move (resize) the element horizontally
            const onMove = (e: MouseEvent | TouchEvent) => {
                const clientX = e instanceof TouchEvent ? e.touches[0].clientX : (e as MouseEvent).clientX;
                const newWidth = initialWidth + (clientX - startX);
                rectangle.style.width = newWidth + 'px';
            };


            // Function to stop resizing
            const stopResize = () => {
                window.removeEventListener('mousemove', onMove);
                window.removeEventListener('mouseup', stopResize);
                window.removeEventListener('touchmove', onMove);
                window.removeEventListener('touchend', stopResize);
            };

            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', stopResize);
            window.addEventListener('touchmove', onMove, { passive: false });
            window.addEventListener('touchend', stopResize);
        };

        handle.addEventListener('mousedown', startResize);
        handle.addEventListener('touchstart', startResize, { passive: false });
    }

    function find_cell(row: number, column: number, text: string) {        
        let el = document.querySelector(`#${alphabetDictionary[column] + row}`);
        if (el) {
            el.innerHTML += text;
        }
    }

    function type_values() {
        table_data["cells"].forEach((cell: Cell) => {
            find_cell(cell['row'], cell['column'], cell["text"]);
        });
    }


    let current = document.querySelector<HTMLInputElement>("#current-tile");

    if (current) {
        current.addEventListener("input", () => {
            filter_active(current.value);
        });
    }


    function filter_active(id: string): void {
        if (id.length <= 1 || isNaN(Number(id.charAt(id.length - 1)))) {
            select_col(id);
        } else {
            add_active_class(id);
        }
    }


    function add_active_class(event: Event) {

        // Получаем элемент, на который был совершен клик
        const element = event.target as HTMLElement;

        if (!(element instanceof HTMLElement)) {
            return;
        }

        // Убираем класс 'active' у уже активных элементов
        let active_el = document.querySelector('.active');
        if (active_el) {
            active_el.classList.remove('active');
        }

        // Добавляем класс 'active' к текущему элементу
        element.classList.add('active');
    }


    let is_editing = $state("");
    let current_text = $state("");
    let refresh = $state(1);

    function startEditing(row: number, column: number) {

        is_editing = alphabetDictionary[column] + row;  // Включаем режим редактирования
    }

    function finishEditing(value: string, row: number, column: number) {
        value = current_text;
        const cell = columns.map((c: Column) => c.cells.find((cell) => cell.row === row && cell.column === column)).find((cell) => cell !== undefined);



        
        save_data(current_text, row, column);        
        if (cell) {
            cell.text = current_text;
            is_editing = "";  // Отключаем режим редактирования
            cell.text = value;  // Обновляем текст ячейки
            current_text = "";
        } else {
            is_editing = "";  // Отключаем режим редактирования
            current_text = "";

        }        

    }

    let columns: Array<Column> = $state([]);

    onMount(() => {
        if (table_data) {
            create_numbers();
            // create_letters();
            // type_values();
            columns = create_columns();
        }
    })
</script>




<div id="table">
    <div id="numbers-container">
        <div class="col-top numbers-top"></div>
    </div>

    {#if columns} 
        {#each columns as col, i}
            <div class='column'>
                <div class="col-top" id="{ alphabetDictionary[i + 1] }">{ alphabetDictionary[i + 1] }</div>
                {#each col['cells'] as cell, j}
                
                    {#if is_editing != alphabetDictionary[i + 1] + (j + 1) }
                        <!-- svelte-ignore a11y_click_events_have_key_events -->
                        <!-- svelte-ignore event_directive_deprecated -->
                        <!-- svelte-ignore a11y_no_static_element_interactions -->

                        <div class="col-element { alphabetDictionary[i + 1] } { j + 1 }" id="{ alphabetDictionary[i + 1] }{ j + 1 }" on:click={ add_active_class } on:dblclick={() => { 
                            if (cell.text) {
                                current_text = cell.text;
                            }
                            
                            startEditing(cell.row, cell.column);
                        }}>
                            { cell.text }
                        </div>
                    {:else}
                        <input class="col-element { alphabetDictionary[i + 1] } { j + 1 }" id="{ alphabetDictionary[i + 1] }{ j + 1 }" type="text" bind:value={current_text} on:blur={() => finishEditing(cell.text, cell.row, cell.column)} />
                    {/if}
                {/each}
            </div>
        {/each}
    {/if}
</div>


<div id="buttons">
    <button id="add_row">+</button>

    <input type="text" id="current-tile" value="">
</div>

