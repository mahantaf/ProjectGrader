const fs    = require('fs');
const axios = require('axios');
const csv   = require('csvtojson');
const path = require('path');

// const gradesCSV = '../grades/2023/wp1/final_wp1_labA.csv';
const gradesCSV = '../grades/2023/wp1/final_wp1_labB.csv';

const parseGradesInfo = async (studentsInfo) => {
  const grades = [];
  const gradeList = await csv().fromFile(path.join(__dirname, gradesCSV));
  for (grade of gradeList)
    grades.push({
      id: grade['canvasID'],
      name: grade['name'],
      singleRow: grade['single_row_grade'],
      multipleRow: grade['multiple_row_grade'],
      byteGrade: grade['one_byte_grade'],
      readme: grade['Points Readme Ded'],
      style: grade['Points Style Ded'],
      git: grade['Git Score'],
      remarks: grade['Remarks']
    })
  return grades;
}

const createGradeRequestData = (grade) => {
    return `rubric_assessment%5Buser_id%5D=${grade.id}&rubric_assessment%5Bassessment_type%5D=grading&rubric_assessment%5Bcriterion__2228%5D%5Brating_id%5D=blank&rubric_assessment%5Bcriterion__2228%5D%5Bpoints%5D=${grade.singleRow}&rubric_assessment%5Bcriterion__2228%5D%5Bdescription%5D=Full+Marks&rubric_assessment%5Bcriterion__2228%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__2228%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__7118%5D%5Brating_id%5D=_8192&rubric_assessment%5Bcriterion__7118%5D%5Bpoints%5D=${grade.multipleRow}&rubric_assessment%5Bcriterion__7118%5D%5Bdescription%5D=Full+Marks&rubric_assessment%5Bcriterion__7118%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__7118%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__9963%5D%5Brating_id%5D=_4915&rubric_assessment%5Bcriterion__9963%5D%5Bpoints%5D=${grade.byteGrade}&rubric_assessment%5Bcriterion__9963%5D%5Bdescription%5D=Full+Marks&rubric_assessment%5Bcriterion__9963%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__9963%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__8147%5D%5Brating_id%5D=_7297&rubric_assessment%5Bcriterion__8147%5D%5Bpoints%5D=${grade.readme}&rubric_assessment%5Bcriterion__8147%5D%5Bdescription%5D=Full+Marks&rubric_assessment%5Bcriterion__8147%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__8147%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__9435%5D%5Brating_id%5D=_3447&rubric_assessment%5Bcriterion__9435%5D%5Bpoints%5D=${grade.style}&rubric_assessment%5Bcriterion__9435%5D%5Bdescription%5D=Full+Marks&rubric_assessment%5Bcriterion__9435%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__9435%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__1601%5D%5Brating_id%5D=_1673&rubric_assessment%5Bcriterion__1601%5D%5Bpoints%5D=${grade.git}&rubric_assessment%5Bcriterion__1601%5D%5Bdescription%5D=Full+Marks&rubric_assessment%5Bcriterion__1601%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__1601%5D%5Bsave_comment%5D=0&graded_anonymously=false&_method=POST&authenticity_token=x9RtKIQ6OPE%2Bo5%2Bizm9O%2BNca6YNT8UjedqmZUGVTfJOznR0a9H5PxUrs5c2ECD6QtSKA0hbAOY0y6t43KBc2yg%3D%3D`;
}

// --------------------------------------------------
// Group A


