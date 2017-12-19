'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the super-duper ' + chalk.red('generator-generatortest') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'Project name?'
    },{
      type: 'confirm',
      name: 'enabled',
      message: 'Would you like to enable this option?',
      default: true
    },    {
      type: 'input',
      name: 'nombre',
      message: 'What\'s your name?',
      default: 'Jose'
    }];
    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      [this.templatePath() + '/someFolder/**', '!' + this.templatePath() + '/someFolder/toExclude.js'],
      this.destinationPath(this.props.projectName+'/someFolder'), this.props);
  }

  install() {
    this.installDependencies();
  }
};
