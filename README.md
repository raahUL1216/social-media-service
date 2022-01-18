# Social media service
### APIs for a twitter like social media platform

This service is a collection of APIs for a twitter like social media platform. It supports features like,
- Getting a user profile
- Follow a user
- Unfollow a user
- Upload a post
- Delete a post
- Like a post
- Unlike a liked post
- Comment on a post
- Show post
- Show all user posts

This service is built with Node.js & Postgresql.

### To run this project in development,

1. npm install
2. update postgres connection details in config.json
3. sequelize db:create
4. sequelize db:migrate

Above steps will get your database up and running. Now, start service

> node index.js

That's it. You can play with the APIs now.
