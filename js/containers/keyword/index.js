// keyword 关键字回复
import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';

import { connect } from 'react-redux';
import bindActions from '../../actions/bind';

import './keyword.scss';

import { Button, Table, Select, Modal, Input, Popconfirm, message } from 'antd';

const Option = Select.Option;

class TextTypeModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      content: ''
    }
  }

  handleOk(){
    let {modalOK} = this.props;
    modalOK && modalOK();
  }
  
  handleCancel(){
    let {closeModal} = this.props;
    closeModal && closeModal();
  }

  keywordChange(e){
    let value = e.target.value;
    console.log('---->>>>keyword = ', value);
    this.setState({keyword: value});
  }

  contentChange(e){
    let content = e.target.value;
    console.log('--->>>content = ', content);
    this.setState({content: content});
  }
  
  render(){
    return (
      <div>
        <Modal title="关键字回复" visible={this.props.visible}
          onOk={()=>{this.handleOk()}} onCancel={()=>{this.handleCancel()}}>
          <div>
            <Input addonBefore="关键字：" value={this.state.keyword} onChange={(e)=>{this.keywordChange(e)}}/>
          </div>
          <div style={{marginTop: '10px'}}>
            <Input type="textarea" placeholder="自动回复内容" value={this.state.content} autosize={{ minRows: 2, maxRows: 6 }} onChange={(e)=>{this.contentChange(e)}}/>
          </div>
        </Modal>
      </div>
    );
  }
}


class Keyword extends Component{
    constructor(props){
        super(props);
        this.state = {
          textModalVisible: false,
          picModalVisible: false
        }
    }

    showTextModal(){
      this.setState({textModalVisible: true});
    }
    closeTextModal(){
      this.setState({textModalVisible: false});
    }
    textModalOK(){
      this.setState({textModalVisible: false});
    }


    handleSelectChange(value){
      console.log(`select ${value}`);
    }
    onChange(pagination, filters, sorter) {
      // 点击分页、筛选、排序时触发
      console.log('各类参数是', pagination, filters, sorter);
    }

    //operate
    handleView(item){
        console.log('------>>>handleView', item);
    }
    handleEdit(item){
        console.log('------>>>handleEdit', item);
    }
    handleDelete(item){
        console.log('------>>>handleDelete', item);
    }

    render(){
        // let accounts = [{id: 1, name: "走客服务号"}, {id: 2, name: "行程定制服务号"}, {id: 3, name: "行程规划订阅号"}];
        // let data = [{id: 60001, account: "走客-服务号", key_word: "zouke-test", type: "text", desc: 'id'}, 
        //     {id: 60002, account: "行程定制-服务号", key_word: "zktravel", type: "text", desc: 'id'},
        //     {id: 60003, account: "走客-服务号", key_word: "myzouke", type: "pic", desc: 'id'}]

        let {accounts, messages} = this.props.data;

        const columns = [{
          title: 'id',
          dataIndex: 'id',
          key: 'id',
          sorter: (a, b) => a.id - b.id,
        }, {
          title: '微信号',
          dataIndex: 'account',
          key: 'account',
          sorter: (a, b) => a.name.length - b.name.length,
        }, {
          title: '关键字',
          dataIndex: 'key_word',
          key: 'wechat_id',
          sorter: (a, b) => a.wechat_id.length - b.wechat_id.length,
        }, {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          sorter: (a, b) => a.type.length - b.type.length,
          filters: [
                    { text: 'text', value: 'text' },
                    { text: 'pic', value: 'pic' },
                  ],
        onFilter: (value, record) => record.type.includes(value),
        }, {
          title: '概述',
          dataIndex: 'desc',
          key: 'desc',
          sorter: (a, b) => a.o_id.length - b.o_id.length,
        }, {
          title: '操作',
          key: 'operation',
          render: (text, record) => (
            <span>
              <Button type="ghost" size="small"  icon="search" onClick={()=>this.handleView(record)}/>
              <Button type="ghost" size="small"  icon="edit"  onClick={()=>this.handleEdit(record)}/>
              <Popconfirm placement="top" title="确定删除？" onConfirm={()=>this.handleDelete(record)} okText="Yes" cancelText="No">
                <Button type="ghost" size="small"  icon="delete" />
              </Popconfirm>
            </span>
          ),
        }];
        const pagination = {
          total: messages.length,
          showSizeChanger: true,
          onShowSizeChange(current, pageSize) {
            console.log('Current: ', current, '; PageSize: ', pageSize);
          },
          onChange(current) {
            console.log('Current: ', current);
          },
        };

        return (
            <div className="keyword-page-container">
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
                <div className="body-container">
                  <div className="button-container">
                    <Button onClick={()=>{this.showTextModal()}}>文字回复</Button>
                    <Button>图文回复</Button>
                  </div>
                  <div className="table-container">
                    <div>消息列表</div>
                    <Table columns={columns} dataSource={messages} pagination={pagination} onChange={this.onChange.bind(this)}/>
                  </div>
                </div>
                <TextTypeModal visible={this.state.textModalVisible} closeModal={()=>{this.closeTextModal()}} modalOK={(data)=>{this.textModalOK(data)}}/>
            </div>
        );
    }
}

function mapStateToProps(state){
  let {data} = state.zk_keyword;
  return {data};
}

export default connect(mapStateToProps)(Keyword);





