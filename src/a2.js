const fs    = require('fs');
const axios = require('axios');
const csv   = require('csvtojson');
const path = require('path');

const gradesCSV = '../grades/2023/a2/final_a2_results_laba_missed.csv';
// const gradesCSV = '../grades/2023/a2/final_a2_results_labb.csv';

const parseGradesInfo = async (studentsInfo) => {
  const grades = [];
  const gradeList = await csv().fromFile(path.join(__dirname, gradesCSV));
  for (grade of gradeList)
    grades.push({
      id: grade['Canvas_ID'],
      name: grade['name'],
      partA: grade['Part_A'],
      partB: grade['Part_B'],
      partC: grade['Part_C'],
      partD: grade['Part_D'],
      comment: grade['Comments'],
      remark: grade['Remark'],
      remarks: grade['Remarks']
    })
  return grades;
}

const createGradeRequestData = (grade) => {
   return `rubric_assessment%5Buser_id%5D=${grade.id}&rubric_assessment%5Bassessment_type%5D=grading&rubric_assessment%5Bcriterion__6476%5D%5Brating_id%5D=blank&rubric_assessment%5Bcriterion__6476%5D%5Bpoints%5D=${grade.partA}&rubric_assessment%5Bcriterion__6476%5D%5Bdescription%5D=Full+Marks&rubric_assessment%5Bcriterion__6476%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__6476%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__9955%5D%5Brating_id%5D=_1452&rubric_assessment%5Bcriterion__9955%5D%5Bpoints%5D=${grade.partB}&rubric_assessment%5Bcriterion__9955%5D%5Bdescription%5D=Full+Marks&rubric_assessment%5Bcriterion__9955%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__9955%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__5022%5D%5Brating_id%5D=_7496&rubric_assessment%5Bcriterion__5022%5D%5Bpoints%5D=${grade.partC}&rubric_assessment%5Bcriterion__5022%5D%5Bdescription%5D=Full+Marks&rubric_assessment%5Bcriterion__5022%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__5022%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__9402%5D%5Brating_id%5D=_6789&rubric_assessment%5Bcriterion__9402%5D%5Bpoints%5D=${grade.partD}&rubric_assessment%5Bcriterion__9402%5D%5Bdescription%5D=Full+Marks&rubric_assessment%5Bcriterion__9402%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__9402%5D%5Bsave_comment%5D=0&graded_anonymously=false&_method=POST&authenticity_token=XGbimqC6%2BpOi1yDaTlHwM67TZbVw%2BONuhuch7LUBb31sN9qu5IqR35OtUZc%2FFt8CmoMd7yGIqwfSyGmv4E8uPg%3D%3D`;

}

// --------------------------------------------------
// Group A

