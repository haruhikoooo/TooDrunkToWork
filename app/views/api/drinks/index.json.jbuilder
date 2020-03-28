json.array! @drinks do |drink|
  json.amount drink.amount
  json.content drink.content
  json.year drink.created_at.strftime("%Y")
  json.month drink.created_at.strftime("%m")
  json.date drink.created_at.strftime("%d")
  json.hour drink.created_at.strftime("%H")
  json.min drink.created_at.strftime("%M")
  json.sec drink.created_at.strftime("%S")
  json.weight drink.user.weight
end