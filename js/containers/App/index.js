import React, { Component } from 'react';
import { Menu, Breadcrumb, Icon } from 'antd';
import './app.scss';

import Sider from '../../components/Sider';


const SubMenu = Menu.SubMenu;

const App = React.createClass({

  render() {
    return (
      <div className="app-page-container">
        <div className="ant-layout-header">微信平台</div>
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