import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppWithReducer from "./AppWithReducer";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";


ReactDOM.render(
    <Provider store={store}>
        <AppWithRedux />
    </Provider>, document.getElementById('root'));


