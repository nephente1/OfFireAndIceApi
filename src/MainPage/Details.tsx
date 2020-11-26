import * as React from 'react';
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import {Column, ColumnText, DetailsContainer, Spinner, SmallTitle, AppBody, TitleText, NamesBox, Button} from "./appStyles.style";
import { useHistory } from 'react-router-dom';

export type BookItemsType = Pick<BookApiItem, 'isbn' | 'name' | 'numberOfPages' | 'released'>;

export interface BookApiItem {
    authors: object,
    characters: object,
    country: string,
    isbn: string,
    mediaType: string,
    name: string,
    numberOfPages: number,
    povCharacters: object,
    publisher: string,
    released: string,
    url: string
}

class DetailsState {
    @observable results: BookItemsType | null = null;
    @observable bookNumber: number | string | null = null;
    @observable isLoading: boolean | undefined = true;
    @observable matchParam: any = null;

    @action async getDetails(el: string) {
    try {
        const response = await fetch(`https://www.anapioficeandfire.com/api/books/${el}`);
        const respJson = await response.json();
        this.results = respJson;
        this.isLoading = false;
        console.log(respJson.name,'respJson', typeof respJson)
        }
            catch(err){
                console.log('failed fetch')
                this.isLoading = false;
            }
        }
    }

export const Details = observer((props: any) => {
    const [state] = React.useState( () => new DetailsState() )

    React.useEffect( () => {
        state.getDetails(props.match.params.id);
    }, [state, props.match.params.id]);

    const { match } = props;
    let usersData: JSX.Element;

    if (state.isLoading) {
        usersData = ( <Spinner />)
    }

    if (!state.isLoading && state.results)
        usersData = (
            <>
            <TitleText>Book number: {match.params.id}</TitleText>
            <DetailsContainer>
                <Column>
                    <ColumnText>Name</ColumnText>
                    <SmallTitle>{state.results.name}</SmallTitle>
                    <ColumnText>ISBN</ColumnText>
                    <SmallTitle>{state.results.isbn}</SmallTitle>
                </Column>
                <Column>
                    <ColumnText>Number of pages:</ColumnText>
                    <SmallTitle>{state.results.numberOfPages}</SmallTitle>
                    <ColumnText>Released:</ColumnText>
                    <SmallTitle>{state.results.released}</SmallTitle>
                </Column>
            </DetailsContainer>
            </>
        );

        if (state.results === null && state.isLoading === false)
        usersData = <h2> Sorry. Product doesn't exist </h2>;


    let history = useHistory();
    const handleBackClick = () => {
        history.push("/");
    }

    return(
        <AppBody data-set={'Details-body'}>
            <NamesBox>
                {usersData}
                <Button onClick={handleBackClick}>back</Button>
            </NamesBox>
        </AppBody>
    )

});
