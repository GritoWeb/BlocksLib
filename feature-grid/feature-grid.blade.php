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
          @if($item['hasIcon'])
            {!! wp_get_attachment_image($item['iconId'], 'thumbnail', false, ['alt' => $item['iconAlt'], 'class' => 'h-12 w-12 object-contain mb-4']) !!}
          @endif
          @if($item['title'])
            <h3 class="text-lg font-semibold">{!! $item['title'] !!}</h3>
          @endif
          @if($item['text'])
            <p class="text-gray-600 mt-2">{!! $item['text'] !!}</p>
          @endif
        </div>
      @endforeach
    </div>
  </div>
</section>
