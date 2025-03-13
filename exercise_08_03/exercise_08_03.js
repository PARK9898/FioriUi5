let todoList = [];

while (true) {
  let todoActPrompt = prompt("1:입력,2:삭제,3:종료");
  let actNum = Number(todoActPrompt);
  if (actNum == 1) {
    let todoString = prompt("할 일을 입력해주세요");
    todoList.push(todoString);
  } else if (actNum == 2) {
    let deleteIndex = prompt("삭제할 할 일의 번호를 입력하세요(0부터 시작)");
    let deleteNumber = Number(deleteIndex);
    todoList.splice(deleteNumber, 1);
  } else if (actNum == 3) {
    break;
  }
}
console.log("최종 할 일 목록", todoList);
