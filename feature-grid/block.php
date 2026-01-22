<?php
// Server-side rendering for Feature Grid block

$eyebrow = $attributes['eyebrow'] ?? '';
$title = $attributes['title'] ?? '';
$body = $attributes['body'] ?? '';
$columns = $attributes['columns'] ?? 3;
$items = $attributes['items'] ?? [];

$block_data = [
    'eyebrow' => $eyebrow,
    'title' => $title,
    'body' => $body,
    'columns' => $columns,
    'items' => $items,
    'slug' => 'feature-grid'
];

echo view('blocks.feature-grid', $block_data)->render();
