import React, {useEffect, useState} from 'react';
import {MineFieldContainer, Row, MinesCount,RestartStyled, MinesBoard} from './mines-container.styles';
import {ButtonCell} from '../components/cell';
import { useMinesHook } from '../hooks/mines-hook';


const MinesContainer = ({dimentions, minesTotal}) => {
    const {onClicked, signCellHandler, gameOver, won, mineBoard, minesCount} = useMinesHook({dimentions, minesTotal});               
                
    const restartGame = () => {
        window.location="";
    }
    return <MineFieldContainer>
        <RestartStyled gameOver={gameOver} onClick={restartGame}>{gameOver && 'Start Again?'}</RestartStyled>
        {won && <div>Winner!!!!</div>}
        <MinesBoard>{mineBoard.map((items, yindex) => {
            return (            
            <Row>            
                {items.map((subItems, xindex) => {
                return <ButtonCell disabled={gameOver} minesCount={minesCount} onSignCell={((isSigned,row,column) => signCellHandler(isSigned,row,column))} onClicked={(isBomb,row,column)=>onClicked(isBomb,row,column)} content={subItems} key={yindex+xindex} row={yindex} column={xindex} isBomb={subItems.isBomb===true}></ButtonCell>;
                })}
            </Row>          
            );        
      })}
      </MinesBoard>
      Mines: <MinesCount>{minesCount}</MinesCount>
      </MineFieldContainer>;
}

export default MinesContainer