/**
 * Citi Digital Services Demo
 * @copyright Paulette Carter Design Group
 * @author Sebastian Inman
 * @updated October 19th 2015
 * @version 1.0.1
 * @desc This is a boilerplate javascript template
 *       used for building new websites for clients.
 *       Everything you need to get a new project
 *       up off the ground should be here.
 */

(function(ThinkPixelsGodMode, undefined) {

    'use strict';

    ThinkPixelsGodMode.title  = 'ThinkPixels God Mode';

    // =======================================================
    // creates namespace provider which helps isolate
    // implementated code from the global namespace, providing
    // a single point of access for functions and methods.
    // =======================================================
    // this keeps the code more organized and allows the code
    // to be combined into more logical sections.
    // =======================================================

    ThinkPixelsGodMode.handler = (function() {

        function _godmode() {

					/**
					 * @var _this
					 * @desc ......................
					 *
					 */

            var _this = this;

						this.GodModeActive = function() {

              if(window.developerMode === true) {

                console.message()
                  .text(' DEVELOPER MODE IS NOW ACTIVE ', {background: '#1C60FF', color: 'white', fontSize: 20})
                  .line()
                  .group()
                  .text('Think Pixels Co. Developer Mode. Copyright (c) 2015.', {color: 'black'})
                  .line()
                  .text('This is just some text data for the console group.', {color: '#525252'})
                  .line()
                  .text('This is another data block for the console group.', {color: '#525252'})
                  .groupEnd()
                  .groupEnd()
                  .line()
                  .text('\r\n')
                  .print();

              }

            };

            this.stripFilename = function(string) {

              if(string.indexOf('{{') > -1) {

                return {
                  'file': string.indexOf('{{') > -1 ? string.split('{{')[1].split('}}')[0] : null,
                  'title': string.indexOf('{{') > -1 ? string.split('{{')[1].split('}}')[1] : null
                }

              }else{

                return null;

              }

            };

            window.printSuccess = function(title, message) {

              if(window.developerMode === true) {

                if(_this.stripFilename(title) != null) {

                  console.message()
                    .group()
                    .text(_this.stripFilename(title)['file'], {color: '#447833'})
                    .text(_this.stripFilename(title)['title'], {color: '#6CBF52'})
                    .line()
                    .text(message, {color: '#6CBF52'})
                    .groupEnd()
                    .line()
                    .text('\r\n')
                    .print();

                }else{

                  console.message()
                    .group()
                    .text(title, {color: '#447833'})
                    .line()
                    .text(message, {color: '#6CBF52'})
                    .groupEnd()
                    .line()
                    .text('\r\n')
                    .print();

                }

              }

            };

            window.printError = function(title, message) {

              if(window.developerMode === true) {

                  if(_this.stripFilename(title) != null) {

                    console.message()
                      .group()
                      .text(_this.stripFilename(title)['file'], {color: '#FF1300'})
                      .text(_this.stripFilename(title)['title'], {color: '#FF6448'})
                      .line()
                      .text(message, {color: '#FF6448'})
                      .groupEnd()
                      .line()
                      .text('\r\n')
                      .print();

                  }else{

                    console.message()
                      .group()
                      .text(title, {color: 'green'})
                      .line()
                      .text(message, {color: '#6CBF52'})
                      .groupEnd()
                      .line()
                      .text('\r\n')
                      .print();

                  }

              }

            };

            window.printMessage = function(title, message) {

              if(window.developerMode === true) {

                console.message()
                  .group()
                  .text(title, {color: 'green'})
                  .line()
                  .text(message, {color: '#525252'})
                  .groupEnd()
                  .line()
                  .text('\r\n')
                  .print();

              }

            };

            /**
             * @function init()
             * @desc initiates the ThinkPixelsGodMode global function
             *       creating an active instance of the script on the
             *       current site.
             */

            this.init = function() {

                _this.GodModeActive();

                return this;

            };

            // initiate the script!
            return this.init();

        }

        // create a new handler object
        return new _godmode();

    }());

// assign ThinkPixelsGodMode to the global namespace
}(window.ThinkPixelsGodMode = window.ThinkPixelsGodMode || {}));
