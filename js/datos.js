document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const tableBody = document.querySelector("tbody");  
    let editIndex = -1;



    const loadTableData = () => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        renderTable(users);
    };

    //función para guardar o actualizar.
    const saveUser = (user) => {
  
        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (editIndex === -1) {
            users.push(user);
        } else {
            users[editIndex] = user;
            editIndex = 1;
        }
        localStorage.setItem("users", JSON.stringify(users));
        renderTable(users);
    };



    //LISTAR
    //función para mostrar los usuarios en la tabla HTML.
    const renderTable = (users) => {
        
        tableBody.innerHTML = '';
        users.forEach((user, index) => {
            
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${user.email}</td>
                <td>${user.nombre}</td>
                <td>${user.apellido}</td>
                <td>${user.edad}</td>
                <td>
                    <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#Consult" onclick="consultUser(${index})">Consultar</button>
                    <button class="btn btn-danger" onclick="deleteUser(${index})">Eliminar</button>
                    <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#newUserModal" onclick="editUser(${index})">Editar</button>
                </td>
            `;
            // Agraga la fila creada al cuerpo de la tabla.
            tableBody.appendChild(row);
        });
    };




//se dispara cuando se envie el formulario
    form.addEventListener("submit", (e) => {
        ///evita que la pagina se recargue,
        e.preventDefault();
    
        const user = {
            email: document.getElementById("Email").value,
            nombre: document.getElementById("Nombre").value,
            apellido: document.getElementById("Apellido").value,
            edad: document.getElementById("Edad").value
        };
        saveUser(user);
        form.reset();
    });
    //cargar datos
    loadTableData();




    // consultar un usuario.
    window.consultUser = (index) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users[index];
        if (user) {
            document.getElementById("EmailConsult").value = user.email;
            document.getElementById("NombreConsult").value = user.nombre;
            document.getElementById("ApellidoConsult").value = user.apellido;
            document.getElementById("EdadConsult").value = user.edad;
        }
    };



    //ditar un usuario.
    window.editUser = (index) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users[index];
        if (user) {
            document.getElementById("Email").value = user.email;
            document.getElementById("Nombre").value = user.nombre;
            document.getElementById("Apellido").value = user.apellido;
            document.getElementById("Edad").value = user.edad;
            editIndex = index;
        }
    };


    // eliminar un usuario.
    window.deleteUser = (index) => {

        const users = JSON.parse(localStorage.getItem("users")) || [];
    
        users.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(users));
        renderTable(users);
    };
});