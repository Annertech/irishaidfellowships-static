/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function ($, Drupal, window, document, undefined) {

// To understand behaviors, see https://drupal.org/node/756722#behaviors
Drupal.behaviors.my_custom_behavior = {
  attach: function(context, settings) {

    // Begin basic mobile menu support here
    // Set this 481 to the number of pixels you want for when the mobile menu
    // becomes a desktop menu
    if ($(window).width() < 961) {
      //Add your jQuery for mobile menu on small screens here

      // Hide the main menu items for mobile views initially
      $('#main-menu ul, #middle-menu ul').hide();

      // Remove the element-invisible class for the #main-menu title on
      // small screens so we can use the menu title as our trigger
      // Add an "unclicked" class to the trigger (handy for theming)
      $('#main-menu h2, #middle-menu h2').removeClass('element-invisible').addClass('menu-trigger-unclicked');

      // Toggle list on/off when title is clicked
      $('#main-menu h2').click(function() {
        // When clicked, add a "clicked" class to the trigger (handy for theming)
        // and remove the "unclicked" class and vice versa.
        $('#main-menu h2').toggleClass('menu-trigger-unclicked menu-trigger-clicked');
        // Slide the menu in to/out of view when trigger is clicked
        $('#main-menu ul').slideToggle();
        // Set each menu item to 100% so they are no longer set side-by-side
        $('#main-menu ul li').css('width','100%');
      });
      // Toggle list on/off when title is clicked
      $('#middle-menu h2').click(function() {
        // When clicked, add a "clicked" class to the trigger (handy for theming)
        // and remove the "unclicked" class and vice versa.
        $('#middle-menu h2').toggleClass('menu-trigger-unclicked menu-trigger-clicked');
        // Slide the menu in to/out of view when trigger is clicked
        $('#middle-menu ul').slideToggle();
        // Set each menu item to 100% so they are no longer set side-by-side
        $('#middle-menu ul li').css('width','100%');
      });

      // Make the cursor a pointer when hovered
      $('#main-menu h2, #middle-menu').hover(function() {
        $(this).css('cursor','pointer');
      });
    } else {
      $('#main-menu h2, #middle-menu h2').addClass('element-invisible');
    }

    // Only show the strand application forms if a user ticks the "I am eligible" checkbox

    $('.i-am-eligible-items').hide();
    var $submit = $("#i-am-eligible-button").hide(),
        $checked = $('input[name="i-am-eligible-checkbox"]').click(function() {
          $submit.toggle( $checked.is(":checked") );
        });
    $($submit).click(function() {
      $('.i-am-eligible-items').slideToggle();
    });

    // Set each views-row in the "Case Studies" page equal height
    function equalHeight($group) {
      tallest = 0;
      var i = 0;
      var $heights = [];
      // Reset heights.
      $group.each(function() {
        var $this = $(this);
        $this.css('height', 'auto');
        $heights[i] = $this.height();
        i++;
        $this.css('height', '');
      });
      // Get tallest.
      $group.each(function() {
        thisHeight = $(this).height();
        console.log('this height = ' + thisHeight);
        if (thisHeight > tallest) {
          tallest = thisHeight;
          console.log(tallest);
        }
      });
      $group.height(tallest);
    }
    // Get the group.
    var $caseStudies = $(".view-case-studies .views-row");
    // Set the heights.
    equalHeight($caseStudies);
      // Do it again when the window resizes. (e.g ipad orientation.)
      $( window ).resize(function() {
        equalHeight($caseStudies);
      });
      // Do it whenever the window loads to make sure we can accommodate
      // crappy laggy image loading.
      $(window).load(function() {
        equalHeight($caseStudies);
      });

    // Set image caption same width as the image
    $(".paragraphs-item-image-and-or-text .field-name-field-main-image img").load(function() {
      var $this = $(this);
      var $img_width = $this.width();
      $img_width += 1;
      $img_width += 'px';
      $this.parents('.paragraphs-item-image-and-or-text').find('.field-name-field-content').css('width', $img_width);
    });


  }
};

})(jQuery, Drupal, this, this.document);
