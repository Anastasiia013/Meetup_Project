//массив мероприятий из задания:
const eventsStore = [
    {
        title: "INFJ Personality Type - Coffee Shop Meet & Greet",
        description: "Being an INFJ",
        date: new Date(2025, 2, 23, 15),
        image:
            "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201037w",
        type: "offline",
        attendees: 99,
        category: "Hobbies and Passions",
        distance: 50,
    },
    {
        title:
            "NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and CustomerExperience",
        description: "New York AI Users",
        date: new Date(2025, 1, 23, 11, 30),
        image:
            "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "offline",
        attendees: 43,
        category: "Technology",
        distance: 25,
    },
    {
        title: "Book 40+ Appointments Per Month Using AI and Automation",
        description: "New Jersey Business Network",
        date: new Date(2025, 0, 16, 14),
        image:
            "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format& fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "online",
        category: "Technology",
        distance: 10,
    },
    {
        title: "Dump writing group weekly meetup",
        description: "Dump writing group",
        date: new Date(2025, 2, 13, 11),
        image:
            "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "online", attendees: 77,
        category: "Business",
        distance: 100,
    },
    {
        title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
        description: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
        date: new Date(2025, 2, 14, 11),
        image:
            "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "online",
        attendees: 140,
        category: "Social Activities",
        distance: 75,
    },
    {
        title: "All Nations - Manhattan Missions Church Bible Study",
        description: "Manhattan Bible Study Meetup Group",
        date: new Date(2025, 2, 14, 11),
        image:
            "https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "offline",
        attendees: 89,
        category: "Health and Wellbeing",
        distance: 15,
    },
    // {
    //     title: "Day Trading Idea and Strategy",
    //     description: "",
    //     date: new Date(2025, 5, 16, 10),
    //     image: "https://s3-alpha-sig.figma.com/img/c9a3/4603/b5c47a52c2313e7f6050d9b557277236?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TKKA50P2XqfiQcchjK631LvBSBexvZNdYaZIHG-GLywZxbONlxuUln1gty3PmoxUE-w3Bj84GlD67ZGSfbsKffIkX-qN-9Qp8~MCujmBN5O6BkFgPaeDjemshAraAzJkukxjGE2kU3LVrMirGhvlBc8KSBVeaqGmcyrww2H4ZK88em2~ihEsvUd6FH~t6iQFLERjfbUx-~cTwaItd1NKhWwUyk7-~sdP~batmiX6dlG7Fl6dWzbmx4NTS4XkmWWM5GSDMKnnhXrNC6MdLjS6vic0jQH8Q8fAPELWfRdb7SZ7heZ~zI1CvZw9DPFeaduS-1Pal7JYYm~5fz7dECOlmg__",
    //     type: "offline",
    //     category: "Business",
    //     distance: 5,
    // },
    {
        title: "Tech Talks & Quiz: Next-Gen Database Solutions for Emerging Use Cases",
        description: "",
        date: new Date(2025, 2, 20, 10),
        image: "https://s3-alpha-sig.figma.com/img/0e17/3ed7/a2df0ed9c774978255e7a7189c3ff38d?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=JLHx8Vvz0Alj717zpn~Zf74rwgCn4npIvMtkRXVTeSy6JzOoX2cgW10~uFyw07iJLeTKF8a9cbXSfbOroz3wN-n3p3OC5lqp3FEz0~9U9JPCHvvh3FqB3lHg7gHTjtX4ntJmhdx8L401hvQsFq2MQs7thsiuVELz~g5QXNbOPyiWjfvUHx3dPYApbNTU2ycpDk1PZx~HBAm5zlMKWwi-VEZnwzUMIPBodS14T3xr~qmG2uxXzsDwA16r0WN7ZeLxalZsvehyfflEzTIFUOi~k31tWnzE8yNTkP-ZDtQydDhYaLmM8n~TNe8uaEF3qUW2cgnoHCZdAcye5Z71Cn3qJg__",
        type: "online",
        attendees: 64,
        category: "Technology",
        distance: 35,
    },
    {
        title: "In-person: Deep Dive into RAG Architectures (Food served)",
        description: "",
        date: new Date(2025, 2, 20, 19),
        image: "https://s3-alpha-sig.figma.com/img/defe/76d5/ad5b401ee9713bfc5bd9ba87f884f4d3?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=jgfW94cyiUM7X3me1wz~1FKl8T8D2y1oNCKmM-Y6ATrehTzdzm~gTfFGIV5iEE0idIBd031eL-0m33~6XylPUIDcQpFmWzWnQz-TE-zLfpf4si3aZ7A~UdX21TO0QkIJRdrRJYoQWZ26FQRdhp075Rwg~YwTOgOj-MG-vYJO3sIHwrHaTLwqr~HVWEA3AG5ROuUzaebMgzhknIkB6vyWnLfouv5H4mfR0V70GJTE0Wz2Jb17d-7t00FiTOQdkuYn1TZBBCQwlIfoVCS8GSWOS3RkdcoZaJ7tq3d9h4Ia4wfyrq2K0CWi6sqATV-6-XwW-sSzKU2LtExzSY9hpJMREA__",
        type: "offline",
        category: "Hobbies and Passions",
        distance: 50,
    },
];

