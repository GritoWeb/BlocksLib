# 📦 Gutenberg Block Creation Guide - BlocksLib

**Repository:** GritoWeb/BlocksLib  
**Architecture:** WordPress Gutenberg + Sage Theme + Blade Templates + React

This document provides comprehensive instructions for creating custom Gutenberg blocks following the established project architecture. Use this as a reference when generating new blocks.

---

## 🏗️ Architecture Overview

Each block consists of **4 core files** organized in a specific structure:

```
resources/blocks/{block-name}/
├── block.json       # Block configuration and metadata
├── block.jsx        # React editor component (Gutenberg UI)
├── block.php        # Server-side rendering controller
└── block.js         # (Optional) Frontend JavaScript

resources/views/blocks/
└── {block-name}.blade.php  # Blade template for rendering
```

### ⚠️ Critical: Block Registration

**IMPORTANT:** After creating the `block.jsx` file, you **MUST** import it in your theme's editor JavaScript file:

**File:** `/your-theme-name/resources/js/editor.js`

```javascript
// Import your block
import '../blocks/{block-name}/block.jsx';
```

**Example:**
```javascript
// resources/js/editor.js
import '../blocks/container/block.jsx';
import '../blocks/home-tabs-carousel/block.jsx';
import '../blocks/button/block.jsx';
// Add your new block here
import '../blocks/your-new-block/block.jsx';
```

**Without this import, your block will NOT appear in the Gutenberg editor!**

### ⚠️ Critical: PHP Block Registrar (Required)

All blocks must be registered via a dedicated registrar file located at:

**File:** `app/blocks.php`

```php
<?php

add_action('init', function () {
  $blocks = [
    'hero',
    'feature-grid',
    'faq-accordion',
    'tabs',
  ];

  foreach ($blocks as $block) {
    $blockPath = get_theme_file_path("resources/blocks/{$block}");

    if (file_exists("{$blockPath}/block.json")) {
      register_block_type($blockPath);
    }
  }
});
```

**IMPORTANT:** This file must be loaded in `functions.php` using the following pattern:

```php
collect(['setup', 'filters', 'blocks'])
  ->each(function ($file) {
    if (! locate_template($file = "app/{$file}.php", true, true)) {
      wp_die(
        /* translators: %s is replaced with the relative file path */
        sprintf(__('Error locating <code>%s</code> for inclusion.', 'sage'), $file)
      );
    }
  });
```

---

## 📋 Block Structure Requirements

### 1. **block.json** - Block Configuration

**Purpose:** Defines block metadata, attributes, and WordPress registration settings.

**Required Fields:**
- `name`: Must follow pattern `sage/{block-name}` (kebab-case)
- `title`: Human-readable block name
- `category`: WordPress block category (`design`, `text`, `media`, `widgets`, `theme`, `embed`)
- `icon`: WordPress Dashicon name or custom SVG
- `description`: Brief block description
- `textdomain`: Always `"sage"`
- `editorScript`: Always `"file:./block.jsx"`
- `render`: Always `"file:./block.php"`
- `attributes`: Object defining block data structure
- `supports`: Block capabilities configuration

**Common Attribute Types:**
```json
{
  "attributes": {
    "stringField": {
      "type": "string",
      "default": ""
    },
    "booleanField": {
      "type": "boolean",
      "default": false
    },
    "numberField": {
      "type": "number",
      "default": 0
    },
    "arrayField": {
      "type": "array",
      "default": []
    },
    "objectField": {
      "type": "object",
      "default": {}
    }
  }
}
```

**Common Support Options:**
```json
{
  "supports": {
    "align": ["wide", "full"],      // Alignment options
    "html": false,                   // Disable HTML editing
    "anchor": true,                  // Enable anchor/ID
    "customClassName": true,         // Custom CSS class
    "spacing": {                     // Spacing controls
      "margin": true,
      "padding": true
    }
  }
}
```

