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
		var editImg = document.createElement('img');
		var closeImg = document.createElement('img');
		var myLink = document.createElement('a');

		editImg.className = "edit";
		editImg.src = "images/edit_button.svg";

		closeImg.className = "close";
		closeImg.src = "images/close_button.png";

		myImg.src = srcList[i];
		myLink.href = srcList[i];

		myImg.className = "gallery";
		myImg.height = "300";
		myImg.width = "400";

		myLink.target = "_blank";
		myLink.className = "gallery";

		myImg.appendChild(closeImg);
		myImg.appendChild(editImg);
		myLink.appendChild(myImg);
		myDiv.appendChild(myLink);

		myImg.onmouseover = function() {
			editImg.style.display = "block";
			closeImg.style.display = "block";
		}
	/*	myImg.onmouseout = function() {
			editImg.style.display = "none";
			closeImg.style.display = "none";
		}
		*/
	}
}