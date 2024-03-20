const fs    = require('fs');
const axios = require('axios');
const csv   = require('csvtojson');

// const gradesCSV = './grades/2023/a1p1/final_a1p1_labA.csv';
const gradesCSV = './grades/2023/a1p1/final_a1p1_labB.csv';

const parseGradesInfo = async (studentsInfo) => {
  const grades = [];
  const gradeList = await csv().fromFile(gradesCSV);
  for (grade of gradeList)
    grades.push({
      // id: studentsInfo[grade['STUDENT ID']],
      id: grade['student_id'],
      name: grade['name'],
      some_code: grade['has_some_code'],
      l_command: grade['l_command'],
      q_command: grade['q_command'],
      decoupled: grade['has_more_than_one_function'],
      git: grade['has_git'],
      readme: grade['has_readme'],
      comment: grade['comment']
    })
  return grades;
}


const createGradeRequestData = (grade) => {
   return `rubric_assessment%5Buser_id%5D=${grade.id}&rubric_assessment%5Bassessment_type%5D=grading&rubric_assessment%5Bcriterion__5923%5D%5Brating_id%5D=blank&rubric_assessment%5Bcriterion__5923%5D%5Bpoints%5D=${grade.some_code}&rubric_assessment%5Bcriterion__5923%5D%5Bdescription%5D=Full+Marks&rubric_assessment%5Bcriterion__5923%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__5923%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__3566%5D%5Brating_id%5D=_136&rubric_assessment%5Bcriterion__3566%5D%5Bpoints%5D=${grade.l_command}&rubric_assessment%5Bcriterion__3566%5D%5Bdescription%5D=Full+Marks&rubric_assessment%5Bcriterion__3566%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__3566%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__2837%5D%5Brating_id%5D=_5775&rubric_assessment%5Bcriterion__2837%5D%5Bpoints%5D=${grade.q_command}&rubric_assessment%5Bcriterion__2837%5D%5Bdescription%5D=Full+Marks&rubric_assessment%5Bcriterion__2837%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__2837%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__5745%5D%5Brating_id%5D=_7857&rubric_assessment%5Bcriterion__5745%5D%5Bpoints%5D=${grade.decoupled}&rubric_assessment%5Bcriterion__5745%5D%5Bdescription%5D=Full+Marks&rubric_assessment%5Bcriterion__5745%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__5745%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__4942%5D%5Brating_id%5D=_2555&rubric_assessment%5Bcriterion__4942%5D%5Bpoints%5D=${grade.git}&rubric_assessment%5Bcriterion__4942%5D%5Bdescription%5D=Full+Marks&rubric_assessment%5Bcriterion__4942%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__4942%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__2719%5D%5Brating_id%5D=_6403&rubric_assessment%5Bcriterion__2719%5D%5Bpoints%5D=${grade.readme}&rubric_assessment%5Bcriterion__2719%5D%5Bdescription%5D=Full+Marks&rubric_assessment%5Bcriterion__2719%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__2719%5D%5Bsave_comment%5D=0&graded_anonymously=false&_method=POST&authenticity_token=o%2FAqAG4sTb1WCKLevyZYTGA56afKy%2F%2FA6lkTL3HRLPCWvGAzXE8h8WBg7qvNQQsLUE%2B%2B4aWvvK2BaDxePbQbtQ%3D%3D`
}

// --------------------------------------------------
// Group A

