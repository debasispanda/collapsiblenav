// Author: Debasis Panda

/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */


// the semi-colon before the function invocation is a safety 
// net against concatenated scripts and/or other plugins 
// that are not closed properly.
; (function ($, window, document, undefined) {

    // undefined is used here as the undefined global 
    // variable in ECMAScript 3 and is mutable (i.e. it can 
    // be changed by someone else). undefined isn't really 
    // being passed in so we can ensure that its value is 
    // truly undefined. In ES5, undefined can no longer be 
    // modified.

    // window and document are passed through as local 
    // variables rather than as globals, because this (slightly) 
    // quickens the resolution process and can be more 
    // efficiently minified (especially when both are 
    // regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'collapsemenu',
    defaults = {
    	propertyName: "value"
    };

    // The actual plugin constructor
    function Plugin(element, options) {
    	this.element = element;

        // jQuery has an extend method that merges the 
        // contents of two or more objects, storing the 
        // result in the first object. The first object 
        // is generally empty because we don't want to alter 
        // the default options for future instances of the plugin
        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype.init = function () {
    	var self= this;
    	console.log('collapsemenu initiated');
    	console.log(this);
        // Place initialization logic here
        // You already have access to the DOM element and
        // the options via the instance, e.g. this.element 
        // and this.options

        this.methods = {
        	calcMenu: function(){
        		var MenuWidth = {
        			visibleMenuWidth : 0,
        			totalMenuWidth : 0,
        			addibleItemWidth: 0,
        		};
        		MenuWidth.totalMenuWidth = $('.navigation-container').width();
        		$(self.element).find('.nav-item').each(function(){
        			MenuWidth.visibleMenuWidth = MenuWidth.visibleMenuWidth + $(this).outerWidth();
        			// if(MenuWidth.visibleMenuWidth >= MenuWidth.totalMenuWidth){
        			// 	console.log('collapsed');
        			// 	$(this).remove();
        			// 	// $(self.element).find('.nav-item:last-child').prependTo('#collapsed-dropdown');
        			// }

        		});
        		MenuWidth.addibleItemWidth = $('#collapsed-dropdown li:first-child').outerWidth();
        		return MenuWidth;
        	},
        	collapse: function(){
        		var MenuWidth = this.calcMenu();
        		if(MenuWidth.visibleMenuWidth >= MenuWidth.totalMenuWidth){
        			console.log('collapsed');
        			$(self.element).find('.nav-item:last-child').prependTo('#collapsed-dropdown');
        		}
        		else if(MenuWidth.totalMenuWidth > (parseInt(MenuWidth.visibleMenuWidth) + parseInt(MenuWidth.addibleItemWidth))){
        			$('#collapsed-dropdown li:first-child').appendTo(self.element);
        		}
        		console.log(MenuWidth.visibleMenuWidth , MenuWidth.totalMenuWidth);

        	},

        }

        this.methods.collapse();
        $(window).on('resize',function(){
        	self.methods.collapse();
        });
    };

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
    	return this.each(function () {
    		if (!$.data(this, 'plugin_' + pluginName)) {
    			$.data(this, 'plugin_' + pluginName,
    				new Plugin(this, options));
    		}
    	});
    }

})(jQuery, window, document);