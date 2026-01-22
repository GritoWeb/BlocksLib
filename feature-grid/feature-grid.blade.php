@php
  $eyebrow = $eyebrow ?? '';
  $title = $title ?? '';
  $body = $body ?? '';
  $columns = $columns ?? 3;
  $items = $items ?? [];

  $gridClass = match((int) $columns) {
    2 => 'md:grid-cols-2',
    4 => 'md:grid-cols-4',
    default => 'md:grid-cols-3'
  };
@endphp

<section class="py-16">
  <div class="container mx-auto px-6">
    <div class="max-w-2xl mb-10">
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

    <div class="grid gap-6 {{ $gridClass }}">
      @foreach($items as $item)
        <div class="rounded-xl border border-gray-200 p-6 bg-white shadow-sm">
          @if(!empty($item['iconUrl']))
            <img src="{{ $item['iconUrl'] }}" alt="{{ $item['iconAlt'] ?? '' }}" class="h-12 w-12 object-contain mb-4" />
          @endif
          @if(!empty($item['title']))
            <h3 class="text-lg font-semibold">{!! $item['title'] !!}</h3>
          @endif
          @if(!empty($item['text']))
            <p class="text-gray-600 mt-2">{!! $item['text'] !!}</p>
          @endif
        </div>
      @endforeach
    </div>
  </div>
</section>
