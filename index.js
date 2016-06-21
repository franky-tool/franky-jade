'use strict'

let Logger
  , utils
  , jadeFilters = require('jade').filters
  ;

function processTemplateEngine(server) {
  Logger = this.Logger;
  utils = this.utils;
  let app = server.application
    , templatesFolder = server.templatesFolders[0]
    ;
  app.set('view engine', 'jade');
  app.set('views', templatesFolder);
}

function loadTemplateEngineFilters(server) {
   let filters = server.pluginManager.getLoadedFilters()
    , action
    ;
  for(let key in filters){
    action = filters[key].bind(server.scope)();
    Logger.log('info', '\t\t- '+key);
    jadeFilters[key] = action;
  }
}

function prepareName(name){
  return name.replace('.html', '.jade');
}

module.exports = {
  "type": "templateEngine",
  "templateEngineProcessor": processTemplateEngine,
  "loadTemplateEngineFilters": loadTemplateEngineFilters,
  "templateNameProprocessor": prepareName
}