**Example - Simple Block:**
```json
{
  "name": "sage/container",
  "title": "Container",
  "category": "design",
  "icon": "block-default",
  "description": "Custom Container block",
  "textdomain": "sage",
  "editorScript": "file:./block.jsx",
  "render": "file:./block.php",
  "attributes": {
    "backgroundColor": {
      "type": "string",
      "default": "white"
    },
    "removePaddingTop": {
      "type": "boolean",
      "default": false
    },
    "removePaddingBottom": {
      "type": "boolean",
      "default": false
    }
  },
  "supports": {
    "align": ["wide", "full"],
    "html": false
  }
}
```

**Example - Complex Block with Arrays:**
```json
{
  "name": "sage/home-tabs-carousel",
  "title": "Home Tabs Carousel",
  "category": "design",
  "icon": "slides",
  "description": "Interactive tabs carousel with auto-advancing slides",
  "textdomain": "sage",
  "editorScript": "file:./block.jsx",
  "render": "file:./block.php",
  "attributes": {
    "slides": {
      "type": "array",
      "default": [
        {
          "tabLetter": "H",
          "title": "",
          "content": "",
          "imageId": 0,
          "imageUrl": "",
          "imageAlt": "",
          "primaryButtonLabel": "",
          "primaryButtonUrl": "",
          "primaryButtonTarget": "_self"
        }
      ]
    },
    "activeTab": {
      "type": "number",
      "default": 0
    }
  },
  "supports": {
    "align": ["wide", "full"],
    "html": false
  }
}
```

---

### 2. **block.jsx** - React Editor Component

**Purpose:** Defines the block's appearance and controls in the Gutenberg editor.

**Required Imports:**
```jsx
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
```

**Common Editor Components:**
- `RichText` - Rich text editing
- `InnerBlocks` - Nested block support
- `MediaUpload` - Media library integration
- `ColorPalette` - Color picker
- `ToggleControl` - Boolean toggle
- `TextControl` - Text input
- `SelectControl` - Dropdown select
- `RangeControl` - Number slider
- `Button` - Action buttons

**Structure Pattern:**
```jsx
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, ToggleControl } from '@wordpress/components';

registerBlockType('sage/{block-name}', {
    edit: ({ attributes, setAttributes }) => {
        const { attribute1, attribute2 } = attributes;
        const blockProps = useBlockProps({
            className: '{block-name}-editor'
        });

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Settings" initialOpen={true}>
                        {/* Inspector controls here */}
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <div className="editor-wrapper bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 p-8">
                        <h3>{Block Title}</h3>
                        {/* Editor content here */}
                    </div>
                </div>
            </>
        );
    },
    
    save: () => {
        const blockProps = useBlockProps.save();
        return (
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        );
    }
});
```

**Example - Container Block:**
```jsx
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, ToggleControl } from '@wordpress/components';

registerBlockType('sage/container', {
    edit: ({ attributes, setAttributes }) => {
        const { backgroundColor, removePaddingTop, removePaddingBottom } = attributes;
        
        const blockProps = useBlockProps({
            className: 'container-block-editor'
        });

        const colors = [
            { name: 'White', color: 'white' },
            { name: 'Light Green', color: '#0B7D21' },
            { name: 'Dark Green', color: '#093E21' }
        ];

        const getBackgroundColor = () => {
            return backgroundColor || 'white';
        };
        
        return (
            <>
                <InspectorControls>
                    <PanelBody title="Background Color" initialOpen={true}>
                        <ColorPalette
                            colors={colors}
                            value={getBackgroundColor()}
                            onChange={(color) => setAttributes({ backgroundColor: color || 'white' })}
                            disableCustomColors={true}
                            clearable={false}
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            Current: <span className="font-semibold">{getBackgroundColor()}</span>
                        </p>
                    </PanelBody>

                    <PanelBody title="Padding Options" initialOpen={true}>
                        <ToggleControl
                            label="Remove Padding Top"
                            checked={removePaddingTop}
                            onChange={(value) => setAttributes({ removePaddingTop: value })}
                            help={removePaddingTop ? 'Top padding removed' : 'Top padding active'}
                        />
                        <ToggleControl
                            label="Remove Padding Bottom"
                            checked={removePaddingBottom}
                            onChange={(value) => setAttributes({ removePaddingBottom: value })}
                            help={removePaddingBottom ? 'Bottom padding removed' : 'Bottom padding active'}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <div className="hero-block-editor mb-10 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 pt-0 pb-8 px-8">
                        <h3>Container</h3>
                        <InnerBlocks />
                    </div>
                </div>
            </>
        );
    },
    
    save: () => {
        const blockProps = useBlockProps.save();
        return (
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        );
    }
});
```

