$(function(){
  function buildDRINK(drink){
    var alcohol = (drink.amount * drink.content / 100 * 0.8).toFixed(1);
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
    return html
  }


  $('.drink-list').animate({ scrollTop: $('.drink-list')[0].scrollHeight});


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
      var sumBefore = Number($('#sum-alcohol').data("sumalcohol"));
      var sumAfter = (sumBefore + (data.amount * data.content / 100 * 0.8)).toFixed(1);
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
});