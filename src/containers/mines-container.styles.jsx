import styled from '@emotion/styled';

export const MineFieldContainer = styled.div`
    color: red;
    width: 700px;
    height: 700px;
    border: solid 1px blue;
    display: flex;
    flex-direction: column;
    
    text-align: center;
    justify-content: center;
    align-items: center;
    justify-items: center;    

`;
export const ButtonStyled = styled.button`
width:40px;
height:40px;`;

export const Row = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height:20px;
`;

export const MinesCount = styled.div`
    width: 120px;
    height: 30px;
    color: red;
    font-size: 20px;
    font-weight: bold;
    border:solid 1px grey;
`;

export const RestartStyled = styled.div`
    border: double 2px darkgray;
    width: ${props => props.gameOver ? '120px' : '46px'};
    height: 36px;
    background-color: black;
    color: white;
    margin-bottom: 10px;
    padding-top: 10px;
    cursor: pointer;
    background-image: ${props => props.gameOver ? `url('cry.png')` : `url('/smile.png')`};
    background-repeat: repeat-y;
    padding-left: ${props => props.gameOver ? '30px' : '0'};

`;

export const MinesBoard = styled.div`
   border: solid 4px red;
`;