**Editor Styling Convention:**
- Use wrapper with class: `bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 p-8`
- Add descriptive title with `<h3>` tag
- Use consistent spacing and padding

---

### 3. **block.php** - Server-Side Rendering & Logic

**Purpose:** Controller that processes all data, applies business logic, and prepares variables for the Blade template.

**⚠️ CRITICAL RULE:** **ALL PHP logic must be in `block.php`**. The Blade template should **ONLY** render pre-processed variables.

**Required Pattern:**
```php
<?php
// Server-side rendering for {Block Name}

// 1. Extract attributes with defaults
$attribute1 = $attributes['attribute1'] ?? 'default_value';
$attribute2 = $attributes['attribute2'] ?? false;

// 2. Process/transform data (ALL logic here)
$processedValue = someFunction($attribute1);
$cssClasses = buildCssClasses($attribute2);

// 3. Prepare final data array for Blade
$block_data = [
    'content' => $content ?? '',
    'attribute1' => $attribute1,
    'processedValue' => $processedValue,
    'cssClasses' => $cssClasses,
    'slug' => '{block-name}'
];

// 4. Render view
echo view('blocks.{block-name}', $block_data)->render();
```

**Example - Container Block with Full Processing:**
```php
<?php
// Server-side rendering for Container block

// Extract attributes
$backgroundColor = $attributes['backgroundColor'] ?? 'white';
$removePaddingTop = $attributes['removePaddingTop'] ?? false;
$removePaddingBottom = $attributes['removePaddingBottom'] ?? false;

// Process background color to CSS class
$bgClass = match($backgroundColor) {
    '#0B7D21' => 'bg-[#0B7D21]',
    '#093E21' => 'bg-[#093E21]',
    'white' => 'bg-white',
    default => 'bg-white'
};

// Build padding classes
$paddingClasses = 'px-4';
if (!$removePaddingTop && !$removePaddingBottom) {
    $paddingClasses .= ' py-14 md:py-24';
} elseif ($removePaddingTop && !$removePaddingBottom) {
    $paddingClasses .= ' pb-14 md:pb-24';
} elseif (!$removePaddingTop && $removePaddingBottom) {
    $paddingClasses .= ' pt-14 md:pt-24';
}

// Prepare data for Blade (all logic complete)
$block_data = [
    'content' => $content ?? '',
    'bgClass' => $bgClass,
    'paddingClasses' => $paddingClasses,
    'slug' => 'container'
];

echo view('blocks.container', $block_data)->render();
```

**Key Points:**
- **Extract** all attributes with `??` defaults
- **Process** all logic, conditionals, and transformations
- **Build** CSS classes, format data, call WordPress functions
- **Pass** only final, ready-to-render variables to Blade
- Blade receives clean variables and just outputs them

---

### 4. **{block-name}.blade.php** - Frontend Template

**Purpose:** Render the block's HTML output using **ONLY** pre-processed variables from `block.php`.

**Location:** `resources/views/blocks/{block-name}.blade.php`

