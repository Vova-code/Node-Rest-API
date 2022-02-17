# 🔗 Knex API 🔗

School project making a Rest Api using Node.js

## Content
This project is built using [Express.js](https://expressjs.com/fr/), [Knex.js](https://knexjs.org/) with [Objection.js](https://vincit.github.io/objection.js/) as ORM and some JWT for resources access

I used knex as my database manager using his migrations system
```bash
npx knex migration:make <migration_name>
npx knex migration:latest
npx knex migration:rollback
```

### Database
In my case I used postgres-sql in a 🐳 docker container and PGAdmin

You can pick the same [postgres](https://hub.docker.com/_/postgres) and [pgadmin](https://hub.docker.com/r/dpage/pgadmin4) images from docker-hub

## Contributing
Comments are welcome. 🎉
