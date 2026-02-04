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

      @if($hasButtons)
        <div class="mt-4 flex flex-wrap gap-4 {{ $buttonAlignment }}">
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
