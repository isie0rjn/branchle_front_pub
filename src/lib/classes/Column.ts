import { Cell } from "$lib/classes/Table"

export class Column {
    cells: Cell[];

    constructor (cells: Cell[] = []) {
        this.cells = cells;
    }

    addCell(cell: Cell) {
        this.cells.push(cell);
    }
}