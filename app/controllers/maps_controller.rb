class MapsController < ApplicationController
  def index
    @data = { current_user: current_user || '' }
  end
end
