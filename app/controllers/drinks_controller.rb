class DrinksController < ApplicationController
  before_action :set_party
  def index
    if current_user.id == @party.user_id
      @drink = Drink.new
      @drinks = @party.drinks.includes(:user)
      sum_alcohol(@drinks)
      countdown(@drinks)
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

  def countdown(drinks)
    @remaining_time = 0
    drinks.each do |drink|
      @remaining_time += drink.created_at - Time.now + ( drink.alcohol / (current_user.weight * 0.1) * 60 * 60 )
      @remaining_time = 0 if @remaining_time < 0
    end
    @remaining_time = sec_to_hour(@remaining_time)
  end

  def sec_to_hour(time)
    sec = (time % 60).floor
    min = (( time % 3600 ) / 60).floor
    hour = (time / 3600).floor
    time = "#{hour}時間#{min}分#{sec}秒"
  end
end
