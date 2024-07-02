const COHORT = "2405-FTB-ET-WEB-FT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events/`;

const state = {
  events: [],
};

const eventList = document.querySelector("#events");

const addEventForm = document.querySelector("#addEvent");
addEventForm.addEventListener("submit", addEvent);

async function render() {
  await getEvents();
  renderEvents();
}
render();

async function getEvents() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    state.events = json.data;
  } catch (error) {
    console.error(error);
  }
}

function renderEvents() {
  if (!state.events.length) {
    eventList.innerHTML = "<li>No Events.</li>";

    return;
  }
  const eventCards = state.events.map((events) => {
    const li = document.createElement("li");
    li.innerHTML = `<h2>${events.name}</h2>
    <p>${events.description}</p>
    <p>When: ${events.date}</p>
    <p>Where: ${events.address}</p>`;
    return li;
  });
  eventList.replaceChildren(...eventCards);
}

async function addEvent(event) {
  event.preventDefault();

  const date = new Date(addEventForm.date.value);
  let formattedDate = date.toISOString();

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cohortId: 219,
        date: formattedDate,
        description: addEventForm.description.value,
        id: 1233,
        location: addEventForm.location.value,
        name: addEventForm.name.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create event");
    }
    render();
  } catch (error) {
    console.error(error);
  }
}
