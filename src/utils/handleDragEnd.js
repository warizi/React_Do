import { COLOR } from "../styles/COLOR";
import { getStorage, setStorage } from "./Storage";


export const handleDragEnd = (
    {destination, draggableId, source}, 
    selectedFlag, 
    todoList, 
    setTodoList 
  ) => {
    if(!destination) return;
    const startIndex = source.index;
    const endIndex = destination.index;
    const list = getStorage('todoList');
    if(source.droppableId === destination.droppableId && startIndex === endIndex) return;
  
  const redList = list.filter((item) => item.highlight === COLOR.HLred);
  const yellowList = list.filter((item) => item.highlight === COLOR.HLyellow);
  const greenList = list.filter((item) => item.highlight === COLOR.HLGreen);
  const blueList = list.filter((item) => item.highlight === COLOR.HLBlue);

  const red = COLOR.HLNormalRed;
  const yellow = COLOR.HLNormalYellow;
  const green = COLOR.HLNormalGreen;
  const blue = COLOR.HLNormalLBlue;
  const none = 'none';
  
  const itemId = Number(draggableId);
  const itemIndex = list.findIndex((item) => item.id === itemId);
  
  const [ removed ] = list.slice(itemIndex, itemIndex + 1);

  const setNewList = (colorList) => {
    const targetItem = colorList[endIndex];
    const targetRealIndex = list.findIndex((item) => item.id === targetItem.id) - 1;
    list.splice(itemIndex, 1);
    list.splice(targetRealIndex + 1, 0, removed);
    setStorage('todoList', list);
    setTodoList(list);
  }

  switch (selectedFlag) {
    case red:
      setNewList(redList);
      break;
    case yellow:
      setNewList(yellowList);
      break;
    case green:
      setNewList(greenList);
      break;
    case blue:
      setNewList(blueList);
      break;
    case none:
      list.splice(itemIndex, 1);
      list.splice(endIndex, 0, removed);
      setStorage('todoList', list);
      setTodoList(list);
      break;
    default:
      break;
  }
}
