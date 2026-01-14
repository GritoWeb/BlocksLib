<section class="home-tabs-carousel bg-green-900 {{ $attributes['className'] ?? '' }}" 
         id="{{ $attributes['anchor'] ?? $blockId }}"
         data-block-id="{{ $blockId }}"
         data-active-tab="{{ $activeTab }}"
         data-is-user-interacting="{{ $isUserInteracting ? 'true' : 'false' }}">
    
    <div class="small-container !px-0">
        {{-- Block Header Section --}}
        <div class="text-center mb-12">
            @if(!empty($blockEyebrow))
                <p class="eyebrow !text-green-300 mb-4">
                    {!! wp_kses_post($blockEyebrow) !!}
                </p>
            @endif

            @if(!empty($blockTitle))
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                    {!! wp_kses_post($blockTitle) !!}
                </h2>
            @endif

            @if(!empty($blockBody))
                <p class="text-lg text-white">
                    {!! wp_kses_post($blockBody) !!}
                </p>
            @endif
        </div>

        {{-- Tab Navigation --}}
        <nav class="home-tabs-nav mb-12 border-b border-green-300" role="tablist" aria-label="{{ __('Home carousel navigation', 'sage') }}">
            <div class="flex justify-center gap-6 md:gap-12">
                @foreach($slides as $index => $slide)
                    <button 
                        type="button"
                        role="tab"
                        id="tab-{{ $blockId }}-{{ $slide['tabLetter'] }}"
                        aria-controls="panel-{{ $blockId }}-{{ $slide['tabLetter'] }}"
                        aria-selected="{{ $slide['tabLetter'] === $activeTab ? 'true' : 'false' }}"
                        data-tab="{{ $slide['tabLetter'] }}"
                        class="home-tab cursor-pointer text-6xl lg:text-[11.25rem] m-[-4px] lg:m-0 font-bold transition-colors duration-300  px-4 py-2
                               {{ $slide['tabLetter'] === $activeTab ? 'text-green-300' : 'text-green-300-translucent' }}"
                    >
                        {{ $slide['tabLetter'] }}
                    </button>
                @endforeach
            </div>
        </nav>

        {{-- Tab Panels --}}
        @foreach($slides as $index => $slide)
            <div 
                role="tabpanel"
                id="panel-{{ $blockId }}-{{ $slide['tabLetter'] }}"
                aria-labelledby="tab-{{ $blockId }}-{{ $slide['tabLetter'] }}"
                data-panel="{{ $slide['tabLetter'] }}"
                class="home-tab-panel {{ $slide['tabLetter'] === $activeTab ? '' : 'hidden' }}"
            >
                <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
                    {{-- Left Column: Title, Content, Primary Button --}}
                    <div class="flex flex-col justify-center">
                        @if(!empty($slide['title']))
                            <h2 class="font-bold text-white leading-tight">
                                {!! wp_kses_post($slide['title']) !!}
                            </h2>
                        @endif

                        @if(!empty($slide['content']))
                            <p class=" text-white text-lg  leading-relaxed">
                                {!! wp_kses_post($slide['content']) !!}
                            </p>
                        @endif

                        @if(!empty($slide['primaryButtonLabel']) && !empty($slide['primaryButtonUrl']))
                            <div>
                                <x-button 
                                    :href="$slide['primaryButtonUrl']" 
                                    :label="$slide['primaryButtonLabel']" 
                                    variant="primary-normal"
                                    :whiteText="true"
                                />
                            </div>
                        @endif
                    </div>

                    {{-- Right Column: Image with Secondary Button Overlay --}}
                    <div class="relative overflow-hidden lg:w-[400px] lg:h-[300px]">
                        @if(!empty($slide['imageId']))
                            {!! wp_get_attachment_image($slide['imageId'], 'large', false, [
                                'class' => 'object-cover w-[400px] h-[300px]',
                                'alt' => $slide['imageAlt'] ?? '',
                                'loading' => 'lazy',
                                'decoding' => 'async'
                            ]) !!}
                        @elseif(!empty($slide['imageUrl']))
                            <img 
                                src="{{ esc_url($slide['imageUrl']) }}" 
                                alt="{{ $slide['imageAlt'] ?? __('Slide image', 'sage') }}" 
                                class="object-cover lg:w-[400px] lg:h-[300px]"
                                loading="lazy"
                                decoding="async"
                            >
                        @else
                            {{-- Placeholder if no image --}}
                            <div class="w-full h-96 bg-neutral-700 rounded-lg flex items-center justify-center">
                                <span class="text-white/30 text-2xl">📷</span>
                            </div>
                        @endif

                        {{-- Secondary Button - Positioned at Bottom Right --}}
                        @if(!empty($slide['secondaryButtonLabel']) && !empty($slide['secondaryButtonUrl']))
                            <div class="absolute bottom-0 right-0">
                                <x-button 
                                    :href="$slide['secondaryButtonUrl']" 
                                    :label="$slide['secondaryButtonLabel']" 
                                    variant="secondary-normal"
                                    bgColor="#ffffff"
                                    textColor="#000000"
                                    svgColor="#0B7D21"
                                />
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</section>