==================================================================
Embedly - JQuery - An OEmbed Library to Replace Links with Content
==================================================================

Embedly - JQuery is a JQuery Library for Embedly that will replace links with
content. It follows the oEmbed spec (http://oembed.com) for content retrieval,
while utilizing http://api.embed.ly as a single endpoint.

Documentation
=============

The most up-to-date documentation can be found on the `README
<http://github.com/embedly/embedly-jquery/blob/master/README.rst>`_


Requirements
============

Requires JQuery 1.3.1 or greater::

	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>


Using Embedly-JQuery
====================

There are two ways to interact with this library. You can call Embedly directly
or use CSS Selectors to replace links

Call Directly
-------------
Will Return a JSON object representing an oembed or null, and a dictionary object representing the original url and DOM node.
::
	
	#Alert the tile of a video
	$.embedly('http://www.youtube.com/watch?v=LfamTmY5REw', {}, function(oembed, dict){ 
	    alert(oembed.title);
	});
	
	# Call with maxWidth option set to 600px and maxHeight option set to 400px
	$.embedly('http://www.youtube.com/watch?v=LfamTmY5REw', 
	          {maxWidth:600, maxHeight:400}, 
	          function(oembed, dict){ 
	             alert(oembed.title);
	          });

    # Pass in an array of urls to load simultaneously
    $.embedly(['http://www.youtube.com/watch?v=LfamTmY5REw', 'http://www.youtube.com/watch?v=lOC_JjNFkVw', 'http://www.youtube.com/watch?v=cTl3U6aSd2w'], 
              {maxWidth:600}, 
              function(oembed, dict){
                 alert(oembed.title);
              });
    
CSS Selector
------------
Use a CSS selector to replace every valid link with an embed on the page.
::
    
    # Replace all valid links
	$('a').embedly();
	
	# Replace a subset of links
	$('a.oembed').embedly();
	
	# Replace with maxWidth option set to 600px and method option set to 'after'
	$('a').embedly({maxWidth:600,'method':'after'});
	
	# Replace only Hulu links
	$('a').embedly({maxWidth:600,'urlRe': /http:\/\/(www\.hulu\.com\/watch.*)/i,'method':'after'});


Valid Options
-------------

maxWidth [`Number:null`]
  A number representing the "max width" in pixels a piece of content can be displayed in your page.
 
maxHeight [`Number:null`]
  A number representing the "max height" in pixels a piece of content can be displayed in your page.
 
urlRe [`RegEx:`]
  A regular expression representing what links to show content for.  
  Use : http://api.embed.ly/tools/generator to generate regular expressions for a specific set of sources.

method [`String:'replace'`]
  A string value either "replace" or "after" to tell Embedly how to place the content in your page.

  * `replace` - replaces the link with the content.
  * `after` - inserts the content after the link.
  * `afterParent` - inserts the content after the parent element.

wrapElement [`String:'div'`]
  A string value representing the valid html element to wrap the content in.

className [`String:'embed'`]
  A string value representing a CSS class you would like to assign to the wrapElement.

addImageStyles [`Boolean:true`]
  A boolean value representing whether or not Embedly should use the style element to resize images based on the maxWidth and maxHeight parameters
   
embedly_wmode [`Default:''`]
  A string value either `window`, `opaque` or `transparent` representing the flash WMODE parameter which allows layering of Flash content with DHTML layers.

  * `window` - movie plays in its own rectangular window on a web page.
  * `opaque` - the movie hides everything on the page behind it.
  * `transparent` - the background of the HTML page shows through all transparent portions of the movie, this may slow animation performance.
                       

Examples
-----------------------------------------
Examples can be found at - http://github.com/embedly/embedly-jquery/tree/master/examples/

Licensing
---------
BSD License can be found at - http://github.com/embedly/embedly-jquery/tree/master/LICENSE/

Embedly URLs
------------

   * Git location:       http://github.com/embedly/embedly-jquery/
   * Home Page:          http://embed.ly
   * API Page:           http://api.embed.ly
   * Support:            http://support.embed.ly

