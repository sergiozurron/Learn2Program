/**
 * @jest-environment jsdom
 */
const fs = require("fs");
const path = require("path");

describe("Pruebas en la página del curso", () => {
  let document;

  beforeAll(() => {
    const html = fs.readFileSync(path.resolve(__dirname, "./curso.html"), "utf8");
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
});
