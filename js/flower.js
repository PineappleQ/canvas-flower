(function (window, undefined) {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var colors = ["#00CCFF", "#00FF33", "#CC0099", "#CC6666", "#FF0099", "#FFFF33"];
    var flowers = [];
    var r = 9;
    var radian;//弧度  
    var i;
    var radianDecrement;//弧度增量  
    var time = 10;//每个点之间的时间间隔  
    var intervalId;
    var num = 360;//分割为 360 个点  
    var startRadian = Math.PI;
    function Flower(x, y, r, ctrlHeight, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.ctrlHeight = ctrlHeight;
        this.color = color;
    }

    function startAnimation() {
        //让画布撑满整个屏幕，-20是滚动条的位置，需留出。如滚动条出现则会挤压画布。  
        WINDOW_HEIGHT = document.documentElement.clientHeight;
        WINDOW_WIDTH = document.documentElement.clientWidth;
        canvas.width = WINDOW_WIDTH;
        canvas.height = WINDOW_HEIGHT;
        // drawHeart();
        var flower = createFlower();
        flower.draw();
    }

    Flower.prototype.draw = function () {
        var printPoints = buildPoints(this.r, this.ctrlHeight);
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.beginPath();
        ctx.moveTo(printPoints[0].x, printPoints[0].y);
        ctx.quadraticCurveTo(printPoints[0].ctrlX, printPoints[0].ctrlY, printPoints[1].x, printPoints[1].y);
        ctx.quadraticCurveTo(printPoints[1].ctrlX, printPoints[1].ctrlY, printPoints[2].x, printPoints[2].y);
        ctx.quadraticCurveTo(printPoints[2].ctrlX, printPoints[2].ctrlY, printPoints[3].x, printPoints[3].y);
        ctx.quadraticCurveTo(printPoints[3].ctrlX, printPoints[3].ctrlY, printPoints[4].x, printPoints[4].y);
        ctx.quadraticCurveTo(printPoints[4].ctrlX, printPoints[4].ctrlY, printPoints[5].x, printPoints[5].y);
        ctx.quadraticCurveTo(printPoints[5].ctrlX, printPoints[5].ctrlY, printPoints[0].x, printPoints[0].y);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    function createFlower() {
        var x = canvas.width / 2;
        var y = canvas.height / 2;
        var r = 10;
        var ctrlHeight = r * 2;
        var color = colors[Math.floor(Math.random() * colors.length)];
        var flower = new Flower(x, y, r, ctrlHeight, color);
        return flower;
    }

    function buildPoints(r, ctrlHeight) {
        var points = [];
        for (var i = 0; i < 6; i++) {
            var point = {};
            switch (i) {
                case 0:
                    point.x = -r / 2;
                    point.y = Math.cos(Math.PI / 6) * r * -1;
                    point.ctrlX = 0;
                    point.ctrlY = ctrlHeight * -1;
                    points.push(point);
                    break;
                case 1:
                    point.x = r / 2;
                    point.y = Math.cos(Math.PI / 6) * r * -1;
                    point.ctrlX = Math.cos(Math.PI / 6) * ctrlHeight;
                    point.ctrlY = ctrlHeight / 2 * -1;
                    points.push(point);
                    break;
                case 2:
                    point.x = r;
                    point.y = 0;
                    point.ctrlX = Math.cos(Math.PI / 6) * ctrlHeight;
                    point.ctrlY = ctrlHeight / 2;
                    points.push(point);
                    break;
                case 3:
                    point.x = r / 2;
                    point.y = Math.cos(Math.PI / 6) * r;
                    point.ctrlX = 0;
                    point.ctrlY = ctrlHeight;
                    points.push(point);
                    break;
                case 4:
                    point.x = -r / 2;
                    point.y = Math.cos(Math.PI / 6) * r;
                    point.ctrlX = Math.cos(Math.PI / 6) * ctrlHeight * -1;
                    point.ctrlY = ctrlHeight / 2;
                    points.push(point);
                    break;
                case 5:
                    point.x = -r;
                    point.y = 0;
                    point.ctrlX = Math.cos(Math.PI / 6) * ctrlHeight * -1;
                    point.ctrlY = ctrlHeight / 2 * -1;
                    points.push(point);
                    break;
                default:
                    break;
            }
        }
        return points;
    }

    function drawHeart() {

        ctx.strokeStyle = "#ED5565";
        ctx.lineWidth = 1;//设置线的宽度  
        radian = startRadian;//弧度设为初始弧度  
        radianDecrement = Math.PI / num * 2;
        ctx.moveTo(getX(radian), getY(radian));//移动到初始点  
        i = 0;
        intervalId = setInterval(printHeart, time);
    }

    function printHeart() {
        radian += radianDecrement;
        ctx.lineTo(getX(radian), getY(radian));//在旧点和新点之间连线  
        i++;
        ctx.stroke();//画线  
        if (i >= num) {
            clearInterval(intervalId);
        }
    }

    function getX(t) {
        return 100 + r * (16 * Math.pow(Math.sin(t), 3));
    }

    function getY(t) {
        return 500 - r * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
    }
    startAnimation()
})(window, undefined)