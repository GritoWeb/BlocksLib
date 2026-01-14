<?php
// Server-side rendering for Container block

$backgroundColor = $attributes['backgroundColor'] ?? 'white';
$removePaddingTop = $attributes['removePaddingTop'] ?? false;
$removePaddingBottom = $attributes['removePaddingBottom'] ?? false;

$block_data = [
    'content' => $content ?? '',
    'backgroundColor' => $backgroundColor,
    'removePaddingTop' => $removePaddingTop,
    'removePaddingBottom' => $removePaddingBottom,
    'slug' => 'container'
];

echo view('blocks.container', $block_data)->render();