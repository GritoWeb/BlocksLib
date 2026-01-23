<?php

add_action('init', function () {
    $blocks = [
        'hero',
        'feature-grid',
        'faq-accordion',
        'tabs-basic',
        'tabs',
    ];

    foreach ($blocks as $block) {
        $blockPath = get_theme_file_path("resources/blocks/{$block}");

        if (file_exists("{$blockPath}/block.json")) {
            register_block_type($blockPath);
        }
    }
});
