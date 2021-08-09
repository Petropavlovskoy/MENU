document.querySelector(".root-nav").onclick = function (event) {
  console.log(event);
  if (event.target.nodeName !== "SPAN") return;
  closeAllSubMenu(event.target.nextElementSibling);
  //окрасить выбранное меню 
  event.target.classList.add('sub-menu-active-span');
  event.target.nextElementSibling.classList.toggle("sub-menu-active");
};

function closeAllSubMenu(current = null) {
  let parent = [];
  if (current) {
    //        console.dir(current);
    let currentParent = current.parentNode;
    //проверяю, есть ли родитель у текущего элемента,
    //если нет, не захожу сюда, если есть то
    while (currentParent) {
      //проверяю не является ли элемент главной точкой отправвления (меню)
      //если является ухожу
      if (currentParent.classList.contains("root-nav")) break;
      //если не является то проверяю родитель список
      //если ДА то собираю внутрь parent моих родителей
      if (currentParent.nodeName === "UL") parent.push(currentParent);
      //и получаю родителя родителей
      currentParent = currentParent.parentNode;
    }
  }
  const subMenu = document.querySelectorAll(".root-nav ul");
  Array.from(subMenu).forEach((item) => {
    //не только текущую
    //но и всех родителей
    if (item != current && !parent.includes(item)) {
        item.classList.remove("sub-menu-active");
        if(item.previousElementSibling.nodeName === 'SPAN') {
            item.previousElementSibling.classList.remove('sub-menu-active-span');
        }
    }
  });
}

//когда покинули меню, закрыть все элементы
document.querySelector('.root-nav').onmouseleeve = closeAllSubMenu;