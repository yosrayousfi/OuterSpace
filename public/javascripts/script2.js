var index = 0,
  amount = 0,
  currTransl = [],
  translationComplete = true,
  moveOffset = 0;

var transitionCompleted = function () {
  translationComplete = true;
};

document.addEventListener("DOMContentLoaded", function (event) {
  var carousel = document.getElementById("carousel");

  amount = document.getElementsByClassName("sld").length;
  // get the width of the container
  moveOffset = parseInt(
    window.getComputedStyle(document.getElementById("carousel-container"))
      .width,
    10
  );
  // calcuate the width of the carousel
  document.getElementById("carousel").style.width = amount * moveOffset + "px";
  // prevent multiple click when transition
  for (var i = 0; i < amount; i++) {
    currTransl[i] = -moveOffset;
    document
      .getElementsByClassName("sld")
      [i].addEventListener("transitionend", transitionCompleted, true);
    document
      .getElementsByClassName("sld")
      [i].addEventListener("webkitTransitionEnd", transitionCompleted, true);
    document
      .getElementsByClassName("sld")
      [i].addEventListener("oTransitionEnd", transitionCompleted, true);
    document
      .getElementsByClassName("sld")
      [i].addEventListener("MSTransitionEnd", transitionCompleted, true);
  }
  // add the last item to the start so that translateX(-moveOffset) works (In case the first click is the previous button)
  document
    .getElementById("carousel")
    .insertBefore(
      document.getElementById("carousel").children[4],
      document.getElementById("carousel").children[0]
    );
  // add click events to control arrows
  document.getElementById("prev").addEventListener("click", prev, true);
  document.getElementById("next").addEventListener("click", next, true);
});

function prev() {
  if (translationComplete === true) {
    translationComplete = false;
    index--;
    if (index == -1) {
      index = amount - 1;
    }
    var outerIndex = index % amount;
    for (var i = 0; i < amount; i++) {
      var sld = document.getElementsByClassName("sld")[i];
      sld.style.opacity = "1";
      sld.style.transform =
        "translateX(" + (currTransl[i] + moveOffset) + "px)";
      currTransl[i] = currTransl[i] + moveOffset;
    }
    var outersld = document.getElementsByClassName("sld")[outerIndex];
    outersld.style.transform =
      "translateX(" + (currTransl[outerIndex] - moveOffset * amount) + "px)";
    outersld.style.opacity = "0";
    currTransl[outerIndex] = currTransl[outerIndex] - moveOffset * amount;
  }
}

function next() {
  if (translationComplete === true) {
    translationComplete = false;
    var outerIndex = index % amount;
    index++;
    for (var i = 0; i < amount; i++) {
      var sld = document.getElementsByClassName("sld")[i];
      sld.style.opacity = "1";
      sld.style.transform =
        "translateX(" + (currTransl[i] - moveOffset) + "px)";
      currTransl[i] = currTransl[i] - moveOffset;
    }
    var outersld = document.getElementsByClassName("sld")[outerIndex];
    outersld.style.transform =
      "translateX(" + (currTransl[outerIndex] + moveOffset * amount) + "px)";
    outersld.style.opacity = "0";
    currTransl[outerIndex] = currTransl[outerIndex] + moveOffset * amount;
  }
}

