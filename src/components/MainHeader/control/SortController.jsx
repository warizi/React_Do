import { useRecoilState } from 'recoil';
import Style from './SortController.style';
import sortListState from '../../../states/sortList/sortList';
import todoListState from '../../../states/todoListState';
import { getStorage, setStorage } from '../../../utils/Storage';
import { Droppable } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import DnDState from '../../../states/DnDState/DnDState';
import darkMode from '../../../states/darkMode/darkMode';

const SortController = ({ isActive }) => {
  const [ todoList, setTodoList ] = useRecoilState(todoListState);
  const [ sortList, setSortList ] = useRecoilState(sortListState);
  const [ dndList, setDnDList ] = useRecoilState(DnDState);
  const [ isDarkMode, setIsDarkMode ] = useRecoilState(darkMode);
  
  const handleSortList = (event) => {
    let newList = [];
    let newDnDList = [];
    const list = [...todoList];
    const dndList = getStorage('dndList');
    for(let i = 0; i < sortList.length; i++) {
      const filteredList = list.filter((item)=> item.highlight === sortList[i].COLOR);
      newList = [...newList, ...filteredList]; 
    }
    newList.forEach((item) => {
      if(dndList.includes(item.id)) {
        newDnDList.push(item.id);
      }
    });
    setStorage('dndList', newDnDList);
    setDnDList(newDnDList);
    setTodoList(newList);
    alert('적용되었습니다.');
  }

  const handleDragEnd = ({destination, draggableId, source}) => {
    if(!destination) return;
    if(destination.index === source.index) return;
    const newSortList = [...sortList];
    const [ removed ] = newSortList.splice(source.index, 1);
    newSortList.splice(destination.index, 0, removed);
    setSortList(newSortList);
  }

  return (
    <Style.Container $isDarkMode={isDarkMode} $isActive={isActive}>
      <h3>카테고리 정렬</h3>
      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        <Droppable droppableId='sortList'>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {
                sortList.map((item, index) => (
                  <Draggable draggableId={item.id.toString()} key={item.id} index={index}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Style.SortListItem key={item.id} $color={item.COLOR} />
                      </div>
                    )}
                  </Draggable>
                ))
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button onClick={handleSortList}>적용하기</button>
    </Style.Container>
  )
}

export default SortController;
