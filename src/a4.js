const fs    = require('fs');
const axios = require('axios');
const csv   = require('csvtojson');
const path = require('path');

// const gradesCSV = '../grades/2023/a4/a4_score_laba.csv';
const gradesCSV = '../grades/2023/a4/a4_score_labb.csv';

const parseGradesInfo = async (studentsInfo) => {
  const grades = [];
  const gradeList = await csv().fromFile(path.join(__dirname, gradesCSV));
  for (grade of gradeList)
    grades.push({
      id: grade['canvasID'],
      name: grade['name'],
      partA: grade['A4 Total Score'],
      partB: grade['Total Style Points'],
      grader: `Grader of the assignment: Autograder`,
      remarks: `Autograder logs: \n ${grade['Remarks']}`
    })
  return grades;
}

const createGradeRequestData = (grade) => {
    return `rubric_assessment%5Buser_id%5D=${grade.id}&rubric_assessment%5Bassessment_type%5D=grading&rubric_assessment%5Bcriterion__512%5D%5Brating_id%5D=blank&rubric_assessment%5Bcriterion__512%5D%5Bpoints%5D=${grade.partA}&rubric_assessment%5Bcriterion__512%5D%5Bdescription%5D=Full+Marks&rubric_assessment%5Bcriterion__512%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__512%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__3213%5D%5Brating_id%5D=_8856&rubric_assessment%5Bcriterion__3213%5D%5Bpoints%5D=${grade.partB}&rubric_assessment%5Bcriterion__3213%5D%5Bdescription%5D=Full+Marks&rubric_assessment%5Bcriterion__3213%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__3213%5D%5Bsave_comment%5D=0&graded_anonymously=false&_method=POST&authenticity_token=KyB3vkgvxYffSWtLuwsGwuphZbz6hBM88A6XNYppvGhRZRzWK1%2BR6awwBgP9W1KYjgxc9ZPKXlGxR%2FN48F%2FfRw%3D%3D`
}

// --------------------------------------------------
// Group A

