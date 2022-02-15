class Ball extends Phaser.GameObjects.Sprite {
    constructor(scene, ballX, ballY, currentBallIndex, ballId, balls) {
        super(scene, ballX, ballY, rounds[currentBallIndex].color);
        this.balls = balls;
        this.scene = scene;
        this.ballId = ballId;
        this.draw = false;
        this.setOrigin(0.5);
        this.scene.add.existing(this);

        this.setInteractive();

        this.inputEnabled = true;
        context = this.scene;

        this.on('pointermove', Game.prototype.drawLine, this.scene);
        this.on('pointerdown', this.startAddinbBalls, this);
        this.on('pointerover', this.addBallToArray, this);
        this.on('pointerup', this.endOfAdd, this);
    }

    startAddinbBalls() {
        ballColor = this.texture.key;

        ballsForDelete.push(this);
        drawStartX = this.x;
        drawStartY = this.y;
        if(!drawStartX || !drawStartY){
            ballsForDelete =  [];
        }
        drawing = true;
    }

    addBallToArray() {
        if (drawing) {
            let doubleBall = ballsForDelete.find((ball) => (this.x == ball.x && this.y == ball.y))

            if(this.texture.key != ballsForDelete[0].texture.key || !this.texture.key){
                ballsForDelete = [];
            }

            if (doubleBall) {
                ballsForDelete.splice(ballsForDelete.length - 2);
            }

            ballsForDelete.push(this);

            ((Math.round(this.x/10)*10) != Math.round(ballsForDelete[0].x/10)*10 && Math.round(this.y/10)*10 != Math.round(ballsForDelete[0].y/10)*10) ? ballsForDelete = [] : (this.x == ballsForDelete[0].x) ? ballPosNum = ballsForDelete.length : ballPosNum = 1;
        }
    }

    endOfAdd() {
        console.log('up!');
        drawing = false;
        (!cx || !cy) ? ballsForDelete = [] : 0;
        (ballsForDelete.length > 1) ? this.deleteBalls() : ballsForDelete = [];
    };

    deleteBalls() {       
        ballIndX = this.x;

        ballsForDelete.forEach((item) => {
            item.destroy();
        })
        scoreCount += ballsForDelete.length;
        scoreText.setText('Score: ' + scoreCount);

        this.velocity();
    }

    changeBallPos() {
        newPos = newPosArr[counter - 1];

        return newPos;
    };

    velocity() {
        let ballsArray = balls.children.entries;
        ballsForMovingArr = [];
        genArrPos = [];
        ballsForDelete.forEach((item) => {
            newPosArr = [];
            counter = 0;
            ballsAboveDeletedBallArr = ballsArray.filter((elem) => (elem.x == item.x && elem.y < item.y));

            ballsForMovingArr.push(...ballsAboveDeletedBallArr);

            ballsForMovingArr.forEach((item) => {
                newPosArr.push(item.y + (53 * ballPosNum));
            });
        });

        this.addNewBall(-53);
        this.tween(ballsForMovingArr);
    }

    tween(genArr) {
        context.tweens.add({
            onRepeate: () => {
                counter++;
                this.changeBallPos();
            },
            targets: genArr,
            y: this.changeBallPos,
            duration: 1000,
            ease: 'Sine.easeInOut',
            repeat: 0,
            delay: context.tweens.stagger(100),
            onComplete: () => {
                counter = 0;
                newPosArr = [];
                ballsAboveDeletedBallArr = [];
                ballsForDelete = [];
            }
        });
    };

    addNewBall(coordY) {
        addedBallsArr = [];
        addedBallsPosArr = [];

        ballsForDelete.forEach((ballItem, itemIndex)=>{

            let currentBallIndex = randomNumber(0, Number(rounds.length));
            let ballX = ballItem.x;
            let ballY = coordY; 
            
            newBall = context.add.sprite(ballX, ballY, rounds[currentBallIndex].color);

            newBall = new Ball(context, ballX, ballY, currentBallIndex, ballInfo.id, balls);
            balls.add(newBall);

            addedBallsArr.push(newBall);
            
            if(ballPosNum == 1){
                addedBallsPosArr.push(coordY + 106);
            }else{
                addedBallsPosArr.push(Math.floor((coordY + (53*(itemIndex+2)))));
            }
        });

        this.tweenForAddBalls(addedBallsArr);
    };

    changeAddedBallPos(){
        let newAddedBallPos = addedBallsPosArr[addedBallCount-1];

        return newAddedBallPos;
    };

    tweenForAddBalls(addBallsArr) {
        context.tweens.add({
            onRepeate: () => {
                addedBallCount++;
                this.changeAddedBallPos();
            },
            targets: addBallsArr,
            y: this.changeAddedBallPos,
            duration: 1000,
            ease: 'Sine.easeInOut',
            repeat: 0,
            delay: context.tweens.stagger(100),
            onComplete: () => {
                addedBallCount = 0;
                ballsForDelete = [];
            }
        });
    }
}