@php
  $eyebrow = $eyebrow ?? '';
  $title = $title ?? '';
  $subtitle = $subtitle ?? '';
  $backgroundImageUrl = $backgroundImageUrl ?? '';
  $backgroundImageAlt = $backgroundImageAlt ?? '';
  $overlayColor = $overlayColor ?? '#000000';
  $overlayOpacity = $overlayOpacity ?? 40;
  $centerContent = $centerContent ?? true;
  $primaryButtonLabel = $primaryButtonLabel ?? '';
  $primaryButtonUrl = $primaryButtonUrl ?? '';
  $primaryButtonTarget = $primaryButtonTarget ?? '_self';
  $secondaryButtonLabel = $secondaryButtonLabel ?? '';
  $secondaryButtonUrl = $secondaryButtonUrl ?? '';
  $secondaryButtonTarget = $secondaryButtonTarget ?? '_self';

  $overlayOpacityValue = max(0, min(100, (int) $overlayOpacity)) / 100;
  $alignmentClass = $centerContent ? 'items-center text-center' : 'items-start text-left';
@endphp

<section class="relative overflow-hidden">
  @if($backgroundImageUrl)
    <img src="{{ $backgroundImageUrl }}" alt="{{ $backgroundImageAlt }}" class="absolute inset-0 h-full w-full object-cover" />
  @endif

  <div class="absolute inset-0" style="background-color: {{ $overlayColor }}; opacity: {{ $overlayOpacityValue }};"></div>

  <div class="relative container mx-auto px-6 py-16 md:py-24">
    <div class="max-w-3xl flex flex-col gap-4 {{ $alignmentClass }} text-white">
      @if($eyebrow)
        <p class="text-xs uppercase tracking-widest opacity-90">{!! $eyebrow !!}</p>
      @endif

      @if($title)
        <h1 class="text-3xl md:text-5xl font-bold">{!! $title !!}</h1>
      @endif

      @if($subtitle)
        <p class="text-base md:text-lg opacity-90">{!! $subtitle !!}</p>
      @endif

      @if($primaryButtonLabel || $secondaryButtonLabel)
        <div class="mt-4 flex flex-wrap gap-4 {{ $centerContent ? 'justify-center' : 'justify-start' }}">
          @if($primaryButtonLabel)
            <a href="{{ $primaryButtonUrl }}" target="{{ $primaryButtonTarget }}" class="button-base primary-button">
              {!! $primaryButtonLabel !!}
            </a>
          @endif
          @if($secondaryButtonLabel)
            <a href="{{ $secondaryButtonUrl }}" target="{{ $secondaryButtonTarget }}" class="button-base secondary">
              {!! $secondaryButtonLabel !!}
            </a>
          @endif
        </div>
      @endif
    </div>
  </div>
</section>
