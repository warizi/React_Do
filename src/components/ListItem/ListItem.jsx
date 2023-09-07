import { useRef, useState } from 'react';
import Style from './ListItem.style';
import { useRecoilState, useRecoilValue } from 'recoil';
import todoListState from '../../states/todoListState';
import { getStorage, setStorage } from '../../utils/Storage';
import toolsState from '../../states/tools/toolsState';
import colorState from '../../states/color/colorHLState';

const TODO_LIST_KEY = 'todoList';

const ListItem = ({ content, checked, id, highlight }) => {
  const [ todoList, setTodoList ] = useRecoilState(todoListState);
  const highlightColor = useRecoilValue(colorState);
  const [ contentValue, setContentValue ] = useState(content);
  const [ isUpdate, setIsUpdate ] = useState(false);
  const selectedTool = useRecoilValue(toolsState);
  const textArea = useRef(null);
  let timeout = null;

  const handleCheckBoxClick = (id) => {
    const list = getStorage(TODO_LIST_KEY);
    const sameIdIndex = list.findIndex((item) => item.id === id);
    if(sameIdIndex === -1) return; 
    list[sameIdIndex].checked = !list[sameIdIndex].checked;
    setStorage(TODO_LIST_KEY, list);
    setTodoList(list);
  }

  const handleDeleteButtonClick = (id) => {
    const list = getStorage(TODO_LIST_KEY);
    const sameIdIndex = list.findIndex((item) => item.id === id);
    if(sameIdIndex === -1) return;
    list.splice(sameIdIndex, 1);
    setStorage(TODO_LIST_KEY, list);
    setTodoList(list);
  }

  const handleContentMouseDown = (event) => {
    if(event.type !== 'touchstart') event.preventDefault();
    if(textArea.current) return;
    timeout = setTimeout(() => {
      setIsUpdate(true);
    }, 500);
  }
  const handleContentMouseUp = (event) => {
    if(event.type !== 'touchend') event.preventDefault();
    clearTimeout(timeout);

    if(!textArea.current) return;
    if(document.activeElement === textArea.current) return;

    const textAreaLength = textArea.current.value.length;
    textArea.current.setSelectionRange(textAreaLength, textAreaLength);
    textArea.current.focus();
    resizeTextArea();
  }
  const handleTextAreaBlur = () => {
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
      textArea.current.blur();
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

  return (
    <Style.Cotnainer 
      $highlight={highlight} 
      $checked={checked} 
      onMouseDown={handleContentMouseDown} 
      onMouseUp={handleContentMouseUp}
      $isUpdate={isUpdate}
      onTouchStart={handleContentMouseDown}
      onTouchEnd={handleContentMouseUp}
    >
      <Style.CheckBox $checked={checked} onClick={() => handleCheckBoxClick(id)}>
        <div></div>
      </Style.CheckBox>
      {
        isUpdate ? 
        <textarea 
          rows={1} 
          onKeyDown={handleTextAreaEnter} 
          onBlur={handleTextAreaBlur} 
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
  );
};

export default ListItem;
