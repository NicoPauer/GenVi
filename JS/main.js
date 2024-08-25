// Genera in nombre para un video
function generarNombre()
{
    let nombre = "Video_IA_" + document.getElementById("instrucciones").value.replace(/\s/gi, "_");
    // Corrigo el nombre si es muy largo
    if (nombre.length > 38)
    {
        nombre = nombre.replace(nombre.substring(nombre.length / 1.6), "");
    }
    /* Genero salida al nombre, igual es aconsejable que luego lo modifique el usuario 
       pero al menos el nombre cambia con pormpts distintos haciendolos intuitivos.
    */
    return nombre;
}
// Genera partes de Url para audio e imagem del video
function generarUrlAudio(lista)
{
    return lista.join("<AUDIO");
}

function generarUrlImagen(lista)
{
    return lista.join("<IMAGEN")
}
// Obtiene un texto del usuario y lo transforma en un video
function generarVideo(texto)
{
   // Lista de frecuencias
    let frecuencias = abstraerAudio("JS/dataset.json");
   // Lista de colores
    let colores = abstraerImagen("JS/dataset.json");
   // Uso el texto para hacer modificaciones
    for (let entrada in obtenerTexto("JS/dataset.json"))
    {
        let analizar = obtenerTexto("JS/dataset.json")[entrada]["describir"];

        if (analizar.includes(texto))
        {
          /* Por cada coincidencia de texto agrego elemento 
            y reordeno listas */
            colores = (colores.concat(obtenerTexto("JS/dataset.json")[entrada]["imagen"]["0"])).reverse();
            frecuencias = (frecuencias.concat(obtenerTexto("JS/dataset.json")[entrada]["audio"]["0"])).reverse();
        }
    }
   // Agrego video a la web, genero url para video webm
    let url = generarUrlAudio(frecuencias) + generarUrlImagen(colores) + ".webm";
    document.getElementById("contenedor-multimedia").innerHTML = '<source id = "video-ia" type = "video/webm" src = "' + url + '" />';
}
// Descarga el video al dispositivo del usuario
function descargar()
{

    let enlace = document.getElementById("descarga-video");

    enlace.download = generarNombre() + ".webm";

    enlace.href = document.getElementById("video-ia").src;

}
