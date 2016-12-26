//文字回复弹框
import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import { Button, Table, Select, Modal, Input, Popconfirm, message } from 'antd';

const Option = Select.Option;

export default class TextTypeModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      content: ''
    }
  }

  handleOk(){
    let {modalOK} = this.props;
    modalOK && modalOK(this.state);
    this.setState({keyword: '', content: ''});
  }
  
  handleCancel(){
    let {closeModal} = this.props;
    closeModal && closeModal();
    this.setState({keyword: '', content: ''});
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