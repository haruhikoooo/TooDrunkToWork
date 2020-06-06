$(function(){
  function alcoholAmount(drink){
    var alcohol = drink.amount * drink.content / 100 * 0.8;
    return alcohol;
  }

  function secToHour(time){
    var sec = Math.floor(time % 60)
    var min = Math.floor(( time % 3600 ) / 60)
    var hour = Math.floor(time / 3600)
    var timer = hour + "時間" + min + "分" + sec + "秒"
    return timer
  }

  function buildDRINK(drink){
    var alcohol = alcoholAmount(drink).toFixed(1);
    var html = `
      <div class="drink">
        <div class="drink__content">
          <div class="drink__content--top">
            ${drink.name}
          </div>
          <div class="drink__content--center">
            飲酒量: ${drink.amount}ml 度数: ${drink.content}% アルコール量: ${alcohol}g
          </div>
          <div class="drink__content--bottom">
            ${drink.comment}
          </div>
        </div>
        <div class="drink__info">
          ${drink.created_at}
        </div>
      </div>`
    return html;
  }

  function buildALCOHOL(alcohol){
    var html = `
      <div class="top-contents__content--up" id="sum-text">
        総アルコール量
      </div>
      <div class="top-contents__content--down", id="sum-alcohol", data-sumalcohol=${alcohol}>
        ${alcohol}g
      </div>`
    return html;
  }

  function buildCOUNTDOWN(timer){
    var html = `
      <div class="top-contents__content--up">
        アルコールが分解されるまで
      </div>
      <div class="top-contents__content--down">
        ${timer}
      </div>`
      return html;
  }

  $('.party').each(function(){
    var $href = $(this).attr('href');
    if(location.href.match($href)) {
      $(this).addClass('current');
    } else {
      $(this).removeClass('current');
    }
  });

  $('#new-drink').on('submit', function(e){
    e.preventDefault();
    var url = $(this).attr('action');
    var formData = new FormData(this);
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var drinkHtml = buildDRINK(data);
      var alcohol = alcoholAmount(data)
      var sumBefore = Number($('#sum-alcohol').data("sumalcohol"));
      var sumAfter = (sumBefore + alcohol).toFixed(1);
      var alcoholHtml = buildALCOHOL(sumAfter);
      $('.drink-list').append(drinkHtml);
      $('#sum').html(alcoholHtml);
      $('form')[0].reset();
      $('.drink-list').animate({ scrollTop: $('.drink-list')[0].scrollHeight});
    })
    .fail(function(){
      alert("送信に失敗しました");
    })
    .always(function(){
      $('.send-btn__submit').prop('disabled', false);
    })
  })

  var countdown = function(){
    $.ajax({
      url: "api/drinks",
      type: 'get',
      dataType: 'json'
    })
    .done(function(drinks){
      var remainingTime = 0;
      var now = new Date();
      $.each(drinks, function(i, drink){
        var alcohol = alcoholAmount(drink);
        var createdAt = new Date(drink.year, drink.month-1, drink.date, drink.hour, drink.min, drink.sec);
        var drunkTime = ((alcohol / (drink.weight * 0.1)) * 60 * 60 );
        if (remainingTime - (createdAt.getTime() /1000) > 0){
          remainingTime += drunkTime
        } else {
          remainingTime = (createdAt.getTime() / 1000) + drunkTime
        }
      })
      remainingTime -= (now.getTime() / 1000);
      if (remainingTime < 0) remainingTime = 0
      var timer = secToHour(remainingTime);
      var countdownHtml = buildCOUNTDOWN(timer);
      $('#timer').html(countdownHtml);
    })
    .fail(function(){
      alert('error');
    })
  }

  if (document.location.href.match(/\/parties\/\d+\/drinks/)){
    $('.drink-list').animate({ scrollTop: $('.drink-list')[0].scrollHeight});
    setInterval(countdown,1000);
  }

});