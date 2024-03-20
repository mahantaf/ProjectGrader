const fs    = require('fs');
const axios = require('axios');
const csv   = require('csvtojson');
const path = require('path');

// const gradesCSV = '../grades/2023/a1p2/final_a1p2_labA.csv';
const gradesCSV = '../grades/2023/a1p2/final_a1p2_labB.csv';

const parseGradesInfo = async (studentsInfo) => {
  const grades = [];
  const gradeList = await csv().fromFile(path.join(__dirname, gradesCSV));
  for (grade of gradeList)
    grades.push({
      id: grade['canvasID'],
      name: grade['name'],
      score: grade['score'],
      comment: grade['remarks']
    })
  return grades;
}


const createGradeRequestData = (grade) => {
   return `submission%5Bassignment_id%5D=1313249&submission%5Buser_id%5D=${grade.id}&submission%5Bgraded_anonymously%5D=false&originator=speed_grader&submission%5Bgrade%5D=${grade.score}&_method=POST&authenticity_token=DR6yqaIpPY2fswS2a8m%2B7Tzxvjhrkf8aKydpNylhfjw8KcPv5U1U18mYft0K%2FcTecLP3VAf4p24AbhNaXgIddQ%3D%3D`
}

// --------------------------------------------------
// Group A

// const createGradeRequestConfig = (data) => {
//   return {
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: 'https://canvas.eee.uci.edu/courses/61774/gradebook/update_submission',
//     headers: {
//       "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
//       "accept-language": "en-US,en;q=0.9",
//       "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240214.327,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=5a76f41c615849989139d34b28b1a595",
//       "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//       "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
//       "sec-ch-ua-mobile": "?0",
//       "sec-ch-ua-platform": "\"macOS\"",
//       "sec-fetch-dest": "empty",
//       "sec-fetch-mode": "cors",
//       "sec-fetch-site": "same-origin",
//       "sentry-trace": "5a76f41c615849989139d34b28b1a595-b5bfc1137163174a-0",
//       "x-csrf-token": "9S9TUngBgiWeNB4guVdgOvTY/7d/xMQH51ga0s8cSmzEGCIUP2Xrf8gfZEvYYxoJuJq22xOtnHPMEWC/uH8pJQ==",
//       "x-requested-with": "XMLHttpRequest",
//       "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _gcl_au=1.1.474824460.1702326069; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=67719ef11f2e266a7f3eff42d1e084c5; _legacy_normandy_session=eml7X8H0QFGRPcdRS1u-bw+30sHyRqe-19_WfdB-JusXHshydQLwm2c1Org02QV3RFkGv90dc6gVWW1K_GqmdxvWXIumbGkdy_I2LMrveGvn7EiJb_i1itlebH3lG6sIRmE84GWER2Cme6KW_e6bUBviB-pO5-AHgAnYO5hzSrWqIfC7cUEjn2CZa2dn3ZV72WzcrS0DuHAWeN6X_kHe3RUf1TpqjX6QYA8pQZJjfo3QwlanMHNnL7FgcaklC1CcK7VdfCIbNl1wG8WaPyKk5ppxB0RrH4_PPH2uFa1XuCCXmREamTchOZ8UgCEaP4ZRSRaaBDr1rkWdLvaEp0MyQ-PRgEgAHOI6hL_g2oefnUin37QVRB0VQ8gfyGUBGSPQMlWweDvMxp7IYc6BkPC6TpoT95Bg7I_0RWELBtfKsO3DL4uNU7e3XzG6lnr1EW4AwcZhyXKwkQCrKy_7LtjaHEr2t7CqmeCWaHJU0u0Zs4dFgIf44xLxYa5A5qqmx0P9I5sh4WLEe1BdK3n5dycEyaWTLVdqyd1iPD1vqTakqX_QOVtwn1txh3WiRz3vlntCZu0TEYgUJM7HFf7cZaPh2S0J3b7wCbRatdNZM8QU3oNUMDXsP_WDppLN0uOO1_ZAdoDrcKEt_HkWmDg8bgH2m0sjI0dU2f3tj8NByL_8CmnhyopOX9wHD91ohG_atj1njAAuvJ7imuBPcHAfIvwEynKzedWglxzFeRuknSM4Ou_7tsA_Cx12du0ep2Ci7T1urfnDSfPK4Tbfm_xytutyOSxrElUstZaahGJdD40GyPN9YceExhV78ccdUBzuv7w2DVoIm7S1MrqmKPBLbfeg-wgEIEkES7O_GeMKXSra5HPUw.iHPE7Mwr4o_LVYbd3dcSKtPPgwg.Zdg_sA; canvas_session=eml7X8H0QFGRPcdRS1u-bw+30sHyRqe-19_WfdB-JusXHshydQLwm2c1Org02QV3RFkGv90dc6gVWW1K_GqmdxvWXIumbGkdy_I2LMrveGvn7EiJb_i1itlebH3lG6sIRmE84GWER2Cme6KW_e6bUBviB-pO5-AHgAnYO5hzSrWqIfC7cUEjn2CZa2dn3ZV72WzcrS0DuHAWeN6X_kHe3RUf1TpqjX6QYA8pQZJjfo3QwlanMHNnL7FgcaklC1CcK7VdfCIbNl1wG8WaPyKk5ppxB0RrH4_PPH2uFa1XuCCXmREamTchOZ8UgCEaP4ZRSRaaBDr1rkWdLvaEp0MyQ-PRgEgAHOI6hL_g2oefnUin37QVRB0VQ8gfyGUBGSPQMlWweDvMxp7IYc6BkPC6TpoT95Bg7I_0RWELBtfKsO3DL4uNU7e3XzG6lnr1EW4AwcZhyXKwkQCrKy_7LtjaHEr2t7CqmeCWaHJU0u0Zs4dFgIf44xLxYa5A5qqmx0P9I5sh4WLEe1BdK3n5dycEyaWTLVdqyd1iPD1vqTakqX_QOVtwn1txh3WiRz3vlntCZu0TEYgUJM7HFf7cZaPh2S0J3b7wCbRatdNZM8QU3oNUMDXsP_WDppLN0uOO1_ZAdoDrcKEt_HkWmDg8bgH2m0sjI0dU2f3tj8NByL_8CmnhyopOX9wHD91ohG_atj1njAAuvJ7imuBPcHAfIvwEynKzedWglxzFeRuknSM4Ou_7tsA_Cx12du0ep2Ci7T1urfnDSfPK4Tbfm_xytutyOSxrElUstZaahGJdD40GyPN9YceExhV78ccdUBzuv7w2DVoIm7S1MrqmKPBLbfeg-wgEIEkES7O_GeMKXSra5HPUw.iHPE7Mwr4o_LVYbd3dcSKtPPgwg.Zdg_sA; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fcanvas.eee.uci.edu%2Fcourses%2F61775%22%2C%22ts%22%3A1708670904139%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2Fcourses%2F61775%2Fgradebook%22%7D; _csrf_token=9S9TUngBgiWeNB4guVdgOvTY%2F7d%2FxMQH51ga0s8cSmzEGCIUP2Xrf8gfZEvYYxoJuJq22xOtnHPMEWC%2FuH8pJQ%3D%3D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%227441793351168146%22%2C%22sessionId%22%3A%226107010773925319%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1708669148.149.1.1708670927.0.0.0",
//       "Referer": "https://canvas.eee.uci.edu/courses/61774/gradebook/speed_grader?assignment_id=1313202&student_id=409398",
//       "Referrer-Policy": "no-referrer-when-downgrade"
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
//           "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
//           "accept-language": "en-US,en;q=0.9",
//           "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240214.327,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=5a76f41c615849989139d34b28b1a595",
//           "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//           "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
//           "sec-ch-ua-mobile": "?0",
//           "sec-ch-ua-platform": "\"macOS\"",
//           "sec-fetch-dest": "empty",
//           "sec-fetch-mode": "cors",
//           "sec-fetch-site": "same-origin",
//           "sentry-trace": "5a76f41c615849989139d34b28b1a595-9f253196a7795c13-0",
//           "x-csrf-token": "i8FHDvJqwdCSR911xOaeNoqkV3s50/gbYwiqbKXlaUG69jZItQ6oisRspx6l0uQFxuYeF1W6oG9IQdAB0oYKCA==",
//           "x-requested-with": "XMLHttpRequest",
//           "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _gcl_au=1.1.474824460.1702326069; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=67719ef11f2e266a7f3eff42d1e084c5; _legacy_normandy_session=eml7X8H0QFGRPcdRS1u-bw+30sHyRqe-19_WfdB-JusXHshydQLwm2c1Org02QV3RFkGv90dc6gVWW1K_GqmdxvWXIumbGkdy_I2LMrveGvn7EiJb_i1itlebH3lG6sIRmE84GWER2Cme6KW_e6bUBviB-pO5-AHgAnYO5hzSrWqIfC7cUEjn2CZa2dn3ZV72WzcrS0DuHAWeN6X_kHe3RUf1TpqjX6QYA8pQZJjfo3QwlanMHNnL7FgcaklC1CcK7VdfCIbNl1wG8WaPyKk5ppxB0RrH4_PPH2uFa1XuCCXmREamTchOZ8UgCEaP4ZRSRaaBDr1rkWdLvaEp0MyQ-PRgEgAHOI6hL_g2oefnUin37QVRB0VQ8gfyGUBGSPQMlWweDvMxp7IYc6BkPC6TpoT95Bg7I_0RWELBtfKsO3DL4uNU7e3XzG6lnr1EW4AwcZhyXKwkQCrKy_7LtjaHEr2t7CqmeCWaHJU0u0Zs4dFgIf44xLxYa5A5qqmx0P9I5sh4WLEe1BdK3n5dycEyaWTLVdqyd1iPD1vqTakqX_QOVtwn1txh3WiRz3vlntCZu0TEYgUJM7HFf7cZaPh2S0J3b7wCbRatdNZM8QU3oNUMDXsP_WDppLN0uOO1_ZAdoDrcKEt_HkWmDg8bgH2m0sjI0dU2f3tj8NByL_8CmnhyopOX9wHD91ohG_atj1njAAuvJ7imuBPcHAfIvwEynKzedWglxzFeRuknSM4Ou_7tsA_Cx12du0ep2Ci7T1urfnDSfPK4Tbfm_xytutyOSxrElUstZaahGJdD40GyPN9YceExhV78ccdUBzuv7w2DVoIm7S1MrqmKPBLbfeg-wgEIEkES7O_GeMKXSra5HPUw.iHPE7Mwr4o_LVYbd3dcSKtPPgwg.Zdg_sA; canvas_session=eml7X8H0QFGRPcdRS1u-bw+30sHyRqe-19_WfdB-JusXHshydQLwm2c1Org02QV3RFkGv90dc6gVWW1K_GqmdxvWXIumbGkdy_I2LMrveGvn7EiJb_i1itlebH3lG6sIRmE84GWER2Cme6KW_e6bUBviB-pO5-AHgAnYO5hzSrWqIfC7cUEjn2CZa2dn3ZV72WzcrS0DuHAWeN6X_kHe3RUf1TpqjX6QYA8pQZJjfo3QwlanMHNnL7FgcaklC1CcK7VdfCIbNl1wG8WaPyKk5ppxB0RrH4_PPH2uFa1XuCCXmREamTchOZ8UgCEaP4ZRSRaaBDr1rkWdLvaEp0MyQ-PRgEgAHOI6hL_g2oefnUin37QVRB0VQ8gfyGUBGSPQMlWweDvMxp7IYc6BkPC6TpoT95Bg7I_0RWELBtfKsO3DL4uNU7e3XzG6lnr1EW4AwcZhyXKwkQCrKy_7LtjaHEr2t7CqmeCWaHJU0u0Zs4dFgIf44xLxYa5A5qqmx0P9I5sh4WLEe1BdK3n5dycEyaWTLVdqyd1iPD1vqTakqX_QOVtwn1txh3WiRz3vlntCZu0TEYgUJM7HFf7cZaPh2S0J3b7wCbRatdNZM8QU3oNUMDXsP_WDppLN0uOO1_ZAdoDrcKEt_HkWmDg8bgH2m0sjI0dU2f3tj8NByL_8CmnhyopOX9wHD91ohG_atj1njAAuvJ7imuBPcHAfIvwEynKzedWglxzFeRuknSM4Ou_7tsA_Cx12du0ep2Ci7T1urfnDSfPK4Tbfm_xytutyOSxrElUstZaahGJdD40GyPN9YceExhV78ccdUBzuv7w2DVoIm7S1MrqmKPBLbfeg-wgEIEkES7O_GeMKXSra5HPUw.iHPE7Mwr4o_LVYbd3dcSKtPPgwg.Zdg_sA; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fcanvas.eee.uci.edu%2Fcourses%2F61775%22%2C%22ts%22%3A1708670904139%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2Fcourses%2F61775%2Fgradebook%22%7D; _csrf_token=i8FHDvJqwdCSR911xOaeNoqkV3s50%2FgbYwiqbKXlaUG69jZItQ6oisRspx6l0uQFxuYeF1W6oG9IQdAB0oYKCA%3D%3D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%223681280806549359%22%2C%22sessionId%22%3A%226107010773925319%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1708669148.149.1.1708670941.0.0.0",
//           "Referer": "https://canvas.eee.uci.edu/courses/61774/gradebook/speed_grader?assignment_id=1313202&student_id=409398",
//           "Referrer-Policy": "no-referrer-when-downgrade"
//         },
//         data : `submission%5Bassignment_id%5D=1313202&submission%5Bgroup_comment%5D=0&submission%5Bcomment%5D=${grade.comment}&submission%5Bdraft_comment%5D=false&submission%5Bid%5D=${grade.id}&_method=PUT&authenticity_token=zBSiZ39G9239B%2BN7yYNgQc1wYc1dviEJgy3FO439P%2FL5WOhUTSWbIctvrw675DMG%2FQY2izLaYmToHOpKwZgItw%3D%3D`
//     }
// }


