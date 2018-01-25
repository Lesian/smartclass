get('/getjobs', {}, function(jobsArr){
	let jobsDiv = document.getElementById('jobsDiv');

	tabList = document.createElement('div');
	tabList.setAttribute('role', 'tablist');
	tabList.setAttribute('id', "accordion");
	tabList.setAttribute('aria-multiselectable', 'true');

	if (jobsArr.length === 0){
		jobsDiv.innerHTML = "NO JOBS AVAILABLE";
	}

	


	for (let i = 0; i < jobsArr.length; i++){


		let aJobcard = document.createElement('div');
		aJobcard.setAttribute('class', 'card');

		

		// alert('hello');

		let aJobCardHeader = document.createElement('div');
		aJobCardHeader.setAttribute('class', 'card-header');
		aJobCardHeader.setAttribute('role', "tab");
		aJobCardHeader.setAttribute('id', "heading" + i);

		// alert('hello');

		let aJobHeader = document.createElement('h4');
		aJobHeader.setAttribute('class', "mb-0");

		let aJobLink = document.createElement('a');
		aJobLink.setAttribute('data-toggle', "collapse");
		if (i==0) {
			aJobLink.setAttribute('aria-expanded', 'true');
			aJobLink.setAttribute('class', "collapsed");
			
		}  else {
			aJobLink.setAttribute('class', "collapsed");
		}
		aJobLink.style.fontSize = "15px";
		aJobLink.setAttribute('data-parent', "#accordion");
		aJobLink.setAttribute('href', "#collapse"+i);
		// aJobLink.setAttribute('style' "color:#000000;");
		// aJobLink.style.color = "#000000";
		aJobLink.innerHTML = jobsArr[jobsArr.length-i-1].jobTitle + " posted at " + jobsArr[jobsArr.length-i-1].createdAt.slice(0,10);
		aJobHeader.appendChild(aJobLink);


		// alert('hello');

		aJobCardHeader.appendChild(aJobHeader);

		aJobcard.appendChild(aJobCardHeader);

		let contentDiv = document.createElement('div');
		contentDiv.setAttribute('id', "collapse" + i);
		if (i == 0){
			contentDiv.setAttribute('class', "collapse");
		}
		else {
			contentDiv.setAttribute('class', "collapse");
		}

		contentDiv.style.height = "100px;";
		
		// contentDiv.setAttribute('role', "tabpanel");
		contentDiv.setAttribute('aria-labellby', 'heading'+i)
		// contentDiv.style.height = "50px";

		// alert('hello');

		let cardBlock = document.createElement('div');
		cardBlock.className = 'card-block';
		cardBlock.style.height = "100px";
		jobDescription = document.createElement('div');
		jobDescription.innerHTML = jobsArr[jobsArr.length-i-1].jobDescr;
		posterName = document.createElement('div');
		posterName.style.textAlign = "left";
		posterName.style.position = "absolute";
		posterName.style.bottom = "0px";
		posterName.innerHTML = "Posted By : " + jobsArr[jobsArr.length-i-1].firstName + " " + jobsArr[jobsArr.length-i-1].lastName + "<br>" + "Contact info : "+ jobsArr[jobsArr.length-i-1].contact ;
		
		cardBlock.appendChild(jobDescription);
		cardBlock.appendChild(posterName);
		// cardBlock.innerHTML = jobsArr[jobsArr.length-i-1].jobDescr

		contentDiv.appendChild(cardBlock);
		aJobcard.appendChild(contentDiv);

		tabList.appendChild(aJobcard);

		// alert('hello');



	}

	jobsDiv.appendChild(tabList)
});
