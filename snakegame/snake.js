var backgroundCanvas = document.getElementById('backgroundGame');
var backgroundContext = backgroundCanvas.getContext('2d');
var snakeCanvas = document.getElementById('game');
var snakeContext = backgroundCanvas.getContext('2d');


var count = 0;
var score = 0;

//huong di ban dau
var keyLog = "ArrowRight";

var gameZone = {
    x: 0,
    y: 0,
    height: 15,
    width: 15,
    grid: 32
}

var level = [
    {
        speed: 2,
        color: 'green'
    },
    {
        speed: 3,
        color: 'yellow'
    },
    {
        speed: 4,
        color: 'blue'
    },
    {
        speed: 5,
        color: 'red'
    }
]

function getLevel(_score){
    if(_score>10){
        console.log(`level 3 ${_score}`);
        return level[3]
    }else if(_score>5){
        console.log(`level 2`);
        return level[2]
    }else if(_score>2){
        console.log(`level 1`);
        return level[1]
    }else 
   { console.log(`level 0  ${_score}`);return level[0]}
}

var snake = {
    x: 2,
    y: 2,
    // snake velocity. moves one gameZone.grid length every frame in either the x or y direction
    dx: gameZone.grid,
    dy: 0,
    // keep track of all gameZone.grids the snake body occupies
    cells: [],
    // length of the snake. grows when eating an apple
    maxCells: 4
};
var food = {
    x: gameZone.grid * 2,
    y: gameZone.grid * 2
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//auto moving
setInterval(function () {
    snakeMoving(getNextStep(keyLog));
}, 500/getLevel(score).speed)



// listen to keyboard events to move the snake
document.addEventListener('keydown', function (e) {

    if (e.key == keyLog) return
    // if > dieu kien bo sung sau
    if (!keyLog) { keyLog = e.key }
    console.log(keyLog);
    let newSnakeLocation = getNextStep(e.key);
    snakeMoving(newSnakeLocation);
    keyLog = e.key;

});

function snakeMoving(nextStep) {
    if (nextStep.x == snake.cells[0].x && nextStep.y == snake.cells[0].y) {
        console.log(`Press ERROR!`)
    } else {
        console.log(`Press OK!`)
        //nextStep.color = getLevel(score).color;
        snake.cells.unshift(nextStep);

        //check eat food
        if (isEating(food, snake.cells[0])) {
            drawFood()
        } else removeTail();

        //check gameover
        if (isGameOver(snake.cells)) {
            resetGame();

            drawFood()
            alert(`Game over!`)
        }

        //rerender
        drawSnake(snake.cells)

    }
}

function getNextStep(_key) {
    // init new snake cell = head snake cell
    let newSnakeLocation = { ...snake.cells[0] };

    // left arrow key & update snake cell location
    if (_key == 'ArrowLeft' || _key == 'a') {
        if (keyLog == 'ArrowRight' || keyLog == 'd') {
            console.log(`press key ${_key} error`);
        } else {
            if (snake.cells[0].x <= gameZone.x * gameZone.grid) {
                newSnakeLocation.x = (gameZone.width - 1) * gameZone.grid;
                newSnakeLocation.y = getRandomInt(gameZone.y, gameZone.height) * gameZone.grid;
            } else
                newSnakeLocation.x = snake.cells[0].x - gameZone.grid;
        }
    }
    else if (_key == 'ArrowUp' || _key == 'w') {
        if (keyLog == 'ArrowDown' || keyLog == 's') {
            console.log(`press key ${_key} error`);
        } else {
            if (snake.cells[0].y <= gameZone.y * gameZone.grid) {
                newSnakeLocation.x = getRandomInt(gameZone.x, gameZone.width) * gameZone.grid;
                newSnakeLocation.y = (gameZone.height - 1) * gameZone.grid;
            } else
                newSnakeLocation.y = snake.cells[0].y - gameZone.grid;
        }
    }
    else if (_key == 'ArrowRight' || _key == 'd') {
        if (keyLog == 'ArrowLeft' || keyLog == 'a') {
            console.log(`press key ${_key} error`);
        } else {
            if (snake.cells[0].x >= (gameZone.width - 1) * gameZone.grid) {
                newSnakeLocation.x = 0 * gameZone.grid;
                newSnakeLocation.y = getRandomInt(gameZone.y, gameZone.height) * gameZone.grid;
            } else
                newSnakeLocation.x = snake.cells[0].x + gameZone.grid;
        }

    }
    else if (_key == 'ArrowDown' || _key == 's') {
        if (keyLog == 'ArrowUp' || keyLog == 'w') {
            console.log(`press key ${_key} error`);
        } else {
            if (snake.cells[0].y >= (gameZone.height - 1) * gameZone.grid) {
                newSnakeLocation.x = getRandomInt(gameZone.x, gameZone.width) * gameZone.grid;
                newSnakeLocation.y = 0;
                console.log(`newSnakeLocation`, newSnakeLocation);
            } else
                newSnakeLocation.y = snake.cells[0].y + gameZone.grid;
        }

    }
    return newSnakeLocation;
}


function gamePlay() {
    //gird*number of cell
    drawBackground(gameZone.grid * gameZone.height, gameZone.grid * gameZone.width);
    drawSnake(snake.cells);
    drawFood(food.x, food.y)
}
gamePlay();


function drawBackground(height, width) {
    console.log(`drawBackground(${height},${width})`)
    backgroundCanvas.width = width;
    backgroundCanvas.height = height;

    //caro style
    let bg = []
    if (bg.length == 0) {
        for (let i = 0; i < width / gameZone.grid; i++) {
            for (let y = 0; y < height / gameZone.grid; y++) {
                if (i % 2 == 0 && y % 2 == 1)
                    bg.unshift({ x: gameZone.grid * i, y: gameZone.grid * y });
                if (i % 2 == 1 && y % 2 == 0)
                    bg.unshift({ x: gameZone.grid * i, y: gameZone.grid * y });
            }
        }

    }
    // draw snake one cell at a time
    backgroundContext.fillStyle = '#000';

    //console.log(`snake.cells ${snake.cells.length}`)
    bg.forEach(function (cell, index) {
        //console.log(`cell ${index} info" `,cell)

        // drawing 1 px smaller than the gameZone.grid creates a gameZone.grid effect in the snake body so you can see how long it is
        backgroundContext.fillRect(cell.x, cell.y, gameZone.grid, gameZone.grid);
        // console.log(cell.x,cell.y,gameZone.grid,gameZone.grid)
    });
}

function drawSnake(snakeCells = []) {

    if (snakeCells.length == 0) {
        // khoi tao
        snakeCells = [
            { x: gameZone.grid * 3, y: gameZone.grid * 1, count: count++, color: getLevel(score).color },
            { x: gameZone.grid * 2, y: gameZone.grid * 1, count: count++, color: getLevel(score).color },
            { x: gameZone.grid * 1, y: gameZone.grid * 1, count: count++, color: getLevel(score).color }
        ]
        console.log(`init snake:`, snakeCells);
        snake.cells = snakeCells;
    }

    let minSize = gameZone.grid / 4, maxSize = gameZone.grid / 2;
    let size = maxSize;
    let upSize = (maxSize - minSize) / snake.cells.length;

    snakeCells.forEach(function (cell, index) {

        //remove old cell
        snakeContext.clearRect(cell.x, cell.y, gameZone.grid, gameZone.grid);
        //draw new cell
        snakeContext.beginPath();
        snakeContext.arc(cell.x + gameZone.grid / 2, cell.y + gameZone.grid / 2, size, 0, 2 * Math.PI);
        size -= upSize;
        snakeContext.fillStyle = getLevel(score).color;
        snakeContext.fill();
    }

    );
}

function ClearSnake(snakeCells = []) {

    snake.cells.forEach(function (cell, index) {

        //remove old cell
        snakeContext.clearRect(cell.x, cell.y, gameZone.grid, gameZone.grid);
    }
    );
}

async function drawFood() {
    console.log(`drawFood()`);
    snakeContext.fillStyle = randomColorCode();
    food = await getFoodLocation(snake.cells, gameZone)
    snakeContext.fillRect(food.x, food.y, gameZone.grid, gameZone.grid);
}

function getFoodLocation(snakeCells = [], _game) {
    console.log(`getFoodLocation()`, snakeCells, _game);
    let foodX, foodY, isOk = false, findCount = 0;

    while (!isOk) {
        isOk = true;
        foodX = getRandomInt(0, _game.height) * _game.grid;
        foodY = getRandomInt(0, _game.width) * _game.grid;
        snakeCells.forEach(cell => {
            if (cell.x == foodX && cell.y == foodY) {
                console.log(`refind`);
                isOk = false;
            }
        })
        findCount++;
        if (findCount == snakeCells.length - 1) {
            isOk = false;
            //reset game
            resetGame();
            alert(`You are winner`);
            break;
        }
    }

    console.log(` getFoodLocation check eat x:${foodX} y:${foodY}`);
    return { x: foodX, y: foodY }
}
function resetGame() {
    snakeContext.fillStyle = '#000';
    snakeContext.fillRect(gameZone.x, gameZone.y, gameZone.width * gameZone.grid, gameZone.height * gameZone.grid)
    snake.cells = snake.cells.slice(0, 3);
    console.log(snake.cells);
    drawSnake(snake.cells)
    score = 0;
    document.getElementById('score').textContent = score;
}
function removeTail() {

    let tail = snake.cells[snake.cells.length - 1];
    //remove in ui
    snakeContext.clearRect(tail.x, tail.y, gameZone.grid, gameZone.grid);
    //remove in arr
    snake.cells.pop();
    console.log(`leng: ${snake.cells.length}`);
    drawSnake(snake.cells)
}

function randomColorCode() {
    let colors = [
        "Blue ", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow "
    ]
    return colors[Math.floor(Math.random() * colors.length)];
}

function randomName() {
    var nameList = [
        'Time', 'Past', 'Future', 'Dev',
        'Fly', 'Flying', 'Soar', 'Soaring', 'Power', 'Falling',
        'Fall', 'Jump', 'Cliff', 'Mountain', 'Rend', 'Red', 'Blue',
        'Green', 'Yellow', 'Gold', 'Demon', 'Demonic', 'Panda', 'Cat',
        'Kitty', 'Kitten', 'Zero', 'Memory', 'Trooper', 'XX', 'Bandit',
        'Fear', 'Light', 'Glow', 'Tread', 'Deep', 'Deeper', 'Deepest',
        'Mine', 'Your', 'Worst', 'Enemy', 'Hostile', 'Force', 'Video',
        'Game', 'Donkey', 'Mule', 'Colt', 'Cult', 'Cultist', 'Magnum',
        'Gun', 'Assault', 'Recon', 'Trap', 'Trapper', 'Redeem', 'Code',
        'Script', 'Writer', 'Near', 'Close', 'Open', 'Cube', 'Circle',
        'Geo', 'Genome', 'Germ', 'Spaz', 'Shot', 'Echo', 'Beta', 'Alpha',
        'Gamma', 'Omega', 'Seal', 'Squid', 'Money', 'Cash', 'Lord', 'King',
        'Duke', 'Rest', 'Fire', 'Flame', 'Morrow', 'Break', 'Breaker', 'Numb',
        'Ice', 'Cold', 'Rotten', 'Sick', 'Sickly', 'Janitor', 'Camel', 'Rooster',
        'Sand', 'Desert', 'Dessert', 'Hurdle', 'Racer', 'Eraser', 'Erase', 'Big',
        'Small', 'Short', 'Tall', 'Sith', 'Bounty', 'Hunter', 'Cracked', 'Broken',
        'Sad', 'Happy', 'Joy', 'Joyful', 'Crimson', 'Destiny', 'Deceit', 'Lies',
        'Lie', 'Honest', 'Destined', 'Bloxxer', 'Hawk', 'Eagle', 'Hawker', 'Walker',
        'Zombie', 'Sarge', 'Capt', 'Captain', 'Punch', 'One', 'Two', 'Uno', 'Slice',
        'Slash', 'Melt', 'Melted', 'Melting', 'Fell', 'Wolf', 'Hound',
        'Legacy', 'Sharp', 'Dead', 'Mew', 'Chuckle', 'Bubba', 'Bubble', 'Sandwich', 'Smasher', 'Extreme', 'Multi', 'Universe', 'Ultimate', 'Death', 'Ready', 'Monkey', 'Elevator', 'Wrench', 'Grease', 'Head', 'Theme', 'Grand', 'Cool', 'Kid', 'Boy', 'Girl', 'Vortex', 'Paradox'
    ];
    return nameList[Math.floor(Math.random() * nameList.length)];

}

function isEating(_food, snakeHead) {
    console.log(`check eat`, _food, snakeHead);
    if (snakeHead.x == _food.x && snakeHead.y == _food.y) {
        document.getElementById('score').textContent = ++score
        return true;
    }
    return false
}

function isGameOver(snakeCells, _game) {
    // tu can than ran           
    for (let i = 3; i < snakeCells.length; i++) {
        console.log(`isGameOver `, snakeCells[0], snakeCells[i]);
        if (snakeCells[0].x == snakeCells[i].x && snakeCells[0].y == snakeCells[i].y) {
            return true;
        }
    }
    return false;
    //vat can
}
