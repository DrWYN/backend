//图文回复
import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import { Button, Table, Select, Modal, Input, Popconfirm, message } from 'antd';

import './style.scss';

const Option = Select.Option;
const clone = require('clone');

class Item extends Component{
  constructor(props) {
    super(props);
  }
  deleteItem(){
    
    let {deleteItem, index} = this.props;

    deleteItem && deleteItem(index);
  }
  choosePic(){
    let {data, dataChange, index} = this.props;
    let tmpData = clone(data);
    // tmpData.pic = pic;
    dataChange && dataChange(index, tmpData);
  }

  //标题
  titleChange(e){
    let title = e.target.value;
    let {data, dataChange, index} = this.props;
    let tmpData = clone(data);
    tmpData.title = title;
    dataChange && dataChange(index, tmpData);

  }
  //链接
  srcChange(e){
    let src = e.target.value;
    let {data, dataChange, index} = this.props;
    let tmpData = clone(data);
    tmpData.src = src;
    dataChange && dataChange(index, tmpData);
  }
  //描述
  descChange(e){
    let desc = e.target.value;
    let {data, dataChange, index} = this.props;
    let tmpData = clone(data);
    data.desc = desc;
    dataChange && dataChange(index, data);
  }
  render(){
    let {data} = this.props;
    return (
      <div className="pic-type-item-container">
        <div className="pic-type-item-handle">
          <Button onClick={()=>{this.deleteItem()}}>删除</Button>
          <Button onClick={()=>{this.choosePic()}}>选择图片</Button>
        </div>
        <div className="pic-type-item">
          <Input addonBefore="标题：" value={data.title} onChange={(e)=>{this.titleChange(e)}}/>
        </div>
        <div className="pic-type-item">
          <Input addonBefore="链接：" value={data.src} onChange={(e)=>{this.srcChange(e)}}/>
        </div>
        <div className="pic-type-item">
          <Input addonBefore="描述：" value={data.desc} onChange={(e)=>{this.descChange(e)}}/>
        </div>
      </div>
    );
  }
}

export default class PicTypeModal extends Component{
  constructor(props) {
    super(props);
  
    this.state = {
      keyword: '',
      content: []
    };
  }

  handleOk(){
    let {modalOK} = this.props;
    modalOK && modalOK(this.state);
    this.setState({keyword: '', content: []});
  }
  
  handleCancel(){
    let {closeModal} = this.props;
    closeModal && closeModal();
    this.setState({keyword: '', content: []});
  }

  keywordChange(e){
    let value = e.target.value;
    console.log('---->>>>keyword = ', value);
    this.setState({keyword: value});
  }

  addItem(){
    let item = {
      img: '',  //图片
      title: '',  //标题
      src: '', //链接
      desc: ''  //描述
    };
    let tmp_content = clone(this.state.content);
    tmp_content.push(item);
    this.setState({content: tmp_content});
  }
  deleteItem(index){
    let tmp_content = clone(this.state.content);
    tmp_content.splice(index, 1);
    this.setState({content: tmp_content});
  }
  dataChange(index, data){
    console.log('--->>>>dataChange = ', index, data);
    let tmp_content = clone(this.state.content);
    tmp_content[index] = data;
    this.setState({content: tmp_content});
  }

  render(){
    return (
      <div>
        <Modal width={'80%'} title="图文回复" visible={this.props.visible}
          onOk={()=>{this.handleOk()}} onCancel={()=>{this.handleCancel()}}>
          <div>
            <Input addonBefore="关键字：" value={this.state.keyword} onChange={(e)=>{this.keywordChange(e)}}/>
          </div>
          <div style={{marginTop: '10px'}} className="flex pic-type-modal-container">
            <div className="flex-1 width-0">
              <Button onClick={()=>{this.addItem()}}>新增</Button>
              {
                this.state.content.length && this.state.content.map((item, index)=>{
                  return (
                    <Item key={index} index={index} data={item} deleteItem={(i)=>{this.deleteItem(i)}} dataChange={(i, d)=>{this.dataChange(i, d)}}/>
                  )
                })
              }
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}