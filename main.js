// после загрузки ДОМ начинаем отображение контента
document.addEventListener('DOMContentLoaded', () => {

    const allEventsContainer = document.querySelector(".events-list");
    const onlineEventsContainer = document.querySelector(".upcoming-events-list");

    //создаем карточки
    function createEventCard(event) {
        const isOffline = event.type.toLowerCase() === "offline";

        const eventItem = document.createElement("div");
        eventItem.classList.add("event-item");

        const eventImgBox = document.createElement("div");
        eventImgBox.classList.add("event-img-box");

        const eventImg = document.createElement("img");
        eventImg.classList.add("event-img");
        eventImg.src = event.image;
        eventImg.alt = event.title;

        eventImgBox.appendChild(eventImg);

        const eventTextBox = document.createElement('div');
        eventTextBox.classList.add('event-text-box');

        const eventTextBoxInfo = document.createElement('div');
        eventTextBoxInfo.classList.add('event-text-info');

        const eventTitle = document.createElement("a");
        eventTitle.classList.add('event-title')
        eventTitle.textContent = event.title;

        const eventTheme = document.createElement("p");
        eventTheme.classList.add("event-theme");
        eventTheme.textContent = `${event.category}${isOffline ? ` (${event.distance} km)` : ""}`;

        const eventDate = document.createElement("div");
        eventDate.classList.add("event-date");

        const eventDateIcon = document.createElement("img");
        eventDateIcon.src = "img/SVG.png";
        eventDateIcon.alt = "calendar icon";

        const eventDateText = document.createElement("p");
        eventDateText.textContent = formatDate(event.date);

        eventDate.appendChild(eventDateIcon);
        eventDate.appendChild(eventDateText);

        const eventInfo = document.createElement("div");
        eventInfo.classList.add("event-info");

        const eventGuests = document.createElement("div");
        eventGuests.classList.add("event-guests");

        const guestsIcon = document.createElement("img");
        guestsIcon.src = "img/SVG2.png";
        guestsIcon.alt = "attendees icon";

        const guestsCount = document.createElement("p");
        guestsCount.classList.add("number-of-people");
        guestsCount.textContent = `${event.attendees || 0} going`;

        eventGuests.appendChild(guestsIcon);
        eventGuests.appendChild(guestsCount);

        const eventPrice = document.createElement("div");
        eventPrice.classList.add("event-price");

        const priceIcon = document.createElement("img");
        priceIcon.src = "img/Vector ticket.png";
        priceIcon.alt = "ticket icon";

        const priceText = document.createElement("p");
        priceText.classList.add("price");
        priceText.textContent = "Free";

        eventPrice.appendChild(priceIcon);
        eventPrice.appendChild(priceText);

        eventInfo.appendChild(eventGuests);
        eventInfo.appendChild(eventPrice);

        eventItem.appendChild(eventImgBox);
        eventItem.appendChild(eventTextBox);


        //перерисовываю очередь объектов когда активируются медиазапросы
        if (window.matchMedia("(max-width:900px)").matches) {
            eventTextBox.appendChild(eventDate);
            eventTextBox.appendChild(eventTitle);
            eventTextBox.appendChild(eventTheme);
            eventTextBox.appendChild(eventInfo);
        }
        else {
            eventTextBox.appendChild(eventTitle);
            eventTextBox.appendChild(eventTheme);
            eventTextBox.appendChild(eventDate);
            eventTextBox.appendChild(eventInfo)
        }
        
        //добавляем отличный дизайн к онлайн-мероприятиям
        if (!isOffline) {
            const onlineTag = document.createElement("div");
            onlineTag.classList.add("online-event");

            const camIcon = document.createElement("img");
            camIcon.src = "img/Vector-cam.svg";
            camIcon.alt = "Online event icon";

            const onlineText = document.createElement("p");
            onlineText.textContent = "Online Event";

            onlineTag.appendChild(camIcon);
            onlineTag.appendChild(onlineText);

            if (window.matchMedia("(max-width:900px)").matches) {
                eventTheme.after(onlineTag);
                onlineTag.style.position = 'relative';
            }
            else {
                eventImgBox.appendChild(onlineTag);
            }

        }

        //возвращаем готовую карточку
        return eventItem;
    }

    // функция отрисовки мероприятий по массиву: создаем для каждого карточку и добавляем в пустой контейнер
    function renderEvents(events) {
        allEventsContainer.innerHTML = "";
        onlineEventsContainer.innerHTML = "";

        events.forEach(event => {
            const eventCard = createEventCard(event);
            allEventsContainer.appendChild(eventCard);
            //отдельно фильтруем онлайн-мероприятия в свой контейнер
            if (event.type.toLowerCase() === "online") {
                const onlineEventCard = createEventCard(event);
                onlineEventsContainer.appendChild(onlineEventCard);
            }
        });
    };

    //загружаем контент
    renderEvents(eventsStore);
});