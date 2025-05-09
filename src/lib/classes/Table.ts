export class Cell {
    table_id: number;
    column: number;
    row: number;
    text: string;
    color: string | null;
    border_size: number | null;
    border_color: string | null;

    constructor(
        table_id: number,
        column: number,
        row: number,
        text: string,
        color: string | null,
        border_size: number | null,
        border_color: string | null,
    ) {
        this.table_id = table_id;
        this.column = column;
        this.row = row;
        this.text = text;
        this.color = color;
        this.border_size = border_size;
        this.border_color = border_color;
    }
}

export class Table {
    table_id: number;
    user_id: number;
    name: string;
    columns: number;
    rows: number;
    creation_date: string;
    is_deleted: boolean;
    cells: Cell[];
    is_selected?: boolean;

    constructor(
        table_id: number,
        user_id: number,
        name: string,
        columns: number,
        rows: number,
        creation_date: string,
        is_deleted: boolean,
        cells: Cell[] = []
    ) {
        this.table_id = table_id;
        this.user_id = user_id;
        this.name = name;
        this.columns = columns;
        this.rows = rows;
        this.creation_date = creation_date;
        this.is_deleted = is_deleted;
        this.cells = cells;
    }

    add_cell(cell: Cell) {
        this.cells.push(cell);
    }
}
