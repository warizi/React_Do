import MainBody from "../components/MainBody/MainBody";
import MainDo from "../components/MainBody/MainDo";
import MainFooter from "../components/MainFooter/MainFooter";
import MainHeader from "../components/MainHeader/MainHeader"
import Style from "./MainPage.style";

const MainPage = () => {
  return (
    <Style.Container>
      <MainHeader />
      <MainBody />
      <MainFooter />
    </Style.Container>
  )
}

export default MainPage;
