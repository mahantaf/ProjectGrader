const fs    = require('fs');
const axios = require('axios');
const csv   = require('csvtojson');

// const gradesCSV = './grades/2023/a0/final_a0_labA.csv';
const gradesCSV = './grades/2023/a0/final_a0_labB.csv';

const parseGradesInfo = async (studentsInfo) => {
  const grades = [];
  const gradeList = await csv().fromFile(gradesCSV);
  for (grade of gradeList)
    grades.push({
      // id: studentsInfo[grade['STUDENT ID']],
      id: grade['canvasID'],
      name: grade['name'],
      base: grade['base'],
      others: grade['others'],
      a0_module: grade['a0_module'],
      some_module: grade['some_module'],
    })
  return grades;
}


const createGradeRequestData = (grade) => {
   return `rubric_assessment%5Buser_id%5D=${grade.id}&rubric_assessment%5Bassessment_type%5D=grading&rubric_assessment%5Bcriterion__9899%5D%5Brating_id%5D=blank&rubric_assessment%5Bcriterion__9899%5D%5Bpoints%5D=${grade.others}&rubric_assessment%5Bcriterion__9899%5D%5Bdescription%5D=No+Details&rubric_assessment%5Bcriterion__9899%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__9899%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__1150%5D%5Brating_id%5D=_3384&rubric_assessment%5Bcriterion__1150%5D%5Bpoints%5D=${grade.base}&rubric_assessment%5Bcriterion__1150%5D%5Bdescription%5D=No+Details&rubric_assessment%5Bcriterion__1150%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__1150%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__9943%5D%5Brating_id%5D=_3169&rubric_assessment%5Bcriterion__9943%5D%5Bpoints%5D=${grade.a0_module}&rubric_assessment%5Bcriterion__9943%5D%5Bdescription%5D=No+Details&rubric_assessment%5Bcriterion__9943%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__9943%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__7874%5D%5Brating_id%5D=_3224&rubric_assessment%5Bcriterion__7874%5D%5Bpoints%5D=${grade.some_module}&rubric_assessment%5Bcriterion__7874%5D%5Bdescription%5D=No+Details&rubric_assessment%5Bcriterion__7874%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__7874%5D%5Bsave_comment%5D=0&graded_anonymously=false&_method=POST&authenticity_token=%2Fx7a8GGWkGmTzCCHXS45EG8HI2SBEmYwBaty1vQ3I5yTcZGpLuLqXqOZV%2FEyTXhKWGRVT%2BZVEgJQzyKi21Jo0g%3D%3D`
}

// Group A

