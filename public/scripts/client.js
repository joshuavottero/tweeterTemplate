/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {



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
  ]

  const createTweetElement = function(tweet) {
    daysAgo = timeago.format(tweet.created_at);
    const $tweet = $(
      `
      <article class="tweets-article">
      <header class="tweets-header">
        <div class="tweets-header-top">
          <img src="${tweet.user.avatars}" class="tweets-img" alt=""> 
          <h1>${tweet.user.name}</h1>
        </div>
        <div>
          <h2>${tweet.user.handle}</h2>
        </div> 
      </header>
      <div>
        <p class="tweet-inner-border">
          ${tweet.content.text}
        </p>
      </div>
      <footer class="tweet-footer">
        <p>${daysAgo}</p>
        <p><i class="fas fa-flag tweet-icons"></i>    <i class="fas fa-retweet tweet-icons"></i>   <i class="fas fa-heart tweet-icons"></i></p>
      </footer>
    </article>
    `);
    $("#tweets-container").append($tweet);
    };

  const loadTweets = function(){
    
  }
  const renderTweets = function(dataTweets) {
    // loops through tweets
    for (const item of dataTweets) {
      createTweetElement(item);
    }
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
  }
  renderTweets(data);

  
    const $form = $('#tweet-form');
    $form.submit(function( event ) {
      event.preventDefault(); 
      //alert( "Handler for .submit() called. ");
      const formData = $(this).serialize();
      $.ajax("/tweets", {data: formData, method: "POST"})
      .then(function (){
        console.log("tweet good", formData);
      });
    });
});