const createTotalGradeRequestConfig = (grade) => {
    return {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://canvas.eee.uci.edu/courses/61774/gradebook/update_submission',
      headers: {
        "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
    "accept-language": "en-US,en;q=0.9",
    "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240313.292,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=6314a8d1305f45a2b828f13d8b549b39",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sentry-trace": "6314a8d1305f45a2b828f13d8b549b39-b466428bb649bed1-0",
    "x-csrf-token": "/NmUHEBGvx76+Non3uGJQ3OZP4963y0GQI/K44JUL/+xra12OQXmW7S3kV6zidEJMMBWvU24AkQZzbiOzjBftQ==",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=23a0537eabaf3dd15a3ca845e327c6aa; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fshib.service.uci.edu%2F%22%2C%22ts%22%3A1710539709102%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2F%22%7D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%221894419310952841%22%2C%22sessionId%22%3A%228179822860695185%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1710539709.160.1.1710539935.0.0.0; _legacy_normandy_session=3-0II7LxvVZvGOz6dV0DXw+9yfsjF3A1NkiGvGgzEpFpR0pwe5T-u2hfk6-MDEBAtvcoACYhSGgcaBHzcbfl2TB1vQdsmDuM7N9UCQbwC7SMwAeuWJKLd5XeaMaiwD_JjVfJw97jbgPm5ktWgGVKFLG6Ydsj39su4A4gavungKScVxWq7wv6VkUuvYzvz4FNRWq3Ncec4z8Y4X_QZh03IBLSq1YcBMxeBC5QmFW9FiBWChp3gen3-dm1wtTuDz2waIpMpSLtrPoW_isd0ap7UFG4Spp_P5o90lBaIWNJ5U9efYRvFZsSP0NZHnJ9tZcsHU9ffQGjzSVqSzHL1LLJXtGD1q5LP3Nefx1b4ls9Z7Uez710xBPm_xDRCY2jtAzZKYcnGBZJO_FLq-me2jMcx9gbZ4KksKPMwn1ElYP7-lDC42XoSxkKoPkRjJQsqtcIlZsrSE9HcaeSlK0Tbf_c6ReEuZz_-wVFemsw1O9SRSKc6e_GEmIvPwl_BH7MvrssHZH_LfKm1Dichu0bvpdcAfkorgakkgqJbZHgJlMMwkSlGkb7zbbB7Oksyl-AJAQmG7BDw5uHmbLIPHF7Fxnj7MKqIbZRX_iKWj-Ff26WKSRm6NaGG67dHZ65gLGJkK346OheRlcrE_-VTfX1h5Y-TrUiPxG9f7xKlqD5gWfrZe5CS9cgYDz_EZotk4fe8w6VolKYKvOA2SnJunZ9q2I7u1mLdLCjOr0m2mVumY5mvypKSh-5uXVwKNdnXC3O90trehfzozZ8wvyAueJVWBj4veS369LbqzPCt4gKw6E0R-ypT4TAhlPAlw6F_dunG6fAAzineoeHc_dPtMbQkZCdZc7.EVqjwZJEOQ5eYs0-TU6rOhPiT1Y.ZfTE9w; canvas_session=3-0II7LxvVZvGOz6dV0DXw+9yfsjF3A1NkiGvGgzEpFpR0pwe5T-u2hfk6-MDEBAtvcoACYhSGgcaBHzcbfl2TB1vQdsmDuM7N9UCQbwC7SMwAeuWJKLd5XeaMaiwD_JjVfJw97jbgPm5ktWgGVKFLG6Ydsj39su4A4gavungKScVxWq7wv6VkUuvYzvz4FNRWq3Ncec4z8Y4X_QZh03IBLSq1YcBMxeBC5QmFW9FiBWChp3gen3-dm1wtTuDz2waIpMpSLtrPoW_isd0ap7UFG4Spp_P5o90lBaIWNJ5U9efYRvFZsSP0NZHnJ9tZcsHU9ffQGjzSVqSzHL1LLJXtGD1q5LP3Nefx1b4ls9Z7Uez710xBPm_xDRCY2jtAzZKYcnGBZJO_FLq-me2jMcx9gbZ4KksKPMwn1ElYP7-lDC42XoSxkKoPkRjJQsqtcIlZsrSE9HcaeSlK0Tbf_c6ReEuZz_-wVFemsw1O9SRSKc6e_GEmIvPwl_BH7MvrssHZH_LfKm1Dichu0bvpdcAfkorgakkgqJbZHgJlMMwkSlGkb7zbbB7Oksyl-AJAQmG7BDw5uHmbLIPHF7Fxnj7MKqIbZRX_iKWj-Ff26WKSRm6NaGG67dHZ65gLGJkK346OheRlcrE_-VTfX1h5Y-TrUiPxG9f7xKlqD5gWfrZe5CS9cgYDz_EZotk4fe8w6VolKYKvOA2SnJunZ9q2I7u1mLdLCjOr0m2mVumY5mvypKSh-5uXVwKNdnXC3O90trehfzozZ8wvyAueJVWBj4veS369LbqzPCt4gKw6E0R-ypT4TAhlPAlw6F_dunG6fAAzineoeHc_dPtMbQkZCdZc7.EVqjwZJEOQ5eYs0-TU6rOhPiT1Y.ZfTE9w; _csrf_token=%2FNmUHEBGvx76%2BNon3uGJQ3OZP4963y0GQI%2FK44JUL%2F%2Bxra12OQXmW7S3kV6zidEJMMBWvU24AkQZzbiOzjBftQ%3D%3D",
    "Referer": "https://canvas.eee.uci.edu/courses/61774/gradebook/speed_grader?assignment_id=1313203&student_id=413878",
    "Referrer-Policy": "no-referrer-when-downgrade"
      },
      data : `submission%5Bassignment_id%5D=1313203&submission%5Buser_id%5D=${grade.id}&submission%5Bgraded_anonymously%5D=false&originator=speed_grader&submission%5Bgrade%5D=${parseFloat(grade.partA) + parseFloat(grade.partB) + parseFloat(grade.partC) + parseFloat(grade.partD)}&_method=POST&authenticity_token=EsWkznX39RldNzx9xIwBlqbTG%2FFBTKBG%2BUiVTzxT7zYilJz6MceeVWxNTTC1yy6nkoNjqxA86C%2BtZ90MaR2udQ%3D%3D`
    };
  }

