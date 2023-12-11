import { Controller, Post, Body } from "@nestjs/common";
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
}
