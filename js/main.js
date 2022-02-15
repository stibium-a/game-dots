let scoreText;
let scoreCount = 0;
let newBallYPosition = 0;
let count = 0;
let balls;
let newBall;
let ballInfo;

let ballsForDelete = [];
let newBallsArr = [];
let ballXArr= [];
let ballsAboveDeletedBallArr= [];
let addedBallsArr= [];
let newPosArr = [];
let ballsForMovingArr = [];
let genArrPos = [];
let addedBallsPosArr = [];

let context;

let ballIndX;
let ballIndY;

let ballColor = '';
let drawing = false;

let counter = 0;
let newPos = 0;

let ballPosNum = 1;

let addedBallCount = 0;

let drawStartX = 0;
let drawStartY = 0;

let cx = 0;
let cy = 0;

function randomNumber(min, max) {
    const random = Math.floor(Math.random() * (max - min) + min);
    return random;
}

let rounds = [
    {
        color: '0x0bab35', //green
        src: 'img/greenRound2.png',
        id: 1
    },
    {
        color: '0x50c7eb', //blue
        src: 'img/blueRound2.png',
        id: 2
    },
    {
        color: '0xeb2027', //red
        src: 'img/redRound.png',
        id: 3
    },
    {
        color: '0xbb80b7', //violet
        src: 'img/violetRound.png',
        id: 4    
    },
    {
        color: '0xfdd606', //yellow
        src: 'img/yellowRound.png',
        id: 5
    },
];

let config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 480,
    height: 350,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: new Game()
};

let game = new Phaser.Game(config);



