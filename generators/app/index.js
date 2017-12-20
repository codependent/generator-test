'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  // Note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts);

    // This makes `projectName` a required argument.
    this.argument('projectName', { type: String, required: false });
    this.argument('enabled', {
      type: value => {
        if (value !== 'true' && value !== 'false') {
          throw new Error('Usar true o false');
        } else {
          return value === 'true';
        }
      },
      required: false
    });
    this.argument('nombre', { type: String, required: false });

    // And you can then access it later; e.g.
    this.log(this.options);
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        'Welcome to the super-duper ' +
          chalk.red('generator-generatortest') +
          ' generator!'
      )
    );

    const prompts = [];

    if (this.options.projectName === undefined) {
      prompts.push({
        type: 'input',
        name: 'projectName',
        message: 'Project name?'
      });
    }
    if (this.options.enabled === undefined) {
      prompts.push({
        type: 'confirm',
        name: 'enabled',
        message: 'Would you like to enable this option?',
        default: true
      });
    }
    if (this.options.nombre === undefined) {
      prompts.push({
        type: 'input',
        name: 'nombre',
        message: "What's your name?",
        default: 'Jose'
      });
    }
    return this.prompt(prompts).then(props => {
      this.props = Object.assign(props, this.options);
      this.log(this.props);
    });
  }

  writing() {
    this.fs.copyTpl(
      [
        this.templatePath() + '/someFolder/**',
        '!' + this.templatePath() + '/someFolder/toExclude.js'
      ],
      this.destinationPath(this.props.projectName + '/someFolder'),
      this.props
    );
  }

  install() {
    this.installDependencies();
  }
};
