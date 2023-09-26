import { useEffect, useRef, useState } from 'react';
import Style from './ListItem.style';
import { useRecoilState, useRecoilValue } from 'recoil';
import todoListState from '../../states/todoListState';
import { getStorage, setStorage } from '../../utils/Storage';
import toolsState from '../../states/tools/toolsState';
import colorState from '../../states/color/colorHLState';

const TODO_LIST_KEY = 'todoList';

const ListItem = ({ content, checked, id, highlight, fontSize }) => {
  const [ todoList, setTodoList ] = useRecoilState(todoListState);
  const highlightColor = useRecoilValue(colorState);
  const [ contentValue, setContentValue ] = useState(content);
  const [ isUpdate, setIsUpdate ] = useState(false);
  const selectedTool = useRecoilValue(toolsState);
  const textArea = useRef(null);

  const handleCheckBoxClick = (id) => {
    const list = getStorage(TODO_LIST_KEY);
    const itemIndex = list.findIndex((item) => item.id === id);
    if(itemIndex === -1) return;
    list[itemIndex].checked = !list[itemIndex].checked;

    const noneCheckedList = list.filter((item) => item.checked === false);
    const checkedList = list.filter((item) => item.checked === true);
    const newOrderedList = [...noneCheckedList, ...checkedList];
    setStorage(TODO_LIST_KEY, newOrderedList);
    setTodoList(newOrderedList);
  }

  const handleDeleteButtonClick = (id) => {
    const list = getStorage(TODO_LIST_KEY);
    const sameIdIndex = list.findIndex((item) => item.id === id);
    if(sameIdIndex === -1) return;
    list.splice(sameIdIndex, 1);
    setStorage(TODO_LIST_KEY, list);
    setTodoList(list);
  }

  const updateItem = () => {
    setIsUpdate(false);
    const list = getStorage(TODO_LIST_KEY);
    const sameIdIndex = list.findIndex((item) => item.id === id);
    if(sameIdIndex === -1) return;
    list[sameIdIndex].content = contentValue;
    setStorage(TODO_LIST_KEY, list);
    setTodoList(list);
  }

  const handleTextAreaEnter = (event) => {
    if(event.key === 'Enter') {
      updateItem();
    }
  }

  const handleTextAreaChange = (event) => {
    resizeTextArea();
    setContentValue(event.target.value);
  }

  const handleHighLight = () => {
    if(selectedTool !== 'highlighter') return;
    const list = getStorage(TODO_LIST_KEY);
    const sameIdIndex = list.findIndex((item) => item.id === id);
    if(sameIdIndex === -1) return;
    if(list[sameIdIndex].highlight === highlightColor) {
      list[sameIdIndex].highlight = 'none';
      setStorage(TODO_LIST_KEY, list);
      setTodoList(list);
      return;
    }
    list[sameIdIndex].highlight = highlightColor;
    setStorage(TODO_LIST_KEY, list);
    setTodoList(list);
  }
  
  const resizeTextArea = () => {
    textArea.current.style.height = 'auto';
    textArea.current.style.height = textArea.current.scrollHeight + 'px';
  }

  const focusOut = () => {
    updateItem();
  }

  const activeUpdate = () => {
    if(selectedTool !== 'none') return;
    setIsUpdate(true);
  }

  useEffect(() => {
    if(!textArea.current) return;
    resizeTextArea();
  }, [isUpdate])

  return (
    <>
      <Style.CancelBackground onClick={focusOut} $isUpdate={isUpdate}></Style.CancelBackground>
      <Style.Cotnainer 
        $highlight={highlight} 
        $checked={checked} 
        $isUpdate={isUpdate}
        $fontSize={fontSize}
        onClick={activeUpdate}
      >
        <Style.CheckBox $fontSize={fontSize} $checked={checked} onClick={() => handleCheckBoxClick(id)}>
          <div></div>
        </Style.CheckBox>
        {
          isUpdate ? 
          <textarea 
            rows={1} 
            onKeyDown={handleTextAreaEnter} 
            ref={textArea} 
            onChange={handleTextAreaChange} 
            value={contentValue} 
          /> : 
          <p onClick={handleHighLight}>
            {contentValue}
          </p>
        }
        <Style.DeleteButton $active={selectedTool} onClick={() => handleDeleteButtonClick(id)}>
          삭제
        </Style.DeleteButton>
      </Style.Cotnainer>
    </>
  );
};

export default ListItem;
