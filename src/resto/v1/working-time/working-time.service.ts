import { Injectable } from '@nestjs/common';
import { ResponseWorkingTimeDto } from './dto/response-working-time.dto';
import { WorkingTime } from './entities/working-time.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateWorkingTimeDto } from './dto/update-working-time.dto';

@Injectable()
export class WorkingTimeService {
  constructor(
    @InjectModel(WorkingTime.name) private workingTimeModel: Model<WorkingTime>,
  ) {}
  async findAll(): Promise<ResponseWorkingTimeDto[]> {
    const workingTimes = await this.workingTimeModel.find({}).exec();

    return workingTimes.map(
      (workingTime) => new ResponseWorkingTimeDto(workingTime.toObject()),
    );
  }

  async update(id: string, updateWorkingTimeDto: UpdateWorkingTimeDto) {
    const workingTime = await this.workingTimeModel
      .findOneAndUpdate({ _id: id }, updateWorkingTimeDto)
      .exec();

    return new ResponseWorkingTimeDto(workingTime.toObject());
  }
}
