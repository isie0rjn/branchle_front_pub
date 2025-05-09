const numbers_container = document.getElementById('numbers-container');
        const table = document.getElementById('table');

        let row_qty = 10;
        let col_qty = 10;

        const alphabetDictionary = Object.fromEntries(
            Array.from({ length: 26 }, (_, i) => [i + 1, String.fromCharCode(65 + i)])
        );

        document.getElementById("add_row").onclick = (event) => {
            row_qty++;
            console.log(row_qty);
        }

        for(let i = 1; i < row_qty + 1; i++) {
            numbers_container.innerHTML += `<div class="col-element numbers">${i}</div>`;
        }

        for(let i = 1; i < col_qty + 1; i++) {
            let greenClass = '';
            if (getDeviceType() === 'desktop') {
                greenClass = 'green';
            }

            let innerHTMLCol = `<div class="col-top" id="${alphabetDictionary[i]}" onclick="select_col(event)">${alphabetDictionary[i]}
                <div class='col-resize-handle ${getDeviceType()}' 
                    onMouseOver="handleMouseUp_top(event)">
                </div>
            </div>`;

            for(let j = 1; j < row_qty + 1; j++) {
                innerHTMLCol += `<div class="col-element ${alphabetDictionary[i]} ${j}" id="${alphabetDictionary[i]}${j}" onclick="add_active_class(event)"></div>`
            }

            table.innerHTML += `<div class="column">${innerHTMLCol}</div>`;
        }