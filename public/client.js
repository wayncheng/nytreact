$('.feed-item').on('click','.save-btn', function(e){
	e.preventDefault();
	var $item = $(this).parents('feed-item');
	var title = $item.find('.title').text().trim();
	console.log('title',title);
})