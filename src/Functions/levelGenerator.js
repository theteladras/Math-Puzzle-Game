import _ from 'lodash'

// gets all the selected ( green ) spots
export function spotFinder(firstNumber, lvl) {
    let spots = [];
    let count = 0;
    let num = firstNumber;
    while( count < lvl ) {
        let potentialSpots = [];
        let spot = null;
        let levoPolje = null;
        let desnoPolje = null;
        let gornjePolje = null;
        let donjePolje = null;
        let levaGornjaDijagonala = null;
        let levaDonjaDijagonala = null;
        let desnaGornjaDijagonala = null;
        let desnaDonjaDijagonala = null;
        
        if (num > 9) {
            let stringNUM = num.toString();
            if (parseInt(stringNUM[1]) > 2) {
                levoPolje = num - 3;
            }
            if (parseInt(stringNUM[1]) < 7) {
                desnoPolje = num + 3;
            }
            if (parseInt(stringNUM[0]) > 2) {
                gornjePolje = num - 30;
            }
            if (parseInt(stringNUM[0]) < 7) {
                donjePolje = num + 30;
            }
            if (parseInt(stringNUM[0]) > 1 && parseInt(stringNUM[1]) > 1) {
                levaGornjaDijagonala = num - 22;
            }
            if (parseInt(stringNUM[0]) > 1 && parseInt(stringNUM[1]) < 8) {
                desnaGornjaDijagonala = num - 18;
            }
            if (parseInt(stringNUM[0]) < 8 && parseInt(stringNUM[1]) > 1) {
                levaDonjaDijagonala = num + 18;
            }
            if (parseInt(stringNUM[0]) < 8 && parseInt(stringNUM[1]) < 8) {
                desnaDonjaDijagonala = num + 22;
            }
        }
        else {
            if (num > 2 ) {
                levoPolje = num - 3;
            }
            if (num < 7 ) {
                desnoPolje = num + 3;
            }
            donjePolje = num + 30;
            if (num > 1) {
                levaDonjaDijagonala = num + 18;
            }
            if (num < 8) {
                desnaDonjaDijagonala = num + 22;
            }
        }
        
        if (levoPolje && !(_.includes(spots, levoPolje)) && levoPolje != firstNumber) {potentialSpots.push(levoPolje);} 
        if (desnoPolje && !(_.includes(spots, desnoPolje)) && desnoPolje != firstNumber) {potentialSpots.push(desnoPolje);}
        if (gornjePolje && !(_.includes(spots, gornjePolje)) && gornjePolje != firstNumber) {potentialSpots.push(gornjePolje);} 
        if (donjePolje && !(_.includes(spots, donjePolje)) && donjePolje != firstNumber) {potentialSpots.push(donjePolje);}
        if (levaDonjaDijagonala && !(_.includes(spots, levaDonjaDijagonala)) && levaDonjaDijagonala != firstNumber) {potentialSpots.push(levaDonjaDijagonala);} 
        if (desnaDonjaDijagonala && !(_.includes(spots, desnaDonjaDijagonala)) && desnaDonjaDijagonala != firstNumber) {potentialSpots.push(desnaDonjaDijagonala);}
        if (levaGornjaDijagonala && !(_.includes(spots, levaGornjaDijagonala)) && levaGornjaDijagonala != firstNumber) {potentialSpots.push(levaGornjaDijagonala);} 
        if (desnaGornjaDijagonala && !(_.includes(spots, desnaGornjaDijagonala)) && desnaGornjaDijagonala != firstNumber) {potentialSpots.push(desnaGornjaDijagonala);}
        
        spot = potentialSpots[Math.floor(Math.random()*(potentialSpots.length-1))];
        spots.push(spot);
        count++;
        num = spot;
    }
    return spots;
}


//gets all the spots that need to be clicked next ( yellow )
export function yellowBoxes(index, spot) {
    let num = index;
    let yellows = [];
    let levoPolje = null;
    let desnoPolje = null;
    let gornjePolje = null;
    let donjePolje = null;
    let levaGornjaDijagonala = null;
    let levaDonjaDijagonala = null;
    let desnaGornjaDijagonala = null;
    let desnaDonjaDijagonala = null;
    
    if (num > 9) {
        let stringNUM = num.toString();
        if (parseInt(stringNUM[1]) > 2) {
            levoPolje = num - 3;
        }
        if (parseInt(stringNUM[1]) < 7) {
            desnoPolje = num + 3;
        }
        if (parseInt(stringNUM[0]) > 2) {
            gornjePolje = num - 30;
        }
        if (parseInt(stringNUM[0]) < 7) {
            donjePolje = num + 30;
        }
        if (parseInt(stringNUM[0]) > 1 && parseInt(stringNUM[1]) > 1) {
            levaGornjaDijagonala = num - 22;
        }
        if (parseInt(stringNUM[0]) > 1 && parseInt(stringNUM[1]) < 8) {
            desnaGornjaDijagonala = num - 18;
        }
        if (parseInt(stringNUM[0]) < 8 && parseInt(stringNUM[1]) > 1) {
            levaDonjaDijagonala = num + 18;
        }
        if (parseInt(stringNUM[0]) < 8 && parseInt(stringNUM[1]) < 8) {
            desnaDonjaDijagonala = num + 22;
        }
    }
    else {
        if (num > 2 ) {
            levoPolje = num - 3;
        }
        if (num < 7 ) {
            desnoPolje = num + 3;
        }
        donjePolje = num + 30;
        if (num > 1) {
            levaDonjaDijagonala = num + 18;
        }
        if (num < 8) {
            desnaDonjaDijagonala = num + 22;
        }
    }
    if (_.includes(spot, levoPolje)) { yellows.push(levoPolje) }
    if (_.includes(spot, desnoPolje)) { yellows.push(desnoPolje) }
    if (_.includes(spot, donjePolje)) { yellows.push(donjePolje) }
    if (_.includes(spot, gornjePolje)) { yellows.push(gornjePolje) }

    if (_.includes(spot, levaDonjaDijagonala)) { yellows.push(levaDonjaDijagonala) }
    if (_.includes(spot, desnaDonjaDijagonala)) { yellows.push(desnaDonjaDijagonala) }
    if (_.includes(spot, levaGornjaDijagonala)) { yellows.push(levaGornjaDijagonala) }
    if (_.includes(spot, desnaGornjaDijagonala)) { yellows.push(desnaGornjaDijagonala) }
    return yellows;
}