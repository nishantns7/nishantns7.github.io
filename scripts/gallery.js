var myDiv = document.querySelector('div');
var requestURL = "../gallery.json";
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
	var srcList = request.response;
	populatePage(srcList);
}
function populatePage(jsonObj) {
	var srcList = jsonObj["src"];
	for (var i = 0; i < srcList.length; i++) {
		var myImg = document.createElement('img');
		var myLink = document.createElement('a');
		myImg.src = srcList[i];
		myLink.href = srcList[i];
		myImg.height = "300";
		myImg.width = "400";
		myLink.target = "_blank";
		myLink.className = "gallery";
		myLink.appendChild(myImg);
		myDiv.appendChild(myLink);
	}
}