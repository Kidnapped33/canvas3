let canvas = document.getElementById('canvas');
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
let ctx = canvas.getContext('2d');
ctx.fillStyle = 'orange';
ctx.strokeStyle = 'none';
ctx.lineWidth = 10
ctx.lineCap = 'round'

let painting = false
let last;

window.addEventListener("resize", resizeCanvas, false);
function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

var isTouchDevice = "ontouchstart" in document.documentElement;
if (isTouchDevice) {
    canvas.ontouchstart = (e) => {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        last = [x, y]
    }
    canvas.ontouchmove = (e) => {
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY;
        drawLine(last[0], last[1], x, y);
        last = [x, y]
    };
} else {

    canvas.onmousedown = (e) => {
        painting = true;
        last = [e.clientX, e.clientY]
    };

    canvas.onmousemove = (e) => {
        if (painting === true) {
            drawLine(last[0], last[1], e.clientX, e.clientY);
            last = [e.clientX, e.clientY]
        } else {

            canvas.onmouseup = () => {
                painting = false
            }
        }

        function drawLine(x1, y1, x2, y2) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }
}