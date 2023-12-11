import { Module } from '@nestjs/common';
import { ArchivariusController } from './archivarius.controller';
import { ArchivariusService } from './archivarius.service';
import { ResultPath } from './model/resultPath.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ResultWord } from './model/resultWord.model';
import { EventData } from './model/eventData.model';

@Module({
  controllers: [ArchivariusController],
  providers: [ArchivariusService],
  imports: [
    SequelizeModule.forFeature([ResultPath, ResultWord, EventData])
  ]
})
export class ArchivariusModule { }
