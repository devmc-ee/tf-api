import { before, after } from 'mocha';
import { expect } from 'chai';
import { closeConn, connectDbAndClear } from '../../../utils/dbHelper';
import { requester } from '../../../utils/requester';
import { MODEL_NAME } from '../../../../src/model.type';

const MENU_GROUPS_URL = '/resto/v1/menu-groups';

describe(`GET and POST ${MENU_GROUPS_URL}`, () => {
  let conn: typeof import('mongoose');

  before(async () => {
    conn = await connectDbAndClear(MODEL_NAME.MENU_GROUP);
  });

  it('should create menu group and return a list', async () => {
    let response = await requester.get(MENU_GROUPS_URL).expect(200).expect([]);

    response = await requester.post(MENU_GROUPS_URL).send({
      name: 'Soups',
      description: '',
    });

    expect(response.statusCode).equals(201);

    expect(response.body).to.have.property('id');
    expect(response.body).includes({
      name: 'Soups',
      description: '',
    });

    response = await requester.get(MENU_GROUPS_URL).expect(200);

    expect(response.body.length).equals(1);
    expect(response.body[0]).includes({
      name: 'Soups',
      description: '',
    });

    response = await requester.post(MENU_GROUPS_URL).send({
      name: 'Soups',
      description: '',
    });

    expect(response.statusCode, 'should fail to create douplicate').equals(409);
  });

  after(async () => {
    await closeConn(conn);
  });
});
