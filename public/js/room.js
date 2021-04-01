console.log(window.location.pathname[window.location.pathname.length - 1]);

const buttonClick1 = e => {
	document.getElementById("result1").innerHTML =
		e.target.innerText + " was clicked";
};

const buttonClick2 = e => {
	document.getElementById("result2").innerHTML =
		e.target.innerText + " was clicked";
};