// const createTotalGradeRequestConfig = (grade) => {
//     return {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: 'https://canvas.eee.uci.edu/courses/61774/gradebook/update_submission',
//       headers: {
//         "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
//     "accept-language": "en-US,en;q=0.9",
//     "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240313.292,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=6314a8d1305f45a2b828f13d8b549b39",
//     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//     "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "sentry-trace": "6314a8d1305f45a2b828f13d8b549b39-b466428bb649bed1-0",
//     "x-csrf-token": "/NmUHEBGvx76+Non3uGJQ3OZP4963y0GQI/K44JUL/+xra12OQXmW7S3kV6zidEJMMBWvU24AkQZzbiOzjBftQ==",
//     "x-requested-with": "XMLHttpRequest",
//     "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=23a0537eabaf3dd15a3ca845e327c6aa; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fshib.service.uci.edu%2F%22%2C%22ts%22%3A1710539709102%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2F%22%7D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%221894419310952841%22%2C%22sessionId%22%3A%228179822860695185%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1710539709.160.1.1710539935.0.0.0; _legacy_normandy_session=3-0II7LxvVZvGOz6dV0DXw+9yfsjF3A1NkiGvGgzEpFpR0pwe5T-u2hfk6-MDEBAtvcoACYhSGgcaBHzcbfl2TB1vQdsmDuM7N9UCQbwC7SMwAeuWJKLd5XeaMaiwD_JjVfJw97jbgPm5ktWgGVKFLG6Ydsj39su4A4gavungKScVxWq7wv6VkUuvYzvz4FNRWq3Ncec4z8Y4X_QZh03IBLSq1YcBMxeBC5QmFW9FiBWChp3gen3-dm1wtTuDz2waIpMpSLtrPoW_isd0ap7UFG4Spp_P5o90lBaIWNJ5U9efYRvFZsSP0NZHnJ9tZcsHU9ffQGjzSVqSzHL1LLJXtGD1q5LP3Nefx1b4ls9Z7Uez710xBPm_xDRCY2jtAzZKYcnGBZJO_FLq-me2jMcx9gbZ4KksKPMwn1ElYP7-lDC42XoSxkKoPkRjJQsqtcIlZsrSE9HcaeSlK0Tbf_c6ReEuZz_-wVFemsw1O9SRSKc6e_GEmIvPwl_BH7MvrssHZH_LfKm1Dichu0bvpdcAfkorgakkgqJbZHgJlMMwkSlGkb7zbbB7Oksyl-AJAQmG7BDw5uHmbLIPHF7Fxnj7MKqIbZRX_iKWj-Ff26WKSRm6NaGG67dHZ65gLGJkK346OheRlcrE_-VTfX1h5Y-TrUiPxG9f7xKlqD5gWfrZe5CS9cgYDz_EZotk4fe8w6VolKYKvOA2SnJunZ9q2I7u1mLdLCjOr0m2mVumY5mvypKSh-5uXVwKNdnXC3O90trehfzozZ8wvyAueJVWBj4veS369LbqzPCt4gKw6E0R-ypT4TAhlPAlw6F_dunG6fAAzineoeHc_dPtMbQkZCdZc7.EVqjwZJEOQ5eYs0-TU6rOhPiT1Y.ZfTE9w; canvas_session=3-0II7LxvVZvGOz6dV0DXw+9yfsjF3A1NkiGvGgzEpFpR0pwe5T-u2hfk6-MDEBAtvcoACYhSGgcaBHzcbfl2TB1vQdsmDuM7N9UCQbwC7SMwAeuWJKLd5XeaMaiwD_JjVfJw97jbgPm5ktWgGVKFLG6Ydsj39su4A4gavungKScVxWq7wv6VkUuvYzvz4FNRWq3Ncec4z8Y4X_QZh03IBLSq1YcBMxeBC5QmFW9FiBWChp3gen3-dm1wtTuDz2waIpMpSLtrPoW_isd0ap7UFG4Spp_P5o90lBaIWNJ5U9efYRvFZsSP0NZHnJ9tZcsHU9ffQGjzSVqSzHL1LLJXtGD1q5LP3Nefx1b4ls9Z7Uez710xBPm_xDRCY2jtAzZKYcnGBZJO_FLq-me2jMcx9gbZ4KksKPMwn1ElYP7-lDC42XoSxkKoPkRjJQsqtcIlZsrSE9HcaeSlK0Tbf_c6ReEuZz_-wVFemsw1O9SRSKc6e_GEmIvPwl_BH7MvrssHZH_LfKm1Dichu0bvpdcAfkorgakkgqJbZHgJlMMwkSlGkb7zbbB7Oksyl-AJAQmG7BDw5uHmbLIPHF7Fxnj7MKqIbZRX_iKWj-Ff26WKSRm6NaGG67dHZ65gLGJkK346OheRlcrE_-VTfX1h5Y-TrUiPxG9f7xKlqD5gWfrZe5CS9cgYDz_EZotk4fe8w6VolKYKvOA2SnJunZ9q2I7u1mLdLCjOr0m2mVumY5mvypKSh-5uXVwKNdnXC3O90trehfzozZ8wvyAueJVWBj4veS369LbqzPCt4gKw6E0R-ypT4TAhlPAlw6F_dunG6fAAzineoeHc_dPtMbQkZCdZc7.EVqjwZJEOQ5eYs0-TU6rOhPiT1Y.ZfTE9w; _csrf_token=%2FNmUHEBGvx76%2BNon3uGJQ3OZP4963y0GQI%2FK44JUL%2F%2Bxra12OQXmW7S3kV6zidEJMMBWvU24AkQZzbiOzjBftQ%3D%3D",
//     "Referer": "https://canvas.eee.uci.edu/courses/61774/gradebook/speed_grader?assignment_id=1313203&student_id=413878",
//     "Referrer-Policy": "no-referrer-when-downgrade"
//       },
//       data : `submission%5Bassignment_id%5D=1313203&submission%5Buser_id%5D=${grade.id}&submission%5Bgraded_anonymously%5D=false&originator=speed_grader&submission%5Bgrade%5D=${parseFloat(grade.partA) + parseFloat(grade.partB) + parseFloat(grade.partC) + parseFloat(grade.partD)}&_method=POST&authenticity_token=EsWkznX39RldNzx9xIwBlqbTG%2FFBTKBG%2BUiVTzxT7zYilJz6MceeVWxNTTC1yy6nkoNjqxA86C%2BtZ90MaR2udQ%3D%3D`
//     };
//   }


