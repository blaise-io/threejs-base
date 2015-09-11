function Controls(snake) {
    this.snake = snake;
    document.onkeydown = this.setDirection.bind(this);
}

Controls.prototype = {

    setDirection: function(event) {

        if (this.snake.directionBuffer.length >= 2) {
            return false;
        }

        switch (event.keyCode) {
            case 37:
                // Left key.
                event.preventDefault();
                this.snake.directionBuffer.push(CONST.LEFT);
                break;
            case 38:
                // Up key.
                event.preventDefault();
                this.snake.directionBuffer.push(CONST.UP);
                break;
            case 39:
                // Right Key.
                event.preventDefault();
                this.snake.directionBuffer.push(CONST.RIGHT);
                break;
            case 40:
                // Down key.
                event.preventDefault();
                this.snake.directionBuffer.push(CONST.DOWN);
                break;
        }

    }
};
