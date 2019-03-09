$(document).ready(function() {
    var players = {
      alex: {
        name: 'Alexander Hamilton',
        attack: 15,
        hp: 150
      },
      burr: {
        name: 'Aaron Burr',
        attack: 18,
        hp: 180
      },
      eliza: {
        name: 'Eliza',
        attack: 20,
        hp: 200
      },
      king: {
        name: 'King George',
        attack: 25,
        hp: 250
      }
    }
    var playerAttack;
    var playerHP;
    var defenderAttack;
    var defenderHP;
  
    function init(){
      $('#yourChar').hide();
      $('#fight').hide();
      $('#enemies').hide();
      $('.reset').hide();
      $('.player').on('click', function() {
        $('#chooseChar').hide();
        $('#yourChar').show();
        $('#enemies').show();
        $('#fight').hide();
        playEnterance();
        $(this).addClass("user").removeClass("player");
        $(this).removeClass('defender');
        $('#yourChar').append($('.user'));
        $('#yourChar').show();
        player = players[$('.user').data('user-name')];
        playerAttack = player.attack;
        playerHP = player.hp;
        bindEnemy();
      });
    }
    init();
  
    function bindEnemy() {
      $('.char').off();
      $('.player').addClass('enemy').removeClass('player');
      $('#enemies').append($('.enemy'));
      $('.enemy').on('click', function() {
        $('#enemies').hide();
        $('#fight').show();
        $('.attack').show();
        playEnterance();
        if ($('.defender').length < 3) {
          $(this).removeClass('user'); // might not need this line?
          $(this).removeClass("enemy");
          $(this).addClass('defender');
          $('#fight').append($(this));
          defender = players[$('.defender').data('user-name')];
          defenderAttack = defender.attack;
          defenderHP = defender.hp;
        }
      });
    }
  
    var p1 = $('<p>');
    var p2 = $('<p>');
  
  function animateHit(p){
    p.css("font-size", "30px");
    p.fadeIn(500);
    if(p === p1){
      p1.text(playerAttack);
      $('#'+ defender.name).append(p1);
    }
    else if(p === p2){
      p2.text(defenderAttack);
      $('#'+ player.name).append(p2);
    }
    p.fadeOut(500);
  }
  
    $('.attack').on('click', function() {
      console.log(player);
      console.log(defender);
  
      animateHit(p1);
      defenderHP = defenderHP - playerAttack;
      playerAttack += player.attack;
      //defender attacks back
      animateHit(p2);
      playerHP = playerHP - defenderAttack;
      $('#' + player.name + 'HP').text(playerHP);
      playAttack();
      checkLose();
      $('#' + defender.name + 'HP').text(defenderHP);
      if (defenderHP <= 0) {
        console.log(defender.name + " is dead");
        $('#enemies').append($('.defender'));
        $('#' + defender.name + 'HP').text('dead');
        $('.defender').removeClass('defender').addClass('dead');
        $('.dead').hide();
        $('#fight').hide();
        $('#enemies').show();
        //restoring defender health for next round
        defenderHP = defender.hp;
        $('#' + defender.name + 'HP').text(defenderHP);
        playAttack();
        checkWin();
      }
  
    });
  
    function resetButton() {
      $('.reset').show();
      $('#enemies').hide();
      $('#fight').hide();
      $('.reset').on('click', function() {
        $('#chooseChar').show();
          //reset clicks
          $('.enemy').off();
          //reset the classes
          $('.dead').removeClass('dead').addClass('player');
          $('.user').removeClass('user').addClass('player');
          $('.enemy').removeClass('enemy').addClass('player');
          $('.defender').removeClass('defender').addClass('player');
          $('.player').show();
          $('#chooseChar').append($('.player'));
          //reset the attacks
          playerAttack = player.attack;
          //reset the health
          playerHP = player.hp;
          $('#' + player.name + 'HP').text(playerHP);
          //reset texts
            $('#charText').text('Your Character');
            init();
      });
    }
    $( "#dialog" ).dialog({
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {
        "Got it!": function() {
          $(this).dialog( "close" );
        }
      }
    });
  
    // check win
    function checkWin() {
      if ($('.dead').length === 3) {
        $('#enemies').hide();
        // alert('You Win!');
        $('#charText').text('You Win!');
        $('.attack').hide();
        resetButton();
      }
    }
    //check lose
    function checkLose() {
      if (playerHP <= 0 && $('.dead').length < 3) {
        $('#charText').text('You Lose!');
        $('.attack').hide();
        resetButton();
      }
    }
  
    //Sounds go here
    //background music
    var bgm = new Audio();
    bgm.src = 'assets/sounds/bgm.mp3';
    bgm.play();
    bgm.volume = 0.1;
    bgm.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    }, false);
  // entrance sound
    var entrance = new Audio();
    entrance.src = 'assets/sounds/entrance.wav';
    function playEnterance(){
      entrance.currentTime = 0;
      entrance.play();
    }
  // //sound on attack
    var hit = new Audio();
  
    function playAttack(){
      var attackNum = Math.round(Math.random()*3);
      hit.src = 'assets/sounds/attackSound'+attackNum+'.wav';
      hit.currentTime = 0;
      hit.play();
    }
  });