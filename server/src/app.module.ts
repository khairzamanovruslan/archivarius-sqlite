import * as path from "path";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ArchivariusModule } from "./archivarius/archivarius.module";
import { ConfigModule } from "@nestjs/config";
import { ResultPath } from "./archivarius/model/resultPath.model";
import { ResultWord } from "./archivarius/model/resultWord.model";
import { EventData } from "./archivarius/model/eventData.model";

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    SequelizeModule.forRoot({
      dialect: "sqlite",
      //name: process.env.SQLITE_NAME,
      storage: path.join(
        __dirname,
        "..",
        "src",
        "sqlite",
        "db",
        process.env.SQLITE_STORAGE
      ),
      autoLoadModels: true,
      synchronize: true,
      models: [ResultPath, ResultWord, EventData],
    }),
    ArchivariusModule,
  ],
})
export class AppModule {}
