var socket = io()
var c = document.getElementById('myCanvas')
var ctx = c.getContext('2d')
// ctx.moveTo(0,0)
// ctx.lineTo(200,100)
// ctx.stroke()

var pointercolour = "black";
var a=0;
function themechange(){
    if(a==0){
    c.style="background-color:black";
    a=1;
    }else{
        c.style="background-color:white";
        a=0;
    }
}
function givecolour(colour) {
    console.log("givecolour function called with color:", colour); // Debugging log
    pointercolour = colour;
    updateDrawingColor();
    console.log("Cursor color changed to " + pointercolour);
}

function updateDrawingColor() {
    console.log("updateDrawingColor function called with color:", pointercolour); // Debugging log
    ctx.strokeStyle = pointercolour; // Update the drawing color
}

function del(){
    ctx.clearRect(0,0,c.width,c.height)
    socket.emit("clear","yes")
}

updateDrawingColor();


let isDrawing = false

c.addEventListener('mousedown',(event)=>{
    const x = event.clientX - c.offsetLeft;
    const y = event.clientY - c.offsetTop;
    const col = pointercolour;
    isDrawing = true
    ctx.beginPath()
    ctx.moveTo(event.clientX,event.clientY)
    socket.emit("clicked",{x,y,col})
})

c.addEventListener('mousemove',(event)=>{
    if(isDrawing){
        const x = event.clientX - c.offsetLeft;
        const y = event.clientY - c.offsetTop;
        ctx.lineTo(x,y)
        ctx.stroke()
        socket.emit('drawing', { x, y })
    }
})

c.addEventListener('mouseup',()=>{
    isDrawing = false
})

c.addEventListener('mouseleave',()=>{
    isDrawing = false
})

socket.on('clicked',(data)=>{
    ctx.beginPath()
    ctx.moveTo(data.x,data.y)
    pointercolour=data.col;
    updateDrawingColor();
})
socket.on('drawing', (data) => {
    // ctx.moveTo(data.x,data.y)
    ctx.lineTo(data.x, data.y);
    ctx.stroke();
});
socket.on("clear",(data)=>{
    console.log(data)
    ctx.clearRect(0,0,c.width,c.height)
    console.log("clear clear clear")
})
