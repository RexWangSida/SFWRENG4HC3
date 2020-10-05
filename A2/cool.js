var cards = ["#flashcard1","#flashcard2","#flashcard3","#flashcard4","#flashcard5","#flashcard6","#flashcard7","#flashcard8","#flashcard9"];
var index = 0;
function start(restart){
  if (!restart){
    $("#hello").fadeOut(500).promise().done($("#startButton").fadeOut(500).promise().done(function(){
        $(cards[index]).fadeIn('slow');
        $('#control').fadeIn('slow');
        $('#instruction').fadeIn('slow');
        document.getElementById('hrule').style.display = 'block';
  }));
  }
  else{
    index = 0;
    $("#end").fadeOut(500).promise().done($("#restartB").fadeOut(500).promise().done(function(){
        $(cards[index]).fadeIn('slow');
        $('#instruction').fadeIn('slow');
        document.getElementById('hrule').style.display = 'block';
        $('#nextB').fadeIn('slow');
        document.getElementById("backB").className = "btn btn-success disabled";
        $('#backB').fadeIn('slow');
  }));
  }
}


function next(){
    if(index <= 7){
      index += 1;
      $(cards[index-1]).fadeOut(200).promise().done(function(){
          $(cards[index]).fadeIn('slow');
    });
    }
    if(index == 8){
      document.getElementById("nextB").style.display="none";
      document.getElementById("finishB").style.display="inline";
    }
    if(index >= 0){
      document.getElementById("backB").className = "btn btn-success";
    }
}

function back(){
  if(index >= 1){
    index -= 1;
    $(cards[index+1]).fadeOut(200).promise().done(function(){
        $(cards[index]).fadeIn('slow');
  });
  }
  if(index == 0){
    document.getElementById("backB").className = "btn btn-success disabled";
  }
  if(index <= 8){
    document.getElementById("finishB").style.display="none";
    document.getElementById("nextB").style.display="inline";
  }
}

function finish(){
  $("#instruction").fadeOut(500).promise().done($("#backB").fadeOut(500).promise().done($("#flashcard9").fadeOut(500).promise().done($("#finishB").fadeOut(500).promise().done(function(){
      $('#end').fadeIn('slow');
      $('#restartB').fadeIn('slow');
    }))));
}
