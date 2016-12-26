import React, { Component } from 'react';
import { Button, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router';
import './app.scss';

import Sider from '../../components/sider';


const SubMenu = Menu.SubMenu;

const App = React.createClass({

  render() {
    return (
      <div className="app-page-container">
        <div className="ant-layout-header flex">
          <div className="flex flex-1 flex-center-h">
            微信平台
          </div>
          <div className="login">
            <Link to='/login'>登录</Link>
          </div>
        </div>
        <aside className="ant-layout-sider">
          <Sider/>
        </aside>
        <div className="ant-layout-main">
          
          <div className="ant-layout-breadcrumb">
            <Breadcrumb {...this.props} />
          </div>
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              <div>
                {this.props.children}
              </div>
            </div>
          </div>
          <div className="ant-layout-footer">
          © 2016 由 XX 支持
          </div>
        </div>
      </div>
    );
  },
});

export default App;