import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, Redirect } from 'react-router';
import {hashHistory} from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// import reducers from '../reducers';

import App from './App/';


// let store = createStore(reducers);

const Home = (location, cb) => {
            require.ensure([], require => {
                cb(null, require('./Home.react').default)
            })
        };


// class App extends Component{
//     constructor(props){
//         super(props);
//     }   
//     render(){
//         return (
//             <div>
//                 {this.props.children}
//             </div>
//         );
//     }
// }

export default class Root extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
                <Router history={hashHistory}>
                    <Route component={App}>
                        <Route path="/" getComponent={Home} />
                        <Route path="*" getComponent={Home} />
                    </Route>
                </Router>
        );
        // return (
        //     <Provider store={store}>
        //         <Router history={hashHistory}>
        //             <Route component={App}>
        //                 <Route path="/" getComponent={Home} />
        //                 <Route path="*" getComponent={Home} />
        //             </Route>
        //         </Router>
        //     </Provider>
        // );
    }
}