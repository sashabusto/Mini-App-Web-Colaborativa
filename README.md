# Mini-App-Web-Colaborativa
Introducción:
El proyecto consiste en el desarrollo de un sistema web para la gestión de visitas a un edificio. Su objetivo principal es llevar un control eficiente y seguro de las personas que ingresan y egresan del establecimiento. Para ello, se implementa una base de datos que almacena los registros de cada visita, incluyendo datos personales (DNI, nombre, apellido), motivo de ingreso, persona visitada, así como la fecha y hora tanto del ingreso como de la salida.
El sistema está diseñado con medidas de seguridad que restringen el acceso a funciones clave como registrar ingresos o egresos y realizar búsquedas, las cuales solo pueden ser utilizadas por personal previamente autorizado. Este personal debe iniciar sesión mediante un sistema de autenticación que registra las sesiones activas en una base de datos específica (registro_sesiones) y valida al usuario a través de la tabla personal_autorizado.
Además de registrar nuevas visitas y salidas, el sistema permite buscar registros por número de documento (DNI) o por fecha, editar o eliminar registros existentes, y generar reportes en formato PDF con el historial completo de visitas de una persona. Esta funcionalidad permite llevar un control ordenado y detallado de las visitas.

Funcionalidades:
Registro de la entrada de un visitante (nombre, DNI, motivo de visita, hora de ingreso, etc.).
Registro de la salida del visitante (asociada al ingreso previo).
Consulta de visitas mediante filtros por fecha, nombre o motivo.
Edición o eliminación de registros.
Exportación del historial completo de un visitante a pdf.
Inicio de sesión para personal autorizado.
Interfaz simple, clara y responsive, apta para su uso desde distintos dispositivos.

Tecnologías utilizadas:
Frontend: HTML, CSS (con iconos de Bootstrap), JavaScript.
Backend: PHP.
Base de Datos: MySQL
Control de versiones: Git y GitHub.
Gestión de tareas y planificación: Trello.