// --------------------------------------------------
// Group B

const createGradeRequestConfig = (data) => {
 return {
   method: 'post',
   maxBodyLength: Infinity,
   url: 'https://canvas.eee.uci.edu/courses/61775/gradebook/update_submission',
   headers: {
    "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
    "accept-language": "en-US,en;q=0.9",
    "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240214.327,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=e82aff62a79b4dc29908320ff237a2e4",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sentry-trace": "e82aff62a79b4dc29908320ff237a2e4-a4b9db0f7a274dfa-0",
    "x-csrf-token": "DR6yqaIpPY2fswS2a8m+7Tzxvjhrkf8aKydpNylhfjw8KcPv5U1U18mYft0K/cTecLP3VAf4p24AbhNaXgIddQ==",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _gcl_au=1.1.474824460.1702326069; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=67719ef11f2e266a7f3eff42d1e084c5; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fcanvas.eee.uci.edu%2Fcourses%2F61775%22%2C%22ts%22%3A1708670904139%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2Fcourses%2F61775%2Fgradebook%22%7D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%228977823350751565%22%2C%22sessionId%22%3A%226107010773925319%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1708669148.149.1.1708672057.0.0.0; _csrf_token=DR6yqaIpPY2fswS2a8m%2B7Tzxvjhrkf8aKydpNylhfjw8KcPv5U1U18mYft0K%2FcTecLP3VAf4p24AbhNaXgIddQ%3D%3D; _legacy_normandy_session=PZNY9u8sOAnBPKcww-Ql7w+5xKllIOZqfaTZwleYSuCCteFNelkuiPQE3ojAPXmA7BSev2i6VdCxFMYmYPaHwMSO0SQCuwpju-mKPEmTGtEuXKdDXRGbgBkabxiPiToiu6PYVR_727vLPgz6TJirTUkyEhTwSZED2xdQh2DcZy8m4YSuuP2836aeDPuPHfwyRA8AS1-Tm4CQ99Ua7siIT8cZvArJb6ouiquNg5x_3oLU1bwHm1cUsXeCbsnHmUc62xxQuo0sOUF3Nhh-DAqoBlQ8SdthTTR4eSuCQE8jE2rNPpF12uqzBYzxyQLsIGM65jY_o8n46EOntL_OFzcr7JIKEN7IcDBcr8DdDPKNxXxfIpx0GN4PKcL3HtYx9oI97Sy-_SLpdjWO826KhPX3fqyAOV_XlEV5Uyw2c-3jRrNwduAGqEKR9FzCB-72Af93mbP5X2cMNsHVVlwIv-Ocf2hHjPnwSDkpD6jgcrKLYy-bptOwh5E9WpZZZptc7nfv7rIizZpJ2nw5gqsXOze97R1o7GzvS9FZVSHJ4zPtAg3GzIwocISWRVyVLpgPlVNuhAK3TCWSaGKqwK-UnteCvVPjlXdK7t8PM7oZ8O66YHaN2uL8HJVdvJcOVL5AlV_dZa7nJg9_n7lxoirQlilVsRIdouY_X2QAg5QqQfi2S0NmXMjwibWa9nXpzNUHrEy0mW9cSF9B8uUxeAHekeb56Jz_DA8ub32Od8v4pXsEx97F10kOgaQtF8eu-qwbpwLa43pzGJ0Y3AowI4VjR3djjOhrDdClg26jtcRB7edl0BGFDxexjZ1qudc_8kDo7JGGSiQsJGwW-DdjvBnSRciQIwwpHLOT3ieulnyKN_f9pr73g.Xze1G_1xPBxq6ptiQgymxb14O3s.ZdhFtw; canvas_session=PZNY9u8sOAnBPKcww-Ql7w+5xKllIOZqfaTZwleYSuCCteFNelkuiPQE3ojAPXmA7BSev2i6VdCxFMYmYPaHwMSO0SQCuwpju-mKPEmTGtEuXKdDXRGbgBkabxiPiToiu6PYVR_727vLPgz6TJirTUkyEhTwSZED2xdQh2DcZy8m4YSuuP2836aeDPuPHfwyRA8AS1-Tm4CQ99Ua7siIT8cZvArJb6ouiquNg5x_3oLU1bwHm1cUsXeCbsnHmUc62xxQuo0sOUF3Nhh-DAqoBlQ8SdthTTR4eSuCQE8jE2rNPpF12uqzBYzxyQLsIGM65jY_o8n46EOntL_OFzcr7JIKEN7IcDBcr8DdDPKNxXxfIpx0GN4PKcL3HtYx9oI97Sy-_SLpdjWO826KhPX3fqyAOV_XlEV5Uyw2c-3jRrNwduAGqEKR9FzCB-72Af93mbP5X2cMNsHVVlwIv-Ocf2hHjPnwSDkpD6jgcrKLYy-bptOwh5E9WpZZZptc7nfv7rIizZpJ2nw5gqsXOze97R1o7GzvS9FZVSHJ4zPtAg3GzIwocISWRVyVLpgPlVNuhAK3TCWSaGKqwK-UnteCvVPjlXdK7t8PM7oZ8O66YHaN2uL8HJVdvJcOVL5AlV_dZa7nJg9_n7lxoirQlilVsRIdouY_X2QAg5QqQfi2S0NmXMjwibWa9nXpzNUHrEy0mW9cSF9B8uUxeAHekeb56Jz_DA8ub32Od8v4pXsEx97F10kOgaQtF8eu-qwbpwLa43pzGJ0Y3AowI4VjR3djjOhrDdClg26jtcRB7edl0BGFDxexjZ1qudc_8kDo7JGGSiQsJGwW-DdjvBnSRciQIwwpHLOT3ieulnyKN_f9pr73g.Xze1G_1xPBxq6ptiQgymxb14O3s.ZdhFtw",
    "Referer": "https://canvas.eee.uci.edu/courses/61775/gradebook/speed_grader?assignment_id=1313249&student_id=412027",
    "Referrer-Policy": "no-referrer-when-downgrade"
   },
   data : data
 };
}