// const createGradeRequestConfig = (data) => {
//     return {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: 'https://canvas.eee.uci.edu/courses/61774/rubric_associations/146211/assessments',
//       headers: {
//         "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
//         "accept-language": "en-US,en;q=0.9",
//         "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240313.293,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=407b11c07f3547eaacbd1733fbdb0a5e",
//         "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//         "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-platform": "\"macOS\"",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         "sentry-trace": "407b11c07f3547eaacbd1733fbdb0a5e-9e1ec1783c98fa2c-0",
//         "x-csrf-token": "KyB3vkgvxYffSWtLuwsGwuphZbz6hBM88A6XNYppvGhRZRzWK1+R6awwBgP9W1KYjgxc9ZPKXlGxR/N48F/fRw==",
//         "x-requested-with": "XMLHttpRequest",
//         "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=e4c8c51cc7b2f0a81efe12a2d0fbc9e7; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fshib.service.uci.edu%2F%22%2C%22ts%22%3A1710800829247%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2F%22%7D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%22330189044574005%22%2C%22sessionId%22%3A%224745172712684673%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1710800829.164.1.1710803943.0.0.0; _legacy_normandy_session=k3o1EnJpXVDEM9E8K_Sp3g+b7436RK2ceGDUfDoDb88SrdRmjHna6MYGpueQD_erpcgar1FkHw0XXvHidWTa0W1qfsttfUbEOdKtVfNIkCDQ7Lh2TSs4sQ48Y2PBFKRTbGEtAv1035wg7Gu_yVifiN1C3yUnbvrwz6v5-7VRruj8fE0yQfkg82Lfzma9qogFmdjGBO3CwgzFiwa0gmShk1zmbNCGkGddr9P1F-uAEIo02jEz9onvRavB3V2e82-LojQM8Ox1VoZkxSkrRLDiMoaZ4XQ-aQGQ8QD1qDWVbE8khdWx0F-0x1A0iUFKYvc6P3zvu3Z1FqOqJzgtP8ZHFKOutijLbSLdXrQfMTbi9RyXZ_jRmBx-HG70dBxT5cFRJxH7nT93IQss9un-FdKDizyoMY1NCRBdtPTJzC0o8DlFxU5JnYOfRUOFZ7UgKrhQNihTSWt9Z_Myjb_PQRE_wNCOM0Oyu3xgpOXttElgdviNiF7nmaljaZOsU0htuNdwWBohl66fNmTjd8j0Yuw-0lFftH6jTJxJg4eoaynGnWUSk8no24eQzj0FTkwDik_m2M2byx2JcbXrO-fZb9NncFa_4GxJxZjleu2L4BUazBYgvd1UENnHvNL5m8sM7Ln573VaGEz8dB6ZJBtkWt-kWivsWnx5MCBHvyGcC2AIXLu5AWjIVixZkFiu-AiifiQsBEmq79VuqhQprjnuqeBKjQzqCO1LZvfsMU8dzFo8CYm7p73M-HgzSaNrjQT7cVCzWCBafFycXKdP6mqEc-CCBkM1OgLhdPcd6KzTmAvFLHvxD10PyeT6udyiV7ZEWHxoCxCDod8UapQe9YTNz_9goeh.u_yTmkCJM3yelv3iDJXrdW43YL0.ZfjOsA; canvas_session=k3o1EnJpXVDEM9E8K_Sp3g+b7436RK2ceGDUfDoDb88SrdRmjHna6MYGpueQD_erpcgar1FkHw0XXvHidWTa0W1qfsttfUbEOdKtVfNIkCDQ7Lh2TSs4sQ48Y2PBFKRTbGEtAv1035wg7Gu_yVifiN1C3yUnbvrwz6v5-7VRruj8fE0yQfkg82Lfzma9qogFmdjGBO3CwgzFiwa0gmShk1zmbNCGkGddr9P1F-uAEIo02jEz9onvRavB3V2e82-LojQM8Ox1VoZkxSkrRLDiMoaZ4XQ-aQGQ8QD1qDWVbE8khdWx0F-0x1A0iUFKYvc6P3zvu3Z1FqOqJzgtP8ZHFKOutijLbSLdXrQfMTbi9RyXZ_jRmBx-HG70dBxT5cFRJxH7nT93IQss9un-FdKDizyoMY1NCRBdtPTJzC0o8DlFxU5JnYOfRUOFZ7UgKrhQNihTSWt9Z_Myjb_PQRE_wNCOM0Oyu3xgpOXttElgdviNiF7nmaljaZOsU0htuNdwWBohl66fNmTjd8j0Yuw-0lFftH6jTJxJg4eoaynGnWUSk8no24eQzj0FTkwDik_m2M2byx2JcbXrO-fZb9NncFa_4GxJxZjleu2L4BUazBYgvd1UENnHvNL5m8sM7Ln573VaGEz8dB6ZJBtkWt-kWivsWnx5MCBHvyGcC2AIXLu5AWjIVixZkFiu-AiifiQsBEmq79VuqhQprjnuqeBKjQzqCO1LZvfsMU8dzFo8CYm7p73M-HgzSaNrjQT7cVCzWCBafFycXKdP6mqEc-CCBkM1OgLhdPcd6KzTmAvFLHvxD10PyeT6udyiV7ZEWHxoCxCDod8UapQe9YTNz_9goeh.u_yTmkCJM3yelv3iDJXrdW43YL0.ZfjOsA; _csrf_token=KyB3vkgvxYffSWtLuwsGwuphZbz6hBM88A6XNYppvGhRZRzWK1%2BR6awwBgP9W1KYjgxc9ZPKXlGxR%2FN48F%2FfRw%3D%3D",
//         "Referer": "https://canvas.eee.uci.edu/courses/61774/gradebook/speed_grader?assignment_id=1313205&student_id=409398",
//         "Referrer-Policy": "no-referrer-when-downgrade"
//       },
//       data : data
//     };
// }

