module.exports = {
  bodys() {

    return new Promise((resolve, reject) => {
      const mock = {
        "code": 200,
        userModel: '02',
        "list": [{
          "babyBirthday": "11个月27天",
          "userModel": "02",
         "day": "2018-07-11",
        }, {
            menstrualVolume: '01',
            chiropractic: '01',
            frictionalAbdomen: "01",
            userModel: '02',
            predictDay: 4,
            "physiologicalCycle": "02",
            babyMonth: '5',
            "day": "2018-07-12",
            menstrualStatus: '01',
            isPredict: '1',
            "physiologicalCycle": "02"
        }, {
           menstrualVolume:'01',
           chiropractic:'01',
           frictionalAbdomen:"01",
           userModel: '02',
          predictDay: 4,
          "physiologicalCycle": "02",
          babyMonth: '5',
          "day": "2018-07-14",
          menstrualStatus:'01',
          isPredict: '0',
          "physiologicalCycle": "02"
        }, {
            menstrualVolume: '01',
            chiropractic: '01',
            frictionalAbdomen: "01",
            userModel: '02',
            predictDay: 4,
            "physiologicalCycle": "02",
            babyMonth: '5',
            "day": "2018-07-15",
            menstrualStatus: '01',
            isPredict: '0',
            "physiologicalCycle": "02"
        }, {
            menstrualVolume: '01',
            chiropractic: '01',
            frictionalAbdomen: "01",
            userModel: '02',
            predictDay: 4,
            "physiologicalCycle": "04",
            babyMonth: '5',
            "day": "2018-07-16",
            menstrualStatus: '01',
            isPredict: '0',
          
        }, {
          "day": "2018-06-18",
          "physiologicalCycle": "03"
        }, {
          "day": "2018-06-19",
          "physiologicalCycle": "04"
        }, {
          "day": "2018-06-20",
          "physiologicalCycle": "03",
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