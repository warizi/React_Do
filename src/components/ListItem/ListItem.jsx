import { useEffect, useRef, useState } from 'react';
import Style from './ListItem.style';
import { useRecoilState, useRecoilValue } from 'recoil';
import todoListState from '../../states/todoListState';
import toolsState from '../../states/tools/toolsState';
import colorState from '../../states/color/colorHLState';
import { deleteIndexedDB, readIndexedDB, updateIndexedDB } from '../../api/indexedDB/IndexedDbAPI';
import { DO_LIST } from '../../constants/indexedDBObjectName';
import { getStorage, setStorage } from '../../utils/Storage';
import DnDState from '../../states/DnDState/DnDState';
import darkMode from '../../states/darkMode/darkMode';

const ListItem = ({ content, checked, id, highlight, fontSize }) => {
  const [ todoList, setTodoList ] = useRecoilState(todoListState);
  const highlightColor = useRecoilValue(colorState);
  const [ contentValue, setContentValue ] = useState(content);
  const [ highlightColorValue, setHighlightColorValue ] = useState(highlight);
  const [ isUpdate, setIsUpdate ] = useState(false);
  const [ stateOfDnD, setStateOfDnD ] = useRecoilState(DnDState);
  const [ isDarkMode, setIsDarkMode ] = useRecoilState(darkMode);
  const selectedTool = useRecoilValue(toolsState);
  const textArea = useRef(null);

  const handleCheckBoxClick = async (id) => {
    const objectStore = await updateIndexedDB(DO_LIST);
    const putReq = objectStore.put({
      id: id,
      content: contentValue,
      checked: !checked,
      highlight: highlightColorValue,
      date: new Date(),
    });
    putReq.onsuccess = async (event) => {
      const objectStore = await readIndexedDB(DO_LIST);
      const getAllReq = objectStore.getAll();
      getAllReq.onsuccess = (event) => {
        const list = event.target.result;
        setTodoList(list);
      }
    }
  }

  const handleDeleteButtonClick = async (id) => {
    const objectStore = await deleteIndexedDB(DO_LIST);
    const deleteReq = objectStore.delete(id);
    deleteReq.onsuccess = async (event) => {
      const objectStore = await readIndexedDB(DO_LIST);
      const getAllReq = objectStore.getAll();
      getAllReq.onsuccess = (event) => {
        const list = event.target.result;
        setTodoList(list);
      }
      const newDnDList = getStorage('dndList').filter((item) => {
        if(item === id) return false;
        return true;
      });
      setStorage('dndList', newDnDList);
      setStateOfDnD(newDnDList);
    }
  }

  const updateItem = async () => {
    const objectStore = await updateIndexedDB(DO_LIST);
    const putReq = objectStore.put({
      id: id,
      content: contentValue,
      checked: checked,
      highlight: highlightColorValue,
      date: new Date(),
    });
    putReq.onsuccess = async () => {
      const objectStore = await readIndexedDB(DO_LIST);
      const getAllReq = objectStore.getAll();
      getAllReq.onsuccess = (event) => {
        const list = event.target.result;
        setTodoList(list);
      }
      setIsUpdate(false);
    }
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

  const handleHighLight = async () => {
    if(selectedTool !== 'highlighter') return;
    const objectStore = await updateIndexedDB(DO_LIST);
    let updateHighlightColor = highlightColor;
    if(highlightColorValue === highlightColor) updateHighlightColor = 'none';

    const putReq = objectStore.put({
      id: id,
      content: contentValue,
      checked: checked,
      highlight: updateHighlightColor,
      date: new Date(),
    });

    putReq.onsuccess = async () => {
      const objectStore = await readIndexedDB(DO_LIST);
      const getAllReq = objectStore.getAll();
      getAllReq.onsuccess = (event) => {
        const list = event.target.result;
        setTodoList(list);
      }
      setHighlightColorValue(updateHighlightColor);
    }
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
        $highlight={highlightColorValue} 
        $checked={checked} 
        $isUpdate={isUpdate}
        $fontSize={fontSize}
        $isDarkMode={isDarkMode}
        onClick={activeUpdate}
      >
        <Style.CheckBox $isDarkMode={isDarkMode} $fontSize={fontSize} $checked={checked} onClick={() => handleCheckBoxClick(id)}>
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
      <Style.MarginBottom/>
    </>
  );
};

export default ListItem;
