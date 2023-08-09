const defaultGridSize = 16;
let cell = [];
const container = document.querySelector(".grid-container");
const gridRange = document.querySelector("#grid-range");
const gridOutput = document.querySelector("#output");
const clearGridButton = document.querySelector("#clear-grid");

gridOutput.innerHTML = gridRange.value;

clearGridButton.addEventListener("click", function(){
    clearGrid();
    createGrid(defaultGridSize);
    gridRange.value = defaultGridSize;
    gridOutput.innerHTML = defaultGridSize;
});

gridRange.addEventListener('input', function(){
    gridOutput.innerHTML = gridRange.value;
    clearGrid()
    createGrid(gridRange.value);
}, false);

function clearGrid(){
    container.innerHTML = '';
}

function createGrid(squaresPerSide){
    container.style.gridTemplateColumns = `repeat(${squaresPerSide}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${squaresPerSide}, 1fr)`;

    let numCells = squaresPerSide*squaresPerSide;

    for(let i = 0; i < numCells; i++){
        cell[i] = this.document.createElement('div');
        cell[i].className = "cell";
        container.appendChild(cell[i])
    }
}

function colorCell(e){
    e.target.style.backgroundColor = 'red';
}

createGrid(defaultGridSize);