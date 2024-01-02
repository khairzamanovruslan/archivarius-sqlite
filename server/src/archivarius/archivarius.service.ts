import { Injectable } from "@nestjs/common";
import { ResultPath } from "./model/resultPath.model";
import { InjectModel } from "@nestjs/sequelize";
import { ConnectionDto } from "./dto/connection.dto";
import { prepareSelectionUtils } from "./utils/prepareSelectionUtils";
import { StartDto } from "./dto/start.dto";
import { axiosUrlUtils } from "./utils/axiosUrlUtils";
import { prepareFullPathsUtils } from "./utils/prepareFullPathsUtils";
import { ResultWord } from "./model/resultWord.model";
import { EventData } from "./model/eventData.model";
import { mkdirDesktopUtils } from "./utils/mkdirDesktopUtils";
import * as fs from "fs";
import * as path from "path";
import { Op } from "sequelize";

@Injectable()
export class ArchivariusService {
  constructor(
    @InjectModel(ResultPath) private ResultPathRepository: typeof ResultPath,
    @InjectModel(ResultWord) private ResultWordRepository: typeof ResultWord,
    @InjectModel(EventData) private EventDataRepository: typeof EventData
  ) {}

  async connection(dto: ConnectionDto) {
    try {
      const url = `http://${dto.serverIp}:${dto.serverPort}`;
      const $ = await axiosUrlUtils(url);
      const selection = $("select").html();
      const selectionResult = await prepareSelectionUtils(selection);
      console.log("Успешно подключен к Архивариусу");
      return selectionResult;
    } catch (e) {
      console.log("Нет подключения к Архивариусу");
      return {
        error: 103,
        message:
          "Нет подключения к Архивариусу. Проверьте ip-адрес и порт в Архивариусе!",
      };
    }
  }

  async start(dto: StartDto) {
    //очищаем таблицы
    await this.ResultPathRepository.destroy({ truncate: true });
    await this.ResultWordRepository.destroy({ truncate: true });
    await this.EventDataRepository.destroy({ truncate: true });
    const wordsFromFile = dto.textFile.split("\r\n");
    const wordsFrom = wordsFromFile.filter(Boolean);
    this.EventDataRepository.create({
      optionId: dto.optionId,
      optionTitle: dto.optionTitle,
      wordCount: wordsFrom.length,
    });
    const funcRes = async (
      serverIp: string,
      serverPort: string,
      word: string,
      area: string
    ) => {
      const wordToPlus = word.split(" ").join("+");
      const url = `http://${serverIp}:${serverPort}/search?q="${wordToPlus}"&z=${area}&sort=rate&sortdir=asc`;
      const $ = await axiosUrlUtils(url);
      const fullPaths = await prepareFullPathsUtils($);
      const fullPathsResult = fullPaths.map((path) => ({
        fullPath: path,
        word: word,
      }));
      await this.ResultPathRepository.bulkCreate(fullPathsResult);
      await this.ResultWordRepository.create({
        word: word,
        quantity: fullPaths.length,
      });
    };

    const fetchWord = wordsFrom.map((word) => {
      return funcRes(dto.serverIp, dto.serverPort, word, dto.optionId);
    });

    let final_promise = await Promise.all(fetchWord)
      .then(async () => {
        const eventDataResult = await this.EventDataRepository.findOne();
        const wordsResult = await this.ResultWordRepository.findAll({
          raw: true,
        });
        const pathsResult = await this.ResultPathRepository.findAll({
          raw: true,
        });
        return { eventDataResult, wordsResult, pathsResult };
      })
      .catch((e) => {
        console.log("Promise.all catch");
        return {
          error: 103,
          message:
            "Нет подключения к Архивариусу. Проверьте ip-адрес и порт в Архивариусе!",
        };
      });
    return final_promise;
  }

  async reportWordsDetailed() {
    try {
      const directoryForSavingReports = await mkdirDesktopUtils();
      const fileName = path.resolve(
        String(directoryForSavingReports),
        `кл.слова (подробно).txt`
      );
      const wordsData = await this.ResultWordRepository.findAll({
        raw: true,
        attributes: ["word", "quantity"],
      });
      const wordsDataSorted = wordsData.sort((a, b) => b.quantity - a.quantity);
      const wordsResult = wordsDataSorted.map(
        (item) => item.word + "&" + item.quantity
      );

      const writeFile = () =>
        new Promise((resolve, reject) => {
          fs.writeFile(fileName, `${wordsResult.join("\n")}`, (err) => {
            if (err) reject(err);
            else {
              console.log(`Файл успешно записан - ${fileName}`);
              return resolve(fileName);
            }
          });
        });
      const fileNameResult = await writeFile();
      return [fileNameResult];
    } catch (e) {
      console.log("Нет подключения к Архивариусу");
    }
  }

  async reportWordsSuccess() {
    try {
      const directoryForSavingReports = await mkdirDesktopUtils();
      const fileName = path.resolve(
        String(directoryForSavingReports),
        `обнаруженные кл.слова (список).txt`
      );
      const wordsData = await this.ResultWordRepository.findAll({
        raw: true,
        attributes: ["word", "quantity"],
        where: { quantity: { [Op.gt]: 0 } },
      });
      const wordsDataSorted = wordsData.sort((a, b) => b.quantity - a.quantity);
      const wordsDataWords = wordsDataSorted.map((item) => item.word);

      const writeFile = () =>
        new Promise((resolve, reject) => {
          fs.writeFile(fileName, `${wordsDataWords.join("\n")}`, (err) => {
            if (err) reject(err);
            else {
              console.log(`Файл успешно записан - ${fileName}`);
              return resolve(fileName);
            }
          });
        });
      const fileNameResult = await writeFile();

      return [fileNameResult];
    } catch (e) {
      console.log("Нет подключения к Архивариусу");
    }
  }

