var backgroundCanvas = document.getElementById('backgroundGame');
var backgroundContext = backgroundCanvas.getContext('2d');
var snakeCanvas = document.getElementById('game');
var snakeContext = backgroundCanvas.getContext('2d');


var count = 0;
var score = 0;

var keyLog;

var gameZone = {
    x: 0,
    y: 0,
    height: 10,
    width: 10,
    grid: 32
}


var snake = {
    x: 10,
    y: 10,
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

// listen to keyboard events to move the snake
document.addEventListener('keydown', function (e) {

    // if > dieu kien bo sung sau
    if (!keyLog) { keyLog = e.key }
    console.log(keyLog);

    // init new snake cell = head snake cell
    let newSnakeLocation = { ...snake.cells[0] };

    // left arrow key & update snake cell location
    if (e.key == 'ArrowLeft' || e.key == 'a') {
        if (keyLog == 'ArrowRight' || keyLog == 'd') {
            console.log(`press key ${e.key} error`);
        } else newSnakeLocation.x = snake.cells[0].x - gameZone.grid;
    }
    else if (e.key == 'ArrowUp' || e.key == 'w') {
        if (keyLog == 'ArrowDown' || keyLog == 's') {
            console.log(`press key ${e.key} error`);
        } else newSnakeLocation.y = snake.cells[0].y - gameZone.grid;
    }
    else if (e.key == 'ArrowRight' || e.key == 'd') {
        if (keyLog == 'ArrowLeft' || keyLog == 'a') {
            console.log(`press key ${e.key} error`);
        } else
            newSnakeLocation.x = snake.cells[0].x + gameZone.grid;
    }
    else if (e.key == 'ArrowDown' || e.key == 's') {
        if (keyLog == 'ArrowUp' || keyLog == 'w') {
            console.log(`press key ${e.key} error`);
        } else {
            newSnakeLocation.y = snake.cells[0].y + gameZone.grid;
        }

    }

    //final snake cell
    //add cell to snake cells
    if (newSnakeLocation.x == snake.cells[0].x && newSnakeLocation.y == snake.cells[0].y) {
        console.log(`Press ERROR!`)
    } else {
        ; newSnakeLocation.color = randomColorCode();
        snake.cells.unshift(newSnakeLocation);
        keyLog = e.key;

    }

    //rerender
    if (isEating(food, snake.cells[0])) {
        drawFood()
    } else removeTail();
    drawSnake(snake.cells)
});


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
    backgroundContext.fillStyle = '#727271';

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
            { x: gameZone.grid * 6, y: gameZone.grid * 4, count: count++, color: randomColorCode() },
            { x: gameZone.grid * 5, y: gameZone.grid * 4, count: count++, color: randomColorCode() },
            { x: gameZone.grid * 4, y: gameZone.grid * 4, count: count++, color: randomColorCode() }
            // ,
            // { x: gameZone.grid * 3, y: gameZone.grid * 4, count: count++, color: randomColorCode() },
            // { x: gameZone.grid * 2, y: gameZone.grid * 4, count: count++, color: randomColorCode() },
            // { x: gameZone.grid * 1, y: gameZone.grid * 4, count: count++, color: randomColorCode() },
            // { x: gameZone.grid * 0, y: gameZone.grid * 4, count: count++, color: randomColorCode() }
        ]
        console.log(`init snake:`, snakeCells);
        snake.cells = snakeCells;
    }

    let minSize = gameZone.grid / 4, maxSize = gameZone.grid / 2;
    let size = maxSize;
    let upSize = (maxSize - minSize) / snake.cells.length;

    snake.cells.forEach(function (cell, index) {

        //remove old cell
        snakeContext.clearRect(cell.x, cell.y, gameZone.grid, gameZone.grid);
        //draw new cell
        snakeContext.beginPath();
        snakeContext.arc(cell.x + gameZone.grid / 2, cell.y + gameZone.grid / 2, size, 0, 2 * Math.PI);
        size -= upSize;
        snakeContext.fillStyle = cell.color;
        snakeContext.fill();
    }

    );
}

