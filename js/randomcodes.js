/* Create the random code verification */
var getCode = ' ';//to store entered code
var btnvalue; // for buttom boolean value
//Create variables to store generated codes and the type of characters we want to show as codes
var code = ' ';//initialize to null value
var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';


//Function to generate combination of characters
function generateCode() {
    //Generate character multiple times using a loop
    for (i=1;i<=8;i++) {
        var char = Math.random() * str.length;
        code += str.charAt(char);
    }
    return code;
};

//Get HTML element to display
document.getElementById('codes').innerHTML = generateCode();

//listen to user input code
var codebox = document.getElementById("codeentered");
codebox.addEventListener("input", evaluateCode);

function evaluateCode() {
    getCode = document.getElementById("codeentered").value; 
    var charset1 = getCode.trim();
    var charset2 = code.trim();
    //test if code entered matches the number of generated codes
    if (charset1.length == charset2.length && charset1 == charset2) {
        disableButton(false); //enable the button
    }
};

//Able/Disable Button
function disableButton(btnvalue) {
    // document.getElementById("submit").disabled = btnvalue;
    if (btnvalue == true) {
        document.getElementById("submit").style.backgroundColor = "rgba(73, 119, 209, 0.3)";
        document.getElementById("submit").style.color = "rgba(255, 255, 255, 0.5)";
    } else {
        document.getElementById("submit").style.backgroundColor = "rgba(73, 119, 209, 1)";
        document.getElementById("submit").style.color = "rgba(255, 255, 255, 1)";
    };

};
