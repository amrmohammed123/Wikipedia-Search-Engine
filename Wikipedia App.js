var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&limit=9&origin=*&search=";
var input = document.getElementById("in");
document.getElementById("search").addEventListener("click",function(){
	document.getElementById("search").style.display = "none";
	document.getElementById("search_div").style.height = "40px";
	document.getElementById("search_div").style.borderStyle = "solid";
	document.getElementById("search_div").style.transform = "scale(1)";
});
document.getElementById("x").addEventListener("click",function(){
	document.getElementById("search_div").style.height = "0";
	document.getElementById("search_div").style.borderStyle = "none";
	document.getElementById("search_div").style.transform = "scale(0)";
	document.getElementById("search").style.display = "block";
	document.getElementById("in").value = "";
	var temp = document.getElementsByClassName("output");
	while(temp[0])
	{
		temp[0].parentNode.removeChild(temp[0]);
	}
});
input.addEventListener("keypress",function(event){
	if(event.keyCode == 13)
	{
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function()
		{
			if(xhr.readyState == 4 & xhr.status == 200)
			{
				var data = JSON.parse(xhr.responseText);
				updatePage(data);
			}
		}
		xhr.open("GET",url + encodeURI(input.value));
		xhr.setRequestHeader("Content-Type", "json");
		xhr.send();
	}
}) 
function updatePage(data)
{
	var temp = document.getElementsByClassName("output");
	while(temp[0])
	{
		temp[0].parentNode.removeChild(temp[0]);
	}
	var i = 0;
	for(i = 0 ; i < data[1].length ; i++)
	{
		temp = document.createElement('div');
		temp.innerHTML = '<div class="output"><a href="'+ data[3][i] + '" target="_blank"><h1>' + data[1][i] + '</h1><p>' + data[2][i] +'</p></a></div>';
		document.body.insertBefore(temp,document.body.lastChild);
	}
}
