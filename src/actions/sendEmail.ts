// src/actions/sendEmail.ts
"use server";

export async function sendEmail(formData: FormData) {
  // 1. Extraemos los datos del formulario
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  // Validaciones básicas de backend
  if (!name || !email || !message) {
    return { error: "Todos los campos son obligatorios." };
  }

  // 2. Simulamos el tiempo de envío (1.5 segundos) para ver la animación de carga
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // 3. Imprimimos en la consola de tu servidor (VS Code) para comprobar que llegó
  console.log("📨 Nuevo mensaje recibido de tu portafolio:");
  console.log(`Nombre: ${name}`);
  console.log(`Email: ${email}`);
  console.log(`Mensaje: ${message}`);

  // (Nota de Senior: En un entorno real, aquí usarías una librería como Resend o SendGrid 
  // para enviarlo a tu correo real, ¡pero la estructura ya está lista para eso!)

  // 4. Retornamos un mensaje de éxito al frontend
  return { success: "¡Mensaje enviado con éxito! Te contactaré pronto." };
}