import { useRecoilState, useRecoilValue } from "recoil";
import ListItem from "../ListItem/ListItem";
import Style from "./MainBody.style";
import todoListState from "../../states/todoListState";
import { useEffect, useRef } from "react";
import { createId, getStorage, setStorage } from "../../utils/Storage.js";
import { doList } from "../../states/doListSelector";
import { doneList } from "../../states/doneListSelector";
import toolsState from "../../states/tools/toolsState";
import colorFlagState from "../../states/color/colorFlagState";
import { COLOR } from "../../styles/COLOR";
import { DragDropContext, Draggable, Droppable,  } from "react-beautiful-dnd";
import { handleDragEnd } from "../../utils/handleDragEnd";
import fontSizeState from "../../states/font/fontSizeState";

const TODO_LIST_KEY = 'todoList';

const MainBody = () => {
  const [ todoList, setTodoList ] = useRecoilState(todoListState);
  const [ filteredDoList ] = useRecoilState(doList);
  const [ filteredDoneList ] = useRecoilState(doneList);
  const [ selectedTool, setSelectTool ] = useRecoilState(toolsState);
  const [ selectedFlag, setSelectedFlag ] = useRecoilState(colorFlagState);
  const [ fontsize, setFontsize ] = useRecoilState(fontSizeState);
  const inputRef = useRef(null);
  const today = new Date();

  const isSameDate = (date) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const anotherDate = new Date(date);
    const anotherYear = anotherDate.getFullYear();
    const anotherMonth = anotherDate.getMonth() + 1;
    const anotherDay = anotherDate.getDate();
    if(year === anotherYear && month === anotherMonth && day === anotherDay) return true;
    return false;
  }

  const updateDateList = () => {
    const list = getStorage(TODO_LIST_KEY);
    const newList = list.map((item) => {
      item.date = today;
      return item;
    });
    setStorage(TODO_LIST_KEY, newList);
    setTodoList(newList);
  }

  const deleteDoneList = () => {
    const list = getStorage(TODO_LIST_KEY);
    const newList = list.filter((item) => {
      if(item.checked === true && !isSameDate(item.date)) return false;
      return true;
    });
    setStorage(TODO_LIST_KEY, newList);
    setTodoList(newList);
  }
  const initFontSizes = () => {
    if(getStorage('fontSize').length === 0) setStorage('fontSize', 16);
    setFontsize(getStorage('fontSize'));
  }
  useEffect(() => {
    initFontSizes();
    deleteDoneList();
    updateDateList();
  }, []);

  useEffect(() => {
    if(selectedTool === 'pen') inputRef.current.focus();
  }, [selectedTool]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const contentValue = event.target[0].value;
    const highlightColor = convertColor();
    const newListItem = {
      id: createId(TODO_LIST_KEY),
      content: contentValue,
      checked: false,
      highlight: highlightColor,
      date: today,
    }
    event.target[0].value = '';
    const newTodoList = [...todoList, newListItem];
    setStorage(TODO_LIST_KEY, newTodoList);
    setTodoList(newTodoList);
  }
  const convertColor = () => {
    if(selectedFlag === 'none') return 'none';
    if(selectedFlag === COLOR.HLNormalRed) return COLOR.HLred;
    if(selectedFlag === COLOR.HLNormalYellow) return COLOR.HLyellow;
    if(selectedFlag === COLOR.HLNormalGreen) return COLOR.HLGreen;
    if(selectedFlag === COLOR.HLNormalLBlue) return COLOR.HLBlue;
  }
  const cancelPen = (event) => {
    const submitClick = event.target.innerText;
    const inputClick = event.target.id;
    if(submitClick === '추가') return;
    if(inputClick === 'input') return;
    if(selectedTool !== 'pen') return;
    // inputRef.current.blur();
    setSelectTool('none');
  }
  const preventContextMenu = (event) => {
    event.preventDefault();
  }

  return (
    <Style.Container onContextMenu={preventContextMenu}>
      <Style.CancelBackground $selectedTool={selectedTool} onClick={cancelPen}></Style.CancelBackground>
      <Style.InputContainer $tool={selectedTool} onSubmit={handleSubmit} $fontSize={fontsize}>
        <label htmlFor="input"></label>
        <input id="input" ref={inputRef} type="text" />
        <button>추가</button>
      </Style.InputContainer>
      <DragDropContext onDragEnd={(result) => handleDragEnd(result, selectedFlag, todoList, setTodoList)}>
        <Style.ListContainer>
          <Droppable droppableId="doList">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {
                  filteredDoList.map(({ id, content, checked, highlight }, index) => (
                    <Draggable draggableId={id.toString()} key={id} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                          <ListItem 
                            key={id} 
                            highlight={highlight} 
                            content={content} 
                            checked={checked} 
                            id={id}
                            fontSize={fontsize}
                          />
                        </div>  
                      )}
                    </Draggable>
                  ))
                }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        {
          filteredDoneList.map(({ id, content, checked, highlight }) => {
            return <ListItem key={id} highlight={highlight} content={content} checked={checked} id={id} fontSize={fontsize}/>
          })
        }
        </Style.ListContainer>
      </DragDropContext>
    </Style.Container>
  )
}

export default MainBody;