window.onload = function () {
  function updateTextInput(val) {
    document.getElementById("textInput").value = val;
  }
  var index = 0,
    amount = 0,
    currTransl = [],
    translationComplete = true,
    moveOffset = 0;

  var transitionCompleted = function () {
    translationComplete = true;
  };

  document.addEventListener("DOMContentLoaded", function (event) {
    var carousel = document.getElementById("carousel");

    amount = document.getElementsByClassName("sld").length;
    // get the width of the container
    moveOffset = parseInt(
      window.getComputedStyle(document.getElementById("carousel-container"))
        .width,
      10
    );
    // calcuate the width of the carousel
    document.getElementById("carousel").style.width =
      amount * moveOffset + "px";
    // prevent multiple click when transition
    for (var i = 0; i < amount; i++) {
      currTransl[i] = -moveOffset;
      document
        .getElementsByClassName("sld")
        [i].addEventListener("transitionend", transitionCompleted, true);
      document
        .getElementsByClassName("sld")
        [i].addEventListener("webkitTransitionEnd", transitionCompleted, true);
      document
        .getElementsByClassName("sld")
        [i].addEventListener("oTransitionEnd", transitionCompleted, true);
      document
        .getElementsByClassName("sld")
        [i].addEventListener("MSTransitionEnd", transitionCompleted, true);
    }
    // add the last item to the start so that translateX(-moveOffset) works (In case the first click is the previous button)
    document
      .getElementById("carousel")
      .insertBefore(
        document.getElementById("carousel").children[4],
        document.getElementById("carousel").children[0]
      );
    // add click events to control arrows
    document.getElementById("prev").addEventListener("click", prev, true);
    document.getElementById("next").addEventListener("click", next, true);
  });

  function prev() {
    if (translationComplete === true) {
      translationComplete = false;
      index--;
      if (index == -1) {
        index = amount - 1;
      }
      var outerIndex = index % amount;
      for (var i = 0; i < amount; i++) {
        var sld = document.getElementsByClassName("sld")[i];
        sld.style.opacity = "1";
        sld.style.transform =
          "translateX(" + (currTransl[i] + moveOffset) + "px)";
        currTransl[i] = currTransl[i] + moveOffset;
      }
      var outersld = document.getElementsByClassName("sld")[outerIndex];
      outersld.style.transform =
        "translateX(" + (currTransl[outerIndex] - moveOffset * amount) + "px)";
      outersld.style.opacity = "0";
      currTransl[outerIndex] = currTransl[outerIndex] - moveOffset * amount;
    }
  }

  function next() {
    if (translationComplete === true) {
      translationComplete = false;
      var outerIndex = index % amount;
      index++;
      for (var i = 0; i < amount; i++) {
        var sld = document.getElementsByClassName("sld")[i];
        sld.style.opacity = "1";
        sld.style.transform =
          "translateX(" + (currTransl[i] - moveOffset) + "px)";
        currTransl[i] = currTransl[i] - moveOffset;
      }
      var outersld = document.getElementsByClassName("sld")[outerIndex];
      outersld.style.transform =
        "translateX(" + (currTransl[outerIndex] + moveOffset * amount) + "px)";
      outersld.style.opacity = "0";
      currTransl[outerIndex] = currTransl[outerIndex] + moveOffset * amount;
    }
  }
  (function ($) {
    var SliceSlider = {
      /**
       * Settings Object
       */
      settings: {
        delta: 0,
        currentSlideIndex: 0,
        scrollThreshold: 40,
        slides: $(".slide"),
        numSlides: $(".slide").length,
        navPrev: $(".js-prev"),
        navNext: $(".js-next"),
      },

      /**
       * Init
       */
      init: function () {
        s = this.settings;
        this.bindEvents();
      },

      /**
       * Bind our click, scroll, key events
       */
      bindEvents: function () {
        // Scrollwheel & trackpad
        s.slides.on({
          "DOMMouseScroll mousewheel": SliceSlider.handleScroll,
        });
        // On click prev
        s.navPrev.on({
          click: SliceSlider.prevSlide,
        });
        // On click next
        s.navNext.on({
          click: SliceSlider.nextSlide,
        });
        // On Arrow keys
        $(document).keyup(function (e) {
          // Left or back arrows
          if (e.which === 37 || e.which === 38) {
            SliceSlider.prevSlide();
          }
          // Down or right
          if (e.which === 39 || e.which === 40) {
            SliceSlider.nextSlide();
          }
        });
      },

      /**
       * Interept scroll direction
       */
      handleScroll: function (e) {
        // Scrolling up
        if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) {
          s.delta--;

          if (Math.abs(s.delta) >= s.scrollThreshold) {
            SliceSlider.prevSlide();
          }
        }

        // Scrolling Down
        else {
          s.delta++;

          if (s.delta >= s.scrollThreshold) {
            SliceSlider.nextSlide();
          }
        }

        // Prevent page from scrolling
        return false;
      },

      /**
       * Show Slide
       */
      showSlide: function () {
        // reset
        s.delta = 0;
        // Bail if we're already sliding
        if ($("body").hasClass("is-sliding")) {
          return;
        }
        // Loop through our slides
        s.slides.each(function (i, slide) {
          // Toggle the is-active class to show slide
          $(slide).toggleClass("is-active", i === s.currentSlideIndex);
          $(slide).toggleClass("is-prev", i === s.currentSlideIndex - 1);
          $(slide).toggleClass("is-next", i === s.currentSlideIndex + 1);

          // Add and remove is-sliding class
          $("body").addClass("is-sliding");

          setTimeout(function () {
            $("body").removeClass("is-sliding");
          }, 1000);
        });
      },

      /**
       * Previous Slide
       */
      prevSlide: function () {
        // If on first slide, loop to last
        if (s.currentSlideIndex <= 0) {
          s.currentSlideIndex = s.numSlides;
        }
        s.currentSlideIndex--;

        SliceSlider.showSlide();
      },

      /**
       * Next Slide
       */
      nextSlide: function () {
        s.currentSlideIndex++;

        // If on last slide, loop to first
        if (s.currentSlideIndex >= s.numSlides) {
          s.currentSlideIndex = 0;
        }

        SliceSlider.showSlide();
      },
    };
    SliceSlider.init();
  })(jQuery);
};
