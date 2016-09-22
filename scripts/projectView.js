// Configure a view object, to hold all our functions for dynamic updates and article-related event handler
var projectView = {};

projectView.handleMainNav = function () {
  $('.main-nav .tab').on('click', function() {
    var tabValue = $(this).attr('data-content');
    $('.tab-content').hide();
    $('#' + tabValue).fadeIn('slow');
  });
  $('.main-nav .tab:first').click();
};

projectView.handleMainNav();
