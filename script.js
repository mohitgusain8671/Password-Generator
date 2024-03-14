const upperCase = document.getElementById('UpperCase');
const lowerCase = document.getElementById('LowerCase');
const numbers = document.getElementById('Numbers');
const symbols = document.getElementById('Symbols');
const slider = document.getElementById('slider');
const password = document.getElementById('Password');
const sliderDiv = document.getElementById('sliderdiv');
const strengthDisaplay = document.getElementById('Strength');

let length = 10;
function generate() {
    let functions = [];
    let result = '';
    if (upperCase.checked) functions.push(generateUpperCase);
    if (lowerCase.checked) functions.push(generateLowerCase);
    if (numbers.checked) functions.push(generateNumber);
    if (symbols.checked) functions.push(generateSymbol);
    length = slider.value;
    if(functions.length == 0)  return alert("At least one checkBox must be selected");
    for (let i=0;i<functions.length;i++) {
        result += functions[i]();
    }
    while (result.length < length) {
        result += functions[Math.floor(Math.random()*functions.length)]();
    }
    password.innerHTML = `<span>${result}</span>` + `<i id="Icons"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check icon" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
  </svg></i>`;
    const icon = document.getElementById('Icons');
    icon.addEventListener('click',()=>{
        
        navigator.clipboard.writeText(result);
        alert("Copied to clipBoard");
    })
    
    calculateStrength(result);
}
function generateUpperCase(){
    return  String.fromCharCode(65 + Math.floor(Math.random() * 26));
}
function generateLowerCase(){
    return  String.fromCharCode(97 + Math.floor(Math.random() * 26));
}
function generateNumber(){
    return String(Math.floor(Math.random() * 10));
}
function generateSymbol(){
    const arr = "!@#$%^&*()_-+={}[];:',./?<>|`~";
    return arr[Math.floor(Math.random() * arr.length)];
}

function calculateStrength(password){
    let strength = 0;
    let uppercase = /[A-Z]/.test(password);
    let lowercase = /[a-z]/.test(password);
    let number = /\d/.test(password);
    let specialChar = /\W/.test(password);

    // at least one upper case letter, one lower case per letter and one digit
    strength += uppercase ? 1 : 0;
    strength += lowercase ? 1 : 0;
    strength += number ? 1 :  0;
    
    // At least eight characters long
    strength += password.length >= 8 ? 1 : 0;

    // If password contains symbols and letters/numbers
    strength += specialChar && (uppercase || lowercase || number) ? 1 : 0;
    console.log("strength : "+strength);
    let result = "";
    let temp = ["Very Weak","Weak","Moderate","Strong","Very Strong"];
    if(strength==0) strength++;
    result += temp[strength-1] + " Password";
    strengthDisaplay.innerHTML = `Strength : ${result}`;
    changeColor(strength);
    
}
function changeColor(strength){
    switch(strength){
        case 1:
            strengthDisaplay.style.color="red";
            break;
        case 2:
            strengthDisaplay.style.color="#ff7f0e";
            break;
        case 3:
            strengthDisaplay.style.color="yellow";
            break;
        case 4:
            strengthDisaplay.style.color="#3e7b27";
        default:
            strengthDisaplay.style.color="darkgreen";
    }
}
function updateSliderValue(){
    sliderDiv.innerHTML = slider.value;
};
updateSliderValue();

