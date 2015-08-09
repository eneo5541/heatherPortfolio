var menuRactive = getMenu();
function getMenu ()
{
	Ractive.load('./pages/menu.html').then(function (Menu) {
		menuRactive = new Menu({
			el: 'menu',
			data: {
				selected: 'home' 
				}
		});
		
		$.getJSON( "./assets/json/menu.json", function(data) {
			menuRactive.set('list', data);
			init();
		});
		
		return menuRactive;
	});
}

var r = Rlite();
function processHash()
 {
	var hash = location.hash || '#';
	r.run(hash.slice(1));
}
function init()
{
	r.add('', function () {
		window.location = "#page/home"
	});
	
	r.add('page/:id', openPage);
	
	window.addEventListener('hashchange', processHash); 
	processHash();
	
	$("#copyright").html("All images copyright © " + (new Date().getFullYear()));
}

var pageRactive;
function openPage(page) 
{
	var pageId = page.params.id;
	var pageType = page.params.type;
	
	menuRactive.set('selected', pageId + (pageType ? "?type=" + pageType : ""));
	Ractive.load('./pages/' + pageId + '.html').then( function (Page) {
		pageRactive = new Page({
			el: 'content',
			data: { pageType: pageType }
		});
		
		if (pageType)
		{
			$.getJSON( "./assets/json/" + pageType + ".json", function(data) {
				pageRactive.set('images', data);
			});
		}
    });
}