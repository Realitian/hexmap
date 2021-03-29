class Cell {

    add(cell){
        this.q += cell.q;
		this.r += cell.r;
		this.s += cell.s;
		return this;
    }

	equals(cell) {
		return this.q === cell.q && this.r === cell.r && this.s === cell.s;
	}
}

export default Cell;