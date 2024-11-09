const Articulos = require('../models/Articulo')
const nodemailer = require('nodemailer');
const cron = require('node-cron');





// Función para revisar el inventario
const revisarInventario = async() => {
    const results = await Articulos.findAll()
   
         results.map((items) => {
             console.log("HOla",items)
             if(items.cantidad_restante <= items.cantidad_minima){
                 enviarAlerta(items.items, items.cantidad_restante, items.cantidad_minima);
 
             }
         });
   
 };

// Configuración de nodemailer para enviar correos electrónicos
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false
    },

});
// Función para enviar alerta por correo electrónico
const enviarAlerta = (nombreProducto, cantidad, minima) => {
    const mensaje = {
        from: process.env.EMAIL_USER,
        to: 'rincon303@hotmail.com',
        subject: 'Alerta de inventario bajo',
        text: `El producto "${nombreProducto}" está bajo de inventario. Cantidad actual: ${cantidad}. y cantidad minima es ${minima}`,
    };
    
    transporter.sendMail(mensaje, function (error, info){
        if (error) {
            console.error(`Error al enviar el correo: ${error}`);
        } else {
            console.log(`Correo enviado: ${info.response}`);
        }
    });
};

// Programación del servicio para ejecutarse cada hora
cron.schedule('*0 * * * *', () => {
    console.log('Revisando el inventario...');
    revisarInventario();
});

console.log('Servicio de monitoreo de inventario iniciado.');


module.exports ={
    revisarInventario
}