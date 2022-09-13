// const axios = require("axios");
// async function getDiseasesName() {
//   const dataInput = process.argv[2];
//   const dataDisease = await axios({
//     method: "GET",
//     url: "https://icd10.p.rapidapi.com/icd10/v1/" + dataInput,
//     headers: {
//       Authorization:
//         "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkuaW9kb2pvLmNvbVwvdG9rZW4iLCJpYXQiOjE2Mzk0OTc0MjksIm5iZiI6MTYzOTQ5NzQyOSwianRpIjoiT3NXRnRoTlN2UnBkSXpqNyIsInN1YiI6MSwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.TbOkiefndtSZ2spS11fTeR8jPtVPv9UVKg7xrmueff0",
//       "X-RapidAPI-Key": "386ce05a42msh7b881f57773f9cdp1cc23cjsn1562c1932577",
//       "X-RapidAPI-Host": "icd10.p.rapidapi.com",
//     },
//   });
//   console.log(dataDisease.data);
// }

// getDiseasesName();

const axios = require("axios");

// const options = {
//   method: "GET",
//   url: "https://icd10.p.rapidapi.com/icd10/v1/fever",
//   headers: {
//     Authorization:
//       "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkuaW9kb2pvLmNvbVwvdG9rZW4iLCJpYXQiOjE2Mzk0OTc0MjksIm5iZiI6MTYzOTQ5NzQyOSwianRpIjoiT3NXRnRoTlN2UnBkSXpqNyIsInN1YiI6MSwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.TbOkiefndtSZ2spS11fTeR8jPtVPv9UVKg7xrmueff0",
//     "X-RapidAPI-Key": "386ce05a42msh7b881f57773f9cdp1cc23cjsn1562c1932577",
//     "X-RapidAPI-Host": "icd10.p.rapidapi.com",
//   },
// };

// axios
//   .request(options)
//   .then(function (response) {
//     console.log(response.data.last_page);
//     let carian = "fever";
//     let totPage = response.data.last_page;
//     let namaPenyakit = [];
//     let path = response.data.path;

//     for (let i = 1; i < totPage; i++) {}
//   })

//   .catch(function (error) {
//     console.error(error);
//   });

let data = axios({
  method: "get",
  url: "https://api.iodojo.com/icd10/v1/fever",
  params: {
    page: 1,
    token:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkuaW9kb2pvLmNvbVwvdG9rZW4iLCJpYXQiOjE2NjI0MjI5OTIsIm5iZiI6MTY2MjQyMjk5MiwianRpIjoibjJISE82RXJEY1A0RlVvVSIsInN1YiI6OCwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.vCffLkC_mzfola7xpFFx0kyeTDu19JjGoCpteISh-EY",
  },
})
  .then((data) => {
    console.log(data.data);
  })
  .catch((err) => console.log(err));
