class Node < ApplicationRecord
  reverse_geocoded_by :latitude, :longitude,
    :address => :location
  after_validation :reverse_geocode

  has_many :air_infos
end
