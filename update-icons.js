const fs = require('fs');
const path = require('path');

// Mapeo de emojis a Material Icons
const emojiToIcon = {
    '📚': 'menu_book',
    '📊': 'dashboard',
    '👥': 'people',
    '🏢': 'business',
    '📋': 'assignment',
    '💰': 'payments',
    '📈': 'assessment',
    '⚙️': 'settings',
    '🔒': 'security',
    '💬': 'forum',
    '📢': 'campaign',
    '🔌': 'integration_instructions',
    '💾': 'backup',
    '🔧': 'build',
    '🎯': 'grade',
    '📖': 'local_library',
    '🏆': 'emoji_events',
    '⭐': 'star',
    '🏫': 'school',
    '📧': 'email',
    '📱': 'phone',
    '📍': 'location_on',
    '🔔': 'notifications',
    '🎓': 'school',
    '📝': 'edit',
    '✅': 'check_circle',
    '❌': 'cancel',
    '⚠️': 'warning',
    '📁': 'folder',
    '🗂️': 'folder_open',
    '🔍': 'search',
    '➕': 'add',
    '➖': 'remove',
    '✏️': 'edit',
    '🗑️': 'delete',
    '🔄': 'refresh',
    '⬆️': 'arrow_upward',
    '⬇️': 'arrow_downward',
    '⬅️': 'arrow_back',
    '➡️': 'arrow_forward',
    '📅': 'calendar_today',
    '⏰': 'schedule',
    '🌐': 'language',
    '🔗': 'link',
    '📄': 'description',
    '📈': 'trending_up',
    '📉': 'trending_down',
    '🎨': 'palette',
    '🚀': 'rocket_launch',
    '🏃': 'directions_run',
    '🎮': 'sports_esports',
    '🎵': 'music_note',
    '📹': 'videocam',
    '🖼️': 'image',
    '📊': 'bar_chart',
    '📈': 'show_chart',
    '💡': 'lightbulb',
    '🔥': 'local_fire_department',
    '⭐': 'star',
    '🌟': 'star_rate',
    '💎': 'diamond',
    '🎁': 'card_giftcard',
    '🎪': 'festival',
    '🎯': 'my_location',
    '🎲': 'casino',
    '🎭': 'theater_comedy',
    '🎪': 'circus',
    '🎨': 'brush',
    '🖌️': 'format_paint',
    '🖍️': 'edit',
    '✒️': 'gesture',
    '📌': 'push_pin',
    '📍': 'place',
    '🏷️': 'label',
    '🔖': 'bookmark',
    '📎': 'attach_file',
    '📏': 'straighten',
    '📐': 'architecture',
    '🔧': 'build',
    '🔨': 'hammer',
    '⚒️': 'gavel',
    '🔩': 'build_circle',
    '⚙️': 'settings',
    '🔬': 'science',
    '🔭': 'telescope',
    '📡': 'settings_input_antenna',
    '🔋': 'battery_full',
    '🔌': 'power',
    '💡': 'lightbulb',
    '🕯️': 'local_fire_department',
    '🪔': 'emoji_objects',
    '🔥': 'local_fire_department',
    '💧': 'water_drop',
    '❄️': 'ac_unit',
    '🌊': 'waves',
    '🌈': 'rainbow',
    '☀️': 'wb_sunny',
    '🌤️': 'partly_cloudy_day',
    '☁️': 'cloud',
    '🌧️': 'grain',
    '⛈️': 'thunderstorm',
    '🌩️': 'flash_on',
    '🌨️': 'ac_unit',
    '🌬️': 'air',
    '🌪️': 'cyclone',
    '🌫️': 'foggy',
    '☂️': 'umbrella',
    '☔': 'water_drop',
    '⛱️': 'beach_access',
    '❄️': 'ac_unit',
    '⛄': 'ac_unit',
    '☃️': 'ac_unit',
    '⛷️': 'downhill_skiing',
    '🏂': 'downhill_skiing',
    '🏋️': 'fitness_center',
    '🤼': 'sports_martial_arts',
    '🤸': 'sports_gymnastics',
    '🤺': 'sports_martial_arts',
    '🏇': 'sports_kabaddi',
    '🧘': 'self_improvement',
    '🏄': 'surfing',
    '🏊': 'pool',
    '🤽': 'sports_handball',
    '🚣': 'rowing',
    '🧗': 'rock_climbing',
    '🚴': 'sports_score',
    '🚵': 'downhill_skiing',
    '🤸': 'sports_gymnastics',
    '🤼': 'sports_martial_arts',
    '🏌️': 'sports_golf',
    '🏐': 'sports_volleyball',
    '🏀': 'sports_basketball',
    '🏈': 'sports_football',
    '🎾': 'sports_tennis',
    '🥏': 'sports_handball',
    '🎳': 'sports_baseball',
    '🏏': 'cricket',
    '🏑': 'sports_hockey',
    '🏒': 'sports_hockey',
    '🥍': 'sports_handball',
    '🏹': 'sports_archery',
    '🎣': 'phishing',
    '🤿': 'scuba_diving',
    '🥊': 'sports_mma',
    '🥋': 'sports_martial_arts',
    '🎽': 'directions_run',
    '🛹': 'skateboarding',
    '🛷': 'downhill_skiing',
    '🥌': 'sports_kabaddi',
    '🎿': 'downhill_skiing',
    '⛸️': 'ice_skating',
    '🥇': 'emoji_events',
    '🥈': 'emoji_events',
    '🥉': 'emoji_events',
    '🏆': 'emoji_events',
    '🏅': 'military_tech',
    '🎖️': 'military_tech',
    '🏵️': 'local_florist',
    '🎗️': 'favorite',
    '🎫': 'confirmation_number',
    '🎟️': 'confirmation_number',
    '🎪': 'festival',
    '🎭': 'theater_comedy',
    '🎨': 'palette',
    '🎬': 'movie',
    '🎤': 'mic',
    '🎧': 'headphones',
    '🎼': 'music_note',
    '🎹': 'piano',
    '🥁': 'music_note',
    '🎷': 'music_note',
    '🎺': 'music_note',
    '🎸': 'music_note',
    '🪕': 'music_note',
    '🎻': 'music_note',
    '🎲': 'casino',
    '♟️': 'extension',
    '🎯': 'my_location',
    '🎳': 'sports_baseball',
    '🎮': 'sports_esports',
    '🎰': 'casino',
    '🧩': 'extension',
    '🎁': 'card_giftcard',
    '🎀': 'redeem',
    '🎗️': 'favorite',
    '🎟️': 'confirmation_number',
    '🎫': 'confirmation_number',
    '🎪': 'festival',
    '🎭': 'theater_comedy',
    '🎨': 'palette',
    '🎬': 'movie',
    '🎤': 'mic',
    '🎧': 'headphones',
    '🎼': 'music_note',
    '🎹': 'piano',
    '🥁': 'music_note',
    '🎷': 'music_note',
    '🎺': 'music_note',
    '🎸': 'music_note',
    '🪕': 'music_note',
    '🎻': 'music_note',
    '🎲': 'casino',
    '♟️': 'extension',
    '🎯': 'my_location',
    '🎳': 'sports_baseball',
    '🎮': 'sports_esports',
    '🎰': 'casino',
    '🧩': 'extension'
};

