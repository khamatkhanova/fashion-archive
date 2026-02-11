(function () {
  const form = document.getElementById("todoForm");
  const input = document.getElementById("todoInput");
  const list = document.getElementById("todoList");
  const btnClear = document.getElementById("clearAll");
  let tasks = [];

  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    render();
  }
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    const newTask = {id: Date.now(), text, done: false};
    tasks.push(newTask);
    input.value = "";
    save();
    render();

    //text-сообщение, duration-время показа, gravity и position-расп по вертикали и горизонтали
    Toastify({text: "задача добавлена",
      duration: 2500,
      gravity: "top",
      position: "right",
      close: true,
      backgroundColor: "#800020"}).showToast();});


  function render() {
    list.innerHTML = "";
    tasks.forEach(task => {
      const li = document.createElement("li");
      li.classList.add("p");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.done;
      checkbox.classList.add("input-checkbox");
      const text = document.createElement("span");
      text.textContent = task.text;
      if (task.done) text.classList.add("del");
      const delBtn = document.createElement("button");
      delBtn.textContent = "×";
      delBtn.classList.add("nav-a");
      checkbox.addEventListener("change", () => {task.done = !task.done; save(); render();});
      delBtn.addEventListener("click", () => {tasks = tasks.filter(t => t.id !== task.id); save(); render();

        Toastify({text: "задача удалена",
          duration: 2000, gravity: "top",
          position: "right",
          close: true,
          backgroundColor: "#8c1b2c"}).showToast();
      });

      li.appendChild(checkbox);
      li.appendChild(text);
      li.appendChild(delBtn);
      list.appendChild(li);
    });
  }

  function save() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  btnClear.addEventListener("click", () => {

    //title-заголовок окна, text-описание действия, icon-тип окна,
    //showCancelButton и cansel-цвет кнопки да и нет, confirmButtonText и cansel-подписи кнопок
    Swal.fire({
      title: "удалить все задачи?",
      text: "действие необратимо",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#800020",cancelButtonColor: "#555",
      confirmButtonText: "да",ancelButtonText: "нет"
    }).then(result => {
      if (result.isConfirmed) {
        tasks = [];
        save();
        render();

        Toastify({text: "список очищен",
          duration: 2500,
          gravity: "top",
          position: "right",
          close: true,
          backgroundColor: "#800020"}).showToast();
      }
    });
  });
})();