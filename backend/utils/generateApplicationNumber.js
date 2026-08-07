import Student from "../models/Student.js";

const generateApplicationNumber = async () => {

    const year = new Date().getFullYear();

    while (true) {

        const random = Math.floor(
            10000 + Math.random() * 90000
        );

        const admissionNumber =
            `SPIS${year}${random}`;

        const exists = await Student.findOne({
            admissionNumber,
        });

        if (!exists) {

            return admissionNumber;

        }

    }

};

export default generateApplicationNumber;