const createGradeRequestConfig = (data) => {
    return {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://canvas.eee.uci.edu/courses/61774/rubric_associations/146209/assessments',
      headers: {
        "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240313.292,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=6314a8d1305f45a2b828f13d8b549b39",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sentry-trace": "6314a8d1305f45a2b828f13d8b549b39-a1caf31d50bddb41-0",
        "x-csrf-token": "/2VEJD/MV+Wy0M6FzPzp4gVlyG4K3/355hJyjLhGxq+yEX1ORo8OoPyfhfyhlLGoRjyhXD240ru/UADh9CK25Q==",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=23a0537eabaf3dd15a3ca845e327c6aa; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fshib.service.uci.edu%2F%22%2C%22ts%22%3A1710539709102%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2F%22%7D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%221894419310952841%22%2C%22sessionId%22%3A%228179822860695185%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1710539709.160.1.1710539935.0.0.0; _legacy_normandy_session=3-0II7LxvVZvGOz6dV0DXw+9yfsjF3A1NkiGvGgzEpFpR0pwe5T-u2hfk6-MDEBAtvcoACYhSGgcaBHzcbfl2TB1vQdsmDuM7N9UCQbwC7SMwAeuWJKLd5XeaMaiwD_JjVfJw97jbgPm5ktWgGVKFLG6Ydsj39su4A4gavungKScVxWq7wv6VkUuvYzvz4FNRWq3Ncec4z8Y4X_QZh03IBLSq1YcBMxeBC5QmFW9FiBWChp3gen3-dm1wtTuDz2waIpMpSLtrPoW_isd0ap7UFG4Spp_P5o90lBaIWNJ5U9efYRvFZsSP0NZHnJ9tZcsHU9ffQGjzSVqSzHL1LLJXtGD1q5LP3Nefx1b4ls9Z7Uez710xBPm_xDRCY2jtAzZKYcnGBZJO_FLq-me2jMcx9gbZ4KksKPMwn1ElYP7-lDC42XoSxkKoPkRjJQsqtcIlZsrSE9HcaeSlK0Tbf_c6ReEuZz_-wVFemsw1O9SRSKc6e_GEmIvPwl_BH7MvrssHZH_LfKm1Dichu0bvpdcAfkorgakkgqJbZHgJlMMwkSlGkb7zbbB7Oksyl-AJAQmG7BDw5uHmbLIPHF7Fxnj7MKqIbZRX_iKWj-Ff26WKSRm6NaGG67dHZ65gLGJkK346OheRlcrE_-VTfX1h5Y-TrUiPxG9f7xKlqD5gWfrZe5CS9cgYDz_EZotk4fe8w6VolKYKvOA2SnJunZ9q2I7u1mLdLCjOr0m2mVumY5mvypKSh-5uXVwKNdnXC3O90trehfzozZ8wvyAueJVWBj4veS369LbqzPCt4gKw6E0R-ypT4TAhlPAlw6F_dunG6fAAzineoeHc_dPtMbQkZCdZc7.EVqjwZJEOQ5eYs0-TU6rOhPiT1Y.ZfTE9w; canvas_session=3-0II7LxvVZvGOz6dV0DXw+9yfsjF3A1NkiGvGgzEpFpR0pwe5T-u2hfk6-MDEBAtvcoACYhSGgcaBHzcbfl2TB1vQdsmDuM7N9UCQbwC7SMwAeuWJKLd5XeaMaiwD_JjVfJw97jbgPm5ktWgGVKFLG6Ydsj39su4A4gavungKScVxWq7wv6VkUuvYzvz4FNRWq3Ncec4z8Y4X_QZh03IBLSq1YcBMxeBC5QmFW9FiBWChp3gen3-dm1wtTuDz2waIpMpSLtrPoW_isd0ap7UFG4Spp_P5o90lBaIWNJ5U9efYRvFZsSP0NZHnJ9tZcsHU9ffQGjzSVqSzHL1LLJXtGD1q5LP3Nefx1b4ls9Z7Uez710xBPm_xDRCY2jtAzZKYcnGBZJO_FLq-me2jMcx9gbZ4KksKPMwn1ElYP7-lDC42XoSxkKoPkRjJQsqtcIlZsrSE9HcaeSlK0Tbf_c6ReEuZz_-wVFemsw1O9SRSKc6e_GEmIvPwl_BH7MvrssHZH_LfKm1Dichu0bvpdcAfkorgakkgqJbZHgJlMMwkSlGkb7zbbB7Oksyl-AJAQmG7BDw5uHmbLIPHF7Fxnj7MKqIbZRX_iKWj-Ff26WKSRm6NaGG67dHZ65gLGJkK346OheRlcrE_-VTfX1h5Y-TrUiPxG9f7xKlqD5gWfrZe5CS9cgYDz_EZotk4fe8w6VolKYKvOA2SnJunZ9q2I7u1mLdLCjOr0m2mVumY5mvypKSh-5uXVwKNdnXC3O90trehfzozZ8wvyAueJVWBj4veS369LbqzPCt4gKw6E0R-ypT4TAhlPAlw6F_dunG6fAAzineoeHc_dPtMbQkZCdZc7.EVqjwZJEOQ5eYs0-TU6rOhPiT1Y.ZfTE9w; _csrf_token=%2F2VEJD%2FMV%2BWy0M6FzPzp4gVlyG4K3%2F355hJyjLhGxq%2ByEX1ORo8OoPyfhfyhlLGoRjyhXD240ru%2FUADh9CK25Q%3D%3D",
        "Referer": "https://canvas.eee.uci.edu/courses/61774/gradebook/speed_grader?assignment_id=1313203&student_id=413878",
        "Referrer-Policy": "no-referrer-when-downgrade"
      },
      data : data
    };
  }

