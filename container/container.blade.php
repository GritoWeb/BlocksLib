@php
  $bgColor = $backgroundColor ?? 'white';
  $removePaddingTop = $removePaddingTop ?? false;
  $removePaddingBottom = $removePaddingBottom ?? false;
  
  // Map color values to Tailwind classes or inline styles
  $bgClass = match($bgColor) {
    '#0B7D21' => 'bg-[#0B7D21]',
    '#093E21' => 'bg-[#093E21]',
    'white' => 'bg-white',
    default => 'bg-white'
  };

  // Build padding classes
  $paddingClasses = 'px-4'; // Always maintain horizontal padding
  
  if (!$removePaddingTop && !$removePaddingBottom) {
    // Both paddings active
    $paddingClasses .= ' py-14 md:py-24';
  } elseif ($removePaddingTop && !$removePaddingBottom) {
    // Only bottom padding
    $paddingClasses .= ' pb-14 md:pb-24';
  } elseif (!$removePaddingTop && $removePaddingBottom) {
    // Only top padding
    $paddingClasses .= ' pt-14 md:pt-24';
  }
  // If both are removed, only px-4 remains
@endphp

<div class="{{ $bgClass }}">
    <div class="container mx-auto {{ $paddingClasses }}">
        {!! $content !!}
    </div>
</div>