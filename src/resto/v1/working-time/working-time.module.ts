import { Module } from '@nestjs/common';
import { WorkingTimeService } from './working-time.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkingTime, WorkingTimeSchema } from './entities/working-time.schema';
import { WorkingTimeController } from './working-time.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkingTime.name, schema: WorkingTimeSchema },
    ]),
  ],
  controllers: [WorkingTimeController],
  providers: [WorkingTimeService],
})
export class WorkingTimeModule {}
