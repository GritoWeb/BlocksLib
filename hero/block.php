<?php
// Server-side rendering for Hero block

$eyebrow = $attributes['eyebrow'] ?? '';
$title = $attributes['title'] ?? '';
$subtitle = $attributes['subtitle'] ?? '';
$backgroundImageId = $attributes['backgroundImageId'] ?? 0;
$backgroundImageUrl = $attributes['backgroundImageUrl'] ?? '';
$backgroundImageAlt = $attributes['backgroundImageAlt'] ?? '';
$overlayColor = $attributes['overlayColor'] ?? '#000000';
$overlayOpacity = $attributes['overlayOpacity'] ?? 40;
$centerContent = $attributes['centerContent'] ?? true;
$primaryButtonLabel = $attributes['primaryButtonLabel'] ?? '';
$primaryButtonUrl = $attributes['primaryButtonUrl'] ?? '';
$primaryButtonTarget = $attributes['primaryButtonTarget'] ?? '_self';
$secondaryButtonLabel = $attributes['secondaryButtonLabel'] ?? '';
$secondaryButtonUrl = $attributes['secondaryButtonUrl'] ?? '';
$secondaryButtonTarget = $attributes['secondaryButtonTarget'] ?? '_self';

$block_data = [
    'eyebrow' => $eyebrow,
    'title' => $title,
    'subtitle' => $subtitle,
    'backgroundImageId' => $backgroundImageId,
    'backgroundImageUrl' => $backgroundImageUrl,
    'backgroundImageAlt' => $backgroundImageAlt,
    'overlayColor' => $overlayColor,
    'overlayOpacity' => $overlayOpacity,
    'centerContent' => $centerContent,
    'primaryButtonLabel' => $primaryButtonLabel,
    'primaryButtonUrl' => $primaryButtonUrl,
    'primaryButtonTarget' => $primaryButtonTarget,
    'secondaryButtonLabel' => $secondaryButtonLabel,
    'secondaryButtonUrl' => $secondaryButtonUrl,
    'secondaryButtonTarget' => $secondaryButtonTarget,
    'slug' => 'hero'
];

echo view('blocks.hero', $block_data)->render();
