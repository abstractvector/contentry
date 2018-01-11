import fs from 'fs';

import { createRelationships } from './relationships';

export function loadModels(app) {
  let models = {};
  // load in all the models
  fs.readdirSync(`${__dirname}/models/`)
    .forEach(function(f) {
      let model = f.substr(0, f.indexOf('.js'));
      models[model] = app.db.import(`${__dirname}/models/${model}`);
    });

  createRelationships(models);
  
  return models;
}