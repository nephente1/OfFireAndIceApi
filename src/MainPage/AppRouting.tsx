import React from 'react';
import { observer } from "mobx-react-lite";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Details } from './Details';
import { MainPage } from './MainPage';

export const AppRouting = observer(() => {
    return(
        <Router>
            <Switch>
                <Route exact path="/" component={MainPage}/>
                <Route path="/:id" render={ (props) => <Details {...props} />}/>
            </Switch>
        </Router>
    )
});