const createCommentRequestConfig = (grade) => {
    return {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://canvas.eee.uci.edu/courses/61775/assignments/1313249/submissions/${grade.id}`,
        headers: {
          "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
          "accept-language": "en-US,en;q=0.9",
          "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240214.327,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=e82aff62a79b4dc29908320ff237a2e4",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"macOS\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "sentry-trace": "e82aff62a79b4dc29908320ff237a2e4-91ad8405c43bfea1-0",
          "x-csrf-token": "anJCWOV5u+10vTtNQ6EXiPBy2pE/laXb/5zkuecQFi5bRTMeoh3StyKWQSYilW27vDCT/VP8/a/U1Z7UkHN1Zw==",
          "x-requested-with": "XMLHttpRequest",
          "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _gcl_au=1.1.474824460.1702326069; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=67719ef11f2e266a7f3eff42d1e084c5; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fcanvas.eee.uci.edu%2Fcourses%2F61775%22%2C%22ts%22%3A1708670904139%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2Fcourses%2F61775%2Fgradebook%22%7D; _legacy_normandy_session=h8MnHvYiCjoq1kklXnMXtA+kxH8Ii1v-D5tds-jjk-ppcTzX8Il-hE59rWJbiJzX4GbcVsQUTVQ1U4glR-rnJBlyP47dgwHk098E_8mCxdR-gu9Wury3Hi8e3aTHia0d5yW0c0XsGljtGFk0oK7kRNr6icg9ZHnmUXV3nwptxOpkYhgq9TKHLdQkdsANVWgjKjUJuXCI3isqKx7bUTiY3_e59I0AfCJAMZGi9Cz-SpJSNxMvkpLmaszmczdFfZFC9OwZJFTjk4_POO4_WUy3XMw9Ipy7OumC4z19II0-Zpk3D64TF89yolHSbj6Oulip_6CHEswlYoR7ckyYNeJ2xUWo0_8ocpfDuPRcE02VAosed-i6VFG5Inv3tYF6iKuq55tOlfa9J1GFAIHWgaeolYcqAJdt4mkZ6mkW_2Exhzffwo4XQXJq2J6CLJb22_Zdh0Df9D9mChNa-HFtiEYhW5jeVPY6lkdmeYzp-lUypA1WyvtdGYVHLpdymNGUqz0_MgiGqWsNjiVlHZzpu8ByaqJhzo-zqlKavsUou_lSlp0FEQxfH4ZcyxKk4Ei4ylwZwinO8PMwPVj4T2DXFLDbQaJtBM1JQ97Y9OIJK98IVt_LT8MKcGykt_acculuIB92IHBOqWrB1J1sisMNj-NEvf2T_LtoWyHbaeVxGdeY5wUx3cN5Y-3nYISL_xdGOOn82TJzzVK7WAk7-h2_u87Gx9Q3LwOpAApOJSKap0U2B5tlFOCRCdNfZEgkHRo4fF6tLRE1n5GDeEEAdBJSc-r_fFDiqvHbDsCUfMNl_Ovw03J7oKq1GcfvCt4QHdZHk_dhtBwGK0dIb2nKy716_dz0Xx_oLq9JLw45Mq_GoG7VuAj7Q.vI4uAT0DV0ZZecuvkuSWmwtVl98.ZdhCrA; canvas_session=h8MnHvYiCjoq1kklXnMXtA+kxH8Ii1v-D5tds-jjk-ppcTzX8Il-hE59rWJbiJzX4GbcVsQUTVQ1U4glR-rnJBlyP47dgwHk098E_8mCxdR-gu9Wury3Hi8e3aTHia0d5yW0c0XsGljtGFk0oK7kRNr6icg9ZHnmUXV3nwptxOpkYhgq9TKHLdQkdsANVWgjKjUJuXCI3isqKx7bUTiY3_e59I0AfCJAMZGi9Cz-SpJSNxMvkpLmaszmczdFfZFC9OwZJFTjk4_POO4_WUy3XMw9Ipy7OumC4z19II0-Zpk3D64TF89yolHSbj6Oulip_6CHEswlYoR7ckyYNeJ2xUWo0_8ocpfDuPRcE02VAosed-i6VFG5Inv3tYF6iKuq55tOlfa9J1GFAIHWgaeolYcqAJdt4mkZ6mkW_2Exhzffwo4XQXJq2J6CLJb22_Zdh0Df9D9mChNa-HFtiEYhW5jeVPY6lkdmeYzp-lUypA1WyvtdGYVHLpdymNGUqz0_MgiGqWsNjiVlHZzpu8ByaqJhzo-zqlKavsUou_lSlp0FEQxfH4ZcyxKk4Ei4ylwZwinO8PMwPVj4T2DXFLDbQaJtBM1JQ97Y9OIJK98IVt_LT8MKcGykt_acculuIB92IHBOqWrB1J1sisMNj-NEvf2T_LtoWyHbaeVxGdeY5wUx3cN5Y-3nYISL_xdGOOn82TJzzVK7WAk7-h2_u87Gx9Q3LwOpAApOJSKap0U2B5tlFOCRCdNfZEgkHRo4fF6tLRE1n5GDeEEAdBJSc-r_fFDiqvHbDsCUfMNl_Ovw03J7oKq1GcfvCt4QHdZHk_dhtBwGK0dIb2nKy716_dz0Xx_oLq9JLw45Mq_GoG7VuAj7Q.vI4uAT0DV0ZZecuvkuSWmwtVl98.ZdhCrA; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%222678070256388751%22%2C%22sessionId%22%3A%226107010773925319%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1708669148.149.1.1708671831.0.0.0; _csrf_token=anJCWOV5u%2B10vTtNQ6EXiPBy2pE%2FlaXb%2F5zkuecQFi5bRTMeoh3StyKWQSYilW27vDCT%2FVP8%2Fa%2FU1Z7UkHN1Zw%3D%3D",
          "Referer": "https://canvas.eee.uci.edu/courses/61775/gradebook/speed_grader?assignment_id=1313249&student_id=412027",
          "Referrer-Policy": "no-referrer-when-downgrade"
        },
        data : `submission%5Bassignment_id%5D=1313249&submission%5Bgroup_comment%5D=0&submission%5Bcomment%5D=${grade.comment}&submission%5Bdraft_comment%5D=false&submission%5Bid%5D=${grade.id}&_method=PUT&authenticity_token=zBSiZ39G9239B%2BN7yYNgQc1wYc1dviEJgy3FO439P%2FL5WOhUTSWbIctvrw675DMG%2FQY2izLaYmToHOpKwZgItw%3D%3D`
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
      // console.log(grade);
      console.log(e);
      console.log('----------------------');
    }

    counter++;
  }
})()


