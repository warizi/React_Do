import { selector } from "recoil";
import todoListState from "./todoListState";
import colorFlagState from "./color/colorFlagState";
import { COLOR } from "../styles/COLOR";
import DnDState from "./DnDState/DnDState";

export const doList = selector({
  key: 'dolist',
  get: ({ get }) => {
    const todoList = get(todoListState);
    const dndList = get(DnDState);
    const newTodoListFromDnD = [];
    let flagColor = get(colorFlagState);
    
    if(flagColor === COLOR.HLNormalRed) flagColor = COLOR.HLred;
    if(flagColor === COLOR.HLNormalYellow) flagColor = COLOR.HLyellow;
    if(flagColor === COLOR.HLNormalGreen) flagColor = COLOR.HLGreen;
    if(flagColor === COLOR.HLNormalLBlue) flagColor = COLOR.HLBlue;

    dndList.forEach((item) => {
      const targetItem = todoList.find((todoItem) => todoItem.id === item);
      if(!targetItem) return;
      newTodoListFromDnD.push(targetItem);
    });
    
    const filteredTodoList = newTodoListFromDnD.filter((item) => item.checked === false);

    if(flagColor === 'none') return filteredTodoList;

    const filteredTodoListByColor = filteredTodoList.filter((item) => item.highlight === flagColor);

    return filteredTodoListByColor;
  }
});
