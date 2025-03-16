/**
 * @jest-environment jsdom
 */
const fs = require("fs");
const path = require("path");


describe("Pruebas en la página del curso", () => {
  let document;

  beforeAll(() => {
    const html = fs.readFileSync(path.resolve(__dirname, "../views/ver-teoria-curso.ejs"), "utf8");
    document = new DOMParser().parseFromString(html, "text/html");
  });

  test("Debe existir el contenedor principal", () => {
    const contenedor = document.querySelector(".contenedor-principal");
    expect(contenedor).not.toBeNull();
  });

  test("El botón de scroll debe estar oculto inicialmente", () => {
    const scrollButton = document.getElementById("scrollToTop");
    expect(scrollButton.classList.contains("show")).toBe(false);
  });

  test("Debe haber al menos un acordeón si hay temas", () => {
    const acordeones = document.querySelectorAll(".accordion-item");
    expect(acordeones.length).toBeGreaterThan(0);
  });

  test("Cada acordeón debe tener un botón y contenido oculto", () => {
    const acordeones = document.querySelectorAll(".accordion-item");

    acordeones.forEach((acordeon, index) => {
      const boton = acordeon.querySelector(".accordion-button");
      const contenido = acordeon.querySelector(".accordion-content");

      expect(boton).not.toBeNull();
      expect(contenido).not.toBeNull();
      expect(contenido.style.display).toBe("none");
    });
  });

  test("El acordeón debe abrirse y cerrarse correctamente", () => {
    const primerAcordeon = document.querySelector(".accordion-item");
    const boton = primerAcordeon.querySelector(".accordion-button");
    const contenido = primerAcordeon.querySelector(".accordion-content");

    // Simular clic en el botón del acordeón
    boton.click();
    // Esperar un pequeño momento para que la animación surta efecto
    setTimeout(() => {
      expect(contenido.classList.contains('show')).toBe(true); // Verifica que la clase 'show' está presente
    }, 300);

    

    // Simular clic nuevamente para cerrar
    boton.click();
    // Esperar un pequeño momento para que la animación surta efecto
    setTimeout(() => {
        expect(contenido.classList.contains('show')).toBe(false); // Verifica que la clase 'show' no está presente
    }, 300);
  });
});
