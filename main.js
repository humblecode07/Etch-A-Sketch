// Changing Grid Sizes

const gridSize = document.querySelector("#grid");
const sizeOfGrid = document.querySelector("p.three");

const suffix = 'px';

let size = (600 / gridSize.value)
let slot = (gridSize.value * gridSize.value);

function gridNumSize(val) {
    document.getElementById('gridInput').innerHTML= "Grid Size: "+ val + " " + "x" + " " + val; 
}

// Base Grid Size
gridNumSize(16);

for (let i = 0; i < slot; i++) {
    let etch = document.createElement('div');
    etch.classList.add('etch');
    etch.style.setProperty('background-color', 'var(--bgColor)')
    etch.setAttribute('draggable', false);
    document.documentElement.style.setProperty(`--height`, size + suffix)
    document.documentElement.style.setProperty(`--width`, size + suffix)
    
    document.getElementById("etchCont").appendChild(etch);
}

function createGrid() {
    const removeEtch = document.getElementById("etchCont");
    
    while (removeEtch.hasChildNodes()) {
        removeEtch.removeChild(removeEtch.firstChild);
    }

    const suffix = 'px';
    let size = (600 / gridSize.value)
    let slot = (gridSize.value * gridSize.value);

    for (let i = 0; i < slot; i++) {
        let etch = document.createElement('div');
        etch.classList.add('etch');
        etch.style.setProperty('background-color', 'var(--bgColor)')
        etch.addEventListener('mousedown', changeColor)
        document.documentElement.style.setProperty(`--height`, size + suffix)
        document.documentElement.style.setProperty(`--width`, size + suffix)
        
        document.getElementById("etchCont").appendChild(etch);
    }

    etches = Array.from(document.getElementsByClassName("etch")); 

    controls(); 
}

function controls() {

    etches.forEach(etch => etch.addEventListener('mousedown', changeColor))
    etches.forEach(etch => etch.addEventListener('mouseover', changeColor))
}

gridSize.addEventListener('change', createGrid)

// Etching
const base = document.querySelector("#base");

let etches = Array.from(document.getElementsByClassName("etch")); 

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return;

    if (this.style.backgroundColor === "var(--bgColor)")
    {
        this.style.backgroundColor = bgColor.value
    }  

    const rgb2hex = (rgb) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`;

    let hex = rgb2hex(this.style.backgroundColor);
    
    if (toggleGrab) {
        base.value = hex;
        grab.classList.remove('highlight')
        toggleGrab = false;
    }
    else if(toggleErase) {
        this.style.backgroundColor = 'var(--bgColor)'
    }
    else if (toggleLight) {
        let lighten = colorShade(hex, 23)
        this.style.backgroundColor = lighten;
    }
    else if(toggleDark) {
        let darken = colorShade(hex, -23)
        this.style.backgroundColor = darken;
    }
    else {
        e.target.style.backgroundColor = base.value;
    }
}


// Background Color
const bgColor = document.querySelector("#bg-color");


function bgColorChange() {
    const suffix = this.dataset.sizing || '';
    document.documentElement.style.setProperty(`--bgColor`, this.value + suffix)
}

bgColor.addEventListener('change', bgColorChange)


// Shade

function colorShade(hexColor, amt) {
    hexColor = hexColor.replace(/^#/, '')
    if (hexColor.length === 3){
        hexColor = hexColor[0] + hexColor[0] + hexColor[1] + hexColor[1] + hexColor[2] + hexColor[2]
    } 
    
    let [r, g, b] = hexColor.match(/.{2}/g);
    ([r, g, b] = [parseInt(r, 16) + amt, parseInt(g, 16) + amt, parseInt(b, 16) + amt])
    
  
    r = Math.max(Math.min(255, r), 0).toString(16)
    g = Math.max(Math.min(255, g), 0).toString(16)
    b = Math.max(Math.min(255, b), 0).toString(16)
  
    const rr = (r.length < 2 ? '0' : '') + r
    const gg = (g.length < 2 ? '0' : '') + g
    const bb = (b.length < 2 ? '0' : '') + b
  
    return `#${rr}${gg}${bb}`
}

// Buttons

// Color Grabber
const grab = document.querySelector("#color-grabber");
let toggleGrab = false;

