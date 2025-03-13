function calculateArea(length, width) {
  return length * width;
}

function handleCalculation() {
  if (
    document.getElementById("num1").value != "" &&
    document.getElementById("num2").value != ""
  ) {
    let length = parseInt(document.getElementById("num1").value);
    let width = parseInt(document.getElementById("num2").value);
    var result = calculateArea(length, width);
    document.getElementById("result").innerText = `계산된 면적: ${result}㎡`;
  } else {
    result = "없음";
    document.getElementById("result").innerText = `계산된 면적: ${result}`;
  }
}

document.getElementById("calcBtn").addEventListener("click", handleCalculation);
