# Catholic Singles Client Application

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
