import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
var { height, width } = Dimensions.get('window');
export const StyledText = styled.View`
  shadow-radius: 20px;
  border-radius: 10px;
  shadow-color: ${props => props.theme.CARD_SHADOW};
  shadow-offset: 0px 0px;
  background: ${props => props.theme.CARD_BACKGROUND};
  color: ${props => props.theme.CARD_FONT_COLOR};
  margin-top: 30px;
  margin-bottom: 30px;
  box-shadow: 0px 0px 20px ${props => props.theme.CARD_SHADOW};
  width: ${width - 40};
  align-self: center;
  justify-content: center;
  padding: 20px;
`;
export const StyledAduioText = styled.View`
  shadow-radius: 20px;
  border-radius: 10px;
  shadow-color: ${props => props.theme.CARD_SHADOW};
  shadow-offset: 0px 0px;

  color: ${props => props.theme.CARD_FONT_COLOR};
  margin-top: 30px;
  margin-bottom: 30px;
  background: ${props => props.theme.PLAYER_BACKGROUND};
  box-shadow: 0px 0px 20px ${props => props.theme.CARD_SHADOW};
  width: ${width - 40};
  align-self: center;
  justify-content: center;
  padding: 20px;
`;
export const PlayerScrollView = styled.View`
  border-radius: 10px;
  background: ${props => props.theme.CARD_BACKGROUND};
  color: ${props => props.theme.CARD_FONT_COLOR};
  margin-top: 30px;
  margin-right: ${width * 0.05}
  width: ${width * 0.5};
  align-self: center;
  justify-content: center;
  padding: 20px;
`;
export const StyledView = styled.View`
  width: ${width};
  align-self: center;
  justify-content: center;

  /* padding: 20px; */
`;
export const StyledOptions = styled.View`
  shadow-radius: 20px;
  /* border-radius: 10px, 10px, 10px; */
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  shadow-color: rgba(0, 0, 0, 0.1);
  shadow-offset: 0px 0px;
  background: ${props => props.theme.SCREEN_BACKGROUND};
  color: ${props => props.theme.CARD_FONT_COLOR};
  margin-top: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  /* width: ${width - 40}; */
  padding: 20px;
`;
export const ScreenShotMode = styled.View`
  shadow-radius: 20px;
  border-radius: 10px;
  shadow-color: rgba(0, 0, 0, 0.1);
  shadow-offset: 0px 0px;
  background: ${props => props.theme.CARD_BACKGROUND};
  color: ${props => props.theme.CARD_FONT_COLOR};
padding:20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  /* width: ${width - 60}; */
`;

export const PoemName = styled.Text`
  color: ${props => props.theme.CARD_FONT_COLOR};
  font-size: 22;
  padding-top: 10;
  width: 80%;
  font-family: 'PTSansCaptionBold';
  text-align: left;
`;
export const FeatName = styled.Text`
  color: ${props => props.theme.CARD_FONT_COLOR};
  font-size: 22;
  padding-top: 10;
  width: 90%;
  font-family: 'PTSansCaptionBold';
  text-align: center;
`;
export const PoemBodyText = styled.Text`
  color: ${props => props.theme.CARD_FONT_COLOR};
  font-family: 'raleway-regular';
  font-size: 16;
  padding-bottom: 10;
  padding-top: 10;
`;
export const Pills = styled.View`
  background: ${props => props.theme.SECOND_COLOR};
  width: 80px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 10px;
  position: absolute;
  right: 1;
  bottom: 1;
`;
export const PillsText = styled.Text`
  color: #fff;
  font-family: 'PTSansCaptionRegular';
  font-size: 14;
`;
export const NSFWPills = styled.View`
  background: ${props => props.theme.CARD_FONT_COLOR};
  width: 60px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 10px;
  position: absolute;
  left: -30;
  top: -30;
`;
export const AduioPills = styled.View`
  background: ${props => props.theme.CARD_FONT_COLOR};
  width: 125px;
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 10px;
  position: absolute;
  right: 0;
  top: -30;
`;
export const NSFWPillsText = styled.Text`
  color: ${props => props.theme.CARD_BACKGROUND};
  font-family: 'PTSansCaptionRegular';
  font-size: 12;
`;
export const StaticPills = styled.View`
  width: 150px;
  padding-top: 10px;
  position: absolute;
  left: 0;
  bottom: 1;
`;
export const StaticPillsText = styled.Text`
  color: ${props => props.theme.SECOND_COLOR};
  font-family: 'PTSansCaptionRegular';
  font-size: 14;
`;
export const OnlinePills = styled.View`
  background: ${props => props.theme.CARD_FONT_COLOR};
  width: 80px;
  border-radius: 10px;
  align-self: center;
  text-align: center;
  /* width: 150px; */
  /* padding-top: 10px; */
`;
export const OnlinePillsText = styled.Text`
  color: ${props => props.theme.CARD_BACKGROUND};
  text-align: center;
  font-family: 'PTSansCaptionRegular';
  font-size: 12;
`;
export const InstagramText = styled.Text`
  color: ${props => props.theme.SECOND_COLOR};
  font-family: 'PTSansCaptionRegular';
  font-size: 14;
  text-align: left;
  margin-bottom: 5px;
`;
export const MetaAppolo = styled.Text`
  color: ${props => props.theme.SECOND_COLOR};
  font-family: 'PTSansCaptionRegular';
  font-size: 14;
  text-align: left;
  margin-bottom: 5px;
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
export const RecordScrollView = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.RECORDER_BACKGROUND};
  height: ${height};
  width: ${width};
`;
export const PostPoemBackGround = styled.View`
  flex: 1;
  background-color: ${props => props.theme.SCREEN_BACKGROUND};
  justify-content: center;
  height: ${height};
  width: ${width};
  align-items: center;
`;
export const JustColorBack = styled.View`
  /* flex: 1; */
  background-color: ${props => props.theme.SCREEN_BACKGROUND};
`;
export const NavBarView = styled.View`
  background-color: ${props => props.theme.SCREEN_BACKGROUND};
  padding-top: 10px;
  text-align: center;
`;
export const NavBarHeaderText = styled.Text`
  font-family: 'raleway-boldI';
  font-size: 30;
  color: ${props => props.theme.FONT_COLOR};
`;
export const NavBarHeaderTextBig = styled.Text`
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
export const OptionsListView = styled.View`
  padding-top: 10px;
  text-align: center;
`;
export const OptionsListText = styled.Text`
  font-family: 'raleway-extralight';
  font-size: 18;
  text-align: left;
  padding-right: 20;
  padding-top: 20;
  color: ${props => props.theme.FONT_COLOR};
`;
export const Footer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: #efefef;
  height: 7%;
  padding-bottom: 10px;
  background-color: ${props => props.theme.SCREEN_BACKGROUND};
`;
export const FooterTab = styled.Text`
  text-align: center;
  color: #999;
  flex-wrap: wrap;
  font-size: 18px;
  padding-top: 10px;
  font-family: 'raleway-bold';
  color: ${props => props.theme.CARD_FONT_COLOR};

  /* margin-bottom: 10px; */
`;
