'use strict';

const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

/**
 * Development/sample data for Learn2Program.
 *
 * IMPORTANT:
 * - Run migrations before this seeder.
 * - This seeder is intentionally blocked in production.
 * - It does NOT create or alter tables.
 * - IDs are explicit so relationships are deterministic.
 */

const respuestas = [
  { id: 1, texto: "Permite definir variables de tipo int y float.", esCorrecta: false, idPregunta: 1 },
  { id: 2, texto: "Es una directiva que incluye la biblioteca de entrada/salida estándar.", esCorrecta: true, idPregunta: 1 },
  { id: 3, texto: "Sirve para declarar funciones dentro del programa.", esCorrecta: false, idPregunta: 1 },
  { id: 4, texto: "Es un comentario especial en el código fuente.", esCorrecta: false, idPregunta: 1 },
  { id: 5, texto: "El programa no se compilará correctamente.", esCorrecta: false, idPregunta: 2 },
  { id: 6, texto: "Se generará un error en tiempo de ejecución.", esCorrecta: false, idPregunta: 2 },
  { id: 7, texto: "No es obligatorio, ya que algunas implementaciones lo añaden automáticamente.", esCorrecta: true, idPregunta: 2 },
  { id: 8, texto: "Se mostrará un mensaje de advertencia y el programa se detendrá.", esCorrecta: false, idPregunta: 2 },
  { id: 9, texto: "int edad = 25;", esCorrecta: false, idPregunta: 3 },
  { id: 10, texto: "constant int edad = 25;", esCorrecta: false, idPregunta: 3 },
  { id: 11, texto: "const int edad = 25;", esCorrecta: true, idPregunta: 3 },
  { id: 12, texto: "final int edad = 25;", esCorrecta: false, idPregunta: 3 },
  { id: 13, texto: "int almacena caracteres y double almacena números enteros.", esCorrecta: false, idPregunta: 4 },
  { id: 14, texto: "int almacena números enteros y double almacena números con decimales.", esCorrecta: true, idPregunta: 4 },
  { id: 15, texto: "int puede almacenar valores más grandes que double.", esCorrecta: false, idPregunta: 4 },
  { id: 16, texto: "double solo puede almacenar valores positivos.", esCorrecta: false, idPregunta: 4 },
  { id: 17, texto: "Se generará un error de compilación.", esCorrecta: true, idPregunta: 5 },
  { id: 18, texto: "La variable tomará automáticamente un valor por defecto.", esCorrecta: false, idPregunta: 5 },
  { id: 19, texto: "La variable se convertirá en global.", esCorrecta: false, idPregunta: 5 },
  { id: 20, texto: "No ocurre nada, simplemente no se imprimirá su valor.", esCorrecta: false, idPregunta: 5 },
  { id: 21, texto: "const double PI = 3.14159;", esCorrecta: false, idPregunta: 6 },
  { id: 22, texto: "unsigned int edad = -25;", esCorrecta: true, idPregunta: 6 },
  { id: 23, texto: "char letra = 'A';", esCorrecta: false, idPregunta: 6 },
  { id: 24, texto: "string nombre = \"Juan\";", esCorrecta: false, idPregunta: 6 },
  { id: 25, texto: "Una función en C++ siempre debe devolver un valor.", esCorrecta: false, idPregunta: 7 },
  { id: 26, texto: "Las funciones pueden ser declaradas y definidas en diferentes archivos.", esCorrecta: true, idPregunta: 7 },
  { id: 27, texto: "No es posible que una función tenga parámetros.", esCorrecta: false, idPregunta: 7 },
  { id: 28, texto: "No se pueden llamar funciones dentro de otras funciones.", esCorrecta: false, idPregunta: 7 },
  { id: 29, texto: "Hacen que el código sea más largo.", esCorrecta: false, idPregunta: 8 },
  { id: 30, texto: "Permiten dividir el código en bloques reutilizables y organizados.", esCorrecta: true, idPregunta: 8 },
  { id: 31, texto: "Aumentan el tiempo de ejecución del programa.", esCorrecta: false, idPregunta: 8 },
  { id: 32, texto: "Solo se pueden utilizar dentro del main().", esCorrecta: false, idPregunta: 8 },
  { id: 33, texto: "Que la función no devuelve ningún valor.", esCorrecta: true, idPregunta: 9 },
  { id: 34, texto: "Que la función no recibe parámetros.", esCorrecta: false, idPregunta: 9 },
  { id: 35, texto: "Que la función puede ser llamada sin argumentos.", esCorrecta: false, idPregunta: 9 },
  { id: 36, texto: "Que la función no tiene una implementación.", esCorrecta: false, idPregunta: 9 },
  { id: 37, texto: "array<int> numeros = {1, 2, 3, 4, 5};", esCorrecta: false, idPregunta: 10 },
  { id: 38, texto: "int numeros[5] = {1, 2, 3, 4, 5};", esCorrecta: true, idPregunta: 10 },
  { id: 39, texto: "int[5] numeros = {1, 2, 3, 4, 5};", esCorrecta: false, idPregunta: 10 },
  { id: 40, texto: "numeros = {1, 2, 3, 4, 5};", esCorrecta: false, idPregunta: 10 },
  { id: 41, texto: "10", esCorrecta: false, idPregunta: 11 },
  { id: 42, texto: "9", esCorrecta: true, idPregunta: 11 },
  { id: 43, texto: "11", esCorrecta: false, idPregunta: 11 },
  { id: 44, texto: "0", esCorrecta: false, idPregunta: 11 },
  { id: 45, texto: "arr(2)", esCorrecta: false, idPregunta: 12 },
  { id: 46, texto: "arr[3]", esCorrecta: false, idPregunta: 12 },
  { id: 47, texto: "arr[2]", esCorrecta: true, idPregunta: 12 },
  { id: 48, texto: "arr{3}", esCorrecta: false, idPregunta: 12 },
  { id: 49, texto: "El valor de una variable.", esCorrecta: false, idPregunta: 13 },
  { id: 50, texto: "La dirección de memoria de una variable.", esCorrecta: true, idPregunta: 13 },
  { id: 51, texto: "Un número aleatorio.", esCorrecta: false, idPregunta: 13 },
  { id: 52, texto: "Un tipo de dato especial.", esCorrecta: false, idPregunta: 13 },
  { id: 53, texto: "ptr->value", esCorrecta: false, idPregunta: 14 },
  { id: 54, texto: "*ptr", esCorrecta: true, idPregunta: 14 },
  { id: 55, texto: "&ptr", esCorrecta: false, idPregunta: 14 },
  { id: 56, texto: "ptr.value", esCorrecta: false, idPregunta: 14 },
  { id: 57, texto: "Asignar un nuevo valor a un puntero.", esCorrecta: false, idPregunta: 15 },
  { id: 58, texto: "Indicar que una variable es un puntero.", esCorrecta: false, idPregunta: 15 },
  { id: 59, texto: "Obtener la dirección de memoria de una variable.", esCorrecta: true, idPregunta: 15 },
  { id: 60, texto: "Declarar un puntero a una función.", esCorrecta: false, idPregunta: 15 }
];

