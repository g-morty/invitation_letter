
function run(canvasContext, element, type, cb = () => { }) {
  const fun = {
    fadeIn,
    shiftInToRight,
    shiftInToLeft,
    shiftInToUp,
    shiftInToDown,
    turnInV,
    rapidInToRight,
    rapidInToleft,
    rapidInToUp,
    rapidInToDown,
    turnInH,
    amplifyFromCenter,
    rotateToRight,
    rotateToLeft
  }

  fun[type](canvasContext, element, cb);
}

const enumerate = [
  {
    type: "fadeIn",
    showText: "淡入",
    left: -40 * 1,
    top: 40 * 0,
    hoverLeft: -40 * 1,
    hoverTop: 40 * 11,
    url: require("@/assets/images/anim-iconsprit.webp"),
  },
  {
    type: "shiftInToRight",
    showText: "向右移入",
    left: -40 * 7,
    top: 40 * 2,
    hoverLeft: -40 * 7,
    hoverTop: 40 * 9,
    url: require("@/assets/images/anim-iconsprit.webp"),
  },
  {
    type: "shiftInToLeft",
    showText: "向右移入",
    left: -40 * 6,
    top: 40 * 3,
    hoverLeft: -40 * 6,
    hoverTop: 40 * 8,
    url: require("@/assets/images/anim-iconsprit.webp"),
  },
  {
    type: "shiftInToUp",
    showText: "向上移入",
    left: -40 * 9,
    top: 40 * 0,
    hoverLeft: -40 * 9,
    hoverTop: 40 * 11,
    url: require("@/assets/images/anim-iconsprit.webp"),
  },
  {
    type: "shiftInToDown",
    showText: "向下移入",
    left: -40 * 6,
    top: 40 * 1,
    hoverLeft: -40 * 6,
    hoverTop: 40 * 10,
    url: require("@/assets/images/anim-iconsprit.webp"),
  },
  {
    type: "turnInV",
    showText: "翻转进入",
    left: -40 * 1,
    top: 40 * 7,
    hoverLeft: -40 * 1,
    hoverTop: 40 * 4,
    url: require("@/assets/images/anim-iconsprit.webp"),
  },
  {
    type: "rapidInToRight",
    showText: "向右弹入",
    left: -40 * 7,
    top: 40 * 10,
    hoverLeft: -40 * 7,
    hoverTop: 40 * 1,
    url: require("@/assets/images/anim-iconsprit.webp"),
  },
  {
    type: "rapidInToleft",
    showText: "向左弹入",
    left: -40 * 3,
    top: 40 * 3,
    hoverLeft: -40 * 3,
    hoverTop: 40 * 8,
    url: require("@/assets/images/anim-iconsprit.webp"),
  }, {
    type: "rapidInToUp",
    showText: "向上弹入",
    left: -40 * 6,
    top: 40 * 0,
    hoverLeft: -40 * 6,
    hoverTop: 40 * 11,
    url: require("@/assets/images/anim-iconsprit.webp"),
  }, {
    type: "rapidInToDown",
    showText: "向下弹入",
    left: -40 * 3,
    top: 40 * 1,
    hoverLeft: -40 * 3,
    hoverTop: 40 * 10,
    url: require("@/assets/images/anim-iconsprit.webp"),
  },
  {
    type: "turnInH",
    showText: "翻开进入",
    left: -40 * 2,
    top: 40 * 0,
    hoverLeft: -40 * 2,
    hoverTop: 40 * 11,
    url: require("@/assets/images/anim-iconsprit.webp"),
  },
  {
    type: "rotateToRight",
    showText: "向右翻滚",
    left: -40 * 5,
    top: 40 * 2,
    hoverLeft: -40 * 5,
    hoverTop: 40 * 9,
    url: require("@/assets/images/anim-iconsprit.webp"),
  },
  {
    type: "rotateToLeft",
    showText: "向左翻滚",
    left: -40 * 4,
    top: 40 * 3,
    hoverLeft: -40 * 4,
    hoverTop: 40 * 8,
    url: require("@/assets/images/anim-iconsprit.webp"),
  },
  {
    type: "amplifyFromCenter",
    showText: "中心放大",
    left: -40 * 0,
    top: 40 * 3,
    hoverLeft: -40 * 0,
    hoverTop: 40 * 8,
    url: require("@/assets/images/anim-iconsprit.webp"),
  },
];
function findEnumerate(type) {
  let theEnumerate = {}
  enumerate.map(item => {
    if (item.type === type) {
      theEnumerate = item;
    }
  })
  return theEnumerate;
}
function turnInV(canvasContext, element, cb) {

  const newLeft = element.left + element.width * element.scaleX / 2;
  const newTop = element.top + element.height * element.scaleY / 2;
  const left = element.left;
  const top = element.top;
  element.set({
    originX: 'center',
    originY: 'center',
    top: newTop,
    left: newLeft,
    flipX: true
  });

  element.animate('scaleX', element.scaleX, {
    from: -element.scaleX,
    duration: 800,
    easing: fabric.util.ease.easeOutBounce

  });
  element.animate('opacity', 1, {
    from: 0,
    duration: 800,
    onChange: canvasContext.renderAll.bind(canvasContext),
    onComplete: () => {
      console.log( element );
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
function rapidInToRight(canvasContext, element, cb) {
  element.animate('left', element.left, {
    from: element.left - 200,
    duration: 800,
    onChange: canvasContext.renderAll.bind(canvasContext),
    onComplete: cb,
    easing: fabric.util.ease.easeOutBounce
  })
}

function rapidInToleft(canvasContext, element, cb) {
  element.animate('left', element.left, {
    from: element.left + 200,
    duration: 800,
    onChange: canvasContext.renderAll.bind(canvasContext),
    onComplete: cb,
    easing: fabric.util.ease.easeOutBounce
  })
}

function rapidInToUp(canvasContext, element, cb) {
  element.animate('top', element.left, {
    from: element.top + 200,
    duration: 800,
    onChange: canvasContext.renderAll.bind(canvasContext),
    onComplete: cb,
    easing: fabric.util.ease.easeOutBounce
  })
}

function rapidInToDown(canvasContext, element, cb) {
  element.animate('top', element.left, {
    from: element.top - 200,
    duration: 800,
    onChange: canvasContext.renderAll.bind(canvasContext),
    onComplete: cb,
    easing: fabric.util.ease.easeOutBounce
  })
}
function turnInH(canvasContext, element, cb) {
  const newLeft = element.left + element.width * element.scaleX / 2;
  const newTop = element.top + element.height * element.scaleY / 2;
  const left = element.left;
  const top = element.top;
  element.set({
    originX: 'center',
    originY: 'center',
    top: newTop,
    left: newLeft,
    flipY: true
  });
  console.log( element );
  element.animate('scaleY', element.scaleY, {
    from: -element.scaleY,
    duration: 800,
    easing: fabric.util.ease.easeOutBounce
  });
  element.animate('opacity', 1, {
    from: 0,
    duration: 800,
    onChange: canvasContext.renderAll.bind(canvasContext),
    onComplete: () => {
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
function amplifyFromCenter(canvasContext, element, cb) {
  const newLeft = element.left + element.width * element.scaleX / 2;
  const newTop = element.top + element.height * element.scaleY / 2;
  const left = element.left;
  const top = element.top;
  element.set({
    originX: 'center',
    originY: 'center',
    top: newTop,
    left: newLeft,
  });
  element.animate('scaleX', element.scaleX, {
    from: 0,
    duration: 800,
  })   
  element.animate('scaleY', element.scaleY, {
    from: 0,
    duration: 800,
    onChange: canvasContext.renderAll.bind(canvasContext),
    onComplete:()=>{
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
function rotateToRight(canvasContext, element, cb) {
  const newLeft = element.left ;
  const newTop = element.top + element.height * element.scaleY;
  const left = element.left;
  const top = element.top;
  element.set({
    originX: 'left',
    originY: 'bottom',
    top: newTop,
    left: newLeft,
  });
  element.animate('top', element.top, {
    from: element.top + 40,
    duration: 780,
  }) 
 
  element.animate('angle', element.angle, {
    from: element.angle - 120,
    duration: 800,
   
  })  
  element.animate('opacity', element.opacity, {
    from: 0,
    duration: 1000,
    onChange: canvasContext.renderAll.bind(canvasContext),
    onComplete:()=>{
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

function rotateToLeft(canvasContext, element, cb) {
  const newLeft = element.left + element.width * element.scaleX;
  const newTop = element.top + element.height * element.scaleY;
  const left = element.left;
  const top = element.top;
  element.set({
    originX: 'right',
    originY: 'bottom',
    top: newTop,
    left: newLeft,
  });
  element.animate('top', element.top, {
    from: element.top + 40,
    duration: 780,
  }) 
 
  element.animate('angle', element.angle, {
    from: element.angle + 120,
    duration: 800,
   
  })  
  element.animate('opacity', element.opacity, {
    from: 0,
    duration: 1000,
    onChange: canvasContext.renderAll.bind(canvasContext),
    onComplete:()=>{
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

export default {
  run,
  enumerate,
  findEnumerate
}
