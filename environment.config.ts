const ENVIRONMENT: string = process.env.APP_DOMAIN || 'http://localhost:3000';
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5001;
const CONNECTOR: string = process.env.CONNECTOR || '';
const JWTKEY: string = process.env.JWTKEY || '';

export default {
  ENVIRONMENT,
  PORT,
  CONNECTOR,
  JWTKEY,
};