// const createCommentRequestConfig = (grade, prop) => {
//     return {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: `https://canvas.eee.uci.edu/courses/61774/assignments/1313205/submissions/${grade.id}`,
//         headers: {
//             "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
//             "accept-language": "en-US,en;q=0.9",
//             "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240313.293,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=407b11c07f3547eaacbd1733fbdb0a5e",
//             "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//             "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
//             "sec-ch-ua-mobile": "?0",
//             "sec-ch-ua-platform": "\"macOS\"",
//             "sec-fetch-dest": "empty",
//             "sec-fetch-mode": "cors",
//             "sec-fetch-site": "same-origin",
//             "sentry-trace": "407b11c07f3547eaacbd1733fbdb0a5e-92a5cc856fb732e7-0",
//             "x-csrf-token": "6FXDFBcHuxSGVYhrmorywWPvJuj2Fq2VtqvMjHQ/BW+SEKh8dHfvevUs5SPc2qabB4IfoZ9Y4Pj34qjBDglmQA==",
//             "x-requested-with": "XMLHttpRequest",
//             "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=e4c8c51cc7b2f0a81efe12a2d0fbc9e7; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fshib.service.uci.edu%2F%22%2C%22ts%22%3A1710800829247%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2F%22%7D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%22330189044574005%22%2C%22sessionId%22%3A%224745172712684673%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1710800829.164.1.1710803943.0.0.0; _legacy_normandy_session=k3o1EnJpXVDEM9E8K_Sp3g+b7436RK2ceGDUfDoDb88SrdRmjHna6MYGpueQD_erpcgar1FkHw0XXvHidWTa0W1qfsttfUbEOdKtVfNIkCDQ7Lh2TSs4sQ48Y2PBFKRTbGEtAv1035wg7Gu_yVifiN1C3yUnbvrwz6v5-7VRruj8fE0yQfkg82Lfzma9qogFmdjGBO3CwgzFiwa0gmShk1zmbNCGkGddr9P1F-uAEIo02jEz9onvRavB3V2e82-LojQM8Ox1VoZkxSkrRLDiMoaZ4XQ-aQGQ8QD1qDWVbE8khdWx0F-0x1A0iUFKYvc6P3zvu3Z1FqOqJzgtP8ZHFKOutijLbSLdXrQfMTbi9RyXZ_jRmBx-HG70dBxT5cFRJxH7nT93IQss9un-FdKDizyoMY1NCRBdtPTJzC0o8DlFxU5JnYOfRUOFZ7UgKrhQNihTSWt9Z_Myjb_PQRE_wNCOM0Oyu3xgpOXttElgdviNiF7nmaljaZOsU0htuNdwWBohl66fNmTjd8j0Yuw-0lFftH6jTJxJg4eoaynGnWUSk8no24eQzj0FTkwDik_m2M2byx2JcbXrO-fZb9NncFa_4GxJxZjleu2L4BUazBYgvd1UENnHvNL5m8sM7Ln573VaGEz8dB6ZJBtkWt-kWivsWnx5MCBHvyGcC2AIXLu5AWjIVixZkFiu-AiifiQsBEmq79VuqhQprjnuqeBKjQzqCO1LZvfsMU8dzFo8CYm7p73M-HgzSaNrjQT7cVCzWCBafFycXKdP6mqEc-CCBkM1OgLhdPcd6KzTmAvFLHvxD10PyeT6udyiV7ZEWHxoCxCDod8UapQe9YTNz_9goeh.u_yTmkCJM3yelv3iDJXrdW43YL0.ZfjOsA; canvas_session=k3o1EnJpXVDEM9E8K_Sp3g+b7436RK2ceGDUfDoDb88SrdRmjHna6MYGpueQD_erpcgar1FkHw0XXvHidWTa0W1qfsttfUbEOdKtVfNIkCDQ7Lh2TSs4sQ48Y2PBFKRTbGEtAv1035wg7Gu_yVifiN1C3yUnbvrwz6v5-7VRruj8fE0yQfkg82Lfzma9qogFmdjGBO3CwgzFiwa0gmShk1zmbNCGkGddr9P1F-uAEIo02jEz9onvRavB3V2e82-LojQM8Ox1VoZkxSkrRLDiMoaZ4XQ-aQGQ8QD1qDWVbE8khdWx0F-0x1A0iUFKYvc6P3zvu3Z1FqOqJzgtP8ZHFKOutijLbSLdXrQfMTbi9RyXZ_jRmBx-HG70dBxT5cFRJxH7nT93IQss9un-FdKDizyoMY1NCRBdtPTJzC0o8DlFxU5JnYOfRUOFZ7UgKrhQNihTSWt9Z_Myjb_PQRE_wNCOM0Oyu3xgpOXttElgdviNiF7nmaljaZOsU0htuNdwWBohl66fNmTjd8j0Yuw-0lFftH6jTJxJg4eoaynGnWUSk8no24eQzj0FTkwDik_m2M2byx2JcbXrO-fZb9NncFa_4GxJxZjleu2L4BUazBYgvd1UENnHvNL5m8sM7Ln573VaGEz8dB6ZJBtkWt-kWivsWnx5MCBHvyGcC2AIXLu5AWjIVixZkFiu-AiifiQsBEmq79VuqhQprjnuqeBKjQzqCO1LZvfsMU8dzFo8CYm7p73M-HgzSaNrjQT7cVCzWCBafFycXKdP6mqEc-CCBkM1OgLhdPcd6KzTmAvFLHvxD10PyeT6udyiV7ZEWHxoCxCDod8UapQe9YTNz_9goeh.u_yTmkCJM3yelv3iDJXrdW43YL0.ZfjOsA; _csrf_token=6FXDFBcHuxSGVYhrmorywWPvJuj2Fq2VtqvMjHQ%2FBW%2BSEKh8dHfvevUs5SPc2qabB4IfoZ9Y4Pj34qjBDglmQA%3D%3D",
//             "Referer": "https://canvas.eee.uci.edu/courses/61774/gradebook/speed_grader?assignment_id=1313205&student_id=409398",
//             "Referrer-Policy": "no-referrer-when-downgrade"
//         },
//         data : `submission%5Bassignment_id%5D=1313204&submission%5Bgroup_comment%5D=0&submission%5Bcomment%5D=${grade[prop]}&submission%5Bdraft_comment%5D=false&submission%5Bid%5D=409398&_method=PUT&authenticity_token=5wY6rUSLski1ZT596%2FaXUvTUMI3h%2Fq2KQE6daaXNtcCdQ1HFJ%2FvmJsYcUzWtpsMIkLkJxIiw4OcBB%2Fkk3%2FvW7w%3D%3D`
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