// const createGradeRequestConfig = (data) => {
//   return {
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: 'https://canvas.eee.uci.edu/courses/61774/rubric_associations/146207/assessments',
//     headers: {
//         "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
//         "accept-language": "en-US,en;q=0.9",
//         "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240131.288,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=a872f37cfea04bf18f9de9512cdabad4",
//         "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//         "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-platform": "\"macOS\"",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         "sentry-trace": "a872f37cfea04bf18f9de9512cdabad4-9d4b8d0951478b39-0",
//         "x-csrf-token": "XryzAoC+ifRBMCkbItvKAAOowQ8mxXPkMVSVmiLpbv1r8Pkxst3luHdYZW5QvJlHM96WSUmhMIlaZbrrboxZuA==",
//         "x-requested-with": "XMLHttpRequest",
//         "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _gcl_au=1.1.474824460.1702326069; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1706557313.2.0.1706557318.55.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=d025339c9efb2c0373706c20f5650964; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _ga_N9H8E14ERR=GS1.1.1707862906.145.0.1707862906.0.0.0; _legacy_normandy_session=fpYtQR9H1JNW76QRH5GPNQ+tZCip2Nhk4ylxyhiegadgzkPlwS6YepMNT6PnoJYPFxsj1YnrYOUk6d5y62AHrfuFQJ1OStqvmy6a9_1WLH8iqpAy3bqghFdXaM3L-r6h0RYO71xaseIN3jNJs33AXUgaWYLuP8BLKVKDjc3e_GOZWeirrBG8k43LQC05610LYxjLPqgX7Q0QxzEIICpiJZPEwhNvQ6Ha5M-D6OIjmYU3AK-bg2xKATQAhpbyM7XoGXmRU0cMSQGjRouk2Q9zL9pR-pbyrpwGvNycFjt_ZftNqrfAwpUcAI9C9811xaWY5rOPIbyR9k_IfXvaB6khzfnFV5PaaVfC0h-n8vuAQPSkrBPtD3_3L0t1Kx1FmpyOs9kPS2SX2HC4ehbKBQymzXVvdjR89uqSNGfEHwZRINuSZNFvDnfotGUggR7aKRe3eW7UPqxQSfMXMbxJ40qtOt6dxvMlJAv89atvM_UMZays4IiPxPMTXj78K-CxzSPYufAdd3VRhJq-_Qp_FnyPGibfJuXxPLMV6k0CFXN5-gCxerPnT1ce9vteGz9qtY37jAsoQzmpZ5uevhCTYA18JU44II7wcda6o2sWF30yNgpW1lur5QnMKMaOsWMGq6pk9G9nmScsshYbwfR451rMEpJW4QtkS9P-hllWVcS-bDK0jMlDREV-n02VrFP01mN9NEOL-ZZfXDnxmJh61KzKCUMVSFSo5dxivryO-mpboIt9AzADHqMmTUclt_UoNbTrkCfkVvsydfTsPKUe0vdeUyg-IMeebwNqxe18JPu4D-FlB9gh64YhzQ7h76a0rzzAPw1SiFj-ZJDaQNoTb_VerQL28rQJjFlxpnRhA2duCDzrw.KHgoVbmOUSPw2NGZUZ2pfQ-MgGY.Zcvreg; canvas_session=fpYtQR9H1JNW76QRH5GPNQ+tZCip2Nhk4ylxyhiegadgzkPlwS6YepMNT6PnoJYPFxsj1YnrYOUk6d5y62AHrfuFQJ1OStqvmy6a9_1WLH8iqpAy3bqghFdXaM3L-r6h0RYO71xaseIN3jNJs33AXUgaWYLuP8BLKVKDjc3e_GOZWeirrBG8k43LQC05610LYxjLPqgX7Q0QxzEIICpiJZPEwhNvQ6Ha5M-D6OIjmYU3AK-bg2xKATQAhpbyM7XoGXmRU0cMSQGjRouk2Q9zL9pR-pbyrpwGvNycFjt_ZftNqrfAwpUcAI9C9811xaWY5rOPIbyR9k_IfXvaB6khzfnFV5PaaVfC0h-n8vuAQPSkrBPtD3_3L0t1Kx1FmpyOs9kPS2SX2HC4ehbKBQymzXVvdjR89uqSNGfEHwZRINuSZNFvDnfotGUggR7aKRe3eW7UPqxQSfMXMbxJ40qtOt6dxvMlJAv89atvM_UMZays4IiPxPMTXj78K-CxzSPYufAdd3VRhJq-_Qp_FnyPGibfJuXxPLMV6k0CFXN5-gCxerPnT1ce9vteGz9qtY37jAsoQzmpZ5uevhCTYA18JU44II7wcda6o2sWF30yNgpW1lur5QnMKMaOsWMGq6pk9G9nmScsshYbwfR451rMEpJW4QtkS9P-hllWVcS-bDK0jMlDREV-n02VrFP01mN9NEOL-ZZfXDnxmJh61KzKCUMVSFSo5dxivryO-mpboIt9AzADHqMmTUclt_UoNbTrkCfkVvsydfTsPKUe0vdeUyg-IMeebwNqxe18JPu4D-FlB9gh64YhzQ7h76a0rzzAPw1SiFj-ZJDaQNoTb_VerQL28rQJjFlxpnRhA2duCDzrw.KHgoVbmOUSPw2NGZUZ2pfQ-MgGY.Zcvreg; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%222334068414065176%22%2C%22sessionId%22%3A%221482104323502979%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fcanvas.eee.uci.edu%2Fcourses%2F61774%2Fgradebook%22%2C%22ts%22%3A1707862906598%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2Fcourses%2F61774%2Fgradebook%2Fspeed_grader%22%2C%22q%22%3A%22%3Fassignment_id%3D1313201%26student_id%3D414417%22%7D; _csrf_token=XryzAoC%2BifRBMCkbItvKAAOowQ8mxXPkMVSVmiLpbv1r8Pkxst3luHdYZW5QvJlHM96WSUmhMIlaZbrrboxZuA%3D%3D",
//         "Referer": "https://canvas.eee.uci.edu/courses/61774/gradebook/speed_grader?assignment_id=1313201&student_id=414417",
//         "Referrer-Policy": "no-referrer-when-downgrade"
//     },
//     data : data
//   };
// }

