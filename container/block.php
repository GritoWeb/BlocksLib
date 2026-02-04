<?php
// Server-side rendering for Container block

$backgroundColor = $attributes['backgroundColor'] ?? 'white';
$removePaddingTop = $attributes['removePaddingTop'] ?? false;
$removePaddingBottom = $attributes['removePaddingBottom'] ?? false;

// Process background color to CSS class
$bgClass = match($backgroundColor) {
    '#0B7D21' => 'bg-[#0B7D21]',
    '#093E21' => 'bg-[#093E21]',
    'white' => 'bg-white',
    default => 'bg-white'
};

// Build padding classes
$paddingClasses = 'px-4';
if (!$removePaddingTop && !$removePaddingBottom) {
    $paddingClasses .= ' py-14 md:py-24';
} elseif ($removePaddingTop && !$removePaddingBottom) {
    $paddingClasses .= ' pb-14 md:pb-24';
} elseif (!$removePaddingTop && $removePaddingBottom) {
    $paddingClasses .= ' pt-14 md:pt-24';
}

$block_data = [
    'content' => $content ?? '',
    'bgClass' => $bgClass,
    'paddingClasses' => $paddingClasses,
    'slug' => 'container'
];

echo view('blocks.container', $block_data)->render();