const createGradeRequestConfig = (data) => {
    return {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://canvas.eee.uci.edu/courses/61775/rubric_associations/146237/assessments',
      headers: {
        "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240313.293,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=4b171ff0e19e40b4b9356b1a257b1d69",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sentry-trace": "4b171ff0e19e40b4b9356b1a257b1d69-abe2fcace6bc8d3b-0",
        "x-csrf-token": "jnT7ldjAie8yrNh0TiEiUGbMbwsDbleeSIVgYBDXXF70MZD9u7DdgUHVtTwIcXYKAqFWQmogGvMJzAQtauE/cQ==",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=e4c8c51cc7b2f0a81efe12a2d0fbc9e7; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fshib.service.uci.edu%2F%22%2C%22ts%22%3A1710800829247%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2F%22%7D; _legacy_normandy_session=XxTOWzGP04Ke004fdUaOPw+dlhbhEXOE37Jo0MZ8HrNKAPpFtnYgeF1AWiT7rUOUxfCsZGCNOVl44pH8tVlt6U_0VlTE7J_WywfdvCxB_69PdIypMZg2Vqjd7GXYYI5FoqJKlNh79hLJQVNYgF2YP82VAhHdw-KRKsGNEMlYwjDuWx4Q-SrX0rgWuMm4dkgRlD_Bg67-SJJUraEXmW1o540Aik66gLhCp9y_CGW7e1Mlu_KrSG1TVlI2sWiwjaGtysbvNGhR3XuvupkIg7oEWPyvYooAmq2DfK5TS7xHZtHmCrKMKcpsg2Sf88yesf8lvDDDWeaEXq6_KAuyEr4gWBmLXL4ra3L75MW-KmFvH-5mUoRBCBm5r6BGYoalUZp-9Bhm3hc5LVcjxnAYHtg6yAj716_HFCP3bTFyRKT8WQyeViKvChKJ1XjV_EGCemQxRqRAbiQGC0jQ00JDd7y8S0OYxNGxxERBRh2YUjiVBbt8xVzgsOfODua-QwDnrXjtzApU7jWD_dor4cOxNC2Bv_2uCiD9x5k7MBRdqBqhE4ynuQzbX3gwOlPWFw6ZFkP9L7CVdbY9nWFd59olkvowsMMVpmHUjkdXgaD89fdZ5d2xBT0-cZ8I5KLOyk_CwKd5VdAfVBVkm21Fse5GQTmJT-dwugiAUja99nl2uOFuMlAyCw7yfvwRUifQF18MTLIl99KUBx4jl0VnX0k5E_emj18GZendVjgDbB5w_OAbZJ_1bcfmZDm1H-iz0FkkmzDDk8_p5B_Eb8KpYvp2C1NFSU8awrY239KWF0Z3GmZL_fKh-RwZWFVl-_VtR-quUofMc7X_7JWZ1tpJT7cyNFCgaF0.vwb9wLAWmadKHP7icXd3L0e2B3g.ZfjQMw; canvas_session=XxTOWzGP04Ke004fdUaOPw+dlhbhEXOE37Jo0MZ8HrNKAPpFtnYgeF1AWiT7rUOUxfCsZGCNOVl44pH8tVlt6U_0VlTE7J_WywfdvCxB_69PdIypMZg2Vqjd7GXYYI5FoqJKlNh79hLJQVNYgF2YP82VAhHdw-KRKsGNEMlYwjDuWx4Q-SrX0rgWuMm4dkgRlD_Bg67-SJJUraEXmW1o540Aik66gLhCp9y_CGW7e1Mlu_KrSG1TVlI2sWiwjaGtysbvNGhR3XuvupkIg7oEWPyvYooAmq2DfK5TS7xHZtHmCrKMKcpsg2Sf88yesf8lvDDDWeaEXq6_KAuyEr4gWBmLXL4ra3L75MW-KmFvH-5mUoRBCBm5r6BGYoalUZp-9Bhm3hc5LVcjxnAYHtg6yAj716_HFCP3bTFyRKT8WQyeViKvChKJ1XjV_EGCemQxRqRAbiQGC0jQ00JDd7y8S0OYxNGxxERBRh2YUjiVBbt8xVzgsOfODua-QwDnrXjtzApU7jWD_dor4cOxNC2Bv_2uCiD9x5k7MBRdqBqhE4ynuQzbX3gwOlPWFw6ZFkP9L7CVdbY9nWFd59olkvowsMMVpmHUjkdXgaD89fdZ5d2xBT0-cZ8I5KLOyk_CwKd5VdAfVBVkm21Fse5GQTmJT-dwugiAUja99nl2uOFuMlAyCw7yfvwRUifQF18MTLIl99KUBx4jl0VnX0k5E_emj18GZendVjgDbB5w_OAbZJ_1bcfmZDm1H-iz0FkkmzDDk8_p5B_Eb8KpYvp2C1NFSU8awrY239KWF0Z3GmZL_fKh-RwZWFVl-_VtR-quUofMc7X_7JWZ1tpJT7cyNFCgaF0.vwb9wLAWmadKHP7icXd3L0e2B3g.ZfjQMw; _csrf_token=jnT7ldjAie8yrNh0TiEiUGbMbwsDbleeSIVgYBDXXF70MZD9u7DdgUHVtTwIcXYKAqFWQmogGvMJzAQtauE%2FcQ%3D%3D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%223317048080433366%22%2C%22sessionId%22%3A%224745172712684673%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1710800829.164.1.1710805206.0.0.0",
        "Referer": "https://canvas.eee.uci.edu/courses/61775/gradebook/speed_grader?assignment_id=1313252&student_id=410808",
        "Referrer-Policy": "no-referrer-when-downgrade"
      },
      data : data
    };
}

