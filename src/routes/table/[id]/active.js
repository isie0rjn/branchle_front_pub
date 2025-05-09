current = document.querySelector('#current-tile');
current.addEventListener("input", (event) => {

    filter_active(current.value);
});

function filter_active(event) {
    let id = event;
    if (id.length === 0) select_col(id);
    if (id.length === 1) select_col(id);
    if (isNaN(id.charAt(id.length - 1))) select_col(id);

    if (!isNaN(id.charAt(id.length - 1))) add_active_class(id);

    
}

function add_active_class(event) {
    let id = null;
    if (typeof event === "string") {
        id = event;
    }

    if (event === null && id === null) {
        console.log('Both event and id parameters are equal to null')
        return;
    }

    if (document.querySelector('.active')) document.querySelector('.active').classList.remove('active');
    if (document.querySelector('.active-col')) document.querySelector('.active-col').classList.remove('active-col');

    if (id !== null) {
        if (!id_validation(id)) {
            return;
        }

        id = id.toUpperCase();

        const element = document.querySelector(`#${id}`);
        if (!element) {
            console.log(`Element with id ${id} is not found`)
            return
        }
        element.classList.add('active');
        return;
    }



    const element = event.target;
    element.classList.add('active');
    update_active(element.id);
}

function update_active(id) {
    element = document.querySelector('#current-tile');
    element.value = id;
}

function id_validation(id) {
    if (typeof id !== "string") return false;
    if (id.trim() === '') return false;
    return true;
}

function select_col(event) {
    let id = null;
    if (typeof event === "string") {
        id = event;
    }

    if (event === null && id === null) {
        console.log('Both event and id parameters are equal to null')
        return;
    }

    if (document.querySelector('.active')) document.querySelector('.active').classList.remove('active');
    if (document.querySelector('.active-col')) document.querySelector('.active-col').classList.remove('active-col');

    if (id !== null) {
        if (!id_validation(id)) {
            return;
        }

        id = id.toUpperCase();

        const element = document.querySelector(`#${id}`);
        if (!element) {
            console.log(`Element with id ${id} is not found`)
            return
        }
        element.classList.add('active');
        element.parentElement.classList.add('active-col');
        return;
    }

    const element = event.target;
    const column = element.parentElement;

    update_active(element.id);

    element.classList.add('active');
    column.classList.add('active-col');

}
