
    // typewriter
    function typeWriter(element, text, speed) {
        let i = 0;
        const interval = setInterval(function () {
            element.innerHTML += text.charAt(i);
            i++;
            if (i > text.length) {
                clearInterval(interval);
                setTimeout(function () {
                    deleteText(element, speed);
                }, 2000); // wartezeit text
            }
        }, speed);
    }

    // löschen
    function deleteText(element, speed) {
        let text = element.innerHTML;
        let i = text.length - 1;
        const interval = setInterval(function () {
            element.innerHTML = text.substring(0, i);
            i--;
            if (i < 0) {
                clearInterval(interval);
                // wiederholt alles
                setTimeout(function () {
                    typeWriter(element, "Welcome to TaPa's Kitchen...", speed);
                }, 2000);
            }
        }, speed);
    }

    //  DOM  laden
    document.addEventListener("DOMContentLoaded", function () {
        const targetElement = document.getElementById("typewriter");
        if (targetElement) {
            typeWriter(targetElement, "Welcome to TaPa's Kitchen...", 200);
        }
    });
