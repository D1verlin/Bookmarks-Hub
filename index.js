    // Массив для хранения вкладок
    let tabs = [];

    function saveTabsToLocalStorage() {
        localStorage.setItem("tabs", JSON.stringify(tabs));
      }

    function addTab() {
        // Получаем значения из полей формы
        const tabName = document.getElementById("tabName").value;
        const tabLink = document.getElementById("tabLink").value;

        // Проверяем, что оба поля заполнены
        if (tabName && tabLink) {
            // Создаем объект вкладки
            const tab = { name: tabName, link: tabLink };

            // Добавляем вкладку в массив
            tabs.push(tab);

            // Очищаем поля формы
            document.getElementById("tabName").value = "";
            document.getElementById("tabLink").value = "";
            saveTabsToLocalStorage();
            // Обновляем отображение содержимого массива
            updateTabsContainer();
            
            console.log("Вкладка добавлена:", tab);
        } else {
            alert("Пожалуйста, заполните оба поля.");
        }
    }

    function exportTabs() {
        // Преобразуем массив в JSON и выводим его в консоль
        const jsonTabs = JSON.stringify(tabs, null, 2);
        console.log("Экспорт в JSON:", jsonTabs);
    }

    function importTabs() {
        // Спрашиваем у пользователя JSON файл
        const jsonFile = prompt("Введите JSON данные:");

        try {
            // Пытаемся преобразовать JSON в объект
            const importedTabs = JSON.parse(jsonFile);

            // Проверяем, что результат является массивом
            if (Array.isArray(importedTabs)) {
                // Обновляем массив вкладок
                tabs = importedTabs;

                // Обновляем отображение содержимого массива
                updateTabsContainer();

                console.log("Вкладки импортированы:", tabs);
            } else {
                alert("Некорректный формат данных. Введите правильный JSON массив.");
            }
        } catch (error) {
            alert("Произошла ошибка при обработке JSON данных.");
        }
    }

    function saveToFile() {
        // Пользователь вводит название файла
        const fileName = prompt("Введите название файла (без расширения):");

        if (fileName) {
            const jsonTabs = JSON.stringify(tabs, null, 2);
            const blob = new Blob([jsonTabs], { type: "application/json" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = fileName + ".json";
            a.click();
        } else {
            alert("Пожалуйста, введите название файла.");
        }
    }

    function loadFromFile() {
        const fileInput = document.getElementById("fileInput");
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const content = e.target.result;

                try {
                    const importedTabs = JSON.parse(content);

                    if (Array.isArray(importedTabs)) {
                        tabs = importedTabs;
                        saveTabsToLocalStorage();
                        updateTabsContainer();
                        console.log("Вкладки загружены из файла:", tabs);
                    } else {
                        alert("Некорректный формат данных в файле. Ожидался JSON массив.");
                    }
                } catch (error) {
                    alert("Произошла ошибка при обработке данных из файла.");
                }
            };

            reader.readAsText(file);
        }
    }

function copy(x) {
    var textArea = document.createElement("textarea");
    textArea.value = tabs[x].link;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);   
    console.log("Текст скопирован в буфер обмена: " + tabs[x].link); 
}

function deleteTab(x) {
    tabs.splice(x,1);
    updateTabsContainer();
}

function Clear() {
    tabs = [];
    saveTabsToLocalStorage();
    updateTabsContainer();
}

function card(x) {
    let list = document.querySelector("#list");
    let group = document.querySelector("#group");
    let card = document.createElement("div");
    card.setAttribute("id", "card");
    let inf = document.createElement("nav");
    inf.setAttribute("id", "inf");
    let inft1 = document.createElement("h2");
    inft1.innerHTML = tabs[x].name;
    let inft2 = document.createElement("p");
    inft2.innerHTML = tabs[x].link;
    let btns = document.createElement("nav");
    btns.setAttribute("id", "btns");
    let btnsb1 = document.createElement("button");
    btnsb1.setAttribute("id", "btn_copy");
    btnsb1.setAttribute("onclick",`copy(${x})`);
    let btnsb2 = document.createElement("a");
    btnsb2.setAttribute("id", "btn_open");
    btnsb2.href = tabs[x].link;
    let b1s = document.createElement("span");
    b1s.className = "iconify";
    b1s.setAttribute("data-icon", "ic:baseline-content-copy");
    let b2s = document.createElement("span");
    b2s.className = "iconify";
    b2s.setAttribute("data-icon", "ic:round-open-in-new");
    let btnsb3 = document.createElement("button");
    btnsb3.setAttribute("id","delete_tab");
    btnsb3.setAttribute("onclick",`deleteTab(${x})`);
    btnsb3.innerHTML = "X";
    // Добавляем элементы к DOM
    list.appendChild(group);
    group.appendChild(card);
    card.appendChild(inf);
    inf.appendChild(inft1);
    inf.appendChild(inft2);
    card.appendChild(btns);
    btns.appendChild(btnsb1);
    btnsb1.appendChild(b1s);
    btns.appendChild(btnsb2);
    btnsb2.appendChild(b2s);
    btns.appendChild(btnsb3);
    
}
    // Функция для обновления отображения содержимого массива
    function updateTabsContainer() {
        //const tabsContainer = document.getElementById("tabsContainer");
        //tabsContainer.innerHTML = "<h3>Текущее содержание массива:</h3><pre>" + JSON.stringify(tabs, null, 2) + "</pre>";
        document.querySelector("#group").innerHTML = "";
        for (var i = 0; i < tabs.length; i++) {
        card(i);
   }
}

    document.addEventListener("DOMContentLoaded", function() {
        if (localStorage.getItem("tabs") == undefined) {
            localStorage.setItem("tabs","First time?");
        } else {
            tabs = JSON.parse(localStorage.getItem("tabs"));
        }
        
        updateTabsContainer();
    });
    

    