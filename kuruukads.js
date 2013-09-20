window.onload = function() {
    var settings = {
        width: 600,
        height: 300,
        max_speed: 20,
        level: 0
    };


    Crafty.init(settings.width, settings.height);
    Crafty.background('url(images/bg.jpg)');

    // Player
    Crafty.e("Paddle, 2D, DOM, Color, Keyboard")
        .color('rgb(200, 200, 200)')
        .attr({
            x: 300,
            y: 150,
            w: 10,
            h: 10,
            dx: 0,
            dy: 0,
            ax: 0,
            ay: 0
        })
        .bind('EnterFrame', function() {
            if(this.isDown("RIGHT_ARROW")) this.ax = 0.1; 
            if(this.isDown("LEFT_ARROW")) this.ax = -0.1; 
            if(this.isDown("UP_ARROW")) this.ay = -0.1; 
            if(this.isDown("DOWN_ARROW")) this.ay = 0.1; 
            this.dx += this.ax;
            if(this.dx > settings.max_speed) { this.dx = settings.max_speed; }
            if(this.dx < -settings.max_speed) { this.dx = -settings.max_speed; }
            if(this.dy > settings.max_speed) { this.dy = settings.max_speed; }
            if(this.dy < -settings.max_speed) { this.dy = -settings.max_speed; }
            this.dy += this.ay;
            this.x += this.dx;
            this.y += this.dy;
            if(this.x < 0) { this.x = settings.width; }
            if(this.x > settings.width) { this.x = 0; }
            if(this.y < 0) { this.y = settings.height; }
            if(this.y > settings.height) { this.y = 0; }
        });

    Crafty.e("RightPoints, DOM, 2D, Text")
        .attr({ x: 515, y: 20, w: 100, h: 20, points: 0 })
        .text("0 Points");


    // Common
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Resources
    var setResource = function() {
        var coordX = getRandomInt(0, settings.width);
        var coordY = getRandomInt(0, settings.height);
        Crafty.e("2D, DOM, Color, Collision")
            .color('green')
            .attr({x: coordX, y: coordY, w:10, h:10})
            .onHit('Paddle', function() {
                setResource();
                setMeteorit();
                Crafty("RightPoints").each(function() {
                    this.text(++this.points + " Points");
                });
                this.destroy();
            });
    }

    // Meteorits
    var setMeteorit = function() {
        var coordX = getRandomInt(0, settings.width);
        var coordY = getRandomInt(0, settings.height);
        Crafty.e("2D, DOM, Color, Collision")
            .color('red')
            .attr({x: coordX, y: coordY, w:10, h:10})
            .onHit('Paddle', function() {
                alert("GAME OVER");
            });
    }

    // Start
    setResource();
};