// const createGradeRequestConfig = (data) => {
//     return {
//       method: 'post',
//       maxBodyLength: Infinity,
//       url: 'https://canvas.eee.uci.edu/courses/61774/rubric_associations/146214/assessments',
//       headers: {
//         "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
//         "accept-language": "en-US,en;q=0.9",
//         "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240313.296,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=752e303c0063425884623486918660df",
//         "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//         "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
//         "sec-ch-ua-mobile": "?0",
//         "sec-ch-ua-platform": "\"macOS\"",
//         "sec-fetch-dest": "empty",
//         "sec-fetch-mode": "cors",
//         "sec-fetch-site": "same-origin",
//         "sentry-trace": "752e303c0063425884623486918660df-8a4213c91a226b20-0",
//         "x-csrf-token": "x9RtKIQ6OPE+o5+izm9O+Nca6YNT8UjedqmZUGVTfJOznR0a9H5PxUrs5c2ECD6QtSKA0hbAOY0y6t43KBc2yg==",
//         "x-requested-with": "XMLHttpRequest",
//         "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=efe35374bb9f5a987f5eae8b18a99d0b; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fcanvas.eee.uci.edu%2Fcourses%2F61774%22%2C%22ts%22%3A1710963545282%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2Fcourses%2F61774%2Fgradebook%22%7D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%224631700194242987%22%2C%22sessionId%22%3A%22328093057511817%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1710963546.167.1.1710963565.0.0.0; _legacy_normandy_session=bmLKSqUoTHtC1LXIvUZZlQ+K87ZiWwf-qPcVQsuUNZ4IF3HC4_MTNyHvq5_0b3aeL2M-lPLHQE8ln1g6XHMrR3IeVOzLgqM9DvpLwzHMnl3bQmSc0eRxQnld7ASqbL4KE3804cKtfqJUK7MS_81oqR4lwawOlYto5ZYQAsJJaUxQOPclGMSumUczez7E09ayc1h6e3sT1IVTOp-asG2JGCDNUmLfaR8G1PeaT5knsCjjCYCw_8p8rxKXrNnLGCbrCorrgPYNXwbgd2sqK86w7tMu2qSyNp5JyBfwWvvAr9KgP-AZTU5HBEExq5QRxuDMXEtpMo9RRg84aWcULFFW7zj5jkDKS4PgCFyqzf_jF89jqFP5GS7ojLAr2kUU3GwTyeCXU800vg6WUUNtE_IlUKVLxxRqPuddCt9OWEHniyOly8UDRv0Jyj_OWh9JM0reLPUrEC5M9vTh5ots--T6dLHXkl6HL4WbM9DlrDhlR2XiAzDAOmI5w93IVR37oZ8w4-DTpyEatbV-8LDZOxP3QAbguWj5O5Ttq_P8i4PMHOOnZepcJNQE4CotBg8iyY_POjinnvq_tj6eCt0Kqg_R-wdDwkq6PVw1BQTtqKlRLhkhquHr89lKETc1vwdpYfdhHy6Gok1k3Sdw-j4uflHQvcJ9taah-fR8KeCCBzg7dhtsMPjdojUg5PanK6PR5e4iABlUlx3aVYMpIeP5g7AtwmC2wYHsH3AHPKbB7et0CQKH2kdkP2diE93WOdTdhUKMOeFnuJK6IKflg2zvezIuubBHXy88IDy97GDP_0bR8G-KqPvGOZJ5S3D8CuHfUL8YB6tIVPPDDrhajZ9nO3ia6pk.p-WP2c5OlPfewN8m9Lx6iPx6Oxw.Zfs8IQ; canvas_session=bmLKSqUoTHtC1LXIvUZZlQ+K87ZiWwf-qPcVQsuUNZ4IF3HC4_MTNyHvq5_0b3aeL2M-lPLHQE8ln1g6XHMrR3IeVOzLgqM9DvpLwzHMnl3bQmSc0eRxQnld7ASqbL4KE3804cKtfqJUK7MS_81oqR4lwawOlYto5ZYQAsJJaUxQOPclGMSumUczez7E09ayc1h6e3sT1IVTOp-asG2JGCDNUmLfaR8G1PeaT5knsCjjCYCw_8p8rxKXrNnLGCbrCorrgPYNXwbgd2sqK86w7tMu2qSyNp5JyBfwWvvAr9KgP-AZTU5HBEExq5QRxuDMXEtpMo9RRg84aWcULFFW7zj5jkDKS4PgCFyqzf_jF89jqFP5GS7ojLAr2kUU3GwTyeCXU800vg6WUUNtE_IlUKVLxxRqPuddCt9OWEHniyOly8UDRv0Jyj_OWh9JM0reLPUrEC5M9vTh5ots--T6dLHXkl6HL4WbM9DlrDhlR2XiAzDAOmI5w93IVR37oZ8w4-DTpyEatbV-8LDZOxP3QAbguWj5O5Ttq_P8i4PMHOOnZepcJNQE4CotBg8iyY_POjinnvq_tj6eCt0Kqg_R-wdDwkq6PVw1BQTtqKlRLhkhquHr89lKETc1vwdpYfdhHy6Gok1k3Sdw-j4uflHQvcJ9taah-fR8KeCCBzg7dhtsMPjdojUg5PanK6PR5e4iABlUlx3aVYMpIeP5g7AtwmC2wYHsH3AHPKbB7et0CQKH2kdkP2diE93WOdTdhUKMOeFnuJK6IKflg2zvezIuubBHXy88IDy97GDP_0bR8G-KqPvGOZJ5S3D8CuHfUL8YB6tIVPPDDrhajZ9nO3ia6pk.p-WP2c5OlPfewN8m9Lx6iPx6Oxw.Zfs8IQ; _csrf_token=x9RtKIQ6OPE%2Bo5%2Bizm9O%2BNca6YNT8UjedqmZUGVTfJOznR0a9H5PxUrs5c2ECD6QtSKA0hbAOY0y6t43KBc2yg%3D%3D",
//         "Referer": "https://canvas.eee.uci.edu/courses/61774/gradebook/speed_grader?assignment_id=1313234&student_id=409398",
//         "Referrer-Policy": "no-referrer-when-downgrade"
//       },
//       data : data
//     };
// }