// fetch("https://canvas.eee.uci.edu/courses/61775/gradebook/update_submission", {
//   "headers": {
//     "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
//     "accept-language": "en-US,en;q=0.9",
//     "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240214.327,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=e82aff62a79b4dc29908320ff237a2e4",
//     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//     "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-ch-ua-platform": "\"macOS\"",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "sentry-trace": "e82aff62a79b4dc29908320ff237a2e4-a4b9db0f7a274dfa-0",
//     "x-csrf-token": "DR6yqaIpPY2fswS2a8m+7Tzxvjhrkf8aKydpNylhfjw8KcPv5U1U18mYft0K/cTecLP3VAf4p24AbhNaXgIddQ==",
//     "x-requested-with": "XMLHttpRequest",
//     "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _gcl_au=1.1.474824460.1702326069; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=67719ef11f2e266a7f3eff42d1e084c5; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fcanvas.eee.uci.edu%2Fcourses%2F61775%22%2C%22ts%22%3A1708670904139%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2Fcourses%2F61775%2Fgradebook%22%7D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%228977823350751565%22%2C%22sessionId%22%3A%226107010773925319%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1708669148.149.1.1708672057.0.0.0; _csrf_token=DR6yqaIpPY2fswS2a8m%2B7Tzxvjhrkf8aKydpNylhfjw8KcPv5U1U18mYft0K%2FcTecLP3VAf4p24AbhNaXgIddQ%3D%3D; _legacy_normandy_session=PZNY9u8sOAnBPKcww-Ql7w+5xKllIOZqfaTZwleYSuCCteFNelkuiPQE3ojAPXmA7BSev2i6VdCxFMYmYPaHwMSO0SQCuwpju-mKPEmTGtEuXKdDXRGbgBkabxiPiToiu6PYVR_727vLPgz6TJirTUkyEhTwSZED2xdQh2DcZy8m4YSuuP2836aeDPuPHfwyRA8AS1-Tm4CQ99Ua7siIT8cZvArJb6ouiquNg5x_3oLU1bwHm1cUsXeCbsnHmUc62xxQuo0sOUF3Nhh-DAqoBlQ8SdthTTR4eSuCQE8jE2rNPpF12uqzBYzxyQLsIGM65jY_o8n46EOntL_OFzcr7JIKEN7IcDBcr8DdDPKNxXxfIpx0GN4PKcL3HtYx9oI97Sy-_SLpdjWO826KhPX3fqyAOV_XlEV5Uyw2c-3jRrNwduAGqEKR9FzCB-72Af93mbP5X2cMNsHVVlwIv-Ocf2hHjPnwSDkpD6jgcrKLYy-bptOwh5E9WpZZZptc7nfv7rIizZpJ2nw5gqsXOze97R1o7GzvS9FZVSHJ4zPtAg3GzIwocISWRVyVLpgPlVNuhAK3TCWSaGKqwK-UnteCvVPjlXdK7t8PM7oZ8O66YHaN2uL8HJVdvJcOVL5AlV_dZa7nJg9_n7lxoirQlilVsRIdouY_X2QAg5QqQfi2S0NmXMjwibWa9nXpzNUHrEy0mW9cSF9B8uUxeAHekeb56Jz_DA8ub32Od8v4pXsEx97F10kOgaQtF8eu-qwbpwLa43pzGJ0Y3AowI4VjR3djjOhrDdClg26jtcRB7edl0BGFDxexjZ1qudc_8kDo7JGGSiQsJGwW-DdjvBnSRciQIwwpHLOT3ieulnyKN_f9pr73g.Xze1G_1xPBxq6ptiQgymxb14O3s.ZdhFtw; canvas_session=PZNY9u8sOAnBPKcww-Ql7w+5xKllIOZqfaTZwleYSuCCteFNelkuiPQE3ojAPXmA7BSev2i6VdCxFMYmYPaHwMSO0SQCuwpju-mKPEmTGtEuXKdDXRGbgBkabxiPiToiu6PYVR_727vLPgz6TJirTUkyEhTwSZED2xdQh2DcZy8m4YSuuP2836aeDPuPHfwyRA8AS1-Tm4CQ99Ua7siIT8cZvArJb6ouiquNg5x_3oLU1bwHm1cUsXeCbsnHmUc62xxQuo0sOUF3Nhh-DAqoBlQ8SdthTTR4eSuCQE8jE2rNPpF12uqzBYzxyQLsIGM65jY_o8n46EOntL_OFzcr7JIKEN7IcDBcr8DdDPKNxXxfIpx0GN4PKcL3HtYx9oI97Sy-_SLpdjWO826KhPX3fqyAOV_XlEV5Uyw2c-3jRrNwduAGqEKR9FzCB-72Af93mbP5X2cMNsHVVlwIv-Ocf2hHjPnwSDkpD6jgcrKLYy-bptOwh5E9WpZZZptc7nfv7rIizZpJ2nw5gqsXOze97R1o7GzvS9FZVSHJ4zPtAg3GzIwocISWRVyVLpgPlVNuhAK3TCWSaGKqwK-UnteCvVPjlXdK7t8PM7oZ8O66YHaN2uL8HJVdvJcOVL5AlV_dZa7nJg9_n7lxoirQlilVsRIdouY_X2QAg5QqQfi2S0NmXMjwibWa9nXpzNUHrEy0mW9cSF9B8uUxeAHekeb56Jz_DA8ub32Od8v4pXsEx97F10kOgaQtF8eu-qwbpwLa43pzGJ0Y3AowI4VjR3djjOhrDdClg26jtcRB7edl0BGFDxexjZ1qudc_8kDo7JGGSiQsJGwW-DdjvBnSRciQIwwpHLOT3ieulnyKN_f9pr73g.Xze1G_1xPBxq6ptiQgymxb14O3s.ZdhFtw",
//     "Referer": "https://canvas.eee.uci.edu/courses/61775/gradebook/speed_grader?assignment_id=1313249&student_id=412027",
//     "Referrer-Policy": "no-referrer-when-downgrade"
//   },
//   "body": "submission%5Bassignment_id%5D=1313249&submission%5Buser_id%5D=412027&submission%5Bgraded_anonymously%5D=false&originator=speed_grader&submission%5Bgrade%5D=5&_method=POST&authenticity_token=DR6yqaIpPY2fswS2a8m%2B7Tzxvjhrkf8aKydpNylhfjw8KcPv5U1U18mYft0K%2FcTecLP3VAf4p24AbhNaXgIddQ%3D%3D",
//   "method": "POST"
// });