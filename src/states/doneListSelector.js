import { selector } from "recoil";
import todoListState from "./todoListState";
import colorFlagState from "./color/colorFlagState";
import { COLOR } from "../styles/COLOR";

export const doneList = selector({
  key: 'donelist',
  get: ({ get }) => {
    const todoList = get(todoListState);
    let flagColor = get(colorFlagState);
    
    if(flagColor === COLOR.HLNormalRed) flagColor = COLOR.HLred;
    if(flagColor === COLOR.HLNormalYellow) flagColor = COLOR.HLyellow;
    if(flagColor === COLOR.HLNormalGreen) flagColor = COLOR.HLGreen;
    if(flagColor === COLOR.HLNormalLBlue) flagColor = COLOR.HLBlue;

    const filteredTodoList = todoList.filter((item) => item.checked === true);
    if(flagColor === 'none') return filteredTodoList;

    const filteredTodoListByColor = filteredTodoList.filter((item) => item.highlight === flagColor);

    return filteredTodoListByColor;
  }
});
