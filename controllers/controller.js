const axios = require("axios");

const {
  SymptomRecord,
  MedicalRecord,
  User,
  Disease,
  Symptom,
  Body,
  Sign,
  sequelize,
} = require("../models");
const { Op, where } = require("sequelize");
const loopdata = require("../helpers/loopInsertDiseases");

class Controller {
  static async countData(req, res) {
    try {
      const dataMedRec = await MedicalRecord.count();
      const dataSymRec = await SymptomRecord.count();
      const dataDisease = await Disease.count();
      res.status(200).json({
        MedicalRecord: dataMedRec,
        SymptomRecord: dataSymRec,
        Diseases: dataDisease,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async googleSearch(req, res) {
    try {
      let { search } = req.body;
      search = search.split(" ").join("+");
      console.log(search);
      const { data } = await axios({
        method: "get",
        url:
          "https://google-search3.p.rapidapi.com/api/v1/search/q=" +
          search +
          "&num=100&lr=lang_en&hl=en&cr=US",
        headers: {
          "X-User-Agent": "desktop",
          "X-Proxy-Location": "EU",
          "X-RapidAPI-Key":
            "386ce05a42msh7b881f57773f9cdp1cc23cjsn1562c1932577",
          "X-RapidAPI-Host": "google-search3.p.rapidapi.com",
        },
      });
      res.status(200).json(data.results[2].description);
    } catch (error) {
      console.log(error);
    }
  }

  static async registeredDiseases(req, res) {
    try {
      let { dataPerPage, page } = req.query;
      if (!dataPerPage) dataPerPage = 10;
      if (!page) page = 1;
      const dataFrom = dataPerPage * (page - 1);
      const dataTo = +dataFrom + +dataPerPage;

      const data = await Disease.findAndCountAll({
        order: [["id", "DESC"]],
        limit: dataPerPage,
        offset: dataFrom,
      });
      const maxPage = Math.ceil(data.count / dataPerPage);

      data.total_data = data.count;
      data.current_page = +page;
      data.data_per_page = +dataPerPage;
      data.data_from = dataFrom + 1;
      data.data_to = dataTo;
      data.last_page = maxPage;
      data.data = data.rows;
      delete data.rows;
      delete data.count;
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async getDisease(req, res) {
    try {
      const { disease } = req.body;
      const { data } = await axios({
        method: "get",
        url: "https://api.iodojo.com/icd10/v1/" + disease,
        params: {
          page: 1,
          token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkuaW9kb2pvLmNvbVwvdG9rZW4iLCJpYXQiOjE2NjI0MjI5OTIsIm5iZiI6MTY2MjQyMjk5MiwianRpIjoibjJISE82RXJEY1A0RlVvVSIsInN1YiI6OCwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.vCffLkC_mzfola7xpFFx0kyeTDu19JjGoCpteISh-EY",
        },
      });
      for (let i = 1; i <= data.last_page; i++) {
        setTimeout(() => loopdata(i, data.last_page, disease), 7000 * i);
      }
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async getSymptoms(req, res) {
    try {
      let options = [];
      console.log(req.body.search, "<<<<<<BODY SEARCH");
      if (req.body.search) {
        options = {
          [Op.or]: [
            {
              "$Body.name$": { [Op.iLike]: "%" + req.body.search + "%" },
            },
            {
              "$Sign.name$": { [Op.iLike]: "%" + req.body.search + "%" },
            },
          ],
        };
      }

      let data = await Symptom.findAll({
        order: [["id", "DESC"]],
        where: options,
        limit: 12,
        include: [
          {
            model: Body,
          },
          {
            model: Sign,
          },
        ],
      });

      data = data.map((el) => {
        return {
          id: el.id,
          BodyId: el.BodyId,
          SignId: el.SignId,
          BodyName: el.Body.name,
          SignName: el.Sign.name,
        };
      });

      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async getMedicalRecord(req, res) {
    try {
      let { dataPerPage, page } = req.query;
      if (!dataPerPage) dataPerPage = 10;
      if (!page) page = 1;
      const dataFrom = dataPerPage * (page - 1);
      const dataTo = +dataFrom + +dataPerPage;
      let options = {};
      if (req.query.search) {
        options = {
          [Op.or]: [
            {
              "$Doctor.name$": { [Op.iLike]: "%" + req.query.search + "%" },
            },
            {
              "$Patient.name$": { [Op.iLike]: "%" + req.query.search + "%" },
            },

            {
              "$Disease.name$": { [Op.iLike]: "%" + req.query.search + "%" },
            },
          ],
        };
      }

      let data = await MedicalRecord.findAndCountAll({
        order: [["id", "DESC"]],
        distinct: true,
        col: "id",
        where: options,
        limit: dataPerPage,
        offset: dataFrom,
        include: [
          {
            model: User,
            as: "Patient",
          },
          {
            model: User,
            as: "Doctor",
          },
          { model: Disease },
        ],
      });
      const maxPage = Math.ceil(data.count / dataPerPage);

      data.rows = data.rows.map((el) => {
        return {
          id: el.id,
          DoctorId: el.DoctorId,
          DoctorName: "dr. " + el.Doctor.name,
          DoctorImage: el.Doctor.imageUrl,
          PatientId: el.PatientId,
          PatientName: el.Patient.name,
          PatientImage: el.Patient.imageUrl,
          DiseaseId: el.DiseaseId,
          DiseaseName: el.Disease.name,
          DiseaseDesc: el.Disease.description,
        };
      });

      data.total_data = data.count;
      data.current_page = +page;
      data.data_per_page = +dataPerPage;
      data.data_from = dataFrom + 1;
      data.data_to = dataTo;
      data.last_page = maxPage;
      data.data = data.rows;
      delete data.rows;
      delete data.count;
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async getSymptRecord(req, res) {
    try {
      let { dataPerPage, page } = req.query;
      if (!dataPerPage) dataPerPage = 10;
      if (!page) page = 1;
      const dataFrom = dataPerPage * (page - 1);
      const dataTo = +dataFrom + +dataPerPage;
      let options = [];
      if (req.body.search) {
        options = req.body.search.split(",");
      }

      let data = await MedicalRecord.findAndCountAll({
        order: [["id", "DESC"]],
        distinct: true,
        col: "id",
        limit: dataPerPage,
        offset: dataFrom,
        include: [
          {
            model: SymptomRecord,
            as: "MatchSymptoms",
            where: { SymptomId: options },
          },
          {
            model: SymptomRecord,
            as: "FullSymptoms",
          },
        ],
      });
      const maxPage = Math.ceil(data.count / dataPerPage);

      data.total_data = data.count;
      data.current_page = +page;
      data.data_per_page = +dataPerPage;
      data.data_from = dataFrom + 1;
      data.data_to = dataTo;
      data.last_page = maxPage;
      data.data = data.rows;
      delete data.rows;
      delete data.count;
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }

  static async getSymptRecordRank(req, res) {
    try {
      // data to get
      console.time("Exec");
      console.timeLog("Exec");
      console.log("Find Symptom");
      let dataSymptoms = await Symptom.findAll({
        order: [["id", "DESC"]],
        // limit: 12,
        include: [
          {
            model: Body,
          },
          {
            model: Sign,
          },
        ],
      });

      dataSymptoms = dataSymptoms.map((el) => {
        return {
          id: el.id,
          BodyName: el.Body.name,
          SignName: el.Sign.name,
        };
      });
      console.log(dataSymptoms.length);
      let dataDiseases = await Disease.findAll();
      console.log(dataDiseases.length);

      console.timeLog("Exec");

      let { dataToCompare, page } = req.query;
      if (!dataToCompare) dataToCompare = 100;
      if (!page) page = 1;
      const dataFrom = dataToCompare * (page - 1);
      const dataTo = +dataFrom + +dataToCompare;
      let options = req.query.search.split(",").join(' OR "SymptomId" = ');

      console.timeLog("Exec");
      console.log("Find Symptom Record");

      let data = {};
      data.rows = await SymptomRecord.findAll({
        attributes: [
          "MedicalRecordId",
          [
            sequelize.literal(
              `array_agg("SymptomId") filter (WHERE "SymptomId" = ${options})`
            ),
            "MatchSymptoms",
          ],
          [
            sequelize.fn("array_agg", sequelize.col("SymptomId")),
            "FullSymptoms",
          ],
          [sequelize.fn("array_agg", sequelize.col("MedicalRecord"))],
        ],
        // limit: 10,
        group: ["MedicalRecordId"],
      });
      // res.send(data);
      // const medrec = data.map((el) => el.MedicalRecordId);

      // let dataFull = await SymptomRecord.findAll({
      //   attributes: [
      //     "SymptonId"
      //   ],
      //   limit: 100,
      //   where: { SymptomId: [71, 32] },
      //   group: ["MedicalRecordId"],
      // });

      // let data = await MedicalRecord.findAndCountAll({
      //   order: [["id", "DESC"]],
      //   distinct: true,
      //   col: "id",
      //   limit: dataToCompare,
      //   include: [
      //     {
      //       model: SymptomRecord,
      //       required: true,
      //       as: "MatchSymptoms",
      //       where: { SymptomId: options },
      //       include: {
      //         model: Symptom,
      //         include: [
      //           {
      //             model: Body,
      //           },
      //           {
      //             model: Sign,
      //           },
      //         ],
      //       },
      //     },
      // {
      //   model: SymptomRecord,
      //   as: "FullSymptoms",
      //   include: {
      //     model: Symptom,
      //     include: [
      //       {
      //         model: Body,
      //       },
      //       {
      //         model: Sign,
      //       },
      //     ],
      //   },
      // },
      // { model: Disease },
      //   ],
      // });
      console.log(data.rows[0]);
      console.timeLog("Exec");
      data.count = data.rows.length;
      console.timeLog("Exec");
      console.log("Find Percentage");

      data.rows = data.rows.map((el) => {
        el = el.dataValues;
        let valPercentage = el.MatchSymptoms.length;
        if (valPercentage > el.FullSymptoms.length) {
          valPercentage =
            el.MatchSymptoms.length -
            (el.MatchSymptoms.length - el.FullSymptoms.length);
        }
        if ((valPercentage / el.FullSymptoms.length) * 100 < 20) {
        } else {
          el.percentage = (valPercentage / el.FullSymptoms.length) * 100;

          return el;
        }
      });
      // desc sort
      console.timeLog("Exec");
      console.log("Sorting");

      data.rows = data.rows.sort((a, b) => {
        return a.percentage < b.percentage ? 1 : -1;
      });
      data.rows = data.rows.sort((a, b) => {
        if (a.percentage == b.percentage) {
          return a.count < b.count ? 1 : -1;
        }
      });
      console.timeLog("Exec");
      console.log("Filtering Null");

      data.rows = data.rows.filter((el) => el != null);
      console.log("Counting");

      // for (const i in data.rows) {
      //   let count = 0;
      //   for (const j in data.rows) {
      //     if (
      //       data.rows[i].DiseaseId == data.rows[j].DiseaseId &&
      //       data.rows[i].percentage == data.rows[j].percentage
      //     )
      //       count++;
      //   }
      //   data.rows[i].count = count;
      // }
      console.timeLog("Exec");

      // data.rows = data.rows.reduce((acc, current) => {
      //   const x = acc.find(
      //     (item) =>
      //       item.DiseaseId === current.DiseaseId &&
      //       item.percentage === current.percentage
      //   );
      //   if (!x) {
      //     return acc.concat([current]);
      //   } else {
      //     return acc;
      //   }
      // }, []);
      data.rows = data.rows.slice(0, 20);

      data.rows = data.rows.map((el) => {
        el.SearchSymptoms = el.MatchSymptoms.map((elMatch) => {
          let symptomsName = dataSymptoms.find(
            (elFind) => elFind.id == elMatch
          );
          return `${symptomsName.BodyName.toUpperCase()}: ${symptomsName.SignName.toUpperCase()}`;
        });

        el.RecordSymptoms = el.FullSymptoms.map((elMatch) => {
          let symptomsName = dataSymptoms.find(
            (elFind) => elFind.id == elMatch
          );
          return `${symptomsName.BodyName.toUpperCase()}: ${symptomsName.SignName.toUpperCase()}`;
        });
        el.MatchSymptoms = el.MatchSymptoms.length;
        el.FullSymptoms = el.FullSymptoms.length;
        return el;
      });
      // remove empty array

      // console.log(data);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = Controller;
