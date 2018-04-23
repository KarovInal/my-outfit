import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { map } from 'lodash';
import { Form, Input, InputNumber, Select, Modal, Button } from "antd";

import { editDataPoint } from 'Ducks/added-photo';

const FormItem = Form.Item;

import brandList from 'Data/brand-list';

const customSaveButtonStyle = {
  width: '100%',
  backgroundColor: '#FFA700',
  color: 'black',
  border: 'none',
  boxShadow: '0 3px 2px rgba(0, 0, 0, .16)',
  fontSize: '14px',
};

const ControlWrap = styled.div`
  width: 100%;
`;

const stateToProps = () => ({});

const dispatchToProps = dispatch => bindActionCreators({
  editDataPoint
}, dispatch);

@Form.create()
@connect(stateToProps, dispatchToProps)
class EditPhotoModal extends Component {
  static propTypes = {
    ID: PropTypes.number.isRequired,
    onCancel: PropTypes.func,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { ID, onCancel, editDataPoint, form} = this.props;

    form.validateFields((err, values) => {
      if(!err) {

        editDataPoint(ID, values);
        onCancel();
      }
    });
  }

  validatePrice = (rule, value, callback) => {
    if (value > 0) {
      callback();
      return;
    }

    callback('Price must greater than zero!');
  }

  render() {
    const { visible, onCancel, initialValues } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        title="Изменить поля"
        visible={visible}
        onCancel={onCancel}
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

export default EditPhotoModal;
