<?php
// Server-side rendering for FAQ Accordion block

$eyebrow = $attributes['eyebrow'] ?? '';
$title = $attributes['title'] ?? '';
$body = $attributes['body'] ?? '';
$openFirst = $attributes['openFirst'] ?? true;
$allowMultiple = $attributes['allowMultiple'] ?? false;
$items = $attributes['items'] ?? [];

$block_data = [
    'eyebrow' => $eyebrow,
    'title' => $title,
    'body' => $body,
    'openFirst' => $openFirst,
    'allowMultiple' => $allowMultiple,
    'items' => $items,
    'slug' => 'faq-accordion'
];

echo view('blocks.faq-accordion', $block_data)->render();
