import { CONFIG } from './config.js';

export class UI {
    constructor(gridContainer, headerElements) {
        this.gridContainer = gridContainer;
        this.mineCountDisplay = headerElements.mineCount;
        this.timerDisplay = headerElements.timer;
        this.smileyBtn = headerElements.smiley;
        this.cells = []; 
    }

    initGrid(rows, cols) {
        this.gridContainer.innerHTML = '';
        this.gridContainer.style.gridTemplateColumns = `repeat(${cols}, ${CONFIG.TILE_SIZE}px)`;
        this.cells = [];

        for (let r = 0; r < rows; r++) {
            this.cells[r] = [];
            for (let c = 0; c < cols; c++) {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell');
                cellDiv.dataset.row = r;
                cellDiv.dataset.col = c;
                
                const img = document.createElement('img');
                img.src = CONFIG.ASSETS.TILES.HIDDEN;
                img.draggable = false;
                
                cellDiv.appendChild(img);
                this.gridContainer.appendChild(cellDiv);
                this.cells[r][c] = img;
            }
        }
    }

    updateBoard(board, revealAllMines = false) {
        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[0].length; c++) {
                const cellData = board[r][c];
                const imgElement = this.cells[r][c];
                let src = CONFIG.ASSETS.TILES.HIDDEN;

                if (cellData.revealed) {
                    if (cellData.isMine) {
                        src = CONFIG.ASSETS.TILES.MINE_EXPLODED;
                    } else if (cellData.neighborMines > 0) {
                        src = `${CONFIG.ASSETS.NUMBERS_PATH}${cellData.neighborMines}.png`;
                    } else {
                        src = CONFIG.ASSETS.TILES.REVEALED;
                    }
                } else if (cellData.flagged) {
                    src = CONFIG.ASSETS.TILES.FLAG;
                    if (revealAllMines && !cellData.isMine) {
                        src = CONFIG.ASSETS.TILES.FLAG_WRONG;
                    }
                } else if (revealAllMines && cellData.isMine) {
                    src = CONFIG.ASSETS.TILES.MINE;
                }

                if (imgElement.src.indexOf(src) === -1) {
                    imgElement.src = src;
                }
            }
        }
    }

    setSmiley(state) {
        let src = CONFIG.ASSETS.SMILEY.NORMAL;
        if (state === 'win') src = CONFIG.ASSETS.SMILEY.WIN;
        if (state === 'lose') src = CONFIG.ASSETS.SMILEY.LOSE;
        this.smileyBtn.querySelector('img').src = src;
    }

    updateCounts(minesLeft, time) {
        this.mineCountDisplay.textContent = minesLeft.toString().padStart(3, '0');
        this.timerDisplay.textContent = time.toString().padStart(3, '0');
    }
}