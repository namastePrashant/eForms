#lock "~> 3.12.1"

set :application, "Altimate_frontend"
set :repo_url, "git@git.ktmlabs.com:sundar.shahi/altimate-frontend.git"
set :slackistrano, {
  klass: Slackistrano::CustomMessaging,
  channel: '#notifications',
  webhook: 'https://hooks.slack.com/services/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'
}
set :ssh_options, { forward_agent: true, auth_methods: %w(publickey) }
set :keep_releases, 2
# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp


#append :linked_files, 'src/services/api_routes/constants.js'
#append :linked_files, '.env'                                                     
append :linked_dirs, 'node_modules'

#task :deploy do
#  on roles(:app), in: :sequence, wait: 5 do
#	execute "cd #{deploy_to}/current
#	rm -r build
#	unzip build.zip"
#  end
#end

set :yarn_flags, %w(--silent --no-progress)
namespace :deploy do
  task :yarn_deploy do
    on roles fetch(:yarn_roles) do
      within fetch(:yarn_target_path, release_path) do
        execute fetch(:yarn_bin), 'build'
      end
    end
  end
  
  before "symlink:release", :yarn_deploy
end