// const createCommentRequestConfig = (grade) => {
//     return {
//         method: 'put',
//         maxBodyLength: Infinity,
//         url: `https://canvas.eee.uci.edu/courses/61774/assignments/1313201/submissions/${grade.id}`,
//         headers: {
//             "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
//             "accept-language": "en-US,en;q=0.9",
//             "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240131.288,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=a872f37cfea04bf18f9de9512cdabad4",
//             "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//             "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
//             "sec-ch-ua-mobile": "?0",
//             "sec-ch-ua-platform": "\"macOS\"",
//             "sec-fetch-dest": "empty",
//             "sec-fetch-mode": "cors",
//             "sec-fetch-site": "same-origin",
//             "sentry-trace": "a872f37cfea04bf18f9de9512cdabad4-8dbc49bbd0138d99-0",
//             "x-csrf-token": "zBSiZ39G9239B+N7yYNgQc1wYc1dviEJgy3FO439P/L5WOhUTSWbIctvrw675DMG/QY2izLaYmToHOpKwZgItw==",
//             "x-requested-with": "XMLHttpRequest",
//             "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _gcl_au=1.1.474824460.1702326069; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1706557313.2.0.1706557318.55.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=d025339c9efb2c0373706c20f5650964; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fcanvas.eee.uci.edu%2Fcourses%2F61775%22%2C%22ts%22%3A1707856174405%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2Fcourses%2F61775%2Fgradebook%22%7D; _legacy_normandy_session=94nbl0Hn9dB46FgYPrMkGg+Y2XE6hIu3xtE0oYH4xgfsx-jXNCbFJXiMZSuPa7Pp-fUtoKS65PQ3y-9Q8U-xeKeShLmAmHGUXJS6Xixt30nvA7m-OCQ4jhor1So5PsZtLYkLSDgeMdR4D-U0vzcjOahbz6z34wuawq5bqg5C8zq3FPp9cfi0-DNH8ajlduMYU4pjSjB9vEgXiUxUxrQWQa4XAjFLWdvPyNSO8XshRW4wfnF9dq0t4mRzkRCkvjgM104gk7Qq0tXO0-vIcJaM55TpKZf9pP7cW8_q_3QPLctp1cReptnZVNpixPci7xSyQBlpop2XMifPvFOA4jxn-gFIVm7WVcb6TUnO53KIz9P2jP5dNCxQQakwUm6zwXX2mY4KrRMLUm3qzYjp3SXSeljP21Iode040HP6XgPvOcvI1lk7GxHPlxZ6IgM8axzQAgx_sY-PmnMjaUB9zodsZDzM8m-BwU3Xlus9erxIqaMoJynkzMIwgh0CYrIC0WJUmCs5y3Qm9gx-SVbiuPCZn6bND1HOm9-ecPp4xLhoa8d9D-L1ED2_nfXGqofArC4X4Z_X4Z2c6JR7CllJNBt8X7EpocJhZFiYiG-AhFZTIRgrUZp9jVNb8arE6S6cpltYqMA10_DxUyVcQo1sQisjqKY_eTZuHnSo7cUZeeJj0ZGWn3myrTOgqTV3JXsGfPQHXKq829IYGaSjzx5fNQMTdJw73jniWbiMvqkyJPKXwLpN6pSYTFQAPmfC-DbPRVzAnfHx-OARJ3z9E1IGfCiwBswJ4OY1ZdrpPoj66PvLibloOPupPFI9tlYKR6dOwBZ53EJQ7HwlO8Gk9VSti9uLdnZnMThJrqSVSVKLeIoDYGjTw.RGp5R-ZVZXFP5_Q4DyBWM7JZn00.ZcvZgw; canvas_session=94nbl0Hn9dB46FgYPrMkGg+Y2XE6hIu3xtE0oYH4xgfsx-jXNCbFJXiMZSuPa7Pp-fUtoKS65PQ3y-9Q8U-xeKeShLmAmHGUXJS6Xixt30nvA7m-OCQ4jhor1So5PsZtLYkLSDgeMdR4D-U0vzcjOahbz6z34wuawq5bqg5C8zq3FPp9cfi0-DNH8ajlduMYU4pjSjB9vEgXiUxUxrQWQa4XAjFLWdvPyNSO8XshRW4wfnF9dq0t4mRzkRCkvjgM104gk7Qq0tXO0-vIcJaM55TpKZf9pP7cW8_q_3QPLctp1cReptnZVNpixPci7xSyQBlpop2XMifPvFOA4jxn-gFIVm7WVcb6TUnO53KIz9P2jP5dNCxQQakwUm6zwXX2mY4KrRMLUm3qzYjp3SXSeljP21Iode040HP6XgPvOcvI1lk7GxHPlxZ6IgM8axzQAgx_sY-PmnMjaUB9zodsZDzM8m-BwU3Xlus9erxIqaMoJynkzMIwgh0CYrIC0WJUmCs5y3Qm9gx-SVbiuPCZn6bND1HOm9-ecPp4xLhoa8d9D-L1ED2_nfXGqofArC4X4Z_X4Z2c6JR7CllJNBt8X7EpocJhZFiYiG-AhFZTIRgrUZp9jVNb8arE6S6cpltYqMA10_DxUyVcQo1sQisjqKY_eTZuHnSo7cUZeeJj0ZGWn3myrTOgqTV3JXsGfPQHXKq829IYGaSjzx5fNQMTdJw73jniWbiMvqkyJPKXwLpN6pSYTFQAPmfC-DbPRVzAnfHx-OARJ3z9E1IGfCiwBswJ4OY1ZdrpPoj66PvLibloOPupPFI9tlYKR6dOwBZ53EJQ7HwlO8Gk9VSti9uLdnZnMThJrqSVSVKLeIoDYGjTw.RGp5R-ZVZXFP5_Q4DyBWM7JZn00.ZcvZgw; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%222463337262428483%22%2C%22sessionId%22%3A%22842128178270014%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1707855779.144.1.1707858349.0.0.0; _csrf_token=zBSiZ39G9239B%2BN7yYNgQc1wYc1dviEJgy3FO439P%2FL5WOhUTSWbIctvrw675DMG%2FQY2izLaYmToHOpKwZgItw%3D%3D",
//             "Referer": "https://canvas.eee.uci.edu/courses/61774/gradebook/speed_grader?assignment_id=1313201&student_id=414417",
//             "Referrer-Policy": "no-referrer-when-downgrade"
//         },
//         data : `submission%5Bassignment_id%5D=1313201&submission%5Bgroup_comment%5D=0&submission%5Bcomment%5D=${grade.comment}&submission%5Bdraft_comment%5D=false&submission%5Bid%5D=${grade.id}&_method=PUT&authenticity_token=zBSiZ39G9239B%2BN7yYNgQc1wYc1dviEJgy3FO439P%2FL5WOhUTSWbIctvrw675DMG%2FQY2izLaYmToHOpKwZgItw%3D%3D`
//     }
// }


