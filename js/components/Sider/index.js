import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

const Sider = React.createClass({
  getInitialState() {
    return {
      current: 'account',
      openKeys: [],
    };
  },
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
      openKeys: e.keyPath.slice(1),
    });
  },
  onToggle(info) {
    this.setState({
      openKeys: info.open ? info.keyPath : info.keyPath.slice(1),
    });
  },
  render() {
    return (
      <Menu onClick={this.handleClick}
        theme="light"
        style={{ width: 240 }}
        openKeys={this.state.openKeys}
        onOpen={this.onToggle}
        onClose={this.onToggle}
        selectedKeys={[this.state.current]}
        mode="inline"
      >
        <Menu.Item key="account">
          <Icon type="mail" /><Link to='/account'>账号管理</Link>
        </Menu.Item>
        <Menu.Item key="menu">
          <Icon type="mail" /><Link to='/menu'>菜单管理</Link>
        </Menu.Item>
        <SubMenu key="autoReply" title={<span><Icon type="mail" /><span>自动回复</span></span>}>
          <Menu.Item key="attention">
            <Link to='/attention'>关注消息</Link>
          </Menu.Item>
          <Menu.Item key="keyword">
            <Link to='/keyword'>关键字回复</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sendMsg" title={<span><Icon type="appstore" /><span>消息发送</span></span>}>
          <Menu.Item key="subscribe">
            <Link to='/subscribe'>订阅发刊</Link>
          </Menu.Item>
          <Menu.Item key="notice">
            <Link to='/notice'>消息通知</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="materialManage" title={<span><Icon type="setting" /><span>素材管理</span></span>}>
          <Menu.Item key="temporaryMaterial">
            <Link to='/temporary-material'>临时素材</Link>
          </Menu.Item>
          <Menu.Item key="foreverMaterial">
            <Link to='/forever-material'>永久素材</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  },
});
export default Sider;