$(document).ready(function() {
  const maxLength = 140;

  $('#tweet-text').on('input', function() {
    //Assign the textarea length to a variable
    const currentLength = $(this).val().length;
    //Assign the number of character left to another variable
    const charactersLeft = maxLength - currentLength;
    //Finds the .counter on the closest form
    const counter = $(this).closest('form').find('.counter');
    //Updates the counter's output
    counter.text(charactersLeft);

    if (charactersLeft < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', 'black');
    }
  });
});