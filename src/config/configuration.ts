export default () => ({
  port: parseInt(`${process.env.PORT}`, 10) || 3000,
  database: {
    host: `${process.env.DATABASE_HOST}`,
    port: parseInt(`${process.env.DATABASE_PORT}`, 10) || 5432
  },
  redis: {
    host: `${process.env.REDIS_HOST}`,
    port: parseInt(`${process.env.REDIS_PORT}`, 10) || 6379,
    passwd: `${process.env.REDIS_PASSWD}`
  }
})