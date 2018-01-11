import fs from 'fs';

import { createRelationships } from './relationships';

export function loadModels(sequelize) {
  let models = {};
  // load in all the models
  fs.readdirSync(`${__dirname}/models/`)
    .forEach(function(f) {
      let model = f.substr(0, f.indexOf('.js'));
      models[model] = sequelize.import(`${__dirname}/models/${model}`);
    });

  createRelationships(models);

  return models;
}