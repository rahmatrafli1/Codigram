# Init package using yarn

```bash
yarn init -y
```

# Package Installation

```bash
yarn add bcrypt cors dotenv express jsonwebtoken multer pg sequelize

yarn add -D nodemon sequelize-cli
```

# Init models sequelize

```bash
yarn sequelize-cli init
```

# Script for create database using Sequelize-CLI

```bash
yarn sequelize-cli db:create
```

# Script for generate model using Sequelize-CLI

For example:

```bash
yarn sequelize-cli model:generate --name User --attributes name:string,username:string,email:string,password:string,image:string,image_url:string,address:text,nohp:string

yarn sequelize-cli model:generate --name Post --attributes name:string,description:text,image:string,image_url:string,userId:integer
```

# Script for migration model to database using Sequelize-CLI

```bash
yarn sequelize-cli db:migrate
```

# Start Server

```bash
yarn start
```