//   const createCommentRequestConfig = (grade, prop) => {
//     return {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: `https://canvas.eee.uci.edu/courses/61774/assignments/1313203/submissions/${grade.id}`,
//         headers: {
//             "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
//             "accept-language": "en-US,en;q=0.9",
//             "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240228.235,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=ed4a2da9321448308eb5d7221e7fb0d9",
//             "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//             "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
//             "sec-ch-ua-mobile": "?0",
//             "sec-ch-ua-platform": "\"macOS\"",
//             "sec-fetch-dest": "empty",
//             "sec-fetch-mode": "cors",
//             "sec-fetch-site": "same-origin",
//             "sentry-trace": "ed4a2da9321448308eb5d7221e7fb0d9-828655e7c8a5fffe-0",
//             "x-csrf-token": "eTXrQiNbPVG3yFxJV+Mww3i0RhHuPqRaAiksbcTmLE5JZNN2Z2tWHYayLQQmpB/yTOQ+S79O7DNWBmQukahtDQ==",
//             "x-requested-with": "XMLHttpRequest",
//             "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=bde0f7e2d75c4160063c02cff45bd7e9; _legacy_normandy_session=1M602ZcEnTdJ1sxiVfBWqw+Kzbn0dqYMm2pB0ImN6EHwJiP36UKZzE_lmKPI_C14sD5aSuEKfC49zcKVLg4lg2HFtMR_zChNhBE9efl970g3Yhbv3SeJ4s2IJppVVxV29KUJuctZJzXXYVfKhp9M3zmEEXvdqXHkR0z-B8GmBNSQ3dVWdE_xLuJvosFQdNsHNXNdGlbyJ2qViWWIIluJ5c4LREmmT2trOBYJI758Ss-cgOv-ZRgYA0rsCNdY4-yZVtYbAz617lNHmgjWz_yCoMECW_agpooIf-F-XCn1Xei494_UMZvQ2OiuozJD0ax66_ZRnIgH4UufXZQTEj0dS--3TGEtzG-Io12MDSOqHfnNHqNWh8kBpFHK6u7BsE7jVSdrNECNNMWSK7VLjqLCa8xEp_Tc7u4kEqCITytHqhLy8H6X1vn-91xfQW-rkwP1QSb_EUDBGcVZ_KbIFasG6n9fAO6aN8W5lL90pgcmUZU-MRSNhVGrD0wglg2kmNom9s46hZF9oGvOHJ9KjxqNxvaxMsReRx4qcqSGyh_KaONs9y_fUcyNqdDYBmVfPUKDko5G4g3o64wDxaFEaP7qBCPAJmA-P9ddw_m6R3Z3-fgnA1U526SNaidzZJHWFoNuxwRq3FE6QCmw4-ooXmU59jfT8010jNdJ8VtIlB_SObU1mAc4WJ3m7Bc5ziGLiCKSUA6dEPlcS16Wvl0KYPrIZ7EHiua2TUR5A1VrEyf-C5CQbhLRVWjwNihAM6UhvxwIkj3BNRXbRV18MD28sM63_w-Fuf9yc9FHgre3KnkrkRie3Rz9OEMDMQVJHAN0hZBraqz1dm5VUCXEBOgXn3KsOo0.0MruwGqeMIIDOWZTMGuYlM43cwI.Ze_wIQ; canvas_session=1M602ZcEnTdJ1sxiVfBWqw+Kzbn0dqYMm2pB0ImN6EHwJiP36UKZzE_lmKPI_C14sD5aSuEKfC49zcKVLg4lg2HFtMR_zChNhBE9efl970g3Yhbv3SeJ4s2IJppVVxV29KUJuctZJzXXYVfKhp9M3zmEEXvdqXHkR0z-B8GmBNSQ3dVWdE_xLuJvosFQdNsHNXNdGlbyJ2qViWWIIluJ5c4LREmmT2trOBYJI758Ss-cgOv-ZRgYA0rsCNdY4-yZVtYbAz617lNHmgjWz_yCoMECW_agpooIf-F-XCn1Xei494_UMZvQ2OiuozJD0ax66_ZRnIgH4UufXZQTEj0dS--3TGEtzG-Io12MDSOqHfnNHqNWh8kBpFHK6u7BsE7jVSdrNECNNMWSK7VLjqLCa8xEp_Tc7u4kEqCITytHqhLy8H6X1vn-91xfQW-rkwP1QSb_EUDBGcVZ_KbIFasG6n9fAO6aN8W5lL90pgcmUZU-MRSNhVGrD0wglg2kmNom9s46hZF9oGvOHJ9KjxqNxvaxMsReRx4qcqSGyh_KaONs9y_fUcyNqdDYBmVfPUKDko5G4g3o64wDxaFEaP7qBCPAJmA-P9ddw_m6R3Z3-fgnA1U526SNaidzZJHWFoNuxwRq3FE6QCmw4-ooXmU59jfT8010jNdJ8VtIlB_SObU1mAc4WJ3m7Bc5ziGLiCKSUA6dEPlcS16Wvl0KYPrIZ7EHiua2TUR5A1VrEyf-C5CQbhLRVWjwNihAM6UhvxwIkj3BNRXbRV18MD28sM63_w-Fuf9yc9FHgre3KnkrkRie3Rz9OEMDMQVJHAN0hZBraqz1dm5VUCXEBOgXn3KsOo0.0MruwGqeMIIDOWZTMGuYlM43cwI.Ze_wIQ; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fcanvas.eee.uci.edu%2Fcourses%2F61775%22%2C%22ts%22%3A1710223394490%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2Fcourses%2F61775%2Fgradebook%22%7D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%224872744163137574%22%2C%22sessionId%22%3A%227810127836213768%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1710223393.162.1.1710223404.0.0.0; _csrf_token=LFhARI97UA7vL%2Bdw%2BSdMSXuI%2FeDjDdbHrE1G%2BJR575hGNRMV1Rg6X7dVjCaMEDkODcyMra1poqCVITKB9hGdrw%3D%3D",
//             "Referer": "https://canvas.eee.uci.edu/courses/61774/gradebook/speed_grader?assignment_id=1313203&student_id=409398",
//             "Referrer-Policy": "no-referrer-when-downgrade"
//         },
//         data : `submission%5Bassignment_id%5D=1313203&submission%5Bgroup_comment%5D=0&submission%5Bcomment%5D=${grade[prop]}&submission%5Bdraft_comment%5D=false&submission%5Bid%5D=409398&_method=PUT&authenticity_token=eTXrQiNbPVG3yFxJV%2BMww3i0RhHuPqRaAiksbcTmLE5JZNN2Z2tWHYayLQQmpB%2FyTOQ%2BS79O7DNWBmQukahtDQ%3D%3D`
//     }
// }


