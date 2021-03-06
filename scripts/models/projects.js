(function(module){
  //constructor function to take stored data and make new objects with it
  function Project (opts) {
    this.title = opts.title;
    this.url = opts.url;
    this.siteName = opts.siteName;
    this.repoUrl = opts.repoUrl;
    this.description = opts.description;
    this.linesOfCode = opts.linesOfCode;
  }
  //array to store projects
  Project.all = [];
  //method to get array of working Project.url's
  Project.getProjectUrls = function() {
    return Project.all.map(function(project) {
      return project.url;
    }).filter(function(url) {
      return !!url;
    });
  };
  //method to get total lines of JS code from projects
  Project.getCodeTotal = function() {
    return Project.all.map(function(project) {
      return project.linesOfCode;
    }).reduce(function(acc, curr) {
      return acc + curr;
    }, 0);
  };
  //method to use Handlebars.js to fill template and return html
  Project.prototype.toHtml = function() {
    var source = $('#project-template').html();
    var template = Handlebars.compile(source);
    var html = template(this);
    return html;
  };
  //method to apply contructor function to data objects and insert new objects in array
  Project.loadAll = function(dataWePassIn) {
    dataWePassIn.forEach(function(projectData) {
      Project.all.push(new Project(projectData));
    });
  };
  //method to retrieve data through ajax request or localStorage, convert that data to new objects in an array, and then apply the objects to Handlebars.js template and add it to the site
  Project.fetchAll = function(nextFunction) {
    //function to run when ajax request is successful.
    function successHandler(data, status, xhr) {
      localStorage.setItem('projects',JSON.stringify(data));
      var ETag = xhr.getResponseHeader('ETag');
      localStorage.setItem('ETag', ETag);
      Project.loadAll(data);
      nextFunction();
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
            nextFunction();
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
  //export high level function methods
  module.Project = Project;
})(window);
