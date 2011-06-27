(function($){
	//plugin boilerplate:
		//http://stefangabos.ro/jquery/jquery-plugin-boilerplate-revisited/?utm_source=javascriptweekly&utm_medium=email

	$.slideshow = function(element, options) {
		// plugin's default options
		// this is private property and is  accessible only from inside the plugin
		var defaults = {
				autoPlay: true,
				hoverArrows: true,
				continuous: false,
				sliding: null,
				navElem: null
			},
			
			//Convenience
			plugin = this,
			$element = $(element), 
			element = element,
			$els = $element.find(".slide");
			
			//Private functions
		
		plugin.settings = {};


		// the "constructor" method that gets called when the object is created
		plugin.init = function() {

			// the plugin's final properties are the merged default and user-provided options (if any)
			plugin.settings = $.extend({}, defaults, options);

			// code goes here
			if (plugin.settings.hoverArrows) {
				(function () {
					var ps = $("<div id='prev-slide' class='slide-arrow' style='display:none'>&lt;</div>"),
						ns = $("<div id='next-slide' class='slide-arrow' style='display:none'>&gt;</div>");
					$element.append(ps).append(ns);
					
					
					
					ps.bind("click", function () {
						var li = $(".s", $element),
							ind = li.index();
							
						if (!li.prev().prev().length) {
							$("#prev-slide").hide();
						}
						if ($element.length <= ind + 2) {
							$("#next-slide").show();
						}

						if (ind > 0) {
							li.removeClass("s");
							goTo(ind);
						}
						

					});
					ns.bind({
						click: function () {
							var li = $(".s", $element),
								ind = li.index();
							

							if ($els.length <= ind + 2) {
								$("#next-slide").fadeOut(100);
							}
							if (li.prev().prev()) {
								$("#prev-slide").fadeIn(100);
							}
						
							if (ind < $els.length) {
								li.removeClass("s");
								goTo(ind + 2);
							}
						}
					});
					
					$element.bind({
						mouseenter: function () {
							var current = $(".s", $element).index(),
								toShow = (current > 0 && current + 1 < $els.length) ? "#prev-slide, #next-slide" : 
									(current + 1 < $els.length) ? "#next-slide" :
									(current + 1 == $els.length) ? "#prev-slide" : "";
							$(toShow).fadeIn(500);
						},
						
						mouseleave: function () {
							$(".slide-arrow").fadeOut(500);
						}
					});
				}());
			}
		};



		var goTo = function (ind) {
			var e = $element.find("li:nth-child(" + ind + ")"),
				mL = e.outerWidth() * (ind-1);
			
			e.addClass("s");
			
			$element.animate({
				marginLeft: -mL + "px"
			}, 300, "swing");
			
		};


		// fire up the plugin!
		// call the "constructor" method
		plugin.init(plugin.settings);

	}

	// add the plugin to the jQuery.fn object
	$.fn.slideshow = function(options) {

		// iterate through the DOM elements we are attaching the plugin to
		return this.each(function() {

			// if plugin has not already been attached to the element
			if (undefined == $(this).data('slideshow')) {

				// create a new instance of the plugin
				// pass the DOM element and the user-provided options as arguments
				var plugin = new $.slideshow(this, options);

				// in the jQuery version of the element
				// store a reference to the plugin object
				// you can later access the plugin and its methods and properties like
				// element.data('pluginName').publicMethod(arg1, arg2, ... argn) or
				// element.data('pluginName').settings.propertyName
				$(this).data('slideshow', plugin);

			}

		});

	}
	
})(window.jQuery);