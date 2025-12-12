export class MinesweeperGame {
    constructor(rows, cols, mines) {
        this.rows = rows;
        this.cols = cols;
        this.totalMines = mines;
        this.board = [];
        this.gameOver = false;
        this.won = false;
        this.flagsPlaced = 0;
        this.firstClick = true; 
        
        this.initBoard();
    }

    initBoard() {
        for (let r = 0; r < this.rows; r++) {
            this.board[r] = [];
            for (let c = 0; c < this.cols; c++) {
                this.board[r][c] = {
                    isMine: false,
                    revealed: false,
                    flagged: false,
                    neighborMines: 0
                };
            }
        }
    }

    placeMines(safeR, safeC) {
        let minesPlaced = 0;
        
        const safeZone = new Set();
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                const r = safeR + dr;
                const c = safeC + dc;
                if (r >= 0 && r < this.rows && c >= 0 && c < this.cols) {
                    safeZone.add(`${r},${c}`);
                }
            }
        }
        
        while (minesPlaced < this.totalMines) {
            const r = Math.floor(Math.random() * this.rows);
            const c = Math.floor(Math.random() * this.cols);

            if (!this.board[r][c].isMine && !safeZone.has(`${r},${c}`)) {
                this.board[r][c].isMine = true;
                minesPlaced++;
            }
        }
        this.calculateNeighbors();
    }

    calculateNeighbors() {
        const directions = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
        
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.board[r][c].isMine) continue;
                
                let count = 0;
                directions.forEach(([dr, dc]) => {
                    const nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols) {
                        if (this.board[nr][nc].isMine) count++;
                    }
                });
                this.board[r][c].neighborMines = count;
            }
        }
    }

    reveal(r, c) {
        if (this.gameOver || this.board[r][c].flagged || this.board[r][c].revealed) return;

        if (this.firstClick) {
            this.placeMines(r, c); 
            this.firstClick = false;
        }

        const cell = this.board[r][c];
        cell.revealed = true;

        if (cell.isMine) {
            this.gameOver = true;
            this.won = false;
            return { type: 'LOSE', cell: {r, c} };
        }

        if (cell.neighborMines === 0) {
            this.expandZeroes(r, c);
        }

        if (this.checkWin()) {
            this.gameOver = true;
            this.won = true;
            return { type: 'WIN' };
        }

        return { type: 'CONTINUE' };
    }

    expandZeroes(r, c) {
        const directions = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
        directions.forEach(([dr, dc]) => {
            const nr = r + dr, nc = c + dc;
            // Check boundaries
            if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols) {
                const neighbor = this.board[nr][nc];
                if (!neighbor.revealed && !neighbor.flagged) {
                    neighbor.revealed = true;
                    if (neighbor.neighborMines === 0) {
                        this.expandZeroes(nr, nc);
                    }
                }
            }
        });
    }

    toggleFlag(r, c) {
        if (this.gameOver || this.board[r][c].revealed) return;
        
        const cell = this.board[r][c];
        cell.flagged = !cell.flagged;
        this.flagsPlaced += cell.flagged ? 1 : -1;
    }

    checkWin() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (!this.board[r][c].isMine && !this.board[r][c].revealed) return false;
            }
        }
        return true;
    }
}