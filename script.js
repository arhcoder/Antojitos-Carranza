document.getElementById("comentarioForm").addEventListener("submit", function (event)
{
    event.preventDefault();

    const comentario = document.querySelector('textarea[name="comentario"]').value;

    fetch("/guardar_comentario",
    {
        method: "POST",
        headers:
        {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ comentario: comentario })
    })
    .then(response => response.text())
    .then(data =>
    {
        alert(data);
        document.querySelector('textarea[name="comentario"]').value = "";
    })
    .catch(error =>
    {
        console.error("Error:", error);
    });
});