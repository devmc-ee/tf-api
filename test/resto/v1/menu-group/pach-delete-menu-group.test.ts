import { before, after } from 'mocha';
import { expect } from 'chai';
import {
  closeConn,
  connectDbAndClear,
  insertData,
} from '../../../utils/dbHelper';
import { requester } from '../../../utils/requester';
import { MODEL_NAME } from '../../../../src/model.type';
import { HttpStatus } from '@nestjs/common';
import { Types } from 'mongoose';

const MENU_GROUPS_URL = '/resto/v1/menu-groups';

describe(`PATCH ${MENU_GROUPS_URL}`, () => {
  let conn: typeof import('mongoose');

  before(async () => {
    conn = await connectDbAndClear(MODEL_NAME.MENU_GROUP);
    await insertData(
      {
        [MODEL_NAME.MENU_GROUP]: [
          {
            name: 'Group Name',
            description: 'group description',
          },
        ],
      },
      conn,
    );
  });

  it('should create menu group and return a list', async () => {
    let response = await requester.get(MENU_GROUPS_URL).expect(200);

    expect(response.body.length).equal(1);

    const [group] = response.body;

    expect(group).includes({
      name: 'Group Name',
      description: 'group description',
    });

    expect(group).to.have.property('id');

    response = await requester.patch(`${MENU_GROUPS_URL}/${group.id}`).send({
      name: 'Soups',
      description: '',
    });

    expect(response.statusCode).equals(200);

    expect(response.body).to.have.property('id');
    expect(response.body).includes({
      name: 'Soups',
      description: '',
    });

    response = await requester
      .delete(`${MENU_GROUPS_URL}/${group.id}`)
      .expect(200);
  });

  it('should fail to patch group', async () => {
    const id = new Types.ObjectId(Buffer.alloc(12, 'invalidId'));
    await requester
      .patch(`${MENU_GROUPS_URL}/${id.toString()}`)
      .send({
        name: 'Soups',
        description: '',
      })
      .expect(HttpStatus.NOT_FOUND);
  });

  it('should fail to delete group', async () => {
    const id = new Types.ObjectId(Buffer.alloc(12, 'invalidId'));
    await requester
      .delete(`${MENU_GROUPS_URL}/${id.toString()}`)
      .expect(HttpStatus.NOT_FOUND);
  });

  after(async () => {
    await closeConn(conn);
  });
});
