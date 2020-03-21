class Drink < ApplicationRecord
  belongs_to :user
  belongs_to :party

  validates :name, presence: true
  validates :amount, presence: true, numericality: {only_integer: true}
  validates :content, presence: true, numericality: {less_than_or_equal_to: 100.0}

  def alcohol
    amount * content / 100 * 0.8
  end

end
