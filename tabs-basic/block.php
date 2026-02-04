<?php
// Server-side rendering for Tabs (Basic) block

$eyebrow = $attributes['eyebrow'] ?? '';
$title = $attributes['title'] ?? '';
$body = $attributes['body'] ?? '';
$activeTab = $attributes['activeTab'] ?? 0;
$tabs = $attributes['tabs'] ?? [];

// Validate and clamp activeTab
$maxIndex = max(0, count($tabs) - 1);
$activeTab = min(max((int) $activeTab, 0), $maxIndex);

// Process tabs
$processedTabs = array_map(function($tab, $index) use ($activeTab) {
    return [
        'label' => $tab['label'] ?? '',
        'content' => $tab['content'] ?? '',
        'isActive' => $index === $activeTab
    ];
}, $tabs, array_keys($tabs));

$block_data = [
    'eyebrow' => $eyebrow,
    'title' => $title,
    'body' => $body,
    'activeTab' => $activeTab,
    'tabs' => $processedTabs,
    'slug' => 'tabs-basic'
];

echo view('blocks.tabs-basic', $block_data)->render();
