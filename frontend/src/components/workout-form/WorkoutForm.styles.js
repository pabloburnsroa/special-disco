import styled from 'styled-components';
import { BaseButton } from '../button/Button.styles';

export const FormContainer = styled.form``;

export const FormInput = styled.input`
  border: ${(props) =>
    props.error ? '1px solid #e7195a' : '1px solid #1aac83'};
  display: block;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  width: 100%;
  /* border: 1px solid #ddd; */
  border-radius: 4px;
  box-sizing: border-box;
`;

export const FormButton = styled(BaseButton)``;

export const Error = styled.div`
  padding: 10px;
  background: #ffefef;
  border: 1px solid #e7195a;
  color: #e7195a;
  border-radius: 4px;
  margin: 20px 0;
`;