const createCommentRequestConfig = (grade, prop) => {
    return {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://canvas.eee.uci.edu/courses/61775/assignments/1313252/submissions/${grade.id}`,
        headers: {
            "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240313.293,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=4b171ff0e19e40b4b9356b1a257b1d69",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sentry-trace": "4b171ff0e19e40b4b9356b1a257b1d69-8c1a098e2d9b967c-0",
            "x-csrf-token": "P127qaMM9IiZpucckdh8Gdjvah6aM4QykJIw96CAPl1FGNDBwHyg5urfilTXiChDvIJTV/N9yV/R21S62rZdcg==",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=e4c8c51cc7b2f0a81efe12a2d0fbc9e7; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fshib.service.uci.edu%2F%22%2C%22ts%22%3A1710800829247%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2F%22%7D; _legacy_normandy_session=XxTOWzGP04Ke004fdUaOPw+dlhbhEXOE37Jo0MZ8HrNKAPpFtnYgeF1AWiT7rUOUxfCsZGCNOVl44pH8tVlt6U_0VlTE7J_WywfdvCxB_69PdIypMZg2Vqjd7GXYYI5FoqJKlNh79hLJQVNYgF2YP82VAhHdw-KRKsGNEMlYwjDuWx4Q-SrX0rgWuMm4dkgRlD_Bg67-SJJUraEXmW1o540Aik66gLhCp9y_CGW7e1Mlu_KrSG1TVlI2sWiwjaGtysbvNGhR3XuvupkIg7oEWPyvYooAmq2DfK5TS7xHZtHmCrKMKcpsg2Sf88yesf8lvDDDWeaEXq6_KAuyEr4gWBmLXL4ra3L75MW-KmFvH-5mUoRBCBm5r6BGYoalUZp-9Bhm3hc5LVcjxnAYHtg6yAj716_HFCP3bTFyRKT8WQyeViKvChKJ1XjV_EGCemQxRqRAbiQGC0jQ00JDd7y8S0OYxNGxxERBRh2YUjiVBbt8xVzgsOfODua-QwDnrXjtzApU7jWD_dor4cOxNC2Bv_2uCiD9x5k7MBRdqBqhE4ynuQzbX3gwOlPWFw6ZFkP9L7CVdbY9nWFd59olkvowsMMVpmHUjkdXgaD89fdZ5d2xBT0-cZ8I5KLOyk_CwKd5VdAfVBVkm21Fse5GQTmJT-dwugiAUja99nl2uOFuMlAyCw7yfvwRUifQF18MTLIl99KUBx4jl0VnX0k5E_emj18GZendVjgDbB5w_OAbZJ_1bcfmZDm1H-iz0FkkmzDDk8_p5B_Eb8KpYvp2C1NFSU8awrY239KWF0Z3GmZL_fKh-RwZWFVl-_VtR-quUofMc7X_7JWZ1tpJT7cyNFCgaF0.vwb9wLAWmadKHP7icXd3L0e2B3g.ZfjQMw; canvas_session=XxTOWzGP04Ke004fdUaOPw+dlhbhEXOE37Jo0MZ8HrNKAPpFtnYgeF1AWiT7rUOUxfCsZGCNOVl44pH8tVlt6U_0VlTE7J_WywfdvCxB_69PdIypMZg2Vqjd7GXYYI5FoqJKlNh79hLJQVNYgF2YP82VAhHdw-KRKsGNEMlYwjDuWx4Q-SrX0rgWuMm4dkgRlD_Bg67-SJJUraEXmW1o540Aik66gLhCp9y_CGW7e1Mlu_KrSG1TVlI2sWiwjaGtysbvNGhR3XuvupkIg7oEWPyvYooAmq2DfK5TS7xHZtHmCrKMKcpsg2Sf88yesf8lvDDDWeaEXq6_KAuyEr4gWBmLXL4ra3L75MW-KmFvH-5mUoRBCBm5r6BGYoalUZp-9Bhm3hc5LVcjxnAYHtg6yAj716_HFCP3bTFyRKT8WQyeViKvChKJ1XjV_EGCemQxRqRAbiQGC0jQ00JDd7y8S0OYxNGxxERBRh2YUjiVBbt8xVzgsOfODua-QwDnrXjtzApU7jWD_dor4cOxNC2Bv_2uCiD9x5k7MBRdqBqhE4ynuQzbX3gwOlPWFw6ZFkP9L7CVdbY9nWFd59olkvowsMMVpmHUjkdXgaD89fdZ5d2xBT0-cZ8I5KLOyk_CwKd5VdAfVBVkm21Fse5GQTmJT-dwugiAUja99nl2uOFuMlAyCw7yfvwRUifQF18MTLIl99KUBx4jl0VnX0k5E_emj18GZendVjgDbB5w_OAbZJ_1bcfmZDm1H-iz0FkkmzDDk8_p5B_Eb8KpYvp2C1NFSU8awrY239KWF0Z3GmZL_fKh-RwZWFVl-_VtR-quUofMc7X_7JWZ1tpJT7cyNFCgaF0.vwb9wLAWmadKHP7icXd3L0e2B3g.ZfjQMw; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%223317048080433366%22%2C%22sessionId%22%3A%224745172712684673%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1710800829.164.1.1710805206.0.0.0; _csrf_token=P127qaMM9IiZpucckdh8Gdjvah6aM4QykJIw96CAPl1FGNDBwHyg5urfilTXiChDvIJTV%2FN9yV%2FR21S62rZdcg%3D%3D",
            "Referer": "https://canvas.eee.uci.edu/courses/61775/gradebook/speed_grader?assignment_id=1313252&student_id=410808",
            "Referrer-Policy": "no-referrer-when-downgrade"
        },
        data : `submission%5Bassignment_id%5D=1313251&submission%5Bgroup_comment%5D=0&submission%5Bcomment%5D=${grade[prop]}&submission%5Bdraft_comment%5D=false&submission%5Bid%5D=${grade.id}&_method=PUT&authenticity_token=e1BnVjxFijdPeTWmOcWOZc%2BuU%2Bro1nE0SjMbmdCEOloBFQw%2BXzXeWTwAWO5%2Fldo%2Fq8Nqo4GYPFkLen%2FUqrJZdQ%3D%3D`
    }
}
// --------------------------------------------------


