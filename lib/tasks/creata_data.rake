require "ffaker"
require "random-location"
desc "Load fake data for development/testing."

NUM_USERS = 10
NUM_ADMIN_NODES = 100
NUM_USER_NODES = 100
NUM_DATA = 200

namespace :create_data do
  task users: :environment do
    admin = User.create({
      name: FFaker::Name.name,
      email:"admin@toang.com",
      password: "123456",
      type_id: 3
    })
    admin.save!

    NUM_USERS.times do
      user = User.create({
        name: FFaker::Name.name,
        email: FFaker::Internet.email,
        password: "123456",
        type_id: 2
      })
      user.save!
    end
  end

  task node: :environment do
    NUM_ADMIN_NODES.times do
      radius = rand(1000..50000)
      latitude, longitude = RandomLocation.near_by(21.0333, 105.85, radius) #Hanoi cordinates
      node = Node.create({
        user_id: User.first.id,
        latitude: latitude,
        longitude: longitude
      })
      node.save!
    end

    NUM_USER_NODES.times do
      radius = rand(1000..10000)
      latitude, longitude = RandomLocation.near_by(21.0333, 105.85, radius) #Hanoi cordinates
      node = Node.create({
        user_id: User.where.not(id: User.first.id).ids.sample,
        latitude: latitude,
        longitude: longitude
      })
      node.save!
    end
  end

  task air_info: :environment do
    (1..NUM_DATA).each do |index|
      node = Node.find_by id: index
      data = AirInfo.create({
        node_id: node.id,
        location: node.location,
        hu: rand(78..98),
        pr: rand(900..1100),
        tp: rand(8..28),
        wd: rand(80..100),
        ws: rand(2..4)
      })
      data.save!

      premium_data = PremiumAirInfo.create({
        air_info_id: data.id,

        p1_conc: rand(45..65),
        p1_aqius: rand(40..60),
        p1_aqicn: rand(43..63),

        p2_conc: rand(18..38),
        p2_aqius: rand(74..94),
        p2_aqicn: rand(30..50),

        o3_conc: rand(3..5),
        o3_aqius: rand(1..3),
        o3_aqicn: rand(1..3),

        n2_conc: rand(35..55),
        n2_aqius: rand(4..24),
        n2_aqicn: rand(32..52),

        s2_conc: rand(1..3),
        s2_aqius: rand(1..3),
        s2_aqicn: rand(2..5),

        co_conc: rand(1..2),
        co_aqius: rand(7..9),
        co_aqicn: rand(8..10)
      })
    end
  end
end