// --------------------------------------------------
// Group B

const createGradeRequestConfig = (data) => {
 return {
   method: 'post',
   maxBodyLength: Infinity,
   url: 'https://canvas.eee.uci.edu/courses/61775/rubric_associations/146233/assessments',
   headers: {
    "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
    "accept-language": "en-US,en;q=0.9",
    "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240131.288,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=ff57ab8543eb41b6bb76c3236da5655a",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sentry-trace": "ff57ab8543eb41b6bb76c3236da5655a-8ba7edad7df378f3-0",
    "x-csrf-token": "q+w1yIQUhYj2jzclHdFPqCDNpKosuH1OwjnV1anyOiqeoH/7tnfpxMDne1BvthzvELvz7EPcPiOpCPqk5ZcNbw==",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _gcl_au=1.1.474824460.1702326069; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1706557313.2.0.1706557318.55.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=d025339c9efb2c0373706c20f5650964; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fcanvas.eee.uci.edu%2Fcourses%2F61774%22%2C%22ts%22%3A1707863591447%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2Fcourses%2F61774%2Fgradebook%22%7D; _legacy_normandy_session=dllEWGV8g5H-4jbY7mv5vw+fc_-uhpe6XVjI0SqeP2ozasS1KpdtZc4wC4hJi78Qe2hZgqNawQR9hhqfHxicgCPuOedI8T9_ezM7MdqdCPJTU9pfoM_CdGxfX8pTGTsdZG-6wzpHPcmcpKexSYn2uZgvartdxgd3Y8s2XHhWxdnTLk2SaRXADcZJpgOEdGJSxuWNUzGYB1VnXsTsjJ4YIRYHjz9rEOWgggQAJZAwW3creiqvwqM2UDp5fIxNFfUswhnJaYN3-gbt1dWTXuXZz34RScsYZE8CKrqN4qXP2Pb0tGIFmkkmnoRwHxqsqRiXLJUIzeLsj5DL3uYlseMsKS-671UY5TM7IgFczebYCqedr8rb_bw_MjC2JpGE5PfFOsaNe3r3YMdZin2cRGWKeoZUTUvNsVpkj-EzIZtV-ihsvm0D8-LV5u45PxP_E_VJ0n1noEaFy-ApiLeOKEV-fc3kd6omB4OUKQxTFeVyEpCYX0b0_PekvgRqPqMMP15DgaKSw0JaZ4tn6h3v5JjRqNaXfWWSE68S-4CauF8x1Qkdjekhvl9U4S2TBTo6JulKG3S1Iqbj4lu0v_zpuzOCoTy1iJecfxLpBKg3TbmnayrEPLB1zJuGIP0zfCSfvId5ifhCkORZjh7E1uaUX_me0JRCW2p_2YFKunnLH1W5NsPbbcY8Bki_uS5cdS3Aawfvq30nGz_NULpHbCiikcnHCYmC0e35EVwK5Nc3RcYi8PyXbpAHg2O18U7tgyae_9Td_urU-3CehIJxIhTzOguQo9gpAj-Locb4tt-cwDnWf54bw-Rb-_2OTw-sNBEfeQndU5ugmN4iyjJ6-FWbyCFVIVzW7hukwADoCjYYHncxols7g.1Coq5aCu_YfawntX0tQez7RNg-w.ZcvwLA; canvas_session=dllEWGV8g5H-4jbY7mv5vw+fc_-uhpe6XVjI0SqeP2ozasS1KpdtZc4wC4hJi78Qe2hZgqNawQR9hhqfHxicgCPuOedI8T9_ezM7MdqdCPJTU9pfoM_CdGxfX8pTGTsdZG-6wzpHPcmcpKexSYn2uZgvartdxgd3Y8s2XHhWxdnTLk2SaRXADcZJpgOEdGJSxuWNUzGYB1VnXsTsjJ4YIRYHjz9rEOWgggQAJZAwW3creiqvwqM2UDp5fIxNFfUswhnJaYN3-gbt1dWTXuXZz34RScsYZE8CKrqN4qXP2Pb0tGIFmkkmnoRwHxqsqRiXLJUIzeLsj5DL3uYlseMsKS-671UY5TM7IgFczebYCqedr8rb_bw_MjC2JpGE5PfFOsaNe3r3YMdZin2cRGWKeoZUTUvNsVpkj-EzIZtV-ihsvm0D8-LV5u45PxP_E_VJ0n1noEaFy-ApiLeOKEV-fc3kd6omB4OUKQxTFeVyEpCYX0b0_PekvgRqPqMMP15DgaKSw0JaZ4tn6h3v5JjRqNaXfWWSE68S-4CauF8x1Qkdjekhvl9U4S2TBTo6JulKG3S1Iqbj4lu0v_zpuzOCoTy1iJecfxLpBKg3TbmnayrEPLB1zJuGIP0zfCSfvId5ifhCkORZjh7E1uaUX_me0JRCW2p_2YFKunnLH1W5NsPbbcY8Bki_uS5cdS3Aawfvq30nGz_NULpHbCiikcnHCYmC0e35EVwK5Nc3RcYi8PyXbpAHg2O18U7tgyae_9Td_urU-3CehIJxIhTzOguQo9gpAj-Locb4tt-cwDnWf54bw-Rb-_2OTw-sNBEfeQndU5ugmN4iyjJ6-FWbyCFVIVzW7hukwADoCjYYHncxols7g.1Coq5aCu_YfawntX0tQez7RNg-w.ZcvwLA; _csrf_token=q%2Bw1yIQUhYj2jzclHdFPqCDNpKosuH1OwjnV1anyOiqeoH%2F7tnfpxMDne1BvthzvELvz7EPcPiOpCPqk5ZcNbw%3D%3D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%223158909051524752%22%2C%22sessionId%22%3A%22172888440017226%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1707862906.145.1.1707864322.0.0.0",
    "Referer": "https://canvas.eee.uci.edu/courses/61775/gradebook/speed_grader?assignment_id=1313248&student_id=410808",
    "Referrer-Policy": "no-referrer-when-downgrade"
   },
   data : data
 };
}

