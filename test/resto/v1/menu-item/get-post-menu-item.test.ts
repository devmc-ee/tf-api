import { before, after } from 'mocha';
import { expect } from 'chai';
import {
  closeConn,
  connectDbAndClear,
  insertData,
} from '../../../utils/dbHelper';
import { requester } from '../../../utils/requester';
import { MODEL_NAME } from '../../../../src/config/model.type';
import mongoose from 'mongoose';
import { IMenuGroup } from '../../../../src/resto/v1/menu-group/menu-group.type';
import { MenuGroupSchema } from '../../../../src/resto/v1/menu-group/entities/menu-group.schema';
import { IMenuItemModel } from 'src/resto/v1/menu-item/menu-item.type';
const MENU_ITEMS_URL = '/resto/v1/menu-items';

describe(`GET POST ${MENU_ITEMS_URL}`, () => {
  let conn: typeof mongoose;

  let menuItem;

  before(async () => {
    conn = await connectDbAndClear(MODEL_NAME.MENU_ITEM, MODEL_NAME.MENU_GROUP);
    const newGroup = await insertData<
      Partial<IMenuGroup> | Partial<IMenuItemModel>
    >(
      {
        [MODEL_NAME.MENU_GROUP]: [
          {
            name: 'Soup',
            description: '',
          },
        ],
      },
      conn,
    );

    menuItem = {
      name: 'Item',
      description: '',
      hidden: false,
      soldOut: false,
      price: '10',
      code: 'code',
      groupId: newGroup.insertedIds['0'],
    };
  });

  it('should fail to create an item', async () => {
    for (const field in menuItem) {
      const itemClone = { ...menuItem, [field]: undefined };

      const response = await requester.post(MENU_ITEMS_URL).send(itemClone);
      expect(response.statusCode).equals(400);
    }
  });

  it('should create menu items and return a list', async () => {
    await requester.get(MENU_ITEMS_URL).expect(200).expect([]);

    let response = await requester.post(MENU_ITEMS_URL).send(menuItem);
    expect(response.statusCode).equals(201);

    expect(response.body).to.have.property('id');
    expect(response.body).includes({
      ...menuItem,
      groupId: menuItem.groupId.toString(),
    });

    response = await requester.get(MENU_ITEMS_URL).expect(200);

    expect(response.body.length).to.be.greaterThan(0);
    expect(response.body[0]).includes({
      ...menuItem,
      groupId: menuItem.groupId.toString(),
    });

    expect(
      response.body[0],
      'id should be exposed in the response',
    ).to.have.property('id');
    expect(response.body[0], 'should be filtered out _id').not.to.have.property(
      '_id',
    );

    const group = await conn
      .model(MODEL_NAME.MENU_GROUP, MenuGroupSchema)
      .findById(response.body[0].groupId)
      .exec();

    expect(group, 'has a group with the id from new menu item').includes({
      name: 'Soup',
      description: '',
    });

    response = await requester.post(MENU_ITEMS_URL).send(menuItem);

    expect(response.statusCode, 'should fail to create a duplicate').equals(
      409,
    );
  });

  after(async () => {
    await closeConn(conn);
  });
});
