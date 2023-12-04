import { useRecoilState, useRecoilValue } from "recoil";
import ListItem from "../ListItem/ListItem";
import Style from "./MainDo.style";
import todoListState from "../../states/todoListState";
import React, { useEffect, useRef } from "react";
import { getStorage, setStorage } from "../../utils/Storage.js";
import { doList } from "../../states/doListSelector";
import { doneList } from "../../states/doneListSelector";
import toolsState from "../../states/tools/toolsState";
import colorFlagState from "../../states/color/colorFlagState";
import { COLOR } from "../../styles/COLOR";
import { DragDropContext, Draggable, Droppable,  } from "react-beautiful-dnd";
import { handleDragEnd } from "../../utils/handleDragEnd";
import fontSizeState from "../../states/font/fontSizeState";
import pageState from "../../states/page/pageState";
import { PAGES } from "../../constants/PAGES";
import { createIndexedDB, deleteIndexedDB, readIndexedDB, updateIndexedDB } from "../../api/indexedDB/IndexedDbAPI";
import { DO_LIST, HISTORY_LIST } from "../../constants/indexedDBObjectName";
import DnDState from "../../states/DnDState/DnDState";
import { isSameDate } from "../../utils/isSameDate";
import darkMode from "../../states/darkMode/darkMode";

const MainDo = () => {
  const [ todoList, setTodoList ] = useRecoilState(todoListState);
  const [ filteredDoList ] = useRecoilState(doList);
  const [ filteredDoneList ] = useRecoilState(doneList);
  const [ selectedTool, setSelectTool ] = useRecoilState(toolsState);
  const [ selectedFlag, setSelectedFlag ] = useRecoilState(colorFlagState);
  const [ fontsize, setFontsize ] = useRecoilState(fontSizeState);
  const [ stateOfDnD, setStateOfDnD ] = useRecoilState(DnDState);
  const [ isDarkMode, setIsDarkMode ] = useRecoilState(darkMode);
  const page = useRecoilValue(pageState);
  const inputRef = useRef(null);
  const today = new Date();

  const deleteDoneList = async () => {
    const objectStore = await readIndexedDB(DO_LIST);
    const getAllReq = objectStore.getAll();
    let doneList = [];

    getAllReq.onsuccess = async (event) => {
      const list = event.target.result;
      const newList = list.filter((item) => {
        if(item.checked === true && !isSameDate(item.date)) return false;
        return true;
      });
  
      list.forEach( async (item) => {
        if(item.checked === false) return;
        if(isSameDate(item.date)) return;
        const objectStore = await deleteIndexedDB(DO_LIST);
        const deleteReq = objectStore.delete(item.id);
        deleteReq.onsuccess = async () => {
          const dndList = getStorage('dndList');
          const newDnDList = dndList.filter((id) => {
            if(id === item.id) return false;
            return true;
          });
          setStorage('dndList', newDnDList);
          setStateOfDnD(newDnDList);
        }
      });
      let doneDate;
      list.forEach((item) => {
        if(item.checked === false) return;
        if(isSameDate(item.date)) return;
        doneList.push(item);
        doneDate = item.date;
      })
      setTodoList(newList);
      
      if(doneList.length === 0) return;
      const objectStore = await createIndexedDB(HISTORY_LIST);
      const addReq = objectStore.add({
        date: doneDate,
        list: doneList,
      });
    }
  }

  const initFontSizes = () => {
    if(getStorage('fontSize').length === 0) setStorage('fontSize', 16);
    setFontsize(getStorage('fontSize'));
  }

  const initDnDState = async () => {
    const objectStore = await readIndexedDB(DO_LIST);
    const getAllReq = objectStore.getAll();
    getAllReq.onsuccess = (event) => {
      const list = event.target.result;
      if(list.length === 0) {
        setStateOfDnD([]);
        setStorage('dndList', []);
        return;
      }
      // TODO: list.length와 dndList.length가 다를 때 
      if(getStorage('dndList').length !== 0) return setStateOfDnD(getStorage('dndList'));
      const dndList = [];
      list.forEach((item) => {
        dndList.push(item.id);
      });
      setStateOfDnD(dndList);
      setStorage('dndList', dndList);
    }
  }
  useEffect(() => {
    initDnDState();
    initFontSizes();
    deleteDoneList();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const contentValue = event.target[0].value;
    const highlightColor = convertColor();
    event.target[0].value = '';

    const newItem = {
      content: contentValue,
      checked: false,
      highlight: highlightColor,
      date: today,
    }
    const objectStore = await createIndexedDB(DO_LIST);
    const addReq = objectStore.add(newItem);
    
    addReq.onsuccess = async (event) => {
      const newIndex = event.target.result;
      const objectStore = await readIndexedDB(DO_LIST);
      const getAllReq = objectStore.getAll();
      getAllReq.onsuccess = (event) => {
        const list = event.target.result;
        setTodoList(list);
      }
      const dndList = getStorage('dndList');
      dndList.push(newIndex);
      setStorage('dndList', dndList);
      setStateOfDnD(dndList);
    }
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

  const isActivePen = () => {
    if(selectedTool === 'pen' && page === PAGES.HOME) return true;
    return false;
  }

  return (
    <Style.Container onContextMenu={preventContextMenu}>
      <Style.CancelBackground $isDarkMode={isDarkMode} $selectedTool={selectedTool} onClick={cancelPen}></Style.CancelBackground>
      <Style.InputContainer $tool={isActivePen()} onSubmit={handleSubmit} $fontSize={fontsize}>
        <label htmlFor="input"></label>
        <input id="input" ref={inputRef} type="text" />
        <button>추가</button>
      </Style.InputContainer>
      <DragDropContext onDragEnd={(result) => handleDragEnd(result, selectedFlag, todoList, setTodoList, stateOfDnD, setStateOfDnD)}>
        <Style.ListContainer>
          <Style.MarginTop /> 
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
        <Style.MarginBottom /> 
        </Style.ListContainer>
      </DragDropContext>
    </Style.Container>
  )
}

export default MainDo;
