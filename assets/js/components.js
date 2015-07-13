'use strict';

/* globals $: false */

/**
 * Accordion
 *
 * An accordion component.
 *
 * @param {jQuery} $el A jQuery html element to turn into an accordion.
 */
function Accordion($el) {
  var self = this;
  this.$root = $el;
  this.$root.on('click', 'button', function(ev) {
    ev.preventDefault();
    self.hideAll();
    self.show($(this));
  });
}

Accordion.prototype.$ = function(selector) {
  return this.$root.find(selector);
}

Accordion.prototype.hide = function($button) {
  var selector = $button.attr('aria-controls'),
      $content = this.$('#' + selector);

  $button.attr('aria-expanded', false);
  $content.attr('aria-hidden', true);
};

Accordion.prototype.show = function($button) {
  var selector = $button.attr('aria-controls'),
      $content = this.$('#' + selector);

  $button.attr('aria-expanded', true);
  $content.attr('aria-hidden', false);
};

Accordion.prototype.hideAll = function() {
  var self = this;
  this.$('button').each(function() {
    self.hide($(this));
  });
};

/**
 * accordion
 *
 * Initialize a new Accordion component.
 *
 * @param {jQuery} $el A jQuery html element to turn into an accordion.
 */
function accordion($el) {
  return new Accordion($el);
}

$(function() {
  $('.usa-accordion').each(function() {
    accordion($(this));
  });


  var footerAccordion = function() {
    if (window.innerWidth < 600) {
        $('.usa-footer-big nav ul').addClass('hidden');

        $('.usa-footer-big nav').on('click', 'h3', function() {
          $(this).parent().removeClass('hidden')
          .siblings().addClass('hidden');
        });
    } else {
      $('.usa-footer-big nav ul').removeClass('hidden');  
    }
  };

  footerAccordion();

  $(window).resize(function() {
    footerAccordion();
  });

});
