import { useRecoilState, useRecoilValue } from 'recoil';
import Style from './History.style';
import darkMode from '../../states/darkMode/darkMode';
import { useEffect } from 'react';
import { readIndexedDB } from '../../api/indexedDB/IndexedDbAPI';
import { HISTORY_LIST } from '../../constants/indexedDBObjectName';
import historyListState from '../../states/historyListState';
import HistoryListItem from '../HistoryListItem/HistoryListItem';
import colorFlagState from '../../states/color/colorFlagState';
import { COLOR } from '../../styles/COLOR';

const History = () => {
  const isDarkMode = useRecoilValue(darkMode);
  const [ historyList, setHistoryList ] = useRecoilState(historyListState);
  const selectedFlag = useRecoilValue(colorFlagState);
  
  const getHistory = async () => {
    const historyDB = await readIndexedDB(HISTORY_LIST);
    const getAllReq = historyDB.getAll();
    getAllReq.onsuccess = (event) => {
      const list = event.target.result;
      setHistoryList(list.reverse());
    }
  }
  const convertColor = () => {
    if(selectedFlag === 'none') return 'none';
    if(selectedFlag === COLOR.HLNormalRed) return COLOR.HLred;
    if(selectedFlag === COLOR.HLNormalYellow) return COLOR.HLyellow;
    if(selectedFlag === COLOR.HLNormalGreen) return COLOR.HLGreen;
    if(selectedFlag === COLOR.HLNormalLBlue) return COLOR.HLBlue;
  }
  const getDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  }
  useEffect(() => {
    getHistory();
  }, [])
  return (
    <Style.Container>
      <Style.MarginTop />
      {
        historyList.map(({date, id, list}) => {
          let isSameColor = false;
          list.forEach(({ highlight }) => {
            if(convertColor() === highlight) isSameColor = true;
          });
          if(convertColor() === 'none') isSameColor = true;
          if(!isSameColor) return;

          return (
            <Style.ItemContainer key={id} $isDarkMode={isDarkMode}>
              <p>{getDate(date)}</p>
              {
                list.map(({id, content, highlight}) => {
                  let isSameColor = true;
                  if(convertColor() !== highlight) isSameColor = false;
                  if(convertColor() === 'none') isSameColor = true;
                  if(!isSameColor) return;
                  return (
                    <HistoryListItem key={id} content={content} highlight={highlight} />
                  )
                })
              }
            </Style.ItemContainer>
          )
        })
      }
    
    </Style.Container>
  )
}

export default History;
