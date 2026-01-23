@php
  $eyebrow = $eyebrow ?? '';
  $title = $title ?? '';
  $body = $body ?? '';
  $openFirst = $openFirst ?? true;
  $allowMultiple = $allowMultiple ?? false;
  $items = $items ?? [];
@endphp

<section class="py-16">
  <div class="container mx-auto px-6 max-w-3xl">
    <div class="mb-10">
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

    <div
      class="space-y-4"
      data-faq-accordion
      data-allow-multiple="{{ $allowMultiple ? 'true' : 'false' }}"
      data-open-first="{{ $openFirst ? 'true' : 'false' }}"
    >
      @foreach($items as $index => $item)
        <div class="border border-gray-200 rounded-lg" data-accordion-item data-open="false">
          <button
            type="button"
            class="w-full flex items-center justify-between gap-4 p-4 text-left"
            data-accordion-trigger
            aria-expanded="false"
          >
            <span class="text-base font-semibold">
              {!! $item['question'] ?? '' !!}
            </span>
            <span class="relative flex items-center justify-center w-5 h-5">
              <span
                class="absolute w-4 h-0.5 bg-gray-700"
                data-accordion-horizontal
              ></span>
              <span
                class="absolute w-0.5 h-4 bg-gray-700"
                data-accordion-vertical
              ></span>
            </span>
          </button>
          <div class="px-4 pb-4 text-gray-600 overflow-hidden" data-accordion-panel aria-hidden="true">
            {!! $item['answer'] ?? '' !!}
          </div>
        </div>
      @endforeach
    </div>
  </div>
</section>
