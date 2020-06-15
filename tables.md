
## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null:false|
|password|string|null: false|
|weight|decimal|precision: 4, scale: 1, null: false|

### Association

- has_many :partys
- has_many :drinks

## partysテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|user_id|integer|null: false, foreign_key: true|

### Association

- belongs_to :user
- has_many :drinks

## drinksテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|amount|integer|null: false|
|content|decimal|precision: 4, scale:1, null:false|
|comment|text||
|user_id|integer|null: false, foreign_key: true|
|party_id|integer|null: false, foreign_key: true|

### Association

- belongs_to :user
- belongs_to :party
