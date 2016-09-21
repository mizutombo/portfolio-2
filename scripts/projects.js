var projects = [];

function Project (opts) {
  this.title = opts.title;
  this.url = opts.url;
  this.repoUrl = opts.repoUrl;
  this.description = opts.repoUrl;
}

Project.prototype.toHtml = function() {};
