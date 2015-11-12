// Author: Debasis Panda
// Twitter: @imdebasispanda
// Facebook: /imdebasispanda
// Github: /debasispanda
// Blog: imdebasispanda.blogspot.com

/*!
 * jQuery Auto Collapsible Menu plugin
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
    pluginVersion = '1.0.0'
    defaults = {
    	propertyName: "value"
    };

    // The actual plugin constructor
    function Plugin(element, options) {
    	this.element = element;
        this.version = pluginVersion;
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
    	var $this = this;
    	console.log('collapsemenu initiated');
        // Place initialization logic here
        // You already have access to the DOM element and
        // the options via the instance, e.g. this.element 
        // and this.options
        
        var MenuWidth = {
            visibleMenuWidth : 0,
            totalMenuWidth : 0,
            addibleItemWidth: 0,
        };

        $($this.element).find('.nav-item').each(function(){
            $(this).attr('data-width', $(this).outerWidth());
            MenuWidth.visibleMenuWidth += $(this).data('width');
            if($('#collapsed-dropdown li:first-child').length){
                MenuWidth.addibleItemWidth = $('#collapsed-dropdown li:first-child').data('width');
            }
            else{
                MenuWidth.addibleItemWidth = 0;
            }
        });
        this.methods = {
        	calcMenu: function(){
                MenuWidth.visibleMenuWidth = 0;
        		MenuWidth.addibleItemWidth = 0;
        		MenuWidth.totalMenuWidth = $('.navigation-container').width();
        		$($this.element).find('.nav-item').each(function(){
        			MenuWidth.visibleMenuWidth += $(this).data('width');
                    if($('#collapsed-dropdown li:first-child').length){
                        MenuWidth.addibleItemWidth = $('#collapsed-dropdown li:first-child').data('width');
                    }
                    else{
                        MenuWidth.addibleItemWidth = 0;
                    }
        		});
        		console.log('calcMenu');
                MenuWidth.visibleMenuWidth += 20;
        		return MenuWidth;
        	},
        	collapse: function(){
        		
                var interval = setInterval(function(){
                    $this.methods.calcMenu();

                    if(MenuWidth.visibleMenuWidth >= MenuWidth.totalMenuWidth){
                        $($this.element).find('.nav-item:last-child').prependTo('#collapsed-dropdown');                        
                    }
                    else if(MenuWidth.totalMenuWidth > (parseInt(MenuWidth.visibleMenuWidth) + parseInt(MenuWidth.addibleItemWidth))){
                        if($('#collapsed-dropdown li:first-child').length){
                            $('#collapsed-dropdown li:first-child').appendTo($this.element);
                        }
                        else{
                            clearInterval(interval);
                        }                        
                    }
                    else{
                        clearInterval(interval);
                    }
                    if($('#collapsed-dropdown li').length){
                        $('.btn-collpased-menu').show();
                    }
                    else{
                        $('.btn-collpased-menu').hide();
                    }

                },50);
                
        		console.log(MenuWidth.visibleMenuWidth , MenuWidth.totalMenuWidth);

        	},

        }
        $(window).resize(function () {
            clearTimeout($.data(this, 'resizeTimer'));
            $.data(this, 'resizeTimer', setTimeout(function () {
                $this.methods.collapse();
            }, 400));
        });
        $this.methods.collapse();
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