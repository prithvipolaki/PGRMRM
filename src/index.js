import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Products } from './components/Products';
import { Home } from './components/Home';
import { Header } from './components/Header';
import { AddExpenses, ViewExpenses } from './containers/Expenses';

ReactDOM.render(
    <Router>
        <div className="container">
            <Header />
            <div>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/products' component={Products}></Route>
                    <Route path='/addexpenses' component={AddExpenses}></Route>
                    <Route path='/viewexpenses' component={ViewExpenses}></Route>
                </Switch>
            </div>
        </div>
    </Router>
    ,
    document.getElementById('root')
);
registerServiceWorker();
