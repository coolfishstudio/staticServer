/* 事件绑定 */
function addEven (obj, sEv, fn) {
	if (obj.addEventListener) { // 高版本
		obj.addEventListener(sEv, function (ev) {
			if (!fn.call(obj, ev)) {
				ev.cancelBubble = true; // 阻止冒泡
				ev.preventDefault(); // 取消默认事件
			}
		}, false);
	} else {
		obj.attachEvent('on' + sEv, function (ev) {
			if (!fn.call(obj, event)) {
				event.cancelBubble = true;
				return false;
			}
		});
	}
}
/* 事件移除 */
function removeEvent (obj, sEv, fn) {
	if (obj.removeEventListener) {
		obj.removeEventListener(sEv, fn, false);
	} else {
		obj.detachEvent('on' + sEv, fn);
	}
}
