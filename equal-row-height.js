'use strict';
(function ($) {
  
  $.fn.equalRowHeight = function heightify() {
    var container = this;
    var RowElement = function (element) {
      var self = this;
      self.$element = element;
      self.$siblings = [];
      self.findRowSiblings = function () {
        // Reset siblings.
        self.$siblings = [];
        var iterator;
        var itSibling;
        
        // Check if siblings before me are on same row;
        iterator = new self.rowSiblingIterator(self.$element);
        do {
          itSibling = iterator.next();
          if (itSibling.value) {
            self.$siblings.push(itSibling.value);
          }
        } while (!itSibling.done);
        
        // Check if siblings after me are on same row;
        iterator = new self.rowSiblingIterator(self.$element, true);
        do {
          itSibling = iterator.next();
          if (itSibling.value) {
            self.$siblings.push(itSibling.value);
          }
        } while (!itSibling.done);
        
      };
      self.getTallestSibling = function () {
        var tallest = self.$element;
        // Reset my height to compare evenly to other siblings.
        self.$element.height('auto');
        // Loop through siblings to find tallest one including myself.
        var i = self.$siblings.length;
        while (i--) {
          tallest = (tallest.height() < self.$siblings[i].height()) ? self.$siblings[i] : tallest;
        }
        
        return tallest;
      };
      
      self.rowSiblingIterator = function (currentElement, reverse) {
        var $currentEl = currentElement;
        var nextElementMethod = reverse ? 'prev' : 'next';
        
        return {
          next: function () {
            // Get next sibling in iterator (could be prev() or next() depending on reverse).
            var $sibling = $currentEl[nextElementMethod]();
            if (!$sibling.length) {
              // if sibling doesn't exist, return done
              return {done: true};
            }
            // Compare current Element to self.
            if (self.$element.position().top === $sibling.position().top) {
              // Prepare for next iteration.
              $currentEl = $sibling;
              
              return {
                value: $sibling,
                done: false
             };
            }else {
              return {done: true};
            }
          }
        };
      };
      
      
      self.init = function () {
        var currentTop = self.$element.position().top;
        var windowLastResizedOn; // Necessary to no when to reinit.
        // Check if image exists, is not yet loaded (height===0) & is visible
        if (self.$element.find('img') && self.$element.find('img').height() === 0 && self.$element.find('img').is(':visible')) {
          self.$element.find('img').on('load', function () {
            // Set height.
            self.adjustHeight();
          });
        } else {
          // Set height.
          self.adjustHeight();
        }
        
        // Watch top position.  
        // If this element moves, reinit.
        window.setTimeout(function () {
          if (self.$element.position().top !== currentTop) {
            self.init();
          }
        }, 1000);
        
      };
      
      self.adjustHeight = function () {
        self.findRowSiblings();
        var winner = self.getTallestSibling();
        self.$element.height(winner.height());
      };
      
    };
    
    // Initialize
    container.children().each(function () {
      var element = new RowElement($(this));
      element.init();
    });
  };
})(jQuery);
