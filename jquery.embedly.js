﻿/*
 * Embedly JQuery
 * ==============
 * This library allows you to easily embed objects on any page.
 * 
 * Usage:
 * ------
 * There are two ways to interact with this lib. One exposes a simple method to call embedly directly
 *
 * >>> $.embedly('http://www.youtube.com/watch?v=LfamTmY5REw', {}, function(oembed){ alert(oembed.title);});
 * 
 * The oembed is either a json object or null
 * 
 * You can also reference it this way, which will try and replace every link on the page with an embed
 * 
 * $('a').embedly();
 * 
 * The Options Are as Follows
 * 
 * {maxWidth : null,
 *  maxHeight: null,
 *  urlRe : null,
 *  method : 'replace',
 *  wrapElement : 'div', 
 *  className : 'embed',
 *  addImageStyles : true} //after
 * 
 * http://api.embed.ly/tools/generator - generate your own regex for only sources you want
 * 
 */
(function($) {
	$.embedly = function(url, options, callback){
		
		options = $.extend(true, $.fn.embedly.defaults, options);

		if (url != null && urlValid(url, options))
			embed(url, options, callback);
    	else
    		callback(null)

	}
    $.fn.embedly = function(options, callback) {

    	options = $.extend(true, $.fn.embedly.defaults, options);

    	callback = (callback != null) ? callback : defaultCallback
    	
        return this.each(function() {
        	// Handles A tags 
        	if ($(this).attr('href')){
        		//Get the URL
        		var elem = $(this);
        		var url = elem.attr('href');
        		//Make a Callback wrapper
        		function wrap(oembed){
        			callback(oembed, elem, options);
        		}
        		// Make sure the URL pass the regex.
        		if (url != null && urlValid(url, options)){
        			embed(url, options, wrap);
        		//Nope so pass a null to the callback
        		} else {
        			wrap(null)
        		}
        	} else {
        		// If it's not an a tag find all the urls in the elem
        		$(this).find('A').each(function(index, elem){
	        		elem = $(elem);
	        		var url = elem.attr('href');
	        		//Make a Callback wrapper
	        		function wrap(oembed){
	        			callback(oembed, elem, options);
	        		}
	        		// Make sure the URL pass the regex.
	        		if (url != null && urlValid(url, options)){
	        			embed(url, options, wrap);
	        		//Nope so pass a null to the callback
	        		} else {
	        			wrap(null)
	        		}
	        	});
        	}
        });
    };

    $.fn.embedly.defaults = {
        maxWidth: null,
        maxHeight: null,
		method: "replace", // 'after'
		addImageStyles : true,
		wrapElement : 'div',
		className : 'embed',
		urlRe : null
		};

    function defaultCallback(oembed, elem, options){
 			if (oembed == null)
 				return;
 
 			switch(options.method)
 			{
 				case "replace":	
 					elem.replaceWith(oembed.code);
 					break;
 				case "after":
 					elem.after(oembed.code);			
 					break;
 				case "afterParent":
 					elem.parent().after(oembed.code);			
 					break;
 			}
    };

    function isEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
        return true;
    };
    
    function urlValid(url, options) {
		var urlRe = /http:\/\/(.*youtube\.com\/watch.*|.*\.youtube\.com\/v\/.*|youtu\.be\/.*|www\.veoh\.com\/.*\/watch\/.*|.*justin\.tv\/.*|www\.ustream\.tv\/recorded\/.*|www\.ustream\.tv\/channel\/.*|qik\.com\/video\/.*|qik\.com\/.*|.*revision3\.com\/.*|.*\.dailymotion\.com\/video\/.*|.*\.dailymotion\.com\/.*\/video\/.*|www\.collegehumor\.com\/video:.*|www\.twitvid\.com\/.*|www\.break\.com\/.*\/.*|vids\.myspace\.com\/index\.cfm\?fuseaction=vids\.individual&videoid.*|www\.myspace\.com\/index\.cfm\?fuseaction=.*&videoid.*|www\.metacafe\.com\/watch\/.*|blip\.tv\/file\/.*|.*\.blip\.tv\/file\/.*|video\.google\.com\/videoplay\?.*|.*revver\.com\/video\/.*|video\.yahoo\.com\/watch\/.*\/.*|video\.yahoo\.com\/network\/.*|.*viddler\.com\/explore\/.*\/videos\/.*|liveleak\.com\/view\?.*|www\.liveleak\.com\/view\?.*|animoto\.com\/play\/.*|dotsub\.com\/view\/.*|.*yfrog\..*\/.*|tweetphoto\.com\/.*|www\.flickr\.com\/photos\/.*|.*twitpic\.com\/.*|.*imgur\.com\/.*|.*\.posterous\.com\/.*|post\.ly\/.*|twitgoo\.com\/.*|i.*\.photobucket\.com\/albums\/.*|gi.*\.photobucket\.com\/groups\/.*|phodroid\.com\/.*\/.*\/.*|xkcd\.com\/.*|www\.asofterworld\.com\/index\.php\?id=.*|www\.qwantz\.com\/index\.php\?comic=.*|23hq\.com\/.*\/photo\/.*|www\.23hq\.com\/.*\/photo\/.*|www\.whitehouse\.gov\/photos-and-video\/video\/.*|www\.whitehouse\.gov\/video\/.*|wh\.gov\/photos-and-video\/video\/.*|wh\.gov\/video\/.*|www\.hulu\.com\/watch.*|movieclips\.com\/watch\/.*\/.*\/|movieclips\.com\/watch\/.*\/.*\/.*\/.*|.*crackle\.com\/c\/.*|www\.fancast\.com\/.*\/videos|www\.funnyordie\.com\/videos\/.*|www\.vimeo\.com\/groups\/.*\/videos\/.*|www\.vimeo\.com\/.*|vimeo\.com\/groups\/.*\/videos\/.*|vimeo\.com\/.*|www\.ted\.com\/talks\/.*\.html.*|www\.ted\.com\/talks\/lang\/.*\/.*\.html.*|www\.ted\.com\/index\.php\/talks\/.*\.html.*|www\.ted\.com\/index\.php\/talks\/lang\/.*\/.*\.html.*|.*omnisio\.com\/.*|.*nfb\.ca\/film\/.*|www\.thedailyshow\.com\/watch\/.*|www\.thedailyshow\.com\/full-episodes\/.*|www\.thedailyshow\.com\/collection\/.*\/.*\/.*|movies\.yahoo\.com\/movie\/.*\/video\/.*|movies\.yahoo\.com\/movie\/.*\/info|movies\.yahoo\.com\/movie\/.*\/trailer|www\.colbertnation\.com\/the-colbert-report-collections\/.*|www\.colbertnation\.com\/full-episodes\/.*|www\.colbertnation\.com\/the-colbert-report-videos\/.*|www\.comedycentral\.com\/videos\/index\.jhtml\?.*|www\.theonion\.com\/video\/.*|theonion\.com\/video\/.*|wordpress\.tv\/.*\/.*\/.*\/.*\/|www\.traileraddict\.com\/trailer\/.*|www\.traileraddict\.com\/clip\/.*|www\.traileraddict\.com\/poster\/.*|www\.escapistmagazine\.com\/videos\/.*|soundcloud\.com\/.*|soundcloud\.com\/.*\/.*|soundcloud\.com\/.*\/sets\/.*|soundcloud\.com\/groups\/.*|www\.lala\.com\/#album\/.*|www\.lala\.com\/album\/.*|www\.lala\.com\/#song\/.*|www\.lala\.com\/song\/.*|.*amazon\..*\/gp\/product\/.*|.*amazon\..*\/.*\/dp\/.*|.*amazon\..*\/dp\/.*|.*amazon\..*\/o\/ASIN\/.*|.*amazon\..*\/gp\/offer-listing\/.*|.*amazon\..*\/.*\/ASIN\/.*|.*amazon\..*\/gp\/product\/images\/.*|www\.slideshare\.net\/.*\/.*|.*\.scribd\.com\/doc\/.*|screenr\.com\/.*|www\.5min\.com\/Video\/.*|www\.howcast\.com\/videos\/.*|www\.screencast\.com\/.*\/media\/.*|screencast\.com\/.*\/media\/.*|www\.screencast\.com\/t\/.*|screencast\.com\/t\/.*|www\.clearspring\.com\/widgets\/.*|my\.opera\.com\/.*\/albums\/show\.dml\?id=.*|my\.opera\.com\/.*\/albums\/showpic\.dml\?album=.*&picture=.*)/i
		return (url.match(urlRe) != null && (options.urlRe == null || url.match(options.urlRe) != null))
    }
    
    function embed(url, options, callback){

    	//Build The URL
    	var fetchUrl = 'http://api.embed.ly/v1/api/oembed?';

    	fetchUrl += "format=json&url=" + escape(url);

    	//Deal with maxwidth and max height
		if (options.maxWidth != null)
			fetchUrl += "&maxwidth=" + options.maxWidth;	

		if (options.maxHeight != null)
			fetchUrl += "&maxheight=" + options.maxHeight;
 
		fetchUrl += "&callback=?";

		//Make the call to Embedly
    	$.ajax( {url: fetchUrl,
			  	dataType: 'json',
			  	success: function(data) {
    				//Make sure the response isn't empty
    				if (isEmpty(data) || data.hasOwnProperty('error')){
    					callback(null);
    				}
  
    				//Wrap The Element
    				var code = '';
    				if (options.wrapElement !=null)
    					code += '<'+options.wrapElement+' class="'+options.className+'">';

	                switch (data.type) {
	                    case "photo":
	                    	var title = data.title ? data.title : '';
	                    
	        				//Because of photos like twitpic and tweetphoto we need to let the browser do some of the work
	                    	var style = '';
	        				if (options.addImageStyles) {
	                        	if (options.maxWidth != null)
	                        		style += 'max-width:'+options.maxWidth+'px; ';
	                        	if (options.maxHeight != null)
	    	                    	style += 'max-height:'+options.maxHeight+'px; ';
	        				}
	                    	code += '<a href="' + url + '" target="_blank"><img style="'+style+'" src="' + data.url + '" alt="' + title + '"/></a>';
	                        break;
	                    case "video":
	                    	code += data.html;
	                        break;
	                    case "rich":
	                    	code += data.html;
	                        break;
	                    default :
	                    	code += '<a href="' + url + '">' + (data.title != null) ? data.title : url + '</a>';
	                    	break;
	                }
    				
    				if (options.wrapElement !=null)
    					code += '</'+options.wrapElement+'>';
 
    				data.code = code;
 
    				callback(data);
    			},
    			error : function(){
    				callback(null);
    			}
    	});
    };
})(jQuery);