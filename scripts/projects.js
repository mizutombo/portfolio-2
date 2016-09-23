var projects = [];

function Project (opts) {
  this.title = opts.title;
  this.url = opts.url;
  this.siteName = opts.siteName;
  this.repoUrl = opts.repoUrl;
  this.description = opts.description;
}

Project.prototype.toHtml = function() {
  var source = $('#project-template').html();
  var template = Handlebars.compile(source);
  var html = template(this);
  return html;
};


myProjects.forEach(function(projectData) {
  projects.push(new Project(projectData));
});

projects.forEach(function(p) {
  $('#projects').append(p.toHtml());
});
