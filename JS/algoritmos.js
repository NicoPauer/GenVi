function coloresPNG(urlImagen)
{
    // Obtiene lista de colores en codigo hexadecimal de cada pixel de imagen remota
    let colores = [];

    fetch(urlImagen).then(respuesta => respuesta.json())
    .then(
            contenido => {
                            /* Algoritmo descompresion para algoritmo deflate de colores RGB 
                               del contenido PNG recibido. */
                            console.log(contenido);
                         }
         );

    return colores;
}

let salvarContenido;

function obtenerTexto(urlJSON)
{
    // Obtiene valor de un JSON remoto seleccionando valor de clave central

    // Copio contenido de JSON remoto
    fetch(urlJSON).then(respuesta => respuesta.json())
    .then(
            contenido => {
                           /* Rescato contenido en variable mas global que
                              la función porque sino no puedo salvar al JSON
                            */
                            salvarContenido contenido;
                         }
         );
    // Devuelvo el JSON con todas las abstracciones de texto
    return salvarContenido;
}

function modificarColor (codigo)
{
    // Aplica una alteracion valida en codigo hexadecimal de color
    let color = codigo.replace(/f|1/gi, "b").replace(/d/, "f").replace(/\d{2}/gi, "f3").replace(/\d|a|b|c|e/gi, "5").replace(/7/, "d").replace(/5f/, "98");
    
   // Devuelve el codigo de color web hexadecimal
    return color;
}

function abstraerAudio(urlJSON)
{
    /* abstrae un conjunto de frecuencias como intermedio valido entre las del audio y alguna
       del dataset.json */

       let grupoDeAudio = obtenerTexto(urlJSON)["0"]["audio"]["0"];

       for (let diferenciaAudio in grupoDeAudio)
       {
           /* Hago diferencia entre mayor y menor para que de una frecuencia positiva que no supere
              las anteriores y sea mayor a cero */
            if (840 >= grupoDeAudio[diferenciaAudio])
            {
                grupoDeAudio = grupoDeAudio.concat(840 - grupoDeAudio[diferenciaAudio]);
            }
            else
            {
                grupoDeAudio = grupoDeAudio.concat(grupoDeAudio[diferenciaAudio] - 840);
            }
       }
     // Devuelvo frecuencias con lo mas nuevo antes para que sea una composicion mas original
       return grupoDeAudio.reverse();
}

function abstraerImagen(urlImagen, urlJSON)
{
    /*

        Toma la url de imagen PNG y otra de un archivo JSON con
        clave un numero mayor o igual a cero y de valor un grupo
        de pixeles guardado para retornar otro grupo de pixeles

        Abstrae una imagen PNG en una lista de
        cadenas de texto.

        El primer elemento de dicha lista es una
        descripcion del grupo y el resto son códigos
        hexadecimales de color.

    */
  // Creo lista con grupo de descripicion y codigos de color en los colores de primera imagen
    let grupoDePixeles = obtenerTexto(urlJSON)["0"]["imagen"]["0"];
  // Creo lista de pixeles  
    let pixeles = coloresPNG(urlImagen);
  // agrego una descripcion al grupo y copio con modificaciones al grupoDepixeles
    for (let colorAlterado in pixeles)
    {
        grupoDePixeles = grupoDePixeles.concat(modificarColor(pixeles[colorAlterado]));
    }
  // Devuelvo el resultado de la abstraccion con lo mas nuevo a mano
    return grupoDePixeles.reverse();
}
