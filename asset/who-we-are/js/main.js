window.onload = function () {
	var data = [
		{q1: '我们是谁？', a1: '程序猿！', q2: '我们的日常是？', a2: '改Bug！', q3: '改完Bug做什么？', a3: '写新Bug！'},
		{q1: '我们是谁？', a1: '程序猿！', q2: '我们的目标是？', a2: '有个女朋友！', q3: '没有怎么办？', a3: '自己New一个！'},
		{q1: '我们是谁？', a1: '程序猿！', q2: '我们干什么？', a2: '找Bug！', q3: 'Bug在哪里？', a3: '你脸上！'},
		{q1: '我们是谁？', a1: '程序猿！', q2: '我们要成为什么？', a2: '牛逼的程序猿！', q3: '要读什么书？', a3: '《颈椎病康复指南》！'},
		{q1: '我们是谁？', a1: '程序猿！', q2: '我们有什么？', a2: '有经验！', q3: '经验哪里来？', a3: '加班！'},
		{q1: '我们是谁？', a1: '程序猿！', q2: '我们最讨厌听到什么？', a2: '改需求！', q3: '又改需求怎么办？', a3: '打死产品经理！'},
		{q1: '我们是谁？', a1: '程序猿！', q2: '我们会什么？', a2: '编程语言！', q3: '最好的编程语言是？', a3: 'PHP！'},
		{q1: '我们是谁？', a1: '程序猿！', q2: '锄禾日当午下一句？', a2: '不如coding苦！', q3: '调试一下午下一句？', a3: 'Bug还得补！'}
	];
	var width = 640;
	var height = 708;

	var imgBg = document.getElementById('imgBg');
	var imgResult = document.getElementById('imgResult');
	var pageIndex = document.getElementById('pageIndex');
	var pageResult = document.getElementById('pageResult');

	var q1 = document.getElementById('q1');
	var q2 = document.getElementById('q2');
	var q3 = document.getElementById('q3');

	var a1 = document.getElementById('a1');
	var a2 = document.getElementById('a2');
	var a3 = document.getElementById('a3');

	var btnMake = document.getElementById('btnMake');
	var btnResult = document.getElementById('btnResult');

	var showText = function () {
		var text = data[Math.floor(Math.random() * data.length)];
		q1.value = text.q1;
		q2.value = text.q2;
		q3.value = text.q3;
		a1.value = text.a1;
		a2.value = text.a2;
		a3.value = text.a3;
	};
	showText();
	// 生成图片
	btnMake.onclick = function () {
		draw(function (error, data) {
			imgResult.src = data;
			pageResult.style.display = 'block';
			pageIndex.style.display = 'none';
		});
	};
	btnResult.onclick = function () {
		showText();
		pageResult.style.display = 'none';
		pageIndex.style.display = 'block';
	};
	var draw = function (callback) {
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		canvas.width = width;
		canvas.height = height;
		canvas.style.width = width * 2;
		canvas.style.height = height * 2;
		// 绘制图片
		ctx.drawImage(imgBg, 0, 0, width, height);
		ctx.save();
		// 绘制文字
		ctx.fillStyle = '#000000';
    ctx.font = '30px 微软雅黑';
    ctx.fontWeight = '500';
    ctx.textAlign = 'center';// 文本水平对齐方式
    ctx.textBaseline = 'top';// 文本垂直方向，基线位置
    [q1.value, q2.value, q3.value, a1.value, a2.value, a3.value].forEach(function (text, index) {
    	ctx.fillText(text, 160 + (index > 2 ? 1 : 0) * 320, 10 + index % 3 * 241);
    });
    ctx.save();

		var strDataURI = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
		callback(null, strDataURI);
	};
}

