const dotenv = require("dotenv");

dotenv.config({
  path: process.env.NODE_ENV === "prod" ? ".env.production" : ".env.dev",
});

// console.log(process.env);

process.env.NODE_ENV === "prod"
  ? (module.exports = {
      type: "postgres",
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      port: process.env.DATABASE_PORT,
      migrations: [process.env.TYPEORM_MIGRATIONS],
      entities: [process.env.TYPEORM_ENTITIES],
      cli: {
        migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
      },
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    })
  : (module.exports = {
      type: "postgres",
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      port: process.env.DATABASE_PORT,
      migrations: [process.env.TYPEORM_MIGRATIONS],
      entities: [process.env.TYPEORM_ENTITIES],
      cli: {
        migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR,
      },
    });
