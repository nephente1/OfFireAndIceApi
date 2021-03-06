import React from 'react';
import { observer } from "mobx-react-lite";
import { Titles } from './Titles';
import { useAppStateContext } from '../AppState/AppState';
import { ResponseItemType } from '../AppState/MainPageState';
import { AppBody, TextInHeader, NamesBox, Header, Spinner, Input, MainTitle, Button, HeaderTableRow, HeaderTableCell, LightLine, InputsWrapper, InputsLabel, Select } from './appStyles.style';
import { TableContent } from './TableContent';

export interface SelectOptionsType {
    [key: string]: string
}

export const MainPage = observer(() => {
    const appState = useAppStateContext();

    React.useEffect(() => {
        appState.mainPageState.loadData();
    },[appState.mainPageState]);


    const datas: Array<ResponseItemType> = appState.mainPageState.searchResultsData;
    const renderTitles =
        datas.map( (el, i) => <Titles name={el.name} aliases={el.aliases} culture={el.culture} gender={el.gender} books={el.books} tvSeries={el.tvSeries} key={el.name + i} /> )

    const genderOptions: SelectOptionsType = {'select gender':'select gender', 'Female':'Female', 'Male':'Male'}
    const genderOptionsArray = React.useMemo(() => Object.keys(genderOptions), [genderOptions]);
    const pageSizeOptions: SelectOptionsType = {'10':'10', '20':'20', '30':'30'}
    const pageSizeOptionsArray = React.useMemo(() => Object.keys(pageSizeOptions), [pageSizeOptions]);

    return (
        <AppBody>
            <NamesBox>
                <Header>
                    <div>
                        <MainTitle>Of Fire and Ice API</MainTitle>
                        <InputsWrapper>
                            <InputsLabel>search</InputsLabel>
                            <Input type="text" placeholder="type name" onChange={appState.mainPageState.inputHandler} />
                        </InputsWrapper>
                        <InputsWrapper>
                            <InputsLabel>Type gender</InputsLabel>
                            <Select onChange={appState.mainPageState.onSelectCategory} name='select gender'>
                            {
                                genderOptionsArray.map((value: string) => {
                                    const optionLabel: string = genderOptions[value];
                                    return (
                                        <option key={value} value={value}>
                                            {optionLabel}
                                        </option>
                                    );
                                })
                            }
                            </Select>
                        </InputsWrapper>
                        <InputsWrapper>
                            <InputsLabel>Number of rows</InputsLabel>
                            <Select onChange={appState.mainPageState.setPageSize} name='page size'>
                            {
                                pageSizeOptionsArray.map((value: string) => {
                                    const optionLabel: string = pageSizeOptions[value];
                                    return (
                                        <option key={value} value={value}>
                                            {optionLabel}
                                        </option>
                                    );
                                })
                            }
                            </Select>
                        </InputsWrapper>
                    </div>
                    <div>
                        <TextInHeader>All characters: { appState.mainPageState.searchResults.length}</TextInHeader>
                        <Button onClick={appState.mainPageState.handleClickPrev}>previous page</Button >
                        <Button onClick={ appState.mainPageState.handleClickNext}>next page</Button>
                    </div>
                </Header>
                
                <TableContent renderTitles={renderTitles} />

            </NamesBox>
        </AppBody>

    )
})

