import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { map } from 'lodash';
import { Form, Input, InputNumber, Select, Modal, Button } from "antd";

import { removeCurrentPointer, editDataPoint } from 'Ducks/added-photo';

import brandList from 'Data/brand-list';
import rouble from './img/rouble.png';

const FormItem = Form.Item;
const confirm = Modal.confirm;

const ControlWrap = styled.div`
  width: 100%;
`;

const customSaveButtonStyle = {
  width: '100%',
  backgroundColor: '#FFA700',
  color: 'black',
  border: 'none',
  boxShadow: '0 3px 2px rgba(0, 0, 0, .16)',
  fontSize: '14px',
}

const stateToProps = () => ({});

const dispatchToProps = dispatch => bindActionCreators({
  removeCurrentPointer,
  editDataPoint
}, dispatch);

@Form.create()
@connect(stateToProps, dispatchToProps)
class AddingPhotoModal extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if(!err) {
        const { ID } = this.props;

        this.props.editDataPoint(ID, values);
        this.doCancel();
      }
    });
  }

  handleCancel = e => {
    confirm({
      title: 'Вы хотите закрыть добавление вещи?',
      okType: 'danger',
      okText: 'Да',
      cancelText: 'Нет',
      onOk: () => this.doCancel()
    });
  };

  doCancel = e => {
    this.props.removeCurrentPointer();
  }

  validatePrice = (rule, value, callback) => {
    if (value > 0) {
      callback();
      return;
    }

    callback('Price must greater than zero!');
  }

  render() {
    const { isVisible, initialValues } = this.props;
    const { getFieldDecorator } = this.props.form;

    if(!isVisible) return null;

    return (
      <Modal
        title="Добавь описание для шмотки"
        visible
        onCancel={this.handleCancel}
        footer={null}
      >
        <Form onSubmit={ this.handleSubmit }>
          <FormItem>
            {getFieldDecorator('label', {
              initialValue: initialValues.label || null,
              rules: [{ required: true, message: 'Вы не указали название вещи' }],
            })(
              <Input placeholder="Укажите название вещи" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('price', {
              initialValue: initialValues.price || null,
              rules: [{ required: true, message: 'Вы не ввели сумму', validator: this.validatePrice}],
            })(
              <InputNumber
                formatter={value => `₽ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                style={{ width: "100%" }}
                placeholder="Сумма руб." />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('brand', {
              initialValue: initialValues.brand || null,
              rules: [{ required: true, message: 'Вы не выбрали бренд' }],
            })(
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Select a person"
                optionFilterProp="children"
              >
                {
                  map(brandList, (brand, index) => (
                    <Select.Option key={index} value={brand.id}>
                      { brand.label }
                    </Select.Option>
                  ))
                }
              </Select>
            )}
          </FormItem>
          <ControlWrap>
            <Button htmlType="submit" style={ customSaveButtonStyle }>Сохранить</Button>
          </ControlWrap>
        </Form>
      </Modal>
    );
  }
}

export default AddingPhotoModal;
