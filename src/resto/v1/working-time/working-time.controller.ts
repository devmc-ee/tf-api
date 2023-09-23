import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseWorkingTimeDto } from './dto/response-working-time.dto';
import { WorkingTimeService } from './working-time.service';

@Controller('resto/v1/working-time')
export class WorkingTimeController {
  constructor(private readonly workingTimeService: WorkingTimeService) {}
  @ApiResponse({
    status: 200,
    description: '',
    type: [ResponseWorkingTimeDto],
  })
  @Get()
  async findAll(): Promise<ResponseWorkingTimeDto[]> {
    return await this.workingTimeService.findAll();
  }
}
