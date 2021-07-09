var unti = require('../../utils/util');
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    workerClockData: {//日历上点点列表
      type: Object,
      value:[]
    },
    jielist:{//节假日列表
      type:Object,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    day: '',
    year: '',
    month: '',
    date: '2017-01',
    today: '',
    week: ['一', '二', '三', '四', '五', '六','日'],
    calendar: {
      first: [],
      second: [],
      third: [],
      fourth: []
    },
    swiperMap: ['first', 'second', 'third', 'fourth'],
    swiperIndex: 1,
    showCaldenlar: false,
    dropDown:false,//是否下拉
  },
  ready: function () {
    this.getinit()

  },

  /**
   * 组件的方法列表
   */
  methods: {
    binddropDwon(e){//下拉和上拉触发的事件
      console.log(e)
      this.setData({
        dropDown:e.type
      })
    },
    getinit() { //初始化
      const date = new Date()
        , month = this.formatMonth(date.getMonth() + 1)
        , year = date.getFullYear()
        , day = this.formatDay(date.getDate())
        , today = `${year}-${month}-${day}`
      let calendar = this.generateThreeMonths(year, month)
      // console.log(calendar)
      this.setData({
        calendar,
        month,
        year,
        day,
        today,
        beSelectDate: today,
        date: `${year}-${month}`
      })
      // console.log(this.data.calendar,this.data.today,'dksagja;kdj')
    },
    showCaldenlar() {
      this.setData({
        showCaldenlar: !this.data.showCaldenlar
      })
    },
    /**
     * 
     * 左右滑动
     * @param {any} e 
     */
    swiperChange(e) {
      const lastIndex = this.data.swiperIndex
        , currentIndex = e.detail.current

      let flag = false
        , { year, month, day, today, date, calendar, swiperMap } = this.data
        , change = swiperMap[(lastIndex + 2) % 4]
        , time = this.countMonth(year, month)
        , key = 'lastMonth'
      // console.log(lastIndex, currentIndex)
      if (lastIndex > currentIndex) {
        lastIndex === 3 && currentIndex === 0
          ? flag = true
          : null

      } else {
        lastIndex === 0 && currentIndex === 3
          ? null
          : flag = true
      }
      if (flag) {
        key = 'nextMonth'
      }
      // console.log(key)
      year = time[key].year
      month = time[key].month
      date = `${year}-${month}`
      day = ''

      if (today.indexOf(date) !== -1) {
        day = today.slice(-2)
      }

      time = this.countMonth(year, month)
      calendar[change] = null
      calendar[change] = this.generateAllDays(time[key].year, time[key].month)

      this.setData({
        swiperIndex: currentIndex,
        //文档上不推荐这么做，但是滑动并不会改变current的值，所以随之而来的计算会出错
        year,
        month,
        date,
        // day,
        calendar
      })
      // console.log(calendar,this.data.day,year,month,date)
      this.triggerEvent('bindhua',this.data.date+'-'+this.data.day)
    },
    /**
     * 
     * 点击切换月份，生成本月视图以及临近两个月的视图
     * @param {any} year 
     * @param {any} month 
     * @returns {object} calendar
     */
    generateThreeMonths(year, month) {
      let { swiperIndex, swiperMap, calendar } = this.data
        , thisKey = swiperMap[swiperIndex]
        , lastKey = swiperMap[swiperIndex - 1 === -1 ? 3 : swiperIndex - 1]
        , nextKey = swiperMap[swiperIndex + 1 === 4 ? 0 : swiperIndex + 1]
        , time = this.countMonth(year, month)
      delete calendar[lastKey]
      calendar[lastKey] = this.generateAllDays(time.lastMonth.year, time.lastMonth.month)
      delete calendar[thisKey]
      calendar[thisKey] = this.generateAllDays(time.thisMonth.year, time.thisMonth.month)
      delete calendar[nextKey]
      calendar[nextKey] = this.generateAllDays(time.nextMonth.year, time.nextMonth.month)
      return calendar
    },
    bindDayTap(e) {
      let { month, year } = this.data
        , time = this.countMonth(year, month)
        , tapMon = e.currentTarget.dataset.month
        , day = e.currentTarget.dataset.day
      if (tapMon == time.lastMonth.month) {
        this.changeDate(time.lastMonth.year, time.lastMonth.month,true)
      } else if (tapMon == time.nextMonth.month) {
        this.changeDate(time.nextMonth.year, time.nextMonth.month,true)
      } else {
        this.setData({
          day
        })
      }
      let beSelectDate = e.currentTarget.dataset.date;
      this.setData({
        beSelectDate,
        showCaldenlar: false
      })
      console.log(beSelectDate)
      this.triggerEvent('binddian',beSelectDate)
    },
    bindDateChange(e) {
      if (e.detail.value === this.data.date) {
        return
      }

      const month = e.detail.value.slice(-2)
        , year = e.detail.value.slice(0, 4)

      this.changeDate(year, month)
      this.triggerEvent('bindhua',year+'-'+month)
    },
    prevMonth(e) {
      let { year, month } = this.data
        , time = this.countMonth(year, month)
      this.changeDate(time.lastMonth.year, time.lastMonth.month)
    },
    nextMonth(e) {
      let { year, month } = this.data
        , time = this.countMonth(year, month)
      this.changeDate(time.nextMonth.year, time.nextMonth.month)
    },
    /**
     * 
     * 直接改变日期
     * @param {any} year 
     * @param {any} month 
     */
    changeDate(year, month,flage) {
      let { day, today } = this.data
        , calendar = this.generateThreeMonths(year, month)
        , date = `${year}-${month}`
      date.indexOf(today) === -1
        ? day = '01'
        : day = today.slice(-2)

      this.setData({
        calendar,
        day,
        date,
        month,
        year,
      })
      if(flage){
        this.triggerEvent('bindhua',year+'-'+month)
      }
    },
    /**
     * 
     * 月份处理
     * @param {any} year 
     * @param {any} month 
     * @returns 
     */
    countMonth(year, month) {
      let lastMonth = {
        month: this.formatMonth(parseInt(month) - 1)
      }
        , thisMonth = {
          year,
          month,
          num: this.getNumOfDays(year, month)
        }
        , nextMonth = {
          month: this.formatMonth(parseInt(month) + 1)
        }

      lastMonth.year = parseInt(month) === 1 && parseInt(lastMonth.month) === 12
        ? `${parseInt(year) - 1}`
        : year + ''
      lastMonth.num = this.getNumOfDays(lastMonth.year, lastMonth.month)
      nextMonth.year = parseInt(month) === 12 && parseInt(nextMonth.month) === 1
        ? `${parseInt(year) + 1}`
        : year + ''
      nextMonth.num = this.getNumOfDays(nextMonth.year, nextMonth.month)
      return {
        lastMonth,
        thisMonth,
        nextMonth
      }
    },
    currentMonthDays(year, month) {
      const numOfDays = this.getNumOfDays(year, month)
      return this.generateDays(year, month, numOfDays)
    },
    /**
     * 生成上个月应显示的天
     * @param {any} year 
     * @param {any} month 
     * @returns 
     */
    lastMonthDays(year, month) {
      const lastMonth = this.formatMonth(parseInt(month) - 1)
        , lastMonthYear = parseInt(month) === 1 && parseInt(lastMonth) === 12
          ? `${parseInt(year) - 1}`
          : year
        , lastNum = this.getNumOfDays(lastMonthYear, lastMonth) //上月天数
        
      let startWeek = this.getWeekOfDate(year, month - 1, 1) //本月1号是周几
        , days = []
      if (startWeek == 7) {
        return days
      }
      const startDay = lastNum - startWeek+1
      return this.generateDays(lastMonthYear, lastMonth, lastNum, { startNum: startDay, notCurrent: true })
    },
    /**
     * 生成下个月应显示天
     * @param {any} year 
     * @param {any} month
     * @returns 
     */
    nextMonthDays(year, month) {
      const nextMonth = this.formatMonth(parseInt(month) + 1)
        , nextMonthYear = parseInt(month) === 12 && parseInt(nextMonth) === 1
          ? `${parseInt(year) + 1}`
          : year
        , nextNum = this.getNumOfDays(nextMonthYear, nextMonth)  //下月天数
      let endWeek = this.getWeekOfDate(year, month)						 //本月最后一天是周几
        , days = []
        , daysNum = 0
      if (endWeek == 7) {
        return days
      } else {
        daysNum = 7-endWeek
      }
      //  else {
      //   daysNum = 6 - endWeek
      // }
      return this.generateDays(nextMonthYear, nextMonth, daysNum, { startNum: 1, notCurrent: true })
    },
    /**
     * 
     * 生成一个月的日历
     * @param {any} year 
     * @param {any} month 
     * @returns Array
     */
    generateAllDays(year, month) {
      let lastMonth = this.lastMonthDays(year, month)
        , thisMonth = this.currentMonthDays(year, month)
        , nextMonth = this.nextMonthDays(year, month)
        , days = [].concat(lastMonth, thisMonth, nextMonth)
      // console.log("jin")
      return days
    },
    /**
     * 
     * 生成日详情
     * @param {any} year 
     * @param {any} month 
     * @param {any} daysNum 
     * @param {boolean} [option={
     * 		startNum:1,
     * 		grey: false
     * 	}] 
     * @returns Array 日期对象数组
     */
    generateDays(year, month, daysNum, option = {
      startNum: 1,
      notCurrent: false
    }) {
      const weekMap = ['一', '二', '三', '四', '五', '六', '日']
      let days = []
      for (let i = option.startNum; i <= daysNum; i++) {
        let week = weekMap[new Date(year, month - 1, i).getUTCDay()]
        let day = this.formatDay(i)
        let jie = unti.API(year,month,day).solarTerms
        let state = ''
        // if(week=='日'||week=='六'){
        //   state=1
        // }
        let riqi = year+'-'+Number(month)+'-'+Number(day)
        if(this.data.jielist){
          if(this.data.jielist.indexOf(this.data.jielist.filter(d=>d.date==riqi)[0])!=-1){
            state = this.data.jielist[this.data.jielist.indexOf(this.data.jielist.filter(d=>d.date==riqi)[0])].status
          }
        }
        days.push({
          date: `${year}-${month}-${day}`,
          event: false,
          day,
          week,
          month,
          year,
          jie:jie,
          state
        })
      }
      return days
    },
    /**
     * 
     * 获取指定月第n天是周几		|
     * 9月第1天： 2017, 08, 1 |
     * 9月第31天：2017, 09, 0 
     * @param {any} year 
     * @param {any} month 
     * @param {number} [day=0] 0为最后一天，1为第一天
     * @returns number 周 1-7, 
     */
    getWeekOfDate(year, month, day = 0) {
      let dateOfMonth = new Date(year, month, 0).getUTCDay() + 1;
      dateOfMonth == 7 ? dateOfMonth = 0 : '';
      return dateOfMonth;
    },
    /**
     * 
     * 获取本月天数
     * @param {number} year 
     * @param {number} month 
     * @param {number} [day=0] 0为本月0最后一天的
     * @returns number 1-31
     */
    getNumOfDays(year, month, day = 0) {
      return new Date(year, month, day).getDate()
    },
    /**
     * 
     * 月份处理
     * @param {number} month 
     * @returns format month MM 1-12
     */
    formatMonth(month) {
      let monthStr = ''
      if (month > 12 || month < 1) {
        monthStr = Math.abs(month - 12) + ''
      } else {
        monthStr = month + ''
      }
      monthStr = `${monthStr.length > 1 ? '' : '0'}${monthStr}`
      return monthStr
    },
    formatDay(day) {
      return `${(day + '').length > 1 ? '' : '0'}${day}`
    },


    bindchu(){//处理日期上的点
      let arr = this.data.calendar
      let items =this.data.workerClockData
      if(arr.first.length!=0){
        for(let i =0;i<arr.first.length;i++){
          arr.first[i].title=[]
          arr.first[i].type2=''
          arr.first[i].type3=''
          arr.first[i].type1=''
          for(let j =0;j<items.length;j++){
            if(arr.first[i].date==items[j].time){
              arr.first[i].type = items[j].type
              arr.first[i].title = arr.first[i].title.concat({'name':items[j].title,'type':items[j].type})
              if(items[j].type==2){
                arr.first[i].type2=2
              }
              if(items[j].type==3){
                arr.first[i].type3=3
              }
              if(items[j].type==1){
                arr.first[i].type1=1
              }
            }
          }
        }
      }
      if(arr.fourth.length!=0){
        for(let i =0;i<arr.fourth.length;i++){
          arr.fourth[i].title=[]
          arr.fourth[i].type2=''
          arr.fourth[i].type3=''
          arr.fourth[i].type1=''
          for(let j =0;j<items.length;j++){
            if(arr.fourth[i].date==items[j].time){
              if(items[j].type==2){
                arr.fourth[i].type2=2
              }
              if(items[j].type==3){
                arr.fourth[i].type3=3
              }
              if(items[j].type==1){
                arr.fourth[i].type1=1
              }
              arr.fourth[i].title = arr.fourth[i].title.concat({'name':items[j].title,'type':items[j].type})
            }
          }
        }
      }
      if(arr.second.length!=0){
        for(let i =0;i<arr.second.length;i++){
          arr.second[i].title=[]
          arr.second[i].type2=''
          arr.second[i].type3=''
          arr.second[i].type1=''
          for(let j =0;j<items.length;j++){
            if(arr.second[i].date==items[j].time){
              arr.second[i].title = arr.second[i].title.concat({'name':items[j].title,'type':items[j].type})
              if(items[j].type==2){
                arr.second[i].type2=2
              }
              if(items[j].type==3){
                arr.second[i].type3=3
              }
              if(items[j].type==1){
                arr.second[i].type1=1
              }
            }
          }
        }
      }
      if(arr.third.length!=0){
        for(let i =0;i<arr.third.length;i++){
          arr.third[i].title=[]
          arr.third[i].type2=''
          arr.third[i].type3=''
          arr.third[i].type1=''
          for(let j =0;j<items.length;j++){
            if(arr.third[i].date==items[j].time){
              if(items[j].type==2){
                arr.third[i].type2=2
              }
              if(items[j].type==3){
                arr.third[i].type3=3
              }
              if(items[j].type==1){
                arr.third[i].type1=1
              }
              arr.third[i].title = arr.third[i].title.concat({'name':items[j].title,'type':items[j].type})
            }
          }
        }
      }
      // console.log(arr)
      this.setData({
        calendar:arr
      })
    },
  }
})
