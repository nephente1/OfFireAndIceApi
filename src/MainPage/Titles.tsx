import React from 'react';
import { observer } from "mobx-react";
import { TableDataRow, TableDataCell, LightLine, LinkRow, DataText } from './appStyles.style';

const seperateBookNumber = (elem) => {
    let out;
    const doubleNum = elem.split('').slice(-2);
    out = doubleNum;
    if ( doubleNum.includes('/') ) {
        out = doubleNum.slice(1);
    }
    return out;
}

interface ResponseItemType {
    books: string
}

interface TitlesPropsType {
    name: string,
    results?: Array<ResponseItemType>,
    aliases: Array<any>,
    books:any,
    culture: string,
    gender: string,
    tvSeries: Array<string>
}

export const Titles = observer((props: TitlesPropsType) => {
    const userName = props.name === '' ? 'unknown' : props.name;

    const renderAliases = () => {
        return props.aliases.map( (el, i) => <DataText key={el[0] + i}>{el}</DataText>)
    }

    const renderBooks = () => {
        return props.books.map( (el, i) =>
            <LinkRow key={el + i} to={`/${seperateBookNumber(el)}`}>
                <DataText>{seperateBookNumber(el)}</DataText>
            </LinkRow>)
    }

    const renderTvSeries = () => {
        const emptyTvSeriesArray = props.tvSeries[0] === '';
        if (emptyTvSeriesArray) {
            return 0;
        }
        return props.tvSeries.length;
    }

    return (
        <>
            <TableDataRow>
                <TableDataCell>{userName} {renderAliases()}</TableDataCell>
                <TableDataCell>{props.gender === '' ? 'unknown' : props.gender}</TableDataCell>
                <TableDataCell>{props.culture === '' ? 'unknown' : props.culture}</TableDataCell>
                <TableDataCell>{renderBooks()}</TableDataCell>
                <TableDataCell>{renderTvSeries()}</TableDataCell>
            </TableDataRow>
            <LightLine lightColor={false} />
        </>
   );
});

