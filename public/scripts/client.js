/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $('form').on('submit', function(event){
    event.preventDefault();
    const serializedData = $(this).serialize();

    $.post($(this).attr('action'), serializedData, function(res) {
      console.log('Sucess', res);
    });
  });
});
