function sortGenres(genres) {
	var sortable = [];
	for (var g in genres) {
		if(g !== "pop" && g !== "edm" && g !== "rap") {
	    	sortable.push([g, genres[g]]);
	    }
	}

	sortable.sort(function(a, b) {
	    return b[1] - a[1];
	});	

	return sortable;
}

function updateObj(obj, prop) {
	if(obj.hasOwnProperty(prop)) {
		obj[prop]++;
	} else {
		obj[prop] = 1;
	}
}

function propToArr(obj, n) {
	let index = 0;
	let i = 0;
	let result = [];
	let max = obj.length - 1;
    
    while(index < n && index < max) {
    	if(obj[i]) {
	    	let g = obj[i][0];
	    	if(g !== "pop" && g !== "edm" && g !== "rap") {
	    		result.push(g);
	    		index++;
	    	} else {
	    		max -= 1;
	    	}
	    }
        i++;
    }
    return result;
}

function arrToList(arr, prop) {
	let str = '';
	arr.forEach((item, index) => {
		str += item[prop];
		if(index < arr.length - 1) {
			str += ', ';
		}
	});
	return str;
}

export {sortGenres, updateObj, propToArr, arrToList};