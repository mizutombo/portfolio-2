// Configure a view object, to hold all our functions for dynamic updates and article-related event handler
var projectView = {};
//method to show the content that matches the tab clicked on
projectView.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function() {
    var tabValue = $(this).attr('data-content');
    $('.tab-content').hide();
    $('#' + tabValue).fadeIn('slow');
  });
  $('.main-nav .tab:first').click();
};
//
projectView.loadFooterToHtml = function(arr) {
  var $destination = $('footer ');
  var source = $('#footerUrl-template').html();
  var template = Handlebars.compile(source);
  arr.forEach(function(e){
    var html = template(e);
    $destination;
  });
  var html = template(this);
  return html;
};
//method to cycle through all the objects in the array, fill out the template with their values, and append the new content to the page. Also, calls the method for enabling the tab selection
projectView.renderIndexPage = function() {
  Project.all.forEach(function(p) {
    $('#projects').append(p.toHtml());
  });
  projectView.handleMainNav();
};
//runs the whole process
Project.fetchAll();
