
function run (canvasContext,element,type) {
  const fun = {
    fadeIn,
    shiftInToRight,
    shiftInToLeft,
    shiftInToUp,
    shiftInToDown
  }
  fun[type](canvasContext, element);
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
    shiftInToLeft:{
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
    }
  }
  return animateEnum[type]
}

function fadeIn(canvasContext, element) {
  element.animate('opacity',1,{
    from: 0,
    duration: 1000,
    onChange: canvasContext.renderAll.bind(canvasContext),
  })
}
function shiftInToRight(canvasContext, element) {
  console.log(element);
  element.animate('left', element.left, {
    from: element.left - 100,
    duration: 1000,
    onChange: canvasContext.renderAll.bind(canvasContext),
  })
}
function shiftInToLeft(canvasContext, element) {
  console.log(element);
  element.animate('left', element.left, {
    from: element.left + 100,
    duration: 1000,
    onChange: canvasContext.renderAll.bind(canvasContext),
  })
}
function shiftInToUp(canvasContext, element) {
  console.log(element);
  element.animate('top', element.top, {
    from: element.top + 100,
    duration: 1000,
    onChange: canvasContext.renderAll.bind(canvasContext),
  })
}
function shiftInToDown(canvasContext, element) {
  console.log(element);
  element.animate('top', element.top, {
    from: element.top - 100,
    duration: 1000,
    onChange: canvasContext.renderAll.bind(canvasContext),
  })
}





export default {
  run,
  enumerate
}
