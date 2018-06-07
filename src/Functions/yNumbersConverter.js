// converting results for the chart y points
export default goTroughArray = (arr) => {
    if (Math.round(arr) == 0) { return 190; }
    else if (Math.round(arr) == 1) { return 165+25/2; }
    else if (Math.round(arr) == 2) { return 165; }
    else if (Math.round(arr) == 3) { return 140+25/2; }
    else if (Math.round(arr) == 4) { return 140; }
    else if (Math.round(arr) == 5) { return 115+25/2; }
    else if (Math.round(arr) == 6) { return 115; }
    else if (Math.round(arr) == 7) { return 90+25/2; }
    else if (Math.round(arr) == 8) { return 90; }
    else if (Math.round(arr) == 9) { return 65+25/2; }
    else if (Math.round(arr) == 10) { return 65; }
    else if (Math.round(arr) == 11) { return 40+25/2; }
    else if (Math.round(arr) == 12) { return 40; }   
    else if (Math.round(arr) == 13) { return 15+25/2; }
    else if (Math.round(arr) == 14) { return 15; }
    else if (Math.round(arr) == 15) { return 15-25/2; }
    else { return -10; }
}