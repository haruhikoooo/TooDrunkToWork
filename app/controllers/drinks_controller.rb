class DrinksController < ApplicationController
  before_action :set_party
  def index
    if current_user.id == @party.user_id
      @drink = Drink.new
      @drinks = @party.drinks.includes(:user)
      sum_alcohol(@drinks)
    else
      redirect_to root_path
    end
  end

  def create
    @drink = @party.drinks.new(drink_params)
    if @party.save
      redirect_to party_drinks_path(@party)
    else
      @drinks = @party.drinks.includes(:user)
      render :index
    end
  end

  private
  def set_party
    @party = Party.find(params[:party_id])
  end

  def drink_params
    params.require(:drink).permit(:name, :amount, :content, :comment).merge(user_id: current_user.id)
  end

  def sum_alcohol(drinks)
    @sum_alcohol = 0
    drinks.each do |drink|
      @sum_alcohol += drink.alcohol
    end
    return @sum_alcohol
  end
end
