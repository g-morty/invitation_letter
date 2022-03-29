<!-- 创建画布实例 -->
var canvas = new fabric.Canvas('c');
<!-- 创建正方形实例 -->
var rect = new fabric.Rect({
  left: 100,
  top: 100,
  fill: 'red',
  width: 20,
  height: 20,
  angle: 45
});
<!-- 添加实例到画布 -->
canvas.add(rect);
<!-- 设置正方形实例位置 -->
rect.set({ left: 20, top: 50 }); 
<!-- 重新渲染画布 -->
canvas.renderAll();
<!-- 其他形状 -->
fabric.Circle
fabric.Ellipse
fabric.Line
fabric.Polygon
fabric.Polyline
fabric.Rect
fabric.Triangle
<!-- 其他属性 -->
位置 — left, top; 尺寸 — width, height; 
渲染 — fill, opacity, stroke, strokeWidth; 
旋转、缩放 — scaleX, scaleY, angle; 
翻转 — flipX, flipY and skewing skewX, skewY
<!-- 获取属性 -->
rect.get('width');
<!-- 在原型链上添加方法、属性 -->
fabric.Object.prototype = xxx
<!-- 画布上的某个元素 -->
canvas.item(0); 
<!-- 画布上的所有元素 -->
canvas.getObjects(); 
<!-- 移除画布上的某一个元素 -->
canvas.remove(rect);
<!-- 创建画布是，可以额外添加属性 -->
var canvas = new fabric.Canvas('c', { 
  backgroundColor: 'rgb(100,100,200)', 
  selectionColor: 'blue', 
  selectionLineWidth: 2 
  // ... 
}); 
<!-- 后续可以修改画布的一些属性 -->
var canvas = new fabric.Canvas('c'); 
canvas.setBackgroundImage('http://...'); 
canvas.onFpsUpdate = function(){ /* ... */ }; 
<!-- 禁用组选择 -->
canvas.selection = false; 
<!-- 使元素不可选择 -->
rect.set('selectable', false); 
<!-- 初始化是便设置为不可选 -->
var staticCanvas = new fabric.StaticCanvas('c'); 

staticCanvas.add( 
  new fabric.Rect({ 
    width: 10, height: 20, 
    left: 100, top: 100, 
    fill: 'yellow', 
    angle: 30 
  })
);

<!-- 创建图片实例（有图片dom） -->
var imgInstance = new fabric.Image(imgElement, { 
  left: 100, 
  top: 100, 
  angle: 30, 
  opacity: 0.85 
});
<!-- 创建图片实例（有图片url） -->
fabric.Image.fromURL('my_image.png', function(oImg) { 
  canvas.add(oImg); 
});

<!-- 创建路径 M: moveTo L:lineTo  Z: closePath  -->
var path = new fabric.Path('M 0 0 L 200 100 L 170 200 z'); 
path.set({ left: 120, top: 120 }); 
path.set({ fill: 'red', stroke: 'green', opacity: 0.5 }); 
canvas.add(path);
<!-- 动画转动 -->
rect.animate('angle', 45, { 
  onChange: canvas.renderAll.bind(canvas) 
});
<!-- 动画平移 -->
rect.animate('left', '+=100', { onChange: canvas.renderAll.bind(canvas) });
<!-- 第三个参数的其他值 -->
rect.animate('left', 500, { 
  onChange: canvas.renderAll.bind(canvas), 
  duration: 1000, 
  easing: fabric.util.ease.easeOutBounce （easeInCubic、easeOutCubic、easeInElastic、easeOutElastic、easeInBounce和easeOutExpo）
  from: 
  onComplete: 
});
<!-- 未知 -->
let cancel = fabric.util.animate({...});
let i = fabric.runningAnimations.findAnimationIndex(cancel);
let context = fabric.runningAnimations.findAnimation(cancel);
let cancelled = fabric.runningAnimations.cancelAll();

//  the following statements are true
cancelled[i] === context;
cancelled[i].cancel === cancel;
fabric.runningAnimations.length === 0;

<!-- 事件监听（画布） -->
canvas.on('mouse:down', function(options) { 
  console.log(options.e.clientX, options.e.clientY); 
});
<!-- 可被监听的事件 -->
"mouse:down", "mouse:move", "mouse:up"
"after:render"
"before:selection:cleared", "selection:created", "selection:cleared"
"object:modified", "object:selected", "object:moving", "object:scaling", "object:rotating", "object:added", "object:removed"
<!-- 事件监听（元素） -->
var rect = new fabric.Rect({ width: 100, height: 50, fill: 'green' }); 
rect.on('selected', function() { 
  console.log('selected a rectangle'); 
}); 

var circle = new fabric.Circle({ radius: 75, fill: 'blue' }); 
circle.on('selected', function() { 
  console.log('selected a circle'); 
});

<!-- 组 -->
var circle = new fabric.Circle({
  radius: 100,
  fill: '#eef',
  scaleY: 0.5,
  originX: 'center',
  originY: 'center'
});

var text = new fabric.Text('hello world', {
  fontSize: 30,
  originX: 'center',
  originY: 'center'
});

var group = new fabric.Group([ circle, text ], {
  left: 150,
  top: 100,
  angle: -10
});

canvas.add(group);

<!-- 选中元素 -->
// rect1 and rect2 are 2 object on a canvas, canvas is the canvas instance
var selection = new fabric.ActiveSelection([rect1, rect2], {
  canvas: canvas
});
canvas.setActiveObject(selection);

<!--  -->
canvas.setActiveObject(object)将作为参数传递的对象设置为活动对象。当前选定的对象被丢弃。
canvas.discardActiveObject()删除当前选择。
canvas.getActiveObject()返回对当前活动对象的引用。
canvas.getActiveObjects()返回一个数组，其中包含对当前选定对象（一个或多个）的引用。

<!-- 是否置顶 -->
preserveObjectStacking


