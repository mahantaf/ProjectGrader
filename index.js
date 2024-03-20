const fs    = require('fs');
const axios = require('axios');
const csv   = require('csvtojson');


const studentCSV = './student_validation.csv'
const gradesCSV = './test.csv';

const getStudentIdsFromSubmission = () => {
  const studentIds = {};
  const files = fs.readdirSync("./submissions");
  for (const file of files) {
    const splitted = file.split('_');
    const studentName = splitted[0];
    const studentId = splitted[1];
    studentIds[studentName] = studentId;
  }
  return studentIds;
}

const parseStudentInfo = async () => {
  const studentsInfo = {};
  const studentList = await csv().fromFile(studentCSV);
  for (student of studentList)
    studentsInfo[student['STUDENT_NAME']] = student['STUDENT ID']
  return studentsInfo;
}

const parseGradesInfo = async (studentsInfo) => {
  const grades = [];
  const gradeList = await csv().fromFile(gradesCSV);
  for (grade of gradeList)
    grades.push({
      // id: studentsInfo[grade['STUDENT ID']],
      id: grade['Canvas_id'],
      name: grade['STUDENT_NAME'],
      readme: grade['points_readme_ded'],
      style: grade['total_style_points'],
      single: grade['single_row_grade'],
      multiple: grade['multiple_row_grade'],
      oneByte: grade['one_byte_grade'],
      git: grade['Total_git_score']
    })
    return grades;
}

const createGradeRequestData = (grade) => {
  return `rubric_assessment%5Buser_id%5D=${grade.id}&rubric_assessment%5Bassessment_type%5D=grading&rubric_assessment%5Bcriterion__2228%5D%5Brating_id%5D=blank&rubric_assessment%5Bcriterion__2228%5D%5Bpoints%5D=${grade.single}&rubric_assessment%5Bcriterion__2228%5D%5Bdescription%5D=No+Details&rubric_assessment%5Bcriterion__2228%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__2228%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__7118%5D%5Brating_id%5D=_8192&rubric_assessment%5Bcriterion__7118%5D%5Bpoints%5D=${grade.multiple}&rubric_assessment%5Bcriterion__7118%5D%5Bdescription%5D=No+Details&rubric_assessment%5Bcriterion__7118%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__7118%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__9963%5D%5Brating_id%5D=_4915&rubric_assessment%5Bcriterion__9963%5D%5Bpoints%5D=${grade.oneByte}&rubric_assessment%5Bcriterion__9963%5D%5Bdescription%5D=No+Details&rubric_assessment%5Bcriterion__9963%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__9963%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__8147%5D%5Brating_id%5D=_7297&rubric_assessment%5Bcriterion__8147%5D%5Bpoints%5D=${grade.readme}&rubric_assessment%5Bcriterion__8147%5D%5Bdescription%5D=No+Details&rubric_assessment%5Bcriterion__8147%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__8147%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__9435%5D%5Brating_id%5D=_3447&rubric_assessment%5Bcriterion__9435%5D%5Bpoints%5D=${grade.style}&rubric_assessment%5Bcriterion__9435%5D%5Bdescription%5D=No+Details&rubric_assessment%5Bcriterion__9435%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__9435%5D%5Bsave_comment%5D=0&rubric_assessment%5Bcriterion__1601%5D%5Brating_id%5D=_1673&rubric_assessment%5Bcriterion__1601%5D%5Bpoints%5D=${grade.git}&rubric_assessment%5Bcriterion__1601%5D%5Bdescription%5D=No+Details&rubric_assessment%5Bcriterion__1601%5D%5Bcomments%5D=&rubric_assessment%5Bcriterion__1601%5D%5Bsave_comment%5D=0&graded_anonymously=false&_method=POST&authenticity_token=CUCXSaL5RpNeN8Loulg75PIpVvqCXY7d%2Fn5yz9SiAktIB%2BAA0MF02zV1rq6RAEqyuhBiudcr1L7OOyj6pthQMg%3D%3D`;
}

