import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as path from "path";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets(path.join(__dirname, "share"));
  await app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порту!`));
}

start();
