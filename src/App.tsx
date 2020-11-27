import * as React from 'react';
import {observer} from 'mobx-react-lite';
import { Provider, AppState } from './AppState/AppState';
import { AppRouting } from './MainPage/AppRouting';

const appStore = new AppState();

export const App = observer(() => {
    return (
        <Provider value={appStore}>
            <AppRouting />
        </Provider>
    );
});