// --------------------------------------------------
// Group B

// const createTotalGradeRequestConfig = (grade) => {
//     return {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: 'https://canvas.eee.uci.edu/courses/61775/gradebook/update_submission',
//       headers: {
//         "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
//         "accept-language": "en-US,en;q=0.9",
//         "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240228.239,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=6c6bf195e7184d16bb0b0e073677d3f3",
//         "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//         "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-platform": "\"macOS\"",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         "sentry-trace": "6c6bf195e7184d16bb0b0e073677d3f3-b1ae464b863e3ab7-0",
//         "x-csrf-token": "KjyIxXBp/3prI2DSBP0IIImuiQkqPyhyT9RVdMXoO/pAUduUKgqVKzNZC4Rxyn1n/+r4RGRbXBV2uCENp4BJzQ==",
//         "x-requested-with": "XMLHttpRequest",
//         "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=bde0f7e2d75c4160063c02cff45bd7e9; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fcanvas.eee.uci.edu%2Fcourses%2F61774%22%2C%22ts%22%3A1710223530534%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2Fcourses%2F61774%2Fgradebook%22%7D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%221536955279464955%22%2C%22sessionId%22%3A%228413495038030126%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1710223393.162.1.1710223565.0.0.0; _legacy_normandy_session=gkfmriToNGpdwmbTUyE5AA+bud_H6x8it69y4_du7zIUYinY-6qc3ugDYD6unr44im5TWE6r8jFlahT06HgZhU-9yJNFNwHmZOP-Dm0mBQOe0ZvLGRkxN9Tlv4-aNSTr_nnEsZqmDh2gytutbpgfIgPlRdPh0sKfkF41u5sNyy0atPIAK_ObWNa09Py2rzbyKBZpwqKrlE1TDpDHrLNn1e7j9wvBTzlclmkdBo3v1BqCtzR_shbcQeznHx2_w-vAWv6E0ajv4RCiRnRkoP8kHL64zg5fZn2ZPK4gV8VxFdRfUk6J4U8kNWaITVby75rMIgbUDY7yjAq_OwdsjMsjcI1_6a3UvVWR6FOKAZfT6V6x7DLJlTaFjt9NRyl4A4cl1_rakwLNUuToFdVb3kzVXn7usvSYsIkoFVfEml-UKyQydNHt-j2Wjvon8oiKgFdA6gu_XbEYMzEidWhlpMz_AMSmLnSw76pzhW3phU_X52TQcVGEy-dhy_4ILPjs2fFI92TLz_kvFP2lcmwQohbQe1FMCWkzORiQmUq6cEL1tMRah2VUiCQ255dkuNcfgoXbSPCRqDLgL3xdNB4N6G2wvLaN3A4A4XephtgvTAUXdrlM7ynDNnb7X6pJD7Bk7RP-4EsvWN-c3X6y5ibAAv6G83qguSFv-daa31WfYS3097Dm-wxA3TmJ_PSRkpjtShMpdIXBSsqq58Q3-3iU0H9IwIGEiFLkFKp63b4czKTsqEr8jQqtQicOaLyDKdxFmB4Jz_ffYQUDAUEGNYvFP0Gcvhb-t_kJrarUXaCcAmaFyErheUTpQXAp6DaAlL75M53OVj_OC4QnkrHozmTm6kB7JnG.Ca2g38RI0lkgmxsB_4Rrfm4ffak.Ze_xXg; canvas_session=gkfmriToNGpdwmbTUyE5AA+bud_H6x8it69y4_du7zIUYinY-6qc3ugDYD6unr44im5TWE6r8jFlahT06HgZhU-9yJNFNwHmZOP-Dm0mBQOe0ZvLGRkxN9Tlv4-aNSTr_nnEsZqmDh2gytutbpgfIgPlRdPh0sKfkF41u5sNyy0atPIAK_ObWNa09Py2rzbyKBZpwqKrlE1TDpDHrLNn1e7j9wvBTzlclmkdBo3v1BqCtzR_shbcQeznHx2_w-vAWv6E0ajv4RCiRnRkoP8kHL64zg5fZn2ZPK4gV8VxFdRfUk6J4U8kNWaITVby75rMIgbUDY7yjAq_OwdsjMsjcI1_6a3UvVWR6FOKAZfT6V6x7DLJlTaFjt9NRyl4A4cl1_rakwLNUuToFdVb3kzVXn7usvSYsIkoFVfEml-UKyQydNHt-j2Wjvon8oiKgFdA6gu_XbEYMzEidWhlpMz_AMSmLnSw76pzhW3phU_X52TQcVGEy-dhy_4ILPjs2fFI92TLz_kvFP2lcmwQohbQe1FMCWkzORiQmUq6cEL1tMRah2VUiCQ255dkuNcfgoXbSPCRqDLgL3xdNB4N6G2wvLaN3A4A4XephtgvTAUXdrlM7ynDNnb7X6pJD7Bk7RP-4EsvWN-c3X6y5ibAAv6G83qguSFv-daa31WfYS3097Dm-wxA3TmJ_PSRkpjtShMpdIXBSsqq58Q3-3iU0H9IwIGEiFLkFKp63b4czKTsqEr8jQqtQicOaLyDKdxFmB4Jz_ffYQUDAUEGNYvFP0Gcvhb-t_kJrarUXaCcAmaFyErheUTpQXAp6DaAlL75M53OVj_OC4QnkrHozmTm6kB7JnG.Ca2g38RI0lkgmxsB_4Rrfm4ffak.Ze_xXg; _csrf_token=KjyIxXBp%2F3prI2DSBP0IIImuiQkqPyhyT9RVdMXoO%2FpAUduUKgqVKzNZC4Rxyn1n%2F%2Br4RGRbXBV2uCENp4BJzQ%3D%3D",
//         "Referer": "https://canvas.eee.uci.edu/courses/61775/gradebook/speed_grader?assignment_id=1313250&student_id=410808",
//         "Referrer-Policy": "no-referrer-when-downgrade"
//       },
//       data : `submission%5Bassignment_id%5D=1313250&submission%5Buser_id%5D=${grade.id}&submission%5Bgraded_anonymously%5D=false&originator=speed_grader&submission%5Bgrade%5D=${parseFloat(grade.partA) + parseFloat(grade.partB) + parseFloat(grade.partC) + parseFloat(grade.partD)}&_method=POST&authenticity_token=SeQW8v7oVRNYrvJeNFyb%2FoqzGrTGGh7%2FZtPKDi%2BYwu55tS7Gutg%2BX2nUgxNFG7TPvuNi7pdqVpYy%2FIJNetaDrQ%3D%3D`
//     };
//   }