module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      // Password for the demo user: 123456
      const passwordHash = await bcrypt.hash('123456', 10);

      await queryInterface.bulkInsert('cursos', [
        {
          id: 1,
          titulo: "Introducción a la Programación en C++",
          descripcion: "si",
          enRevision: false
        }
      ], { transaction });

      await queryInterface.bulkInsert('temas', [
        {
          id: 1,
          titulo: "Tema 1 - Introducción a C++",
          contenido: "<p>C++ es un lenguaje de programación ampliamente utilizado para desarrollar aplicaciones de sistemas, juegos, software de alto rendimiento, y más. Es un lenguaje de propósito general y fue diseñado por Bjarne Stroustrup en los años 70 como una extensión del lenguaje C. C++ introduce conceptos como la programación orientada a objetos (OOP), manejo de memoria y control de bajo nivel.</p>\n<p>Aunque C++ es un lenguaje complejo y poderoso, es importante entender su sintaxis y los principios básicos que lo componen para comenzar a programar de manera efectiva.</p>\n\n<h3>1.1 - Estructura Básica de un Programa en C++</h3>\n<p>La estructura de un programa en C++ es bastante sencilla y consta de algunos elementos esenciales, como la función principal <code>main()</code>, que es el punto de entrada del programa. A continuación, veremos un ejemplo básico de un programa en C++:</p>\n\n<div class=\"bloque-codigo\">\n <pre><code><span class=\"incluir\">#include</span> <span class=\"libreria\"><iostream></span> <span class=\"comentario\">// Librería estándar para entrada/salida</span>\n<span class=\"palabra_clave\">using</span> <span class=\"palabra_clave\">namespace</span> std; <span class=\"comentario\">// Usamos el espacio de nombres estándar</span>\n\n<span class=\"palabra_clave\">int</span> <span class=\"funcion\">main</span>() { <span class=\"comentario\">// Función principal del programa</span>\n <span class=\"incluir\">cout</span> << <span class=\"cadena\">\"¡Hola, Mundo!\"</span> << <span class=\"funcion\">endl</span>; <span class=\"comentario\">// Imprime \"¡Hola, Mundo!\"</span>\n <span class=\"return\">return</span> <span class=\"numero\">0</span>; <span class=\"comentario\">// Devuelve 0, indicando que el programa terminó correctamente</span>\n}\n</code></pre>\n</div>\n\n<p>En este ejemplo, vemos que:</p>\n<ul>\n <li><code>#include <iostream></code>: Esta línea incluye la librería estándar que permite utilizar las funciones de entrada/salida, como <code>cout</code>.</li>\n <li><code>using namespace std;</code>: Utiliza el espacio de nombres estándar, lo que significa que no es necesario escribir <code>std::</code> antes de las funciones o objetos como <code>cout</code>.</li>\n <li><code>int main()</code>: Define la función principal del programa, desde donde comienza la ejecución.</li>\n <li><code>cout << \"¡Hola, Mundo!\"</code>: Imprime el mensaje en la consola.</li>\n <li><code>return 0;</code>: Indica que el programa terminó con éxito.</li>\n</ul>\n\n<h3>1.2 - Conceptos Clave de C++</h3>\n<p>Antes de profundizar más, es importante familiarizarse con algunos conceptos clave en C++:</p>\n<ul>\n <li><strong>Variables:</strong> Son contenedores de datos. C++ tiene varios tipos de datos, como enteros (<code>int</code>), flotantes (<code>float</code>), y cadenas de texto (<code>string</code>).</li>\n <li><strong>Operadores:</strong> C++ ofrece una gran cantidad de operadores para realizar operaciones matemáticas, lógicas, de comparación y más. Algunos ejemplos son <code>+</code>, <code>-</code>, <code>*</code>, <code><</code>, <code>></code>, etc.</li>\n <li><strong>Condicionales:</strong> C++ permite el uso de condicionales, como <code>if</code>, <code>else</code>, y <code>switch</code>, para ejecutar bloques de código dependiendo de una condición.</li>\n <li><strong>Bucles:</strong> Puedes usar bucles como <code>for</code>, <code>while</code>, y <code>do-while</code> para repetir un bloque de código.</li>\n</ul>\n\n<h3>1.3 - Compilación y Ejecución de un Programa en C++</h3>\n<p>Para ejecutar un programa en C++, primero debes compilarlo utilizando un compilador como <strong>g++</strong> o <strong>clang++</strong>.</p>\n\n<h3>1.4 - Conclusión</h3>\n<p>La programación en C++ puede parecer intimidante al principio, pero con la práctica, dominarás los conceptos y la sintaxis del lenguaje.</p>",
          idCurso: 1
        },
        {
          id: 2,
          titulo: "Tema 2 - Variables",
          contenido: "<p>En C++, una variable es un espacio en memoria donde se almacena un valor que puede cambiar durante la ejecución del programa.</p>",
          idCurso: 1
        },
        {
          id: 3,
          titulo: "Tema 3 - Funciones",
          contenido: "<p>Las funciones en C++ permiten dividir un programa en bloques reutilizables y organizados.</p>",
          idCurso: 1
        },
        {
          id: 4,
          titulo: "Tema 4 - Arrays",
          contenido: "<p>Un array es una estructura de datos que permite almacenar varios elementos del mismo tipo.</p>",
          idCurso: 1
        },
        {
          id: 5,
          titulo: "Tema 5 - Punteros",
          contenido: "<p>Los punteros son una herramienta poderosa en C++ para manipular directamente la memoria.</p>",
          idCurso: 1
        },
        {
          id: 6,
          titulo: "Tema 6 - Introducción a la Recursión",
          contenido: "<p>La recursión es una técnica de programación en la que una función se llama a sí misma para resolver un problema.</p>",
          idCurso: 1
        }
      ], { transaction });

      await queryInterface.bulkInsert('test', [
        {
          id: 1,
          titulo: "Test C++",
          idCurso: 1
        }
      ], { transaction });

      await queryInterface.bulkInsert('preguntas', [
        {
          id: 1,
          numero: 1,
          enunciado: "¿Cuál es la función principal de la instrucción #include <iostream> en un programa en C++?",
          retroalimentacion: "La instrucción #include <iostream> se utiliza para incluir la biblioteca estándar de entrada/salida en C++ que permite realizar operaciones como la entrada de datos desde el teclado y la salida de datos hacia la pantalla.",
          idTest: 1
        },
        {
          id: 2,
          numero: 2,
          enunciado: "¿Qué sucede si se omite return 0; en la función main() de un programa en C++?",
          retroalimentacion: "Aunque no es obligatorio, algunas implementaciones de C++ añaden automáticamente return 0; al final de la función main(), indicando una terminación exitosa del programa.",
          idTest: 1
        },
        {
          id: 3,
          numero: 3,
          enunciado: "¿Cuál de las siguientes opciones es una forma correcta de declarar una constante en C++?",
          retroalimentacion: "Las constantes se declaran utilizando la palabra clave const.",
          idTest: 1
        },
        {
          id: 4,
          numero: 4,
          enunciado: "¿Cuál es la diferencia entre una variable int y una double en C++?",
          retroalimentacion: "La principal diferencia es que int almacena números enteros, mientras que double almacena números con decimales.",
          idTest: 1
        },
        {
          id: 5,
          numero: 5,
          enunciado: "¿Qué ocurre si intentas acceder a una variable local fuera de la función donde fue declarada?",
          retroalimentacion: "Las variables locales solo son accesibles dentro de la función en la que se declaran, por lo que intentar acceder fuera de su ámbito generará un error de compilación.",
          idTest: 1
        },
        {
          id: 6,
          numero: 6,
          enunciado: "¿Cuál de las siguientes declaraciones es incorrecta en C++?",
          retroalimentacion: "Una declaración incorrecta sería unsigned int edad = -25; ya que los valores negativos no son válidos para una variable unsigned int.",
          idTest: 1
        },
        {
          id: 7,
          numero: 7,
          enunciado: "¿Cuál de las siguientes afirmaciones sobre funciones en C++ es correcta?",
          retroalimentacion: "Las funciones pueden ser declaradas y definidas en diferentes archivos, lo que permite una organización más clara y modular del código.",
          idTest: 1
        },
        {
          id: 8,
          numero: 8,
          enunciado: "¿Cuál es la principal ventaja de utilizar funciones en C++?",
          retroalimentacion: "Las funciones permiten dividir el código en bloques reutilizables y organizados.",
          idTest: 1
        },
        {
          id: 9,
          numero: 9,
          enunciado: "¿Qué indica la palabra clave void en una función en C++?",
          retroalimentacion: "La palabra clave void indica que la función no devuelve ningún valor.",
          idTest: 1
        },
        {
          id: 10,
          numero: 10,
          enunciado: "¿Cuál de las siguientes opciones es la forma correcta de declarar un array de 5 elementos en C++?",
          retroalimentacion: "La declaración correcta es int numeros[5] = {1, 2, 3, 4, 5};.",
          idTest: 1
        },
        {
          id: 11,
          numero: 11,
          enunciado: "¿Cuál es el índice del último elemento en un array declarado como int valores[10];?",
          retroalimentacion: "En un array de 10 elementos, el índice del último elemento es 9, ya que los índices empiezan desde 0.",
          idTest: 1
        },
        {
          id: 12,
          numero: 12,
          enunciado: "¿Cómo se accede al tercer elemento de un array arr en C++?",
          retroalimentacion: "El tercer elemento de un array se accede usando el índice 2, ya que los índices en C++ comienzan desde 0.",
          idTest: 1
        },
        {
          id: 13,
          numero: 13,
          enunciado: "¿Qué almacena un puntero en C++?",
          retroalimentacion: "Un puntero almacena la dirección de memoria de una variable.",
          idTest: 1
        },
        {
          id: 14,
          numero: 14,
          enunciado: "Si ptr es un puntero a un entero, ¿cómo se obtiene el valor almacenado en la dirección de memoria a la que apunta?",
          retroalimentacion: "Se puede obtener el valor de la dirección de memoria apuntada por el puntero usando el operador de desreferencia *.",
          idTest: 1
        },
        {
          id: 15,
          numero: 15,
          enunciado: "¿Cuál es la función del operador & en el contexto de punteros?",
          retroalimentacion: "El operador & se utiliza para obtener la dirección de memoria de una variable.",
          idTest: 1
        }
      ], { transaction });

      await queryInterface.bulkInsert('respuestas', respuestas, { transaction });

      await queryInterface.bulkInsert('logro', [
        {
          id: 1,
          mensajeMotivacionalCursoOK: '¡Felicidades, has completado el curso con éxito!',
          mensajeMotivacionalCursoKO: 'Lo intentaste, pero no alcanzaste el objetivo, ¡sigue intentándolo!',
          imagen: '/images/logroCurso1.png',
          idCurso: 1
        }
      ], { transaction });

      await queryInterface.bulkInsert('intentos_test', [
        {
          id: 1,
          preguntasAcertadas: 5,
          nota: 8.5,
          terminado: true,
          fechaFin: new Date(2025, 2, 30),
          idTest: 1
        },
        {
          id: 2,
          preguntasAcertadas: 1,
          nota: 4,
          terminado: true,
          fechaFin: new Date(2025, 2, 30),
          idTest: 1
        }
      ], { transaction });

      await queryInterface.bulkInsert('recordatorios', [
        {
          id: 1,
          fecha: '2025-03-26',
          email: 'prueba@ucm.es',
          mensaje: 'Recuerda que tienes que ir empezando a leerte la teoría el tema, para poder hacer el test .',
          asunto: ' RECORDATORIO  - Learn2Program'
        }
      ], { transaction });

      await queryInterface.bulkInsert('usuario', [
        {
          id: 1,
          correo: 'usuario@example.com',
          contraseña: passwordHash
        }
      ], { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete('intentos_pregunta', {
        idIntentoTest: [1, 2]
      }, { transaction });

      await queryInterface.bulkDelete('respuestas', {
        id: { [Op.between]: [1, 60] }
      }, { transaction });

      await queryInterface.bulkDelete('preguntas', {
        idTest: 1
      }, { transaction });

      await queryInterface.bulkDelete('intentos_test', {
        id: [1, 2]
      }, { transaction });

      await queryInterface.bulkDelete('recordatorios', {
        id: 1
      }, { transaction });

      await queryInterface.bulkDelete('logro', {
        id: 1
      }, { transaction });

      await queryInterface.bulkDelete('usuario', {
        id: 1
      }, { transaction });

      await queryInterface.bulkDelete('test', {
        id: 1
      }, { transaction });

      await queryInterface.bulkDelete('temas', {
        idCurso: 1
      }, { transaction });

      await queryInterface.bulkDelete('cursos', {
        id: 1
      }, { transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};