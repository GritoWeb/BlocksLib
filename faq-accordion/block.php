<?php
// Server-side rendering for FAQ Accordion block

$eyebrow = $attributes['eyebrow'] ?? '';
$title = $attributes['title'] ?? '';
$body = $attributes['body'] ?? '';
$openFirst = $attributes['openFirst'] ?? true;
$allowMultiple = $attributes['allowMultiple'] ?? false;
$items = $attributes['items'] ?? [];

// Process items
$processedItems = array_map(function($item) {
    return [
        'question' => $item['question'] ?? '',
        'answer' => $item['answer'] ?? ''
    ];
}, $items);

$block_data = [
    'eyebrow' => $eyebrow,
    'title' => $title,
    'body' => $body,
    'openFirst' => $openFirst ? 'true' : 'false',
    'allowMultiple' => $allowMultiple ? 'true' : 'false',
    'items' => $processedItems,
    'slug' => 'faq-accordion'
];

echo view('blocks.faq-accordion', $block_data)->render();
