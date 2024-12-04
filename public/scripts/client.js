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
    });
  });

  const createTweetElement = function(tweetData) {
    const { user, content, created_at } = tweetData;
  
    const $tweet = $(`
    <article>
          <header>
            <span class="username"><i class="fa-regular fa-face-smile"></i>${user.name}</span>
            <span class="user-tag">${user.handle}</span>
          </header>
          <div>
            <p>${content.text}</p>
          </div>
          <footer>
            <span class="timestamp">${created_at}</span>
            <span class="icons"><i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i></span>
          </footer>
        </article>`);
  
    return $tweet;
  };
  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $('.tweet-container').append(createTweetElement(tweet));
    }
  };
  
  renderTweets(data);  
});

