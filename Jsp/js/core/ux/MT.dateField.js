
/**
 * @author Administrator { xtype:'datefield', showRedSatSun:true,
 *         //是否显示红色的星期六、星期天 showLunarCalendar:true // 是否显示农历 }
 */

/** 农历日期类 */
var lunarInfo = new Array(0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0,
        0x14977, 0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970, 0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6,
        0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0, 0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6, 0x095b0, 0x049b0,
        0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954, 0x0d4a0,
        0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5, 0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930, 0x07954, 0x06aa0, 0x0ad50, 0x05b52,
        0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577,
        0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0);

var Animals = new Array("鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪");
var Gan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");
var Zhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");
var now = new Date();

// ==== 传入 offset 传回干支, 0=甲子
function cyclical(num)
{
	return (Gan[num % 10] + Zhi[num % 12])
}

// ==== 传回农历 y年的总天数
function lYearDays(y)
{
	var i, sum = 348
	for (i = 0x8000; i > 0x8; i >>= 1)
		sum += (lunarInfo[y - 1900] & i) ? 1 : 0
	return (sum + leapDays(y))
}

// ==== 传回农历 y年闰月的天数
function leapDays(y)
{
	if (leapMonth(y)) return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29)
	else
		return (0)
}

// ==== 传回农历 y年闰哪个月 1-12 , 没闰传回 0
function leapMonth(y)
{
	return (lunarInfo[y - 1900] & 0xf)
}

// ====================================== 传回农历 y年m月的总天数
function monthDays(y, m)
{
	return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29)
}

// ==== 算出农历, 传入日期物件, 传回农历日期物件
// 该物件属性有 .year .month .day .isLeap .yearCyl .dayCyl .monCyl
function Lunar(objDate)
{
	var i, leap = 0, temp = 0;
	var baseDate = new Date(1900, 0, 31);
	var offset = (objDate - baseDate) / 86400000;

	this.dayCyl = offset + 40;
	this.monCyl = 14;

	for (i = 1900; i < 2050 && offset > 0; i++)
	{
		temp = lYearDays(i);
		offset -= temp;
		this.monCyl += 12;
	}
	if (offset < 0)
	{
		offset += temp;
		i--;
		this.monCyl -= 12;
	}

	this.year = i;
	this.yearCyl = i - 1864;

	leap = leapMonth(i) // 闰哪个月
	this.isLeap = false

	for (i = 1; i < 13 && offset > 0; i++)
	{
		// 闰月
		if (leap > 0 && i == (leap + 1) && this.isLeap == false)
		{
			--i;
			this.isLeap = true;
			temp = leapDays(this.year);
		}
		else
		{
			temp = monthDays(this.year, i);
		}

		// 解除闰月
		if (this.isLeap == true && i == (leap + 1))
		{
			this.isLeap = false
		}
		offset -= temp
		if (this.isLeap == false)
		{
			this.monCyl++
		}
	}

	if (offset == 0 && leap > 0 && i == leap + 1)
	{
		if (this.isLeap)
		{
			this.isLeap = false;
		}
		else
		{
			this.isLeap = true;
			--i;
			--this.monCyl;
		}
	}

	if (offset < 0)
	{
		offset += temp;
		--i;
		--this.monCyl;
	}

	this.month = i;
	this.day = offset + 1;
}

function YYMMDD()
{
	var cl = '<font color="#0000df" STYLE="font-size:9pt;">';
	if (now.getDay() == 0) cl = '<font color="#c00000" STYLE="font-size:9pt;">';
	if (now.getDay() == 6) cl = '<font color="#00c000" STYLE="font-size:9pt;">';
	return (cl + SY + '年' + (SM + 1) + '月' + SD + '日</font>');
}

function weekday()
{
	var day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
	var cl = '<font color="#ff0000" STYLE="font-size:9pt;">';
	if (now.getDay() == 0) cl = '<font color="#c00000" STYLE="font-size:9pt;">';
	if (now.getDay() == 6) cl = '<font color="#00c000" STYLE="font-size:9pt;">';
	return (cl + day[now.getDay()] + '</font>');
}

// ==== 中文日期
function cDay(m, d)
{
	var nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
	var nStr2 = new Array('初', '十', '廿', '卅', '　');
	var s;
	if (m > 10)
	{
		s = '十' + nStr1[m - 10];
	}
	else
	{
		s = nStr1[m]
	}
	s += '月'
	switch (d)
	{
	case 10 :
		s += '初十';
	break;
	case 20 :
		s += '二十';
	break;
	case 30 :
		s += '三十';
	break;
	default :
		s += nStr2[Math.floor(d / 10)];
		s += nStr1[d % 10];
	}
	return (s);
}

