import * as request from 'supertest';
import envGuard from './envGuard';

envGuard();

export const requester = request(`localhost:${process.env.PORT || 5002}`);
