import React, {useState, useMemo, useEffect, useRef} from 'react';
import {CellButton, EmptyCell, BombCell, SignedCell} from './cell.styles';

export const ButtonCell = ({disabled, row,column,isBomb,content, onClicked, onSignCell, minesCount}) => {
    const [isClicked, setIsClicked] = useState(content.isClicked);
    const [isRightClicked, setIsRightClicked] = useState(false);    
    const ref = useRef(minesCount);

    useEffect(()=>{
        setIsClicked(content.isClicked);
    },[content.isClicked]);
        
    const clickMenu = (event) => {
        event.preventDefault();
    }

    const clickHandler = (event) => {        
        if(event.button === 2) {
            if(minesCount > 0 && !isRightClicked) {
                setIsRightClicked(true);
                onSignCell(true,row,column);
            }else if(isRightClicked){
                setIsRightClicked(false);
                onSignCell(false,row,column);
            }
            event.preventDefault();                     
        }else {            
            if(isRightClicked === false) {
                setIsClicked(true);
                onClicked(isBomb,row,column);
            }
        }
    }

    const showContent = useMemo(()=>{        
        if(isRightClicked) {
            return <SignedCell onMouseDown={clickHandler} onContextMenu={clickMenu}/>
        }
        if(!isClicked) {
            return  <CellButton disabled={disabled} onMouseDown={clickHandler} onContextMenu={clickMenu} ></CellButton>;
        }
        if(isBomb) {
           return <BombCell/>;
        }
        return <EmptyCell number={content.number}>{content && content.number > 0 ? content.number : ''}</EmptyCell>;

    },[disabled, isClicked, isRightClicked, content.isClicked])
    
    return <>{showContent}</>
}