$(function () {
  gameFunction();
});

function gameFunction() {
  let x = 99;
  let y = 1;
  let number = $('.theNumber');
  let numArr = [];
  let numArrLength = 0;
  let rightGuess = [];
  let wrongGuess = [];

  // generate random number, increase length every two guesses
  var generateRandom = () => Math.floor(Math.random() * x) + y;

  var setupGame = function () {
    numArr.push(generateRandom());
    numArrLength = numArr.length;

    // show random number for short period of time
    number.html(numArr[numArrLength - 1]);

    setTimeout(function () {
      var length = numArr[numArr.length - 1].toString().length;
      number.html('');
      for (var i = 0; i < length; i++) {
        number.append('<i class="fa fa-circle"></i>&nbsp;');
      }
    }, (135 * (x.toString().length * 1.1)));
  };
  setupGame();

  // Compare random number vs number in input then Determine if right or wrong (on enter or click)
  var compare = {
    init() {
      this.cacheDOM();
      this.bindEvents();
    },
    cacheDOM() {
      this.$input = $('input[type=text]');
      this.$submit = $('button[class=submit]');
      this.$level = $('.theLevel');
      this.$wrong = $('.wrong');
      this.$reset = $('button[class=restart]');
    },
    bindEvents() {
      let _this = this;
      $(document).keypress(function (e) {
        if (e.keyCode === 13) {
          _this.checkValues();
        }
      });
      this.$submit.on('click', this.checkValues.bind(this));
      this.$reset.on('click', this.resetGame.bind(this));
    },

    /* Additonal Functions */
    checkValues: function () {
      let $value = numArr[numArrLength - 1];

      if (this.$input.val() == $value) {
        this.rightGuess();
      } else {
        this.wrongGuess();
      }
      this.$input.val('');
    },

    rightGuess: function () {
      rightGuess.push('1');
      let rightLength = rightGuess.length;

      if (rightLength <= 5) {
        x += 1000;
      } else if (rightLength <= 10) {
        x += 5000;
      } else if (rightLength <= 15) {
        x += 10000;
      } else {
        x += 15000;
      }
      y = x;

      // Generate new number and add value to level
      this.$level.text(rightLength + 1);
      setupGame();
    },
    wrongGuess: function () {
      wrongGuess.push('0');
      let wrongLength = wrongGuess.length;
      var _this = this;

      if (wrongLength >= 3) {
        this.$wrong.text(wrongLength + " ");
        setTimeout(function () {
          _this.resetGame();
        }, 1000)
      } else {
        this.$wrong.text(wrongLength + " ");
        setupGame();
      }
    },
    resetGame: function () {
      this.$input.val('');
      numArr = [];
      rightGuess = [];
      wrongGuess = [];
      x = 99;
      y = 1;
      this.$level.html(' 1');
      this.$wrong.html('0 ');
      setupGame();
    },

  };
  compare.init();
}