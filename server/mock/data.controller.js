const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

async function addData(payload, dbName) {
  dataPath = path.join(__dirname, `${dbName}.json`);
  const data = await getData(dataPath);

  // const newData = {
  //   ...payload,
  // };
  // console.log(newData);
  data.push(payload);
  await saveData(data, dataPath);
  console.log(chalk.bgGreen("data was added"));
}

async function editData(payload, dataPath) {
  const data = await getData(dataPath);
  const index = data.findIndex((d) => d._id === payload._id);
  if (index >= 0) {
    data[index] = { ...data[index], ...payload };
    await saveData(data, dataPath);
    console.log(
      chalk.bgGreen(`Note with id="${payload._id}" has been updated!`)
    );
  }
}

async function saveData(data, dataPath) {
  await fs.writeFile(dataPath, JSON.stringify(data));
}

async function getData(dataPath) {
  const data = await fs.readFile(dataPath, { encoding: "utf-8" });
  return data === ""
    ? []
    : Array.isArray(JSON.parse(data))
    ? JSON.parse(data)
    : [];
}

async function removeData(id, dataPath) {
  const data = await getData();
  const newData = notes.filter((note) => note.id !== id);

  await saveData(newNotes, dataPath);
  console.log(chalk.red("data has been deleted"));
}

module.exports = {
  addData,
  removeData,
  getData,
  editData,
};
