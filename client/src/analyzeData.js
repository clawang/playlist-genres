import React from 'react';

function sortGenres(genres) {
	var sortable = [];
	for (var g in genres) {
	    sortable.push([g, genres[g]]);
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
    
    while(index < n) {
    	let g = obj[i][0];
    	if(g !== "pop") {
    		result.push(g);
    		index++;
    	}
        i++;
    }
    return result;
}

export {sortGenres, updateObj, propToArr};