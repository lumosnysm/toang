class MapsController < ApplicationController  
  def index
    @data = { current_user: current_user || '' }
  end

  def nodes_nearby_data
    nodes = Node.near([params[:lat], params[:long]], 10, :order => "distance").first(50)
    
    render json: {
      nodes: nodes.as_json(only: [:latitude, :longitude, :aqius, :aqicn])
    }
  end
end
