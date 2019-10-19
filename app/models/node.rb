class Node < ApplicationRecord
  reverse_geocoded_by :latitude, :longitude,
    :address => :location
  after_validation :reverse_geocode

  has_many :air_infos

  scope :find_by_position, -> (from_lat, to_lat, from_lng, to_lng) {where latitude: from_lat..to_lat, longitude: from_lng..to_lng}
end
