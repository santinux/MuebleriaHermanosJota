const path = require('path');
const fs = require('fs');

let contacts = [];
let contactIdCounter = 1;

// Guardar contactos en archivo JSON
const saveContactsToFile = () => {
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
    const filePath = path.join(dataDir, 'contacts.json');
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));
};

// Cargar contactos desde archivo al iniciar
const loadContactsFromFile = () => {
    const filePath = path.join(__dirname, '../data/contacts.json');
    if (fs.existsSync(filePath)) {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            contacts = JSON.parse(data);
            contactIdCounter = Math.max(...contacts.map(c => c.id), 0) + 1;
        } catch (error) {
            console.error('Error al cargar contactos:', error);
        }
    }
};

// Recibir nuevo contacto
const recibirContacto = (req, res, next) => {
    try {
        const { name, email, message } = req.body;

        // Validaciones
        if (!name || name.trim().length < 2)
            return res.status(400).json({ message: 'Poné un nombre más largo' });
        if (!email || !email.includes('@') || !email.includes('.'))
            return res.status(400).json({ message: 'Ese mail no parece válido' });
        if (!message || message.trim().length < 10)
            return res.status(400).json({ message: 'Escribí un mensaje un poco más largo' });

        const newContact = {
            id: contactIdCounter++,
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            timestamp: new Date().toISOString(),
            status: 'nuevo'
        };

        contacts.push(newContact);
        saveContactsToFile();

        console.log(`Nuevo mensaje de contacto de ${name} (${email}):`);
        console.log(message);

        res.status(201).json({
            success: true,
            message: `¡Gracias ${name}! Te vamos a responder pronto`,
            contactId: newContact.id
        });
    } catch (error) {
        // En caso de error, se envia al manejador de errores
        next(error);
    }
};

// Obtener todos los contactos
const obtenerContactos = (req, res, next) => {
    try {
        const ordenados = contacts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        res.json({
            success: true,
            data: ordenados,
            count: ordenados.length
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    recibirContacto,
    obtenerContactos,
    loadContactsFromFile
};
