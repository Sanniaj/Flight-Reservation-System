

function swapperButton(){
    const input1 = document.getElementById('departure_airport');
    const input2 = document.getElementById('arrival_airport');
    const text1 = input1.value;
    const text2 = input2.value;

    if (isStringEmpty(text1) || isStringEmpty(text2)) {
        return alert("please fill in the search!");
    }

    input1.value = text2;
    input2.value = text1;
}

function isStringEmpty(string) {
  return !string.trim().length;
}
