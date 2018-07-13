module.exports = {
  bodys() {

    return new Promise((resolve, reject) => {
      const mock = {
        "code": 200,
        userModel: '02',
        "list": [{
          "babyBirthday": "11个月27天",
          "userModel": "02"
        }, {
          "day": "2018-06-14",
          "physiologicalCycle": "03"
        }, {
            menstrualVolume:'01',
            chiropractic:'01',
            frictionalAbdomen:"01",
            userModel: '02',
          predictDay: 4,
          babyMonth: '5',
          "day": "2018-07-13",
          isPredict: '1',
          "physiologicalCycle": "03"
        }, {
          "day": "2018-06-16",
          "physiologicalCycle": "03"
        }, {
          "day": "2018-06-17",
          "physiologicalCycle": "03"
        }, {
          "day": "2018-06-18",
          "physiologicalCycle": "03"
        }, {
          "day": "2018-06-19",
          "physiologicalCycle": "04"
        }, {
          "day": "2018-06-20",
          "physiologicalCycle": "03"
        }, {
          "day": "2018-06-21",
          "physiologicalCycle": "03"
        }, {
          "day": "2018-06-22",
          "physiologicalCycle": "03"
        }],
        "msg": "SUCCESS"
      }

      resolve(mock);
    })

  }
}