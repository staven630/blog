/**
 *
 * @param {Object} id  input的id
 * @param {Object} url  ajax提交地址
 * @param {Object} priviewFn 预览方法，若无需要传null
 * @param {Object} successFn 上传成功方法，若无需要传null
 */
function uploadImg(id, url, priviewFn, successFn, errorFn) {
	var upload = document.getElementById(id);
	upload.addEventListener('change', function() {
		var file = this.files[0];
		//图片方向角
		var Orientation = null;
		if(file) {
			var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
			if(!rFilter.test(file.type)) {
				return;
			}
			//获取照片方向角属性，用户旋转控制
			EXIF.getData(file, function() {
				EXIF.getAllTags(this);
				Orientation = EXIF.getTag(this, 'Orientation');
			});

			var oReader = new FileReader();
			oReader.onload = function(e) {
				var image = new Image();
				image.src = e.target.result;
				image.onload = function() {
					var expectWidth = this.naturalWidth;
					var expectHeight = this.naturalHeight;
					if(this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
						expectWidth = 800;
						expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
					} else if(this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
						expectHeight = 1200;
						expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
					}
					var canvas = document.createElement("canvas");
					var ctx = canvas.getContext("2d");
					canvas.width = expectWidth;
					canvas.height = expectHeight;
					ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
					var base64 = null;
					var mpImg = new MegaPixImage(image);
					mpImg.render(canvas, {
						maxWidth: 800,
						maxHeight: 1200,
						quality: 0.8,
						orientation: Orientation
					});
					//获取压缩后的图片base64位值
					base64 = canvas.toDataURL("image/jpeg", 0.8);
					//预览
					if(!!priviewFn){
						priviewFn(base64);
					}
					//上传
					if(!!uploadImage){
						successFn = successFn || null;
						errorFn = errorFn || null;
						uploadImage(url, base64, successFn, errorFn);
					}
				};
			};
			oReader.readAsDataURL(file);
		}
	});
}

//对图片旋转处理
function rotateImg(img, direction, canvas) {
	//最小与最大旋转方向，图片旋转4次后回到原方向
	var min_step = 0;
	var max_step = 3;

	if(img == null) return;
	//img的高度和宽度不能在img元素隐藏后获取，否则会出错
	var height = canvas.height;
	var width = canvas.width;

	var step = 2;
	if(step == null) {
		step = min_step;
	}
	if(direction == 'right') {
		step++;
		//旋转到原位置，即超过最大值
		step > max_step && (step = min_step);
	} else {
		step--;
		step < min_step && (step = max_step);
	}

	//旋转角度以弧度值为参数
	var degree = step * 90 * Math.PI / 180;
	var ctx = canvas.getContext('2d');
	switch(step) {
		case 0:
			canvas.width = width;
			canvas.height = height;
			ctx.drawImage(img, 0, 0);
			break;
		case 1:
			canvas.width = height;
			canvas.height = width;
			ctx.rotate(degree);
			ctx.drawImage(img, 0, -height);
			break;
		case 2:
			canvas.width = width;
			canvas.height = height;
			ctx.rotate(degree);
			ctx.drawImage(img, -width, -height);
			break;
		case 3:
			canvas.width = height;
			canvas.height = width;
			ctx.rotate(degree);
			ctx.drawImage(img, -width, 0);
			break;
	}
}

/** 记录上传数据 */
function uploadImage(url, imageData, successFn, errorFn) {
	if(imageData) {
		$.ajax({
			type: "post",
			data: {
				baseimg: imageData
			},
			url: url,
			async: true,
			success: function(data) {
				if(successFn){
					successFn(data);
				}
			},
			error: function(err){
				if(errorFn){
					errorFn(err);
				}

			}
		});
	}
}
