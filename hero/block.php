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

// Process overlay opacity
$overlayOpacityValue = max(0, min(100, (int) $overlayOpacity)) / 100;

// Build alignment classes
$alignmentClass = $centerContent ? 'items-center text-center' : 'items-start text-left';
$buttonAlignment = $centerContent ? 'justify-center' : 'justify-start';

// Check if buttons exist
$hasButtons = !empty($primaryButtonLabel) || !empty($secondaryButtonLabel);

$block_data = [
    'eyebrow' => $eyebrow,
    'title' => $title,
    'subtitle' => $subtitle,
    'backgroundImageId' => $backgroundImageId,
    'backgroundImageUrl' => $backgroundImageUrl,
    'backgroundImageAlt' => $backgroundImageAlt,
    'overlayColor' => $overlayColor,
    'overlayOpacityValue' => $overlayOpacityValue,
    'alignmentClass' => $alignmentClass,
    'buttonAlignment' => $buttonAlignment,
    'primaryButtonLabel' => $primaryButtonLabel,
    'primaryButtonUrl' => $primaryButtonUrl,
    'primaryButtonTarget' => $primaryButtonTarget,
    'secondaryButtonLabel' => $secondaryButtonLabel,
    'secondaryButtonUrl' => $secondaryButtonUrl,
    'secondaryButtonTarget' => $secondaryButtonTarget,
    'hasButtons' => $hasButtons,
    'slug' => 'hero'
];

echo view('blocks.hero', $block_data)->render();
