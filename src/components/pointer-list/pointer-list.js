import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { List, Avatar, Button, Spin } from 'antd';
import { mapProps } from 'recompose';
import { reduce, map, values } from 'lodash';
import formatMoney from 'Utils/format-money';

import PointerItem from './pointer-item';

import { setCurrentPointerEdit, removePointer, removeCurrentPointer } from 'Ducks/added-photo';

const TotalSum = styled.h3`
`;

const getSumOfPointers = pointers => reduce(pointers, (sum, pointer) => sum += pointer.price, 0);
const stateToProps = () => ({});

const dispatchToProps = dispatch => bindActionCreators({
  setCurrentPointerEdit,
  removeCurrentPointer,
  removePointer
}, dispatch);

@connect(stateToProps, dispatchToProps)
@mapProps((props) => {
  return {
    ...props,
    pointers: values(props.pointers),
    totalSum: getSumOfPointers(props.pointers)
  }
})
class PointerList extends Component {
  static propTypes = {
    pointers: PropTypes.array,
    totalSum: PropTypes.number
  }

  handleEditPointer = pointer => {
    this.props.setCurrentPointerEdit(pointer.ID)
  }

  handleRemovePointer = pointer => {
    this.props.removePointer(pointer.ID);
    this.props.removeCurrentPointer(pointer.ID);
  }

  render() {
    const { pointers, totalSum } = this.props;
    
    return (
      <List
        itemLayout="horizontal"
        dataSource={pointers}
        renderItem={item => (
          <PointerItem
            pointer={item}
            onClickEdit={this.handleEditPointer}
            onClickRemove={this.handleRemovePointer}/>
        )}
        footer={<TotalSum>{ `Сумма: ${formatMoney(totalSum)} ₽` }</TotalSum>}
      />
    );
  }
}

export default PointerList;
