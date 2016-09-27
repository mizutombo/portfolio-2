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
  if (localStorage.projects) {
    $.ajax({
      url: '/data/projects.json',
      type:'head',
      complete: function(xhr) {
        var eTag = xhr.getResponseHeader('ETag');
        console.log(eTag + localStorage.getItem('eTag'));
        if (eTag === localStorage.getItem('eTag')) {
          var storedData = JSON.parse(localStorage.getItem('projects'));
          Project.loadAll(storedData);
          projectView.renderIndexPage();
        } else {
          $.ajax({
            type: 'GET',
            url: '/data/projects.json',
            success: successHandler
          });
          $.ajax({
            url: '/data/projects.json',
            type:'head',
            complete: function(xhr) {
              var eTag = xhr.getResponseHeader('ETag');
              localStorage.setItem('eTag', eTag);
            }
          });
          function successHandler(data) {
            localStorage.setItem('projects',JSON.stringify(data));
            Project.loadAll(data);
            projectView.renderIndexPage();
          }
        }
      }
    });
  } else {
    $.ajax({
      type: 'GET',
      url: '/data/projects.json',
      success: successHandler
    });
    $.ajax({
      url: '/data/projects.json',
      type:'head',
      complete: function(xhr) {
        var eTag = xhr.getResponseHeader('ETag');
        localStorage.setItem('eTag', eTag);
      }
    });
    function successHandler(data) {
      localStorage.setItem('projects',JSON.stringify(data));
      Projects.loadAll(data);
      projectView.renderIndexPage();
    }
  }
};
