#!/bin/bash
# Image Optimization Script
# Converts PNG/JPEG to WebP at 90% quality (virtually indistinguishable from original)

echo "🖼️  Starting Image Optimization..."
echo "=================================="

TOTAL_ORIGINAL=0
TOTAL_OPTIMIZED=0
COUNT=0

# Function to convert file
convert_file() {
    local file="$1"
    local ext="${file##*.}"
    local basename="${file%.*}"
    local webp_file="${basename}.webp"
    
    # Get original size
    local original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
    
    # Convert to WebP with 90% quality (high quality)
    if cwebp -q 90 -resize 1920 0 "$file" -o "$webp_file" 2>/dev/null; then
        local new_size=$(stat -f%z "$webp_file" 2>/dev/null || stat -c%s "$webp_file" 2>/dev/null)
        
        # Calculate savings
        local savings=$(echo "scale=1; ($original_size - $new_size) * 100 / $original_size" | bc)
        local original_mb=$(echo "scale=2; $original_size / 1048576" | bc)
        local new_mb=$(echo "scale=2; $new_size / 1048576" | bc)
        
        echo "✅ $(basename "$file"): ${original_mb}MB → ${new_mb}MB (${savings}% smaller)"
        
        # Remove original file
        rm "$file"
        
        TOTAL_ORIGINAL=$((TOTAL_ORIGINAL + original_size))
        TOTAL_OPTIMIZED=$((TOTAL_OPTIMIZED + new_size))
        COUNT=$((COUNT + 1))
    else
        echo "❌ Failed: $(basename "$file")"
    fi
}

export -f convert_file

# Find and convert all PNG files
echo ""
echo "Converting PNG files..."
find public -type f -name "*.png" ! -path "*/Logo/*" | while read file; do
    convert_file "$file"
done

# Find and convert all JPEG files  
echo ""
echo "Converting JPEG files..."
find public -type f \( -name "*.jpg" -o -name "*.jpeg" \) | while read file; do
    convert_file "$file"
done

echo ""
echo "=================================="
echo "📊 Optimization Complete!"
echo ""

# Show before/after sizes
echo "Before: $(du -sh public_original_backup | cut -f1)"
echo "After:  $(du -sh public | cut -f1)"
