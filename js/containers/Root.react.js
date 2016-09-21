import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, Redirect } from 'react-router';
import {hashHistory} from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// import reducers from '../reducers';

import App from './app/';


// let store = createStore(reducers);

const Home = (location, cb) => {
            require.ensure([], require => {
                cb(null, require('./Home.react').default)
            })
        };
//账号管理
const Account = (location, cb) => {
            require.ensure([], require => {
                cb(null, require('./account').default)
            })
        };
//菜单管理
const Menu = (location, cb) => {
            require.ensure([], require => {
                cb(null, require('./menu').default)
            })
        };
//关注消息
const Attention = (location, cb) => {
            require.ensure([], require => {
                cb(null, require('./attention').default)
            })
        };
//关键字回复
const Keyword = (location, cb) => {
            require.ensure([], require => {
                cb(null, require('./keyword').default)
            })
        };
//订阅发刊
const Subscribe = (location, cb) => {
            require.ensure([], require => {
                cb(null, require('./subscribe').default)
            })
        };
//消息通知
const Notice = (location, cb) => {
            require.ensure([], require => {
                cb(null, require('./notice').default)
            })
        };
//临时素材
const TemporaryMaterial = (location, cb) => {
            require.ensure([], require => {
                cb(null, require('./temporaryMaterial').default)
            })
        };
//永久素材
const ForeverMaterial = (location, cb) => {
            require.ensure([], require => {
                cb(null, require('./foreverMaterial').default)
            })
        };

export default class Root extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
                <Router history={hashHistory}>
                    <Route component={App}>
                        <Route name="home" breadcrumbName="/" path="/" getComponent={Home} />
                        <Route name="account" breadcrumbName="Account" path="account" getComponent={Account} />
                        <Route name="menu" breadcrumbName="Menu" path="menu" getComponent={Menu} />
                        <Route name="attention" breadcrumbName="Attention" path="attention" getComponent={Attention} />
                        <Route name="keyword" breadcrumbName="Keyword" path="keyword" getComponent={Keyword} />
                        <Route name="subscribe" breadcrumbName="Subscribe" path="subscribe" getComponent={Subscribe} />
                        <Route name="notice" breadcrumbName="Notice" path="notice" getComponent={Notice} />
                        <Route name="temporaryMaterial" breadcrumbName="TemporaryMaterial" path="temporary-material" getComponent={TemporaryMaterial} />
                        <Route name="foreverMaterial" breadcrumbName="ForeverMaterial" path="forever-material" getComponent={ForeverMaterial} />
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