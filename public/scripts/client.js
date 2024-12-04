/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  
  const createTweetElement = function(tweetData) {
    
    const timestamp = tweetData.created_at;
    const timeSinceTimestamp = timeago.format(timestamp);
    
    const $tweet = $(`
      <article>
      <header>
      <span class="username"><i class="fa-regular fa-face-smile"></i>${tweetData.user.name}</span>
      <span class="user-tag">${tweetData.user.handle}</span>
      </header>
      <div>
      <p>${tweetData.content.text}</p>
      </div>
      <footer>
      <span class="timestamp">${timeSinceTimestamp}</span>
      <span class="icons"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></span>
      </footer>
      </article>`);
      
      return $tweet;
    };
    
    
    
    const renderTweets = function(tweets) {
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
    });
    
    loadTweets();
  });
  
  