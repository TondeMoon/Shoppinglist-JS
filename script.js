let myList = ['бананы', 'молоко', 'хлеб', 'соль'];
const output = document.querySelector('.output');
const finished = document.querySelector('.finished');
const btnAdd = document.querySelector('#addNew');
const newItem = document.querySelector('#addItem');
btnAdd.addEventListener('click', function () {
  if (newItem.value) {
    myList.push(newItem.value);
    build();
    newItem.value = '';
    finished.innerHTML = '';
  }
});
document.addEventListener('DOMContentLoaded', build);

function build() {
  output.innerHTML = '<h2>Список Покупок</h2>';

  const tbl = document.createElement('table');
  for (let i = 0; i < myList.length; i++) {
    const row = document.createElement('tr');
    row.index = i;
    const cell0 = document.createElement('td');
    cell0.innerHTML = i + 1;
    row.appendChild(cell0);
    const cell1 = document.createElement('td');
    cell1.classList.add('itemName');
    cell1.innerHTML = myList[i];
    row.appendChild(cell1);
    const cell2 = document.createElement('td');
    const span1 = document.createElement('span');
    span1.innerHTML = 'Удалить';
    span1.addEventListener('click', function () {
      const itemOut = myList.splice(i, 1);
      if (myList.length === 0) {
        finished.innerHTML = '<h3>Всё куплено </h3>';
      }
      build();
    });

    row.appendChild(cell2);
    cell2.appendChild(span1);
    tbl.appendChild(row);
    const span2 = document.createElement('span');
    span2.innerHTML = 'Редактировать';
    span2.addEventListener('click', function () {
      row.style.backgroundColor = 'Yellow';
      let tempVal = row.firstElementChild.nextElementSibling;
      const newInput = document.createElement('input');
      newInput.value = tempVal.innerText;
      newInput.focus();
      tempVal.innerHTML = '';
      tempVal.appendChild(newInput);
      newInput.addEventListener('blur', function () {
        tempVal.innerHTML = newInput.value;
        myList[i] = newInput.value;
        build();
      });
    });
    cell2.appendChild(span2);
  }
  output.appendChild(tbl);
}

const exportToFile = document.querySelector('.exportToFile');
exportToFile.addEventListener('click', function () {
  fileDownload(myList);
});

function fileDownload(data) {
  let holder = '';
  let properties = { type: 'text/plain' };
  data.forEach(function (item) {
    holder += item + '\n';
  });

  let file = new File([holder], 'list.txt', properties);
  let link = document.createElement('a');
  let url = URL.createObjectURL(file);
  link.style.visibility = 'hidden';
  link.setAttribute('href', url);
  link.setAttribute('download', 'list.txt');
  link.click();
  document.body.appendChild(link);
  document.body.removeChild(link);
}
