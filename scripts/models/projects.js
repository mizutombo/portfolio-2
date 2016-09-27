function Project (opts) {
  this.title = opts.title;
  this.url = opts.url;
  this.siteName = opts.siteName;
  this.repoUrl = opts.repoUrl;
  this.description = opts.description;
}

Project.all = [];

Project.prototype.toHtml = function() {
  var source = $('#project-template').html();
  var template = Handlebars.compile(source);
  var html = template(this);
  return html;
};

myProjects.forEach(function(projectData) {
  Project.all.push(new Project(projectData));
});

projects.forEach(function(p) {
  $('#projects').append(p.toHtml());
});


Article.loadAll = function(dataWePassIn) {
  dataWePassIn.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  }).forEach(function(ele) {
    Article.all.push(new Article(ele));
  });
};
