var $jg = jQuery.noConflict();
$jg(document).ready(function(){
$jg('a[href$="#ndslink').click(function(e) { 
	e.preventDefault();
});
   $jg(document).on('click', 'a[href$="#ndslink"]', function(){
	  var frameurl = $jg(this).text();
	  $jg('body').prepend('<iframe id="nddownload" />');
	  $jg("#nddownload").attr("src", "http://" + frameurl);
   }); 
});