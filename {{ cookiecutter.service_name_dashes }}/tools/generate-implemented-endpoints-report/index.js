const fs = require('fs-extra');
const yaml = require('js-yaml');
const Mustache = require('mustache');
const { JSONPath: jsonPath } = require('jsonpath-plus');
const openApi = yaml.load(fs.readFileSync('./openapi.yaml', 'utf-8'));

const mustacheData = {
  endpoints: []
};

for (const [key, value] of Object.entries(openApi.paths)) {
  ['post', 'get', 'patch', 'delete', 'put'].forEach((method) => {
    const [pathMethod] = jsonPath({ path: `$.${method}`, json: value });

    if (pathMethod) {
      const [endpointType] = jsonPath({ path: '$..x-amazon-apigateway-integration.type', json: pathMethod });
      mustacheData.endpoints.push({
        method: method.toUpperCase(),
        path: key,
        implemented: endpointType !== 'mock'
      });
    }
  });
}

const template = `
# API Implementation Status

  |   Method   |   Path   |   Implemented  |
  | ---------- | -------- | --------- |
  {{#endpoints}}
  | {{method}} | {{path}} | {{implemented}}
  {{/endpoints}}
`;

const output = Mustache.render(template, mustacheData);

if (!fs.existsSync('./docs')) {
  fs.mkdirSync('docs');
}

fs.writeFileSync('./docs/api-implementation-status.md', output);
