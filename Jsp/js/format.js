Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S"  : this.getMilliseconds()// millisecond
	}
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4- RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(format))
	format = format.replace(RegExp.$1, RegExp.$1.length == 1? o[k]: ("00" + o[k]).substr(("" + o[k]).length));
	return format;
}
Date.prototype.getWeek = function() {
	var str ="";
	if (this.getDay() == 1) {
		str = "星期一";
	}
	else if(this.getDay() == 2)
	{
		str = "星期二";
	}else if(this.getDay() == 3)
	{
		str = "星期三";
	}else if(this.getDay() == 4)
	{
		str = "星期四";
	}else if(this.getDay() == 5)
	{
		str = "星期五";
	}else if(this.getDay() == 6)
	{
		str = "星期六";
	}else if(this.getDay() == 0)
	{
		str = "星期日";
	}
	return str;
}
