
const detectSwipe = (event, offset, setOffset) => {
  let { _reactName, touches, changedTouches } = event;
  if(_reactName === 'onMouseUp') _reactName = 'onMouseLeave';

  switch (_reactName) {
    case 'onTouchStart':
      const { clientX, clientY } = touches[0];
      setOffset({ x: clientX, y: clientY, touchDate: new Date() });
      break;
    case 'onTouchEnd':
      const { clientX: endX, clientY: endY } = changedTouches[0];  
      const { x: startX, y: startY, touchDate } = offset;
      const diffX = endX - startX;
      const diffY = endY - startY;

      const isActiveTimer = new Date().getTime() - touchDate.getTime() < 400;
      if(!isActiveTimer) return 'none';

      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 50) {
          setOffset({ x: 0, y: 0, touchDate: null });
          return 'right';
        } else if(diffX < -50) {
          setOffset({ x: 0, y: 0, touchDate: null });
          return 'left';
        }
      } else {
        if (diffY > 50) {
          setOffset({ x: 0, y: 0, touchDate: null });
          return 'down';
        } else if(diffY < -50) {
          setOffset({ x: 0, y: 0, touchDate: null });
          return 'up';
        }
      }
      setOffset({ x: 0, y: 0 });
      return 'none';
      // mouse
    case 'onMouseDown':
      const { clientX: mouseClientX, clientY: mouseClientY } = event;
      setOffset({ x: mouseClientX, y: mouseClientY, touchDate: new Date() });
      break;
    case 'onMouseLeave':
      const { clientX: mouseEndX, clientY: mouseEndY } = event;
      if(!offset) return;
      if(!offset.touchDate) return;

      const { x: mouseStartX, y: mouseStartY, touchDate: mouseDate } = offset;
      const mouseDiffX = mouseEndX - mouseStartX;
      const mouseDiffY = mouseEndY - mouseStartY;  

      const isMouseActiveTimer = new Date().getTime() - mouseDate.getTime() < 400;
      if(!isMouseActiveTimer) return 'none';

      if (Math.abs(mouseDiffX) > Math.abs(mouseDiffY)) {
        if (mouseDiffX > 50) {
          setOffset({ x: 0, y: 0, touchDate: null });
          return 'right';
        } else if(mouseDiffY < -50) {
          setOffset({ x: 0, y: 0, touchDate: null });
          return 'left';
        }
      } else {
        if (mouseDiffY > 50) {
          setOffset({ x: 0, y: 0, touchDate: null });
          return 'down';
        } else if(mouseDiffY < -50) {
          setOffset({ x: 0, y: 0, touchDate: null });
          return 'up';
        }
      }
      setOffset({ x: 0, y: 0, touchDate: null });
      return 'none';
    default:
      break;
  }
}

export default detectSwipe;