**⚠️ CRITICAL RULES:**
1. **NO `@php` blocks** for logic, conditionals, or transformations
2. **NO** default value assignments (`??`)
3. **NO** `match()`, complex conditionals, or data processing
4. **ONLY** render variables that are already prepared by `block.php`
5. Use **simple `@if`** directives to check if variables exist/are truthy

**✅ CORRECT Pattern - Clean Blade (Presentation Only):**
```blade
<div class="{{ $bgClass }}">
    <div class="container mx-auto {{ $paddingClasses }}">
        {!! $content !!}
    </div>
</div>
```

**✅ CORRECT Pattern - With Conditionals:**
```blade
<section class="py-16">
  <div class="container mx-auto px-6">
    @if($eyebrow)
      <p class="text-xs uppercase tracking-widest text-gray-500">{!! $eyebrow !!}</p>
    @endif
    
    @if($title)
      <h2 class="text-3xl font-bold mt-2">{!! $title !!}</h2>
    @endif
    
    @if($imageId)
      {!! wp_get_attachment_image($imageId, 'full', false, ['alt' => $imageAlt, 'class' => 'w-full rounded-lg']) !!}
    @endif
  </div>
</section>
```

**❌ WRONG Pattern - Logic in Blade (DO NOT DO THIS):**
```blade
{{-- ❌ NO PHP BLOCKS --}}
@php
  $bgColor = $backgroundColor ?? 'white';
  $bgClass = match($bgColor) {
    '#0B7D21' => 'bg-[#0B7D21]',
    'white' => 'bg-white',
    default => 'bg-white'
  };
@endphp

{{-- ❌ NO DEFAULT ASSIGNMENTS --}}
@php
  $eyebrow = $eyebrow ?? '';
  $title = $title ?? '';
@endphp

{{-- ❌ NO CONDITIONALS OR TRANSFORMATIONS --}}
@php
  $paddingClasses = 'px-4';
  if (!$removePaddingTop) {
    $paddingClasses .= ' pt-14';
  }
@endphp
```

**Example - Container Block (Clean Blade):**
```blade
<div class="{{ $bgClass }}">
    <div class="container mx-auto {{ $paddingClasses }}">
        {!! $content !!}
    </div>
</div>
```

**Example - Content Block with Multiple Conditionals:**
```blade
<section class="py-16">
  <div class="container mx-auto px-6 max-w-4xl">
    @if($eyebrow)
      <p class="text-xs uppercase tracking-widest text-gray-500">{!! $eyebrow !!}</p>
    @endif
    
    @if($title)
      <h2 class="text-3xl font-bold mt-2">{!! $title !!}</h2>
    @endif
    
    @if($text)
      <p class="text-gray-600 mt-4">{!! $text !!}</p>
    @endif
    
    @if($imageId)
      <div class="mb-10">
        {!! wp_get_attachment_image($imageId, 'full', false, ['alt' => $imageAlt, 'class' => $imageClass]) !!}
      </div>
    @endif
    
    @if($showParagraphs)
      <div class="{{ $gridClasses }}">
        @if($paragraph1)
          <div class="prose prose-gray">
            <p>{!! $paragraph1 !!}</p>
          </div>
        @endif
        
        @if($paragraph2)
          <div class="prose prose-gray">
            <p>{!! $paragraph2 !!}</p>
          </div>
        @endif
      </div>
    @endif
  </div>
</section>
```