//   const createGradeRequestConfig = (data) => {
//     return {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: 'https://canvas.eee.uci.edu/courses/61775/rubric_associations/146235/assessments',
//       headers: {
//           "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
//           "accept-language": "en-US,en;q=0.9",
//           "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240228.239,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=6c6bf195e7184d16bb0b0e073677d3f3",
//           "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//           "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
//           "sec-ch-ua-mobile": "?0",
//           "sec-ch-ua-platform": "\"macOS\"",
//           "sec-fetch-dest": "empty",
//           "sec-fetch-mode": "cors",
//           "sec-fetch-site": "same-origin",
//           "sentry-trace": "6c6bf195e7184d16bb0b0e073677d3f3-929b078506b4cd19-0",
//           "x-csrf-token": "XJulKSLRp/ZcWFJRK3TTtK3bHVyA9oY36R1ImU27HXc29vZ4eLLNpwQiOQdeQ6bz259sEc6S8lDQcTzgL9NvQA==",
//           "x-requested-with": "XMLHttpRequest",
//           "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=bde0f7e2d75c4160063c02cff45bd7e9; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fcanvas.eee.uci.edu%2Fcourses%2F61774%22%2C%22ts%22%3A1710223530534%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2Fcourses%2F61774%2Fgradebook%22%7D; _legacy_normandy_session=gkfmriToNGpdwmbTUyE5AA+bud_H6x8it69y4_du7zIUYinY-6qc3ugDYD6unr44im5TWE6r8jFlahT06HgZhU-9yJNFNwHmZOP-Dm0mBQOe0ZvLGRkxN9Tlv4-aNSTr_nnEsZqmDh2gytutbpgfIgPlRdPh0sKfkF41u5sNyy0atPIAK_ObWNa09Py2rzbyKBZpwqKrlE1TDpDHrLNn1e7j9wvBTzlclmkdBo3v1BqCtzR_shbcQeznHx2_w-vAWv6E0ajv4RCiRnRkoP8kHL64zg5fZn2ZPK4gV8VxFdRfUk6J4U8kNWaITVby75rMIgbUDY7yjAq_OwdsjMsjcI1_6a3UvVWR6FOKAZfT6V6x7DLJlTaFjt9NRyl4A4cl1_rakwLNUuToFdVb3kzVXn7usvSYsIkoFVfEml-UKyQydNHt-j2Wjvon8oiKgFdA6gu_XbEYMzEidWhlpMz_AMSmLnSw76pzhW3phU_X52TQcVGEy-dhy_4ILPjs2fFI92TLz_kvFP2lcmwQohbQe1FMCWkzORiQmUq6cEL1tMRah2VUiCQ255dkuNcfgoXbSPCRqDLgL3xdNB4N6G2wvLaN3A4A4XephtgvTAUXdrlM7ynDNnb7X6pJD7Bk7RP-4EsvWN-c3X6y5ibAAv6G83qguSFv-daa31WfYS3097Dm-wxA3TmJ_PSRkpjtShMpdIXBSsqq58Q3-3iU0H9IwIGEiFLkFKp63b4czKTsqEr8jQqtQicOaLyDKdxFmB4Jz_ffYQUDAUEGNYvFP0Gcvhb-t_kJrarUXaCcAmaFyErheUTpQXAp6DaAlL75M53OVj_OC4QnkrHozmTm6kB7JnG.Ca2g38RI0lkgmxsB_4Rrfm4ffak.Ze_xXg; canvas_session=gkfmriToNGpdwmbTUyE5AA+bud_H6x8it69y4_du7zIUYinY-6qc3ugDYD6unr44im5TWE6r8jFlahT06HgZhU-9yJNFNwHmZOP-Dm0mBQOe0ZvLGRkxN9Tlv4-aNSTr_nnEsZqmDh2gytutbpgfIgPlRdPh0sKfkF41u5sNyy0atPIAK_ObWNa09Py2rzbyKBZpwqKrlE1TDpDHrLNn1e7j9wvBTzlclmkdBo3v1BqCtzR_shbcQeznHx2_w-vAWv6E0ajv4RCiRnRkoP8kHL64zg5fZn2ZPK4gV8VxFdRfUk6J4U8kNWaITVby75rMIgbUDY7yjAq_OwdsjMsjcI1_6a3UvVWR6FOKAZfT6V6x7DLJlTaFjt9NRyl4A4cl1_rakwLNUuToFdVb3kzVXn7usvSYsIkoFVfEml-UKyQydNHt-j2Wjvon8oiKgFdA6gu_XbEYMzEidWhlpMz_AMSmLnSw76pzhW3phU_X52TQcVGEy-dhy_4ILPjs2fFI92TLz_kvFP2lcmwQohbQe1FMCWkzORiQmUq6cEL1tMRah2VUiCQ255dkuNcfgoXbSPCRqDLgL3xdNB4N6G2wvLaN3A4A4XephtgvTAUXdrlM7ynDNnb7X6pJD7Bk7RP-4EsvWN-c3X6y5ibAAv6G83qguSFv-daa31WfYS3097Dm-wxA3TmJ_PSRkpjtShMpdIXBSsqq58Q3-3iU0H9IwIGEiFLkFKp63b4czKTsqEr8jQqtQicOaLyDKdxFmB4Jz_ffYQUDAUEGNYvFP0Gcvhb-t_kJrarUXaCcAmaFyErheUTpQXAp6DaAlL75M53OVj_OC4QnkrHozmTm6kB7JnG.Ca2g38RI0lkgmxsB_4Rrfm4ffak.Ze_xXg; _csrf_token=XJulKSLRp%2FZcWFJRK3TTtK3bHVyA9oY36R1ImU27HXc29vZ4eLLNpwQiOQdeQ6bz259sEc6S8lDQcTzgL9NvQA%3D%3D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%223172483612845918%22%2C%22sessionId%22%3A%228413495038030126%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1710223393.162.1.1710223734.0.0.0",
//           "Referer": "https://canvas.eee.uci.edu/courses/61775/gradebook/speed_grader?assignment_id=1313250&student_id=410808",
//           "Referrer-Policy": "no-referrer-when-downgrade"
//       },
//       data : data
//     };
//    }

