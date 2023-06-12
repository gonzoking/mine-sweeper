import styled from '@emotion/styled';

const colors = ['','blue','green','red','purple','pink'];

export const CellButton = styled.button`
    width:20px;
    height:20px;
    line-height: 6px;    
    pointer-events: ${props => props.disabled ? 'none' : 'all'};
    border: outset 3px lightgray; 

`;

export const BombCell = styled.div`
    background-color: red;
    background-image: url('bomb.png');
    background-size: contain;
    background-position: center;
    width:20px;
    height:20px;
`;

export const EmptyCell = styled.div`
    background-color: rgb(240,240,240);
    color: ${(props) => colors[props.number] };
    width:20px;
    height:20px;
`;

export const SignedCell = styled.div`
    background-image: url('marked.png');
    background-size: contain;
    background-position: center;
    width:20px;
    height:20px;
`;