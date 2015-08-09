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
			console.log("Setting data");
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
}

var pageRactive;
function openPage(pageId) 
{
	menuRactive.set('selected', pageId.params.id);
	Ractive.load('./pages/' + pageId.params.id + '.html').then( function (Page) {
		pageRactive = new Page({
			el: 'content',
			data: { }
		});
    });
}


