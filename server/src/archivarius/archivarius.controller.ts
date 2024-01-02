import { Controller, Post, Body, Get } from "@nestjs/common";
import { StartDto } from "./dto/start.dto";
import { ArchivariusService } from "./archivarius.service";
import { ConnectionDto } from "./dto/connection.dto";

@Controller("archivarius")
export class ArchivariusController {
  constructor(private archivariusService: ArchivariusService) {}
  @Post("connection")
  connection(@Body() connectionDto: ConnectionDto) {
    console.log("server connection", connectionDto);
    return this.archivariusService.connection(connectionDto);
  }
  @Post("start")
  start(@Body() startDto: StartDto) {
    console.log("server start", startDto);
    return this.archivariusService.start(startDto);
  }
  @Get("report-words-detailed")
  reportWordsDetailed() {
    return this.archivariusService.reportWordsDetailed();
  }
  @Get("report-words-success")
  reportWordsSuccess() {
    return this.archivariusService.reportWordsSuccess();
  }
  @Get("report-words-success-record")
  reportWordsSuccessRecord() {
    return this.archivariusService.reportWordsSuccessRecord();
  }
  @Get("report-words-fail")
  reportWordsFail() {
    return this.archivariusService.reportWordsFail();
  }
  @Get("report-words-fail-record")
  reportWordsFailRecord() {
    return this.archivariusService.reportWordsFailRecord();
  }
  @Get("report-paths-detailed")
  reportPathsDetailed() {
    return this.archivariusService.reportPathsDetailed();
  }
  @Get("report-paths")
  reportPaths() {
    return this.archivariusService.reportPaths();
  }
  @Get("report-description")
  reportDescription() {
    return this.archivariusService.reportDescription();
  }
}
