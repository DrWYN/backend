// menu 菜单管理
import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import { Button, Table, Select, Collapse, Icon, Modal, Input, message } from 'antd';

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
      // addMenuLv: 0, //点击的是添加几级菜单  1 - 1 2 - 2
      // addIndex: 0,  //添加第几个主菜单的二级菜单
      modalVisible: false, //modal显示和隐藏
      errorMsg: ""  //错误提示语
    }
    this.addMenuLv = 0;//点击的是添加几级菜单  1 - 1 2 - 2
    this.addIndex = 0;//添加第几个主菜单的二级菜单

    this.collapseChange = this.collapseChange.bind(this);
    this.renderPanelHeader = this.renderPanelHeader.bind(this);

    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  //显示弹框
  showModal(){
    this.setState({modalVisible: true});
  }
  //隐藏弹框
  hideModal(){
    this.setState({modalVisible: false});
    this.addMenuLv = 0;
    this.addIndex = 0;
    //清空input输入框
    findDOMNode(this.refs.nameInput).value = "";
  }
  //弹框ok
  handleOk(){

    // let name = "新添加的菜单";
    let name = findDOMNode(this.refs.nameInput).value;
  
    bindActions.addMenu(this.addMenuLv, this.addIndex, name);
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
    if(button.length > 2){
      message.error('主菜单最多3个！！！');
      return;
    }
    this.addMenuLv = 1;
    this.showModal();
  }
  //编辑一级菜单
  editTopMenu(menu, index, e){
    console.log('--------editTopMenu ', index);
    let {editOpt} = this.props;
    editOpt&&editOpt(1, index);
    e.preventDefault();
    e.stopPropagation();
  }
  //删除一级菜单
  deleteTopMenu(menu, index, e){
    // console.log('--------deleteTopMenu ', index);
    let {menus={}} = this.props;
    let {button=[]} = menus;
    Modal.warning({
      title: "删除主菜单",
      content: `确定删除第${index+1}级主菜单吗？`,
      onOk: ()=>{bindActions.deleteMenu(1, index)}
    })
    e.preventDefault();
    e.stopPropagation();
  }
  //添加二级菜单
  addSecondMenu(menu, index, e){
    // console.log('-------addSecondMenu ', index);
    if(menu.sub_button.length > 4){
      message.error('二级菜单最多5个！！！');
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.addMenuLv = 2;
    this.addIndex = index;
    this.showModal();
    e.preventDefault();
    e.stopPropagation();
  }
  //编辑二级菜单
  editSecondMenu(sub_button, topindex, secIndex, e){
    console.log('-------editSecondMenu ', secIndex);
    let {editOpt} = this.props;
    editOpt&&editOpt(2, topindex, secIndex);
    e.preventDefault();
    e.stopPropagation();
  }
  //删除二级菜单
  deleteSecondMenu(sub_button, topindex, secIndex, e){
    // console.log('----------- deleteSecondMenu ', secIndex);
  
    Modal.warning({
      title: "删除该菜单",
      content: `确定删除第${secIndex+1}级子菜单吗？`,
      onOk: ()=>{bindActions.deleteMenu(2, topindex, secIndex)}
    })
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

    let display = button.length ? "block" : "none";
    // if(!button.length) return null;

    return (
      <div className="menu-manage-container">
        <div className="flex flex-center-h menu-manage-head">
          <span>菜单管理</span>
          <Button onClick={this.addTopMenu.bind(this)}>添加</Button>
          <Button onClick={this.sortMenu.bind(this)}>排序</Button>
        </div>
        <div className="menu-manage-body" style={{display: display}}>
          <Collapse onChange={this.collapseChange}>
          {
            button.map((menu, index)=>{
              return (
                <Panel key={index} header={this.renderPanelHeader(menu, index)}>
                {
                  menu.sub_button&&menu.sub_button.length ? menu.sub_button.map((sub_button, subIndex)=>{
                    return (
                      <div key={subIndex} className="flex flex-center-h second-menu-item">
                        <div className="flex-1">{sub_button.name}</div>
                        <Button type="ghost" icon="edit" onClick={this.editSecondMenu.bind(this, sub_button, index, subIndex)}/>
                        <Button type="ghost" icon="delete" onClick={this.deleteSecondMenu.bind(this, sub_button, index, subIndex)}/>
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
        <Modal title="" closable={false} visible={this.state.modalVisible}
          onOk={this.handleOk} onCancel={this.handleCancel}
        >
          <span>name:</span>
          <input type="text" ref="nameInput"/>
        </Modal>
      </div>
    )
  }
}

//右侧设置动作
class SetEvent extends Component{
  constructor(props) {
    super(props);
    
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleKeyChange = this.handleKeyChange.bind(this);

    this.saveChange = this.saveChange.bind(this);  
    this.state = {
      type: 'view',
      name: '',
      url: '',
      key: ''
    };
    this.defaultValue = {
      type: 'view',
      name: '',
      url: '',
      key: ''
    };
}
  componentDidMount(){
   
  }
  componentWillReceiveProps(nextProps){
    if(JSON.stringify(this.props) !== JSON.stringify(nextProps)){
      this.changeState(nextProps);
    }
  }
  changeState(props){
    let {menus, editData={}} = props;
    let {level, topIndex=0, secIndex=0} = editData;
    let defaultValue = {};
    if(level === 1){
      let obj = menus.button[topIndex] || this.defaultValue;
      defaultValue.type = obj.type;
      defaultValue.name = obj.name;
      defaultValue.url = obj.url;
      defaultValue.key = obj.key;
    }else if(level === 2){
      let obj = menus.button[topIndex].sub_button[secIndex] || this.defaultValue;
      defaultValue.type = obj.type;
      defaultValue.name = obj.name;
      defaultValue.url = obj.url;
      defaultValue.key = obj.key;
    }
    this.setState({type: defaultValue.type, name: defaultValue.name, url: defaultValue.url, key: defaultValue.key})
  }
  handleTypeChange(value){
    this.setState({type: value});
  }
  handleNameChange(e){
    this.setState({name: e.target.value});
  }
  handleUrlChange(e){
    this.setState({url: e.target.value});
  }
  handleKeyChange(e){
    this.setState({key: e.target.value});
  }
  saveChange(){
    console.log('----->>>save = ', this.state);
    let {menus, editData={}} = this.props;
    let {level, topIndex=0, secIndex=0} = editData;
    bindActions.editMenu(level, topIndex, secIndex, this.state);
  }
  render(){
    let {menus, editData={}} = this.props;
    let {level, topIndex=0, secIndex=0} = editData;

    let display = level ? "block" : "none";

    // let defaultValue = {};
    // if(level === 1){
    //   let obj = menus.button[topIndex];
    //   defaultValue.type = obj.type;
    //   defaultValue.name = obj.name;
    //   defaultValue.url = obj.url;
    //   defaultValue.key = obj.key;
    // }else if(level === 2){
    //   let obj = menus.button[topIndex].sub_button[secIndex];
    //   defaultValue.type = obj.type;
    //   defaultValue.name = obj.name;
    //   defaultValue.url = obj.url;
    //   defaultValue.key = obj.key;
    // }
    return (
      <div className="set-event-container">
        <div className="flex flex-center-h menu-manage-head">
          <span>设置动作</span>
        </div>
        <div className="flex flex-column menu-manage-body" style={{display: display}}>
          <div className="flex body-item-container">
            <span>type:</span>
            <Select value={this.state.type} style={{ width: 200 }} onChange={this.handleTypeChange}>
              <Option value="view">跳转URL</Option>
              <Option value="click">点击推事件</Option>
              <Option value="scancode_push">扫码推事件</Option>
              <Option value="pic_sysphoto">弹出系统拍照发图</Option>
              <Option value="location_select">弹出地理位置选择器</Option>
            </Select>
          </div>
          <div className="flex body-item-container">
            <span>name:</span>
            <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
          </div>
          <div className="flex body-item-container">
            <span>url:</span>
            <input type="text" value={this.state.url} onChange={this.handleUrlChange}/>
          </div>
          <div className="flex body-item-container">
            <span>key:</span>
            <input type="text" value={this.state.key} onChange={this.handleKeyChange}/>
          </div>
          <div className="flex body-item-container">
            <Button type="primary" onClick={this.saveChange}>save</Button>
          </div>
        </div>
      </div>
    )
  }
}

class Menu extends Component{
    constructor(props){
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.editOpt = this.editOpt.bind(this);
        this.state = {
          editData: {
            level: 0,
            topIndex: 0,
            secIndex: 0
          }
        }
    }

    componentDidMount(){
        //拉数据
    }
    //点击编辑按钮
    editOpt(level, topIndex, secIndex){
      console.log('------>>>>>editOpt = ');
      this.setState({
        editData: {
          level: level,
          topIndex: topIndex,
          secIndex: secIndex
        }
      })
    }

    handleSelectChange(value){
      console.log(`select ${value}`);
    }

    render(){
        let {accounts, menus} = this.props.data;
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
                      <MenuManage menus={menus} editOpt={this.editOpt}/>
                    </div>
                    <div className="flex-2">
                      <SetEvent menus={menus} editData={this.state.editData}/>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
  let {data} = state.zk_menu;
  return {data};
}

export default connect(mapStateToProps)(Menu);





