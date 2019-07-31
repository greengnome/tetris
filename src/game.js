export default class Game {
    score = 0;
    line = 0;
    level = 0;
    playfield = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    activePiece = {
        x: 0,
        y: 0,
        block: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ]
    };

    moveLeft() {
        this.activePiece.x -= 1;

        if(this.hasCollision()) {
            this.activePiece.x += 1;
        }
    }

    moveRight() {
        this.activePiece.x += 1;

        if(this.hasCollision()) {
            this.activePiece.x -= 1;
        }
    }

    moveDown() {
        this.activePiece.y += 1;

        if(this.hasCollision()) {
            this.activePiece.y -= 1;
            this.lockPiece();
        }
    }

    hasCollision() {
        const { x: activeX, y: activeY, block } = this.activePiece;

        for (let y = 0; y < block.length; y++) {
            for (let x = 0; x < block[y].length; x++) {
                if(
                    block[y][x] && 
                    ((this.playfield[activeY + y] === undefined || this.playfield[activeY + y][activeX + x] === undefined) ||
                    this.playfield[activeY + y][activeX + x])
                    ) {
                    return true;
                }            
            }            
        }
        
        return false;
    }

    lockPiece() {
        const { x: activeX, y: activeY, block } = this.activePiece;

        for (let y = 0; y < block.length; y++) {
            for (let x = 0; x < block[y].length; x++) {
                if(block[y][x]) {
                    this.playfield[activeY + y][activeX + x] = block[y][x];
                }
            }            
        }
    }
    
}