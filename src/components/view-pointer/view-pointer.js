import React, { Component } from 'react';
import styled from 'styled-components';
import { Modal, Button } from 'antd';

import brandList from 'Data/brand-list';

const InfoTitle = styled.p`
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
`;

const InfoValue = styled.p`
  text-align: center;
  color: rgba(0, 0, 0, 0.9);
  font-size: 16px;
`;

const ControlWrap = styled.div`
  width: 100%;
`;

const BrandLogo = styled.img`
  height: 50px;
`;

const customCancelButtonStyle = {
  width: '100%',
  backgroundColor: '#FFA700',
  color: 'black',
  border: 'none',
  boxShadow: '0 3px 2px rgba(0, 0, 0, .16)',
  fontSize: '14px',
}


class ViewPointer extends Component {
  render() {
    const { pointerData, onCancel } = this.props;

    return (
      <Modal
        footer={null}
        { ...this.props }
      >
        <InfoTitle>Название:</InfoTitle>
        <InfoValue>{ pointerData.label }</InfoValue>
        <InfoTitle>Название:</InfoTitle>
        <InfoValue>{ `${pointerData.price} ₽` }</InfoValue>
        <InfoTitle>Бренд:</InfoTitle>
        <InfoValue>
          <BrandLogo src={ brandList[pointerData.brand].logo } />
        </InfoValue>
        <ControlWrap>
          <Button onClick={ onCancel } style={ customCancelButtonStyle }>Закрыть</Button>
        </ControlWrap>
      </Modal>
    )
  }
}

export default ViewPointer;
