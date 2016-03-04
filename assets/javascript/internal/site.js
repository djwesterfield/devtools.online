/**
 * Think Pixels Co. Template System
 * @copyright Think Pixels Co.
 * @author Sebastian Inman
 * @updated October 22nd 2015
 * @version 1.0.0
 * @desc This is a boilerplate javascript template
 *       used for building new websites for clients.
 *       Everything you need to get a new project
 *       up off the ground should be here.
 */

(function(DevTools, $, undefined) {

    'use strict';


    // ======================================
    // establish public variables and methods
    // ======================================

    DevTools.Title       = 'DevTools Online';
    DevTools.Description = 'A massive collection of online web development tools';
    DevTools.Timestamp   = +new Date;

    DevTools.Location = 'https://www.devtools.online/';
    DevTools.Firebase = new Firebase('https://devtoolsonline.firebaseio.com/');

    DevTools.Authenticated;
    DevTools.User;

    DevTools.Category = 'design';
    DevTools.Filter   = 'all';
    DevTools.Sort     = 'likes:desc';
    DevTools.Tag      = 'mobile';

    DevTools.Search   = null;
    DevTools.Tool     = null;

    // ==========================================
    // establish private variables and parameters
    // ==========================================

    var is_mobile = window.mobile.any();

    var is_authenticated = false;

    // =======================================
    // establish private DOM element selectors
    // =======================================

    var $window = $(window);

    var $main       = $('#main');
    var $content    = $('#content');

    var $btnTwitter = $('#twitter-login');
    var $btnLogout  = $('#logout');
    var $btnSort    = $('.tool-sort');

    var $userInfo   = $('#user-info');
    var $userAvatar = $('#user-avatar');
    var $userName   = $('#user-name');

    var $contentHeader = $('#content-header');
    var $toolsList     = $('#tools-list');

    var $mobileBtn     = $('#toggle-mobile-menu');
    var $mobileNav     = $('aside');

    // var $tagSelector = $('.tag-selector');

    var $inputSearch = $('#search-input');

    var $categoryNav = $('#category-nav');
    var $toolsList   = $('#tools-list');
    var $tagNav      = $('#tag-nav');

    var $toolInfo    = $('#tool-info');

    var $categorySelector = null;
    var $tagSelector      = null;
    var $btnAction        = null;
    var $btnDetails       = null;

    // =======================================================
    // creates namespace provider which helps isolate
    // implementated code from the global namespace, providing
    // a single point of access for functions and methods.
    // =======================================================
    // this keeps the code more organized and allows the code
    // to be combined into more logical sections.
    // =======================================================

    DevTools.handler = (function() {

        function _handler() {

            var _this = this;

            this.promptLogin = function() {

              alert('Please sign in with your Twitter account first.');

            };

            var randomID = function(length) {

              length = length ? length : 10;

              var id = '';

              for(var i = 0; i < length; i++) {

                id += Math.floor((Math.random() * 9) + 1);

              }

              return id;

            };

            var hashitize = function(string) {

              return string.replace(/\s+/g, '-').toLowerCase();

            };

            var objectToString = function(object) {

              var string = '';

              $.each(object, function(key, value) {

                string += value + ' ';

              });

              return string;

            };

            this.addNewTool = function() {

              var tool = {

                name:     null,
                hash:     null,
                category: DevTools.Category,
                tags:     DevTools.Tag,
                url:      DevTools.Location,
                image:    'https://placehold.it/1024x720'

              };

              if(DevTools.Authenticated) {

                var popupName = prompt('Name the tool:');

                if(popupName) {

                  tool.name = popupName;
                  tool.hash = hashitize(tool.name);

                  var popupCategory = prompt('What is the tools category:', tool.category);

                  if(popupCategory) {

                    tool.category = popupCategory;

                    var popupTags = prompt('Tag this tool:', tool.tags);

                    if(popupTags) {

                      tool.tags = popupTags.split(',');

                      var popupURL = prompt('What is the tools URL:', tool.url);

                      if(popupURL) {

                        tool.url = popupURL;

                        var popupImage = prompt('What is the thumbnail URL:', tool.image);

                        if(popupImage) {

                          tool.image = popupImage;

                          DevTools.Firebase.child('tools/' + randomID(10)).set({

                            addedBy:   DevTools.User.id,
                            name:      tool.name,
                            hash:      tool.hash,
                            tags:      tool.tags,
                            category:  tool.category,
                            thumbnail: tool.image,
                            url:       tool.url,
                            likes:     0,
                            favorites: 0

                          });

                        }

                      }

                    }

                  }

                }

              }

            };

            this.runCallback = function(callback) {

              if(callback && typeof callback == 'function') { callback(); }

            };

            this.updateURL = function() {

              var locationCategory = DevTools.Category ? DevTools.Category + '/' : '';
              var locationTag      = DevTools.Tag      ? DevTools.Tag      + '/' : '';
              var locationTool     = DevTools.Tool     ? DevTools.Tool     + '/' : '';

              var location = locationCategory + locationTag + locationTool;

              DevTools.Filter = DevTools.Tag === 'everything' ? '.' + DevTools.Category + ', all' : '.' + DevTools.Category + '.' + DevTools.Tag;

              window.location.hash = '!/' + location;

              $toolsList.mixItUp('filter', DevTools.Filter);

            };

            this.checkURL = function(callback) {

              if(window.location.hash) {

                var parameters = window.location.hash.split('/');

                DevTools.Category = parameters[1] ? parameters[1].toString() : '';
                DevTools.Tag      = parameters[2] ? parameters[2].toString() : '';
                DevTools.Tool     = parameters[3] ? parameters[3].toString() : '';

                $('.tool-link').each(function() {

                  var link = $(this);
                  var tool = link.data('tool');

                  link.attr('href', DevTools.Location + '#!/' + DevTools.Category + '/' + DevTools.Tag + '/' + tool + '/');

                });

                DevTools.Filter = DevTools.Tag === 'everything' ? '.' + DevTools.Category + ', all' : '.' + DevTools.Category + '.' + DevTools.Tag;

                if(DevTools.Tool) {

                  _this.loadTool(DevTools.Tool);

                }else{

                  _this.unloadTool();

                }

              }else{

                window.location.hash = '!/development/everything/';

              }

              _this.runCallback(callback);

            };

            this.loadTool = function(tool) {

              _this.hideTools(function() {

                $toolInfo.addClass('visible');

              });

              DevTools.Firebase.child('tools').orderByChild('hash').equalTo(tool).once('value', function(snapshot) {

                console.log('tool found: ' + snapshot.val());

              });

            };

            this.unloadTool = function() {

              $toolInfo.removeClass('visible');

            };

            this.scrollToTop = function(callback) {

              var scrollSpeed = $window.scrollTop() > 0 ? $window.scrollTop() * 1.5 : 0;

              $('html, body').animate({

                scrollTop: '0px'

              }, scrollSpeed, function() {

                _this.runCallback(callback);

              });

            };




            this.loadCategories = function(callback) {

              DevTools.Firebase.child('categories').once('value', function(snapshot) {

                var categoryCount = Object.keys(snapshot.val()).length;
                var categoryThis  = 0;

                $.each(snapshot.val(), function(id, category) {

                  categoryThis++;

                  var output = '<li><a class="category-selector tool-filter pointer" href="' + DevTools.Location + '#!/' + category.hash + '/everything/" data-active="false" data-filter=".' + category.hash + '"><i class="fa fa-' + category.icon + '"></i>' + category.name + '</a></li>';

                  $categoryNav.append(output);

                  if(category.tags) {

                    var tagsCount = category.tags.length;
                    var tagThis   = 0;

                    $.each(category.tags, function(id, tag) {

                      var filters = tag.hash === 'everything' ? 'all, .' + category.hash : '.' + category.hash + '.' + tag.hash ;

                      if($('.tag-selector[data-category="' + category.hash + '"][data-tag="' + tag.hash + '"]').length === 0) {

                        var output = '<li><a class="tag-selector pointer tool-filter" href="' + DevTools.Location + '#!/' + category.hash + '/' +tag.hash + '/" data-active="false" data-category="' + category.hash + '" data-filter="' + filters + '" data-tag="' + tag.hash + '"><label>' + tag.name + '<span>0</span></label></a></li>';

                        $tagNav.append(output);

                        $tagSelector = $('.tag-selector');

                      }

                    });

                  }

                  if(categoryThis >= categoryCount) {

                    $categorySelector = $('.category-selector');

                    _this.runCallback(callback);

                  }

                });

              });

            };

            this.hideTools = function(callback) {

              $toolsList.mixItUp('filter', 'none', function() {

                _this.runCallback(callback);

              });

            };

            $.fn.openTool = function() {

              return this.on('click', function() {

                var button   = $(this);
                var toolID   = button.closest('.tool').data('id');
                var toolHash = button.closest('.tool').data('hash');

                DevTools.Tool = toolHash;

                _this.loadTool(DevTools.Tool);

              });

            };

            this.loadTools = function(callback) {

              DevTools.Firebase.child('tools').once('value', function(snapshot) {

                var toolCount = Object.keys(snapshot.val()).length;
                var toolThis  = 0;

                $.each(snapshot.val(), function(id, tool) {

                  DevTools.Firebase.child('users/' + tool.addedBy).once('value', function(snapshot) {

                    toolThis++;

                    var addedBy = snapshot.val().devtools_data.displayName;

                    var toolDescription = tool.info ? tool.info : 'Update me';
                    var imageAlt        = tool.info ? tool.info : tool.name;

                    var tagClasses = objectToString(tool.tags);

                    var tagList = function() {

                      var output = '';

                      $.each(tool.tags, function(key, tag) {

                        output += '<a class="tool-filter" data-filter=".' + tool.category + '.' + tag + '" href="' + DevTools.Location + '#!/' + tool.category + '/' + tag + '/' + '">#' + tag + '</a>';

                      });

                      return output;

                    };

                    var like_tip = tool.likes < 1 ? 'Be the first to like this tool' : 'Like this tool';
                    var share_text_parsed = encodeURIComponent(toolDescription.trim());

                    var output  = '<li class="mix ' + tool.category + ' ' + tagClasses + ' ' + tool.hash + '" data-likes="'+tool.likes+'" data-saves="'+tool.favorites+'"><div class="tool" data-id="' + id + '" data-hash="' + tool.hash + '" data-category="' + tool.category + '" data-tags="' + tool.tags + '">';
                        output +=   '<div class="thumbnail" style=background-image:url(' + tool.thumbnail + ');"">';
                        output +=     '<div class="thumb-actions">';
                        output +=       '<a title="' + tool.url + '" href="' + tool.url + '?ref=devtools" rel="external" target="new"><i class="fa fa-link"></i></a>';
                        output +=       '<a class="more-info tool-link" data-tool="' + tool.hash + '" href="' + DevTools.Location + '#!/' + DevTools.Category + '/' + DevTools.Tag + '/' + tool.hash + '/" title="More information about ' + tool.name + '"><i class="fa fa-info"></i></a>';
                        output +=     '</div>';
                        output +=     '<!-- <img alt="' + imageAlt + '" src="' + tool.thumbnail + '"> -->';
                        output +=   '</div>';
                        output +=   '<div class="details">';
                        output +=     '<h2><a class="tool-link" href="' + tool.url + '?ref=devtools" rel="external" target="new" title="' + tool.url + '">' + tool.name + '</a></h2>';
                        output +=     '<p>' + tagList() + '</p>';
                        output +=     '<p class="short-description edit-desc" title="' + toolDescription + '">' + toolDescription + '</p>';
                        output +=   '</div>';
                        output +=   '<nav class="actions">';
                        output +=     '<li title="' + like_tip + '"><button class="tool-action" data-action="heart"><i class="heart"></i><span>' + tool.likes + '</span></button></li>';
                        output +=     '<li title="Add this tool to your favorites"><button class="tool-action" data-action="favorite"><i class="fa fa-bookmark-o"></i><span>' + tool.favorites + '</span></button></li>';
                        output +=     '<li title="Share this tool online"><button class="tool-action" data-action="share" data-url="http://twitter.com/share?text=' + share_text_parsed + '&url=' + tool.url + '?ref=devtools"><i class="fa fa-share-alt"></i><span>Share</span></button></li>';
                        output +=   '</nav>';
                        output += '</div></li>';

                    $toolsList.append(output);

                    Pace.restart();

                    if(toolThis >= toolCount) {

                      $btnAction = $('.tool-action');
                      $btnDetails = $('.more-info');

                      _this.runCallback(callback);

                    }

                  });

                });

              });

            };

            this.showUserLikesAndFavorites = function() {

              if(DevTools.Authenticated) {

                DevTools.Firebase.child('users/' + DevTools.User.id).once('value', function(snapshot) {

                  var likes     = snapshot.val().likes;
                  var favorites = snapshot.val().favorites;

                  if(likes) {

                    $.each(likes, function(toolID, data) {

                      $('.tool[data-id="' + toolID + '"]').find('.tool-action[data-action="heart"]').toggleActionStatus('like');

                    });

                  }

                  if(favorites) {

                    $.each(favorites, function(toolID) {

                      $('.tool[data-id="' + toolID + '"]').find('.tool-action[data-action="favorite"]').toggleActionStatus('favorite');

                    });

                  }

                });

              }

            };

            this.authenticated = function(is, authData) {

              $btnTwitter.hide();
              $btnLogout.hide();

              switch(is) {

                case true:

                  DevTools.Authenticated = true;
                  DevTools.User = authData.twitter;

                  $btnTwitter.hide();
                  $btnLogout.show();

                  $userName.text(authData.twitter.displayName);
                  $userAvatar.attr('src', authData.twitter.profileImageURL);

                  $userInfo.show();

                  // _this.showUserLikesAndFavorites();

                  // ===============================================
                  // add user to the database if they aren't already
                  // ===============================================

                  DevTools.Firebase.child('users/' + authData.twitter.id).once('value', function(snapshot) {

                    if(!snapshot.exists()) {

                      DevTools.Firebase.child('users/' + authData.twitter.id).set({

                        devtools_data: {

                          level:       0,
                          username:    authData.twitter.username,
                          displayName: authData.twitter.displayName,
                          avatar:      authData.twitter.profileImageURL

                        },

                        twitter_data: {

                          username:    authData.twitter.username,
                          displayName: authData.twitter.displayName,
                          avatar:      authData.twitter.profileImageURL

                        }

                      });

                    }

                  });

                break;

                default:

                  $userInfo.hide();

                  $userName.text('');
                  $userAvatar.attr('src', '');

                  $btnLogout.hide();
                  $btnTwitter.show();

                  DevTools.Firebase.unauth();
                  DevTools.Authenticated = false;
                  DevTools.User = null;

                  _this.clearLikesAndFavorites();

              }

            };

            this.addNewCategory = function() {

              var popup = prompt('Name the category:');

              if(popup) {

                DevTools.Firebase.child('categories/' + randomID(10)).set({

                  name: popup,
                  hash: hashitize(popup),
                  icon: 'circle-o'

                });

              }

            };

            this.addNewTag = function() {

              var popup = prompt('Name the tag:');

              if(popup) {

                DevTools.Firebase.child('categories').orderByChild('hash').equalTo(DevTools.Category).once('value', function(snapshot) {

                  $.each(snapshot.val(), function(key, value) {

                    DevTools.Firebase.child('categories/' + key + '/tags/' + randomID(10)).set({

                      name: popup,
                      hash: hashitize(popup)

                    });

                  });

                });

              }

            };

            this.clearLikesAndFavorites = function() {

              $btnAction.removeClass('liked').removeClass('favorited');

              $('.tool-action[data-action="heart"] .fa').removeClass('fa-heart').addClass('fa-heart-o');
              $('.tool-action[data-action="favorite"] .fa').removeClass('fa-star').addClass('fa-star-o');

            };

            $.fn.toggleActionStatus = function(action) {

              var element = $(this);

              switch(action) {

                case 'like':

                  element.toggleClass('liked');
                  element.find('.heart').toggleClass('throb');

                break;

                case 'favorite':

                  element.toggleClass('favorited');
                  element.find('.fa').toggleClass('fa-bookmark-o').toggleClass('fa-bookmark');

                break;

                case 'share':

                  alert('SHARED!');

                break;

              }

            };

            this.performAction = function(element, action, toolID) {

              var likeTool = function(element, toolID) {

                element.toggleActionStatus('like');

                DevTools.Firebase.child('tools/' + toolID).once('value', function(snapshot) {

                  var toolLikes = snapshot.val().likes;
                  var newLikes = toolLikes;

                  if(element.hasClass('liked')) {

                    newLikes++;

                  }else{

                    newLikes--;

                  }

                  newLikes = newLikes < 0 ? 0 : newLikes;

                  element.find('span').text(newLikes);
                  DevTools.Firebase.child('tools/' + toolID + '/likes/').set(newLikes);

                });

                DevTools.Firebase.child('users/' + DevTools.User.id + '/likes/').once('value', function(snapshot) {

                  if(!snapshot.hasChild(toolID.toString())) {

                    DevTools.Firebase.child('users/' + DevTools.User.id + '/likes/' + toolID).set(true);

                  }else{

                    DevTools.Firebase.child('users/' + DevTools.User.id + '/likes/' + toolID).remove();

                  }

                });

              };

              var favoriteTool = function(element, toolID) {

                element.toggleActionStatus('favorite');

                DevTools.Firebase.child('tools/' + toolID).once('value', function(snapshot) {

                  var toolFavorites = snapshot.val().favorites;
                  var newFavorites  = toolFavorites;

                  if(element.hasClass('favorited')) {

                    newFavorites++;

                  }else{

                    newFavorites--;

                  }

                  newFavorites = newFavorites < 0 ? 0 : newFavorites;

                  element.find('span').text(newFavorites);
                  DevTools.Firebase.child('tools/' + toolID + '/favorites/').set(newFavorites);

                });

                DevTools.Firebase.child('users/' + DevTools.User.id + '/favorites/').once('value', function(snapshot) {

                  if(!snapshot.hasChild(toolID.toString())) {

                    DevTools.Firebase.child('users/' + DevTools.User.id + '/favorites/' + toolID).set(true);

                  }else{

                    DevTools.Firebase.child('users/' + DevTools.User.id + '/favorites/' + toolID).remove();

                  }

                });

              };

              var shareTool = function(element, toolID) {

                var share_url = element.data('url');

                var window_size = {x: 575, y: 400};
                var window_pos  = {x: ($window.width() - window_size.x)/2, y: ($window.height() - window_size.y)/2,};
                var window_opt  = 'status=1' + ',width=' + window_size.x  + ',height=' + window_size.y + ',top=' + window_pos.y + ',left=' + window_pos.x;

                window.open(share_url, 'twitter', window_opt);

              };

              // =========================================
              // establish connection to the selected tool
              // =========================================

              switch(action) {

                case 'heart':

                  if(DevTools.Authenticated) {

                    likeTool(element, toolID);

                  }else{

                    _this.promptLogin();

                  }

                break;

                case 'favorite':

                  if(DevTools.Authenticated) {

                    favoriteTool(element, toolID);

                  }else{

                    _this.promptLogin();

                  }

                break;

                case 'share':

                  shareTool(element, toolID);

                break;

              }

            };

            this.updateCategory = function() {

              DevTools.Tool = null;

              $categorySelector.attr('data-active', false);
              $('.category-selector[data-filter=".' + DevTools.Category + '"]').attr('data-active', true);

              $main.attr('data-category', '.' + DevTools.Category);

              $contentHeader.find('#category').text(DevTools.Category);

              $('.tag-selector').removeClass('visible');
              $('.tag-selector[data-filter="' + DevTools.Category + '"]').addClass('visible');

            };

            $.fn.categoryUpdateHandler = function(callback) {

              return this.on('click tap', function() {

                var category = $(this).data('filter');

                DevTools.Category = category;

                _this.updateCategory();

                _this.scrollToTop(function() {

                  Pace.restart();

                });

                _this.updateURL();

              });

            };

            this.updateTag = function() {

              DevTools.Tool = null;

              $tagSelector.attr('data-active', false).hide();
              $('.tag-selector[data-category="' + DevTools.Category + '"]').show();
              $('.tag-selector[data-category="' + DevTools.Category + '"][data-tag="' + DevTools.Tag + '"]').attr('data-active', true);

              $contentHeader.find('#tag').text('#' + DevTools.Tag.replace('-', ' '));

            };

            $.fn.tagUpdateHandler = function(callback) {

              return this.on('click tap', function() {

                DevTools.Tag = $(this).data('tag');

                _this.updateTag();

                _this.scrollToTop(function() {

                  Pace.restart();

                });

                _this.updateURL();

              });

            };

            _this.sortTools = function() {

              $toolsList.mixItUp('sort', DevTools.Sort + ':desc');

            };

            $.fn.sortHandler = function() {

              return $.each(this, function() {

                $(this).on('click tap', function(event) {

                  event.preventDefault();

                  var button = $(this);

                  DevTools.Sort = button.data('sort');

                  $btnSort.attr('data-active', false);
                  button.attr('data-active', true);

                  _this.sortTools();

                });

              });

            };


            $.fn.actionHandler = function() {

              return $.each(this, function() {

                $(this).on('click tap', function(event) {

                  event.preventDefault();

                  var button = $(this);

                  var toolID = button.closest('.tool').data('id');

                  var action = button.data('action');

                  _this.performAction(button, action, toolID);

                });

              });

            };

            $.fn.logoutHandler = function() {

              return this.on('click tap', function(event) {

                if(DevTools.Authenticated) {

                  _this.authenticated(false);

                  location.reload();

                }

              });

            };

            $.fn.loginHandler = function() {

              return this.on('click tap', function(event) {

                if(!DevTools.Authenticated) {

                  DevTools.Firebase.authWithOAuthPopup('twitter', function(error, authData) {

                    if(!error && authData) {

                      _this.authenticated(true, authData);

                      location.reload();

                    }else{

                      _this.authenticated(false);

                    }

                  });

                }else{

                  printError('Already logged in as:', authData.twitter.displayName);

                }

              });

            };



            this.buildPage = function() {

                $window.on('load hashchange resize', function(event) {

                  if(event.type === 'load') {

                    $('a').on('click tap', function(event){

                      event.preventDefault();

                    });

                    $mobileBtn.on('click tap', function(event) {

                      event.preventDefault();

                      $mobileNav.toggleClass('visible');

                    });

                    _this.checkURL(function() {

                      // run functions here
                      $userInfo.logoutHandler();
                      $btnTwitter.loginHandler();

                      _this.loadCategories(function() {

                        if(DevTools.Category) { _this.updateCategory(); }
                        if(DevTools.Tag)      { _this.updateTag(); }

                        $('#add-tag').on('click', function() {

                          _this.addNewTag();

                        });

                        $('#add-tool').on('click', function() {

                          _this.addNewTool();

                        });

                      });

                      _this.loadTools(function() {

                        $btnSort.sortHandler();
                        $btnAction.actionHandler();
                        $btnDetails.openTool();


                        $('.edit-desc').on('click', function() {

                          if(DevTools.Authenticated) {

                            var toolID = $(this).closest('.tool').data('id');
                            var toolDesc = $(this).text();

                            var text_popup = prompt('Write a short description for this tool:', toolDesc);

                            if(text_popup) {

                              DevTools.Firebase.child('tools/' + toolID + '/info').set(text_popup);

                            }

                          }else{

                            _this.promptLogin();

                          }

                        });

                        $toolsList.mixItUp({

                          load: {

                            sort:   DevTools.Sort,
                            filter: DevTools.Filter

                          },

                          selectors: {

                            target: '.mix',
                            filter: '.tool-filter',
                            sort:   '.tool-sort'

                          }

                        });

                        $inputSearch.typeWatch({

                          wait: 500,
                          captureLength: 3,

                          callback: function(value) {

                            DevTools.Search = value.replace(/ /g, ", .");

                            if(DevTools.Search && DevTools.Seach != '') {

                              $toolsList.mixItUp('filter', '.' + DevTools.Search);

                              $contentHeader.find('#category').text('Search');
                              $contentHeader.find('#tag').text('#' + DevTools.Search);

                            }else{

                              $toolsList.mixItUp('filter', DevTools.Filter);

                            }

                          },

                        });

                        if(DevTools.Authenticated) {

                          _this.showUserLikesAndFavorites();

                        }

                      });

                    });

                    // ===============================================
                    // check if the user is authenticated at page load
                    // ===============================================

                    DevTools.Firebase.onAuth(function twitterAuth(authData) {

                        DevTools.Authenticated = authData ? true : false;

                        if(DevTools.Authenticated) {

                          _this.authenticated(true, authData);

                        }else{

                          _this.authenticated(false);

                        }

                    });

                  }

                  if(event.type === 'hashchange') {

                    event.preventDefault();

                    _this.checkURL(function() {

                      Pace.restart();

                      if(DevTools.Category) { _this.updateCategory(); }
                      if(DevTools.Tag)      { _this.updateTag(); }

                      _this.scrollToTop(function() {

                        $toolsList.mixItUp('filter', DevTools.Filter);

                      });

                    });

                  }

                });

                return this;

            };


            // ==========================
            // write all data to the page
            // ==========================

            return this.buildPage();


        }


        // create a new handler object
        return new _handler();


    }());

// assign DevTools to the global namespace
}(window.DevTools = window.DevTools || {}, jQuery));
