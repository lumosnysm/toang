class MapsController < ApplicationController
  def index
    @data = { current_user: current_user || '' }
  end

  def nodes_nearby_data
    nodes = Node.find_by_position params[:from_lat], params[:to_lat], params[:from_lng], params[:to_lng]

    render json: {
      nodes: nodes.as_json(only: [:latitude, :longitude, :aqius, :aqicn])
    }
  end
end
