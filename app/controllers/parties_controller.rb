class PartiesController < ApplicationController
  def index
  end

  def new
    @party = Party.new
  end

  def create
    party = Party.new(party_params)
    if party.save
      redirect_to party_drinks_path(party.id)
    else
      @party = Party.new
      render :new
    end
  end

  private
  def party_params
    params.require(:party).permit(:name).merge(user_id: current_user.id)
  end
end
