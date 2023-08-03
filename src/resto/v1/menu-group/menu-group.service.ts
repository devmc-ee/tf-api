import { Injectable } from '@nestjs/common';
import { CreateMenuGroupDto } from './dtos/create-menu-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MenuGroup } from './entities/menu-group.schema';
import { Model } from 'mongoose';
import { ResponseMenuGroupDto } from './dtos/response-menu-group.dto';

@Injectable()
export class MenuGroupService {
  constructor(
    @InjectModel(MenuGroup.name)
    private readonly menuGroupModel: Model<MenuGroup>,
  ) {}
  async create(createMenuGroupDto: CreateMenuGroupDto): Promise<MenuGroup> {
    const newMenuGroupDocument = new this.menuGroupModel(createMenuGroupDto);

    const newMenuGroup = await newMenuGroupDocument.save();

    return new ResponseMenuGroupDto(newMenuGroup.toObject());
  }

  async findAll(): Promise<ResponseMenuGroupDto[]> {
    const groups = await this.menuGroupModel.find().exec();
    return groups.map((group) => new ResponseMenuGroupDto(group.toObject()));
  }

  findOne(id: number) {
    return `This action returns a #${id} menuGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} menuGroup`;
  }
}
