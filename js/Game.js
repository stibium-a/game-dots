class Game extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    preload() {
        this.load.image('gameBG', 'img/gameBG.jpg');

        rounds.forEach((round) => {
            this.load.image(round.color, round.src);
        });
    };

    create() {
        this.createBackGround();
        this.createBalls();
        this.getBallsPosition();
        this.createScore();
        this.moveBalls();
    };

    changePos() {
        newBallYPosition = newBallsArr[count - 1].newY + 53;

        return newBallYPosition;
    };

    moveBalls() {

        this.tweens.add({
            onRepeate: () => {
                count++;
                this.changePos();
            },
            targets: [...balls.children.entries],
            y: this.changePos,
            duration: 1000,
            ease: 'Sine.easeInOut',
            repeat: 0,
            delay: this.tweens.stagger(100),
        });
    };

    createBackGround() {
        this.add.sprite(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'gameBG');
    };

    createScore() {
        scoreText = this.add.text(5, 5, 'Score: 0', { font: '18px Arial', fill: '#f1f1f1' });
    };

    createBalls() {
        let ballTexture = this.textures.get(rounds[1].color).getSourceImage();

        ballInfo = {
            width: ballTexture.width,
            height: ballTexture.height,
            count: {
                row: 6,
                col: 6
            },
            padding: 5
        };

        balls = this.add.group();
    };

    getBallsPosition() {

        let gapLeft = (this.sys.game.config.width - ((ballInfo.width * ballInfo.count.row) - (ballInfo.padding * ballInfo.count.row))) / 2;

        let gapTop = (this.sys.game.config.height - ((ballInfo.height * ballInfo.count.col) - (ballInfo.padding * ballInfo.count.col))) / 2;

        for (let c = 0; c < ballInfo.count.col; c++) {
            for (let r = 0; r < ballInfo.count.row; r++) {

                let currentBallIndex = randomNumber(0, Number(rounds.length));
                var ballX = (c * (ballInfo.width + ballInfo.padding)) + gapLeft;
                var ballY = -53;

                var newBallY = r * 53;
                newBallsArr.push({ newY: newBallY });
                balls.add(new Ball(this, ballX, ballY, currentBallIndex, ballInfo.id, balls));
            }
        }
    };

    drawLine() {

        var graphics = this.add.graphics();

        this.input.on('pointermove', function (pointer) {
            if (pointer.isDown && drawing == true) {

                cx = pointer.x;
                cy = pointer.y;
                
                graphics.clear();
                graphics.lineStyle(4, ballColor);
                graphics.beginPath();
                graphics.moveTo(pointer.x, pointer.y);
                graphics.lineTo(drawStartX, drawStartY);
                graphics.strokePath();

                
                
                // console.log(pointer.x, pointer.y);

                if(pointer.x > 380 || pointer.x < 85 || pointer.y > 325 || pointer.y < 40){
                    drawing = false;
                    graphics.clear();
                    ballsForDelete = [];
                }
            }

            if(drawing == false){
                graphics.clear();
            }
        });

        // this.input.on('pointerup', function (pointer) {
        //     if(!pointer.x || !pointer.y){
        //         drawing = false;
        //         graphics.clear();
        //         ballsForDelete = [];
        //     }
        // });
    };
}
