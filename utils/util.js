// 用于计算农历日期的字典
const lunarInfo = [0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
  0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
  0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0
]
// 生肖年份
const Animals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
// 24节气
const solarTermList = ['小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至'];
// 计算节气的字典
const sTermInfo = [0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758];
// 公历月份天数字典
const solarMonthList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// 农历日期字典
const nStr1 = ['日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
const nStr2 = ['初', '十', '廿', '卅'];

// 公历节日
const gong = [
  '0101',
  '0214',
  '0308',
  '0312',
  // '0315',
  '0401',
  '0501',
  '0504',
  '0512',
  '0601',
  '0701',
  '0801',
  '0910',
  '1001',
  '1224',
  '1225',
]
const gongzi = [
  '元旦',
  '情人节',
  '妇女节',
  '植树节',
  // '消费者权益日',
  '愚人节',
  '劳动节',
  '青年节',
  '护士节',
  '儿童节',
  '建党节',
  '建军节',
  '教师节',
  '国庆节',
  '平安夜',
  '圣诞节'
]
const solarFestival = {
  '0101': '元旦',
  '0214': '情人节',
  '0308': '妇女节',
  '0312': '植树节',
  '0315': '消费者权益日',
  '0401': '愚人节',
  '0501': '劳动节',
  '0504': '青年节',
  '0512': '护士节',
  '0601': '儿童节',
  '0701': '建党节',
  '0801': '建军节',
  '0910': '教师节',
  '1001': '国庆节',
  '1224': '平安夜',
  '1225': '圣诞节'
};
// 农历节日
const long = [
  '0101',
'0115',
'0505',
'0707',
'0715',
'0815',
'0909',
'1208',
'1224',
]
const longzi = [
  '春节',
  '元宵节',
'端午节',
'情人节',
'中元节',
'中秋节',
'重阳节',
'腊八节',
'小年'
]
const lunarFestival = {
  '0101': '春节',
  '0115': '元宵节',
  '0505': '端午节',
  '0707': '情人节',
  '0715': '中元节',
  '0815': '中秋节',
  '0909': '重阳节',
  '1208': '腊八节',
  '1224': '小年'
};

/**
* 返回农历年的总天数
* @param {*} year 
*/
function lunarYearDays(year) {
  let i;
  let sum = 348;
  for (i = 0x8000; i > 0x8; i >>= 1) {
      sum += (lunarInfo[year - 1900] & i) ? 1 : 0;
  }
  return sum + getLeapMonthDays(year);
}

/**
* 返回农历y年闰月的天数
* @param {*} year 
*/
function getLeapMonthDays(year) {
  if (getLeapMonth(year)) {
      return ((lunarInfo[year - 1900] & 0x10000) ? 30 : 29);
  } else {
      return 0;
  }
}
/**
* 判断y年的农历中那个月是闰月,不是闰月返回0
* @param {*} year 年份
*/
function getLeapMonth(year) {
  return (lunarInfo[year - 1900] & 0xf);
}
/**
* 返回农历月份的总天数
* @param {*} year 年份
* @param {*} month 农历月（从1开始）
*/
function getlunarMonthDays(year, month) {
  return ((lunarInfo[year - 1900] & (0x10000 >> month)) ? 30 : 29);
}

// 算出当前月第一天的农历日期和当前农历日期下一个月农历的第一天日期
function Dianaday(objDate) {
  var i, leap = 0,
      temp = 0;
  var baseDate = new Date(1900, 0, 31);
  var offset = (objDate - baseDate) / 86400000;
  this.dayCyl = offset + 40;
  this.monCyl = 14;
  for (i = 1900; i < 2050 && offset > 0; i++) {
      temp = lunarYearDays(i)
      offset -= temp;
      this.monCyl += 12;
  }
  if (offset < 0) {
      offset += temp;
      i--;
      this.monCyl -= 12;
  }
  this.year = i;
  this.yearCyl = i - 1864;
  leap = getLeapMonth(i); // 闰哪个月
  this.isLeap = false;
  for (i = 1; i < 13 && offset > 0; i++) {
      if (leap > 0 && i == (leap + 1) && this.isLeap == false) { // 闰月
          --i;
          this.isLeap = true;
          temp = getLeapMonthDays(this.year);
      } else {
          temp = getlunarMonthDays(this.year, i);
      }
      if (this.isLeap == true && i == (leap + 1)) this.isLeap = false; // 解除闰月
      offset -= temp;
      if (this.isLeap == false) this.monCyl++;
  }
  if (offset == 0 && leap > 0 && i == leap + 1)
      if (this.isLeap) {
          this.isLeap = false;
      }
  else {
      this.isLeap = true;
      --i;
      --this.monCyl;
  }
  if (offset < 0) {
      offset += temp;
      --i;
      --this.monCyl;
  }
  this.month = i;
  this.day = parseInt(offset + 1);
}

/**
* 返回公历月份的天数
* @param {*} year 年份
* @param {*} month 月份（该月份为Date对象直接返回的月份值，如1月则为0）
*/
function getSolarMonthDays(year, month) {
  if (month == 1) {
      return (((year % 4 == 0) && (year % 100 != 0) || (year % 400 == 0)) ? 29 : 28);
  } else {
      return (solarMonthList[month]);
  }
}

/**
* 最终返回的日期信息格式化节点
* @param {string | number} solarYear 公历年
* @param {string | number} solarMonth 公历月
* @param {string | number} solarDay 公历日
* @param {string} week 周几
* @param {string | number} lunarYear 农历年
* @param {string | number} lunarMonth 农历月
* @param {string | number} lunarDay 农历日
* @param {boolean} isLeap 是否是闰月
*/
function DayElement(solarYear, solarMonth, solarDay, week, lunarYear, lunarMonth, lunarDay, isLeap) {
  this.isToday = false;
  // 公历
  this.solarYear = solarYear;
  this.solarMonth = solarMonth >= 10 ? solarMonth : '0' + solarMonth;
  this.solarDay = solarDay >= 10 ? solarDay : '0' + solarDay;
  this.week = week;
  // 农历
  this.lunarYear = lunarYear;
  this.lunarMonth = lunarMonth >= 10 ? lunarMonth : '0' + lunarMonth;
  this.lunarDay = lunarDay >= 10 ? lunarDay : '0' + lunarDay;
  this.lunarDayStr = getLunarDay(lunarDay);
  this.isLeap = isLeap;
  // 节日记录
  this.lunarFestival = ''; // 农历节日
  this.solarFestival = ''; // 公历节日
  this.solarTerms = ''; // 节气
}

/**
* 判断第n个节气在几号(从0小寒起算), 每个月份有两个节气，小寒在公历的一月
* @param {*} y 年份
* @param {*} n 第几个节气
* @return 该节气在几号
*/
function solarTerm(y, n) {
  var offDate = new Date((31556925974.7 * (y - 1900) + sTermInfo[n] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
  return (offDate.getUTCDate())
}

/**
* 用中文显示农历的日期
* @param {number} day 日期
* return 中文农历日期
*/
function getLunarDay(day) {
  const d = parseInt(day);
  let s = '';
  switch (d) {
      case 10:
          s = '初十';
          break;
      case 20:
          s = '二十';
          break;
      case 30:
          s = '三十';
          break;
      default:
          s = nStr2[Math.floor(d / 10)];
          s += nStr1[d % 10];
  }
  return s;
}

function Calendar(y, m) {
  var solarDayObj, lunarDayObj, lY, lM, lD = 1,
      lL, lX = 0,
      tmp1, tmp2;
  var lDPOS = new Array(3);
  var n = 0;
  var firstLM = 0;
  solarDayObj = new Date(y, m, 1); // 当月第一天的日期
  this.length = getSolarMonthDays(y, m); // 公历当月天数
  this.firstWeek = solarDayObj.getDay(); // 公历当月1日星期几
  for (var i = 0; i < this.length; i++) {
      if (lD > lX) {
          solarDayObj = new Date(y, m, i + 1); // 公历日期
          lunarDayObj = new Dianaday(solarDayObj); // 农历
          lY = lunarDayObj.year; // 农历年
          lM = lunarDayObj.month; // 农历月
          lD = lunarDayObj.day; // 农历日
          lL = lunarDayObj.isLeap; // 农历是否闰月
          lX = lL ? getLeapMonthDays(lY) : getlunarMonthDays(lY, lM); // 农历当月最后一天
          if (n == 0) {
              firstLM = lM;
          }
          lDPOS[n++] = i - lD + 1;
      }
      this[i] = new DayElement(y, m + 1, i + 1, nStr1[(i + this.firstWeek) % 7], lY, lM, lD++, lL);
  }
  // 放在外层 减少执行次数
  // 节气 每个月有两个节气，所以月份的倍数即可
  tmp1 = solarTerm(y, m * 2) - 1;
  tmp2 = solarTerm(y, m * 2 + 1) - 1;
  this[tmp1].solarTerms = solarTermList[m * 2];
  this[tmp2].solarTerms = solarTermList[m * 2 + 1];

  // 判断是否为今天
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  if (y == year && m == month) this[day - 1].isToday = true;
}

function CalendarDay(a, b, c) {
  let solarDayObj;
  let lunarDayObj;
  let lunarYear;
  let lunarMonth;
  let lunarDay = 1;
  let isLeap;
  let tmp1;
  let tmp2;
  const date = new Date(a + '/' + b + '/' + c);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const week = date.getDay();
  solarDayObj = date;
  lunarDayObj = new Dianaday(solarDayObj); // 农历
  lunarYear = lunarDayObj.year; // 农历年
  lunarMonth = lunarDayObj.month; // 农历月
  lunarDay = lunarDayObj.day; // 农历日
  isLeap = lunarDayObj.isLeap; // 农历是否闰月

  var returnDay = new DayElement(year, month + 1, day, nStr1[week], lunarYear, lunarMonth, lunarDay, isLeap);
  // 节气 每个月有两个节气，所以月份的倍数即可
  tmp1 = solarTerm(year, month * 2)
  tmp2 = solarTerm(year, month * 2 + 1)
  if (tmp1 === day) {
      returnDay.solarTerms = solarTermList[month * 2];
  }
  if (tmp2 === day) {
      returnDay.solarTerms = solarTermList[month * 2 + 1];
  }
  returnDay.isToday = true;
  solarFestival
  let ly = String(returnDay.solarMonth) + returnDay.solarDay //公历年月
  let ly2 = String(returnDay.lunarMonth)+returnDay.lunarDay//农历年月
  // if([`solarFestival.${ly}`]){
  //     returnDay.solarTerms = [`solarFestival.${ly}`]
  // }
  if(gong.indexOf(ly)!=-1){
      returnDay.solarTerms = gongzi[gong.indexOf(ly)]
  }
  if(long.indexOf(ly2)!=-1){
      // console.log(ly2,'ddddddddddd',longzi[long.indexOf(ly2)])
      returnDay.solarTerms = longzi[long.indexOf(ly2)]
  }
  return returnDay
}




module.exports = {
  API: CalendarDay
}