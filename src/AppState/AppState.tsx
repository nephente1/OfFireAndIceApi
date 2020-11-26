import * as React from 'react';
import { MainPageState } from './MainPageState';

export class AppState {
    readonly mainPageState: MainPageState;

    constructor() {
        this.mainPageState = new MainPageState();
    }

    static createForContext(): AppState {
        return new AppState();
    }
}

const AppContext = React.createContext(AppState.createForContext());
export const Provider = AppContext.Provider;

export const useAppStateContext = (): AppState => {
    return React.useContext(AppContext);
};
