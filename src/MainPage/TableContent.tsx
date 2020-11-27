import React from 'react';
import { observer } from "mobx-react-lite";
import { useAppStateContext } from '../AppState/AppState';
import { HeaderTableCell, HeaderTableRow, LightLine, Spinner } from './appStyles.style';


interface TableContentPropsType {
    renderTitles: JSX.Element[];
}

const tableHeaders = ['Name and Aliases', 'Gender', 'Culture', 'Books', 'TV series number' ];

export const TableContent = observer((props: TableContentPropsType) => {
    const appState = useAppStateContext();
    const renderTableHeaders = () => tableHeaders.map( el => <HeaderTableCell key={el}>{el}</HeaderTableCell>);

    return(
        <>
            <HeaderTableRow>
                {renderTableHeaders()}
            </HeaderTableRow>
            <LightLine lightColor={true} />
            <div>{ appState.mainPageState.isLoading ? <Spinner /> : props.renderTitles}</div>
        </>
    )
});