// const createCommentRequestConfig = (grade, prop) => {
//     return {
//         method: 'post',
//         maxBodyLength: Infinity,
//         url: `https://canvas.eee.uci.edu/courses/61774/assignments/1313234/submissions/${grade.id}`,
//         headers: {
//             "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
//             "accept-language": "en-US,en;q=0.9",
//             "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240313.296,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=752e303c0063425884623486918660df",
//             "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//             "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
//             "sec-ch-ua-mobile": "?0",
//             "sec-ch-ua-platform": "\"macOS\"",
//             "sec-fetch-dest": "empty",
//             "sec-fetch-mode": "cors",
//             "sec-fetch-site": "same-origin",
//             "sentry-trace": "752e303c0063425884623486918660df-ad785bec59ffa2e6-0",
//             "x-csrf-token": "Ax4puFd1i/uGjj53WOYdGJP4DCe256gfczJONNEFQL13V1mKJzH8z/LBRBgSgW1w8cBldvPW2Uw3cQlTnEEK5A==",
//             "x-requested-with": "XMLHttpRequest",
//             "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=efe35374bb9f5a987f5eae8b18a99d0b; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fcanvas.eee.uci.edu%2Fcourses%2F61774%22%2C%22ts%22%3A1710963545282%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2Fcourses%2F61774%2Fgradebook%22%7D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%224631700194242987%22%2C%22sessionId%22%3A%22328093057511817%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1710963546.167.1.1710963565.0.0.0; _legacy_normandy_session=Z9Tq2KxlOOW6Nvux7o3_tg+wh4LEQMyA8ePM8JCBDQD3_rrM_YNcYCyI6VxYy5LK7CzQNUntn666svasudir_Gg49lTauK8A_sLpqVqLqJafst8Fv_eZAa7Jhs7pWHztm5k8SiY4SWQF7lhQlk3cZqFD_8un7xtw_ibXXW-59dQNcOQ3AnecaFZPqd0ybD1VZVRpqtllt2iMgpQn4vKwnWUhip3bPvmqmRv3yEw4gnYGQAQGgFUxR0UGDkQFSaPsJ5ShlfmeH4XLp3vdPzVegHOgGhDDWQMe3PYpPS2l3-fuZTaE3emfu0ALc7_a6PlkpM24uORyDBMj1t7vmUCo5_dzbACWi0yFTI_mfAr7K9m7rGKXGorVAO_9dvzJO5o5KbiEVXYeP_SqSgZUaCAsOL-YA88GVU69AqCBJd_bc5vaLrGWibn361XL9Gmcx8TM7Sg_ubtDBef7a6Axjvn-7rlqdVVMsJnN5CUtDoYoqn0ydpH2vPj_KO_clE-uYE2Z5chrtRWqULmkpkUtnb6seSj_1ohGmWhUEDF7RKwd0-ERukP0a72Np8nN1Vs0bbIeTC1pqXpIUPq8nTPC9cdOfAs2Z96tVCUU2Uv8gvERRbwKFpkw9HXIperSC0a0pv1wGkm6OXGMEFXF0gVTDrvVpsNF51rxNMkdGAyCcKzYppGUb4iGWyyqxgnPiTvwPS6zX_zIEOH-CGfpOBFwFN8HksrHQa8PPMLCTFI1kA7MUNMSSn9984jvUOFYrDIRsO65At2vXymo8_RzTIXKKjeA3P-f2idIuVZe-nimvUNxocQ9dJoe3RCdZH2bjGT-uYa_QCfW-f4KjUUOGBmisCnwnOw.tSZHsj1IokwqCsRVWGOuxxzCkww.Zfs9wQ; canvas_session=Z9Tq2KxlOOW6Nvux7o3_tg+wh4LEQMyA8ePM8JCBDQD3_rrM_YNcYCyI6VxYy5LK7CzQNUntn666svasudir_Gg49lTauK8A_sLpqVqLqJafst8Fv_eZAa7Jhs7pWHztm5k8SiY4SWQF7lhQlk3cZqFD_8un7xtw_ibXXW-59dQNcOQ3AnecaFZPqd0ybD1VZVRpqtllt2iMgpQn4vKwnWUhip3bPvmqmRv3yEw4gnYGQAQGgFUxR0UGDkQFSaPsJ5ShlfmeH4XLp3vdPzVegHOgGhDDWQMe3PYpPS2l3-fuZTaE3emfu0ALc7_a6PlkpM24uORyDBMj1t7vmUCo5_dzbACWi0yFTI_mfAr7K9m7rGKXGorVAO_9dvzJO5o5KbiEVXYeP_SqSgZUaCAsOL-YA88GVU69AqCBJd_bc5vaLrGWibn361XL9Gmcx8TM7Sg_ubtDBef7a6Axjvn-7rlqdVVMsJnN5CUtDoYoqn0ydpH2vPj_KO_clE-uYE2Z5chrtRWqULmkpkUtnb6seSj_1ohGmWhUEDF7RKwd0-ERukP0a72Np8nN1Vs0bbIeTC1pqXpIUPq8nTPC9cdOfAs2Z96tVCUU2Uv8gvERRbwKFpkw9HXIperSC0a0pv1wGkm6OXGMEFXF0gVTDrvVpsNF51rxNMkdGAyCcKzYppGUb4iGWyyqxgnPiTvwPS6zX_zIEOH-CGfpOBFwFN8HksrHQa8PPMLCTFI1kA7MUNMSSn9984jvUOFYrDIRsO65At2vXymo8_RzTIXKKjeA3P-f2idIuVZe-nimvUNxocQ9dJoe3RCdZH2bjGT-uYa_QCfW-f4KjUUOGBmisCnwnOw.tSZHsj1IokwqCsRVWGOuxxzCkww.Zfs9wQ; _csrf_token=Ax4puFd1i%2FuGjj53WOYdGJP4DCe256gfczJONNEFQL13V1mKJzH8z%2FLBRBgSgW1w8cBldvPW2Uw3cQlTnEEK5A%3D%3D",
//             "Referer": "https://canvas.eee.uci.edu/courses/61774/gradebook/speed_grader?assignment_id=1313234&student_id=409398",
//             "Referrer-Policy": "no-referrer-when-downgrade"
//         },
//         data : `submission%5Bassignment_id%5D=1313204&submission%5Bgroup_comment%5D=0&submission%5Bcomment%5D=${grade[prop]}&submission%5Bdraft_comment%5D=false&submission%5Bid%5D=409398&_method=PUT&authenticity_token=5wY6rUSLski1ZT596%2FaXUvTUMI3h%2Fq2KQE6daaXNtcCdQ1HFJ%2FvmJsYcUzWtpsMIkLkJxIiw4OcBB%2Fkk3%2FvW7w%3D%3D`
//     }
// }









