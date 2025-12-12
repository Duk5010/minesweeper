export class MinesweeperGame {
    constructor(rows, cols, mines) {
        this.rows = rows;
        this.cols = cols;
        this.totalMines = mines;
        
        this.board = [];
        this.gameOver = false;
        this.minesPlaced = false;
        this.flagsPlaced = 0;
        this.cellsRevealed = 0;
        
        this.initBoard();
    }

    initBoard() {
        this.board = [];
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

    placeMines(initialR, initialC) {
        let minesToPlace = this.totalMines;
        while (minesToPlace > 0) {
            const r = Math.floor(Math.random() * this.rows);
            const c = Math.floor(Math.random() * this.cols);

            if (!this.board[r][c].isMine && 
                (Math.abs(r - initialR) > 1 || Math.abs(c - initialC) > 1)) {
                
                this.board[r][c].isMine = true;
                minesToPlace--;
            }
        }
        this.calculateNumbers();
        this.minesPlaced = true;
    }

    calculateNumbers() {
        const dirs = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.board[r][c].isMine) continue;

                let count = 0;
                dirs.forEach(([dr, dc]) => {
                    const nr = r + dr, nc = c + dc;
                    if (this.isValid(nr, nc) && this.board[nr][nc].isMine) {
                        count++;
                    }
                });
                this.board[r][c].neighborMines = count;
            }
        }
    }

    reveal(r, c) {
        if (this.gameOver || this.board[r][c].flagged || this.board[r][c].revealed) return null;

        if (!this.minesPlaced) {
            this.placeMines(r, c);
        }

        const cell = this.board[r][c];
        cell.revealed = true;

        if (cell.isMine) {
            this.gameOver = true;
            return { type: 'LOSE' };
        }

        this.cellsRevealed++;

        if (cell.neighborMines === 0) {
            this.floodFill(r, c);
        }

        if (this.cellsRevealed === (this.rows * this.cols) - this.totalMines) {
            this.gameOver = true;
            this.flagAllMines();
            return { type: 'WIN' };
        }

        return { type: 'CONTINUE' };
    }

    floodFill(r, c) {
        const dirs = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];

        dirs.forEach(([dr, dc]) => {
            const nr = r + dr, nc = c + dc;
            if (this.isValid(nr, nc) && !this.board[nr][nc].revealed && !this.board[nr][nc].flagged) {
                const neighbor = this.board[nr][nc];
                neighbor.revealed = true;
                this.cellsRevealed++;
                if (neighbor.neighborMines === 0) {
                    this.floodFill(nr, nc);
                }
            }
        });
    }

    toggleFlag(r, c) {
        if (this.gameOver || this.board[r][c].revealed) return;
        
        const cell = this.board[r][c];
        cell.flagged = !cell.flagged;
        
        if (cell.flagged) this.flagsPlaced++;
        else this.flagsPlaced--;
    }

    flagAllMines() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                if (this.board[r][c].isMine) {
                    this.board[r][c].flagged = true;
                }
            }
        }
    }

    isValid(r, c) {
        return r >= 0 && r < this.rows && c >= 0 && c < this.cols;
    }
}