(async () => {
  const grades = await parseGradesInfo();
  let counter = 1;
  for (grade of grades) {
    const data = createGradeRequestData(grade);
    const config = createGradeRequestConfig(data);

    // const totalGradeConfig = createTotalGradeRequestConfig(grade);


    
    const commentConfig_1 = createCommentRequestConfig(grade, 'grader');
    // const commentConfig_2 = createCommentRequestConfig(grade, 'comment');
    const commentConfig_3 = createCommentRequestConfig(grade, 'remarks');
    

    try {
      const response = await axios(config);
    //   const totalGradeResponse = await axios(totalGradeConfig);
      
      console.log(`${counter}) SUCCESS ${grade.id} ${grade.name}`);

      try {
        const commentResponse_1 = await axios(commentConfig_1);
        // const commentResponse_2 = await axios(commentConfig_2);
        const commentResponse_3 = await axios(commentConfig_3);

        console.log(`${counter}) COMMENT_SUCCESS ${grade.id} ${grade.name}`);
      } catch (e) {
        console.log(`${counter}) COMMENT_FAILURE ${grade.id} ${grade.name}`);
        console.log(grade.comment);
        console.log('----------------------');
      }
    
    } catch (e) {
      console.log(`${counter}) FAILURE ${grade.id} ${grade.name}`);
      // console.log(grade);
      console.log(e);
      console.log('----------------------');
    }
    counter++;
  }
})()