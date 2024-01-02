import * as fs from "fs";
import * as path from "path";
import * as os from "os";

export const mkdirDesktopUtils = async () => {
  const desktop = path.resolve(os.homedir(), "Desktop", "archivarius_log");

  const mkdirDesktop = () =>
    new Promise((resolve, reject) => {
      fs.mkdir(desktop, { recursive: true }, (err) => {
        if (err) reject(err);
        else {
          console.log("Directory created successfully!", desktop);
          return resolve(desktop);
        }
      });
    });

  return mkdirDesktop().then((data) => data);
};