const createGradeRequestConfig = (data) => {
  return {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://canvas.eee.uci.edu/courses/52429/rubric_associations/122117/assessments',
    headers: {
      "accept": "application/json, text/javascript, application/json+canvas-string-ids, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9,fa;q=0.8",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-csrf-token": "xmca9+B8E1HACped/2ScIK3058ZrAQFoj97pg3glnbGwHnPYijhyN6xG+Oe3VKhKn4ONtjwyU1Gg9dvJKGnb3g==",
      "x-requested-with": "XMLHttpRequest",
      "cookie": "_ga_B0MX3ZR8RH=GS1.1.1644563507.2.1.1644564089.0; nmstat=b97d15da-347f-773e-6bbb-0adb2f1ccac6; _ga_MR7PHXH04W=GS1.1.1665517120.1.0.1665517131.0.0.0; _ga_RTSG3RC2XZ=GS1.1.1665693576.3.0.1665693576.60.0.0; amp_045277=QxAvUyVKPmUsn5XGlqghOS...1gf9h5ra0.1gf9h5ra0.0.0.0; _ga_35RB1KQX3J=GS1.1.1666048364.1.1.1666048430.0.0.0; _hjSessionUser_2640411=eyJpZCI6Ijg3YzJlODcyLTg4ODYtNTJlOC04NzQwLWVjNTA0ZGM0ZjQ5MSIsImNyZWF0ZWQiOjE2NjY3Mzc0NzYzOTEsImV4aXN0aW5nIjp0cnVlfQ==; _ga_Y3DL36HBXC=GS1.1.1666737476.1.1.1666738353.0.0.0; _mkto_trk=id:481-OMH-447&token:_mch-uci.edu-1670306099603-60996; _ga_HFVXV9F5M0=GS1.1.1672171023.7.1.1672171037.0.0.0; _clck=1ptzy2d|1|f8c|0; _hjSessionUser_853992=eyJpZCI6IjVmZTM0N2RiLWZjZTYtNWFmNS05YTcwLWQwZWU5YjkwYjM5ZCIsImNyZWF0ZWQiOjE2NzAzMDYwOTkxODEsImV4aXN0aW5nIjp0cnVlfQ==; _uetvid=841d47a0752a11edaa61d1fbea83c080; _ga_NR5Q7RT4TP=GS1.1.1673987647.4.0.1673987647.0.0.0; _ga_3N6Y5P78G3=GS1.1.1674501878.1.0.1674501887.0.0.0; _ga_LD0E1LN2YP=GS1.1.1675108903.1.0.1675108904.0.0.0; _ga_NZRM3L7JQK=GS1.1.1678131031.4.1.1678131096.0.0.0; _ga_WZF0XCWWWK=GS1.1.1678239682.15.1.1678239999.0.0.0; _ga_4GECQ2Y1ZV=GS1.1.1678504348.7.0.1678504350.0.0.0; _ga_Y3MKYC1D2E=GS1.1.1678776545.2.0.1678776546.59.0.0; _ga_TJ4TMSCSES=GS1.1.1678911826.4.0.1678911826.0.0.0; _ga_6D96P8P0JG=GS1.1.1678911787.5.1.1678911841.0.0.0; _ga=GA1.1.673397077.1629536739; ucinetid_auth=9t2e3WDz3SfgGFVgpusQxDip7tnQFTORxWuzPTvfYwDMWx8aNdWlljJ8ouLo4MVs; log_session_id=908a6a44d6bdf10dbf958524162c6a01; _legacy_normandy_session=JXQHgdReZ2dEXx-RpLptZw+n5sl_q2AtAbdgNLtpTe9HPdaZkpLQYeX401wyIT_J1Gfr6gleYtQYBE8CAKje06InAUmzYM-lIGfEaHpS5bzpiexyGj_uUMxZ-6cSy9di0iKuhiesXeDQJZdq2cBJ_75Hau5oGQKFDixWpz8Lq0eqr6j_O7qQp-_vkjsfAa8a9ckvrimpgzOd3-pngqrLhj6CWO1LKroyeQhvkuSAgQ7XESxzFjcieSoGp0Xv5pDyPEcgu0udymAfAf1O1HrX2t-QWJiwPaWW89NopGeY72KyYcBSYZ6kmAa9QxZOqI7wW8VM5UQCQTZJsHSXhvFwk-STUEuvCU3LZjjVsw6NX9jwADRo9WJIRvirmQRRMcTpbJZKFZNufAxNZECos6wSJ-Ey69AlohqRvVGy3zfIA88DTioehzBWBLKduX1Ri0TCKvIcalnadASD8KtQTqlLzG_nFRWAnS2Va-zUrQ0NCU7LLCThlLjlaL6tKebJKX1DZeQPnSlqB3A9l9on6PFBMU4t9ARBtio6Jh0gp92btArv5nfEj2YWCBZzb0hl8gWJSP7UULcSzJKy8YOXt9KfS5M79m0g-YB-cH7eKDTcmiR5a5oQXNp2Sk_gx_J9B-Lopx2CD8cXKRqe_sJtvVpOTMZu-dvdktD-5ZJiRR9aA_m8R_oGC8yJpqZ4Xrq-pmTAaBbE75y65dDCR_-W-sY_YMRtSyzpvwdmMeDMAdT1TE7SCkoJxk8lXunTEvOazPHYMWfY-4JL9RxWpsd45tsYrTOGAhWBqwlyNMOg5efz-RgqXJycoH0zVOoE1PsTrECmRe4sF3PzKh6RqZrEjo2anzt9PKheN4t4LGRGHDyQIYTjg.wIowOvpc63AEBK1h-Y5gVSWEzfM.ZBogyQ; canvas_session=JXQHgdReZ2dEXx-RpLptZw+n5sl_q2AtAbdgNLtpTe9HPdaZkpLQYeX401wyIT_J1Gfr6gleYtQYBE8CAKje06InAUmzYM-lIGfEaHpS5bzpiexyGj_uUMxZ-6cSy9di0iKuhiesXeDQJZdq2cBJ_75Hau5oGQKFDixWpz8Lq0eqr6j_O7qQp-_vkjsfAa8a9ckvrimpgzOd3-pngqrLhj6CWO1LKroyeQhvkuSAgQ7XESxzFjcieSoGp0Xv5pDyPEcgu0udymAfAf1O1HrX2t-QWJiwPaWW89NopGeY72KyYcBSYZ6kmAa9QxZOqI7wW8VM5UQCQTZJsHSXhvFwk-STUEuvCU3LZjjVsw6NX9jwADRo9WJIRvirmQRRMcTpbJZKFZNufAxNZECos6wSJ-Ey69AlohqRvVGy3zfIA88DTioehzBWBLKduX1Ri0TCKvIcalnadASD8KtQTqlLzG_nFRWAnS2Va-zUrQ0NCU7LLCThlLjlaL6tKebJKX1DZeQPnSlqB3A9l9on6PFBMU4t9ARBtio6Jh0gp92btArv5nfEj2YWCBZzb0hl8gWJSP7UULcSzJKy8YOXt9KfS5M79m0g-YB-cH7eKDTcmiR5a5oQXNp2Sk_gx_J9B-Lopx2CD8cXKRqe_sJtvVpOTMZu-dvdktD-5ZJiRR9aA_m8R_oGC8yJpqZ4Xrq-pmTAaBbE75y65dDCR_-W-sY_YMRtSyzpvwdmMeDMAdT1TE7SCkoJxk8lXunTEvOazPHYMWfY-4JL9RxWpsd45tsYrTOGAhWBqwlyNMOg5efz-RgqXJycoH0zVOoE1PsTrECmRe4sF3PzKh6RqZrEjo2anzt9PKheN4t4LGRGHDyQIYTjg.wIowOvpc63AEBK1h-Y5gVSWEzfM.ZBogyQ; _hp2_ses_props.3001039959=%7B%22r%22%3A%22https%3A%2F%2Fshib.service.uci.edu%2F%22%2C%22ts%22%3A1679433930159%2C%22d%22%3A%22canvas.eee.uci.edu%22%2C%22h%22%3A%22%2F%22%7D; _csrf_token=xmca9%2BB8E1HACped%2F2ScIK3058ZrAQFoj97pg3glnbGwHnPYijhyN6xG%2BOe3VKhKn4ONtjwyU1Gg9dvJKGnb3g%3D%3D; _hp2_id.3001039959=%7B%22userId%22%3A%224685106236928235%22%2C%22pageviewId%22%3A%223042516363953782%22%2C%22sessionId%22%3A%222135996091002666%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; _ga_N9H8E14ERR=GS1.1.1679433932.200.1.1679434017.0.0.0",
      "Referer": "https://canvas.eee.uci.edu/courses/52429/gradebook/speed_grader?assignment_id=1100383&student_id=376316",
      "Referrer-Policy": "no-referrer-when-downgrade"
    },
    data : data
  };
}




(async () => {
  // const studentsInfo = await parseStudentInfo();
  // const studentsInfo = getStudentIdsFromSubmission();
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
