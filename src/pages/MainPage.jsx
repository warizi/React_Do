import { useRecoilState, useRecoilValue } from "recoil";
import MainBody from "../components/MainBody/MainBody";
import MainDo from "../components/MainBody/MainDo";
import MainFooter from "../components/MainFooter/MainFooter";
import MainHeader from "../components/MainHeader/MainHeader"
import Style from "./MainPage.style";
import darkMode from "../states/darkMode/darkMode";
import settingState from "../states/setting/settingState";

const MainPage = () => {
  const isDarkMode = useRecoilValue(darkMode);
  return (
    <Style.Container $isDarkMode={isDarkMode}>
      <MainHeader />
      <MainBody />
      <MainFooter />
    </Style.Container>
  )
}

export default MainPage;
