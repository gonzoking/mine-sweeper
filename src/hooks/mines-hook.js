import {useState, useEffect} from 'react';

export const useMinesHook = ({dimentions, minesTotal})=> {
    let board = new Array(dimentions);
    const bombs = new Map();
    const xLen = dimentions;
    const yLen = dimentions;
    const [gameOver, setGameOver] = useState(false);
    const [minesCount, setMinesCount] = useState(minesTotal);
    const [mineBoard, setMineBoard] = useState([]);
    const [won, setWon]= useState(false);

    const getRandomInt= (maxNum) => {
        return Math.floor(Math.random() * maxNum)+1;
    }

    const setBombs = () => {
        let newBombs = 0;
        while(newBombs < minesCount) {
            const num = getRandomInt(xLen * yLen);
            if(bombs.get(num) === undefined) {
                bombs.set(num,num);
                newBombs++;
            }
        }
    }

    const checkBombNumbers = (row,column)=> {
        let count =0;
        if(column-1>-1 && row-1>-1 && board[row-1][column-1].isBomb===true) {
            count++;
        }
        if(column-1>-1 && board[row][column-1].isBomb===true) {
            count++;
        }
        if(column-1>-1 && row+1<xLen && board[row+1][column-1].isBomb===true) {
            count++;
        }
    
        if(row+1<xLen && board[row+1][column].isBomb===true) {
            count++;
        }
        if(row-1>-1 && board[row-1][column].isBomb===true) {
            count++;
        }
    
        if(column+1<yLen && board[row][column+1].isBomb===true) {
            count++;
        }
        if(column+1<yLen && row+1 < xLen && board[row+1][column+1].isBomb===true) {
            count++;
        }
        if(column+1<yLen && row-1 > -1 && board[row-1][column+1].isBomb===true) {
            count++;
        }
        return count;
    }
    
    useEffect(()=>{
        if(bombs.size === 0){
            createTwoDArray();
            setBombs();      
            fillMines();    
            fillNumbers();             
        }
        setMineBoard(board);
    },[]);

     const createTwoDArray = () => {
        for(let a=0;a<yLen;a++) {
            board[a] = new Array(xLen);
        }
    }
const fillNumbers = () => {
        for(let row=0;row<yLen;row++) {
            for(let column=0;column<xLen;column++){
                if(board[row][column].isBomb=== false){ //if not a bomb
                   const count = checkBombNumbers(row,column);
                   board[row][column] = {isBomb: false, number: count, isClicked: false};     
                }    
            }
        }
    }

    const fillMines = () => {
        let pos=1;
        for(let row=0;row<xLen;row++) {
            for(let column=0;column<yLen;column++) {
               if(bombs.get(pos) !== undefined){ 
                board[row][column] = {isBomb:true, isClicked: false};     
               }else{
                board[row][column] = {isBomb:false, isClicked: false};     
               }
               pos++; 
            }
        }
    }

    const showAllBombs = () => {
        for(let row of mineBoard) {
            for(let col of row) {
                if(col.isBomb) {
                    col.isClicked = true;
                }
            }
        }    
    }
    const searchEmpty =(currentBoard, row,column, startRow, startColumn) => {
        if(row<0 || row>= xLen || column<0 || column>= yLen ) {
            return currentBoard;
        }
        
        if(!currentBoard[row][column].isBomb && !currentBoard[row][column].isClicked && !currentBoard[row][column].isSigned) {
            currentBoard[row][column].isClicked = true;
        }else{
            return currentBoard;
        }
        if(currentBoard[row][column].number >0 && row !==startRow && column !==startColumn) {
            return currentBoard;
        
        }
        currentBoard = searchEmpty(currentBoard, row+1,column-1,startRow,startColumn);
        currentBoard = searchEmpty(currentBoard, row+1,column,startRow,startColumn);       
        currentBoard = searchEmpty(currentBoard, row,column+1,startRow,startColumn);       
        currentBoard = searchEmpty(currentBoard, row,column-1,startRow,startColumn);
        currentBoard = searchEmpty(currentBoard, row+1,column+1,startRow,startColumn);
        currentBoard = searchEmpty(currentBoard, row-1,column-1,startRow,startColumn);
        currentBoard = searchEmpty(currentBoard, row-1,column,startRow,startColumn);
        currentBoard = searchEmpty(currentBoard, row-1,column+1,startRow,startColumn);
        return currentBoard;
    }
    const checkIfWon = (currentBoard) => {
        let cells = 0;
        for(let row=0;row<yLen;row++) {
            for(let column=0;column<yLen;column++) {
               if(currentBoard[row][column].isClicked || currentBoard[row][column].isSigned) {
                cells++;
               }else{
                break;
               }
            }   
        }
        if(cells===(xLen*yLen)) {
            setWon(true);
        }
    }
    const signCellHandler = (isSigned,row,column) => {        
        let newBoard = [...mineBoard];
        newBoard[row][column].isSigned = isSigned;
        setMineBoard(newBoard);
        if(isSigned) {
            setMinesCount(prevCount => prevCount -1);
        }else {
            setMinesCount(prevCount => prevCount +1);
        }
        checkIfWon(newBoard);
    }
    const onClicked = (isBomb, row, column) => {
        
        if(isBomb) {
            setGameOver(true);
            showAllBombs();
        }else { //serach for empty cells and numbers
            let newBoard = [...mineBoard];                                   
            const afterChanges = searchEmpty(newBoard,row,column,row,column);
            setMineBoard(afterChanges);
            checkIfWon(afterChanges);
        }
    }      
    return {
        onClicked,
        checkIfWon,
        signCellHandler,                                        
        setGameOver,
        gameOver,
        won,
        setWon,
        mineBoard,                       
        minesCount,
        setMinesCount,
    }

}