// ==== 简化的中文日期
function cDay2(lDObj)
{
	var m = lDObj.month;
	var d = lDObj.day;
	var nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
	var nStr2 = new Array('初', '十', '廿', '卅', '　');
	var s = '';
	if (lDObj.isLeap)
	{
		s += '闰';
	}
	if (m > 10)
	{
		s += '十' + nStr1[m - 10];
	}
	else
	{
		s += nStr1[m]
	}
	s += '月';
	switch (d)
	{
	case 10 :
		s = '初十';
	break;
	case 20 :
		s = '二十';
	break;
	case 30 :
		s = '三十';
	break;
	default :
		if (d != 1)
		{
			s = nStr2[Math.floor(d / 10)];
			s += nStr1[d % 10];
		}
	}
	return (s);
}

function solarDay1(SY, SM, SD)
{
	var sDObj = new Date(SY, SM, SD);
	var lDObj = new Lunar(sDObj);
	var cl = '<font color="violet" STYLE="font-size:9pt;">';
	var tt = '【' + Animals[(SY - 4) % 12] + '】' + cyclical(lDObj.monCyl) + '月 ' + cyclical(lDObj.dayCyl++) + '日';
	return (cl + tt + '</font>');
}
function solarDay2(year, month, day)
{
	var sDObj = new Date(year, month, day);
	var lDObj = new Lunar(sDObj);
	var tt = cyclical(year - 1900 + 36) + '年 ' + cDay(lDObj.month, lDObj.day);
	return tt;
}
function solarDay3(year, month, day)
{
	var sDObj = new Date(year, month, day);
	var lDObj = new Lunar(sDObj);
	var sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224,
	        483532, 504758)
	var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至")
	var lFtv = new Array("0101 春节", "0115 元宵节", "0505 端午节", "0707 七夕情人节", "0715 中元节", "0815 中秋节", "0909 重阳节", "1208 腊八节", "1224 小年", "0100*除夕")
	var sFtv = new Array("0101 元旦", "0214 情人节", "0308 妇女节", "0312 植树节", "0315 消费者权益日", "0401 愚人节", "0501 劳动节", "0504 青年节", "0512 护士节", "0601 儿童节", "0701 建党节 香港回归纪念", "0801 建军节", "0808 父亲节",
	        "0908 茂生日", "0909 毛泽东逝世纪念", "0910 教师节", "0928 孔子诞辰", "1001 国庆节", "1006 老人节", "1024 联合国日", "1112 孙中山诞辰", "1220 澳门回归纪念", "1225 圣诞节", "1226 毛泽东诞辰")

	var lDPOS = new Array(3)
	var festival = '', solarTerms = '', solarFestival = '', lunarFestival = '', tmp1, tmp2;
	// 农历节日
	for (var i = 0; i < lFtv.length; i++)
	{
		if (lFtv[i] != null && lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/))
		{
			tmp1 = Number(RegExp.$1) - lDObj.month
			tmp2 = Number(RegExp.$2) - lDObj.day
			if (tmp1 == 0 && tmp2 == 0) lunarFestival = RegExp.$4
		}
	}
	// 国历节日
	for (var i = 0; i < sFtv.length; i++)
	{
		if (sFtv[i] != null && sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/))
		{
			tmp1 = Number(RegExp.$1) - (month + 1)
			tmp2 = Number(RegExp.$2) - day
			if (tmp1 == 0 && tmp2 == 0) solarFestival = RegExp.$4
		}
	}
	// //节气
	// tmp1 = new Date((31556925974.7 * (year - 1900) + sTermInfo[month * 2 + 1]
	// * 60000) + Date.UTC(1900, 0, 6, 2, 5))
	// tmp2 = tmp1.getUTCDate()
	// if (tmp2 == day) solarTerms = solarTerm[month * 2 + 1]
	// tmp1 = new Date((31556925974.7 * (year - 1900) + sTermInfo[month * 2] *
	// 60000) + Date.UTC(1900, 0, 6, 2, 5))
	// tmp2 = tmp1.getUTCDate()
	// if (tmp2 == day) solarTerms = solarTerm[month * 2]

	// if (solarTerms == '' && solarFestival == '' && lunarFestival == '')
	// festival = '';
	// else
	// festival = solarTerms + ' ' + solarFestival + ' ' + lunarFestival;
	festival = lunarFestival;
	return festival;
}

