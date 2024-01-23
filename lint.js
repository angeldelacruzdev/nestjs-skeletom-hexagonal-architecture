const fs = require('fs');
const path = require('path');

const directoryPath = './src/'; // Ruta al directorio principal

function processFile(filePath) {
  try {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error al leer el archivo ${filePath}:`, err);
        return;
      }

      const imports = {};
      const lines = data.split('\n');

      lines.forEach((line) => {
        const match = line.match(/import .* from ['"](.*)['"]/);
        if (match) {
          const importedFile = match[1];
          if (imports[importedFile]) {
            console.warn(
              `El archivo ${importedFile} ha sido importado más de una vez en ${filePath}`,
            );
          } else {
            console.log('No hay archivos duplicados: ', filePath);
            imports[importedFile] = true;
          }
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
}

function processDirectory(dirPath) {
  try {
    fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
      if (err) {
        console.error(`Error al leer el directorio ${dirPath}:`, err);
        return;
      }

      files.forEach((file) => {
        const fullPath = path.join(dirPath, file.name);
        if (file.isDirectory()) {
          processDirectory(fullPath); // Recursivamente procesa subdirectorios
        } else if (file.name === 'index.ts') {
          processFile(fullPath); // Procesa el archivo index.ts
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
}

processDirectory(directoryPath); // Inicia el procesamiento en el directorio principal
