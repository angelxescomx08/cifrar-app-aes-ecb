export function readFileContent(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const content = e.target?.result;
      resolve(content as string);
    };

    reader.onerror = function () {
      reject("Error al leer el archivo.");
    };

    reader.readAsText(file);
  });
}
