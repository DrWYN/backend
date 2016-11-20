// 登录页面
import React, {Component} from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import {Link} from 'react-router';
import './login.scss';

import Login from './Login.react';
import Register from './Register.react';
import Edit from './Edit.react';

const LOGIN = "login";
const REGISTER = "register";
const EDIT = "edit";


export default class LoginPage extends Component{
    constructor(props){
        super(props);
        this.state = {
          page: LOGIN
        };
        this.getComponentByState = this.getComponentByState.bind(this);
    }

    getComponentByState(state){
      let resComponent;

      switch(state){
        case LOGIN:
          resComponent = <Login />;
        break;
        case REGISTER:
          resComponent = <Register />;
        break;
        case EDIT:
          resComponent = <Edit />;
        break;
        default:
          resComponent = <Login />;
        break;
      }
      return resComponent;
    }

    changePageState(page){
      this.setState({page: page})
    }
    

    render(){
      let component = this.getComponentByState(this.state.page);
        return (
            <div className="login-page-container">
                <h1>微信 管理控制台</h1>
                <h4>© 走客</h4>
                <div className="form-container">
                    {component}
                    <div className="flex flex-center">
                      <a className={"footer-item " + (this.state.page === LOGIN ? "show" : "hide")} onClick={()=>{this.changePageState(EDIT)}}>忘记密码</a>
                      <a className={"footer-item " + (this.state.page === LOGIN ? "show" : "hide")} onClick={()=>{this.changePageState(REGISTER)}}>立即注册</a>
                      <a className={"footer-item " + (this.state.page !== LOGIN ? "show" : "hide")} onClick={()=>{this.changePageState(LOGIN)}}>回到登录页面</a>
                    </div>
                </div>
            </div>
        );
    }
}





