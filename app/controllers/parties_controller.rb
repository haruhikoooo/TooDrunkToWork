class PartiesController < ApplicationController
  def index
  end

  def new
    @party = Party.new
  end

  def create
    party = Party.create(party_params)
    redirect_to party_drinks_path(party.id)
  end

  private
  def party_params
    params.require(:party).permit(:name).merge(user_id: current_user.id)
  end
end
