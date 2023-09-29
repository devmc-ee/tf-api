import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseWorkingTimeDto } from './dto/response-working-time.dto';
import { WorkingTimeService } from './working-time.service';
import { UpdateWorkingTimeDto } from './dto/update-working-time.dto';
import { ERROR_CODE } from 'src/app.type';
import { AuthGuard } from 'src/auth/auth.guard';

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

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: '',
    type: ResponseWorkingTimeDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @Patch(':id')
  async update(
    @Body() updateWorkingTimeDto: UpdateWorkingTimeDto,
    @Param('id') id: string,
  ): Promise<ResponseWorkingTimeDto> {
    if (updateWorkingTimeDto.isOpen) {
      const [startHours, startMinutes] = updateWorkingTimeDto.start.split(':');
      const [endHours, endMinutes] = updateWorkingTimeDto.end.split(':');

      if (
        Number.parseInt(startHours) > Number.parseInt(endHours) ||
        (Number.parseInt(startHours) === Number.parseInt(endHours) &&
          Number.parseInt(startMinutes) >= Number.parseInt(endMinutes))
      ) {
        throw new HttpException(
          'Validation error: end time should be greater than start time! ' +
            ERROR_CODE.VALIDATION_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return await this.workingTimeService.update(id, updateWorkingTimeDto);
  }
}
