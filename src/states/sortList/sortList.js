import { atom } from "recoil";
import { COLOR } from "../../styles/COLOR";

export default atom({
  key: 'sortListState',
  default: [
    {
      id: 1,
      COLOR: COLOR.HLred,
    },
    {
      id: 2,
      COLOR: COLOR.HLBlue,
    },
    {
      id: 3,
      COLOR: COLOR.HLGreen,
    },
    {
      id: 4,
      COLOR: COLOR.HLyellow,
    },
    {
      id: 5,
      COLOR: 'none',
    }
  ]
})
