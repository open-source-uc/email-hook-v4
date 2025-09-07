# Cloudflare Worker - Hola Mundo y Registro de Emails

Este Cloudflare Worker tiene dos funciones principales:

1. **Responde a solicitudes HTTP**:  
   Cuando se accede a la URL del Worker, devuelve un mensaje de texto simple:  
   **"Hola mundo!"**

2. **Maneja correos electrónicos entrantes**:  
   Cuando el Worker recibe un evento de correo electrónico, guarda la dirección del remitente (`message.from`) en una base de datos llamada `verification_codes`.

> Este Worker está pensado para funcionar con una base de datos ligada mediante el binding `DB` (por ejemplo, una base de datos D1 de Cloudflare).

