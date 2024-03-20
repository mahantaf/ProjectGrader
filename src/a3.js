const fs    = require('fs');
const axios = require('axios');
const csv   = require('csvtojson');
const path = require('path');

// const gradesCSV = '../grades/2023/a3/final_a3_labA.csv';
const gradesCSV = '../grades/2023/a3/final_a3_labB.csv';

const parseGradesInfo = async (studentsInfo) => {
  const grades = [];
  const gradeList = await csv().fromFile(path.join(__dirname, gradesCSV));
  for (grade of gradeList)
    grades.push({
      id: grade['canvasID'],
      name: grade['name'],
      partA: grade['Part_A'],
      partB: grade['Part_B'],
      partC: grade['Part_C'],
      grader: `Grader of the assignment: \n ${grade['Grader']}`,
      comment: `Grader comment on UI: \n ${grade['Comments']}`,
      remarks: `Autograder logs: \n ${grade['Remarks']}`
    })
  return grades;
}

const createGradeRequestData = (grade) => {
    return `rubric_assessment%5Buser_id%5D=${grade.id}&rubric_assessment%5Bassessment_type%5D=grading&rubric_assessment%5Bcriterion__4142%5D%5Brating_id%5D=blank&rubric_assessment%5Bcriterion__4142%5D%5Bpoints%5D=${grade.partA}&rubric_assessment%5Bcriterion__4142%5D%5Bdescription%5D=Full+Marks&rubric_assessment%5Bcriterion__4142%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__4142%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__2428%5D%5Brating_id%5D=_8021&rubric_assessment%5Bcriterion__2428%5D%5Bpoints%5D=${grade.partB}&rubric_assessment%5Bcriterion__2428%5D%5Bdescription%5D=Full+Marks&rubric_assessment%5Bcriterion__2428%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__2428%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__2027%5D%5Brating_id%5D=_8159&rubric_assessment%5Bcriterion__2027%5D%5Bpoints%5D=${grade.partC}&rubric_assessment%5Bcriterion__2027%5D%5Bdescription%5D=Full+Marks&rubric_assessment%5Bcriterion__2027%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__2027%5D%5Bsave_comment%5D=0&graded_anonymously=false&_method=POST&authenticity_token=1LEec2Kg805px0%2BPPGJATVBFSoPSmRNjo4NnlM%2F0%2BNGu9HUbAdCnIBq%2BIsd6MhQXNChzyrvXXg7iygPZtcKb%2Fg%3D%3D`
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
//       url: 'https://canvas.eee.uci.edu/courses/61774/rubric_associations/146210/assessments',
//       headers: {
//         "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
//         "accept-language": "en-US,en;q=0.9",
//         "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240313.293,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=7b5fec35bdc04bc8949015ef13957eba",
//         "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//         "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-platform": "\"macOS\"",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         "sentry-trace": "7b5fec35bdc04bc8949015ef13957eba-bfa279e55cadcbdf-0",
//         "x-csrf-token": "1LEec2Kg805px0+PPGJATVBFSoPSmRNjo4NnlM/0+NGu9HUbAdCnIBq+Isd6MhQXNChzyrvXXg7iygPZtcKb/g==",
//         "x-requested-with": "XMLHttpRequest",
//         "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=e4c8c51cc7b2f0a81efe12a2d0fbc9e7; _legacy_normandy_session=lXNwKxhawlTNq4DK4_-99g+Q0_7_U3l-teu64KcPllHKKrxGClMModj4dhRqjI2DCDC1QA788VcNye69M70RqA9mggziToRUdD4cijpVgPvtiZsLSLob5e5KDrNzH7_-niddJYuMVjAaHy4UkrjABR5-D7kr9X__T5N-RKRhTcaovy3uZy__WLSFYc6Z1mZxpVEF1pazD0XYVsfJftj2NODkz61zsgJyuMjAzVmNoroV6sPHnlAIL9wcy7VMJsQHD9lbx7lNQoIB3n8Oe7ELH8I7iucCPdxim1O8w-Lu1atdiUcv2oBFCAQArpZ6voE2ppwpy_xBV-w1N9NsXdYzA4v-VFoAbPX2qsFD8gYhtA3jpkTsYjtidoGCVfUcfF1ssINZTE6vy_3YbEU3h_cP8Dtu7oTcyd6RDHkZ-rblS_Vuw94LnJIUNzgjnzb2JURIJW8J6XLNt-QOcDENkl5MXdwGsr503AFwuhxKx-8QE3_ZI0xySjoPSNZBqbZGCbgquLtDy_5IlPeD7jbD71VDsCJATv-gboORtX0AhAP6smdY0ulP1yrVAKBjpOsQ1kXMF_BO586H5l7Jzi1ra-xuxVdyS939qN8BD3V0pMyk0pL7M-acW-RKyz1weBL-cKSUa1gbSE_1gJmzG5gbS5nsqdr10KQX98hMjVauBNJuz9MpjcmlB5TbzByqU_UmzXzsd6jxagYYgQf-PGh0vH3fD9qm_y2QxDYjg0KubA37OKMjsRgwkuat9a7zLQ7fu5i1Wsrm36wchiWJ0inR9xOgefaK-waauHZWn0stK-qkQUP36HtpqenryCjrPnGIEeX7HnJBpH9g41sAnqRzsXuhHu6._O_9m_YdBVTKrlasw8f57szWjvk.Zfi_vA; canvas_session=lXNwKxhawlTNq4DK4_-99g+Q0_7_U3l-teu64KcPllHKKrxGClMModj4dhRqjI2DCDC1QA788VcNye69M70RqA9mggziToRUdD4cijpVgPvtiZsLSLob5e5KDrNzH7_-niddJYuMVjAaHy4UkrjABR5-D7kr9X__T5N-RKRhTcaovy3uZy__WLSFYc6Z1mZxpVEF1pazD0XYVsfJftj2NODkz61zsgJyuMjAzVmNoroV6sPHnlAIL9wcy7VMJsQHD9lbx7lNQoIB3n8Oe7ELH8I7iucCPdxim1O8w-Lu1atdiUcv2oBFCAQArpZ6voE2ppwpy_xBV-w1N9NsXdYzA4v-VFoAbPX2qsFD8gYhtA3jpkTsYjtidoGCVfUcfF1ssINZTE6vy_3YbEU3h_cP8Dtu7oTcyd6RDHkZ-rblS_Vuw94LnJIUNzgjnzb2JURIJW8J6XLNt-QOcDENkl5MXdwGsr503AFwuhxKx-8QE3_ZI0xySjoPSNZBqbZGCbgquLtDy_5IlPeD7jbD71VDsCJATv-gboORtX0AhAP6smdY0ulP1yrVAKBjpOsQ1kXMF_BO586H5l7Jzi1ra-xuxVdyS939qN8BD3V0pMyk0pL7M-acW-RKyz1weBL-cKSUa1gbSE_1gJmzG5gbS5nsqdr10KQX98hMjVauBNJuz9MpjcmlB5TbzByqU_UmzXzsd6jxagYYgQf-PGh0vH3fD9qm_y2QxDYjg0KubA37OKMjsRgwkuat9a7zLQ7fu5i1Wsrm36wchiWJ0inR9xOgefaK-waauHZWn0stK-qkQUP36HtpqenryCjrPnGIEeX7HnJBpH9g41sAnqRzsXuhHu6._O_9m_YdBVTKrlasw8f57szWjvk.Zfi_vA; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fshib.service.uci.edu%2F%22%2C%22ts%22%3A1710800829247%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2F%22%7D; _csrf_token=1LEec2Kg805px0%2BPPGJATVBFSoPSmRNjo4NnlM%2F0%2BNGu9HUbAdCnIBq%2BIsd6MhQXNChzyrvXXg7iygPZtcKb%2Fg%3D%3D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%221836392149146587%22%2C%22sessionId%22%3A%224745172712684673%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1710800829.164.1.1710800862.0.0.0",
//         "Referer": "https://canvas.eee.uci.edu/courses/61774/gradebook/speed_grader?assignment_id=1313204&student_id=409398",
//         "Referrer-Policy": "no-referrer-when-downgrade"
//       },
//       data : data
//     };
// }

// const createCommentRequestConfig = (grade, prop) => {
//     return {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: `https://canvas.eee.uci.edu/courses/61774/assignments/1313204/submissions/${grade.id}`,
//         headers: {
//             "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
//             "accept-language": "en-US,en;q=0.9",
//             "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240313.293,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=7b5fec35bdc04bc8949015ef13957eba",
//             "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//             "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
//             "sec-ch-ua-mobile": "?0",
//             "sec-ch-ua-platform": "\"macOS\"",
//             "sec-fetch-dest": "empty",
//             "sec-fetch-mode": "cors",
//             "sec-fetch-site": "same-origin",
//             "sentry-trace": "7b5fec35bdc04bc8949015ef13957eba-b38d92158d7e5111-0",
//             "x-csrf-token": "5wY6rUSLski1ZT596/aXUvTUMI3h/q2KQE6daaXNtcCdQ1HFJ/vmJsYcUzWtpsMIkLkJxIiw4OcBB/kk3/vW7w==",
//             "x-requested-with": "XMLHttpRequest",
//             "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=e4c8c51cc7b2f0a81efe12a2d0fbc9e7; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fshib.service.uci.edu%2F%22%2C%22ts%22%3A1710800829247%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2F%22%7D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%221836392149146587%22%2C%22sessionId%22%3A%224745172712684673%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1710800829.164.1.1710800862.0.0.0; _legacy_normandy_session=IjJiJlJzBvWsMB68iwBGvw+67VsCuJqAkN-seDi3YMbwcc5fjyfRkKQxSTeD_7LcyFYRNKNXBD79SqG4hblEQQrdgNCHd3xwDFhrIl8BIm5rPVOnoFh8qOmaILqDW0TyM4Tm51zO40d9tS4oa4WtZHijWptokkMDyXPdj8PgIAttbhDt4ceZBD7zlEJc4E5ryFg7EvuvVtviIxYhmAh8WSb7KP14j_aRFWdVdPx5vbuwduu8RasrAaOI_1dUMP61el_-YxFOeyeC-AjZLBw3H4WNPV7oKV6fCuVML-SKlSy5GkJPU5NGJUFwurjUnTHU3GZU45ik6mt-XbA5VqtprfNRuTLEiZcVI-AmQB9Y3OfxsegBYM6ATk_lWIQhqVKUvhhwVS1SoGBSqQ_2__op_v8PWA7Vk_Xnn2xQWru7mAqhWoPFe2EnsnGrdZ9YRDuhWMU6S4B9ICU_4K2X0fLN7XlXzemXCZ-4OHnpgCxcJHr8WqSfa2AgXnlXI4uqy34UrW5JJ-CFSC1U23Xnqah7u5pA-j00ECIANMGuVxc1rK2dHuPNdADmDBcgmy2tHRS2i-uB0nQ3m83Qu5rERMfRjm9CXDJ3JHF6Ud2KNp6G2mlNcP7iCgK3QJiLgOWlm0967F6q6HAbUPSmdEtPJQrOh-JkBmiYJyWqsxAOUYoIfFSUy0vssfP6CYq8khcnozvWe1ncYfVfxGwj1jr8Ee8diXHeCi1oM9-3lVBJEnpCI4KbdmzX0Njbhfraej-NStqTCpbDE66jh_mUHzcv1MwaHkGvOjYY5w91MEfZ07_gBYPw_c0EzeK1hqJlugJd0xLoUerX6DLJnfSvxnl5I3ey9pA.9HVnRYj9TMXsxoaMydTAV2WeUjY.ZfjA9Q; canvas_session=IjJiJlJzBvWsMB68iwBGvw+67VsCuJqAkN-seDi3YMbwcc5fjyfRkKQxSTeD_7LcyFYRNKNXBD79SqG4hblEQQrdgNCHd3xwDFhrIl8BIm5rPVOnoFh8qOmaILqDW0TyM4Tm51zO40d9tS4oa4WtZHijWptokkMDyXPdj8PgIAttbhDt4ceZBD7zlEJc4E5ryFg7EvuvVtviIxYhmAh8WSb7KP14j_aRFWdVdPx5vbuwduu8RasrAaOI_1dUMP61el_-YxFOeyeC-AjZLBw3H4WNPV7oKV6fCuVML-SKlSy5GkJPU5NGJUFwurjUnTHU3GZU45ik6mt-XbA5VqtprfNRuTLEiZcVI-AmQB9Y3OfxsegBYM6ATk_lWIQhqVKUvhhwVS1SoGBSqQ_2__op_v8PWA7Vk_Xnn2xQWru7mAqhWoPFe2EnsnGrdZ9YRDuhWMU6S4B9ICU_4K2X0fLN7XlXzemXCZ-4OHnpgCxcJHr8WqSfa2AgXnlXI4uqy34UrW5JJ-CFSC1U23Xnqah7u5pA-j00ECIANMGuVxc1rK2dHuPNdADmDBcgmy2tHRS2i-uB0nQ3m83Qu5rERMfRjm9CXDJ3JHF6Ud2KNp6G2mlNcP7iCgK3QJiLgOWlm0967F6q6HAbUPSmdEtPJQrOh-JkBmiYJyWqsxAOUYoIfFSUy0vssfP6CYq8khcnozvWe1ncYfVfxGwj1jr8Ee8diXHeCi1oM9-3lVBJEnpCI4KbdmzX0Njbhfraej-NStqTCpbDE66jh_mUHzcv1MwaHkGvOjYY5w91MEfZ07_gBYPw_c0EzeK1hqJlugJd0xLoUerX6DLJnfSvxnl5I3ey9pA.9HVnRYj9TMXsxoaMydTAV2WeUjY.ZfjA9Q; _csrf_token=5wY6rUSLski1ZT596%2FaXUvTUMI3h%2Fq2KQE6daaXNtcCdQ1HFJ%2FvmJsYcUzWtpsMIkLkJxIiw4OcBB%2Fkk3%2FvW7w%3D%3D",
//             "Referer": "https://canvas.eee.uci.edu/courses/61774/gradebook/speed_grader?assignment_id=1313204&student_id=409398",
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
      url: 'https://canvas.eee.uci.edu/courses/61775/rubric_associations/146236/assessments',
      headers: {
        "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240313.293,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=ac266ff3c5a24b258944514ce3f7a756",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sentry-trace": "ac266ff3c5a24b258944514ce3f7a756-a221aa36bc7b2c86-0",
        "x-csrf-token": "o4QqIBrWwoo99biZ2cmia2FDo1DZc/5Rq9PFf/P8AkzZwUFIeaaW5E6M1dGfmfYxBS6aGbA9szzqmqEyicphYw==",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=e4c8c51cc7b2f0a81efe12a2d0fbc9e7; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fshib.service.uci.edu%2F%22%2C%22ts%22%3A1710800829247%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2F%22%7D; _legacy_normandy_session=XP3cUkwa6m6QzbUxRTeHow+6Jq2tbKUyimgni4a3-tJaXRjAG-dMNprx2xu1SMRjAxWILu7Lk2K3aYBoKctruk4sjMIdJV1iNjuFHlv0mWB3_C9sjon7bY57Lyc7nf7BlAm1tCojJUg_Ukj-mlKsQ-D5kL9PsUhXcV-IM3rI2GbbGZ7kP3MWu3uyO7-VFe7O00uIfR9GGdi7VACYPve-ZQZdM7oWUrM56cabbp-_16OB-Smm7jdAz5imw2eNh-4jkiw0YIO5A1omhQ-OOQ_hbilBnlfNIxeoOZtMz1uCPY0Mt2ebku4TB-FxaUTgwG1iUzsgmYJu8LJTgMc4xMix5IA08yH5TzMHOb5hOCR_YbncFvTmwyTLGs5cSQ1tFmY4xNj1LEbbT9C64-6nxC2ZjrXqyLxCx-7-ZRpAHhxx1NpsMpxycDs-4byNOyjPerfo3dVz3VXB-nwBU4b_sAMlIGxVUrzfRrDuWS1lnnwiyEPrAMWHLFWfpxsAnPlcWqPzqgreXyy2BqSTa-HfTkY2WxMrn5KUrzFtPYddMnYgF0NIUuDXK_ihLAx3WjpetZW92RD-qm09iyK7ZU12sOzhql9cN0EnPI9b2EVZSdDkBT-zMUdbrFyj8hn9pDWxqnkwnl7pEqcE7PTrW6A1Jw_vIt_kVLJYnMeCZ2l0VNi6T-8bkSjamZAL2fQ4sValHAd2SGXmzeuktRqfOil1tAXpZ-Q1etK5bpp0fl1QbrNLWGthS-rKHOEWbNe0NxVZUxCA71w7JvMbpDDwi3xSybdXgzZPdPMgPPrAipeazpUXJU-hMf6_omY5Lc7Tp7gECbDbXaH0glI4AHECEvRJ1wwvGYa.unLcbsUD2RqM22-a-7lUz9vLiDI.ZfjFiw; canvas_session=XP3cUkwa6m6QzbUxRTeHow+6Jq2tbKUyimgni4a3-tJaXRjAG-dMNprx2xu1SMRjAxWILu7Lk2K3aYBoKctruk4sjMIdJV1iNjuFHlv0mWB3_C9sjon7bY57Lyc7nf7BlAm1tCojJUg_Ukj-mlKsQ-D5kL9PsUhXcV-IM3rI2GbbGZ7kP3MWu3uyO7-VFe7O00uIfR9GGdi7VACYPve-ZQZdM7oWUrM56cabbp-_16OB-Smm7jdAz5imw2eNh-4jkiw0YIO5A1omhQ-OOQ_hbilBnlfNIxeoOZtMz1uCPY0Mt2ebku4TB-FxaUTgwG1iUzsgmYJu8LJTgMc4xMix5IA08yH5TzMHOb5hOCR_YbncFvTmwyTLGs5cSQ1tFmY4xNj1LEbbT9C64-6nxC2ZjrXqyLxCx-7-ZRpAHhxx1NpsMpxycDs-4byNOyjPerfo3dVz3VXB-nwBU4b_sAMlIGxVUrzfRrDuWS1lnnwiyEPrAMWHLFWfpxsAnPlcWqPzqgreXyy2BqSTa-HfTkY2WxMrn5KUrzFtPYddMnYgF0NIUuDXK_ihLAx3WjpetZW92RD-qm09iyK7ZU12sOzhql9cN0EnPI9b2EVZSdDkBT-zMUdbrFyj8hn9pDWxqnkwnl7pEqcE7PTrW6A1Jw_vIt_kVLJYnMeCZ2l0VNi6T-8bkSjamZAL2fQ4sValHAd2SGXmzeuktRqfOil1tAXpZ-Q1etK5bpp0fl1QbrNLWGthS-rKHOEWbNe0NxVZUxCA71w7JvMbpDDwi3xSybdXgzZPdPMgPPrAipeazpUXJU-hMf6_omY5Lc7Tp7gECbDbXaH0glI4AHECEvRJ1wwvGYa.unLcbsUD2RqM22-a-7lUz9vLiDI.ZfjFiw; _csrf_token=o4QqIBrWwoo99biZ2cmia2FDo1DZc%2F5Rq9PFf%2FP8AkzZwUFIeaaW5E6M1dGfmfYxBS6aGbA9szzqmqEyicphYw%3D%3D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%224447277416866535%22%2C%22sessionId%22%3A%224745172712684673%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1710800829.164.1.1710802539.0.0.0",
        "Referer": "https://canvas.eee.uci.edu/courses/61775/gradebook/speed_grader?assignment_id=1313251&student_id=410808",
        "Referrer-Policy": "no-referrer-when-downgrade"
      },
      data : data
    };
}

