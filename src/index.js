import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import 'jquery';
import 'bootstrap';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Quality } from './components/Quality';
import { AgentForm } from './components/AgentForm';
import { Header } from './components/Header';
import { AddExpenses, ViewExpenses } from './containers/Expenses';
import { Footer } from './components/Footer';
import { InTransaction } from './components/InTransaction';
import { Provider } from "react-redux";
import { store } from "./store";
import { Search } from './containers/Search'

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div className="container">
                <Header />
                <div>
                    <Switch>
                        <Route exact path='/' component={AgentForm}></Route>
                        <Route path='/quality' component={Quality}></Route>
                        <Route path='/addexpenses' component={AddExpenses}></Route>
                        <Route path='/viewexpenses' component={ViewExpenses}></Route>
                        <Route path='/intransaction' component={InTransaction}></Route>
                        <Route path='/search' component={Search}></Route>
                    </Switch>
                </div>
                <Footer />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
