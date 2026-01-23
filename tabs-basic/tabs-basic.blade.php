@php
  $eyebrow = $eyebrow ?? '';
  $title = $title ?? '';
  $body = $body ?? '';
  $tabs = $tabs ?? [];
  $activeTab = isset($activeTab) ? (int) $activeTab : 0;
  $maxIndex = max(0, count($tabs) - 1);
  $activeTab = min(max($activeTab, 0), $maxIndex);
@endphp

<section class="py-16">
  <div class="container mx-auto px-6">
    <div class="max-w-2xl mb-8">
      @if($eyebrow)
        <p class="text-xs uppercase tracking-widest text-gray-500">{!! $eyebrow !!}</p>
      @endif
      @if($title)
        <h2 class="text-3xl font-bold mt-2">{!! $title !!}</h2>
      @endif
      @if($body)
        <p class="text-gray-600 mt-3">{!! $body !!}</p>
      @endif
    </div>

    <div class="border border-gray-200 rounded-xl p-6" data-tabs data-default-tab="{{ $activeTab }}">
      <div class="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
        @foreach($tabs as $index => $tab)
          @php
            $isActive = $index === $activeTab;
          @endphp
          <button
            type="button"
            class="px-4 py-2 rounded-full text-sm font-medium {{ $isActive ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700' }}"
            data-tab-trigger
            data-tab-index="{{ $index }}"
          >
            {!! $tab['label'] ?? 'Tab' !!}
          </button>
        @endforeach
      </div>

      <div class="mt-6">
        @foreach($tabs as $index => $tab)
          @php
            $isActive = $index === $activeTab;
          @endphp
          <div
            class="transition-opacity duration-200 {{ $isActive ? 'opacity-100' : 'opacity-0 hidden' }}"
            data-tab-panel
            data-tab-index="{{ $index }}"
          >
            <div class="text-lg font-semibold">{!! $tab['label'] ?? '' !!}</div>
            <div class="text-gray-600 mt-2">{!! $tab['content'] ?? '' !!}</div>
          </div>
        @endforeach
      </div>
    </div>
  </div>
</section>