const createCommentRequestConfig = (grade, prop) => {
    return {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://canvas.eee.uci.edu/courses/61775/assignments/1313251/submissions/${grade.id}`,
        headers: {
            "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240313.293,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=ac266ff3c5a24b258944514ce3f7a756",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sentry-trace": "ac266ff3c5a24b258944514ce3f7a756-b24483d3c377fd04-0",
            "x-csrf-token": "e1BnVjxFijdPeTWmOcWOZc+uU+ro1nE0SjMbmdCEOloBFQw+XzXeWTwAWO5/ldo/q8Nqo4GYPFkLen/UqrJZdQ==",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=e4c8c51cc7b2f0a81efe12a2d0fbc9e7; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fshib.service.uci.edu%2F%22%2C%22ts%22%3A1710800829247%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2F%22%7D; _legacy_normandy_session=XP3cUkwa6m6QzbUxRTeHow+6Jq2tbKUyimgni4a3-tJaXRjAG-dMNprx2xu1SMRjAxWILu7Lk2K3aYBoKctruk4sjMIdJV1iNjuFHlv0mWB3_C9sjon7bY57Lyc7nf7BlAm1tCojJUg_Ukj-mlKsQ-D5kL9PsUhXcV-IM3rI2GbbGZ7kP3MWu3uyO7-VFe7O00uIfR9GGdi7VACYPve-ZQZdM7oWUrM56cabbp-_16OB-Smm7jdAz5imw2eNh-4jkiw0YIO5A1omhQ-OOQ_hbilBnlfNIxeoOZtMz1uCPY0Mt2ebku4TB-FxaUTgwG1iUzsgmYJu8LJTgMc4xMix5IA08yH5TzMHOb5hOCR_YbncFvTmwyTLGs5cSQ1tFmY4xNj1LEbbT9C64-6nxC2ZjrXqyLxCx-7-ZRpAHhxx1NpsMpxycDs-4byNOyjPerfo3dVz3VXB-nwBU4b_sAMlIGxVUrzfRrDuWS1lnnwiyEPrAMWHLFWfpxsAnPlcWqPzqgreXyy2BqSTa-HfTkY2WxMrn5KUrzFtPYddMnYgF0NIUuDXK_ihLAx3WjpetZW92RD-qm09iyK7ZU12sOzhql9cN0EnPI9b2EVZSdDkBT-zMUdbrFyj8hn9pDWxqnkwnl7pEqcE7PTrW6A1Jw_vIt_kVLJYnMeCZ2l0VNi6T-8bkSjamZAL2fQ4sValHAd2SGXmzeuktRqfOil1tAXpZ-Q1etK5bpp0fl1QbrNLWGthS-rKHOEWbNe0NxVZUxCA71w7JvMbpDDwi3xSybdXgzZPdPMgPPrAipeazpUXJU-hMf6_omY5Lc7Tp7gECbDbXaH0glI4AHECEvRJ1wwvGYa.unLcbsUD2RqM22-a-7lUz9vLiDI.ZfjFiw; canvas_session=XP3cUkwa6m6QzbUxRTeHow+6Jq2tbKUyimgni4a3-tJaXRjAG-dMNprx2xu1SMRjAxWILu7Lk2K3aYBoKctruk4sjMIdJV1iNjuFHlv0mWB3_C9sjon7bY57Lyc7nf7BlAm1tCojJUg_Ukj-mlKsQ-D5kL9PsUhXcV-IM3rI2GbbGZ7kP3MWu3uyO7-VFe7O00uIfR9GGdi7VACYPve-ZQZdM7oWUrM56cabbp-_16OB-Smm7jdAz5imw2eNh-4jkiw0YIO5A1omhQ-OOQ_hbilBnlfNIxeoOZtMz1uCPY0Mt2ebku4TB-FxaUTgwG1iUzsgmYJu8LJTgMc4xMix5IA08yH5TzMHOb5hOCR_YbncFvTmwyTLGs5cSQ1tFmY4xNj1LEbbT9C64-6nxC2ZjrXqyLxCx-7-ZRpAHhxx1NpsMpxycDs-4byNOyjPerfo3dVz3VXB-nwBU4b_sAMlIGxVUrzfRrDuWS1lnnwiyEPrAMWHLFWfpxsAnPlcWqPzqgreXyy2BqSTa-HfTkY2WxMrn5KUrzFtPYddMnYgF0NIUuDXK_ihLAx3WjpetZW92RD-qm09iyK7ZU12sOzhql9cN0EnPI9b2EVZSdDkBT-zMUdbrFyj8hn9pDWxqnkwnl7pEqcE7PTrW6A1Jw_vIt_kVLJYnMeCZ2l0VNi6T-8bkSjamZAL2fQ4sValHAd2SGXmzeuktRqfOil1tAXpZ-Q1etK5bpp0fl1QbrNLWGthS-rKHOEWbNe0NxVZUxCA71w7JvMbpDDwi3xSybdXgzZPdPMgPPrAipeazpUXJU-hMf6_omY5Lc7Tp7gECbDbXaH0glI4AHECEvRJ1wwvGYa.unLcbsUD2RqM22-a-7lUz9vLiDI.ZfjFiw; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%224447277416866535%22%2C%22sessionId%22%3A%224745172712684673%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1710800829.164.1.1710802539.0.0.0; _csrf_token=e1BnVjxFijdPeTWmOcWOZc%2BuU%2Bro1nE0SjMbmdCEOloBFQw%2BXzXeWTwAWO5%2Fldo%2Fq8Nqo4GYPFkLen%2FUqrJZdQ%3D%3D",
            "Referer": "https://canvas.eee.uci.edu/courses/61775/gradebook/speed_grader?assignment_id=1313251&student_id=410808",
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
    const commentConfig_2 = createCommentRequestConfig(grade, 'comment');
    const commentConfig_3 = createCommentRequestConfig(grade, 'remarks');
    

    try {
      const response = await axios(config);
    //   const totalGradeResponse = await axios(totalGradeConfig);
      
      console.log(`${counter}) SUCCESS ${grade.id} ${grade.name}`);

      try {
        const commentResponse_1 = await axios(commentConfig_1);
        const commentResponse_2 = await axios(commentConfig_2);
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