var myDiv = document.querySelector('div');
var requestURL = "../gallery.json";
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
	var imgList = request.response;
	populatePage(imgList);
}

function populatePage(imgList) {
	for(var i = 0; i < imgList.length; i++) {
		var imgDiv = document.createElement('div');
		var myImg = document.createElement('img');
		var myLink = document.createElement('a');
		var nameDiv = document.createElement('div');
		var imgName = document.createElement('p');
		var editImg = document.createElement('img');
		var closeImg = document.createElement('img');

		editImg.className = "edit button";
		editImg.src = "images/edit_button.svg";

		closeImg.className = "close button";
		closeImg.src = "images/close_button.png";

		imgName.innerHTML = imgList[i].name;
		imgName.className = "imgName";

		myImg.src = imgList[i].src;
		myLink.href = imgList[i].src;

		imgDiv.style.display = "inline-block";
		imgDiv.className = "imgDiv";

		myImg.className = "gallery";
		myImg.height = "300";
		myImg.width = "400";

		myLink.target = "_blank";
		myLink.className = "gallery";

		nameDiv.appendChild(imgName);
		imgDiv.appendChild(nameDiv);
		imgDiv.appendChild(myImg);
		imgDiv.appendChild(editImg);
		imgDiv.appendChild(closeImg);
		myLink.appendChild(imgDiv);
		myDiv.appendChild(myLink);
	}
}
