let div = document.querySelector(".chat-input-textarea");

const sendMsg = async e => {
    e.preventDefault();

    const msg = document.querySelector(".chat-input-textarea").innerHTML.trim();

    if (msg) {
        const res = await fetch('/api/messages', {
            method: "POST",
            body: JSON.stringify({
                text: msg,
                user_generated: true,
            }),
            headers: { "Content-type": "application/json" }
        });

        if (res.ok) {
            window.location.reload();
        } else {
            alert("You suck!");
        }
    }
}

div.addEventListener("keydown", e => {
    if (e.keyCode === 13) {
        sendMsg(e);
    }
})

setTimeout(function() {
    div.focus();
}, 0);

document.querySelector(".send-msg-form").addEventListener("submit", sendMsg);