function ConverDate(date)
{
	// 换算为农历
	var lDObj = new Lunar(date);
	// 转换农历显示文字
	var mDay = cDay2(lDObj);

	var da = new Date(date);
	var s = solarDay3(da.getFullYear(), da.getMonth(), da.getDate());
	if (s != '') return s;
	return mDay;
	// return mDay;
}

Ext.apply(Ext.DatePicker.prototype, {
	showRedSatSun : false, // 是否显示红色的星期六、星期天
	showLunarCalendar : false, // 是否显示农历
	// private
	onRender : function(container, position)
	{
		// 如果显示农历则扩大宽度，
		var middleWidth1 = '';		// 默认为130px
		var middleWidth2 = '';	// 为兼容Google浏览器，默认为175px
		if (this.showLunarCalendar)
		{
			middleWidth1 = 'style="width:250px"';
			if (Ext.isWebKit)
				middleWidth2 = 'style="width:295px"';
		}
		var m = [ '<table cellspacing="0">','<tr><td class="x-date-left"><a href="#" title="',this.prevText,
		        '">&#160;</a></td><td class="x-date-middle" align="center" ' + middleWidth1 + '></td><td class="x-date-right"><a href="#" title="',this.nextText,'">&#160;</a></td></tr>',
		        '<tr><td colspan="3"><table class="x-date-inner" cellspacing="0" ' + middleWidth2 + '><thead><tr>' ], dn = this.dayNames, i;
		for (i = 0; i < 7; i++)
		{
			var d = this.startDay + i;
			if (d > 6)
			{
				d = d - 7;
			}
			m.push('<th><span>', dn[d].substr(0, 1), '</span></th>');
		}
		m[m.length] = '</tr></thead><tbody><tr>';
		for (i = 0; i < 42; i++)
		{
			if (i % 7 === 0 && i !== 0)
			{
				m[m.length] = '</tr><tr>';
			}
			// 将星期六和星期天的颜色换成红色了
			if (this.showRedSatSun && (i % 7 == 0 || (i + 1) % 7 == 0)) m[m.length] = '<td><a href="#" hidefocus="on" class="x-date-date" tabIndex="1"><em><span style="color:red;"></span></em></a></td>';
			else
				m[m.length] = '<td><a href="#" hidefocus="on" class="x-date-date" tabIndex="1"><em><span></span></em></a></td>';
		}
		m.push('</tr></tbody></table></td></tr>', this.showToday ? '<tr><td colspan="3" class="x-date-bottom" align="center"></td></tr>' : '', '</table><div class="x-date-mp"></div>');

		var el = document.createElement('div');
		el.className = 'x-date-picker';
		el.innerHTML = m.join('');

		container.dom.insertBefore(el, position);

		this.el = Ext.get(el);
		this.eventEl = Ext.get(el.firstChild);

		this.prevRepeater = new Ext.util.ClickRepeater(this.el.child('td.x-date-left a'), {
			handler : this.showPrevMonth,
			scope : this,
			preventDefault : true,
			stopDefault : true
		});

		this.nextRepeater = new Ext.util.ClickRepeater(this.el.child('td.x-date-right a'), {
			handler : this.showNextMonth,
			scope : this,
			preventDefault : true,
			stopDefault : true
		});

		this.monthPicker = this.el.down('div.x-date-mp');
		this.monthPicker.enableDisplayMode('block');

		this.keyNav = new Ext.KeyNav(this.eventEl, {
			'left' : function(e)
			{
				if (e.ctrlKey)
				{
					this.showPrevMonth();
				}
				else
				{
					this.update(this.activeDate.add('d', -1));
				}
			},

			'right' : function(e)
			{
				if (e.ctrlKey)
				{
					this.showNextMonth();
				}
				else
				{
					this.update(this.activeDate.add('d', 1));
				}
			},

			'up' : function(e)
			{
				if (e.ctrlKey)
				{
					this.showNextYear();
				}
				else
				{
					this.update(this.activeDate.add('d', -7));
				}
			},

			'down' : function(e)
			{
				if (e.ctrlKey)
				{
					this.showPrevYear();
				}
				else
				{
					this.update(this.activeDate.add('d', 7));
				}
			},

			'pageUp' : function(e)
			{
				this.showNextMonth();
			},

			'pageDown' : function(e)
			{
				this.showPrevMonth();
			},

			'enter' : function(e)
			{
				e.stopPropagation();
				return true;
			},

			scope : this
		});

		this.el.unselectable();

		this.cells = this.el.select('table.x-date-inner tbody td');
		this.textNodes = this.el.query('table.x-date-inner tbody span');

		this.mbtn = new Ext.Button({
			text : '&#160;',
			tooltip : this.monthYearText,
			renderTo : this.el.child('td.x-date-middle', true)
		});
		this.mbtn.el.child('em').addClass('x-btn-arrow');

		if (this.showToday)
		{
			this.todayKeyListener = this.eventEl.addKeyListener(Ext.EventObject.SPACE, this.selectToday, this);
			var today = (new Date()).dateFormat(this.format);
			this.todayBtn = new Ext.Button({
				renderTo : this.el.child('td.x-date-bottom', true),
				text : String.format(this.todayText, today),
				tooltip : String.format(this.todayTip, today),
				handler : this.selectToday,
				scope : this
			});
		}
		this.mon(this.eventEl, 'mousewheel', this.handleMouseWheel, this);
		this.mon(this.eventEl, 'click', this.handleDateClick, this, {
			delegate : 'a.x-date-date'
		});
		this.mon(this.mbtn, 'click', this.showMonthPicker, this);
		this.onEnable(true);

	},
	update : function(date, forceRefresh)
	{
		if (this.rendered)
		{
			var vd = this.activeDate, vis = this.isVisible();
			this.activeDate = date;
			if (!forceRefresh && vd && this.el)
			{
				var t = date.getTime();
				if (vd.getMonth() == date.getMonth() && vd.getFullYear() == date.getFullYear())
				{
					this.cells.removeClass('x-date-selected');
					this.cells.each(function(c)
					{
						if (c.dom.firstChild.dateValue == t)
						{
							c.addClass('x-date-selected');
							if (vis && !this.cancelFocus)
							{
								Ext.fly(c.dom.firstChild).focus(50);
							}
							return false;
						}
					}, this);
					return;
				}
			}
			var days = date.getDaysInMonth(), firstOfMonth = date.getFirstDateOfMonth(), startingPos = firstOfMonth.getDay() - this.startDay;

			if (startingPos < 0)
			{
				startingPos += 7;
			}
			days += startingPos;

			var pm = date.add('mo', -1), prevStart = pm.getDaysInMonth() - startingPos, cells = this.cells.elements, textEls = this.textNodes, day = 86400000, d = (new Date(pm.getFullYear(), pm
			                .getMonth(), prevStart)).clearTime(), today = new Date().clearTime().getTime(), sel = date.clearTime(true).getTime(), min = this.minDate
			        ? this.minDate.clearTime(true)
			        : Number.NEGATIVE_INFINITY, max = this.maxDate ? this.maxDate.clearTime(true) : Number.POSITIVE_INFINITY, ddMatch = this.disabledDatesRE, ddText = this.disabledDatesText, ddays = this.disabledDays
			        ? this.disabledDays.join('')
			        : false, ddaysText = this.disabledDaysText, format = this.format;

			if (this.showToday)
			{
				var td = new Date().clearTime(), disable = (td < min || td > max || (ddMatch && format && ddMatch.test(td.dateFormat(format))) || (ddays && ddays.indexOf(td.getDay()) != -1));

				if (!this.disabled)
				{
					this.todayBtn.setDisabled(disable);
					this.todayKeyListener[disable ? 'disable' : 'enable']();
				}
			}
			var setCellClass = function(cal, cell)
			{
				cell.title = '';
				var t = d.getTime();
				cell.firstChild.dateValue = t;
				if (t == today)
				{
					cell.className += ' x-date-today';
					cell.title = cal.todayText;
				}
				if (t == sel)
				{
					cell.className += ' x-date-selected';
					if (vis)
					{
						Ext.fly(cell.firstChild).focus(50);
					}
				}
				if (t < min)
				{
					cell.className = ' x-date-disabled';
					cell.title = cal.minText;
					return;
				}
				if (t > max)
				{
					cell.className = ' x-date-disabled';
					cell.title = cal.maxText;
					return;
				}
				if (ddays)
				{
					if (ddays.indexOf(d.getDay()) != -1)
					{
						cell.title = ddaysText;
						cell.className = ' x-date-disabled';
					}
				}
				if (ddMatch && format)
				{
					var fvalue = d.dateFormat(format);
					if (ddMatch.test(fvalue))
					{
						cell.title = ddText.replace('%0', fvalue);
						cell.className = ' x-date-disabled';
					}
				}
			};

			var i = 0;
			for (; i < startingPos; i++)
			{
				// 修改
				if (this.showLunarCalendar) textEls[i].innerHTML = ((++prevStart) + '<br/>' + ConverDate(d));
				else
					textEls[i].innerHTML = (++prevStart);
				d.setDate(d.getDate() + 1);
				cells[i].className = 'x-date-prevday';
				setCellClass(this, cells[i]);
			}
			for (; i < days; i++)
			{
				var intDay = i - startingPos + 1;
				// 修改
				if (this.showLunarCalendar) textEls[i].innerHTML = ((intDay) + '<br/>' + ConverDate(d));
				else
					textEls[i].innerHTML = (intDay);
				d.setDate(d.getDate() + 1);
				cells[i].className = 'x-date-active';
				setCellClass(this, cells[i]);
			}
			var extraDays = 0;
			for (; i < 42; i++)
			{
				// 修改
				if (this.showLunarCalendar) textEls[i].innerHTML = ((++extraDays) + '<br/>' + ConverDate(d));
				else
					textEls[i].innerHTML = (++extraDays);
				d.setDate(d.getDate() + 1);
				cells[i].className = 'x-date-nextday';
				setCellClass(this, cells[i]);
			}

			this.mbtn.setText(this.monthNames[date.getMonth()] + ' ' + date.getFullYear());

			if (!this.internalRender)
			{
				var main = this.el.dom.firstChild, w = main.offsetWidth;
				this.el.setWidth(w + this.el.getBorderWidth('lr'));
				Ext.fly(main).setWidth(w);
				this.internalRender = true;
				if (Ext.isOpera && !this.secondPass)
				{
					main.rows[0].cells[1].style.width = (w - (main.rows[0].cells[0].offsetWidth + main.rows[0].cells[2].offsetWidth)) + 'px';
					this.secondPass = true;
					this.update.defer(10, this, [ date ]);
				}
			}
		}
	}
});