  async reportWordsSuccessRecord() {
    try {
      const directoryForSavingReports = await mkdirDesktopUtils();
      const fileName = path.resolve(
        String(directoryForSavingReports),
        `обнаруженные кл.слова (в ковычках).txt`
      );
      const wordsData = await this.ResultWordRepository.findAll({
        raw: true,
        attributes: ["word", "quantity"],
        where: { quantity: { [Op.gt]: 0 } },
      });
      const wordsDataSorted = wordsData.sort((a, b) => b.quantity - a.quantity);
      const wordsDataWords = wordsDataSorted.map((item) => `«${item.word}», `);

      const writeFile = () =>
        new Promise((resolve, reject) => {
          fs.writeFile(fileName, `${wordsDataWords.join("")}`, (err) => {
            if (err) reject(err);
            else {
              console.log(`Файл успешно записан - ${fileName}`);
              return resolve(fileName);
            }
          });
        });
      const fileNameResult = await writeFile();
      return [fileNameResult];
    } catch (e) {
      console.log("Нет подключения к Архивариусу");
    }
  }
  async reportWordsFail() {
    try {
      const directoryForSavingReports = await mkdirDesktopUtils();
      const fileName = path.resolve(
        String(directoryForSavingReports),
        `не обнаруженные кл.слова (список).txt`
      );
      const wordsData = await this.ResultWordRepository.findAll({
        raw: true,
        attributes: ["word", "quantity"],
        where: { quantity: { [Op.eq]: 0 } },
      });
      const wordsDataWords = wordsData.map((item) => item.word);
      const writeFile = () =>
        new Promise((resolve, reject) => {
          fs.writeFile(fileName, `${wordsDataWords.join("\n")}`, (err) => {
            if (err) reject(err);
            else {
              console.log(`Файл успешно записан - ${fileName}`);
              return resolve(fileName);
            }
          });
        });
      const fileNameResult = await writeFile();
      return [fileNameResult];
    } catch (e) {
      console.log("Нет подключения к Архивариусу");
    }
  }
  async reportWordsFailRecord() {
    try {
      const directoryForSavingReports = await mkdirDesktopUtils();
      const fileName = path.resolve(
        String(directoryForSavingReports),
        `не обнаруженные кл.слова (в ковычках).txt`
      );
      const wordsData = await this.ResultWordRepository.findAll({
        raw: true,
        attributes: ["word", "quantity"],
        where: { quantity: { [Op.eq]: 0 } },
      });
      const wordsDataWords = wordsData.map((item) => `«${item.word}», `);

      const writeFile = () =>
        new Promise((resolve, reject) => {
          fs.writeFile(fileName, wordsDataWords.join(""), (err) => {
            if (err) reject(err);
            else {
              console.log(`Файл успешно записан - ${fileName}`);
              return resolve(fileName);
            }
          });
        });
      const fileNameResult = await writeFile();
      return [fileNameResult];
    } catch (e) {
      console.log("Нет подключения к Архивариусу");
    }
  }

  async reportPathsDetailed() {
    try {
      const directoryForSavingReports = await mkdirDesktopUtils();
      const fileName = path.resolve(
        String(directoryForSavingReports),
        `полные пути до файлов (подробно).txt`
      );
      const pathsData = await this.ResultPathRepository.findAll({
        raw: true,
        attributes: ["fullPath", "word"],
      });
      const pathsResult = pathsData.map(
        (item) => item.fullPath + "&" + item.word
      );

      const writeFile = () =>
        new Promise((resolve, reject) => {
          fs.writeFile(fileName, `${pathsResult.join("\n")}`, (err) => {
            if (err) reject(err);
            else {
              console.log(`Файл успешно записан - ${fileName}`);
              return resolve(fileName);
            }
          });
        });
      const fileNameResult = await writeFile();
      return [fileNameResult];
    } catch (e) {
      console.log("Нет подключения к Архивариусу");
    }
  }
  async reportPaths() {
    try {
      const directoryForSavingReports = await mkdirDesktopUtils();
      const fileName = path.resolve(
        String(directoryForSavingReports),
        `полные пути до файлов.txt`
      );
      const pathsData = await this.ResultPathRepository.findAll({
        raw: true,
        attributes: ["fullPath", "word"],
      });
      const pathsResult = pathsData.map((item) => item.fullPath);
      const writeFile = () =>
        new Promise((resolve, reject) => {
          fs.writeFile(fileName, `${pathsResult.join("\n")}`, (err) => {
            if (err) reject(err);
            else {
              console.log(`Файл успешно записан - ${fileName}`);
              return resolve(fileName);
            }
          });
        });
      const fileNameResult = await writeFile();
      return [fileNameResult];
    } catch (e) {
      console.log("Нет подключения к Архивариусу");
    }
  }

  async reportDescription() {
    try {
      const directoryForSavingReports = await mkdirDesktopUtils();
      const fileName = path.resolve(
        String(directoryForSavingReports),
        `Область поиска, когда искал.txt`
      );
      const eventData = await this.EventDataRepository.findAll({
        raw: true,
        attributes: ["optionTitle", "createdAt"],
      });
      const writeFile = () =>
        new Promise((resolve, reject) => {
          fs.writeFile(
            fileName,
            `${eventData[0].optionTitle}\n${
              eventData[0].createdAt.split(".")[0]
            }`,
            (err) => {
              if (err) reject(err);
              else {
                console.log(`Файл успешно записан - ${fileName}`);
                return resolve(fileName);
              }
            }
          );
        });
      const fileNameResult = await writeFile();
      return [fileNameResult];
    } catch (e) {
      console.log("Нет подключения к Архивариусу");
    }
  }
}
