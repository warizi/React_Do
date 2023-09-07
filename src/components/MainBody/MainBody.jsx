import { useRecoilState, useRecoilValue } from "recoil";
import ListItem from "../ListItem/ListItem";
import Style from "./MainBody.style";
import todoListState from "../../states/todoListState";
import { useEffect, useRef } from "react";
import { createId, getStorage, setStorage } from "../../utils/Storage.js";
import { doList } from "../../states/doListSelector";
import { doneList } from "../../states/doneListSelector";
import toolsState from "../../states/tools/toolsState";

const TODO_LIST_KEY = 'todoList';

const MainBody = () => {
  const [ todoList, setTodoList ] = useRecoilState(todoListState);
  const [ filteredDoList ] = useRecoilState(doList);
  const [ filteredDoneList ] = useRecoilState(doneList);
  const selectedTool = useRecoilValue(toolsState);
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

  useEffect(() => {
    deleteDoneList();
    updateDateList();
  }, []);

  useEffect(() => {
    if(selectedTool === 'pen') inputRef.current.focus();
  }, [selectedTool]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const contentValue = event.target[0].value;
    const newListItem = {
      id: createId(TODO_LIST_KEY),
      content: contentValue,
      checked: false,
      highlight: 'none',
      date: today,
    }
    event.target[0].value = '';
    const newTodoList = [...todoList, newListItem];
    setStorage(TODO_LIST_KEY, newTodoList);
    setTodoList(newTodoList);
  }

  return (
    <Style.Container>
      <Style.InputContainer $tool={selectedTool} onSubmit={handleSubmit}>
        <input ref={inputRef} type="text" />
        <button>추가</button>
      </Style.InputContainer>
      <Style.ListContainer>
      {
        filteredDoList.map(({ id, content, checked, highlight }) => {
          return <ListItem key={id} highlight={highlight} content={content} checked={checked} id={id}/>
          }
        )
      }
      {
        filteredDoneList.map(({ id, content, checked, highlight }) => {
          return <ListItem key={id} highlight={highlight} content={content} checked={checked} id={id}/>
        })
      }
      </Style.ListContainer>
    </Style.Container>
  )
}

export default MainBody;