Ext.apply(Ext.form.DateField.prototype, {
	showRedSatSun : false, // 是否显示红色的星期六、星期天
	showLunarCalendar : false, // 是否显示农历
	onTriggerClick : function()
	{
		if (this.disabled) { return; }
		if (this.menu == null)
		{
			this.menu = new Ext.menu.DateMenu({
				hideOnClick : false,
				focusOnSelect : false
			});
		}
		this.onFocus();
		Ext.apply(this.menu.picker, {
			minDate : this.minValue,
			maxDate : this.maxValue,
			disabledDatesRE : this.disabledDatesRE,
			disabledDatesText : this.disabledDatesText,
			disabledDays : this.disabledDays,
			disabledDaysText : this.disabledDaysText,
			showRedSatSun : this.showRedSatSun,
			showLunarCalendar : this.showLunarCalendar,
			format : this.format,
			showToday : this.showToday,
			minText : String.format(this.minText, this.formatDate(this.minValue)),
			maxText : String.format(this.maxText, this.formatDate(this.maxValue))
		});
		this.menu.picker.setValue(this.getValue() || new Date());
		this.menu.show(this.el, "tl-bl?");
		this.menuEvents('on');
	},
	setValue : function(date)
	{
		var d = this.parseDate(date);
		if (d)
		{
			if (this.showRedSatSun)
			{
				if (d.getDay() == 0 || d.getDay() == 6) this.getEl().dom.style.color = 'red';
				else
					this.getEl().dom.style.color = '#000000';
			}
			return Ext.form.DateField.superclass.setValue.call(this, this.formatDate(d));
		}
	},
	onSelect : function(m, d)
	{
		this.setValue(d);
		// 修改
		if (this.showRedSatSun)
		{
			if (d.getDay() == 0 || d.getDay() == 6) this.getEl().dom.style.color = 'red';
			else
				this.getEl().dom.style.color = '#000000';
		}
		this.fireEvent('select', this, d);
		this.menu.hide();
	},
	beforeBlur : function()
	{
		var v = this.parseDate(this.getRawValue());
		if (v)
		{
			this.setValue(v);
			// 修改
			if (this.showRedSatSun)
			{
				if (v.getDay() == 0 || v.getDay() == 6) this.getEl().dom.style.color = 'red';
				else
					this.getEl().dom.style.color = '#000000';
			}
		}
	}
});