//    const createCommentRequestConfig = (grade, prop) => {
//     return {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: `https://canvas.eee.uci.edu/courses/61775/assignments/1313250/submissions/${grade.id}`,
//         headers: {
//             "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
//             "accept-language": "en-US,en;q=0.9",
//             "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240228.235,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=34c8b1f9580b46cc963edb9d7f5d4fc2",
//             "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//             "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
//             "sec-ch-ua-mobile": "?0",
//             "sec-ch-ua-platform": "\"macOS\"",
//             "sec-fetch-dest": "empty",
//             "sec-fetch-mode": "cors",
//             "sec-fetch-site": "same-origin",
//             "sentry-trace": "34c8b1f9580b46cc963edb9d7f5d4fc2-9e94b2c874437084-0",
//             "x-csrf-token": "B7KF2Gi5uu3BuWQKYXKlP7oSGztkZduxYJBE/G5BLfU3473sLInRofDDFUcQNYoOjkJjYTUVk9g0vwy/Ow9stg==",
//             "x-requested-with": "XMLHttpRequest",
//             "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _gcl_au=1.1.474824460.1702326069; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=297870da8d65f1deba7d92c9f5ebffa8; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fcanvas.eee.uci.edu%2Fabout%2F384847%22%2C%22ts%22%3A1709600623099%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2F%22%7D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%223816350060812641%22%2C%22sessionId%22%3A%224320041524996058%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1709598898.155.1.1709600668.0.0.0; _csrf_token=B7KF2Gi5uu3BuWQKYXKlP7oSGztkZduxYJBE%2FG5BLfU3473sLInRofDDFUcQNYoOjkJjYTUVk9g0vwy%2FOw9stg%3D%3D; _legacy_normandy_session=ViR7FJxaUXzzvFPp0sn9mA+7IUb5gXjHiZ6pVmCOw6qQzaRzGca8HMkSbK6kQ39oGS2OOesq2LgZthpqwBPVPNaL7XEG0Gecw6KgBlB1-LooRXfRsdFThjjGwVXHgZNDw7xZAN2eStuKTnMxPhe23gNN6fKvLe-ZF8V3zw9umyFBvElKtnEoLMxPhn_cERJhEXCyf3U-gZPyt47vDyQQgAmhpy-BJZIYVYLW-5b_wrmIQ2_FfxcY8de_D5pz6nN_FfBaFoWjj16wgxhOh-LH8s8cpCPYeRODNxAsFOlFFST_z3IjXDqvMngN82B7mbfIGFZwmVvxxf2p0SxNv9nKOL7kqNZ23aq5a3Y2F78ofdgqNqyQnqi7aYb7dnAkPJwDvs3BCBtZPxKcn-rWL2a3TthZd2cpBai5CpEVBDNRCmmlpLGm1i5NOhdo7PGnmfy2waDt0YKdHBnzn7uI2GhiXX-roCq-rv4zpKIK7A7OcMa3JAVwg7RAb69iWfeCS8u3YLX0RgYCMZsepDnZaK-xLjG3RYbUsjGrb_JprKDhUsnn8hiOtDp1TrMVo4gJK9EuUGWbha5sB_gn-s_2UsP9D-AoiTLTYWmDqYBvIhVqQu7eqnuQStYQ7TmJCKawaRdnADTW9X3HVNDdGqWsqlcD3SggjI-p4kaNhL2LIdvpC6ePQxfWPqSh9e_eOh4RM0KIAXGF9RaU0avRyPoY9Xk8uZb6rtGpEVwAP13T-6DWEU3OAMK771U0M0di1AFteg9c6s-_DKSP3ek69oKWJQ5eL2U0SrsRFe_TU4Fr90rQtKVzKRD_6YW8IpihO9l8TlQgQid0jdfIcqVH74MEM4d6PhX.w9gUJbcFz7kdrw4wf8qZLT7KWOw.ZeZwJQ; canvas_session=ViR7FJxaUXzzvFPp0sn9mA+7IUb5gXjHiZ6pVmCOw6qQzaRzGca8HMkSbK6kQ39oGS2OOesq2LgZthpqwBPVPNaL7XEG0Gecw6KgBlB1-LooRXfRsdFThjjGwVXHgZNDw7xZAN2eStuKTnMxPhe23gNN6fKvLe-ZF8V3zw9umyFBvElKtnEoLMxPhn_cERJhEXCyf3U-gZPyt47vDyQQgAmhpy-BJZIYVYLW-5b_wrmIQ2_FfxcY8de_D5pz6nN_FfBaFoWjj16wgxhOh-LH8s8cpCPYeRODNxAsFOlFFST_z3IjXDqvMngN82B7mbfIGFZwmVvxxf2p0SxNv9nKOL7kqNZ23aq5a3Y2F78ofdgqNqyQnqi7aYb7dnAkPJwDvs3BCBtZPxKcn-rWL2a3TthZd2cpBai5CpEVBDNRCmmlpLGm1i5NOhdo7PGnmfy2waDt0YKdHBnzn7uI2GhiXX-roCq-rv4zpKIK7A7OcMa3JAVwg7RAb69iWfeCS8u3YLX0RgYCMZsepDnZaK-xLjG3RYbUsjGrb_JprKDhUsnn8hiOtDp1TrMVo4gJK9EuUGWbha5sB_gn-s_2UsP9D-AoiTLTYWmDqYBvIhVqQu7eqnuQStYQ7TmJCKawaRdnADTW9X3HVNDdGqWsqlcD3SggjI-p4kaNhL2LIdvpC6ePQxfWPqSh9e_eOh4RM0KIAXGF9RaU0avRyPoY9Xk8uZb6rtGpEVwAP13T-6DWEU3OAMK771U0M0di1AFteg9c6s-_DKSP3ek69oKWJQ5eL2U0SrsRFe_TU4Fr90rQtKVzKRD_6YW8IpihO9l8TlQgQid0jdfIcqVH74MEM4d6PhX.w9gUJbcFz7kdrw4wf8qZLT7KWOw.ZeZwJQ",
//             "Referer": "https://canvas.eee.uci.edu/courses/61775/gradebook/speed_grader?assignment_id=1313250&student_id=410808",
//             "Referrer-Policy": "no-referrer-when-downgrade"
//         },
//         data : `submission%5Bassignment_id%5D=1313250&submission%5Bgroup_comment%5D=0&submission%5Bcomment%5D=${grade[prop]}&submission%5Bdraft_comment%5D=false&submission%5Bid%5D=${grade.id}&_method=PUT&authenticity_token=zBSiZ39G9239B%2BN7yYNgQc1wYc1dviEJgy3FO439P%2FL5WOhUTSWbIctvrw675DMG%2FQY2izLaYmToHOpKwZgItw%3D%3D`
//     }
// }
// --------------------------------------------------


