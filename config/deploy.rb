# config valid for current version and patch releases of Capistrano
lock "~> 3.10.0"

set :application, "catholic-singles-react"
set :repo_url, "git@bitbucket.org:catholicsingles/react.git"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/www/staging.catholicsingles.com"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml", "config/secrets.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure

namespace :deploy do
  before :updated, 'yarn:install'
  before :updated, 'yarn:build'

  after :finishing, 'apache:reload'
  after :rollback, 'apache:reload'
end

namespace :yarn do
  desc 'Install yarn dependencies'
  task :install do
    on roles(:web) do
      within release_path do
        execute :yarn, :install
      end
    end
  end

  desc 'Build production version of react frontend'
  task :build do
    on roles(:web) do
      within release_path do
        with node_env: :production do
          execute :yarn, :build
        end
      end
    end
  end
end
