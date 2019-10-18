require "ffaker"

namespace :db do
  task sample_data: :environment do
    %w[db:drop db:create db:migrate create_data:users create_data:node create_data:air_info].each do |task|
      Rake::Task[task].invoke
    end
    puts "done seeding sample data!"
  end
end