//==================================================================================



// --------------------------------------------------
// Group B


const createGradeRequestConfig = (data) => {
    return {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://canvas.eee.uci.edu/courses/61775/rubric_associations/146240/assessments',
      headers: {
        "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240313.297,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=e5ad0689c1294195818ab701aaf4d91a",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"macOS\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sentry-trace": "e5ad0689c1294195818ab701aaf4d91a-889bfdc9c1f0dd78-0",
        "x-csrf-token": "9jgl8qhafsFEXKMTajF69EF9OtA2MOJLQa7AtJNsscWCcVXA2B4J9TAT2XwgVgqcI0VTgXMBkxgF7YfT3ij7nA==",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=efe35374bb9f5a987f5eae8b18a99d0b; _legacy_normandy_session=6409sDNAXrK94FebJKUlbg+ht7C-d70wyLOyiSp5xVQsx4-17VbAURRFQM2okZn9suysZB0ffOKfbgot1yIZVOuAESl2fOvxuFNSWoMu2_Vl5Rd3F-lY75vnRNm9H2URAWZqJLPQoIFDxvDIpwLAj_fpRGVWRyp2rbxEf2hnlhSnAras3c6BBERRIlhU0dUS6Oa-khNHHMzzsJxjuaCJwdd4PPRat9CR07W8lPF70BO2_IfSrG6SNHHmvyUAhbzNFIGG7jcQYkBbfXlbZgzqxHYLIwMTeCna4OW5_bRwN8-P8IJzjnQEQuLK9xz03Sh7gMVls2VmbQaDd6ZgUnEb1Ou2qTOG7AkHJEHL3RqQdkzltRWjkl4_lf2FgiIyO4RyB4SqQVur2TEmp8Tr84F-Ufwt55p2R6djFkkAoHRget4nO6W2rY7I2sAO8Kz4WURIm9aihgSwx2JpmuRk-uBB3qP0yGXcvueefn3YI186fWw8KMmc_pnmrMMogkpijYpDo37W3qzdNsS_f48zGIgJi3sGn9I43eUOea5lHjz0X1mcpTmoUO-d0IQ7yqogGbbvDdcGh4HEOdb7p8MBMAh51_ODBFrkf75-Yg7kdZUo3unk0RMwGm72TEqw9-F1BH3RfIZpfDFWrJRcFz8nv6J1zaWiHBrzQ7nOo0QU7evQgJHQ4wsuuB-ATgs9bitQn_cYHsZnoJsgA7adMTEf5wMRFClPX3XrVtQuVJ6xZwkIvSM1yH9Nuc0fCb8bNDnQrQoYaO3GY2XJ_hKd5HjdtdSQV90SNLR88pyFos-IeIyWkYoxWQbzXbwQGee2qB9ZO3UfasnDfH9MJGB9LF-GxtUuLaU.P542FYyvx2P_ixRraY0f8qUrW1E.ZftA7A; canvas_session=6409sDNAXrK94FebJKUlbg+ht7C-d70wyLOyiSp5xVQsx4-17VbAURRFQM2okZn9suysZB0ffOKfbgot1yIZVOuAESl2fOvxuFNSWoMu2_Vl5Rd3F-lY75vnRNm9H2URAWZqJLPQoIFDxvDIpwLAj_fpRGVWRyp2rbxEf2hnlhSnAras3c6BBERRIlhU0dUS6Oa-khNHHMzzsJxjuaCJwdd4PPRat9CR07W8lPF70BO2_IfSrG6SNHHmvyUAhbzNFIGG7jcQYkBbfXlbZgzqxHYLIwMTeCna4OW5_bRwN8-P8IJzjnQEQuLK9xz03Sh7gMVls2VmbQaDd6ZgUnEb1Ou2qTOG7AkHJEHL3RqQdkzltRWjkl4_lf2FgiIyO4RyB4SqQVur2TEmp8Tr84F-Ufwt55p2R6djFkkAoHRget4nO6W2rY7I2sAO8Kz4WURIm9aihgSwx2JpmuRk-uBB3qP0yGXcvueefn3YI186fWw8KMmc_pnmrMMogkpijYpDo37W3qzdNsS_f48zGIgJi3sGn9I43eUOea5lHjz0X1mcpTmoUO-d0IQ7yqogGbbvDdcGh4HEOdb7p8MBMAh51_ODBFrkf75-Yg7kdZUo3unk0RMwGm72TEqw9-F1BH3RfIZpfDFWrJRcFz8nv6J1zaWiHBrzQ7nOo0QU7evQgJHQ4wsuuB-ATgs9bitQn_cYHsZnoJsgA7adMTEf5wMRFClPX3XrVtQuVJ6xZwkIvSM1yH9Nuc0fCb8bNDnQrQoYaO3GY2XJ_hKd5HjdtdSQV90SNLR88pyFos-IeIyWkYoxWQbzXbwQGee2qB9ZO3UfasnDfH9MJGB9LF-GxtUuLaU.P542FYyvx2P_ixRraY0f8qUrW1E.ZftA7A; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fcanvas.eee.uci.edu%2Fcourses%2F61774%2Fgradebook%22%2C%22ts%22%3A1710965004781%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2F%22%7D; _csrf_token=9jgl8qhafsFEXKMTajF69EF9OtA2MOJLQa7AtJNsscWCcVXA2B4J9TAT2XwgVgqcI0VTgXMBkxgF7YfT3ij7nA%3D%3D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%221669327607410123%22%2C%22sessionId%22%3A%226892535010558812%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1710963546.167.1.1710965079.0.0.0",
        "Referer": "https://canvas.eee.uci.edu/courses/61775/gradebook/speed_grader?assignment_id=1313278&student_id=410808",
        "Referrer-Policy": "no-referrer-when-downgrade"
      },
      data : data
    };
}

