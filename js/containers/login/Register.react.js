
//注册模块
import React, {Component} from 'react';
import { Button, Form, Input } from 'antd';

const FormItem = Form.Item;

function noop() {
  return false;
}

class Register extends React.Component {
  getValidateStatus(field) {
    const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;

    if (isFieldValidating(field)) {
      return 'validating';
    } else if (!!getFieldError(field)) {
      return 'error';
    } else if (getFieldValue(field)) {
      return 'success';
    }
  }

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      console.log(values);
    });
  }

  userExists(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      setTimeout(() => {
        if (value === 'wang') {
          callback([new Error('抱歉，该用户名已被占用。')]);
        } else {
          callback();
        }
      }, 800);
    }
  }

  checkPass(rule, value, callback) {
    const { validateFields } = this.props.form;
    if (value) {
      validateFields(['rePasswd']);
    }
    callback();
  }

  checkPass2(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('passwd')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
    const nameProps = getFieldDecorator('name', {
      rules: [
        { required: true, min: 5, message: '用户名至少为 5 个字符' },
        { validator: this.userExists },
      ],
    });
    const emailProps = getFieldDecorator('email', {
      validate: [{
        rules: [
          { required: true },
        ],
        trigger: 'onBlur',
      }, {
        rules: [
          { type: 'email', message: '请输入正确的邮箱地址' },
        ],
        trigger: ['onBlur', 'onChange'],
      }]
    });
    const passwdProps = getFieldDecorator('passwd', {
      rules: [
        { required: true, whitespace: true, message: '请填写密码' },
        { validator: this.checkPass.bind(this) },
      ],
    });
    const rePasswdProps = getFieldDecorator('rePasswd', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请再次输入密码',
      }, {
        validator: this.checkPass2.bind(this),
      }],
    });
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form>
        <FormItem
          {...formItemLayout}
          label="用户名："
          hasFeedback
          help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}>
          {nameProps(<Input placeholder="实时校验，输入 wang 看看" />)}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="邮箱："
          hasFeedback>
          {emailProps(<Input type="email" placeholder="onBlur 与 onChange 相结合" />)}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="密码："
          hasFeedback>
          {passwdProps(<Input type="password" autoComplete="off" placeholder="两次输入密码保持一致"
            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} />)}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="确认密码："
          hasFeedback>
          {rePasswdProps(<Input type="password" autoComplete="off" placeholder="两次输入密码保持一致"
            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} />)}
        </FormItem>

        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
          <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type="ghost" onClick={this.handleReset.bind(this)}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(Register);