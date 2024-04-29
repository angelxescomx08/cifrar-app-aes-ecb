export function downloadFile(content: string, fileName: string) {
  // Crear un objeto Blob que contiene el contenido del archivo
  const blob = new Blob([content], { type: "text/plain" });

  // Crear un enlace de descarga
  const downloadLink = document.createElement("a");
  downloadLink.download = fileName;
  downloadLink.href = window.URL.createObjectURL(blob);

  // Simular clic en el enlace para iniciar la descarga
  downloadLink.click();

  // Eliminar el enlace después de la descarga
  downloadLink.remove();

  // Liberar recursos
  window.URL.revokeObjectURL(downloadLink.href);
}
