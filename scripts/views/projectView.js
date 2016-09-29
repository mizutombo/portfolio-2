(function(module){
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
  //method to cycle through all the objects in the array, fill out the template with their values, and append the new content to the page. Also, calls the method for enabling the tab selection
  projectView.renderIndexPage = function() {
    Project.all.forEach(function(p) {
      $('#projects').append(p.toHtml());
    });
    $('footer p').append('Project URLs: ' + Project.getProjectUrls());
    $('footer p').append('</br>Total lines of JavaScript Code in projects:' + Project.getCodeTotal());
    projectView.handleMainNav();
  };
  //runs the whole process
  Project.fetchAll(projectView.renderIndexPage);
  //export high level function methods
  module.projectView = projectView;
})(window);
