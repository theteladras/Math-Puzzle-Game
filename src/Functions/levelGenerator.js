import { includes } from 'lodash';

// gets all the selected ( green ) spots
spotFinder = (firstNumber, lvl) => {
	let spots = [];
	let count = 0;
	let num = firstNumber;
	// goes through a loop number of times that equals the level that we are on
	while( count < lvl ) {
		let potentialSpots = [];
		let spot = null;
		let leftField = null;
		let rightField = null;
		let upperField = null;
		let bottomField = null;
		let leftUpperDiagonal = null;
		let leftBottomDiagonal = null;
		let rightUpperDiagonal = null;
		let rightBottomDiagonal = null;
		// here i am assigning all the possible positions to move, of a selected tile
		// for this first case im looking up for numbers that are grater than 9, or two digit numbers
		// so i can determinate the position of a pressed tile by anallizing both numbers
		if (num > 9) {
			let stringNUM = num.toString();
			if (parseInt(stringNUM[1]) > 2) {
				leftField = num - 3;
			}
			if (parseInt(stringNUM[1]) < 7) {
				rightField = num + 3;
			}
			if (parseInt(stringNUM[0]) > 2) {
				upperField = num - 30;
			}
			if (parseInt(stringNUM[0]) < 7) {
				bottomField = num + 30;
			}
			if (parseInt(stringNUM[0]) > 1 && parseInt(stringNUM[1]) > 1) {
				leftUpperDiagonal = num - 22;
			}
			if (parseInt(stringNUM[0]) > 1 && parseInt(stringNUM[1]) < 8) {
				rightUpperDiagonal = num - 18;
			}
			if (parseInt(stringNUM[0]) < 8 && parseInt(stringNUM[1]) > 1) {
				leftBottomDiagonal = num + 18;
			}
			if (parseInt(stringNUM[0]) < 8 && parseInt(stringNUM[1]) < 8) {
				rightBottomDiagonal = num + 22;
			}
		}
		else {
			if (num > 2 ) {
				leftField = num - 3;
			}
			if (num < 7 ) {
				rightField = num + 3;
			}
			bottomField = num + 30;
			if (num > 1) {
				leftBottomDiagonal = num + 18;
			}
			if (num < 8) {
				rightBottomDiagonal = num + 22;
			}
		}
        
		if (leftField && !(includes(spots, leftField)) && leftField != firstNumber) {potentialSpots.push(leftField);} 
		if (rightField && !(includes(spots, rightField)) && rightField != firstNumber) {potentialSpots.push(rightField);}
		if (upperField && !(includes(spots, upperField)) && upperField != firstNumber) {potentialSpots.push(upperField);} 
		if (bottomField && !(includes(spots, bottomField)) && bottomField != firstNumber) {potentialSpots.push(bottomField);}
		if (leftBottomDiagonal && !(includes(spots, leftBottomDiagonal)) && leftBottomDiagonal != firstNumber) {potentialSpots.push(leftBottomDiagonal);} 
		if (rightBottomDiagonal && !(includes(spots, rightBottomDiagonal)) && rightBottomDiagonal != firstNumber) {potentialSpots.push(rightBottomDiagonal);}
		if (leftUpperDiagonal && !(includes(spots, leftUpperDiagonal)) && leftUpperDiagonal != firstNumber) {potentialSpots.push(leftUpperDiagonal);} 
		if (rightUpperDiagonal && !(includes(spots, rightUpperDiagonal)) && rightUpperDiagonal != firstNumber) {potentialSpots.push(rightUpperDiagonal);}
        
		spot = potentialSpots[Math.floor(Math.random()*(potentialSpots.length-1))];
		spots.push(spot);
		count++;
		num = spot;
	}
	return spots;
}


//gets all the spots that need to be clicked next ( yellow )
yellowBoxes = (index, spot) => {
	let num = index;
	let yellows = [];
	let leftField = null;
	let rightField = null;
	let upperField = null;
	let bottomField = null;
	let leftUpperDiagonal = null;
	let leftBottomDiagonal = null;
	let rightUpperDiagonal = null;
	let rightBottomDiagonal = null;
    
	if (num > 9) {
		let stringNUM = num.toString();
		if (parseInt(stringNUM[1]) > 2) {
			leftField = num - 3;
		}
		if (parseInt(stringNUM[1]) < 7) {
			rightField = num + 3;
		}
		if (parseInt(stringNUM[0]) > 2) {
			upperField = num - 30;
		}
		if (parseInt(stringNUM[0]) < 7) {
			bottomField = num + 30;
		}
		if (parseInt(stringNUM[0]) > 1 && parseInt(stringNUM[1]) > 1) {
			leftUpperDiagonal = num - 22;
		}
		if (parseInt(stringNUM[0]) > 1 && parseInt(stringNUM[1]) < 8) {
			rightUpperDiagonal = num - 18;
		}
		if (parseInt(stringNUM[0]) < 8 && parseInt(stringNUM[1]) > 1) {
			leftBottomDiagonal = num + 18;
		}
		if (parseInt(stringNUM[0]) < 8 && parseInt(stringNUM[1]) < 8) {
			rightBottomDiagonal = num + 22;
		}
	}
	else {
		if (num > 2 ) {
			leftField = num - 3;
		}
		if (num < 7 ) {
			rightField = num + 3;
		}
		bottomField = num + 30;
		if (num > 1) {
			leftBottomDiagonal = num + 18;
		}
		if (num < 8) {
			rightBottomDiagonal = num + 22;
		}
	}
	if (includes(spot, leftField)) { yellows.push(leftField) }
	if (includes(spot, rightField)) { yellows.push(rightField) }
	if (includes(spot, bottomField)) { yellows.push(bottomField) }
	if (includes(spot, upperField)) { yellows.push(upperField) }

	if (includes(spot, leftBottomDiagonal)) { yellows.push(leftBottomDiagonal) }
	if (includes(spot, rightBottomDiagonal)) { yellows.push(rightBottomDiagonal) }
	if (includes(spot, leftUpperDiagonal)) { yellows.push(leftUpperDiagonal) }
	if (includes(spot, rightUpperDiagonal)) { yellows.push(rightUpperDiagonal) }
	return yellows;
}


export { yellowBoxes, spotFinder };