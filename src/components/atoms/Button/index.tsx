import styled,{css} from 'styled-components';
import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd';

interface ButtonProps extends Omit<AntdButtonProps, 'type'> {
  width?: string;
  height?: number;
  br?: number;
  mt?: number;
  mb?: number;
  bordercolor?: string;
  type?: 'edit' | 'outline' | 'remove' | 'accept';
}

const Button = styled(AntdButton)<ButtonProps>`
  height: 44px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.35);
  border-radius: 4px;
  border: none;
  font-weight: 500;
  color: #fff;
  padding: 8px 16px;
  font-size: 16px;
  font-family: 'Open Sans';
  display: flex;
  justify-content: center;
  align-items: center;
  &:after {
    box-shadow: none !important;
  }
  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `}
    ${props =>
      props.height &&
      css`
      height: ${props.height}px;
      `}
  ${props =>
    props.br &&
    css`
      border-radius: ${props.br}px !important;
    `}
    ${props =>
    props.mt &&
    css`
      margin-top: ${props.mt}px;
    `}
    ${props =>
    props.mb &&
    css`
      margin-bottom: ${props.mb}px;
    `}
    ${props =>
    props.type === 'outline' &&
    css`
      background: none;
      border: 1px solid ${props.bordercolor};
      border-radius: 4px;
      color: #4ba369;
      &:hover {
        color: #36784d;
        border-color: #36784d;
      }
      &:active {
        color: #36784d;
        border-color: #36784d;
      }
      &:focus {
        color: #36784d;
        border-color: #36784d;
      }
    `}
    ${props =>
    props.type === 'remove' &&
    css`
      background: #fc5e7a;
      &:hover {
        background: #fc5e7a;
        color: #fff;
      }
      &:active {
        background: #fc5e7a;
        color: #fff;
      }
      &:focus {
        background: #fc5e7a;
        color: #fff;
      }
      &[disabled] {
        background: #e7e7e7;
        color: #616161;
      }
    `}
    ${props =>
    props.type === 'accept' &&
    css`
      background: #00dace;
      &:hover {
        background: #00dace;
        color: #fff;
      }
      &:active {
        background: #00dace;
        color: #fff;
      }
      &:focus {
        background: #00dace;
        color: #fff;
      }
      &[disabled] {
        background: #e7e7e7;
        color: #616161;
      }
    `}
    ${props =>
    props.type === 'edit' &&
    css`
      background: #4ba369;
      box-shadow: none;
      &:hover {
        background #36784d;
      }
      &:active {
        background: #36784d;
      }
      &:focus {
        background: #36784d;
      }
      &[disabled] {
        background: #4ba369;
      }
    `}
  @media (max-width: 992px) {
    font-size: 12px;
  }
  @media (max-width: 480px) {
    font-size: 10px;
  }
`;

Button.propTypes = {
};

Button.defaultProps = {};

export default Button;
