export class Controls {
    constructor(game, ui, onAction) {
        this.game = game;
        this.ui = ui;
        this.onAction = onAction; 
        this.isMouseDown = false;
        

        this.boundMouseDown = (e) => this.handleMouseDown(e);
        this.boundMouseUp = (e) => this.handleClick(e);
        this.boundContextMenu = (e) => {
            e.preventDefault();
            this.handleRightClick(e);
        };
        this.boundDragStart = (e) => e.preventDefault();

        this.bindEvents();
    }

    bindEvents() {
        const grid = this.ui.gridContainer;
        grid.addEventListener('mousedown', this.boundMouseDown);
        grid.addEventListener('mouseup', this.boundMouseUp);
        grid.addEventListener('contextmenu', this.boundContextMenu);
        grid.addEventListener('dragstart', this.boundDragStart);
    }

    cleanup() {
        const grid = this.ui.gridContainer;
        if (grid) {
            grid.removeEventListener('mousedown', this.boundMouseDown);
            grid.removeEventListener('mouseup', this.boundMouseUp);
            grid.removeEventListener('contextmenu', this.boundContextMenu);
            grid.removeEventListener('dragstart', this.boundDragStart);
        }
    }

    getCellFromEvent(e) {
        const cellDiv = e.target.closest('.cell');
        if (!cellDiv) return null;
        return {
            r: parseInt(cellDiv.dataset.row),
            c: parseInt(cellDiv.dataset.col)
        };
    }

    handleMouseDown(e) {
        if (this.game.gameOver || e.button !== 0) return;
        this.isMouseDown = true;
        this.ui.setSmiley('normal');
    }

    handleClick(e) {
        if (!this.isMouseDown || this.game.gameOver || e.button !== 0) return;
        this.isMouseDown = false;

        const pos = this.getCellFromEvent(e);
        if (pos) {
            this.onAction('reveal', pos.r, pos.c);
        }
    }

    handleRightClick(e) {
        if (this.game.gameOver) return;
        const pos = this.getCellFromEvent(e);
        if (pos) {
            this.onAction('flag', pos.r, pos.c);
        }
    }
}