import { config } from 'dotenv';
import envGuard from './utils/envGuard';
config({ path: '.env.test' });

envGuard();
