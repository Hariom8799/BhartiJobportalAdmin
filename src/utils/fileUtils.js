import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "slider.json");

export const readSliderData = () => {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};

export const writeSliderData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};
