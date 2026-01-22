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

    <div class="space-y-4" data-accordion="{{ $allowMultiple ? 'multiple' : 'single' }}">
      @foreach($items as $index => $item)
        @php
          $isOpen = $openFirst && $index === 0;
        @endphp
        <details class="border border-gray-200 rounded-lg p-4" {{ $isOpen ? 'open' : '' }}>
          <summary class="cursor-pointer text-base font-semibold list-none">
            {!! $item['question'] ?? '' !!}
          </summary>
          <div class="mt-3 text-gray-600">
            {!! $item['answer'] ?? '' !!}
          </div>
        </details>
      @endforeach
    </div>
  </div>
</section>