**All logic for this example would be in `block.php`:**
```php
<?php
// Server-side rendering

$eyebrow = $attributes['eyebrow'] ?? '';
$title = $attributes['title'] ?? '';
$text = $attributes['text'] ?? '';
$imageId = $attributes['imageId'] ?? 0;
$imageAlt = $attributes['imageAlt'] ?? '';
$paragraph1 = $attributes['paragraph1'] ?? '';
$paragraph2 = $attributes['paragraph2'] ?? '';

// Process logic
$imageClass = 'w-full h-auto rounded-lg shadow-lg';
$showParagraphs = !empty($paragraph1) || !empty($paragraph2);
$gridClasses = 'grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8';

$block_data = [
    'eyebrow' => $eyebrow,
    'title' => $title,
    'text' => $text,
    'imageId' => $imageId,
    'imageAlt' => $imageAlt,
    'imageClass' => $imageClass,
    'paragraph1' => $paragraph1,
    'paragraph2' => $paragraph2,
    'showParagraphs' => $showParagraphs,
    'gridClasses' => $gridClasses,
    'slug' => 'content-block'
];

echo view('blocks.content-block', $block_data)->render();
```

**Key Points:**
- **Extract** all attributes with defaults in `block.php`
- **Process** all conditionals, transformations, and logic in `block.php`
- **Build** CSS classes, check conditions, format data in `block.php`
- **Pass** only final variables to Blade
- **Blade** just renders with simple `@if` checks and `{{ }}` output

**Array/Loop Handling Example:**

`block.php`:
```php
<?php
$items = $attributes['items'] ?? [];

// Process items if needed
$processedItems = array_map(function($item) {
    return [
        'title' => $item['title'] ?? '',
        'content' => $item['content'] ?? '',
        'imageId' => $item['imageId'] ?? 0,
        'imageAlt' => $item['imageAlt'] ?? '',
        'hasImage' => !empty($item['imageId'])
    ];
}, $items);

$block_data = [
    'items' => $processedItems,
    'slug' => 'carousel'
];

echo view('blocks.carousel', $block_data)->render();
```

`carousel.blade.php`:
```blade
<div class="carousel">
    @foreach($items as $index => $item)
        <div class="slide" data-index="{{ $index }}">
            @if($item['title'])
                <h3>{{ $item['title'] }}</h3>
            @endif
            
            @if($item['content'])
                <p>{{ $item['content'] }}</p>
            @endif
            
            @if($item['hasImage'])
                {!! wp_get_attachment_image($item['imageId'], 'full', false, ['alt' => $item['imageAlt']]) !!}
            @endif
        </div>
    @endforeach
</div>
```

---

## 🎯 Block Creation Checklist

When creating a new block, ensure:

### ✅ File Structure
- [ ] Create folder in `resources/blocks/{block-name}/`
- [ ] Create `block.json` with all required fields
- [ ] Create `block.jsx` with edit and save functions
- [ ] Create `block.php` with attribute extraction and view call
- [ ] Create `{block-name}.blade.php` in `resources/views/blocks/`
- [ ] **Import block in `resources/js/editor.js`** ⚠️ CRITICAL!
- [ ] Ensure `app/blocks.php` registers the new block slug

### ✅ block.json
- [ ] Unique name: `sage/{block-name}`
- [ ] Descriptive title and description
- [ ] Appropriate category and icon
- [ ] All attributes defined with types and defaults
- [ ] Supports configuration appropriate for block type
- [ ] `editorScript: "file:./block.jsx"`
- [ ] `render: "file:./block.php"`

### ✅ block.jsx
- [ ] Import necessary WordPress packages
- [ ] Register block with correct name
- [ ] Destructure attributes in edit function
- [ ] Use `useBlockProps()` correctly
- [ ] InspectorControls for settings
- [ ] Editor UI with visual feedback
- [ ] Consistent editor styling (blue gradient wrapper)
- [ ] For links, use `LinkControl` (never plain text inputs for URLs)
- [ ] Save function returning correct structure

### ✅ block.php
- [ ] Extract all attributes with defaults using `??`
- [ ] **Process ALL logic, conditionals, and transformations**
- [ ] Build CSS classes and compute derived values
- [ ] Process arrays/loops if needed
- [ ] Build `$block_data` array with all **final, ready-to-render** values
- [ ] Include `$content` if using InnerBlocks
- [ ] Include `slug` for targeting
- [ ] Call view with correct template name

