var menuList;
var main = document.getElementById('main')
var menuItemDiv = document.getElementById('menuItemDiv');

var thisTable;

var table1 = [];
var table2 = [];
var table3 = [];

var requestURL = "../menu.json";
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
	menuList = request.response;
	populatePage(menuList);
}


function populatePage(menuList) {

	for (var i = 0; i < menuList.length; i++) {
		var menuEntry = document.createElement('div');
		var item = document.createElement('p');
		var price = document.createElement('p');

		menuEntry.className = "menuEntry";
		menuEntry.id = menuList[i].name;
		menuEntry.draggable = true;
		menuEntry.style.display = "block";

		item.className = "menuItem";
		item.innerHTML = menuList[i].name;

		price.className = "menuPrice";
		price.innerHTML = menuList[i].price;

		menuEntry.appendChild(item);
		menuEntry.appendChild(price);
		menuItemDiv.appendChild(menuEntry);

		table1.push(0);
		table2.push(0);
		table3.push(0);
	}
}

/*for (var i = 0; i < menuList.length; i++) {
	table1.push(0);
	table2.push(0);
	table3.push(0);
}*/

document.addEventListener("dragstart", function(event) {
	event.dataTransfer.setData("Text", event.target.id);
});

document.addEventListener("dragover", function(event) {
	event.preventDefault();
});

document.addEventListener("drop", function(event) {
	event.preventDefault();
	updateTable(event);
});



function updateTable(event) {
	if (event.target.className == "table" || event.target.parentNode.className == "table") {
		var itemId = event.dataTransfer.getData("Text");
		for (var i = 0; i < menuList.length; i++) {
			if (menuList[i].name == itemId) {
				
				if (event.target.id == "table1" || event.target.parentNode.id == "table1") {
					table1[i]++;
					

				} else if (event.target.id == "table2" || event.target.parentNode.id == "table2") {
					table2[i]++;
					

				} else if (event.target.id == "table3" || event.target.parentNode.id == "table3") {
					table3[i]++;
					
				}	
			}
		}
	}

	var eventId = event.target.id;
	if (event.target.className != "table") {
		eventId = event.target.parentNode.id;
	}

	updateTableValues(eventId);
}



function updateTableValues(eventId) {

var totalPrice = 0;
var totalNumber = 0;

	if (eventId == "table1") {
		for (var i = 0; i < table1.length; i++) {
			totalPrice += table1[i] * menuList[i].price;
			totalNumber += table1[i];
		}
	} else if (eventId == "table2") {
		for (var i = 0; i < table2.length; i++) {
			totalPrice += table2[i] * menuList[i].price;
			totalNumber += table2[i];
		}
	} else if (eventId == "table3") {
		for (var i = 0; i < table3.length; i++) {
			totalPrice += table3[i] * menuList[i].price;
			totalNumber += table3[i];
		}
	}

	var totalPriceSpan = document.getElementById(eventId).getElementsByTagName('p')[0].getElementsByTagName('span')[0];
	totalPriceSpan.innerHTML = totalPrice;
	var totalNumberSpan = document.getElementById(eventId).getElementsByTagName('p')[0].getElementsByTagName('span')[1];
	totalNumberSpan.innerHTML = totalNumber;
}



var tableSearch = document.getElementById('tableSearch');

tableSearch.onkeyup = function() {
	document.getElementById('table1').style.display = "block";
	document.getElementById('table2').style.display = "block";
	document.getElementById('table3').style.display = "block";
	if (tableSearch.value.match(/.*1.*/)) {
		document.getElementById('table2').style.display = "none";
		document.getElementById('table3').style.display = "none";
	} else if (tableSearch.value.match(/.*2.*/)) {
		document.getElementById('table1').style.display = "none";
		document.getElementById('table3').style.display = "none";
	} else if (tableSearch.value.match(/.*3.*/)) {
		document.getElementById('table1').style.display = "none";
		document.getElementById('table2').style.display = "none";
	}
};

var menuSearch = document.getElementById('menuSearch');

var matchList = [];

