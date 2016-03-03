(function(KonamiCode, $, undefined) {

    'use strict';

    KonamiCode.counter = 0;
    KonamiCode.started = false;
    KonamiCode.keyPressed = null;
    KonamiCode.combo = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

    KonamiCode.handler = (function() {

        function KonamiListener() {

            var _this = this;

            this.beginCode = function(event) {

              KonamiCode.keyPressed = event.which || event.keyCode;

              if(!KonamiCode.started) {

                KonamiCode.started = KonamiCode.keyPressed == 38 ? true : false;

              }

              if(KonamiCode.started) {

                if(KonamiCode.combo[KonamiCode.counter] == KonamiCode.keyPressed) {

                  KonamiCode.counter++;

                }else{

                  _this.startOver();

                }

                if(KonamiCode.counter == 10) {

                  _this.easterEgg();

                }

              }else{

                _this.startOver();

              }

            };


            this.startOver = function() {

              KonamiCode.counter = 0;
              KonamiCode.started = false;
              KonamiCode.keyPressed = null;

            };

            this.easterEgg = function() {

              printSuccess('You entered the Konami code!', 'Easter egg stuff can go here');

              _this.startOver();

            };

            this.listen = function() {

                $(document).on('keydown', function(event) {

                  _this.beginCode(event);

                });

                return this;

            };

            return this.listen();

        }

        return new KonamiListener();

    }());

}(window.KonamiCode = window.KonamiCode || {}, jQuery));
