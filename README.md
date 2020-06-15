# TooDrinkToWork
![TooDrinkToWork](./TooDrinkToWork.gif)
飲酒量とアルコール度数から純アルコール量を計算し、一度の飲み会で摂取した純アルコール量を表示するアプリです。</br>
摂取した純アルコール量、飲んだ時間、ユーザーの体重からアルコールが代謝されるまでの時間を計算し、カウントダウンをしています。</br>
計算式は以下のとおりです。</br>
#### アルコールの代謝時間 = 純アルコール量 / (体重 x 0,1)

アルコールの代謝時間については個人差によるところも大きいため、あくまで簡易的な目安としてお使いください。</br>
本アプリに基づいて飲酒運転を容認したり、法的資料の証拠になるものではありません。</br>

## App URL
### **https://polar-fortress-52434.herokuapp.com**
新規登録後、飲み会を追加するとご利用いただけます。</br>
メールアドレスは@がついていれば、存在しないメールアドレスでもご登録していただく事ができます。</br>

## 環境構築
~~~
$ git clone https://github.com/haruhikoooo/TooDrunkToWork.git
$ cd TooDrinkToWork
$ bundle install
$ rails db:create
$ rails db:migrate
$ rails s
http://localhost:3000
~~~

## DB設計
