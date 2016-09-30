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
  //method to create node
  function createUrlsNode (arr) {
    var $p = $('<p></p>');
    $p.html('Project URLS:</br>');
    arr.forEach(function(url) {
      var $a = $('<a></a>');
      $a.attr('href', url);
      $a.html(url + '</br>');
      console.log($a.html());
      $p.append($a);
    });
    return $p;
  };
  //method to create node
  function createCodeTotalNode (total) {
    var $p = $('<p></p>');
    $p.html('Total Lines of JavaScript Code in Projects: ' + total);
    return $p;
  };
  //method to cycle through all the objects in the array, fill out the template with their values, and append the new content to the page. Also, calls the method for enabling the tab selection
  projectView.renderIndexPage = function() {
    Project.all.forEach(function(p) {
      $('#projects').append(p.toHtml());
    });
    $('footer').append(createUrlsNode(Project.getProjectUrls()));
    $('footer').append(createCodeTotalNode(Project.getCodeTotal()));
    projectView.handleMainNav();
  };
  //runs the whole process
  Project.fetchAll(projectView.renderIndexPage);
  //export high level function methods
  module.projectView = projectView;
})(window);
