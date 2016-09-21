var projects = [];

function Project (opts) {
  this.title = opts.title;
  this.url = opts.url;
  this.siteName = opts.siteName;
  this.repoUrl = opts.repoUrl;
  this.description = opts.description;
}

Project.prototype.toHtml = function() {
  var $newProject = $('article.template').clone();
  $newProject.find('h1').text(this.title);
  $newProject.find('a.siteName').attr('href', this.url);
  $newProject.find('a.siteName').text(this.siteName);
  $newProject.find('a.gitHub').attr('href', this.repoUrl);
  $newProject.find('.article-body').html(this.description);
  $newProject.removeClass('template');
  return $newProject;
};


myProjects.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(a) {
  $('#articles').append(a.toHtml());
});