### ✅ Blade Template
- [ ] **NO `@php` blocks for logic or data processing**
- [ ] **NO** default value assignments (`??`)
- [ ] **NO** `match()`, complex conditionals, or transformations
- [ ] Handle all passed attributes (already processed by `block.php`)
- [ ] Use **simple `@if` directives** only for rendering conditionals
- [ ] Render content with `{!! $content !!}` if needed
- [ ] **Use CSS variables from `wp-resources/css/variables.css` for colors and fonts** ⚠️
- [ ] Use Tailwind CSS classes consistently
- [ ] Render images using `wp_get_attachment_image()` when an image ID is available
- [ ] Responsive design considerations (md:, lg: breakpoints)

---

## 🎨 CSS Variables & Design System

**⚠️ CRITICAL:** Always reference the centralized CSS variables file for colors, fonts, and design tokens.

**File:** `wp-resources/css/variables.css`

### Color & Font Usage Rules:

1. **Check `variables.css` FIRST** before adding colors or fonts
2. **Use CSS custom properties** (variables) instead of hardcoded values
3. **Never hardcode** hex colors, font families, or spacing values that exist in variables
4. **Consult the design system** for consistency across all blocks

### Example - Using CSS Variables:

**❌ WRONG - Hardcoded values:**
```blade
<div class="bg-[#0B7D21] text-[#093E21]">
    <h2 class="font-['Inter'] text-2xl">Title</h2>
</div>
```

**✅ CORRECT - Using CSS variables:**
```blade
<div class="bg-primary text-primary-dark">
    <h2 class="font-heading text-2xl">Title</h2>
</div>
```

### Common CSS Variable Patterns:

**Colors:**
```css
/* Check variables.css for available colors */
--color-primary
--color-primary-dark
--color-primary-light
--color-secondary
--color-accent
--color-text
--color-text-muted
--color-background
--color-border
```

**Typography:**
```css
/* Check variables.css for font definitions */
--font-heading
--font-body
--font-mono
```

**Spacing & Sizing:**
```css
/* Check variables.css for spacing scale */
--spacing-xs
--spacing-sm
--spacing-md
--spacing-lg
--spacing-xl
```

### When Creating Color Pickers in Block Editor:

Always map colors to CSS variables in `block.php`:

```php
// block.php
$backgroundColor = $attributes['backgroundColor'] ?? 'primary';

// Map to CSS variable classes
$bgClass = match($backgroundColor) {
    'primary' => 'bg-primary',
    'primary-dark' => 'bg-primary-dark',
    'secondary' => 'bg-secondary',
    'white' => 'bg-white',
    default => 'bg-primary'
};
```

```jsx
// block.jsx - ColorPalette should match variables.css
const colors = [
    { name: 'Primary', color: 'var(--color-primary)' },
    { name: 'Primary Dark', color: 'var(--color-primary-dark)' },
    { name: 'Secondary', color: 'var(--color-secondary)' },
    { name: 'White', color: '#FFFFFF' }
];
```

**Key Points:**
- Consult `wp-resources/css/variables.css` before adding colors/fonts
- Use semantic class names that map to CSS variables
- Keep color pickers in sync with the design system
- Document any new variables added to the system

---

## 🔧 Common Patterns & Best Practices

### 1. InnerBlocks Pattern
Use when block needs to contain other blocks:

```jsx
// block.jsx
import { InnerBlocks } from '@wordpress/block-editor';

edit: () => (
    <div {...blockProps}>
        <InnerBlocks />
    </div>
),

save: () => (
    <div {...blockProps}>
        <InnerBlocks.Content />
    </div>
)
```

```php
// block.php
$block_data = [
    'content' => $content ?? '',
    // other attributes
];
```

```blade
{{-- blade template --}}
<div class="wrapper">
    {!! $content !!}
</div>
```

### 2. RichText Pattern
Use for editable text fields:

