import * as React from 'react';
import { observable, action, computed } from 'mobx';

export interface ResponseItemType {
    name: string,
    aliases: Array<string>,
    gender?: string,
    culture?: string,
    tvSeries?: any,
    books?: string
}

export class MainPageState {
    @observable results: Array<ResponseItemType> = [];
    @observable isLoading: boolean = true;
    @observable nums: number = 0;
    @observable searchResults: Array<ResponseItemType> = [];
    @observable selectedCategory: string = 'select gender';
    @observable resultedGender: string | null = null;
    @observable pageSize: number = 10;
    @observable searchValue: string;
    @observable pageNumber: number = 1;

    constructor() {
        this.searchValue = '';
    }

    @computed get searchResultsData() {
        return this.searchResults;
    }

    @action filteredResults = () => {
        if (this.resultedGender !== null) {
            this.searchResults = this.results;
            let res = this.searchResults.filter(el => el.name.toLowerCase().match(this.searchValue) && el.gender === this.resultedGender);
            this.searchResults = res;
        }
        if (this.resultedGender === null) {
            const res = this.results.filter(el => el.name.toLowerCase().match(this.searchValue ));
            this.searchResults = res;
        }
    }

    @action async loadData() {
        try {
            const response = await fetch(`https://www.anapioficeandfire.com/api/characters?page=${this.pageNumber}&pageSize=${this.pageSize}`);
            const respJson = await response.json();
            this.results = respJson;
            this.searchResults = respJson;
            this.isLoading = false;
            this.filteredResults();
        }
        catch(err){
            console.log('failed fetch')
        }
    }

    @action setPageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const size = event.target.value === '-' ? '10' : event.target.value;
        this.pageSize = parseInt(size);
        this.loadData();
        this.filteredResults();
    }

    inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.getResultedGender(this.selectedCategory)
        console.log('this.resultedGender2', this.resultedGender)
        this.searchValue = e.target.value;
        if (this.resultedGender !== null){
            this.searchResults = this.results;
            const res = this.results.filter(el => el.name.toLowerCase().match(e.target.value.toLowerCase()) && el.gender === this.resultedGender);
            this.searchResults = res;
        }
        if (this.resultedGender === null) {
            const res = this.results.filter(el => el.name.toLowerCase().match(e.target.value.toLowerCase() ));
            this.searchResults = res;
        }

        this.nums = 0;
    }

    @action handleClickNext = () => {
        this.pageNumber = this.pageNumber + 1;
        this.loadData();
    }

    handleClickPrev = () => {
        this.pageNumber = this.pageNumber > 1 ? this.pageNumber - 1 : 1;
        this.loadData();
    }

    @computed get firstTenElements() {
        return this.searchResults.slice(this.nums, this.nums + 10);
    }

    @action getResultedGender = (resultedGen: string) => {
        switch(resultedGen) {
            case 'Female':
                this.resultedGender =  'Female'
                break;
            case 'Male':
                this.resultedGender =  'Male'
                break;
            case 'select gender':
                this.resultedGender =  null
        }
    }

    @action onSelectCategory = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        const categoryId = event.target.value;
        this.selectedCategory = categoryId;
        this.getResultedGender(categoryId)
        this.filteredResults();
    };

}
