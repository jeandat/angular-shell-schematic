// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const chromeBin = require('puppeteer').executablePath();
console.log('Using CHROME_BIN:', chromeBin);
process.env.CHROME_BIN = chromeBin;

module.exports = function(config) {
    config.set({
        basePath:'',
        frameworks:['jasmine', '@angular-devkit/build-angular', 'jasmine-matchers'],
        plugins:[
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('puppeteer'),
            require('karma-jasmine-matchers'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        files:[
            
        ],
        client:{
            clearContext:false // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter:{
            dir:require('path').join(__dirname, '../coverage/<%= name %>'),
            reports:['html', 'lcovonly', 'text-summary'],
            fixWebpackSourcePaths:true
        },
        reporters:['progress', 'kjhtml'],
        port:9876,
        colors:true,
        logLevel:config.LOG_INFO,
        autoWatch:true,
        browsers:['MyHeadlessChrome'],
        singleRun:false,
        customLaunchers:{
            MyHeadlessChrome:{
                base:'ChromeHeadless',
                flags:['--disable-translate', '--disable-extensions', '--no-sandbox']
            }
        }

    });
};
