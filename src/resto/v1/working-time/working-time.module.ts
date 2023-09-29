import { Module } from '@nestjs/common';
import { WorkingTimeService } from './working-time.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkingTime, WorkingTimeSchema } from './entities/working-time.schema';
import { WorkingTimeController } from './working-time.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WorkingTime.name, schema: WorkingTimeSchema },
    ]),
    AuthModule,
  ],
  controllers: [WorkingTimeController],
  providers: [WorkingTimeService],
})
export class WorkingTimeModule {}
