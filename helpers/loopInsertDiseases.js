const { Disease } = require("../models/index");
const axios = require("axios");

async function loopdata(value, lastPage, disease) {
  try {
    let resultData = [];
    const result = await axios({
      method: "get",
      url: "https://api.iodojo.com/icd10/v1/" + disease,
      params: {
        page: value,
        token:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkuaW9kb2pvLmNvbVwvdG9rZW4iLCJpYXQiOjE2NjI0MjI5OTIsIm5iZiI6MTY2MjQyMjk5MiwianRpIjoibjJISE82RXJEY1A0RlVvVSIsInN1YiI6OCwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.vCffLkC_mzfola7xpFFx0kyeTDu19JjGoCpteISh-EY",
      },
    });
    if (result.data.data) {
      result.data.data.map((el) => {
        resultData.push({
          code: el.code,
          name: el.name,
          description: el.description,
        });
      });
      resultData.forEach((el) => {
        Disease.findOrCreate({
          where: { code: el.code },
          defaults: { name: el.name, description: el.description },
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = loopdata;
