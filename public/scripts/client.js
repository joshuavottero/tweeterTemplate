/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  const createTweetElement = function(tweet) {
    daysAgo = timeago.format(tweet.created_at);
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    } 
    const $tweet = $(
      `
      <article class="tweets-article">
      <header class="tweets-header">
        <div class="tweets-header-top">
          <img src="${tweet.user.avatars}" class="tweets-img" alt=""> 
          <h1 class="tweet-name">${tweet.user.name}</h1>
        </div>
        <div class="tweet-handle-wrapper">
          <h2 class="tweet-handle">${tweet.user.handle}</h2>
        </div> 
      </header>
      <div>
        <p class="tweet-inner-border tweet-inner-flex">
          ${escape(tweet.content.text)}
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
    $.ajax('/tweets', { method: 'GET' })
      .then(function (morePostsHtml) {
        renderTweets(morePostsHtml);
      });
  }
  const renderTweets = function(dataTweets) {
    $("#tweets-container").empty();
    // loops through tweets
    for (const item of dataTweets.reverse()) {
      // calls createTweetElement for each tweet
      // that takes return value and appends it to the tweets container
      createTweetElement(item);
    }
  
  }
  loadTweets();

  
    const $form = $('#tweet-form');
    
  
    $form.submit(function( event ) {
      event.preventDefault(); 
      const formData = $(this).serialize();
      $("#error-msg").slideUp(250).addClass("no-error-flag"); // add class to id "error-msg" to hide it
      const tweetTextLength = $("#tweet-text").val().length;
      if (tweetTextLength > 140) {
        $("#error-msg").html('<i class="fas fa-exclamation-triangle"></i> Too Long. Plz respct our arbitrary limit of 140 chars. #Kthxbye. <i class="fas fa-exclamation-triangle"></i>'); 
        $("#error-msg").slideDown(250).removeClass("no-error-flag");
      }
      else if (tweetTextLength === "" || tweetTextLength === null || tweetTextLength === 0) {
        $("#error-msg").html('<i class="fas fa-exclamation-triangle"></i>Text area must not be empty<i class="fas fa-exclamation-triangle"></i>');  
        $("#error-msg").slideDown(250).removeClass("no-error-flag");
      }
      else {
        $.ajax("/tweets", {data: formData, method: "POST"})
        .then(function (){
          document.getElementById("tweet-text").value = "";
          $('.counter').text(140);
          loadTweets();
        });
      }
    });
});