class PremiumAirInfo < ApplicationRecord
  belongs_to :air_info
  after_save :update_aqi_node

  private
  def update_aqi_node
    aqius = [self.p1_aqius, self.p2_aqius, self.o3_aqius, self.n2_aqius, self.s2_aqius, self.co_aqius].max
    aqicn = [self.p1_aqicn, self.p2_aqicn, self.o3_aqicn, self.n2_aqicn, self.s2_aqicn, self.co_aqicn].max
    self.air_info.node.update aqius: aqius, aqicn: aqicn
  end
end
