import React from 'react';
import styled from 'styled-components';

const ControlIcon = styled.div`
  height: 100%;
  width: 25px;
  background-image: url(${props => props.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0 auto;
  cursor: pointer;
`;

export default ControlIcon;
