import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ObjectsActivity from "./ObjectsActivity/ObjectsActivity";

export const Application = () => {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <ObjectsActivity />
                </Route>
                <Route path="/objects">
                    <ObjectsActivity />
                </Route>
            </Switch>
        </Router>
    );
};
