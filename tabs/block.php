<?php
// Server-side rendering for Home Tabs Carousel block

$slides = $attributes['slides'] ?? [];
$activeTab = $attributes['activeTab'] ?? 'H';
$isUserInteracting = $attributes['isUserInteracting'] ?? false;
$blockEyebrow = $attributes['blockEyebrow'] ?? '';
$blockTitle = $attributes['blockTitle'] ?? '';
$blockBody = $attributes['blockBody'] ?? '';

// Generate unique block ID for JavaScript
$blockId = uniqid('home-tabs-carousel-');

$block_data = [
    'slides' => $slides,
    'activeTab' => $activeTab,
    'isUserInteracting' => $isUserInteracting,
    'blockId' => $blockId,
    'blockEyebrow' => $blockEyebrow,
    'blockTitle' => $blockTitle,
    'blockBody' => $blockBody,
    'attributes' => $attributes ?? [],
];

echo view('blocks.home-tabs-carousel', $block_data)->render();