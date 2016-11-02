// menu 菜单管理
import React, {Component} from 'react';
import { Button, Table, Select, Collapse } from 'antd';

import './menu.scss';

import { connect } from 'react-redux';
import bindActions from '../../actions/bind';

const Option = Select.Option;
const Panel = Collapse.Panel;

//左侧菜单管理
class MenuManage extends Component{
  constructor(props) {
    super(props);
    this.addTopMenu = this.addTopMenu.bind(this);
    this.sortMenu = this.sortMenu.bind(this);
    this.collapseChange = this.collapseChange.bind(this);
    this.renderPanelHeader = this.renderPanelHeader.bind(this);
  }
  //添加一级菜单按钮
  addTopMenu(){
    console.log('------click addTopMenu');
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
  renderPanelHeader(item){
    return (
      <div className="menu-panel-header">
        <span>{item.name}</span>
      </div>
    )
  }
  render(){
    let data = [{id: 1, name: "主菜单1", sub_button: [{id: 11, name: "子菜单11"}, {id: 12, name: "子菜单12"}]},
                {id: 2, name: "主菜单2", sub_button: [{id: 21, name: "子菜单21"}, {id: 22, name: "子菜单22"}]},
                {id: 3, name: "主菜单3", sub_button: [{id: 31, name: "子菜单31"}, {id: 32, name: "子菜单32"}]},
              ];
    return (
      <div className="menu-manage-container">
        <div className="flex flex-center-h menu-manage-head">
          <span>菜单管理</span>
          <Button onClick={this.addTopMenu}>添加</Button>
          <Button onClick={this.sortMenu}>排序</Button>
        </div>
        <div className="menu-manage-body">
          <Collapse onChange={this.collapseChange}>
          {
            data.map((item, index)=>{
              return (
                <Panel key={item.id} header={this.renderPanelHeader(item)}>
                {
                  item.sub_button.length&&item.sub_button.map((button, index)=>{
                    return (
                      <div key={index}>
                      {button.name}
                      </div>
                    )
                  })
                }
                </Panel>
              )
            })
          }
          </Collapse>
        </div>
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
          loading: false,
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    componentDidMount(){
        
    }

    handleSelectChange(value){
      console.log(`select ${value}`);
    }

    render(){
      let accounts = [{id: 1, name: "走客服务号"}, {id: 2, name: "行程定制服务号"}, {id: 3, name: "行程规划订阅号"}];
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
                      <MenuManage/>
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





