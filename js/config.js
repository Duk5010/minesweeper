export const CONFIG = {
    DIFFICULTIES: {
        BEGINNER: { rows: 9, cols: 9, mines: 10 },
        INTERMEDIATE: { rows: 16, cols: 16, mines: 40 },
        EXPERT: { rows: 16, cols: 30, mines: 99 }
    },
    TILE_SIZE: 32, 
    ASSETS: {
        TILES: {
            HIDDEN: 'assets/images/tiles/tile.png',
            REVEALED: 'assets/images/tiles/tile-revealed.png',
            PRESSED: 'assets/images/tiles/tile-pressed.png',
            FLAG: 'assets/images/icons/flag.png',
            MINE: 'assets/images/icons/mine.png',
            MINE_EXPLODED: 'assets/images/icons/mine-exploded.png',
            MINE_WRONG: 'assets/images/icons/mine-wrong.png',
            FLAG_WRONG: 'assets/images/icons/flag-wrong.png'
        },
        SMILEY: {
            NORMAL: 'assets/images/ui/smiley-normal.png',
            WIN: 'assets/images/ui/smiley-win.png',
            LOSE: 'assets/images/ui/smiley-lose.png'
        },
        SOUNDS: {
            CLICK: 'assets/sounds/click.wav',
            LOSE: 'assets/sounds/lose.mp3', //this is so goofy T.T
            FLAG: 'assets/sounds/flag.wav'
        },
        NUMBERS_PATH: 'assets/images/numbers/' 
    }
};