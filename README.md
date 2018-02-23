# Catholic Singles Client Application

![proto](https://content.screencast.com/users/prageer/folders/Default/media/b17942ca-0493-4f77-ad86-8a95fda9cccb/catholicsingles.png)

## Following technologies are used
- axios
- babel
- express
- bcryptjs
- mongoose
- react
- react-router-dom
- react-select
- recompose
- react-addons-css-transition-group
- immutable
- redux
- redux-saga
- redux-immutable
- materializecss
- react-hot-loader
- webpack
- webpack-dev-server
- style-loader
- css-loader

## Prerequisites

- Node.js 6^
- npm 3^
- MongoDB 3^

## Running in development

```
yarn install
yarn start
```

## Deployment

This application uses capistrano for deployment.  Once you have appropriate SSH
access to the server, deploys can be automated.

### Setting up Capistrano

You will need a recent version of Ruby installed.

```
gem install bundler
bundle install # Fetches capistrano and capistrano dependencies
```

### Deploying to staging and production servers

To deploy to staging, use `cap staging deploy`

To deploy to production, use `cap production deploy`
