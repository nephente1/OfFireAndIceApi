import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AppBody = styled('div')`
    height: 100vh;
    padding: 25px;
    display: flex;
    justify-content: center;
    height: 100%;
    min-height: 100vh;
    background: #361133;
`;

export const NamesBox = styled('div')`
    background: #3e3150;
    padding: 25px 35px 30px;
    text-align: center;
    border-radius: 5px;
    color: #E5E8F6;
    width: 80%;
    height: auto;
    box-shadow: 0px 0px 20px 12px rgba(12,27,38,0.85);
    height: fit-content;
`;

export const DetailsContainer = styled('div')`
    color: #edeff1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 15px 20px;
    font-size: 12px;

    @media(max-width: 600px){
        flex-direction: column;
        font-size: 16px;
    }
`;

export const Column = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    &::nth-of-type(2){
        margin: 0 20px;
    }
    @media(max-width: 600px){
        margin-bottom: 15px;
    }
`;

export const ColumnText = styled ('p')`
    margin-block-start: 0.2em;
    margin-block-end: 0.2em;
    text-decoration: underline;
`;

export const Header = styled('header')`
    display: flex;
    align-items:  center;
    justify-content: space-around;
    margin: 0 0 20px 0;
`;

export const HeaderTableRow = styled('div')`
    display: flex;
    flex-direction: row;
    margin: 0 0 15px 0;
`;

export const HeaderTableCell = styled('div')`
    width: calc(100% / 5);
    font-size: 18px;
`;

export const MainTitle = styled('h1')`
    font-size: 26px;
    letter-spacing: 1px;
    margin-bottom: 10px;
    color: #E91E63;
`;

export const SmallTitle = styled('h3')`
    font-size: 16px;
`;

export const Button = styled('button')`
    padding: 4px 12px;
    border: none;
    background: #fabe09;
    margin: 5px 5px 0px 5px;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 4px;
`;

export const Input = styled('input')`
    border-radius: 4px;
    padding: 2px 5px;
`;

export const TextInHeader = styled('p')`
    margin-bottom: 5px;
    padding: 6px;
`;

export const Spinner = styled('div')`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    &::after {
        content: "";
        width: 80px;
        height: 80px;
        border: 2px solid #f3f3f3;
        border-top: 3px solid #f25a41;
        border-radius: 100%;
        will-change: transform;
        animation: spin 1s infinite linear
    }
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

// Titles

interface TitleTextPropsType {
    colors?: string | boolean
}

export const TitleText = styled('h2')<TitleTextPropsType>`
    font-size: 18px;
    margin-top: 16px;
    margin-bottom: 12px;
    letter-spacing: 1px;
    color: #d5d5d5;
    text-transform: capitalize;
    cursor: pointer;
    color: ${props => props.colors ? 'rgb(255, 78, 119)' : '#d5d5d5'};
`;
interface LightLinePropsType {
    lightColor: string | boolean
}

export const DataText = styled('p')<TitleTextPropsType>`
    font-size: 14px;
    margin: 10px 0;
    letter-spacing: 1px;
    color: #d5d5d5;
    text-transform: capitalize;
`;

export const LightLine = styled('div')<LightLinePropsType>`
    width: 100%;
    height: 2px;
    background: #eaceea;
    box-shadow: ${props => props.lightColor ? '#E91E63 0px 0px 4px 6px' : 'rgb(28, 84, 141) 0px 0px 4px 6px'};
    border-radius: 5px;
    margin-bottom: 15px;
`;

export const LinkRow = styled(Link)`
    text-decoration: none;
`;

export const DetailsPageContainer = styled('div')`
    height: 100vh;
    background: #fff;
    color: white;
    position: absolute;
    padding: 0 20px;
    display: block;
    top: 0;
    left: 0;
    right: 0;
`;

export const TableDataRow = styled(HeaderTableRow)`

`;

export const TableDataCell = styled('div')`
    width: calc(100% / 5);
`;
