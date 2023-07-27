import { Injectable } from '@nestjs/common';
import { CreateMenuGroupDto } from './dto/create-menu-group.dto';
import { UpdateMenuGroupDto } from './dto/update-menu-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MenuGroup } from './entities/menu-group.schema';
import { Model } from 'mongoose';

@Injectable()
export class MenuGroupService {
  constructor(
    @InjectModel(MenuGroup.name)
    private readonly menuGroupModel: Model<MenuGroup>,
  ) {}
  async create(createMenuGroupDto: CreateMenuGroupDto): Promise<MenuGroup> {
    const newMenuGroup = new this.menuGroupModel(createMenuGroupDto);

    return newMenuGroup.save();
  }

  findAll() {
    return this.menuGroupModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} menuGroup`;
  }

  update(id: number, updateMenuGroupDto: UpdateMenuGroupDto) {
    return `This action updates a #${id} menuGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} menuGroup`;
  }
}
