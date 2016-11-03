// menu 菜单管理
import React, {Component} from 'react';
import { Button, Table, Select, Collapse, Icon, Modal, message } from 'antd';

import './menu.scss';

import { connect } from 'react-redux';
import bindActions from '../../actions/bind';

const Option = Select.Option;
const Panel = Collapse.Panel;

//左侧菜单管理
class MenuManage extends Component{
  constructor(props) {
    super(props);
    this.state = {
      addMenuLv: 0, //点击的是添加几级菜单  1 - 1 2 - 2
      addIndex: 0,  //添加第几个主菜单的二级菜单
      modalVisible: false, //modal显示和隐藏
      errorMsg: ""  //错误提示语
    }
    // this.addTopMenu = this.addTopMenu.bind(this);
    // this.editTopMenu = this.editTopMenu.bind(this);
    // this.deleteTopMenu = this.deleteTopMenu.bind(this);

    // this.sortMenu = this.sortMenu.bind(this);
    this.collapseChange = this.collapseChange.bind(this);
    this.renderPanelHeader = this.renderPanelHeader.bind(this);

    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    // this.addSecondMenu = this.addSecondMenu.bind(this);
    // this.editSecondMenu = this.editSecondMenu.bind(this);
    // this.deleteSecondMenu = this.deleteSecondMenu.bind(this);
  }
  //显示弹框
  showModal(level, index){
    this.setState({addMenuLv: level, addIndex: index, modalVisible: true});
  }
  //隐藏弹框
  hideModal(){
    this.setState({addMenuLv: 0, addIndex: 0, modalVisible: false});
  }
  //弹框ok
  handleOk(){

    let text = "新添加的菜单";
    let {menus={}} = this.props;
    let {button=[]} = menus;

    let addTemp = {
      type: "view", 
      name: text, 
      url: "", 
      key: ""
    }

    if(this.state.addMenuLv === 1){ //添加主菜单
      addTemp.sub_button = [];
      button.push(addTemp);
    }else if(this.state.addMenuLv === 2){ //添加二级菜单
      button[this.state.addIndex].sub_button.push(addTemp);
    }
    this.hideModal();
  }
  //弹框calcel
  handleCancel(){
    this.hideModal();
  }

  //添加一级菜单按钮
  addTopMenu(){
    // console.log('------click addTopMenu');
    let {menus={}} = this.props;
    let {button=[]} = menus;
    if(button.length > 3){
      message.error('主菜单最多3个！！！');
      return;
    }
    this.showModal(1, 0);
  }
  //编辑一级菜单
  editTopMenu(menu, index, e){
    console.log('--------editTopMenu ', menu);
    e.preventDefault();
    e.stopPropagation();
  }
  //删除一级菜单
  deleteTopMenu(menu, index, e){
    console.log('--------deleteTopMenu ', menu);
    e.preventDefault();
    e.stopPropagation();
  }
  //添加二级菜单
  addSecondMenu(menu, index, e){
    // console.log('-------addSecondMenu ', menu);
    if(menu.sub_button.length > 5){
      message.error('二级菜单最多5个！！！');
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.showModal(2, index);
    e.preventDefault();
    e.stopPropagation();
  }
  //编辑二级菜单
  editSecondMenu(button, e){
    console.log('-------editSecondMenu ', button);
    e.preventDefault();
    e.stopPropagation();
  }
  //删除二级菜单
  deleteSecondMenu(button, e){
    console.log('----------- deleteSecondMenu ', button);
    e.preventDefault();
    e.stopPropagation();
  }
  //排序
  sortMenu(){
    console.log('------click sortMenu');
  }
  //折叠菜单change事件
  collapseChange(key){
    console.log('------collapseChange key = ', key);
  }
  //渲染折叠菜单header   add/edit/delete
  renderPanelHeader(menu, index){
    return (
      <div className="flex flex-center-h menu-panel-header">
        <span className="flex-1">{menu.name}</span>
        <Button icon="plus" onClick={this.addSecondMenu.bind(this, menu, index)}/>
        <Button icon="edit" onClick={this.editTopMenu.bind(this, menu, index)}/>
        <Button icon="delete" onClick={this.deleteTopMenu.bind(this, menu, index)}/>
      </div>
    )
  }
  render(){
    let {menus={}} = this.props;
    let {button=[]} = menus;
    if(!button.length) return null;

    return (
      <div className="menu-manage-container">
        <div className="flex flex-center-h menu-manage-head">
          <span>菜单管理</span>
          <Button onClick={this.addTopMenu.bind(this)}>添加</Button>
          <Button onClick={this.sortMenu.bind(this)}>排序</Button>
        </div>
        <div className="menu-manage-body">
          <Collapse onChange={this.collapseChange}>
          {
            button.map((menu, index)=>{
              return (
                <Panel key={index} header={this.renderPanelHeader(menu, index)}>
                {
                  menu.sub_button&&menu.sub_button.length ? menu.sub_button.map((button, index)=>{
                    return (
                      <div key={index} className="flex flex-center-h second-menu-item">
                        <div className="flex-1">{button.name}</div>
                        <Button type="ghost" icon="edit" onClick={this.editSecondMenu.bind(this, button)}/>
                        <Button type="ghost" icon="delete" onClick={this.deleteSecondMenu.bind(this, button)}/>
                      </div>
                    )
                  }) : null
                }
                </Panel>
              )
            })
          }
          </Collapse>
        </div>
        <Modal title="" visible={this.state.modalVisible}
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
        </Modal>
      </div>
    )
  }
}

//右侧设置动作
class SetEvent extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className="set-event-container">
        <div className="flex flex-center-h menu-manage-head">
          <span>设置动作</span>
        </div>
      </div>
    )
  }
}

export default class Menu extends Component{
    constructor(props){
        super(props);
        this.state={
          data: {
            accounts: [{id: 1, name: "走客服务号"}, {id: 2, name: "行程定制服务号"}, {id: 3, name: "行程规划订阅号"}],
            menus: {button:[
                {type: "view", name: "主菜单1", url: "", key: "", sub_button: []},
                {type: "view", name: "主菜单2", url: "", key: "", sub_button: [
                  {type: "view", name: "子菜单21", url: "", key: ""}
                ]},
              ]}
          }
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    componentDidMount(){
        
    }

    handleSelectChange(value){
      console.log(`select ${value}`);
    }

    render(){
        let {accounts, menus} = this.state.data;
        return (
            <div className="menu-page-container">
                <div className="choose-account">
                  <Select
                    showSearch
                    style={{width: 200}}
                    plactholder="选择一个公众号"
                    optionFilterProp="children"
                    onChange={this.handleSelectChange}
                    notFoundContent="">
                    {
                      accounts.map((account, index)=>{
                        return (<Option key={index} value={account.id.toString()}>{account.name}</Option>)
                      })
                    }
                  </Select>
                </div>
                <div className="table-container">
                  <div className="table-tips">可创建最多三个一级菜单，每一级菜单下可创建最多5个二级菜单！</div>
                  <div className="flex table-border">
                    <div className="flex-1">
                      <MenuManage menus={menus}/>
                    </div>
                    <div className="flex-2">
                      <SetEvent/>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}





