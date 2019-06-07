import styled from 'styled-components/native';
export const StyledText = styled.View`
  shadow-opacity: 0.35;
  shadow-radius: 10px;
  border-radius: 10px;
  shadow-color: rgba(0, 0, 0, 0.2);
  shadow-offset: 1px 1px;
  background: ${props => props.theme.PRIMARY_TEXT_COLOR};
  margin: 10px;
  /* width: 100%; */
  padding: 10px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  /* transition: transform 300ms ease-in-out; */
  /* display: none; */
`;
