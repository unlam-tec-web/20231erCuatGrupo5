const productos = [
  {
    id: 1,
    descripcion: "Smart Tv Sansei 55' - TIPO DE PANTALLA: LED - TIPO DE TV: SMART 4K - PULGADAS: 55' - YOUTUBE: SI - APTO NETFLIX: SI - AMAZON PRIME: SI - NAVEGACION INTERNET: SI - JUEGOS: SI - CONTROL PARENTAL: SI",
    precio: 800,
    stock: 10,
    imagen:"https://www.naldo.com.ar/medias/505333.jpg-515Wx515H?context=bWFzdGVyfHJvb3R8MjY3OTd8aW1hZ2UvanBlZ3xoMTAvaDE5Lzk3MTA3ODgyNDc1ODIuanBnfDFiZmU2MTQ1ZTAxY2Q1YTI1Mzg2NGJmYWMxMGUyYTgyOTMwNTRhMGRkMzhmYzc4Yjk4ZGFlZTM5OTE2YmYwOWI",
    nombre: "Sansei TDS22-UIPI",
    marca: "Sansei",
    clasificacion: "Televisores"
    },
  {
    id: 2,
    descripcion: "El Motorola Edge 30 completa la serie que le da nombre. Se trata de un smartphone Android con pantalla AMOLED de 6.5 pulgadas a resolución Full HD+ y tasa de refresco de 144Hz. Potenciado por un procesador Snapdragon 778G+ de Qualcomm, el Motorola Edge 30 cuenta con 8GB de RAM y 128GB de almacenamiento interno.",
    precio: 500,
    stock: 15,
    imagen:"https://www.lavoz.com.ar/resizer/jRDaSteLMh4RMfiD0KFM0BO-p0w=/980x640/smart/filters:quality(75):format(webp)/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/RNQWV7HMPNA2DACYS6HUBWUW3E.jpg",
    nombre:"Motorola Edge 30",
    marca:"Motorola",
    clasificacion:"Celulares"
  },
  {
    id: 3,
    descripcion: "ThinkBook 16 de 4ta generación te ofrece el máximo. Más potencia gracias a su procesador Intel® Core™ de 12va generación. Ahora también con más espacio: la pantalla de 16' es la más grande de la línea ThinkBook, con su resolución de hasta 2,5 K y opciones gráficas avanzadas.",
    precio: 1200,
    stock: 5,
    imagen:"https://www.lenovo.com/medias/lenovo-laptops-thinkbook-16-gen-4-intel-hero.png?context=bWFzdGVyfHJvb3R8MzQ1OTM2fGltYWdlL3BuZ3xoMjEvaGZkLzEzMjU1MTI1OTkxNDU0LnBuZ3xlMGJjMDAyZjIzYzczYmY0YTY3NTlmODcwMDJjZTBhMzg5M2VlMjFlNTNlZWJkZDMyNDA3MTdlNjc3NjhhZWY5",
    nombre: "ThinkBook 16 Gen 4",
    marca: "Lenovo",
    clasificacion:"Portátiles"
  },
  {
    id: 4,
    descripcion: "Auricular con tecnología TWS - Conexión inalámbrica - Rango de frecuencia: 2.4 hz - 2.4 ghz - Autonomía: 3 hs de reproducción - Tiempo de carga: 2 hs - Puerto de carga: Micro USB",
    precio: 100,
    stock: 20,
    imagen:"https://images.fravega.com/f500/72caeb38f29a19a3af8f1d83738132c2.jpg",
    nombre:"Auriculares Candy Spark",
    marca:"Daewoo",
    clasificacion:"Audio"
  },
  {
    id: 5,
    descripcion: "Zoom óptico de 4x sin perder claridad ni calidad de la imagen. Experimentá acercando el objetivo e inmortalizá los detalles",
    precio: 300,
    stock: 8,
    imagen:"https://http2.mlstatic.com/D_NQ_NP_801173-MLA54576221801_032023-O.webp",
    nombre:"Mini cámara",
    marca: "Electroland",
    clasificacion:"Cámaras"
  },
  {
    id: 6,
    descripcion: "Jugá títulos de PS5 y PS4 en discos Blu-ray. También podés descargar juegos digitales de PS5 y PS4 desde PlayStation® Store Experimentá una velocidad sorprendente con una SSD de velocidad ultrarrápida, una inmersión más profunda con soporte para respuesta háptica, gatillos adaptables y audio 3D.",
    precio: 400,
    stock: 12,  
    imagen:"https://stylewatch.vtexassets.com/arquivos/ids/233579-500-auto?v=638188815112030000&width=500&height=auto&aspect=true",
    nombre:"PlayStation 5",
    marca:"Sony",
    clasificacion:"Consolas"
  },
  {
    id: 7,
    descripcion: "El parlante compacto con un gran sonido. El SRS XB13 incluye funciones de sonido asombrosas como EXTRA BASS y un procesador de difusion del sonido para mejorar los graves y propagar mas el sonido. Ademas, gracias a la correa multiposicion, 16 horas de duracion de bateria cuando esta completamente cargado y es resistente al agua y al polvo.",
    precio: 80,
    stock: 18,
    imagen:"https://images.fravega.com/f500/f20792e0c9182452979637ae6785999a.jpg",
    nombre:"EXTRA BASS SRS XB13",
    marca: "Sony",
    clasificacion:"Audio"
  },
  {
    id: 8,
    descripcion: "Tecnología, calidad y sofisticación definen al smartwatch de DT NO.1. Sus diferentes funcionalidades logran que este reloj inteligente se convierta en un nuevo aliado para acompañarte en tu rutina de deporte, trabajo y ocio.",
    precio: 200,
    stock: 10,
    imagen:"https://http2.mlstatic.com/D_NQ_NP_2X_800672-MLA54074914761_022023-F.webp",
    nombre:"Sartwatch DT NO.1 DT100",
    marca:"DT",
    clasificacion:"Accesorios"
  },
  {
    id: 9,
    descripcion: "La Lenovo Tab P12 Pro funciona como una segunda pantalla inalámbrica para tu laptop mientras que también admite entrada táctil y bolígrafo, gracias a Lenovo Project Unity. Una potencia perfecta de entretenimiento, juegos y productividad que está diseñada para su uso en exteriores e interiores, con una batería durante todo el día.",
    precio: 350,
    stock: 6, 
    imagen:"https://www.lenovo.com/medias/mkt-hero.png?context=bWFzdGVyfHJvb3R8MjM1NTEwfGltYWdlL3BuZ3xoNzIvaDBmLzE1ODY4NzEwOTQ0Nzk4LnBuZ3xmNzRmYmVmYmI5YTljMTI0OTY2MzRlNTgzYWRiZjE0MDVmMjI2ODZmN2E0M2FjNjQ5NDRmNjQ1Y2ZmOGVlNWQz",
    nombre:"Lenovo Tab P12 Pro",
    marca: "Lenovo",
    clasificacion:"Tabletas"
  },
  {
    id: 10,
    descripcion: "Imprimí archivos, escaneá documentos y hacé todas las fotocopias que necesités con esta impresora multifunción Epson, siempre lista para facilitar tu rutina de trabajo o estudio.",
    precio: 250,
    stock: 10,
    imagen:"https://http2.mlstatic.com/D_NQ_NP_965805-MLA48319236376_112021-O.webp",
    nombre: "Epson Ecotank L8180",
    marca: "Epson",
    clasificacion:"Impresoras"
  }
];

module.exports = productos;