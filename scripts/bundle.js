var markdown = require('markdown').markdown,
	base64 = require('js-base64').Base64,
	editor = document.querySelector('#editor'),
	preview = document.querySelector('#preview'),
	divider = document.querySelector('#divider'),
	title = document.querySelector('title');

function showInPreview(content) {
	window.history.replaceState({}, null, '#/' + base64.encode(content));

	preview.innerHTML = markdown.toHTML(content);
	title.innerHTML = content.split('\n')[0];
}

function refresh() {
	showInPreview(editor.value);
}

divider.addEventListener('mousedown', function(e) {
	var movingDivider = function(ex) {
		var x = e.clientX,
			widthEditor;

		widthEditor = parseFloat(ex.clientX / window.innerWidth * 100).toFixed(8);

		if(widthEditor < 20) widthEditor = 20;
		else if(widthEditor > 80) widthEditor = 80;

		editor.style.width = "calc("+ widthEditor + "% - 3px)";
		preview.style.width = "calc("+ (100 - widthEditor) + "% - 3px)";

		event.preventDefault();  
	};

	window.addEventListener('mousemove', movingDivider);

	window.addEventListener('mouseup', function(e) {
		window.removeEventListener('mousemove', movingDivider);
	});
});

editor.addEventListener('keyup', function(e) {
	refresh();
});

window.onload = function() {
	var data = window.location.hash;

	if(!data) return;

	data = data.slice(2, data.length);
	editor.value = base64.decode(data);

	refresh();
};

