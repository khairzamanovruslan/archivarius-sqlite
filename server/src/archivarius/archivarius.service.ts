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
        const wordResPrepeare = await this.ResultWordRepository.findAll();
        const pathResPrepeare = await this.ResultPathRepository.findAll();
        const wordResult = wordResPrepeare.map((item) => ({
          word: item.dataValues.word,
          quantity: item.dataValues.quantity,
        }));
        const pathResult = pathResPrepeare.map((item) => ({
          fullPath: item.dataValues.fullPath,
          word: item.dataValues.word,
        }));
        return { eventDataResult, wordResult, pathResult };
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
}
