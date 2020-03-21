class PartiesController < ApplicationController
  def index
  end

  def new
    @party = Party.new
  end

  def create
    Party.create(party_params)
    redirect_to root_path
  end

  private
  def party_params
    params.require(:party).permit(:name).merge(user_id: current_user.id)
  end
end
