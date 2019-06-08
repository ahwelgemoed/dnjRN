import styled from 'styled-components/native';
export const StyledText = styled.View`
  shadow-opacity: 0.35;
  shadow-radius: 10px;
  border-radius: 10px;
  shadow-color: rgba(0, 0, 0, 0.2);
  shadow-offset: 1px 1px;
  background: ${props => props.theme.CARD_BACKGROUND};
  color: ${props => props.theme.CARD_FONT_COLOR};
  /* margin: 10px;
  padding: 10px; */
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;
export const PoemName = styled.Text`
  color: ${props => props.theme.CARD_FONT_COLOR};
  font-size: 22;
  padding-top: 10;
  font-family: 'raleway-bold';
  text-align: left;
`;
export const PoemBodyText = styled.Text`
  color: ${props => props.theme.CARD_FONT_COLOR};
  font-family: 'raleway-regular';
  font-size: 16;
  padding-bottom: 10;
  padding-top: 10;
`;
export const InstagramText = styled.Text`
  color: ${props => props.theme.CARD_FONT_COLOR};
  font-family: 'raleway-regular';
  font-size: 14;
  text-align: left;
`;
export const ScreenBackground = styled.SafeAreaView`
  flex: 1;
  /* padding-top: 160; */
  background-color: ${props => props.theme.SCREEN_BACKGROUND};
  justify-content: center;
  align-items: center;
  padding-left: 15;
  padding-right: 15;
`;
export const NavBarView = styled.View`
  background-color: ${props => props.theme.SCREEN_BACKGROUND};
  padding-top: 10px;
  text-align: center;
`;
export const NavBarHeaderText = styled.Text`
  font-family: 'raleway-boldI';
  font-size: 20;
  width: 100%;
  text-align: center;
  color: ${props => props.theme.FONT_COLOR};
`;
export const DrawerText = styled.Text`
  font-family: 'raleway-boldI';
  font-size: 20;
  text-align: right;
  padding-right: 20;
  color: ${props => props.theme.FONT_COLOR};
`;
