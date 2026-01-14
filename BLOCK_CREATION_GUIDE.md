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

### 3. **block.php** - Server-Side Rendering

**Purpose:** Controller that passes data from WordPress to the Blade template.

**Required Pattern:**
```php
<?php
// Server-side rendering for {Block Name}

$attribute1 = $attributes['attribute1'] ?? 'default_value';
$attribute2 = $attributes['attribute2'] ?? false;

$block_data = [
    'content' => $content ?? '',
    'attribute1' => $attribute1,
    'attribute2' => $attribute2,
    'slug' => '{block-name}'
];

echo view('blocks.{block-name}', $block_data)->render();
```

**Example - Container Block:**
```php
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
```

**Key Points:**
- Use `??` null coalescing operator for safe defaults
- Always pass `$content` if block supports `InnerBlocks`
- Include `slug` for potential CSS/JS targeting
- Use `view('blocks.{blade-name}', $data)->render()`

---

### 4. **{block-name}.blade.php** - Frontend Template

**Purpose:** Render the block's HTML output using Blade templating.

**Location:** `resources/views/blocks/{block-name}.blade.php`

**Common Patterns:**

**Simple Attribute Handling:**
```blade
@php
  $bgColor = $backgroundColor ?? 'white';
  $isActive = $isActive ?? false;
@endphp

<div class="custom-block {{ $isActive ? 'active' : '' }}">
    {!! $content !!}
</div>
```

**Color Mapping with match():**
```blade
@php
  $bgColor = $backgroundColor ?? 'white';
  
  $bgClass = match($bgColor) {
    '#0B7D21' => 'bg-[#0B7D21]',
    '#093E21' => 'bg-[#093E21]',
    'white' => 'bg-white',
    default => 'bg-white'
  };
@endphp

<div class="{{ $bgClass }}">
    {!! $content !!}
</div>
```

**Conditional Class Building:**
```blade
@php
  $removePaddingTop = $removePaddingTop ?? false;
  $removePaddingBottom = $removePaddingBottom ?? false;
  
  $paddingClasses = 'px-4'; // Always maintain horizontal padding
  
  if (!$removePaddingTop && !$removePaddingBottom) {
    $paddingClasses .= ' py-14 md:py-24';
  } elseif ($removePaddingTop && !$removePaddingBottom) {
    $paddingClasses .= ' pb-14 md:pb-24';
  } elseif (!$removePaddingTop && $removePaddingBottom) {
    $paddingClasses .= ' pt-14 md:pt-24';
  }
@endphp

<div class="container mx-auto {{ $paddingClasses }}">
    {!! $content !!}
</div>
```

**Example - Container Block:**
```blade
@php
  $bgColor = $backgroundColor ?? 'white';
  $removePaddingTop = $removePaddingTop ?? false;
  $removePaddingBottom = $removePaddingBottom ?? false;
  
  // Map color values to Tailwind classes
  $bgClass = match($bgColor) {
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
@endphp

<div class="{{ $bgClass }}">
    <div class="container mx-auto {{ $paddingClasses }}">
        {!! $content !!}
    </div>
</div>
```

**Array/Loop Handling:**
```blade
@php
  $slides = $slides ?? [];
@endphp

<div class="carousel">
    @foreach($slides as $index => $slide)
        <div class="slide" data-index="{{ $index }}">
            <h3>{{ $slide['title'] }}</h3>
            <p>{{ $slide['content'] }}</p>
            @if($slide['imageUrl'])
                <img src="{{ $slide['imageUrl'] }}" alt="{{ $slide['imageAlt'] }}">
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
- [ ] Save function returning correct structure

### ✅ block.php
- [ ] Extract all attributes with defaults using `??`
- [ ] Build `$block_data` array with all needed values
- [ ] Include `$content` if using InnerBlocks
- [ ] Include `slug` for targeting
- [ ] Call view with correct template name

### ✅ Blade Template
- [ ] Handle all passed attributes with defaults
- [ ] Use `@php` blocks for logic
- [ ] Use `match()` for value mapping when appropriate
- [ ] Build dynamic CSS classes safely
- [ ] Render content with `{!! $content !!}` if needed
- [ ] Use Tailwind CSS classes consistently
- [ ] Responsive design considerations (md:, lg: breakpoints)

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
```

### 4. Color Palette Pattern
Standard color options:

```jsx
const colors = [
    { name: 'White', color: 'white' },
    { name: 'Light Green', color: '#0B7D21' },
    { name: 'Dark Green', color: '#093E21' }
];

<ColorPalette
    colors={colors}
    value={backgroundColor}
    onChange={(color) => setAttributes({ backgroundColor: color || 'white' })}
    disableCustomColors={true}
    clearable={false}
/>
```

### 5. Array Management Pattern
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
- **PHP Variables:** snake_case or camelCase (e.g., `$block_data`, `$bgColor`)
- **Blade Files:** kebab-case (e.g., `container.blade.php`)

---

## 🚀 Quick Start Template

Use this as a starting point for any new block:

**block.json:**
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

**block.jsx:**
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

**block.php:**
```php
<?php
// Server-side rendering for New Block

$block_data = [
    'content' => $content ?? '',
    'slug' => 'new-block'
];

echo view('blocks.new-block', $block_data)->render();
```

**new-block.blade.php:**
```blade
@php
  // Variables and logic
@endphp

<div class="new-block">
    {!! $content !!}
</div>
```

---

## 🎓 Instructions for AI Assistant (Copilot)

When tasked with creating a new Gutenberg block:

1. **Analyze Requirements:** Understand the block's purpose, required fields, and functionality
2. **Plan Structure:** Determine attributes, controls, and layout
3. **Create Files:** Generate all 4 required files following patterns above
4. **Follow Conventions:** Use established naming, styling, and code patterns
5. **Ensure Completeness:** All attributes must flow through: JSON → JSX → PHP → Blade
6. **Validate:** Check that editor preview matches expected frontend output
7. **Documentation:** Comment complex logic and provide usage examples

**Key Principles:**
- Consistency with existing blocks
- Reusable components and patterns
- Clean separation of concerns
- Accessible and user-friendly
- Mobile-responsive design
- Performance-conscious code

---

## 📚 Reference Examples

Study these existing blocks for patterns:

- **Container** - InnerBlocks, color selection, padding controls
- **Home Tabs Carousel** - Array management, media uploads, complex state
- **Button** - Simple component with link controls

---

**Last Updated:** January 14, 2026  
**Maintainer:** GritoWeb  
**Project:** BlocksLib
