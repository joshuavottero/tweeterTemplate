
const textarea = document.getElementById("tweet-text");
$(document).ready(function() {
  const textarea = document.getElementById("tweet-text");
  $(textarea).on("input", function(element)  {
    const charsLeft = 140 - this.value.length;
    if (charsLeft < 0) {
      $(this).parent().find(".counter").addClass("redText");
    }
    else {
      $(this).parent().find(".counter").removeClass("redText");
    }
    $(this).parent().find(".counter").html(charsLeft);
  });
});


