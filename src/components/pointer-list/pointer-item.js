import React from 'react';
import styled from 'styled-components';
import { List } from 'antd';

import trashImg from './assets/trash.png';
import editImg from './assets/edit.png';

const nope = () => {};

const PointerText = styled.p`
  text-align: left;
  padding-left: 5px;
  margin: 0;
`;

const PointerControl = styled.div`
  width: 25px;
  height: 25px;
  background-image: url( ${props => props.img} );
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const PointerItem = ({ pointer, onClickEdit = nope, onClickRemove = nope }) => (
  <List.Item actions={[
    <PointerControl img={editImg} onClick={() => onClickEdit(pointer)} />,
    <PointerControl img={trashImg} onClick={() => onClickRemove(pointer)} />
  ]}>
    <List.Item.Meta
      title={<PointerText>{ pointer.label }</PointerText>}
      description={<PointerText>{ `${ pointer.price } ₽` }</PointerText>}
    />
  </List.Item>
);

export default PointerItem;
