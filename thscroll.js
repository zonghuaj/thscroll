$.fn.THScroll = function(){
    if (!$(this).length)
	return false;
    var tableScroll = new Array();
    $(this).each(function(tableIndex, obj){
	var thead;
	var table = $(this);
	if (table.children('thead').length)
	    thead = table.children('thead');
	else
	    thead = table.find('tr').first();
	
	table.before('<table class="thscroll"></table>');
	tableScroll[tableIndex] = table.prev();
	
	var thscroll = tableScroll[tableIndex];
	thscroll.html(thead.html());
	
	var trIndex = 0;
	var thIndex = 0;
	table.width(table.width());
	thscroll.width(table.width());
	if (thscroll.find('tr').length)
	{
	    thscroll.find('tr').each(function(){
		trIndex = arguments[0] + 1;
		$(this).find('th, td').each(function(){
		    thIndex = arguments[0] + 1;
		    $(this).width(thead.children(':nth-child('+trIndex+')').children(':nth-child('+thIndex+')').width());
		    $(this).height(thead.children(':nth-child('+trIndex+')').children(':nth-child('+thIndex+')').height());
		});
	    });
	}
	else
	{
	    thscroll.children().each(function(){
		thIndex = arguments[0] + 1;
		$(this).width(thead.children(':nth-child('+thIndex+')').width());
		$(this).height(thead.children(':nth-child('+thIndex+')').height());
	    });
	}
	thead.css('visibility', 'collapse');
	
	var tableOffset = thscroll.offset().top;
	var maxTop = table.position().top + table.height() - thscroll.height();
	
	$(window).scroll(function(){
	    var offset = $(this).scrollTop();

	    thscroll.css('top', 0);
	    thscroll.css('left', 0);

	    if (offset >= maxTop)
	    {
		thead.css('visibility', 'collapse');
		thscroll.css('position', 'relative');
		thscroll.css('top', table.height());
	    }
	    else if (offset >= tableOffset) {
		thscroll.css('left', table.position().left - $(window).scrollLeft());
		thscroll.css('position', 'fixed');
		thead.css('visibility', 'inherit');
	    }
	    else if (offset < tableOffset) {
		thscroll.css('position', 'relative');
		thead.css('visibility', 'collapse');
	    }
	});
    });
    if (tableScroll.length == 1)
	return tableScroll[0];
    else if (tableScroll.length == 0)
	return null;
    else
	return tableScroll;
}