// const createGradeRequestConfig = (data) => {
//   return {
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: 'https://canvas.eee.uci.edu/courses/61774/rubric_associations/146206/assessments',
//     headers: {
//       "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
//       "accept-language": "en-US,en;q=0.9",
//       "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240131.288,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=7ea260b3914b409eb520c35b7943bfd2",
//       "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//       "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
//       "sec-ch-ua-mobile": "?0",
//       "sec-ch-ua-platform": "\"macOS\"",
//       "sec-fetch-dest": "empty",
//       "sec-fetch-mode": "cors",
//       "sec-fetch-site": "same-origin",
//       "sentry-trace": "7ea260b3914b409eb520c35b7943bfd2-904b45d845a20215-0",
//       "x-csrf-token": "9A55WnwwOMxh9123D+RTvwTDybs5d2K1Trz4sWl6IGDBQjNpTlNUgFefEcJ9gwD4NLWe/VYTIdgljdfAJR8XJQ==",
//       "x-requested-with": "XMLHttpRequest",
//       "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _gcl_au=1.1.474824460.1702326069; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1706557313.2.0.1706557318.55.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=d025339c9efb2c0373706c20f5650964; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fshib.service.uci.edu%2F%22%2C%22ts%22%3A1707853534395%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2Fcourses%2F61774%2Fgradebook%2Fspeed_grader%22%2C%22q%22%3A%22%3Fassignment_id%3D1313201%26student_id%3D413171%22%7D; _legacy_normandy_session=b6YkwXs769csAsYNCC9lCQ+mzVZZzDliuQGXwQwbPpMpq2d2B_ugj1nWVWQFyt1_yhXvmx0oewzwowDkRWSyj-zdHj0P8XVyZjOTy9Y3RQ4_P44i1PcuzuTdv1ePGbA-brpHvM5trC8hhl_8pja0-PhvdT_mOEtmOr-VW35Fq0VuveJELqiRcA-hevydvBCTY0_4X3TEiBd6aU9sojzNz-oCMDVwLNgEe2FYoAAID3cVAHOG9rtJebz3TF7fjB5YJ8cQyLtKq4Fc3FXjD6OxKNiNW_73M3GhwrAo48tzuzvpZfO3mNdsW7H44lL_IYMGib0lz4gw1dnJKK_sgi_Qf2Xu8P97itL8bOS7_8XZex-4ANiLQ1vI5EiaX64ecyAyfu-zq5tZfW9yRwAkf4v0mRQuXflpjtB3i9Je5c4TOjne3_MM9WCDom0NHnnjYFvQmbQaFL1W63KaABgCL22VHbQpkeZGnWl8Y3zQw-Tq1UD4RQk6HWQZIBR7nnhzt3ljxfyD60lp3tqUlOd8Vgl5rVOgsfid0fFW3pzw6hJYECgqM2Y44rwTQR3OR7FC5XQtV8pjQl6nhezgwG6rIjIcssn6T2ZkX5QD8WQ_pUfbu4mzWsOzvIfT-e8bjl455hhVRGOcFcy3SNQRmGgET7InesIzFKNvhF_l7AR0zPbR_fBdC8VxtI8Lz7c-WLJITBTpt2ygfbuFUuXrloNQAuawNrtiPmKvlNN9Z2NHfb1JVeCqXvptHZBvdYYNHF7t62EkQsZe7hGyUd5wR8cLuZSjC573eosNCMXKng07Z0lWX6WTOUMe-Un1ImzblH0lOCGihQt8vphttCjVsrc-QlR-KxH_rnuCO93Jamucbj_MWaCyA.XpEfvUHChtBELVAkVqlJaU1ASIc.ZcvIDQ; canvas_session=b6YkwXs769csAsYNCC9lCQ+mzVZZzDliuQGXwQwbPpMpq2d2B_ugj1nWVWQFyt1_yhXvmx0oewzwowDkRWSyj-zdHj0P8XVyZjOTy9Y3RQ4_P44i1PcuzuTdv1ePGbA-brpHvM5trC8hhl_8pja0-PhvdT_mOEtmOr-VW35Fq0VuveJELqiRcA-hevydvBCTY0_4X3TEiBd6aU9sojzNz-oCMDVwLNgEe2FYoAAID3cVAHOG9rtJebz3TF7fjB5YJ8cQyLtKq4Fc3FXjD6OxKNiNW_73M3GhwrAo48tzuzvpZfO3mNdsW7H44lL_IYMGib0lz4gw1dnJKK_sgi_Qf2Xu8P97itL8bOS7_8XZex-4ANiLQ1vI5EiaX64ecyAyfu-zq5tZfW9yRwAkf4v0mRQuXflpjtB3i9Je5c4TOjne3_MM9WCDom0NHnnjYFvQmbQaFL1W63KaABgCL22VHbQpkeZGnWl8Y3zQw-Tq1UD4RQk6HWQZIBR7nnhzt3ljxfyD60lp3tqUlOd8Vgl5rVOgsfid0fFW3pzw6hJYECgqM2Y44rwTQR3OR7FC5XQtV8pjQl6nhezgwG6rIjIcssn6T2ZkX5QD8WQ_pUfbu4mzWsOzvIfT-e8bjl455hhVRGOcFcy3SNQRmGgET7InesIzFKNvhF_l7AR0zPbR_fBdC8VxtI8Lz7c-WLJITBTpt2ygfbuFUuXrloNQAuawNrtiPmKvlNN9Z2NHfb1JVeCqXvptHZBvdYYNHF7t62EkQsZe7hGyUd5wR8cLuZSjC573eosNCMXKng07Z0lWX6WTOUMe-Un1ImzblH0lOCGihQt8vphttCjVsrc-QlR-KxH_rnuCO93Jamucbj_MWaCyA.XpEfvUHChtBELVAkVqlJaU1ASIc.ZcvIDQ; _csrf_token=9A55WnwwOMxh9123D%2BRTvwTDybs5d2K1Trz4sWl6IGDBQjNpTlNUgFefEcJ9gwD4NLWe%2FVYTIdgljdfAJR8XJQ%3D%3D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%228368126081677896%22%2C%22sessionId%22%3A%228716925626359593%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1707853508.143.1.1707853847.0.0.0",
//       "Referer": "https://canvas.eee.uci.edu/courses/61774/gradebook/speed_grader?assignment_id=1313200&student_id=409398",
//       "Referrer-Policy": "no-referrer-when-downgrade"
//     },
//     data : data
//   };
// }


