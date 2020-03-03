import * as fs from "fs";

export const saveListToFile = (list: string[]) => {
  const content = list.join("\n");
  fs.writeFile("./downloaded.txt", content, err => {
    if (err) throw err;
    console.log("Downloaded list of S3 object created,");
  });
};
