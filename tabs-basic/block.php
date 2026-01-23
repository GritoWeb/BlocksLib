<?php
// Server-side rendering for Tabs (Basic) block

$eyebrow = $attributes['eyebrow'] ?? '';
$title = $attributes['title'] ?? '';
$body = $attributes['body'] ?? '';
$activeTab = $attributes['activeTab'] ?? 0;
$tabs = $attributes['tabs'] ?? [];

$block_data = [
    'eyebrow' => $eyebrow,
    'title' => $title,
    'body' => $body,
    'activeTab' => $activeTab,
    'tabs' => $tabs,
    'slug' => 'tabs-basic'
];

echo view('blocks.tabs-basic', $block_data)->render();
