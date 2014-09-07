var findmin = function(arr){
	
	var min = Number.POSITIVE_INFINITY; 
	var idx = -1; 
	
	for (var i = 0; i < arr.length; i++){  
		if ( arr[i] < min ) { 
			min = arr[i]; 
			idx = i;
			console.log(min + ", " + idx); 
		}
	}
	var res = arr.splice(idx,1); 
	return res; 
}


var arr = [4,3,2,1]; 
console.log(arr); 
findmin(arr);