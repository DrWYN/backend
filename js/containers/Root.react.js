import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, Redirect, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history'
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './app/';

import store from '../store/configureStore';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })


const Home = (location, cb) => {
            require.ensure([], require => {
                cb(null, require('./Home.react').default)
            })
        };
//登录
const Login = (location, cb) => {
            require.ensure([], require => {
                cb(null, require('./login').default)
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
        this.canUse = this.canUse.bind(this);
    }
    canUse(){
        console.log('------->>>>>权限验证，是否需要登录');
    }
    render(){
        return (
            <Provider  store={store}>
                <Router history={appHistory}>
                <Route name="login" breadcrumbName="login" path="login" getComponent={Login}/>
                    <Route onEnter={this.canUse} component={App}>
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
            </Provider>
        );
    }
}