import React from 'react';
import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;
// const Option = Select.Option;
// const AutoCompleteOption = AutoComplete.Option;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemember = this.handleRemember.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    this.state = {
      confirmDirty: false,
    };
    this.remember = false;
  }
  handleRemember = (e) => {
    this.remember = e.target.checked;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const remember = this.remember;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSubmit(values, remember);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="E-mail"
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Password"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your password!' }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        
        <FormItem className="isoInputWrapper" {...tailFormItemLayout}>
          {/* <div className="isoInputWrapper isoLeftRightComponent"> */}
            {/* <Checkbox onChange={this.handleRemember} >Remember Me</Checkbox> */}
            <Button type="primary" htmlType="submit" style={{width: "100%"}}>Login</Button>
          {/* </div> */}
        </FormItem>
      </Form>
    );
  }

}

const SigninForm = Form.create()(LoginForm);
export default SigninForm;