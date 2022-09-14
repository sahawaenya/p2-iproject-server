const {
  SymptomRecord,
  MedicalRecord,
  User,
  Disease,
  Symptom,
} = require("../models");
const { Op } = require("sequelize");

class Controller {
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
      let options = {};
      if (req.query.search) {
        options = {
          [Op.and]: [
            {
              "$SymptomRecords.SymptomId$": {
                [Op.iLike]: "%" + req.query.search + "%",
              },
            },
          ],
        };
      }

      let data = await MedicalRecord.findAndCountAll({
        limit: dataPerPage,
        offset: dataFrom,
        include: [
          {
            model: SymptomRecord,
            where: { SymptomId: [71, 82] },
          },
        ],
      });
      const maxPage = Math.ceil(data.count / dataPerPage);

      //   data.rows = data.rows.map((el) => {
      //     return {
      //       id: el.id,
      //       DoctorId: el.DoctorId,
      //       DoctorName: "dr. " + el.Doctor.name,
      //       DoctorImage: el.Doctor.imageUrl,
      //       PatientId: el.PatientId,
      //       PatientName: el.Patient.name,
      //       PatientImage: el.Patient.imageUrl,
      //       DiseaseId: el.DiseaseId,
      //       DiseaseName: el.Disease.name,
      //       DiseaseDesc: el.Disease.description,
      //     };
      //   });

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
}
module.exports = Controller;
