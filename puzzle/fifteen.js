/*
Name: Matt Fossett
Sliding Number Puzzle
CSCI 366: Dr. Schwartz

The approach I took was simple once I finally figured out the jquery .position() call. 
I saw the format of that call and made an emptySpot that would be the fake div to "occupy" 
a space. Using this I could test if a legal up/down/left/right move could be made. 

Setting up the puzzle is using absolute positioning and exact pixel placements. 
I access these divs by calling .position() on them and I can use those measurements
to see if the dud spot is adjacent to the current div. 

A swap is simply adding css to the valid blocks that directly swaps their positions 
with the emptySpot.

Shuffle just adds valid selections of the divs to an array and then randomly picks 
an element in the array to swap with the emptySpot. This ensures the puzzle is always beatable. 

Wins are calculated by Saving an initial goodOrder of the blocks and then comparing against that
every move. Likely not efficient but indistinguishible from what I can tell. 

The picture I chose is a mixer because it was on my desktop for some reason and I'm too burnt out
to even pick a good meme at this point. 
*/
'use strict';

var emptySpot = {
  "top": 300,
  "left": 300
};

// Make sure page is loaded
window.onload = (function () {
  setPuzzle();
  // static var used to check for game win
  var goodOrder = JSON.stringify(currentOrder());
  // Highlight block if possible move
  $('#puzzlearea > div').mouseover(function () {
    var canHover = canMoveDown($(this).position()) || canMoveUp($(this).position()) ||
      canMoveLeft($(this).position()) || canMoveRight($(this).position());
    if (canHover) {
      $(this).attr("class", "hoverDiv");
    }
  });
  // Unhighlight block because otherwise it looks hideous 
  $('#puzzlearea > div').mouseleave(function () {
    $(this).attr("class", "");
  });
  // I had the issue where saving selection to var would later modify it.. 
  $('#puzzlearea > div').click(function () {
    if (canMoveDown($(this).position())) {
      swap($(this).position());
      checkOrder(goodOrder);
    } else if (canMoveUp($(this).position())) {
      swap($(this).position());
      checkOrder(goodOrder);
    } else if (canMoveLeft($(this).position())) {
      swap($(this).position());
      checkOrder(goodOrder);
    } else if (canMoveRight($(this).position())) {
      swap($(this).position());
      checkOrder(goodOrder);
    }
  });
  // Shuffle the board
  $('button').click(function () {
    shuffle();
  });
});

// This arranges the blocks and background picture in proper order
function setPuzzle() {
// This is used since image needs these dimensions instead of the intuitive ones
  var map = {
    "0px": "0px",
    "100px": "-100px",
    "200px": "-200px",
    "300px": "-300px"
  }
  var x = 0;
  var y = 0;

  for (var i = 1; i < 16; i++) {
    var xS = x + "px";
    var yS = y + "px";
    $('#puzzlearea > div:nth-child(' + i + ')').css({
      "left": xS,
      "top": yS,
      "background-position": map[xS] + " " + map[yS]
    });
    // Step through the 4x4
    x += 100;
    if (x == 400) {
      y += 100;
      x = 0;
    }
  }
}

// Shuffles board using random range of moves (50 to 150 moves) and random directions
function shuffle() {
  var rand = randomNumber(100) + 50;
  for (var i = 1; i < rand; i++) {
    var directions = [];
    // Please NOTE: I hate using the jquery selector over and over again, but even with a const
    //   var I could not get it to work otherwise...  
    for (var j = 1; j < 16; j++) {
      if (canMoveDown($('#puzzlearea > div:nth-child(' + j + ')').position())) {
        directions.push($('#puzzlearea > div:nth-child(' + j + ')').position());
      } else if (canMoveUp($('#puzzlearea > div:nth-child(' + j + ')').position())) {
        directions.push($('#puzzlearea > div:nth-child(' + j + ')').position());
      } else if (canMoveLeft($('#puzzlearea > div:nth-child(' + j + ')').position())) {
        directions.push($('#puzzlearea > div:nth-child(' + j + ')').position());
      } else if (canMoveRight($('#puzzlearea > div:nth-child(' + j + ')').position())) {
        directions.push($('#puzzlearea > div:nth-child(' + j + ')').position());
      }
    }
    // directions now has the possible choices to move 
    var pickDirection = randomNumber(directions.length);
    swap(directions[pickDirection]);
  }
}

// Check order of current arrangement versus the static goodOrder, for puzzle solve 
function checkOrder(goodOrder) {
  if (JSON.stringify(currentOrder()) == goodOrder) {
    alert("Congratulations! You solved the puzzle!");
  }
}

// Programmers hate him! Watch how one Firefox issue can make a student refactor
//  100 times! Realistically, calling JSON.stringify for compare was gross here
function equalPositions(position1, position2) {
  return Math.abs(position1.top - position2.top) + 
      Math.abs(position1.left - position2.left) < 0.01;
}

//pass this the position of the div we're talking about
// $('#puzzlearea > div:nth-child(' + i +')').position();
function canMoveDown(down) {
  var underPos = down;
  underPos.top += 100;
  return equalPositions(underPos, emptySpot);
}
function canMoveUp(up) {
  var underPos = up;
  underPos.top -= 100;
  return equalPositions(underPos, emptySpot);
}
function canMoveRight(right) {
  var underPos = right;
  underPos.left += 100;
  return equalPositions(underPos, emptySpot);
}
function canMoveLeft(left) {
  var underPos = left;
  underPos.left -= 100;
  return equalPositions(underPos, emptySpot);
}

// will swap position of a and emptySpot; check if moveable before this call   
// a is .position() call
function swap(toSwap) {
  var xS = emptySpot.left + "px";
  var yS = emptySpot.top + "px";
  $('#puzzlearea > div:nth-child(' + getIndex(toSwap) 
                + ')').css({ "left": xS, "top": yS });
  emptySpot.left = toSwap.left;
  emptySpot.top = toSwap.top;
}

// Returns the matching index of the div based on its .position()
function getIndex(position) {
  for (var i = 1; i < 16; i++) {
    var x = $('#puzzlearea > div:nth-child(' + i + ')').position();
    if (equalPositions(position, x)) {
      return i;
    }
  }
  return -1;
}

//Returns random number from [0 to uL), 
function randomNumber(uL) {
  var x = Math.random() * Math.floor(uL);
  return Math.floor(x);
}
// Returns an array of the current position() orders of the divs
function currentOrder() {
  var order = [];
  for (var i = 1; i < 16; i++) {
    var x = $('#puzzlearea > div:nth-child(' + i + ')').position();
    order.push(JSON.stringify(x));
  }
  return order;
}

//my linter says something is wrong on this line and it won't go away :(       