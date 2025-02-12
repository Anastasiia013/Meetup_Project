// после загрузки ДОМ начинаем отображение контента
document.addEventListener('DOMContentLoaded', () => {
    const eventsNearContainer = document.querySelector('.events-list-filtered'); // контейнер для информации о мероприятиях поблизости (мейн)

    //создаем карточки
    function createFilteredEventCard(event) {
        const isOffline = event.type.toLowerCase() === "offline";

        const eventItem = document.createElement("div");
        eventItem.classList.add("filtered-event-item");

        const eventImgBox = document.createElement("div");
        eventImgBox.classList.add("filtered-event-img-box");

        const eventImg = document.createElement("img");
        eventImg.classList.add("filtered-event-img");
        eventImg.src = event.image;
        eventImg.alt = event.title;

        eventImgBox.appendChild(eventImg);

        const eventTextBox = document.createElement('div');
        eventTextBox.classList.add('filtered-event-text-box')

        const eventTextBoxInfo = document.createElement('div');
        eventTextBoxInfo.classList.add('filtered-event-text-info');

        const eventTitle = document.createElement("a");
        eventTitle.classList.add('filtered-event-title')
        eventTitle.textContent = event.title;

        const eventTheme = document.createElement("div");
        eventTheme.classList.add("filtered-event-theme");

        const eventCategory = document.createElement("p");
        eventCategory.textContent = event.category;

        const eventDistance = document.createElement("p");
        eventDistance.classList.add("filtered-event-distance");
        eventDistance.textContent = `${isOffline ? `(${event.distance} km)` : ""}`;

        eventTheme.append(eventCategory, eventDistance);

        const eventDate = document.createElement("div");
        eventDate.classList.add("filtered-event-date");

        const eventDateText = document.createElement("p");
        eventDateText.textContent = formatDate(event.date);

        eventDate.appendChild(eventDateText);

        const eventInfo = document.createElement("div");
        eventInfo.classList.add("filtered-event-info");

        const eventGuests = document.createElement("div");
        eventGuests.classList.add("filtered-event-guests");

        const guestsCount = document.createElement("p");
        guestsCount.classList.add("filtered-number-of-people");
        guestsCount.textContent = `${event.attendees || 0} going`;

        eventGuests.appendChild(guestsCount);
        eventInfo.appendChild(eventGuests);

        eventItem.appendChild(eventImgBox);
        eventItem.appendChild(eventTextBox);

        eventTextBoxInfo.appendChild(eventDate);
        eventTextBoxInfo.appendChild(eventTitle);
        eventTextBoxInfo.appendChild(eventTheme);
        eventTextBox.appendChild(eventTextBoxInfo)
        eventTextBox.appendChild(eventInfo);

        //добавляем отличный дизайн к онлайн-мероприятиям
        if (!isOffline) {
            const onlineTag = document.createElement("div");
            onlineTag.classList.add("online-event");

            const camIcon = document.createElement("img");
            camIcon.src = "../img/Vector-cam.svg";
            camIcon.alt = "Online event icon";

            const onlineText = document.createElement("p");
            onlineText.textContent = "Online Event";

            onlineTag.appendChild(camIcon);
            onlineTag.appendChild(onlineText);

            //если окно меньше 900пикселей, иконка онлайн мероприятия покажется в блоке текста
            if (window.matchMedia("(max-width:900px)").matches) {
                eventTextBoxInfo.after(onlineTag);
                onlineTag.style.position = 'relative'
            }
            else {
                eventImgBox.appendChild(onlineTag);
            }
        }

        // для оффлайн-мероприятий добавила количество свободных мест(на свое усмотрение)
        if (isOffline) {
            const leftPlaces = document.createElement('p');
            leftPlaces.classList.add('leftSpaces');
            const allPlaces = 200; // представим, что мест всего 200.

            let placesLeft = allPlaces - event.attendees;
            leftPlaces.textContent = `${placesLeft || 50} spots left`;

            const dot = document.createElement('div');
            dot.classList.add('dot')
            dot.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" class="bi bi-dot" viewBox="0 0 16 16"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/></svg>`;

            eventInfo.appendChild(dot)
            eventInfo.appendChild(leftPlaces);
        }

        //возвращаем готовую карточку
        return eventItem;
    }

    // функция отрисовки мероприятий по массиву: создаем для каждого карточку и добавляем в пустой контейнер
    function renderEvents(events) {
        eventsNearContainer.innerHTML = "";
        events.forEach(event => {
            eventsNearContainer.appendChild(createFilteredEventCard(event));
        });
    };

    // работа с фильтрацией мероприятий

    // подтягиваем кнопки фильтрации
    const allFilters = document.querySelectorAll('.filters_list'); //дивы со списком выпадающих фильтров (псевдомассив)
    const activeFiltersAll = document.querySelectorAll('.filter-chosen'); // дивы с тектом активного фильтра (текст и стрелка) - по умолчанию все мероприятия
    const arrowImgs = document.querySelectorAll('.filterImg'); // каретка стрелка вниз
    const filterLis = document.querySelectorAll('.filters_list li'); // все элементы списка фильтров(псевдомассив)

    //создаем массив для хранения всех выбранных фильтров(иначе они перезаписывают один и тот же отфильтрованный массив по очереди)
    let activeFilters = {
        type: "Any type",
        distance: "Any distance",
        category: "Any category",
        date: "Any date"
    };

    // по нажатию на фильтр выпадает меню с фильтрами, разворачивается стрелка и происходит затемнение выбранной категории
    function toggleFiltersLists() {
        activeFiltersAll.forEach((filter, index) => {
            filter.addEventListener('click', (event) => {
                event.stopPropagation();
                filter.classList.toggle('filter-chosen-active');
                arrowImgs[index].classList.toggle('filterImgRotate');
                allFilters[index].classList.toggle('filters-list-active');
            });
        });
    }

    //отдельная функция закрытия списков фильтрации
    function closeFiltersList() {
        activeFiltersAll.forEach((filter, index) => {
            filter.classList.remove('filter-chosen-active');
            arrowImgs[index].classList.remove('filterImgRotate');
            allFilters[index].classList.remove('filters-list-active');
        });
    }

    //функция для превращения строки с расстоянием в км в число
    function extractNumberFromString(str) {
        return parseInt(str.replace(/\D/g, ""), 10) || 0; // \D это все нецифры, global заменит все символы в строке на ничего "", а парсИнт преобразует строку в десятичное число
    }

    // специальная функция фильтрации для онлайн-мероприятий(иначе при онлайн все равно срабатывал фильтр дистанции)
    function checkOnlineFilter(selectedType) {
        const distanceFilterBox = document.getElementById("filter_distance");
        const distanceText = distanceFilterBox.querySelector(".chosen-distance-p");

        if (selectedType === "Online") {
            distanceText.textContent = "Any distance";
            activeFilters.distance = "Any distance";
            distanceFilterBox.classList.add("disabled"); // делаю фильтр неактивным и добавляю стили
        } else {
            distanceFilterBox.classList.remove("disabled");
        }
    }

    // применяем фильтры вместе: создаем новый массив для отфильтрованных мероприятий и пропускаем через все сразу
    function applyFilters() {
        let today = new Date();
        let filteredEvents = eventsStore

            .filter(event => activeFilters.type === "Any type" || event.type.toLowerCase() === activeFilters.type.toLowerCase())

            .filter(event => activeFilters.distance === "Any distance" || event.distance <= extractNumberFromString(activeFilters.distance))

            .filter(event => activeFilters.category === "Any category" || event.category === activeFilters.category)

            .filter(event => {
                if (activeFilters.date === "Any date") return true; //фильтруем всё

                let eventDate = event.date; // создаем переменную с текущей датой 

                if (activeFilters.date === "Today") {
                    return eventDate.toDateString() === today.toDateString();

                } else if (activeFilters.date === "This week") {
                    let endOfWeek = new Date();
                    endOfWeek.setDate(today.getDate() + 7);  //неделя считается от текущего дня. это можно улучшить, но я не успела пока
                    return eventDate >= today && eventDate <= endOfWeek;

                } else if (activeFilters.date === "This month") {
                    return eventDate.getMonth() === today.getMonth() && eventDate.getFullYear() === today.getFullYear();

                } else if (activeFilters.date === "This year") {
                    return eventDate.getFullYear() === today.getFullYear();
                }

                return true; //пропускаем через фильтр

            });

        renderEvents(filteredEvents);  //отрисовываем отфильтрованное

        //если ничего не найдено, выводим сообщение
        if (filteredEvents.length === 0) {
            const failMessage = document.createElement('p');
            failMessage.classList.add('failMessage');
            eventsNearContainer.appendChild(failMessage);
            failMessage.textContent = "No events were found. Try to change the filters..."
        }
    }

    // клик по фильтру вызывает функцию применения фильтрации
    filterLis.forEach(li => {
        li.addEventListener('click', () => {
            const selectedFilter = li.textContent.trim();
            const filterBox = li;

            if (filterBox.classList.contains('type-filter')) {
                activeFilters.type = selectedFilter.trim();  // Обновляем активный фильтр
                applyFilters(); //применяем фильтрацию
                checkOnlineFilter(selectedFilter); //проверяем онлайн-оффлайн
                document.querySelector('.chosen-type-p').textContent = selectedFilter;
                closeFiltersList(); //сворачиваем фильтры после клика

            } else if (filterBox.classList.contains('distance-filter')) {
                activeFilters.distance = selectedFilter.trim();
                applyFilters();
                document.querySelector('.chosen-distance-p').textContent = selectedFilter;
                closeFiltersList();

            } else if (filterBox.classList.contains('category-filter')) {
                activeFilters.category = selectedFilter.trim();
                applyFilters();
                document.querySelector('.chosen-category-p').textContent = selectedFilter;
                closeFiltersList();
            }
            else if (filterBox.classList.contains('date-filter')) {
                activeFilters.date = selectedFilter;
                applyFilters();
                document.querySelector('.chosen-date-p').textContent = selectedFilter;
                closeFiltersList();
            }
        });
    });

    // также сворачиваем фильтры по клику вне области фильтрации
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.filter-chosen') && !event.target.closest('.filters_list')) { //использую closest, так как не работало обычное !==
            closeFiltersList();
        }
    });

    // запускаем функции рендера всех мероприятий и активируем списки фильтров
    toggleFiltersLists();
    renderEvents(eventsStore);
});