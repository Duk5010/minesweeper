import { MinesweeperGame } from './game.js';
import { UI } from './ui.js';
import { Controls } from './controls.js';
import { CONFIG } from './config.js';

let game;
let ui;
let currentControls; 
let timerInterval;
let timeElapsed = 0;
let currentDifficultyKey = 'BEGINNER'; 

const sounds = {
    click: null,
    lose: null,
    flag: null
};

function init() {
    const diffContainer = document.getElementById('difficulty-buttons');
    const resetBtn = document.getElementById('reset-btn');

    const changelogBtn = document.getElementById('changelog-btn');
    const modal = document.getElementById('changelog-modal');
    const closeBtn = document.getElementById('close-modal-btn');
    
    if (changelogBtn && modal) {
        changelogBtn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    if (CONFIG.ASSETS.SOUNDS) {
        if (CONFIG.ASSETS.SOUNDS.CLICK) sounds.click = new Audio(CONFIG.ASSETS.SOUNDS.CLICK);
        if (CONFIG.ASSETS.SOUNDS.LOSE) sounds.lose = new Audio(CONFIG.ASSETS.SOUNDS.LOSE);
        if (CONFIG.ASSETS.SOUNDS.FLAG) sounds.flag = new Audio(CONFIG.ASSETS.SOUNDS.FLAG);
    }

    ui = new UI(
        document.getElementById('grid-container'),
        {
            mineCount: document.getElementById('mine-count'),
            timer: document.getElementById('timer'),
            smiley: document.getElementById('reset-btn')
        }
    );

    if (diffContainer) {
        diffContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('diff-btn')) {
                startGame(e.target.dataset.difficulty);
            }
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => startGame(currentDifficultyKey));
    }

    startGame('BEGINNER');
}

function playSound(soundName) {
    const sound = sounds[soundName];
    if (sound) {
        sound.currentTime = 0; 
        sound.play().catch(e => {});
    }
}

function startGame(difficultyKey) {
    stopTimer();
    timeElapsed = 0;
    currentDifficultyKey = difficultyKey;

    if (currentControls) {
        currentControls.cleanup();
        currentControls = null;
    }

    const settings = CONFIG.DIFFICULTIES[difficultyKey];
    game = new MinesweeperGame(settings.rows, settings.cols, settings.mines);
    
    ui.initGrid(settings.rows, settings.cols);
    ui.updateCounts(settings.mines, 0);
    ui.setSmiley('normal');

    currentControls = new Controls(game, ui, (action, r, c) => {
        const cell = game.board[r][c];

        if (action === 'reveal') {
            if (timeElapsed === 0 && !timerInterval) startTimer();
            
            const result = game.reveal(r, c);
            
            if (result) {
                if (result.type === 'LOSE') {
                    handleGameResult(result);
                } else {
                    playSound('click');
                    handleGameResult(result);
                }
            }

        } else if (action === 'flag') {
            if (!cell.revealed) {
                playSound('flag'); 
                game.toggleFlag(r, c);
            }
        }
        
        ui.updateBoard(game.board, game.gameOver);
        ui.updateCounts(game.totalMines - game.flagsPlaced, timeElapsed);
    });
}

function handleGameResult(result) {
    if (!result) return;
    
    if (result.type === 'LOSE') {
        stopTimer();
        ui.setSmiley('lose');
        playSound('lose');
    } else if (result.type === 'WIN') {
        stopTimer();
        ui.setSmiley('win');
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeElapsed++;
        if (timeElapsed > 999) timeElapsed = 999;
        ui.updateCounts(game.totalMines - game.flagsPlaced, timeElapsed);
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

document.addEventListener('DOMContentLoaded', init);