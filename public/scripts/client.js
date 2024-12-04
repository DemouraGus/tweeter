/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  
  const createTweetElement = function(tweetData) {
    
    const timestamp = tweetData.created_at;
    const timeSinceTimestamp = timeago.format(timestamp);
    const safeText = document.createTextNode(tweetData.content.text);
    
    const $tweet = $(`
      <article>
      <header>
      <span class="username"><i class="fa-regular fa-face-smile"></i>${tweetData.user.name}</span>
      <span class="user-tag">${tweetData.user.handle}</span>
      </header>
      <div>
      <p></p>
      </div>
      <footer>
      <span class="timestamp">${timeSinceTimestamp}</span>
      <span class="icons"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></span>
      </footer>
      </article>`);

      $tweet.find('p').append(safeText);
      
      return $tweet;
    };
    
    
    
    const renderTweets = function(tweets) {
      $('.tweet-container').empty();
      for (const tweet of tweets) {
        const $tweet = createTweetElement(tweet)
        $('.tweet-container').prepend($tweet);
      }
    };
    
    const loadTweets = () => {
      $.ajax({
        method: 'GET',
        url: '/tweets',
        success: (tweets) => {
          renderTweets(tweets);
        }
      });
    };

    $('form').on('submit', function(event){
      event.preventDefault();
      const serializedData = $(this).serialize();

      // console.log($('#tweet-text').val());
      // extract the #tweet-text value and trim empty spaces
      const tweetText = $('#tweet-text').val().trim();

      const $alertMessage = $('#alert-message');
      $alertMessage.hide();

      //If it's empty return an empty alert
      if (!tweetText) {
        $alertMessage.html('<i class="fa-solid fa-triangle-exclamation"></i>Tweet cannot be empty!<i class="fa-solid fa-triangle-exclamation"></i>').slideDown();
      } else if (tweetText.length > 140) {
        //If it's too long return a too long alert
        $alertMessage.html('<i class="fa-solid fa-triangle-exclamation"></i>Too long! 140 is a beatiful number and nothing can be longer!<i class="fa-solid fa-triangle-exclamation"></i>').slideDown();

      } else {

        $.ajax({
          method: 'POST',
          url: '/tweets',
          data: serializedData,
          success: (res) => {
            $('#tweet-text').val('');
            loadTweets();
          }
        });
      }
    });
    
    loadTweets();
  });
  
  