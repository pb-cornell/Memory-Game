/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


// 洗牌函数
function washCards(){
  let cards = [
    "fa fa-diamond","fa fa-diamond",
    "fa fa-anchor","fa fa-anchor",
    "fa fa-paper-plane-o","fa fa-paper-plane-o",
    "fa fa-bolt","fa fa-bolt",
    "fa fa-cube","fa fa-cube",
    "fa fa-leaf","fa fa-leaf",
    "fa fa-bicycle","fa fa-bicycle",
    "fa fa-bomb","fa fa-bomb"
  ];


  shuffle(cards);
  $('.card i').each(function(index,element){
    $(this).removeClass();
    $(this).addClass(cards[index]);
  });
}





// 翻牌函数

function openCard(cardClass){
  $(cardClass).addClass('open show');
}

//牌面相匹配函数
function cardMatch(cardClass){
  $(cardClass).removeClass("open show").addClass('match');
}

// 扣牌函数
function closeCard(cardClass){
  $(cardClass).removeClass('open show');
}

// 获胜后提示信息，及是否继续的确认函数
function makeSure(clickNum){
  let starNum = 3-$(".addstar").length;
  let timerText = $(".timer").text();
  alert("恭喜你赢得了游戏，花费"+timerText+"，共移动"+clickNum+"下，"+"获得"+starNum+"颗星！");
  const msg=confirm("是否继续游戏？");
  if(msg===true){
    $(".match").removeClass("match");
    closeCard(".open");
    washCards();
    $(".moves").text("0");
    $(".fa-star").removeClass("addstar");
    clickCard();
    timer();
  }
}


// 翻牌获胜函数
function winGame(clickNum,clock){
  if($(".match").length === 16){
    clearInterval(clock);
    $(".card").off("click");
    setTimeout(function(){makeSure(clickNum);},500);
  }
}

// 重新开始函数
function replayGame(){
  $(".restart").click(function(){
    window.location.reload();
  });
}

// 游戏计时函数
function timer(){
    let second = 0;
    const int = setInterval(function(){
    second ++;
    $(".timer").text(second+"秒");},1000);
    return int;
}

//获得星星的函数
function getStars(clickNum){
  if(clickNum === 20) {
    $("#star3").addClass('addstar');
  }
  if(clickNum >= 30) {
    $("#star2").addClass('addstar');
  }
}


// 点击翻牌函数
function clickCard(){
const clock = timer();
let openCardName = [];
let clickNum = 0;
let idList = [];
replayGame();
$(".card").click(function(){
  openCard(this);
  //防止单张卡片重复点击
  if(idList.indexOf($(this).attr('id'))<0){
  idList.push($(this).attr('id'));
  clickNum ++;
  var cardName = $(this).children().attr('class');
  openCardName.push(cardName);
  $(".moves").text(clickNum);
  getStars(clickNum);
  //翻牌两张后的匹配判断
  if($(".open").length % 2 === 0 && $(".open").length > 0){
    if(openCardName !== []){
      if( openCardName[0] === openCardName[1]){
        cardMatch(".open");
        $('.match').off('click');
        openCardName = [];
      }else{
        setTimeout(function(){closeCard($('.open'));idList = [];
      openCardName = [];}, 300);
      }

    }
  }
  winGame(clickNum,clock);
}});
}

//初始化函数
function init(){
washCards();
clickCard();
}

// 初始化加载
window.onload = init();