// Eraser

const eraser = document.querySelector("#eraser");
let toggleErase = false;

// Lighten Color

const lighter = document.querySelector("#light-color");
let toggleLight = false;

// Darken Color

const darker = document.querySelector("#dark-color");
let toggleDark = false;

// Show Grid Lines

const gridLine = document.querySelector('#grid-line')
let toggleGridLine = false;

// Clear

const clear = document.querySelector('#clear');

// Functions I spent thinking for 3 hours

if (document.getElementById('color-grabber').onclick = () => {
    toggle(1)
}) 

if (document.getElementById('eraser').onclick = () => {
    toggle(2);
}) 

if (document.getElementById('light-color').onclick = () => {
    toggle(3);
}) 

if (document.getElementById('dark-color').onclick = () => {
    toggle(4);
}) 

if (document.getElementById('grid-line').onclick = () => {
    toggle(5);
}) 

if (document.getElementById('clear').onclick = () => {
    toggle(6);
}) 

function toggle(x) {
    if (x === 1) {
        grab.classList.toggle('highlight');
        eraser.classList.remove('highlight');
        clear.classList.remove('highlight');
        lighter.classList.remove('highlight');
        darker.classList.remove('highlight')
    }
    else if (x === 2) {
        eraser.classList.toggle('highlight');
        grab.classList.remove('highlight');
        clear.classList.remove('highlight');
        lighter.classList.remove('highlight');
        darker.classList.remove('highlight')
    }
    else if (x === 3){
        lighter.classList.toggle('highlight');
        grab.classList.remove('highlight');
        eraser.classList.remove('highlight');
        clear.classList.remove('highlight');
        darker.classList.remove('highlight')
    }
    else if (x === 4){
        darker.classList.toggle('highlight')
        lighter.classList.remove('highlight');
        grab.classList.remove('highlight');
        eraser.classList.remove('highlight');
        clear.classList.remove('highlight');
    }
    else if (x === 5) {
        gridLine.classList.toggle('highlight');
        eraser.classList.remove('highlight');
        grab.classList.remove('highlight');
        clear.classList.remove('highlight');
        lighter.classList.remove('highlight');
        darker.classList.remove('highlight')
    }
    else if (x === 6) {
        clear.classList.toggle('highlight');
    }
}

function toggleHighlight() {
    if (this.id === 'color-grabber') {
        if (this.classList.contains('highlight')) {        
            toggleGrab = true;
            toggleErase = false;
            toggleLight = false;
            toggleDark = false;
        }
        else {
            toggleGrab = false;
        }
    } 
    else if (this.id === 'eraser') {
        if (this.classList.contains('highlight')) {
            toggleErase = true;
            toggleLight = false;
            toggleDark = false;
        }
        else {
            toggleErase = false;
        }
    }
    else if (this.id === 'light-color') {
        if (this.classList.contains('highlight')) {
            toggleLight = true;
            toggleErase = false;
            toggleDark = false;
        }
        else {
            toggleLight = false;
        }
    }
    else if (this.id === 'dark-color') {
        if (this.classList.contains('highlight')) {
            toggleDark = true;
            toggleErase = false;
            toggleLight = false;
        }
        else {
            toggleDark = false;
        }
    }
    else if (this.id === 'grid-line') {
        if (this.classList.contains('highlight')) {
            document.documentElement.style.setProperty(`--gridLine`, 'inset 0px 0px 0px .5px rgb(139, 139, 139)')
        }
        else if (this.classList.contains('highlight') === false) {
            document.documentElement.style.setProperty(`--gridLine`, `inset 0px 0px 0px 0px rgb(139, 139, 139)`)
        }
    }
    else if (this.id === 'clear') {
        if (this.classList.contains('highlight')) {
            createGrid();
            clear.classList.remove('highlight');
        }
    }
}

grab.addEventListener('click', toggleHighlight);
eraser.addEventListener('click', toggleHighlight);
gridLine.addEventListener('click', toggleHighlight);
clear.addEventListener('click', toggleHighlight);
lighter.addEventListener('click', toggleHighlight);
darker.addEventListener('click', toggleHighlight);

controls();


// todo:
// onmouseenter combination 