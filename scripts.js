const DEFAULTGRIDSIZE = 16;
const DEFAULTCOLOR = '#658FF1';
const ERASE = '#FFFFFF';
const DEFAULTMODE = "color";

let cell = [];
let currentColor = DEFAULTCOLOR;
let savedColor = DEFAULTCOLOR;
let gridLineState = false;
let mouseState = false;
let cmode = DEFAULTMODE;

const container = document.querySelector(".grid-container");
const gridRange = document.querySelector("#grid-range");
const gridOutput = document.querySelector("#output");
const clearGridButton = document.querySelector("#clear-grid");
const resetGridButton = document.querySelector("#reset-grid");
const toggleGridLines = document.querySelector("#toggle-grid");
const colorSelected = document.querySelector("#colorPicker");
const eraseButton = document.querySelector("#erase-mode");
const colorButton = document.querySelector("#color-mode");

gridOutput.innerHTML = gridRange.value+" X "+gridRange.value;

colorSelected.oninput = (e) => {setColor(e.target.value); saveColor(e.target.value); mouseState = false};
clearGridButton.onclick = () => eraseGrid(gridRange.value);
eraseButton.onclick = () => {setColor(ERASE); cmode = "erase"; colorMode(cmode)};
colorButton.onclick = () => {setColor(savedColor); cmode = "color"; colorMode(cmode)};
document.body.onmousedown = () => mouseStateSet();
document.body.onmouseup = () => mouseStateSet();

function colorMode(mode){
    if(mode === "color"){
        colorButton.classList.add("selected");
        eraseButton.classList.remove("selected");
    }
    else{
        colorButton.classList.remove("selected");
        eraseButton.classList.add("selected");
    }
}

function mouseStateSet(){
    if(mouseState === false){mouseState = true}
    else{mouseState = false}
    console.log(mouseState);
}

//button clears the grid and resets the size to the default 16
resetGridButton.addEventListener("click", function(){
    clearGrid();
    createGrid(DEFAULTGRIDSIZE);

    gridRange.value = DEFAULTGRIDSIZE;
    gridOutput.innerHTML = DEFAULTGRIDSIZE+" X "+DEFAULTGRIDSIZE;
});

gridRange.addEventListener('change', function(){
    gridOutput.innerHTML = gridRange.value+" X "+gridRange.value;
    clearGrid()
    createGrid(gridRange.value);
}, false);

//grid line toggle
toggleGridLines.addEventListener('change', ()=>{
    gridLineCheck();
    gridLines(gridRange.value);
});

function setColor(newColor){
    currentColor = newColor;
};

function saveColor(newColor){
    savedColor = newColor
}

function clearGrid(){
    container.innerHTML = '';
}

function eraseGrid(squaresPerSide){
    let numCells = squaresPerSide*squaresPerSide;

    for(let i = 0; i < numCells; i++){
        cell[i].setAttribute('style', 'background: white;');
    }
}

function createGrid(squaresPerSide){
    container.style.gridTemplateColumns = `repeat(${squaresPerSide}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${squaresPerSide}, 1fr)`;

    let numCells = squaresPerSide*squaresPerSide;

    for(let i = 0; i < numCells; i++){
        cell[i] = this.document.createElement('div');
        cell[i].className = "cell";
        cell[i].addEventListener('mousedown', function(e){
            changeColor(e);
        })
        cell[i].addEventListener('mouseover', function(e){
            if(e.type = 'mouseover' && mouseState){
                changeColor(e);
            }
        })
        container.appendChild(cell[i])
    }
    gridLines(squaresPerSide);
}

function changeColor(e){
    if(mouseState === 'mouseover' && !mouseState) return
    e.target.style.backgroundColor = currentColor;
}

//function that checks the state of the checkbox
//this will be used by other elements to keep the state of the gridlines during a reset
function gridLineCheck(){
    if(gridLineState === false){gridLineState = true;}
    else{gridLineState = false;}
}

function gridLines(squaresPerSide){
    let numCells = squaresPerSide*squaresPerSide;
    if(gridLineState === true){
        for(let i = 0; i < numCells; i++){
            cell[i].classList.add("bordered");
        }
    }
    else{
        for(let i = 0; i < numCells; i++){
            cell[i].classList.remove("bordered");
        }
    }

}

window.onload = () =>{createGrid(DEFAULTGRIDSIZE); colorMode(cmode)};