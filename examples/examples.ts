import { FocusTrap } from "../src";

const toggleActiveClass = {
    onAfterEnable(trap: FocusTrap) {
        for (const c of trap.containers) {
            c.classList.add("active");
        }
    },
    onAfterDisable(trap: FocusTrap) {
        for (const c of trap.containers) {
            c.classList.remove("active");
        }
    },
};

function onClick(testid: string, cb: VoidFunction) {
    document
        .querySelector(`[data-testid="${testid}"]`)!
        .addEventListener("click", cb, false);
}

function createLink() {
    const newLink = document.createElement("a");
    newLink.href = "#";
    newLink.dataset.testid = "new-link";
    newLink.innerHTML = "new link";

    return newLink;
}

const examples = {
    "/basic.html"() {
        const trap = new FocusTrap({
            ...toggleActiveClass,
            elements: document.querySelectorAll(".container"),
        });

        onClick("focus", () => {
            trap.enable();
        });

        onClick("exit-button", () => {
            trap.disable();
        });
    },
    "/basic.html?outsideClick"() {
        const trap = new FocusTrap({
            ...toggleActiveClass,
            outsideClickDisables: true,
            elements: document.querySelectorAll(".container"),
        });

        onClick("focus", () => {
            trap.enable();
        });

        onClick("exit-button", () => {
            trap.disable();
        });
    },
    "/multi-container.html"() {
        const trap = new FocusTrap({
            ...toggleActiveClass,
            _name: "first",
            elements: document.querySelectorAll(".container"),
        });
        onClick("focus", () => {
            trap.enable();
        });
    },

    "/nested-traps.html"() {
        const trap1 = new FocusTrap({
            ...toggleActiveClass,
            outsideClickDisables: true,
            elements: document.querySelectorAll(".first-group"),
        });

        const trap2 = new FocusTrap({
            ...toggleActiveClass,
            outsideClickDisables: true,
            elements: document.querySelectorAll(".second-group"),
        });

        const trap3 = new FocusTrap({
            ...toggleActiveClass,
            outsideClickDisables: true,
            elements: document.querySelectorAll(".third-group"),
        });

        onClick("focus-first", () => {
            trap1.enable();
        });

        onClick("disable-first", () => {
            trap1.disable();
        });

        onClick("focus-second", () => {
            trap2.enable();
        });

        onClick("disable-second", () => {
            trap2.disable();
        });

        onClick("focus-third", () => {
            trap3.enable();
        });

        onClick("disable-third", () => {
            trap3.disable();
        });
    },

    "/dynamic.html"() {
        const trap = new FocusTrap({
            ...toggleActiveClass,
            _name: "first",
            elements: document.querySelectorAll(".container"),
        });
        onClick("focus", () => {
            trap.enable();
        });

        onClick("prepend-link-to-second", () => {
            const container2 = document.querySelector(
                "[data-testid=container2]",
            );
            container2.insertBefore(createLink(), container2.firstChild);
        });

        onClick("append-link-to-first", () => {
            const container1 = document.querySelector(
                "[data-testid=container1]",
            );
            container1.appendChild(createLink());
        });
    },
};

const fn = examples[window.location.pathname + window.location.search];

if (fn) {
    fn();
}
