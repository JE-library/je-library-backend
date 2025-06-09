const fs = require("fs/promises");
const path = require("path");
const { title } = require("process");

// GETTING FILE PATH
const getFilePath = (filename) => {
  const filePath = path.join(__dirname, "../data", filename);
  return filePath;
};

// READING FILE
const readFile = async (filename) => {
  const filePath = getFilePath(filename);
  const data = await fs.readFile(filePath, "utf-8");
  if (!data.trim()) return [];
  return JSON.parse(data);
};

// WRITING FILE
const writeFile = async (filename, data) => {
  const filePath = getFilePath(filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2 ));
};

module.exports = { readFile, writeFile };

// SAMPLE WITH JOI

// const postedData = {
//   title: "To Kill a Mockingbird",
//   author: "Harper Lee",
//   yearPublished: "4",
//   genre: "Fiction",
//   isAvailable: false,
// };

// const addBookSchema = joi.object({
//   title: joi.string().required(),
//   author: joi.string().required(),
//   yearPublished: joi.string().min(4).max(4).required(),
//   genre: joi.string().required(),
//   isAvailable: joi.boolean(),
// });

// const response = addBookSchema.validate(postedData);
