import { COLOR } from "../styles/COLOR";
import { setStorage } from "./Storage";


export const handleDragEnd = async (
    { destination, draggableId, source }, 
    selectedFlag, 
    todoList, 
    setTodoList,
    stateOfDnD,
    setStateOfDnD,
  ) => {
    
  if(!destination) return;
  const startIndex = source.index;
  const endIndex = destination.index;
  const list = todoList;
  const DnDList = [...stateOfDnD];

  if(source.droppableId === destination.droppableId && startIndex === endIndex) return;
  
  // TODO: list => dndList 컨버팅 함수 리펙토링
  const doList = list.filter((item) => item.checked === false);
  const doDnDList = [];
  DnDList.forEach((DnDId) => {
    const targetItem = doList.find((item) => item.id === DnDId);
    if(targetItem) doDnDList.push(targetItem);
  });
  const redList = list.filter((item) => item.highlight === COLOR.HLred);
  const redDnDList = [];
  DnDList.forEach((DnDId) => {
    const targetItem = redList.find((item) => item.id === DnDId);
    if(targetItem) redDnDList.push(targetItem);
  });
  const yellowList = list.filter((item) => item.highlight === COLOR.HLyellow);
  const yellowDnDList = [];
  DnDList.forEach((DnDId) => {
    const targetItem = yellowList.find((item) => item.id === DnDId);
    if(targetItem) yellowDnDList.push(targetItem);
  });
  const greenList = list.filter((item) => item.highlight === COLOR.HLGreen);
  const greenDnDList = [];
  DnDList.forEach((DnDId) => {
    const targetItem = greenList.find((item) => item.id === DnDId);
    if(targetItem) greenDnDList.push(targetItem);
  });
  const blueList = list.filter((item) => item.highlight === COLOR.HLBlue);
  const blueDnDList = [];
  DnDList.forEach((DnDId) => {
    const targetItem = blueList.find((item) => item.id === DnDId);
    if(targetItem) blueDnDList.push(targetItem);
  });

  const red = COLOR.HLNormalRed;
  const yellow = COLOR.HLNormalYellow;
  const green = COLOR.HLNormalGreen;
  const blue = COLOR.HLNormalLBlue;
  const none = 'none';
  
  const itemId = Number(draggableId);
  const itemIndex = DnDList.findIndex((item) => item === itemId);
  
  const [ removed ] = DnDList.slice(itemIndex, itemIndex + 1);

  const setNewList = (filteredList) => {
    const targetItem = filteredList[endIndex];
    const targetRealIndex = DnDList.findIndex((item) => item === targetItem.id);
    DnDList.splice(itemIndex, 1);
    DnDList.splice(targetRealIndex, 0, removed);
    setStateOfDnD(DnDList);
    setStorage('dndList', DnDList);
  }

  switch (selectedFlag) {
    case red:
      setNewList(redDnDList);
      break;
    case yellow:
      setNewList(yellowDnDList);
      break;
    case green:
      setNewList(greenDnDList);
      break;
    case blue:
      setNewList(blueDnDList);
      break;
    case none:
      setNewList(doDnDList);
      break;
    default:
      break;
  }
}
