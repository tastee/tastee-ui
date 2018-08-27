// This file contains development variables. (When you work in DEV MODE)
// This file is use by webpack. Please don't rename it and don't move it to another directory.
export const AppConfig = {
  production: false,
  local_storage_worskpace_name: 'tastee_workspace',
  local_storage_session_name: 'tastee_session',
  tastee_file_ext: '.html',
  tastee_config_file_ext: '.yaml',
  tastee_properties_file_ext: '.properties',
  keyword_to_include_yaml_file: /\/\/savor\ (.*(.yaml|.properties))/g,
  default_browser: 'chrome',
  browsers: ['chrome']
};
