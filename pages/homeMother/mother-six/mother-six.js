var time = require('../../../utils/time.js');
const date = new Date()
const years = []
const months = []
const days = []
const daysX = []
const daysD = []
const daysP = []
const daysR = []
var mDay

for (let i = 1900; i <= date.getFullYear(); i++) {
  years.push(i)
}
for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
for (let i = 1; i <= 30; i++) {
  daysX.push(i)
}
for (let i = 1; i <= 31; i++) {
  daysD.push(i)
}
for (let i = 1; i <= 28; i++) {
  daysP.push(i)
}
for (let i = 1; i <= 29; i++) {
  daysR.push(i)
}

Page({
  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 1,
    days: days,
    day: 1,
    year: date.getFullYear(),
    value: [115, 2, 14],
  },
  navto: function () {
    wx.navigateTo({
      url: '../mother-one/mother-one',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  bindChange: function (e) {
    const val = e.detail.value
    var mdays
    let year = this.data.years[val[0]]
    let month = this.data.months[val[1]]
    let day = this.data.days[val[2]]
    if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
      mdays = daysR
    } else {
      mdays = daysP
    }
    if (month == 4 || month == 6 || month == 9 || month == 11) {
      mdays = daysX
    } else if (month == 1 || month == 3 || month == 5 || month == 7 | month == 8 | month == 10 | month == 12) {
      mdays = daysD
    }
    this.setData({
      year,
      month,
      day,
      days: mdays
    })
    // formatTime()
    // console.log(this.data.year)
  }
})
