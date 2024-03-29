    const BG_COLOUR = '#1BAC58'; // green
    const SNAKE_COLOUR = '#000000'; // black 
    const FOOD_COLOUR = '#000000'; // black

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 800;
    canvas.height = 500;
    let score = 0;
    const FR = 24; //frame rate
    const S = 20; //screensize
    const T = canvas.width / S;
    const Hs = canvas.height / S; // I declared that separetly cause otherwise i does not allow me to have succesful random function 
    let pos, vel, food, snake;

    function init() {
        pos = {
            x: 10,
            y: 10

        };
        vel = {
            x: 0,
            y: 0
        };

        snake = [{ //pixel pixel each peace of snake
                x: 8,
                y: 10
            },
            {
                x: 9,
                y: 10
            },
            {
                x: 10,
                y: 10
            },
            {
                x: 11,
                y: 10
            },
            {
                x: 12,
                y: 10
            },
            {
                x: 13,
                y: 10
            },
        ]
        score = 0;
        randomFood();
    }

    init();

    function randomFood() {
        food = { //cordinates of the food
            x: Math.floor(Math.random() * T),
            y: Math.floor(Math.random() * Hs),
        }

        for (let cell of snake) { //if random food comes up on the snake .we want call the new random food
            if (cell.x === food.x && food.y === cell.y) {
                return randomFood();
            }
        }
    }
    setTimeout(document.addEventListener('keydown', keydown), 2000);


    function keydown(e) {
        var delay = 2000;
        switch (e.keyCode) {
            case 37: {

                if ((vel.x == 1 && vel.y == 0)) {
                    return vel = {
                        x: 0,
                        y: -1
                    }

                } else {
                    return vel = {

                        x: -1,
                        y: 0

                    }

                }
            }
            case 38: {

                if (vel.x == 0 && vel.y == 1) {
                    return vel = {
                        x: -1,
                        y: 0
                    }

                } else {
                    return vel = {
                        x: 0,
                        y: -1
                    }
                }
                delay;




            }
            case 39: {


                if (vel.x == -1 && vel.y == 0) {
                    return vel = {
                        x: 0,
                        y: -1
                    }

                } else {
                    return vel = {
                        x: 1,
                        y: 0
                    }

                }
                delay;




            }
            case 40: {

                if (vel.x == 0 && vel.y == -1) {
                    return vel = {
                        x: 1,
                        y: 0
                    }

                } else {
                    return vel = {
                        x: 0,
                        y: 1
                    }

                }
                delay;


            }

            default: // do nothing;
                break;
        }
    }

    setInterval(() => { // delay when you presed the button
        requestAnimationFrame(gameLoop);
    }, 2000 / FR);

    function gameLoop() {
        ctx.fillStyle = BG_COLOUR;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = SNAKE_COLOUR;
        for (let cell of snake) {
            ctx.fillRect(cell.x * S, cell.y * S, S, S);
        }

        ctx.fillStyle = FOOD_COLOUR;
        ctx.fillRect(food.x * S, food.y * S, S, S);

        pos.x += vel.x;
        pos.y += vel.y;

        if (pos.x < 0 || pos.x > T || pos.y < 0 || pos.y > Hs) { //if you touch border
            init();
            text.innerHTML = 0;

        }

        if (food.x === pos.x && food.y === pos.y) { //eating the apple 
            snake.push({ // add a piece to the snake
                ...pos
            });
            pos.x += vel.x;
            pos.y += vel.y;
            randomFood();
            score = score + 10;
            console.log(score);
            text.innerHTML = score;


        }

        if (vel.x || vel.y) { // if the snake croos itself you die and start again
            for (let cell of snake) {
                if (cell.x === pos.x && cell.y === pos.y) {
                    return init();
                }
            }
            snake.push({
                ...pos
            });
            snake.shift();
        }
    }