function drawFood() {
    let foodX = getRandomInt(1, gameZone.height - 1) * gameZone.grid;
    let foodY = getRandomInt(1, gameZone.width - 1) * gameZone.grid;

    snake.cells.forEach(cell => {
        if (cell.x == foodX && cell.y == foodX) drawFood()
    })

    console.log(`check eat x:${foodX} y:${foodY}`);
    food.x = foodX, food.y = foodY
    snakeContext.fillStyle = randomColorCode();
    snakeContext.fillRect(foodX, foodY, gameZone.grid, gameZone.grid);
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
        `AliceBlue`,
        `AntiqueWhite`,
        `Aqua`,
        `Aquamarine`,
        `Azure`,
        `Beige`,
        `Bisque`,
        `BlanchedAlmond`,
        `Blue`,
        `BlueViolet`,
        `Brown`,
        `BurlyWood`,
        `CadetBlue`,
        `Chartreuse`,
        `Chocolate`,
        `Coral`,
        `CornflowerBlue`,
        `Cornsilk`,
        `Crimson`,
        `DarkViolet`,
        `DeepPink`,
        `DeepSkyBlue`,
        `DimGray`,
        `DimGrey`,
        `DodgerBlue`,
        `FireBrick`,
        `FloralWhite`,
        `ForestGreen`,
        `Fuchsia`,
        `Gainsboro`,
        `GhostWhite`,
        `Gold`,
        `GoldenRod`,
        `Grey`,
        `Green`,
        `GreenYellow`,
        `HoneyDew`,
        `HotPink`,
        `IndianRed`,
        `Indigo`,
        `Ivory`,
        `Khaki`,
        `Lavender`,
        `LavenderBlush`,
        `LawnGreen`,
        `LemonChiffon`,
        `LightBlue`,
        `LightCoral`,
        `LightCyan`,
        `LightGoldenRodYellow`,
        `LightGray`,
        `LightGrey`,
        `LightGreen`,
        `LightPink`,
        `LightSalmon`,
        `LightSeaGreen`,
        `LightSkyBlue`,
        `LightSlateGray`,
        `LightSlateGrey`,
        `LightSteelBlue`,
        `LightYellow`,
        `Lime`,
        `LimeGreen`,
        `Linen`,
        `Magenta`,
        `Maroon`,
        `MediumAquaMarine`,
        `MediumBlue`,
        `MediumOrchid`,
        `MediumPurple`,
        `MediumSeaGreen`,
        `MediumSlateBlue`,
        `MediumSpringGreen`,
        `MediumTurquoise`,
        `MediumVioletRed`,
        `MidnightBlue`,
        `MintCream`,
        `MistyRose`,
        `Moccasin`,
        `NavajoWhite`,
        `Navy`,
        `OldLace`,
        `Olive`,
        `OliveDrab`,
        `Orange`,
        `OrangeRed`,
        `Orchid`,
        `PaleGoldenRod`,
        `PaleGreen`,
        `PaleTurquoise`,
        `PaleVioletRed`,
        `PapayaWhip`,
        `PeachPuff`,
        `Peru`,
        `Pink`,
        `Plum`,
        `PowderBlue`,
        `Purple`,
        `Red`,
        `RosyBrown`,
        `RoyalBlue`,
        `SaddleBrown`,
        `Salmon`,
        `SandyBrown`,
        `SeaGreen`,
        `SeaShell`,
        `Sienna`,
        `Silver`,
        `SkyBlue`,
        `SlateBlue`,
        `SlateGray`,
        `SlateGrey`,
        `Snow`,
        `SpringGreen`,
        `SteelBlue`,
        `Tan`,
        `Teal`,
        `Thistle`,
        `Tomato`,
        `Turquoise`,
        `Violet`,
        `Wheat`,
        `White`,
        `WhiteSmoke`,
        `Yellow`,
        `YellowGreen`,
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
