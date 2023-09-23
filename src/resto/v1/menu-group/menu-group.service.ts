import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuGroupDto } from './dtos/create-menu-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MenuGroup } from './entities/menu-group.schema';
import { Model } from 'mongoose';
import { ResponseMenuGroupDto } from './dtos/response-menu-group.dto';
import { UpdateMenuGroupDto } from './dtos/update-menu-group.dto';
import { ERROR_CODE } from 'src/app.type';

@Injectable()
export class MenuGroupService {
  constructor(
    @InjectModel(MenuGroup.name)
    private readonly menuGroupModel: Model<MenuGroup>,
  ) {}
  async create(
    createMenuGroupDto: CreateMenuGroupDto,
  ): Promise<ResponseMenuGroupDto> {
    const newMenuGroupDocument = new this.menuGroupModel(createMenuGroupDto);

    const newMenuGroup = await newMenuGroupDocument.save();

    return new ResponseMenuGroupDto(newMenuGroup.toObject());
  }

  async update(id: string, updateMenuGroupDto: UpdateMenuGroupDto) { console.log({updateMenuGroupDto})
    const menuGroup = await this.menuGroupModel
      .updateOne({ _id: id }, updateMenuGroupDto)
      .exec();

    if (!menuGroup.modifiedCount) {
      throw new HttpException(
        `Menu group not found, ${ERROR_CODE.MENU_GROUP_NOT_FOUND}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedGroup = await this.menuGroupModel.findOne({ _id: id }).exec();

    return new ResponseMenuGroupDto(updatedGroup.toObject());
  }

  async findAll(): Promise<ResponseMenuGroupDto[]> {
    const groups = await this.menuGroupModel.find().exec();
    return groups.map((group) => new ResponseMenuGroupDto(group.toObject()));
  }

  findOne(id: number) {
    return `This action returns a #${id} menuGroup`;
  }

  async remove(id: string) {
    const menuGroup = await this.menuGroupModel.deleteOne({ _id: id }).exec();

    if (!menuGroup.deletedCount) {
      throw new HttpException(
        `Menu group not found, ${ERROR_CODE.MENU_GROUP_NOT_FOUND}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