menuSearch.onkeyup = function () {
	
	matchList = [];
	populatePage(menuList);

	while(menuItemDiv.firstChild) {
		menuItemDiv.removeChild(menuItemDiv.firstChild);
	}

	var re = new RegExp(menuSearch.value, "i");

	if (menuSearch.value === "") {
		populatePage(menuList);
	}
	else if (menuSearch.value.match(/entree/i)) {
		for (var i = 0; i < menuList.length; i++) {
			if (menuList[i].type == "entree") {
				matchList.push(menuList[i]);
			}
		}
		populatePage(matchList);
	}
	else if (menuSearch.value.match(/main course/i)) {
		for (var i = 0; i < menuList.length; i++) {
			if (menuList[i].type == "main course") {
				matchList.push(menuList[i]);
			}
		}
		populatePage(matchList);
	}
	else if (menuSearch.value.match(/dessert/i)) {
		for (var i = 0; i < menuList.length; i++) {
			if (menuList[i].type == "dessert") {
				matchList.push(menuList[i]);
			}
		}
		populatePage(matchList);
	}
	else if (menuSearch.value.match(/appetizer/i)) {
		for (var i = 0; i < menuList.length; i++) {
			if (menuList[i].type == "appetizer") {
				matchList.push(menuList[i]);
			}
		}
		populatePage(matchList);
	}
	else if (menuSearch.value.match(/beverage/i)) {
		for (var i = 0; i < menuList.length; i++) {
			if (menuList[i].type == "beverage") {
				matchList.push(menuList[i]);
			}
		}
		populatePage(matchList);
	}
	else {
		for (var i = 0; i < menuList.length; i++) {
			if(menuList[i].name.match(re)) {
				matchList.push(menuList[i]);
			}
		}
		populatePage(matchList);
	}
}

var billDiv = document.createElement('div');
var billHeader = document.createElement('div');
var billBody = document.createElement('div');
var tableDiv = document.createElement('div');

var billTitle = document.createElement('p');
var billClose = document.createElement('span');

billClose.id = "billClose";
billClose.innerHTML = "&times;";

billDiv.id = "billDiv";
billHeader.id = "billHeader";
billTitle.id = "billTitle";
billBody.id = "billBody";
tableDiv.id = "tableDiv";



var	billTable = document.createElement('table');
var tr = document.createElement('tr');
var th1 = document.createElement('th');
var th2 = document.createElement('th');
var th3 = document.createElement('th');
var th4 = document.createElement('th');

th1.innerHTML = "S.No";
th2.innerHTML = "Item";
th3.innerHTML = "Price";
th4.innerHTML = "Number of Servings";

tr.appendChild(th1);
tr.appendChild(th2);
tr.appendChild(th3);
tr.appendChild(th4);

billTable.appendChild(tr);
tableDiv.appendChild(billTable);
billBody.appendChild(tableDiv);

billHeader.appendChild(billTitle);
billHeader.appendChild(billClose);

billDiv.appendChild(billHeader);
billDiv.appendChild(billBody);

main.appendChild(billDiv);

var serial1 = 1;
var serial2 = 1;
var serial3 = 1;


