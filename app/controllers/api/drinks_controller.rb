class Api::DrinksController < ApplicationController

  def index
    party = Party.find(params[:party_id])
    @drinks = party.drinks.includes(:user)
  end

end