// Group B

const createGradeRequestConfig = (data) => {
 return {
   method: 'post',
   maxBodyLength: Infinity,
   url: 'https://canvas.eee.uci.edu/courses/61775/rubric_associations/146232/assessments',
   headers: {
    "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
    "accept-language": "en-US,en;q=0.9",
    "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240131.288,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=1249835ef8324b539fde67d26b9ce19e",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sentry-trace": "1249835ef8324b539fde67d26b9ce19e-a59772e2e310c038-0",
    "x-csrf-token": "u9MVhLLxiPCkxaKmeIfAUFT6yBYE/b9+TjREDNJwCNCOn1+3gJLkvJKt7tMK4JMXZIyfUGuZ/BMlBWt9nhU/lQ==",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _gcl_au=1.1.474824460.1702326069; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1706557313.2.0.1706557318.55.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=d025339c9efb2c0373706c20f5650964; _legacy_normandy_session=cEw8i76V5bYAFAeNiqH8qw+z406r_rhLq7deFVbXyxVVrdy0-b2CyQYOZIXdNug3aKC4q6LAGAbbTkx1i9vkwB02Rs-upNgXSoGnzUdxQn8NG0pQVpRCKO6NuzyDAEgUTWHGwbidHintexSBIwUDnGDLnuxU0w50kVE64xSqcED0lrz6rz8NzNIpy_y_uRIdqnEc-oSWF1oUZW7kNMKfUGKzRfNYwBGu5UWTlX__PsfT5N1BB9TWQ12f2Ed3W4uMix4Q6NC_IL_MYgnMGd7xsW_a6dwukp2VYziWjT7F-BzrV60CLTssO4trBSAXiPda8nfnJc10Vx3Bl0XCnTu8VZwRpzGQw3ZTyEwc3AZTA0e9FM0zvV9DtrePDzoP1q2qh69imVW5gvoF2NkbFzU3QLrpuM8gN2uEatelHOdAavyJ-wxQGg_GWVAYz3m1_8pAoE5VQFyJ4ahdJ9IgMgAvIQL2zdLUF49seQ_q5DibN9_fONoXyJbZKCNu3SZ0d8gsoNGays7wLeJgc1CAxQ_wyQyiKry7IWPqwn6nj5K1FhFBu99y9TMa31nyQKbkx8rRzO5ziUJ9Dhr6nVUrTInkzg7GKCcdE1_Qxycl92yhvZmIdlLCq87tgkFMbB3zvQo5mzv7BAtJFI5_y_oKWZpJ4IjDH5gWHjyGx3Dn7W1tycEFsoERejVKjWmWa2FwzuzPbe1aUOpuqpEZyz7yeWlRjJg8EqG0-46PUkdvrMuWpF4Mv73Y8I5HqWg7pDvhtozJBO_eDPpevPxl_6cAbtrh20o1sW2O9amlFgFoB6oVG2mMjtVjnq-I6RM9TqAAWK6TVPcT9AJ63asdsoCUvZ2T1ZgkhZm0wJpRsyEqueCU7F6Eg.BDbzUdaG5b6F4FKGH3jsxlHglDQ.ZcvQ-g; canvas_session=cEw8i76V5bYAFAeNiqH8qw+z406r_rhLq7deFVbXyxVVrdy0-b2CyQYOZIXdNug3aKC4q6LAGAbbTkx1i9vkwB02Rs-upNgXSoGnzUdxQn8NG0pQVpRCKO6NuzyDAEgUTWHGwbidHintexSBIwUDnGDLnuxU0w50kVE64xSqcED0lrz6rz8NzNIpy_y_uRIdqnEc-oSWF1oUZW7kNMKfUGKzRfNYwBGu5UWTlX__PsfT5N1BB9TWQ12f2Ed3W4uMix4Q6NC_IL_MYgnMGd7xsW_a6dwukp2VYziWjT7F-BzrV60CLTssO4trBSAXiPda8nfnJc10Vx3Bl0XCnTu8VZwRpzGQw3ZTyEwc3AZTA0e9FM0zvV9DtrePDzoP1q2qh69imVW5gvoF2NkbFzU3QLrpuM8gN2uEatelHOdAavyJ-wxQGg_GWVAYz3m1_8pAoE5VQFyJ4ahdJ9IgMgAvIQL2zdLUF49seQ_q5DibN9_fONoXyJbZKCNu3SZ0d8gsoNGays7wLeJgc1CAxQ_wyQyiKry7IWPqwn6nj5K1FhFBu99y9TMa31nyQKbkx8rRzO5ziUJ9Dhr6nVUrTInkzg7GKCcdE1_Qxycl92yhvZmIdlLCq87tgkFMbB3zvQo5mzv7BAtJFI5_y_oKWZpJ4IjDH5gWHjyGx3Dn7W1tycEFsoERejVKjWmWa2FwzuzPbe1aUOpuqpEZyz7yeWlRjJg8EqG0-46PUkdvrMuWpF4Mv73Y8I5HqWg7pDvhtozJBO_eDPpevPxl_6cAbtrh20o1sW2O9amlFgFoB6oVG2mMjtVjnq-I6RM9TqAAWK6TVPcT9AJ63asdsoCUvZ2T1ZgkhZm0wJpRsyEqueCU7F6Eg.BDbzUdaG5b6F4FKGH3jsxlHglDQ.ZcvQ-g; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fcanvas.eee.uci.edu%2Fcourses%2F61775%22%2C%22ts%22%3A1707856174405%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2Fcourses%2F61775%2Fgradebook%22%7D; _csrf_token=u9MVhLLxiPCkxaKmeIfAUFT6yBYE%2Fb9%2BTjREDNJwCNCOn1%2B3gJLkvJKt7tMK4JMXZIyfUGuZ%2FBMlBWt9nhU%2FlQ%3D%3D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%226054290619504821%22%2C%22sessionId%22%3A%22842128178270014%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1707855779.144.1.1707856183.0.0.0",
    "Referer": "https://canvas.eee.uci.edu/courses/61775/gradebook/speed_grader?assignment_id=1313247&student_id=410808",
    "Referrer-Policy": "no-referrer-when-downgrade"
   },
   data : data
 };
}




(async () => {
  const grades = await parseGradesInfo();
  let counter = 1;
  for (grade of grades) {
    const data = createGradeRequestData(grade);
    const config = createGradeRequestConfig(data);
    try {
      const response = await axios(config);
      console.log(`${counter}) SUCCESS ${grade.id} ${grade.name}`);
    } catch (e) {
      console.log(`${counter}) FAILURE ${grade.id} ${grade.name}`);
      console.log(grade);
      console.log('----------------------');
    }
    counter++;
  }
})()