const createCommentRequestConfig = (grade) => {
    return {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://canvas.eee.uci.edu/courses/61775/assignments/1313248/submissions/${grade.id}`,
        headers: {
            "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240131.288,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=ff57ab8543eb41b6bb76c3236da5655a",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sentry-trace": "ff57ab8543eb41b6bb76c3236da5655a-ab7213b92f04ee74-0",
            "x-csrf-token": "FQugopglv40UlcwD6k3lYO4VIH3/pOPDAFmgVFBFTnAgR+qRqkbTwSL9gHaYKrYn3mN3O5DAoK5raI8lHCB5NQ==",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _gcl_au=1.1.474824460.1702326069; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1706557313.2.0.1706557318.55.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=d025339c9efb2c0373706c20f5650964; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fcanvas.eee.uci.edu%2Fcourses%2F61774%22%2C%22ts%22%3A1707863591447%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2Fcourses%2F61774%2Fgradebook%22%7D; _legacy_normandy_session=dllEWGV8g5H-4jbY7mv5vw+fc_-uhpe6XVjI0SqeP2ozasS1KpdtZc4wC4hJi78Qe2hZgqNawQR9hhqfHxicgCPuOedI8T9_ezM7MdqdCPJTU9pfoM_CdGxfX8pTGTsdZG-6wzpHPcmcpKexSYn2uZgvartdxgd3Y8s2XHhWxdnTLk2SaRXADcZJpgOEdGJSxuWNUzGYB1VnXsTsjJ4YIRYHjz9rEOWgggQAJZAwW3creiqvwqM2UDp5fIxNFfUswhnJaYN3-gbt1dWTXuXZz34RScsYZE8CKrqN4qXP2Pb0tGIFmkkmnoRwHxqsqRiXLJUIzeLsj5DL3uYlseMsKS-671UY5TM7IgFczebYCqedr8rb_bw_MjC2JpGE5PfFOsaNe3r3YMdZin2cRGWKeoZUTUvNsVpkj-EzIZtV-ihsvm0D8-LV5u45PxP_E_VJ0n1noEaFy-ApiLeOKEV-fc3kd6omB4OUKQxTFeVyEpCYX0b0_PekvgRqPqMMP15DgaKSw0JaZ4tn6h3v5JjRqNaXfWWSE68S-4CauF8x1Qkdjekhvl9U4S2TBTo6JulKG3S1Iqbj4lu0v_zpuzOCoTy1iJecfxLpBKg3TbmnayrEPLB1zJuGIP0zfCSfvId5ifhCkORZjh7E1uaUX_me0JRCW2p_2YFKunnLH1W5NsPbbcY8Bki_uS5cdS3Aawfvq30nGz_NULpHbCiikcnHCYmC0e35EVwK5Nc3RcYi8PyXbpAHg2O18U7tgyae_9Td_urU-3CehIJxIhTzOguQo9gpAj-Locb4tt-cwDnWf54bw-Rb-_2OTw-sNBEfeQndU5ugmN4iyjJ6-FWbyCFVIVzW7hukwADoCjYYHncxols7g.1Coq5aCu_YfawntX0tQez7RNg-w.ZcvwLA; canvas_session=dllEWGV8g5H-4jbY7mv5vw+fc_-uhpe6XVjI0SqeP2ozasS1KpdtZc4wC4hJi78Qe2hZgqNawQR9hhqfHxicgCPuOedI8T9_ezM7MdqdCPJTU9pfoM_CdGxfX8pTGTsdZG-6wzpHPcmcpKexSYn2uZgvartdxgd3Y8s2XHhWxdnTLk2SaRXADcZJpgOEdGJSxuWNUzGYB1VnXsTsjJ4YIRYHjz9rEOWgggQAJZAwW3creiqvwqM2UDp5fIxNFfUswhnJaYN3-gbt1dWTXuXZz34RScsYZE8CKrqN4qXP2Pb0tGIFmkkmnoRwHxqsqRiXLJUIzeLsj5DL3uYlseMsKS-671UY5TM7IgFczebYCqedr8rb_bw_MjC2JpGE5PfFOsaNe3r3YMdZin2cRGWKeoZUTUvNsVpkj-EzIZtV-ihsvm0D8-LV5u45PxP_E_VJ0n1noEaFy-ApiLeOKEV-fc3kd6omB4OUKQxTFeVyEpCYX0b0_PekvgRqPqMMP15DgaKSw0JaZ4tn6h3v5JjRqNaXfWWSE68S-4CauF8x1Qkdjekhvl9U4S2TBTo6JulKG3S1Iqbj4lu0v_zpuzOCoTy1iJecfxLpBKg3TbmnayrEPLB1zJuGIP0zfCSfvId5ifhCkORZjh7E1uaUX_me0JRCW2p_2YFKunnLH1W5NsPbbcY8Bki_uS5cdS3Aawfvq30nGz_NULpHbCiikcnHCYmC0e35EVwK5Nc3RcYi8PyXbpAHg2O18U7tgyae_9Td_urU-3CehIJxIhTzOguQo9gpAj-Locb4tt-cwDnWf54bw-Rb-_2OTw-sNBEfeQndU5ugmN4iyjJ6-FWbyCFVIVzW7hukwADoCjYYHncxols7g.1Coq5aCu_YfawntX0tQez7RNg-w.ZcvwLA; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%223158909051524752%22%2C%22sessionId%22%3A%22172888440017226%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1707862906.145.1.1707864322.0.0.0; _csrf_token=FQugopglv40UlcwD6k3lYO4VIH3%2FpOPDAFmgVFBFTnAgR%2BqRqkbTwSL9gHaYKrYn3mN3O5DAoK5raI8lHCB5NQ%3D%3D",
            "Referer": "https://canvas.eee.uci.edu/courses/61775/gradebook/speed_grader?assignment_id=1313248&student_id=410808",
            "Referrer-Policy": "no-referrer-when-downgrade"
        },
        data : `submission%5Bassignment_id%5D=1313201&submission%5Bgroup_comment%5D=0&submission%5Bcomment%5D=${grade.comment}&submission%5Bdraft_comment%5D=false&submission%5Bid%5D=${grade.id}&_method=PUT&authenticity_token=zBSiZ39G9239B%2BN7yYNgQc1wYc1dviEJgy3FO439P%2FL5WOhUTSWbIctvrw675DMG%2FQY2izLaYmToHOpKwZgItw%3D%3D`
    }
}
// --------------------------------------------------


(async () => {
  const grades = await parseGradesInfo();
  let counter = 1;
  for (grade of grades) {
    const data = createGradeRequestData(grade);
    const config = createGradeRequestConfig(data);
    const commentConfig = createCommentRequestConfig(grade);
    try {
      const response = await axios(config);
      console.log(`${counter}) SUCCESS ${grade.id} ${grade.name}`);

      try {
        const commentResponse = await axios(commentConfig);
        console.log(`${counter}) COMMENT_SUCCESS ${grade.id} ${grade.name}`);
      } catch (e) {
        console.log(`${counter}) COMMENT_FAILURE ${grade.id} ${grade.name}`);
        console.log(grade.comment);
        console.log('----------------------');
      }
    
    } catch (e) {
      console.log(`${counter}) FAILURE ${grade.id} ${grade.name}`);
      console.log(grade);
      console.log('----------------------');
    }

    counter++;
  }
})()