function displayBill(tableId) {

	while(billTable.firstChild) {
		billTable.removeChild(billTable.firstChild);
	}

	if (tableId == "table1") {
		billTitle.innerHTML = "Table 1 | Order Details";

		while(billTable.firstChild) {
			billTable.removeChild(billTable.firstChild);
		}

		tr = document.createElement('tr');
		th1 = document.createElement('th');
		th2 = document.createElement('th');
		th3 = document.createElement('th');
		th4 = document.createElement('th');

		th1.innerHTML = "S.No";
		th2.innerHTML = "Item";
		th3.innerHTML = "Price";
		th4.innerHTML = "Number of Servings";

		tr.appendChild(th1);
		tr.appendChild(th2);
		tr.appendChild(th3);
		tr.appendChild(th4);

		billTable.appendChild(tr);
		tableDiv.appendChild(billTable);
		
		serial1 = 1;
		var total = 0;

		for (var i = 0; i < menuList.length; i++) {
			if (table1[i] > 0) {
				var tr = document.createElement('tr');
				var td1 = document.createElement('td');
				var	td2 = document.createElement('td');
				var	td3 = document.createElement('td');
				var td4	= document.createElement('td');
				var td5 = document.createElement('td');

				total += table1[i] * menuList[i].price;

				td1.innerHTML = serial1;
				serial1++;
				td2.innerHTML = menuList[i].name;
				td3.innerHTML = menuList[i].price;
				var numItem = document.createElement('input');
				numItem.id = i;
				numItem.type = "number";
				numItem.value = table1[i];
				numItem.min = 1;
				td4.appendChild(numItem);
				var del = document.createElement('i');
				del.className = "fa fa-trash-o";
				td5.appendChild(del);

				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tr.appendChild(td4);
				tr.appendChild(td5);

				billTable.appendChild(tr);
			}
		}

		var tr = document.createElement('tr');
		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		var td3 = document.createElement('td');

		td1.innerHTML = "&nbsp;";
		td2.innerHTML = "&nbsp;";
		td3.innerHTML = "Total: " + total;


		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);

		var finalBill = document.createElement('button');
		finalBill.className = "finalBill";
		finalBill.textContent = "Close Session (Generate Bill)";
		finalBill.onclick = function () {
			alert("Total bill amount: Rs." + total);
			for (var i = 0; i < table1.length; i++) {
				table1[i] = 0;
			}
			displayBill(thisTable);
			updateTableValues(thisTable);
			billDiv.style.display = "none";
		}


		billBody.appendChild(finalBill);
		billTable.appendChild(tr);

	} 

	else if (tableId == "table2") {
		billTitle.innerHTML = "Table 2 | Order Details";

		while(billTable.firstChild) {
			billTable.removeChild(billTable.firstChild);
		}


		tr = document.createElement('tr');
		th1 = document.createElement('th');
		th2 = document.createElement('th');
		th3 = document.createElement('th');
		th4 = document.createElement('th');

		th1.innerHTML = "S.No";
		th2.innerHTML = "Item";
		th3.innerHTML = "Price";
		th4.innerHTML = "Number of Servings";

		tr.appendChild(th1);
		tr.appendChild(th2);
		tr.appendChild(th3);
		tr.appendChild(th4);

		billTable.appendChild(tr);
		tableDiv.appendChild(billTable);

		serial2 = 1;
		var total = 0;
		
		for (var i = 0; i < menuList.length; i++) {
			if (table2[i] > 0) {
				var tr = document.createElement('tr');
				var td1 = document.createElement('td');
				var	td2 = document.createElement('td');
				var	td3 = document.createElement('td');
				var td4	= document.createElement('td');
				var td5 = document.createElement('td');

				total += table2[i] * menuList[i].price;

				td1.innerHTML = serial2;
				serial2++;
				td2.innerHTML = menuList[i].name;
				td3.innerHTML = menuList[i].price;
				var numItem = document.createElement('input');
				numItem.id = i;
				numItem.type = "number";
				numItem.value = table2[i];
				numItem.min = 1;
				td4.appendChild(numItem);
				var del = document.createElement('i');
				del.className = "fa fa-trash-o";
				td5.appendChild(del);

				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tr.appendChild(td4);
				tr.appendChild(td5);

				billTable.appendChild(tr);
			}
		}

		var tr = document.createElement('tr');
		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		var td3 = document.createElement('td');

		td1.innerHTML = "&nbsp;";
		td2.innerHTML = "&nbsp;";
		td3.innerHTML = "Total: " + total;


		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);

		var finalBill = document.createElement('button');
		finalBill.className = "finalBill";
		finalBill.textContent = "Close Session (Generate Bill)";
		finalBill.onclick = function () {
			alert("Total bill amount: Rs." + total);
			for (var i = 0; i < table2.length; i++) {
				table2[i] = 0;
			}
			displayBill(thisTable);
			updateTableValues(thisTable);
			billDiv.style.display = "none";
		}


		billBody.appendChild(finalBill);
		billTable.appendChild(tr);
	} 

	else if (tableId == "table3") {
		billTitle.innerHTML = "Table 3 | Order Details";

		while(billTable.firstChild) {
			billTable.removeChild(billTable.firstChild);
		}

		tr = document.createElement('tr');
		th1 = document.createElement('th');
		th2 = document.createElement('th');
		th3 = document.createElement('th');
		th4 = document.createElement('th');

		th1.innerHTML = "S.No";
		th2.innerHTML = "Item";
		th3.innerHTML = "Price";
		th4.innerHTML = "Number of Servings";

		tr.appendChild(th1);
		tr.appendChild(th2);
		tr.appendChild(th3);
		tr.appendChild(th4);

		billTable.appendChild(tr);
		tableDiv.appendChild(billTable);

		serial3 = 1;
		var total = 0;
		
		for (var i = 0; i < menuList.length; i++) {
			if (table3[i] > 0) {
				var tr = document.createElement('tr');
				var td1 = document.createElement('td');
				var	td2 = document.createElement('td');
				var	td3 = document.createElement('td');
				var td4	= document.createElement('td');
				var td5 = document.createElement('td');

				total += table3[i] * menuList[i].price;

				td1.innerHTML = serial3;
				serial3++;
				td2.innerHTML = menuList[i].name;
				td3.innerHTML = menuList[i].price;
				var numItem = document.createElement('input');
				numItem.id = i;
				numItem.type = "number";
				numItem.value = table3[i];
				numItem.min = 1;
				td4.appendChild(numItem);
				var del = document.createElement('i');
				del.className = "fa fa-trash-o";
				td5.appendChild(del);

				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tr.appendChild(td4);
				tr.appendChild(td5);

				billTable.appendChild(tr);
			}
		}

		var tr = document.createElement('tr');
		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		var td3 = document.createElement('td');

		td1.innerHTML = "&nbsp;";
		td2.innerHTML = "&nbsp;";
		td3.innerHTML = "Total: " + total;

		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);

		var finalBill = document.createElement('button');
		finalBill.className = "finalBill";
		finalBill.textContent = "Close Session (Generate Bill)";
		finalBill.onclick = function () {
			alert("Total bill amount: Rs." + total);
			for (var i = 0; i < table3.length; i++) {
				table3[i] = 0;
			}
			displayBill(thisTable);
			updateTableValues(thisTable);
			billDiv.style.display = "none";
		}

		

		billBody.appendChild(finalBill);
		billTable.appendChild(tr);
	}

}


