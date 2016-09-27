// Configure a view object, to hold all our functions for dynamic updates and article-related event handler
var projectView = {};

projectView.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function() {
    var tabValue = $(this).attr('data-content');
    $('.tab-content').hide();
    $('#' + tabValue).fadeIn('slow');
  });
  $('.main-nav .tab:first').click();
};

projectView.renderIndexPage = function() {
  Project.all.forEach(function(p) {
    $('#projects').append(p.toHtml());
    projectView.handleMainNav();
  });
};

Project.fetchAll();
