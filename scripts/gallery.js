var imgList;
var valid = [false, false, false, false];
var imgToEdit;

var myDiv = document.getElementById('mainDiv');

var requestURL = "../gallery.json";
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
	imgList = request.response;
	populatePage(imgList);
}


function populatePage(imgList) {

	for(var i = 0; i < imgList.length; i++) {
		var imgDiv = document.createElement('div');
		var myImg = document.createElement('img');
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

		nameDiv.className = "nameDiv";

		imgDiv.style.display = "inline-block";
		imgDiv.className = "imgDiv";

		myImg.src = imgList[i].src;
		myImg.className = "gallery";
		myImg.id = imgList[i].name;
		myImg.height = "300";
		myImg.width = "400";

		nameDiv.appendChild(imgName);
		imgDiv.appendChild(nameDiv);
		imgDiv.appendChild(myImg);
		imgDiv.appendChild(editImg);
		imgDiv.appendChild(closeImg);
		myDiv.appendChild(imgDiv);
	}

	var imgModal = document.createElement('div');
	var imgModalClose = document.createElement('span');
	var fullImg = document.createElement('img');
	var caption = document.createElement('div');

	imgModal.className = "modal";
	imgModalClose.className = "modalClose";
	fullImg.className = "fullImg";
	caption.className = "caption";

	imgModalClose.innerHTML = "&times;";

	imgModalClose.onclick = function() { 
	    imgModal.style.display = "none";
	}

	imgModal.appendChild(imgModalClose);
	imgModal.appendChild(fullImg);
	imgModal.appendChild(caption);
	myDiv.appendChild(imgModal);

	document.onclick = function(e) {
		if (window.event) {
			e = event.srcElement;
		}
		else {
			e = e.target;
		}
		if(e instanceof HTMLImageElement && e.className == "gallery") {
			imgModalDisplay(e.src, e.id);
		} else if(e instanceof HTMLImageElement && e.className == "close button") {
			removeImage(e.previousSibling.previousSibling.id);
		} else if(e instanceof HTMLImageElement && e.className == "edit button") {
			editDiv.style.display = "block";
			imgToEdit = e.previousSibling.id;
		}
	}

	function imgModalDisplay(source, name) {
    imgModal.style.display = "block";
    fullImg.src = source;
    caption.innerHTML = name;
	}

	function removeImage(name) {
		for(var i = 0; i < imgList.length; i++) {
			if (imgList[i].name == name) {
				imgList.splice(i, 1);
			}
		}
		while(myDiv.firstChild) {
			myDiv.removeChild(myDiv.firstChild);
		}
		populatePage(imgList);
	}


	var addDiv = document.createElement('div');
	var addForm = document.createElement('form');
	var formDiv = document.createElement('div');

	var editDiv = document.createElement('div');
	var editForm = document.createElement('form');
	var editFormDiv = document.createElement('div');
	
	var labelSource = document.createElement('label');
	var inputSource = document.createElement('input');
	var invalidSource = document.createElement('p');

	var labelName = document.createElement('label');
	var inputName = document.createElement('input');
	var invalidName = document.createElement('p');

	var labelInfo = document.createElement('label');
	var inputInfo = document.createElement('input');
	var invalidInfo = document.createElement('p');

	var labelDate = document.createElement('label');
	var inputDate = document.createElement('input');
	var invalidDate = document.createElement('p');

	var addSubmit = document.createElement('input');


	addDiv.id = "addDiv";
	formDiv.id = "formDiv";

	document.getElementById('addImage').onclick = function() {
		addDiv.style.display = "block";
	}

	window.onclick = function(event) {
		if (event.target == addDiv) {
			addDiv.style.display = "none";
		} else if (event.target == editDiv) {
			editDiv.style.display = "none";
		}
	}

invalidSource.id = "invalidSource";
invalidName.id = "invalidName";
invalidInfo.id = "invalidInfo";
invalidDate.id = "invalidDate";


	labelSource.innerHTML = "Image URL";
	inputSource.type = "text";
	inputSource.id = "imgAddURL";
	inputSource.name = "Image URL";
	inputSource.placeholder = "Image URL..";
	invalidSource.innerHTML = "<br>";
	inputSource.onchange = function() {
		validateSource(inputSource.value);
	}
	inputSource.onclick = function() {
		validateSource(inputSource.value);
	}

	labelName.innerHTML = "Image Name";
	inputName.type = "text";
	inputName.id = "imgAddName";
	inputName.name = "Image Name";
	inputName.placeholder = "Image Name..";
	invalidName.innerHTML = "<br>";
	inputName.onchange = function() {
		validateName(inputName.value);
	}
	inputName.onclick = function() {
		validateName(inputName.value);
	}

	labelInfo.innerHTML = "Image Info";
	inputInfo.type = "text";
	inputInfo.id = "imgAddInfo";
	inputInfo.name = "Image Info";
	inputInfo.placeholder = "Image Info..";
	inputInfo.onchange = function() {
		validateInfo(inputInfo.value);
	}
	inputInfo.onclick = function() {
		validateInfo(inputInfo.value);
	}
	invalidInfo.innerHTML = "<br>";

	labelDate.innerHTML = "Image Date";
	inputDate.type = "text";
	inputDate.id = "imgAddDate";
	inputDate.name = "Image Date";
	inputDate.placeholder = "MM/DD/YYYY";
	inputDate.onchange = function() {
		validateDate(inputDate.value);
	}
	inputDate.onclick = function() {
		validateDate(inputDate.value);
	}
	invalidDate.innerHTML = "<br>";

	addSubmit.type = "submit";
	addSubmit.value = "Add Image";
	addSubmit.onclick = function() {
		if (valid[0] && valid[1] && valid[2] && valid[3]) {
			addToImgList(inputSource.value, inputName.value, inputInfo.value, inputDate.value);
		} else {
			return false;
		}
		while(myDiv.firstChild) {
			myDiv.removeChild(myDiv.firstChild);
		}
		populatePage(imgList);
		valid = [false, false, false, false];
	}



	var labelEditSource = document.createElement('label');
	var inputEditSource = document.createElement('input');
	var invalidEditSource = document.createElement('p');

	var labelEditName = document.createElement('label');
	var inputEditName = document.createElement('input');
	var invalidEditName = document.createElement('p');

	var labelEditInfo = document.createElement('label');
	var inputEditInfo = document.createElement('input');
	var invalidEditInfo = document.createElement('p');

	var labelEditDate = document.createElement('label');
	var inputEditDate = document.createElement('input');
	var invalidEditDate = document.createElement('p');

	var editSubmit = document.createElement('input');

	editDiv.id = "editDiv";
	editFormDiv.id = "editFormDiv";

	invalidEditSource.id = "invalidEditSource";
	invalidEditName.id = "invalidEditName";
	invalidEditInfo.id = "invalidEditInfo";
	invalidEditDate.id = "invalidEditDate";

	labelEditSource.innerHTML = "Image URL";
	inputEditSource.type = "text";
	inputEditSource.id = "imgEditURL";
	inputEditSource.name = "Image URL";
	inputEditSource.placeholder = "Image URL..";
	invalidEditSource.innerHTML = "<br>";
	inputEditSource.onchange = function() {
		validateSource(inputEditSource.value);
	}
	inputEditSource.onclick = function() {
		validateSource(inputEditSource.value);
	}

	labelEditName.innerHTML = "Image Name";
	inputEditName.type = "text";
	inputEditName.id = "imgEditName";
	inputEditName.name = "Image Name";
	inputEditName.placeholder = "Image Name..";
	invalidEditName.innerHTML = "<br>";
	inputEditName.onchange = function() {
		validateName(inputEditName.value);
	}
	inputEditName.onclick = function() {
		validateName(inputEditName.value);
	}

	labelEditInfo.innerHTML = "Image Info";
	inputEditInfo.type = "text";
	inputEditInfo.id = "imgEditInfo";
	inputEditInfo.name = "Image Info";
	inputEditInfo.placeholder = "Image Info..";
	inputEditInfo.onchange = function() {
		validateInfo(inputEditInfo.value);
	}
	inputEditInfo.onclick = function() {
		validateInfo(inputEditInfo.value);
	}
	invalidEditInfo.innerHTML = "<br>";

	labelEditDate.innerHTML = "Image Date";
	inputEditDate.type = "text";
	inputEditDate.id = "imgEditDate";
	inputEditDate.name = "Image Date";
	inputEditDate.placeholder = "MM/DD/YYYY";
	inputEditDate.onchange = function() {
		validateDate(inputEditDate.value);
	}
	inputEditDate.onclick = function() {
		validateDate(inputEditDate.value);
	}
	invalidEditDate.innerHTML = "<br>";

	editSubmit.type = "submit";
	editSubmit.value = "Edit Image";
	editSubmit.onclick = function() {
		if (valid[0] && valid[1] && valid[2] && valid[3]) {
			editImgList(imgToEdit, inputEditSource.value, inputEditName.value, inputEditInfo.value, inputEditDate.value);
			while(myDiv.firstChild) {
				myDiv.removeChild(myDiv.firstChild);
			}
			populatePage(imgList);
		} else {
			return false;
		}
		valid = [false, false, false, false];
	}


	addForm.appendChild(labelSource);
	addForm.appendChild(inputSource);
	addForm.appendChild(invalidSource);
	addForm.appendChild(labelName);
	addForm.appendChild(inputName);
	addForm.appendChild(invalidName);
	addForm.appendChild(labelInfo);
	addForm.appendChild(inputInfo);
	addForm.appendChild(invalidInfo);
	addForm.appendChild(labelDate);
	addForm.appendChild(inputDate);
	addForm.appendChild(invalidDate);
	addForm.appendChild(addSubmit);

	formDiv.appendChild(addForm);
	addDiv.appendChild(formDiv);

	editForm.appendChild(labelEditSource);
	editForm.appendChild(inputEditSource);
	editForm.appendChild(invalidEditSource);
	editForm.appendChild(labelEditName);
	editForm.appendChild(inputEditName);
	editForm.appendChild(invalidEditName);
	editForm.appendChild(labelEditInfo);
	editForm.appendChild(inputEditInfo);
	editForm.appendChild(invalidEditInfo);
	editForm.appendChild(labelEditDate);
	editForm.appendChild(inputEditDate);
	editForm.appendChild(invalidEditDate);
	editForm.appendChild(editSubmit);

	editFormDiv.appendChild(editForm);
	editDiv.appendChild(editFormDiv);

	myDiv.appendChild(addDiv);
	myDiv.appendChild(editDiv);


	function addToImgList(src, name, info, date) {
		var newImg = new Object();
		newImg.name = name;
		newImg.info = info;
		newImg.src = src;
		newImg.date = date;
		imgList.push(newImg);
	}

	function editImgList(editId, src, name, info, date) {
		for(var i = 0; i < imgList.length; i++) {
			if (imgList[i].name == editId) {
				imgList[i].src = src;
				imgList[i].name = name;
				imgList[i].info = info;
				imgList[i].date = date;
			}
		}
		while(myDiv.firstChild) {
			myDiv.removeChild(myDiv.firstChild);
		}
		populatePage(imgList);
	}

	function validateSource(source) {
		if (source === "" || !(source.match(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i))) {
			invalidSource.innerHTML = "Invalid URL";
			invalidEditSource.innerHTML = "Invalid URL";
			valid[0] = false;
		} else {
			invalidSource.innerHTML = "<br>";
			invalidEditSource.innerHTML = "<br>";
			valid[0] = true;
		}
	}

	function validateName(name) {
		if (name === "") {
			invalidName.innerHTML = "Invalid name";
			invalidEditName.innerHTML = "Invalid name";
			valid[1] = false;
		} else {
			invalidName.innerHTML = "<br>";
			invalidEditName.innerHTML = "<br>";
			valid[1] = true;
		}
	}

	function validateInfo(info) {
		if (info === "") {
			invalidInfo.innerHTML = "Invalid info";
			invalidEditInfo.innerHTML = "Invalid info";
			valid[2] = false;
		} else {
			invalidInfo.innerHTML = "<br>";
			invalidEditInfo.innerHTML = "<br>";
			valid[2] = true;
		}
	}

	function validateDate(imgDate) {
		if (imgDate.match(/^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/)) {
			var date = new Date(imgDate);
			currentDate = new Date();
			if (date.getTime() <= currentDate.getTime()) {
				invalidDate.innerHTML = "<br>";
				invalidEditDate.innerHTML = "<br>";
				valid[3] = true;
			} else {
				invalidDate.innerHTML = "Invalid date";
				invalidEditDate.innerHTML = "Invalid date";
				valid[3] = false;
			}
		} else	{
			invalidDate.innerHTML = "Invalid date";
			invalidEditDate.innerHTML = "Invalid date";
			valid[3] = false;
		}
	}
}