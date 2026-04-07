"use server";
import { Resend } from 'resend';

// Inicializamos Resend con la variable de entorno
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  // 1. Extraemos los datos
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // Validaciones básicas
  if (!name || !email || !message) {
    return { error: "Todos los campos son obligatorios." };
  }

  try {
    // 2. Disparamos el correo real a través de Resend
    const { data, error } = await resend.emails.send({
      from: 'Portafolio <onboarding@resend.dev>', 

      to: 'armando.ambrosiosoto@gmail.com', 
      subject: `Nuevo mensaje de Portafolio: ${name}`,
     
      text: `Has recibido un nuevo mensaje desde tu portafolio web.\n\nNombre del contacto: ${name}\nCorreo del contacto: ${email}\n\nMensaje:\n${message}`,
      
      replyTo: email 
    });

    if (error) {
      console.error("Error de Resend:", error);
      return { error: "Hubo un fallo con el servidor de correos. Intenta más tarde." };
    }

    // 3. Retornamos el éxito
    return { success: "¡Mensaje enviado con éxito! Te contactaré pronto." };

  } catch (error) {
    console.error("Error interno:", error);
    return { error: "Error del servidor. Por favor, contáctame por redes sociales." };
  }
}