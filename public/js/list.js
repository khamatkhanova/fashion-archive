if (["/todos", "/todos/add", "/todos/edit"].includes(window.location.pathname)) {
  const eventSource = new EventSource("/todos/sse");
  eventSource.onmessage = (event)=>{
    const data = JSON.parse(event.data);
    let text = "";
    if (data.event==="create") text="задача добавлена";
    if (data.event==="update") text="задача обновлена";
    if (data.event==="remove") text="задача удалена";
    Toastify({text, duration: 20000, gravity: "top", position: "right",}).showToast();};
}