// Función para reemplazar emojis en un archivo
function replaceEmojisInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Reemplazar cada emoji con su icono correspondiente
        for (const [emoji, icon] of Object.entries(emojiToIcon)) {
            const regex = new RegExp(emoji.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
            const originalContent = content;
            content = content.replace(regex, `<i class="material-icons">${icon}</i>`);
            if (content !== originalContent) {
                modified = true;
                console.log(`  Replaced ${emoji} with ${icon} in ${path.basename(filePath)}`);
            }
        }
        
        // Si se modificó el contenido, guardar el archivo
        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            return true;
        }
        
        return false;
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
        return false;
    }
}

// Función para procesar recursivamente todos los archivos .ejs
function processDirectory(dirPath) {
    let modifiedCount = 0;
    
    try {
        const items = fs.readdirSync(dirPath);
        
        for (const item of items) {
            const itemPath = path.join(dirPath, item);
            const stat = fs.statSync(itemPath);
            
            if (stat.isDirectory()) {
                // Procesar subdirectorios recursivamente
                modifiedCount += processDirectory(itemPath);
            } else if (item.endsWith('.ejs')) {
                // Procesar archivos .ejs
                if (replaceEmojisInFile(itemPath)) {
                    modifiedCount++;
                }
            }
        }
    } catch (error) {
        console.error(`Error reading directory ${dirPath}:`, error.message);
    }
    
    return modifiedCount;
}

// Función principal
function main() {
    console.log('🔄 Replacing emojis with Material Icons in all EJS files...\n');
    
    const viewsDir = path.join(__dirname, 'views');
    
    if (!fs.existsSync(viewsDir)) {
        console.error('❌ Views directory not found!');
        process.exit(1);
    }
    
    const modifiedCount = processDirectory(viewsDir);
    
    console.log(`\n✅ Process completed!`);
    console.log(`📊 Files modified: ${modifiedCount}`);
    console.log(`🎯 All emojis have been replaced with Material Icons`);
    
    if (modifiedCount === 0) {
        console.log('ℹ️ No files needed modification');
    }
}

// Ejecutar el script
if (require.main === module) {
    main();
}

module.exports = {
    replaceEmojisInFile,
    processDirectory,
    emojiToIcon
};