// строка поиска по мероприятиям
const searchInput = document.querySelector("#search-input"); // Поле поиска
searchInput.value = ''; //по умолчанию пусто

const searchResultsContainer = document.createElement("div"); // Контейнер для результатов
searchResultsContainer.classList.add("search-results");

searchInput.parentNode.appendChild(searchResultsContainer); // Добавляем контейнер под строку поиска в ДОМ с parentNode
searchResultsContainer.style.display = "none"; // Скрываем при загрузке страницы

// форматируем дату в нужный формат:
function formatDate(date) {
    const options = {
        weekday: "short", // Сокращенный день недели
        month: "short",   // Сокращенный месяц
        day: "numeric",   // Число месяца
        hour: "numeric",  // Час
        minute: "2-digit",// Минуты с нулем
        hour12: true,     // 12-часовой формат
        timeZone: "UTC"   // часовой пояс UTC
    };

    return date.toLocaleString("en-US", options) + " UTC";
}

// Функция для обновления выпадающего списка результатов поиска
function updateSearchResults(searchQuery) {
    searchResultsContainer.innerHTML = ""; // Очищаем список
    searchResultsContainer.style.display = "block";

    if (!searchQuery) {
        searchResultsContainer.style.display = "none"; // Скрываем при пустом вводе
        return;
    }

    const filteredEvents = eventsStore.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredEvents.length === 0) {
        const failedSearch = document.createElement('p');

        failedSearch.classList.add('failMessage');
        failedSearch.style.paddingLeft = '10px';
        searchResultsContainer.appendChild(failedSearch)
        failedSearch.textContent = 'No events were found. Try to change the search...' //сообщение об ошибке, если нет результатов
    }

    // отрисовываем мероприятия в поиске
    filteredEvents.forEach(event => {
        const resultItem = document.createElement("div");
        resultItem.classList.add("search-result-item");

        resultItem.innerHTML = `
        <p class="search-title">${event.title}</p>
        <p class="search-location">${event.type === "offline" ? `${event.distance} km` : "Online Event"}</p>
        <p class="search-date">${formatDate(event.date)}</p>
    `;
        //отображаем мероприятия в поиске
        searchResultsContainer.appendChild(resultItem);

        // очищаем список при клике по мероприятию
        resultItem.addEventListener("click", () => {
            searchInput.value = "";
            searchResultsContainer.style.display = "none";
        });
    });
}

// Обработчик поиска
searchInput.addEventListener("input", (e) => {
    const searchQuery = e.target.value.trim();
    updateSearchResults(searchQuery);
});

// Закроем список при клике вне его
document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !searchResultsContainer.contains(e.target)) {
        searchResultsContainer.style.display = "none";
    }
});