const createCommentRequestConfig = (grade, prop) => {
    return {
        method: 'post',
        maxBodyLength: Infinity,
        url: `https://canvas.eee.uci.edu/courses/61775/assignments/1313278/submissions/${grade.id}`,
        headers: {
            "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "baggage": "sentry-environment=Production,sentry-release=canvas-lms%4020240313.297,sentry-public_key=355a1d96717e4038ac25aa852fa79a8f,sentry-trace_id=e5ad0689c1294195818ab701aaf4d91a",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sentry-trace": "e5ad0689c1294195818ab701aaf4d91a-a9237f5f860f4697-0",
            "x-csrf-token": "p6tP4G9Fr0hJHhsGcu1jubk6+9jAOEmycq/hNGdQ9NvT4j/SHwHYfD1RYWk4ihPR2wKSiYUJOOE27KZTKhS+gg==",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "nmstat=7aa20c45-048e-0fc3-a386-8e377115179c; _ga_CKGHS3FHB2=GS1.1.1681256326.2.0.1681256326.60.0.0; _hjSessionUser_853992=eyJpZCI6ImE5ZmRlYzA1LTUzZmQtNTQ2Ni05OGZiLWNjMmEyYzkyODlkNCIsImNyZWF0ZWQiOjE2ODI1NjUzNTk5NDYsImV4aXN0aW5nIjp0cnVlfQ==; _ga_VWYV2L4R8D=GS1.1.1683149679.1.1.1683149833.60.0.0; _ga_DYV2CD0QPR=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_JF884S7BTD=GS1.1.1684188266.1.1.1684188322.0.0.0; _ga_TS4WDM20S6=GS1.1.1686707037.2.0.1686707037.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1687808526.4.1.1687808567.0.0.0; _ga_KFKKW9RRQZ=GS1.1.1692818999.1.1.1692819010.49.0.0; _ga_6594XCNJ37=GS1.1.1695169970.2.1.1695170061.0.0.0; _ga_9H5B2VNR49=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_C314QG7LHT=GS1.1.1696288430.1.0.1696288433.0.0.0; _ga_VKWQQV50LF=GS1.1.1696288415.6.1.1696288612.0.0.0; _ga_EFQDRV9870=GS1.2.1697050312.1.0.1697050312.60.0.0; _ga_368N2KBM94=GS1.1.1698623493.2.0.1698623494.0.0.0; _uetvid=d4fa74a0e4a911ed83df3dc8e273a842; _clck=15oajxz|2|fgi|0|1406; _ga_NR5Q7RT4TP=GS1.1.1699393817.3.1.1699393839.38.0.0; _ga_SRB5FK05VP=GS1.1.1699897404.2.0.1699897452.0.0.0; _ga_WZF0XCWWWK=GS1.1.1700442317.2.0.1700442318.0.0.0; _ga_MTKKEPF231=GS1.1.1701289540.2.1.1701289604.0.0.0; _ga_6LER2QNZ4G=GS1.1.1702440391.1.0.1702440393.0.0.0; _ga_NZRM3L7JQK=GS1.1.1703207963.5.1.1703207971.0.0.0; _ga_6D96P8P0JG=GS1.1.1703207973.5.1.1703208103.0.0.0; _ga_MN3VSQ6JR3=GS1.1.1703629383.3.0.1703629383.0.0.0; _ga_DHHWHFG4X2=GS1.1.1703629379.2.0.1703629772.60.0.0; _ga_HFVXV9F5M0=GS1.1.1704730061.8.0.1704730066.0.0.0; _ga_B0MX3ZR8RH=GS1.1.1705651875.1.1.1705651907.28.0.0; _ga_2MNQ8DS5LW=GS1.1.1705685273.5.1.1705685983.60.0.0; _ga_9VE1Z86W9W=GS1.1.1705685273.4.1.1705685983.0.0.0; _ga_K4GWK4BZ9J=GS1.1.1707254232.12.0.1707254232.60.0.0; _ga_73ZMF4DFNJ=GS1.1.1707356177.4.0.1707356177.0.0.0; _ga_TJ4TMSCSES=GS1.1.1707356177.18.0.1707356177.0.0.0; _ga_2J74KM5B22=GS1.2.1707629083.2.0.1707629083.0.0.0; amp_045277=ahsBlkIt8hdWIASOJHEcPD...1hmb9vvam.1hmb9vvam.0.0.0; _ga_8TR769WY9R=GS1.2.1707631693.5.0.1707631693.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1708492612.3.0.1708492617.55.0.0; _ga=GA1.1.149269222.1680910557; log_session_id=efe35374bb9f5a987f5eae8b18a99d0b; _legacy_normandy_session=6409sDNAXrK94FebJKUlbg+ht7C-d70wyLOyiSp5xVQsx4-17VbAURRFQM2okZn9suysZB0ffOKfbgot1yIZVOuAESl2fOvxuFNSWoMu2_Vl5Rd3F-lY75vnRNm9H2URAWZqJLPQoIFDxvDIpwLAj_fpRGVWRyp2rbxEf2hnlhSnAras3c6BBERRIlhU0dUS6Oa-khNHHMzzsJxjuaCJwdd4PPRat9CR07W8lPF70BO2_IfSrG6SNHHmvyUAhbzNFIGG7jcQYkBbfXlbZgzqxHYLIwMTeCna4OW5_bRwN8-P8IJzjnQEQuLK9xz03Sh7gMVls2VmbQaDd6ZgUnEb1Ou2qTOG7AkHJEHL3RqQdkzltRWjkl4_lf2FgiIyO4RyB4SqQVur2TEmp8Tr84F-Ufwt55p2R6djFkkAoHRget4nO6W2rY7I2sAO8Kz4WURIm9aihgSwx2JpmuRk-uBB3qP0yGXcvueefn3YI186fWw8KMmc_pnmrMMogkpijYpDo37W3qzdNsS_f48zGIgJi3sGn9I43eUOea5lHjz0X1mcpTmoUO-d0IQ7yqogGbbvDdcGh4HEOdb7p8MBMAh51_ODBFrkf75-Yg7kdZUo3unk0RMwGm72TEqw9-F1BH3RfIZpfDFWrJRcFz8nv6J1zaWiHBrzQ7nOo0QU7evQgJHQ4wsuuB-ATgs9bitQn_cYHsZnoJsgA7adMTEf5wMRFClPX3XrVtQuVJ6xZwkIvSM1yH9Nuc0fCb8bNDnQrQoYaO3GY2XJ_hKd5HjdtdSQV90SNLR88pyFos-IeIyWkYoxWQbzXbwQGee2qB9ZO3UfasnDfH9MJGB9LF-GxtUuLaU.P542FYyvx2P_ixRraY0f8qUrW1E.ZftA7A; canvas_session=6409sDNAXrK94FebJKUlbg+ht7C-d70wyLOyiSp5xVQsx4-17VbAURRFQM2okZn9suysZB0ffOKfbgot1yIZVOuAESl2fOvxuFNSWoMu2_Vl5Rd3F-lY75vnRNm9H2URAWZqJLPQoIFDxvDIpwLAj_fpRGVWRyp2rbxEf2hnlhSnAras3c6BBERRIlhU0dUS6Oa-khNHHMzzsJxjuaCJwdd4PPRat9CR07W8lPF70BO2_IfSrG6SNHHmvyUAhbzNFIGG7jcQYkBbfXlbZgzqxHYLIwMTeCna4OW5_bRwN8-P8IJzjnQEQuLK9xz03Sh7gMVls2VmbQaDd6ZgUnEb1Ou2qTOG7AkHJEHL3RqQdkzltRWjkl4_lf2FgiIyO4RyB4SqQVur2TEmp8Tr84F-Ufwt55p2R6djFkkAoHRget4nO6W2rY7I2sAO8Kz4WURIm9aihgSwx2JpmuRk-uBB3qP0yGXcvueefn3YI186fWw8KMmc_pnmrMMogkpijYpDo37W3qzdNsS_f48zGIgJi3sGn9I43eUOea5lHjz0X1mcpTmoUO-d0IQ7yqogGbbvDdcGh4HEOdb7p8MBMAh51_ODBFrkf75-Yg7kdZUo3unk0RMwGm72TEqw9-F1BH3RfIZpfDFWrJRcFz8nv6J1zaWiHBrzQ7nOo0QU7evQgJHQ4wsuuB-ATgs9bitQn_cYHsZnoJsgA7adMTEf5wMRFClPX3XrVtQuVJ6xZwkIvSM1yH9Nuc0fCb8bNDnQrQoYaO3GY2XJ_hKd5HjdtdSQV90SNLR88pyFos-IeIyWkYoxWQbzXbwQGee2qB9ZO3UfasnDfH9MJGB9LF-GxtUuLaU.P542FYyvx2P_ixRraY0f8qUrW1E.ZftA7A; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fcanvas.eee.uci.edu%2Fcourses%2F61774%2Fgradebook%22%2C%22ts%22%3A1710965004781%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2F%22%7D; _hp2_props.3001039959=%7B%22Base.appName%22%3A%22Canvas%22%7D; _hp2_id.3001039959=%7B%22userId%22%3A%224592244968958138%22%2C%22pageviewId%22%3A%221669327607410123%22%2C%22sessionId%22%3A%226892535010558812%22%2C%22identity%22%3A%22uu-2-7489fbdd69cadacc85b40f0bf68d84c83275c369a2d4a572807f22894261cd09-DCv1XbL85NK1TlEOj9hqImbxni3UKdlekk5vMPUg%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%7D; _ga_N9H8E14ERR=GS1.1.1710963546.167.1.1710965079.0.0.0; _csrf_token=p6tP4G9Fr0hJHhsGcu1jubk6%2B9jAOEmycq%2FhNGdQ9NvT4j%2FSHwHYfD1RYWk4ihPR2wKSiYUJOOE27KZTKhS%2Bgg%3D%3D",
            "Referer": "https://canvas.eee.uci.edu/courses/61775/gradebook/speed_grader?assignment_id=1313278&student_id=410808",
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


    
    // const commentConfig_1 = createCommentRequestConfig(grade, 'grader');
    // const commentConfig_2 = createCommentRequestConfig(grade, 'comment');
    const commentConfig_3 = createCommentRequestConfig(grade, 'remarks');
    

    try {
      const response = await axios(config);
      
      console.log(`${counter}) SUCCESS ${grade.id} ${grade.name}`);

      try {
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