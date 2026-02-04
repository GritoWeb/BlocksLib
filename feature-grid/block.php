<?php
// Server-side rendering for Feature Grid block

$eyebrow = $attributes['eyebrow'] ?? '';
$title = $attributes['title'] ?? '';
$body = $attributes['body'] ?? '';
$columns = $attributes['columns'] ?? 3;
$items = $attributes['items'] ?? [];

// Build grid class
$gridClass = match((int) $columns) {
    2 => 'md:grid-cols-2',
    4 => 'md:grid-cols-4',
    default => 'md:grid-cols-3'
};

// Process items
$processedItems = array_map(function($item) {
    return [
        'iconId' => $item['iconId'] ?? 0,
        'iconUrl' => $item['iconUrl'] ?? '',
        'iconAlt' => $item['iconAlt'] ?? '',
        'title' => $item['title'] ?? '',
        'text' => $item['text'] ?? '',
        'hasIcon' => !empty($item['iconUrl'])
    ];
}, $items);

$block_data = [
    'eyebrow' => $eyebrow,
    'title' => $title,
    'body' => $body,
    'gridClass' => $gridClass,
    'items' => $processedItems,
    'slug' => 'feature-grid'
];

echo view('blocks.feature-grid', $block_data)->render();