document.onclick = function(event) {

	if (event.target.className == "table" || event.target.parentNode.className == "table") {
		billDiv.style.display = "block";
		if (event.target.className == "table") {
			thisTable = event.target.id;
			displayBill(event.target.id);
		} else {
			thisTable = event.target.parentNode.id;
			displayBill(thisTable);
		}
	}
}

billClose.onclick = function () {
	billDiv.style.display = "none";
}


billDiv.onmouseover = function () {
	for (var i = 0; billDiv.getElementsByTagName('input').length; i++) {
		billDiv.getElementsByTagName('input')[i].onchange = function (event) {
			editNumItem = event.target.parentNode.previousSibling.previousSibling.textContent;
			for (var j = 0; j < menuList.length; j++) {
				if (menuList[j].name == editNumItem) {
					if (thisTable == "table1") {
						table1[j] = Number(event.target.value);
					} else if (thisTable == "table2") {
						table2[j] = Number(event.target.value);
					} else if (thisTable == "table3") {
						table3[j] = Number(event.target.value);
					}
				}
			}
			displayBill(thisTable);
			updateTableValues(thisTable);
		}
		billDiv.getElementsByTagName('input')[i].parentNode.nextSibling.childNodes[0].onclick = function () {
			editNumItem = event.target.parentNode.previousSibling.previousSibling.previousSibling.textContent;
			for (var j = 0; j < menuList.length; j++) {
				if (menuList[j].name == editNumItem) {
					if (thisTable == "table1") {
						table1[j] = 0;
					} else if (thisTable == "table2") {
						table2[j] = 0;
					} else if (thisTable == "table3") {
						table3[j] = 0;
					}
				}
			}
			displayBill(thisTable);
			updateTableValues(thisTable);
		}
	}
}