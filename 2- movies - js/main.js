let moviesContainer = document.querySelector(".movie-section");
let seriesContainer = document.querySelector(".series-section");
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");
let myInput = document.querySelector("#myInput");
let myBtns = document.querySelector(".btns");
let myTitle = document.querySelector("#title");
let homeLink = document.querySelector("#home");
let myStart = 0;                                    	// mystart is value that i start from
let myCounter = myStart + 7;                       	    // mycounter is value that i stopped in
let DisplyedElements = 8;
const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=bd551351d613eae72b5219e295facfeb&page1";

// DISPLAY MOVIES
fetch(API_URL)
    .then((res)=> res.json())
	.then((data)=>{
		let myArr = data.results;

		// #1- DISPLAY MOVIES
		let myResult = "";
		display(myResult, myArr);
		myStart = myCounter;

		// #2- NEXT EVENT
		nextBtn.addEventListener("click", ()=>{
			let nextData = "";
			if(myCounter != myArr.length-1){
				myStart = myCounter+1;                    // refresh mystart & stop at the first element in displayed elements
				myCounter+= DisplyedElements;             // refresh myCounter & stop at the last element in displayed elements
			};
			if(myCounter > myArr.length-1){               // don't exceed myArr limits
				myCounter = myArr.length-1;
			};
			display(nextData, myArr);
		});

		// #3- PREV EVENT
		prevBtn.addEventListener("click",()=>{
			let prevData = "";
			if(myStart- DisplyedElements < 0){
				myStart = 0;
			}else{
				myCounter = myStart - 1;
				myStart -= DisplyedElements;
			}
			display(prevData, myArr);
		});

		// #4- BACK TO HOME PAGE
		homeLink.addEventListener("click",()=>{
			myStart = 0;
			myCounter = myStart + 7; 
			myResult = "";
			display(myResult, myArr);
			myBtns.style.display = "block";
			myTitle.innerHTML = "Last Update Movies";
			myInput.value = "";
		});
	});

// SEARCH
myInput.addEventListener("keyup",(m)=>{
	let mySearchData = "";
	fetch(`https://api.themoviedb.org/3/search/movie?api_key=bd551351d613eae72b5219e295facfeb&query=${myInput.value}`)
		.then((res)=> res.json())
		.then((res)=>{
			res.results.forEach((e) => {
				let myImg = e.poster_path;
				if(myImg == null){
					myImg = e.backdrop_path;
				};
				mySearchData += `
				<div class="col-lg-3 col-6 mb-4 p-3 box">
				<div class="movie">
				<img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${myImg}" height="300px">
				<div class="desc">
				<span>${e.title}</span>
				<span>${e.vote_average}</span>
				</div>
				</div>
				</div>`;
			});
			
			// console.log(res.results)
			console.log(myInput.value)
			if(myInput.value==""){
				window.location.href = "http://127.0.0.1:5502/index.html";
			}

			moviesContainer.innerHTML = mySearchData;
			myBtns.style.display = "none";
			myTitle.innerHTML = `Search results for <span style="color:gold">${myInput.value}</span>`;
		});
});

// DISPLAY FUNCTION
function display(myData, arr){
	for(let i=myStart; i<=myCounter; i++){
		myData += `
		<div class="col-lg-3 col-6 mb-4 p-3 box">
			<div class="movie">
				<img src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${arr[i].poster_path}" height="300px">
				<div class="desc">
					<span>${arr[i].title}</span>
					<span>${arr[i].vote_average}</span>
				</div>
			</div>
		</div>`;
	};
	moviesContainer.innerHTML = myData;
};