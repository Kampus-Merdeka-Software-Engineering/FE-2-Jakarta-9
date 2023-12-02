

let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 3000);

    
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};

//navigation responsive
const menuBtn = document.querySelector(".menu-btn");
const navigation = document.querySelector(".navigation");

menuBtn.addEventListener("click",() =>{
    menuBtn.classList.toggle("active")
    navigation.classList.toggle("active")
});


/*Flipdown*/
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FlipDown = function () {
  function FlipDown(uts) {
    var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "flipdown";
    var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, FlipDown);

    if (typeof uts !== "number") {
      throw new Error("FlipDown: Constructor expected unix timestamp, got ".concat(_typeof(uts), " instead."));
    }

    if (_typeof(el) === "object") {
      opt = el;
      el = "flipdown";
    }

    this.version = "0.3.2";
    this.initialised = false;
    this.now = this._getTime();
    this.epoch = uts;
    this.countdownEnded = false;
    this.hasEndedCallback = null;
    this.element = document.getElementById(el);
    this.rotors = [];
    this.rotorLeafFront = [];
    this.rotorLeafRear = [];
    this.rotorTops = [];
    this.rotorBottoms = [];
    this.countdown = null;
    this.daysRemaining = 0;
    this.clockValues = {};
    this.clockStrings = {};
    this.clockValuesAsString = [];
    this.prevClockValuesAsString = [];
    this.opts = this._parseOptions(opt);

    this._setOptions();

    console.log("FlipDown ".concat(this.version, " (Theme: ").concat(this.opts.theme, ")"));
  }

  _createClass(FlipDown, [{
    key: "start",
    value: function start() {
      if (!this.initialised) this._init();
      this.countdown = setInterval(this._tick.bind(this), 1000);
      return this;
    }
  }, {
    key: "ifEnded",
    value: function ifEnded(cb) {
      this.hasEndedCallback = function () {
        cb();
        this.hasEndedCallback = null;
      };

      return this;
    }
  }, {
    key: "_getTime",
    value: function _getTime() {
      return new Date().getTime() / 1000;
    }
  }, {
    key: "_hasCountdownEnded",
    value: function _hasCountdownEnded() {
      if (this.epoch - this.now < 0) {
        this.countdownEnded = true;

        if (this.hasEndedCallback != null) {
          this.hasEndedCallback();
          this.hasEndedCallback = null;
        }

        return true;
      } else {
        this.countdownEnded = false;
        return false;
      }
    }
  }, {
    key: "_parseOptions",
    value: function _parseOptions(opt) {
      var headings = ["Days", "Hours", "Minutes", "Seconds"];

      if (opt.headings && opt.headings.length === 4) {
        headings = opt.headings;
      }

      return {
        theme: opt.hasOwnProperty("theme") ? opt.theme : "dark",
        headings: headings
      };
    }
  }, {
    key: "_setOptions",
    value: function _setOptions() {
      this.element.classList.add("flipdown__theme-".concat(this.opts.theme));
    }
  }, {
    key: "_init",
    value: function _init() {
      this.initialised = true;

      if (this._hasCountdownEnded()) {
        this.daysremaining = 0;
      } else {
        this.daysremaining = Math.floor((this.epoch - this.now) / 86400).toString().length;
      }

      var dayRotorCount = this.daysremaining <= 2 ? 2 : this.daysremaining;

      for (var i = 0; i < dayRotorCount + 6; i++) {
        this.rotors.push(this._createRotor(0));
      }

      var dayRotors = [];

      for (var i = 0; i < dayRotorCount; i++) {
        dayRotors.push(this.rotors[i]);
      }

      this.element.appendChild(this._createRotorGroup(dayRotors, 0));
      var count = dayRotorCount;

      for (var i = 0; i < 3; i++) {
        var otherRotors = [];

        for (var j = 0; j < 2; j++) {
          otherRotors.push(this.rotors[count]);
          count++;
        }

        this.element.appendChild(this._createRotorGroup(otherRotors, i + 1));
      }

      this.rotorLeafFront = Array.prototype.slice.call(this.element.getElementsByClassName("rotor-leaf-front"));
      this.rotorLeafRear = Array.prototype.slice.call(this.element.getElementsByClassName("rotor-leaf-rear"));
      this.rotorTop = Array.prototype.slice.call(this.element.getElementsByClassName("rotor-top"));
      this.rotorBottom = Array.prototype.slice.call(this.element.getElementsByClassName("rotor-bottom"));

      this._tick();

      this._updateClockValues(true);

      return this;
    }
  }, {
    key: "_createRotorGroup",
    value: function _createRotorGroup(rotors, rotorIndex) {
      var rotorGroup = document.createElement("div");
      rotorGroup.className = "rotor-group";
      var dayRotorGroupHeading = document.createElement("div");
      dayRotorGroupHeading.className = "rotor-group-heading";
      dayRotorGroupHeading.setAttribute("data-before", this.opts.headings[rotorIndex]);
      rotorGroup.appendChild(dayRotorGroupHeading);
      appendChildren(rotorGroup, rotors);
      return rotorGroup;
    }
  }, {
    key: "_createRotor",
    value: function _createRotor() {
      var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var rotor = document.createElement("div");
      var rotorLeaf = document.createElement("div");
      var rotorLeafRear = document.createElement("figure");
      var rotorLeafFront = document.createElement("figure");
      var rotorTop = document.createElement("div");
      var rotorBottom = document.createElement("div");
      rotor.className = "rotor";
      rotorLeaf.className = "rotor-leaf";
      rotorLeafRear.className = "rotor-leaf-rear";
      rotorLeafFront.className = "rotor-leaf-front";
      rotorTop.className = "rotor-top";
      rotorBottom.className = "rotor-bottom";
      rotorLeafRear.textContent = v;
      rotorTop.textContent = v;
      rotorBottom.textContent = v;
      appendChildren(rotor, [rotorLeaf, rotorTop, rotorBottom]);
      appendChildren(rotorLeaf, [rotorLeafRear, rotorLeafFront]);
      return rotor;
    }
  }, {
    key: "_tick",
    value: function _tick() {
      this.now = this._getTime();
      var diff = this.epoch - this.now <= 0 ? 0 : this.epoch - this.now;
      this.clockValues.d = Math.floor(diff / 86400);
      diff -= this.clockValues.d * 86400;
      this.clockValues.h = Math.floor(diff / 3600);
      diff -= this.clockValues.h * 3600;
      this.clockValues.m = Math.floor(diff / 60);
      diff -= this.clockValues.m * 60;
      this.clockValues.s = Math.floor(diff);

      this._updateClockValues();

      this._hasCountdownEnded();
    }
  }, {
    key: "_updateClockValues",
    value: function _updateClockValues() {
      var _this = this;

      var init = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.clockStrings.d = pad(this.clockValues.d, 2);
      this.clockStrings.h = pad(this.clockValues.h, 2);
      this.clockStrings.m = pad(this.clockValues.m, 2);
      this.clockStrings.s = pad(this.clockValues.s, 2);
      this.clockValuesAsString = (this.clockStrings.d + this.clockStrings.h + this.clockStrings.m + this.clockStrings.s).split("");
      this.rotorLeafFront.forEach(function (el, i) {
        el.textContent = _this.prevClockValuesAsString[i];
      });
      this.rotorBottom.forEach(function (el, i) {
        el.textContent = _this.prevClockValuesAsString[i];
      });

      function rotorTopFlip() {
        var _this2 = this;

        this.rotorTop.forEach(function (el, i) {
          if (el.textContent != _this2.clockValuesAsString[i]) {
            el.textContent = _this2.clockValuesAsString[i];
          }
        });
      }

      function rotorLeafRearFlip() {
        var _this3 = this;

        this.rotorLeafRear.forEach(function (el, i) {
          if (el.textContent != _this3.clockValuesAsString[i]) {
            el.textContent = _this3.clockValuesAsString[i];
            el.parentElement.classList.add("flipped");
            var flip = setInterval(function () {
              el.parentElement.classList.remove("flipped");
              clearInterval(flip);
            }.bind(_this3), 500);
          }
        });
      }

      if (!init) {
        setTimeout(rotorTopFlip.bind(this), 500);
        setTimeout(rotorLeafRearFlip.bind(this), 500);
      } else {
        rotorTopFlip.call(this);
        rotorLeafRearFlip.call(this);
      }

      this.prevClockValuesAsString = this.clockValuesAsString;
    }
  }]);

  return FlipDown;
}();

function pad(n, len) {
  n = n.toString();
  return n.length < len ? pad("0" + n, len) : n;
}

function appendChildren(parent, children) {
  children.forEach(function (el) {
    parent.appendChild(el);
  });
}


/* Popular */
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