(async () => {
  const grades = await parseGradesInfo();
  let counter = 1;
  for (grade of grades) {
    const data = createGradeRequestData(grade);
    const config = createGradeRequestConfig(data);

    const totalGradeConfig = createTotalGradeRequestConfig(grade);


    
    // const commentConfig_1 = createCommentRequestConfig(grade, 'comment');
    // const commentConfig_2 = createCommentRequestConfig(grade, 'remark');
    // const commentConfig_3 = createCommentRequestConfig(grade, 'remarks');
    

    try {
      const response = await axios(config);
      const totalGradeResponse = await axios(totalGradeConfig);
      
      console.log(`${counter}) SUCCESS ${grade.id} ${grade.name}`);

    //   try {
    //     const commentResponse_1 = await axios(commentConfig_1);
    //     const commentResponse_3 = await axios(commentConfig_3);
    //     const commentResponse_2 = await axios(commentConfig_2);

    //     console.log(`${counter}) COMMENT_SUCCESS ${grade.id} ${grade.name}`);
    //   } catch (e) {
    //     console.log(`${counter}) COMMENT_FAILURE ${grade.id} ${grade.name}`);
    //     console.log(grade.comment);
    //     console.log('----------------------');
    //   }
    
    } catch (e) {
      console.log(`${counter}) FAILURE ${grade.id} ${grade.name}`);
      // console.log(grade);
      console.log(e);
      console.log('----------------------');
    }

    counter++;
  }
})()