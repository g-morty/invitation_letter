
function run(canvasContext, element, type, cb = () => { }) {
  const fun = {
    fadeIn,
    shiftInToRight,
    shiftInToLeft,
    shiftInToUp,
    shiftInToDown,
    turnIn
  }
  fun[type](canvasContext, element, cb);
}
function enumerate(type) {
  const animateEnum = {
    fadeIn: {
      type,
      showText: '淡入'
    },
    shiftInToRight: {
      type,
      showText: '向右移入'
    },
    shiftInToLeft: {
      type,
      showText: '向左移入'
    },
    shiftInToUp: {
      type,
      showText: '向上移入'
    },
    shiftInToDown: {
      type,
      showText: '向下移入'
    },
    turnIn: {
      type,
      showText: '翻转进入'
    }
  }
  return animateEnum[type]
}
function turnIn(canvasContext, element, cb) {

  const newLeft = element.left + element.width * element.scaleX / 2;
  const newTop = element.top + element.height * element.scaleY / 2;
  const left = element.left ;
  const top = element.top ;
  element.set({
    originX: 'center',
    originY: 'center',
    top:newTop,
    left: newLeft,
  });
  // element.animate('angle', 360, {
  //   from: 0,
  //   duration: 1000,
  //   onChange: canvasContext.renderAll.bind(canvasContext),
  //   onComplete: ()=>{
      
  //     element.set({
  //       top,
  //       left,
  //     });
  //   }
  // });
 
  element.animate('scaleX', element.scaleX, {
    from: -element.scaleX,
    duration: 1000,
  });
  element.animate('opacity', 1, {
    from: 0,
    duration: 1000,
    onChange: canvasContext.renderAll.bind(canvasContext),
    onComplete: ()=>{
      element.set({
        originX: 'left',
        originY: 'top',
        top,
        left,
      });
      cb()
    }
  })
}

function fadeIn(canvasContext, element, cb) {
  element.animate('opacity', 1, {
    from: 0,
    duration: 1000,
    onChange: canvasContext.renderAll.bind(canvasContext),
    onComplete: cb
  })
}
function shiftInToRight(canvasContext, element, cb) {
  element.animate('left', element.left, {
    from: element.left - 100,
    duration: 1000,
    onChange: canvasContext.renderAll.bind(canvasContext),
    onComplete: cb,
  })
}
function shiftInToLeft(canvasContext, element, cb) {
  element.animate('left', element.left, {
    from: element.left + 100,
    duration: 1000,
    onChange: canvasContext.renderAll.bind(canvasContext),
    onComplete: cb,
  })
}
function shiftInToUp(canvasContext, element, cb) {
  element.animate('top', element.top, {
    from: element.top + 100,
    duration: 1000,
    onChange: canvasContext.renderAll.bind(canvasContext),
    onComplete: cb,
  })
}
function shiftInToDown(canvasContext, element, cb) {
  element.animate('top', element.top, {
    from: element.top - 100,
    duration: 1000,
    onChange: canvasContext.renderAll.bind(canvasContext),
    onComplete: cb,
  })
}





export default {
  run,
  enumerate
}