```jsx
import { RichText } from '@wordpress/block-editor';

<RichText
    tagName="h2"
    value={title}
    onChange={(value) => setAttributes({ title: value })}
    placeholder="Enter title..."
    className="text-2xl font-bold"
/>
```

### 3. Media Upload Pattern
Use for image uploads:

```jsx
import { MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

<MediaUpload
    onSelect={(media) => setAttributes({
        imageId: media.id,
        imageUrl: media.url,
        imageAlt: media.alt
    })}
    allowedTypes={['image']}
    value={imageId}
    render={({ open }) => (
        <Button onClick={open}>
            {imageUrl ? 'Change Image' : 'Select Image'}
        </Button>
    )}
/>

**IMPORTANT:** Always render images on the frontend using `wp_get_attachment_image()` when an image ID exists.

```blade
@php
  $imageId = $imageId ?? 0;
  $imageAlt = $imageAlt ?? '';
@endphp

@if($imageId)
  {!! wp_get_attachment_image($imageId, 'full', false, ['alt' => $imageAlt]) !!}
@endif
```

### 4. Link Control Pattern (Mandatory)
**Do not use plain text inputs for links.** Always use `LinkControl` to ensure correct Gutenberg behavior.

```jsx
import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { Popover, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';

const [showLinkPopover, setShowLinkPopover] = useState(false);

<Button variant="secondary" onClick={() => setShowLinkPopover(true)}>
  {linkUrl ? 'Edit Link' : 'Select Link'}
</Button>

{showLinkPopover && (
  <Popover position="middle center" onClose={() => setShowLinkPopover(false)}>
    <LinkControl
      value={{ url: linkUrl, opensInNewTab: linkTarget === '_blank' }}
      onChange={(link) => setAttributes({
        linkUrl: link.url,
        linkTarget: link.opensInNewTab ? '_blank' : '_self'
      })}
    />
  </Popover>
)}
```
```

### 5. Color Palette Pattern

**IMPORTANT:** Always reference `wp-resources/css/variables.css` for color definitions.

```jsx
// Define colors based on CSS variables from variables.css
const colors = [
    { name: 'Primary', color: 'var(--color-primary)' },
    { name: 'Primary Dark', color: 'var(--color-primary-dark)' },
    { name: 'Secondary', color: 'var(--color-secondary)' },
    { name: 'White', color: '#FFFFFF' }
];

<ColorPalette
    colors={colors}
    value={backgroundColor}
    onChange={(color) => setAttributes({ backgroundColor: color || 'var(--color-primary)' })}
    disableCustomColors={true}
    clearable={false}
/>
```

### 6. Array Management Pattern
For repeating content:

```jsx
const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setAttributes({ items: newItems });
};

const addItem = () => {
    setAttributes({ items: [...items, defaultItemObject] });
};

const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setAttributes({ items: newItems });
};
```

---

## 📝 Naming Conventions

- **Block Name:** kebab-case (e.g., `home-tabs-carousel`)
- **Attribute Names:** camelCase (e.g., `backgroundColor`, `removePaddingTop`)
- **CSS Classes:** kebab-case (e.g., `container-block`, `tabs-carousel`)
- **CSS Variables:** kebab-case with prefix (e.g., `--color-primary`, `--font-heading`)
- **PHP Variables:** snake_case or camelCase (e.g., `$block_data`, `$bgColor`)
- **Blade Files:** kebab-case (e.g., `container.blade.php`)

---

## 📚 Required Files & Resources

Before creating blocks, ensure you have access to:

- **`wp-resources/css/variables.css`** - Design system tokens (colors, fonts, spacing)
- **`resources/js/editor.js`** - Block registration imports
- **`app/blocks.php`** - PHP block registrar
- **`functions.php`** - Must include `app/blocks.php`

---

## 🚀 Quick Start Template

Use this as a starting point for any new block:

**Step 1: Import in editor.js**
```javascript
// resources/js/editor.js
import '../blocks/new-block/block.jsx';
```

**Step 2: block.json**
```json
{
    "name": "sage/new-block",
    "title": "New Block",
    "category": "design",
    "icon": "block-default",
    "description": "Block description",
    "textdomain": "sage",
    "editorScript": "file:./block.jsx",
    "render": "file:./block.php",
    "attributes": {},
    "supports": {
        "align": ["wide", "full"],
        "html": false
    }
}
```

**Step 3: block.jsx**
```jsx
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

registerBlockType('sage/new-block', {
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Settings">
                        {/* Controls */}
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 p-8">
                        <h3>New Block</h3>
                        {/* Content */}
                    </div>
                </div>
            </>
        );
    },
    
    save: () => {
        const blockProps = useBlockProps.save();
        return <div {...blockProps} />;
    }
});
```

**Step 4: block.php**
```php
<?php
// Server-side rendering for New Block

$block_data = [
    'content' => $content ?? '',
    'slug' => 'new-block'
];

echo view('blocks.new-block', $block_data)->render();
```

**Step 5: new-block.blade.php**
```blade
<div class="new-block">
    {!! $content !!}
</div>
```

**Remember:**
- Check `wp-resources/css/variables.css` for colors and fonts
- Process all logic in `block.php`
- Keep Blade clean (no `@php` blocks)
- Use CSS variables instead of hardcoded values

---

## 🎓 Instructions for AI Assistant (Copilot)

When tasked with creating a new Gutenberg block:

1. **Analyze Requirements:** Understand the block's purpose, required fields, and functionality
2. **Check Design System:** Review `wp-resources/css/variables.css` for available colors, fonts, and spacing
3. **Plan Structure:** Determine attributes, controls, and layout
4. **Create Files:** Generate all 4 required files following patterns above
5. **Register Block:** **CRITICAL** - Add import statement in `resources/js/editor.js` AND add slug to `app/blocks.php`
6. **Follow Conventions:** Use established naming, styling, and code patterns
7. **Process Logic in PHP:** ALL logic, conditionals, and transformations in `block.php` - Blade is presentation only
8. **Use CSS Variables:** Reference `variables.css` for colors and fonts - no hardcoded values
9. **Ensure Completeness:** All attributes must flow through: JSON → JSX → PHP → Blade
10. **Validate:** Check that editor preview matches expected frontend output
11. **Documentation:** Comment complex logic and provide usage examples

**⚠️ MOST COMMON MISTAKES TO AVOID:**
1. Forgetting to import the block in `resources/js/editor.js` - **the block will not work without this step!**
2. Forgetting to add block slug to `app/blocks.php` registrar
3. Adding logic to Blade templates (use `block.php` instead)
4. Hardcoding colors/fonts instead of using CSS variables from `variables.css`

**Key Principles:**
- **Check `wp-resources/css/variables.css` FIRST** for colors and fonts
- **All logic in `block.php`**, Blade only renders
- Consistency with existing blocks
- Reusable components and patterns
- Clean separation of concerns (PHP = logic, Blade = view)
- Accessible and user-friendly
- Mobile-responsive design
- Performance-conscious code

---

## 📚 Reference Examples

Study these existing blocks for patterns:

- **Container** - InnerBlocks, color selection with CSS variables, padding controls
- **Hero** - Background images, overlay opacity, CSS variable colors, button controls
- **Feature Grid** - Array management, media uploads, responsive grid with CSS variables
- **FAQ Accordion** - Array items, smooth animations, accessibility
- **Tabs Basic** - Tab switching, active states, array management
- **Button** - Simple component with link controls

**Note:** All examples follow the pattern:
- Colors from `wp-resources/css/variables.css`
- Logic in `block.php`
- Clean Blade templates (no `@php` blocks)

---

**Last Updated:** February 4, 2026  
**Maintainer:** GritoWeb  
**Project:** BlocksLib
**Project:** BlocksLib
