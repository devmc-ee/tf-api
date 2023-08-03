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
import { IMenuItemModel } from 'src/resto/v1/menu-item/menu-item.type';

const MENU_URL = '/resto/v1/menu';

describe(`GET POST ${MENU_URL}`, () => {
  let conn: typeof mongoose;
  let groups;

  before(async () => {
    conn = await connectDbAndClear(MODEL_NAME.MENU_ITEM, MODEL_NAME.MENU_GROUP);
    groups = await insertData<Partial<IMenuGroup> | Partial<IMenuItemModel>>(
      {
        [MODEL_NAME.MENU_GROUP]: [
          {
            name: 'Soups',
            description: '',
          },
          {
            name: 'Appetizers',
            description: '',
          },
          {
            name: 'Rice',
            description: '',
          },
        ],
      },
      conn,
    );

    await insertData<Partial<IMenuItemModel>>(
      {
        [MODEL_NAME.MENU_ITEM]: [
          {
            name: 'Item1',
            description: '',
            hidden: false,
            soldOut: false,
            price: '10',
            code: 'code',
            groupId: groups.insertedIds['0'],
          },
          {
            name: 'Item1',
            description: '',
            hidden: false,
            soldOut: false,
            price: '10',
            code: 'code2',
            groupId: groups.insertedIds['1'],
          },
          {
            name: 'Item3',
            description: '',
            hidden: true,
            soldOut: false,
            price: '10',
            code: 'code3',
            groupId: groups.insertedIds['1'],
          },
        ],
      },
      conn,
    );
  });

  it('should return a list of menu', async () => {
    const response = await requester.get(MENU_URL).expect(200);

    const { body } = response;

    expect(Array.isArray(body), 'body response is an array').equal(true); // is truesh
    const soupsCategory = body.find(({ name }) => name === 'Soups');
    const appetizersCategory = body.find(({ name }) => name === 'Appetizers');
    const riceCategory = body.find(({ name }) => name === 'Rice');

    expect(soupsCategory).to.have.property('items');

    expect(soupsCategory.items.length).equals(1);
    expect(soupsCategory.items[0]).includes({
      name: 'Item1',
      description: '',
      hidden: false,
      soldOut: false,
      price: '10',
      code: 'code',
      groupId: groups.insertedIds['0'].toString(),
    });
    expect(soupsCategory.items[0]).to.have.property('id');

    expect(appetizersCategory).to.have.property('items');
    expect(appetizersCategory.items.length).equals(1);

    expect(!!riceCategory, 'should be undefined').equals(false);
  });

  after(async () => {
    await closeConn(conn);
  });
});
