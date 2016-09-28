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

Project.loadAll = function(dataWePassIn) {
  dataWePassIn.forEach(function(projectData) {
    Project.all.push(new Project(projectData));
  });
};

Project.fetchAll = function() {

  function successHandler(data, status, xhr) {
    localStorage.setItem('projects',JSON.stringify(data));
    var ETag = xhr.getResponseHeader('ETag');
    localStorage.setItem('ETag', ETag);
    Project.loadAll(data);
    projectView.renderIndexPage();
  }

  if (localStorage.projects) {
    $.ajax({
      url: '/data/projects.json',
      type:'head',
      complete: function(xhr) {
        var ETag = xhr.getResponseHeader('ETag');
        console.log(ETag + localStorage.getItem('ETag'));

        if (ETag === localStorage.getItem('ETag')) {
          var storedData = JSON.parse(localStorage.getItem('projects'));
          Project.loadAll(storedData);
          projectView.renderIndexPage();

        } else {
          $.ajax({
            type: 'GET',
            url: '/data/projects.json',
            success: successHandler
          });
        }
      }
    });
  } else {
    $.ajax({
      type: 'GET',
      url: '/data/projects.json',
      success: successHandler
    });
  }
};
