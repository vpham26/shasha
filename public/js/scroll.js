const scrollEl = document.querySelector(".chat-messages");

const scroll = el => {
    el.scrollTo(0, el.scrollHeight);
}

scroll(scrollEl);