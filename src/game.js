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
        get blocks() {
            return this.rotations[this.rotationIndex];
        },
        rotationIndex: 0,
        rotations: [
            [
                [0, 1, 0],
                [1, 1, 1],
                [0, 0, 0]
            ],
            [
                [0, 1, 0],
                [0, 1, 1],
                [0, 1, 0]
            ],
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0]
            ],
            [
                [0, 1, 0],
                [1, 1, 0],
                [0, 1, 0]
            ],
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

    rotatePiece() {
        // this.activePiece.rotationIndex = (this.activePiece.rotationIndex + 1) % 4;
        this.activePiece.rotationIndex = this.activePiece.rotationIndex < 3 ? this.activePiece.rotationIndex + 1 : 0; 

        if(this.hasCollision()) {
          this.activePiece.rotationIndex = this.activePiece.rotationIndex > 0 ? this.activePiece.rotationIndex - 1 : 3; 
        }       

        return this.activePiece.blocks;
    }

    hasCollision() {
        const { x: activeX, y: activeY, blocks } = this.activePiece;

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if(
                    blocks[y][x] && 
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
        const { x: activeX, y: activeY, blocks } = this.activePiece;

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if(blocks[y][x]) {
                    this.playfield[activeY + y][activeX + x] = blocks[y][x];
                }
            }            
        }
    }
    
}