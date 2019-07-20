import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
var { height, width } = Dimensions.get('window');
export const StyledText = styled.View`
  shadow-radius: 20px;
  border-radius: 10px;
  shadow-color: rgba(0, 0, 0, 0.1);
  shadow-offset: 0px 0px;
  background: ${props => props.theme.CARD_BACKGROUND};
  color: ${props => props.theme.CARD_FONT_COLOR};
  margin-top: 30px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  width: ${width - 40};
  padding: 20px;
`;
export const PoemName = styled.Text`
  color: ${props => props.theme.CARD_FONT_COLOR};
  font-size: 22;
  padding-top: 10;
  width: 90%;
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
  background-color: ${props => props.theme.SCREEN_BACKGROUND};
  justify-content: center;
  height: ${height};
  width: ${width};
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
  font-size: 40;
  color: ${props => props.theme.FONT_COLOR};
`;
export const DrawerText = styled.Text`
  font-family: 'raleway-boldI';
  font-size: 20;
  text-align: right;
  padding-right: 20;
  color: ${props => props.theme.FONT_COLOR};
`;
