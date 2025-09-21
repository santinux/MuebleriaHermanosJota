const products = [
    {
        id: 1,
        name: "Mesa de Comedor Pampa",
        description:
            "Mesa de comedor de madera maciza con acabado rústico. Perfecta para reuniones familiares.",
        price: 45000,
        image: "img/Mesa Comedor Pampa.png",
        category: "mesas",
        featured: true,
        specifications: {
            Material: "Madera de roble macizo",
            Dimensiones: "180cm x 90cm x 75cm",
            Acabado: "Barniz ecológico mate",
            Garantía: "5 años",
        },
    },
    {
        id: 2,
        name: "Silla Artesanal Moderna",
        description:
            "Silla ergonómica con diseño moderno y estructura de madera resistente.",
        price: 12000,
        image: "img/Silla Artesanal Moderna.png",
        category: "sillas",
        featured: true,
        specifications: {
            Material: "Madera de haya",
            Dimensiones: "45cm x 50cm x 82cm",
            "Peso máximo": "120kg",
            Acabado: "Lacado natural",
            Garantía: "3 años",
        },
    },
    {
        id: 3,
        name: "Sillon de Cuero",
        description:
            "Sillon de cuero, ideal para sentarse y ver las series.",
        price: 28000,
        image:
            "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "estanterias",
        featured: true,
        specifications: {
            Material: "Madera de pino tratado",
            Dimensiones: "80cm x 30cm x 180cm",
            Niveles: "5 estantes ajustables",
            Acabado: "Tinte nogal",
            Garantía: "2 años",
        },
    },
    {
        id: 4,
        name: "Cama Matrimonial Elegante",
        description:
            "Cama de matrimonio con cabecero tallado a mano y estructura robusta.",
        price: 65000,
        image:
            "https://images.pexels.com/photos/279746/pexels-photo-279746.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "camas",
        featured: false,
        specifications: {
            Material: "Madera de cedro",
            Tamaño: "200cm x 180cm",
            "Altura cabecero": "120cm",
            Acabado: "Cera natural",
            Garantía: "10 años",
        },
    },
    {
        id: 5,
        name: "Escritorio Costa",
        description:
            "Escritorio funcional con cajones y compartimentos para oficina en casa.",
        price: 32000,
        image: "img/Escritorio Costa.png",
        category: "escritorios",
        featured: false,
        specifications: {
            Material: "Madera de fresno",
            Dimensiones: "120cm x 60cm x 75cm",
            Cajones: "3 cajones con rieles",
            Acabado: "Aceite natural",
            Garantía: "5 años",
        },
    },
    {
        id: 6,
        name: "Sillón Copacabana",
        description:
            "Sillón de estilo moderno y confortable, ideal para interiores y exteriores cubiertos.",
        price: 48000,
        image: "img/Sillón Copacabana.png",
        category: "sillones",
        featured: false,
        specifications: {
            Material: "Estructura de madera maciza y tapizado en tela resistente",
            Dimensiones: "90cm (alto) x 80cm (ancho) x 75cm (profundidad)",
            Acabado: "Barnizado natural y tapizado acolchado",
            Garantía: "2 años",
        },
    },

    {
        id: 7,
        name: "Mesa de Centro ",
        description:
            "Mesa de centro con diseño  único.",
        price: 22000,
        image:
            "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "mesas",
        featured: true,
        specifications: {
            Material: "Madera de teca",
            Diámetro: "90cm",
            Altura: "45cm",
            Acabado: "Pulido espejo",
            Garantía: "4 años",
        },
    },
    {
        id: 8,
        name: "Sillon L",
        description:
            "Sillon en formatos L para espacios amplios.",
        price: 78000,
        image:
            "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400",
        category: "armarios",
        featured: false,
        specifications: {
            Material: "Madera de caoba",
            Dimensiones: "180cm x 60cm x 220cm",
            Puertas: "3 puertas con espejo",
            Acabado: "Laca brillante",
            Garantía: "15 años",
        },
    },
    {
        id: 9,
        name: "Aparador Uspallata",
        description:
            "Aparador de diseño contemporáneo con amplio espacio de guardado.",
        price: 62000,
        image: "img/Aparador Uspallata.png",
        category: "aparadores",
        featured: true,
        specifications: {
            Material: "Madera maciza de roble",
            Dimensiones: "180cm (ancho) x 45cm (profundidad) x 85cm (alto)",
            Puertas: "3 puertas batientes y 2 cajones",
            Acabado: "Laca semimate",
            Garantía: "5 años",
        },
    },
    {
        id: 10,
        name: "Biblioteca Recoleta",
        description: "Biblioteca amplia con estantes regulables y diseño elegante.",
        price: 75000,
        image: "img/Biblioteca Recoleta.png",
        category: "bibliotecas",
        featured: true,
        specifications: {
            Material: "MDF enchapado en nogal",
            Dimensiones: "200cm (alto) x 90cm (ancho) x 35cm (profundidad)",
            Estantes: "5 estantes regulables",
            Capacidad: "Más de 150 libros",
            Garantía: "3 años",
        },
    },
    {
        id: 11,
        name: "Butaca Mendoza",
        description: "Butaca tapizada de estilo moderno, cómoda y versátil.",
        price: 38000,
        image: "img/Butaca Mendoza.png",
        category: "butacas",
        featured: false,
        specifications: {
            Material: "Estructura de madera y tapizado en lino",
            Dimensiones: "95cm (alto) x 70cm (ancho) x 75cm (profundidad)",
            Capacidad: "1 persona",
            Garantía: "2 años",
        },
    },
    {
        id: 12,
        name: "Mesa de Centro Araucaria",
        description:
            "Mesa baja de centro con estilo minimalista y terminación natural.",
        price: 45000,
        image: "img/Mesa de Centro Araucaria.png",
        category: "mesas",
        featured: true,
        specifications: {
            Material: "Madera de araucaria maciza",
            Dimensiones: "120cm (largo) x 60cm (ancho) x 40cm (alto)",
            Forma: "Rectangular",
            Acabado: "Barniz protector transparente",
            Garantía: "3 años",
        },
    },
    {
        id: 13,
        name: "Mesa de Noche Aconcagua",
        description: "Mesa de noche compacta con cajón y espacio de apoyo.",
        price: 27000,
        image: "/img/Mesa de Noche Aconcagua.png",
        category: "mesas de noche",
        featured: true,
        specifications: {
            Material: "MDF enchapado en madera natural",
            Dimensiones: "55cm (alto) x 45cm (ancho) x 40cm (profundidad)",
            Cajones: "1 cajón + 1 estante inferior",
            Acabado: "Laca satinada",
            Garantía: "2 años",
        },
    },
    {
        id: 14,
        name: "Sillas Córdoba",
        description:
            "Sillas de comedor robustas y cómodas, con respaldo ergonómico.",
        price: 16000,
        image: "img/Sillas Córdoba.png",
        category: "sillas",
        featured: true,
        specifications: {
            Material: "Estructura de madera maciza y tapizado en eco-cuero",
            Dimensiones: "95cm (alto) x 45cm (ancho) x 50cm (profundidad)",
            Capacidad: "1 persona",
            Garantía: "2 años",
        },
    },
    {
        id: 15,
        name: "Sofá Patagonia",
        description:
            "Sofá amplio de 3 cuerpos con diseño moderno y gran comodidad.",
        price: 125000,
        image: "img/Sofá Patagonia.png",
        category: "sofás",
        featured: true,
        specifications: {
            Material:
                "Estructura de madera, espuma de alta densidad y tapizado en tela premium",
            Dimensiones: "220cm (ancho) x 95cm (profundidad) x 85cm (alto)",
            Capacidad: "3 personas",
            Garantía: "5 años",
        },
    },
];

module.exports = products;