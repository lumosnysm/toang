class AirInfo < ApplicationRecord
  belongs_to :node
  has_one :premium_air_info
end
