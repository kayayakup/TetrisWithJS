let gameStarted=false;
let activeBlock;
let activeBlockType;

document.addEventListener('keydown',(e)=>{
    if(e.key=='Enter'&& !gameStarted){
        startGame();
    }
});

function startGame(){
    gameStarted=true;    
    let type=randomBlockType();
    generateBlock(type);
    activeBlock=Array.from(document.querySelectorAll('play-board img')).slice(0,4);
    activeBlockType=type;

    //document.querySelector('#score-board').remove()
    document.querySelector('#score-board').insertAdjacentHTML('beforeend',`
    <p style='margin-top:0px;'>Level: <span id='level'>1</span></p>
    <p style='margin-top:0px;'>Score: <span id='score'>0</span></p>
    <p style='margin-top:0px;'>Lines: <span id='lines'>0</span></p>
    <p style='margin-top:0px;'>Next Block:</p>
    <img src='${randomBlockType()} block.png' style='width:150px;'>  
    `
    );
    freeFall(activeBlock);
}

function freeFall(activeBlock){
    freeFallID = setInterval(()=>{
        activeBlock.forEach(square => square.style.marginTop = `${marginTop(square)+26}px`)
    },1000);
}

// let hit = hitTest()
        // if(hit){

        // } 
        // else{

        // }

function changeActiveBlock(){
    let nextBlock = document.querySelector('#score-board img');
    let nextBlockType = nextBlock.getAttribute('src')[0];
    generateBlock(nextBlockType);
    activeBlock= Array.from(document.querySelectorAll('#play-board img')).slice(0,4);
    activeBlockType = nextBlockType;
    nextBlock.src=`${randomBlockType()} block.png`;
}

function hitTest(){
    let hit = false;
    activeBlock.forEach((square_A)=>{
        if(marginTop(square_A)==494){
            hit = true;
        }
        Array.from(document.querySelectorAll('#play-board img')).slice(4).forEach((square_B)=>{
            if(marginTop(square_A)+26==marginTop(square_B) && marginLeft(square_A)==marginLeft(square_B)){
                hit = true;
            }
        });
    });
    return hit;
}

function marginLeft(square){
    return Number(square.style.marginLeft.split('px')[0]);
}
function marginTop(square){
    return Number(square.style.marginTop.split('px')[0]);
}

function generateBlock(type){
    let blockData=[
        {type: 'I', squares:[{x:78, y:0}, {x:104, y:0}, {x:130, y:0}, {x:156, y:0}], sqrColor: 'lightblue'},
        {type: 'S', squares:[{x:78, y:26}, {x:104, y:26}, {x:104, y:0}, {x:130, y:0}], sqrColor:'green'},
        {type: 'Z', squares:[{x:78, y:0}, {x:104, y:0}, {x:104, y:26}, {x:130, y:26}], sqrColor:'red'},
        {type: 'L', squares:[{x:78, y:26}, {x:104, y:26}, {x:130, y:26}, {x:130, y:0}], sqrColor: 'orange'},
        {type: 'J', squares:[{x:130, y:26} ,{x:104, y:26}, {x:78, y:26}, {x:78, y:0}], sqrColor:'darkblue'},
        {type: 'O', squares:[{x:104, y:0}, {x:104, y:26}, {x:130, y:0}, {x:130, y:26}], sqrColor: 'yellow'},
        {type: 'T', squares:[{x:78, y:26}, {x:104, y:26}, {x:130, y:26}, {x:104, y:0}], sqrColor: 'purple'}
    ]
    blockData.forEach((block)=>{
        if(block.type==type){
            let html = '';
            for(let i=0; i<=3; i++){
                let style = `margin-left:${block.squares[i].x}px; margin-top:${block.squares[i].y}px; position: absolute;`;
                html += `<img src='${block.sqrColor} square.png' style='${style} width:26px; height: 26px'>`;
            }
            document.querySelector('#play-board').insertAdjacentHTML('afterbegin', html);
        }
    });
}

function randomBlockType(){
    let types =['I','J','S','Z','L','O','T'];
    let randomType=types[Math.floor(Math.random()*types.length)];
    return randomType;
}
