import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Products } from './components/Products';
import { Home } from './components/Home';
import { Header } from './components/Header';
import { AddExpenses, ViewExpenses } from './containers/Expenses';
import { Footer } from './components/Footer';

ReactDOM.render(
    <Router>
        <div className="container">
            <Header />
            <div style={{ backgroundColor: '#f8f2f2', marginTop: '10px' }}>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/products' component={Products}></Route>
                    <Route path='/addexpenses' component={AddExpenses}></Route>
                    <Route path='/viewexpenses' component={ViewExpenses}></Route>
                </Switch>
            </div>
            <Footer />
        </div>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
