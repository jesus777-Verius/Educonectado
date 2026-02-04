#!/usr/bin/env node
/**
 * ========================================
 * DESCARGADOR DE IMÁGENES DESDE PEXELS
 * ========================================
 * Script para descargar imágenes de Pexels
 * automáticamente en el proyecto
 *
 * Uso: node download-pexels-images.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Cargar URLs desde pexels-images.json
let imagesToDownload = {};

try {
  const configPath = path.join(__dirname, 'pexels-images.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  imagesToDownload = config.images;
  console.log('✅ Configuración cargada desde pexels-images.json\n');
} catch (err) {
  console.error('❌ Error al cargar pexels-images.json:', err.message);
  console.log('\n📝 Crea el archivo pexels-images.json con las URLs de Pexels');
  process.exit(1);
}

const imagesDir = path.join(__dirname, 'public', 'images');

// Función para descargar una imagen
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(imagesDir, filename);

    // Validar que la URL no sea un placeholder
    if (url.includes('XXXXXXX')) {
      console.log(`⚠️  ${filename} - URL no configurada (placeholder)`);
      resolve();
      return;
    }

    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      // Validar código de estado
      if (response.statusCode !== 200) {
        console.log(`❌ ${filename} - Error ${response.statusCode}`);
        resolve();
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        const size = fs.statSync(filepath).size;
        console.log(`✅ ${filename} (${(size / 1024).toFixed(2)} KB)`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      console.log(`❌ ${filename} - ${err.message}`);
      resolve();
    });
  });
}

// Función principal
async function main() {
  console.log('🔄 Descargando imágenes de Pexels...\n');

  // Verificar que el directorio existe
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  // Descargar todas las imágenes
  const promises = Object.entries(imagesToDownload).map(([filename, url]) =>
    downloadImage(url, filename)
  );

  await Promise.all(promises);

  console.log('\n✅ Descargas completadas');
}

// Ejecutar
main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
