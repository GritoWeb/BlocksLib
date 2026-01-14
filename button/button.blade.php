@props([
  'link' => '#',
  'target' => '_self',
  'label' => 'Button',
  'version' => 'primary-button',
  'size' => 'small',
  'fading_delay' => '1000',
  'class' => '',
])

@php
 
  $paddingClass = $size === 'big' ? '' : '';

  $isOutlinedButton = in_array($version, ['secondary', 'transparent-button', 'green-transparent-button']);

@endphp

@if($isOutlinedButton)
  <a href="{!! $link !!}" target="{{ $target }}" 
     class="button-base {{ $version }} {{ $paddingClass }} {{ $class }} group relative transition-all duration-300 ease-in-out"

>
   
    <span class="inline-block transition-all {{ $paddingClass }} duration-300 ease-in-out" 
>
      {!! wp_kses_post($label) !!}
    </span>
    
    <div   >
      <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg" 
          class="transition-all duration-300 ease-in-out group-hover:translate-x-2">
          <path d="M24.7071 8.7071C25.0976 8.31658 25.0976 7.68342 24.7071 7.29289L18.3431 0.928931C17.9526 0.538406 17.3195 0.538406 16.9289 0.928931C16.5384 1.31946 16.5384 1.95262 16.9289 2.34314L22.5858 8L16.9289 13.6569C16.5384 14.0474 16.5384 14.6805 16.9289 15.0711C17.3195 15.4616 17.9526 15.4616 18.3431 15.0711L24.7071 8.7071ZM0 8L8.74228e-08 9L24 9L24 8L24 7L-8.74228e-08 7L0 8Z" 
                fill="currentColor" 
                class="transition-colors duration-300 ease-in-out"/>
      </svg>
    </div>
   
  </a>
@else
  <a href="{{ $link }}" target="{{ $target }}" class="button-base {{ $version }} {{ $class }} {{ $paddingClass }} group">
   
    {!! wp_kses_post($label) !!}
    <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="transition-all duration-300 ease-in-out group-hover:translate-x-2">
        <path d="M24.7071 8.7071C25.0976 8.31658 25.0976 7.68342 24.7071 7.29289L18.3431 0.928931C17.9526 0.538406 17.3195 0.538406 16.9289 0.928931C16.5384 1.31946 16.5384 1.95262 16.9289 2.34314L22.5858 8L16.9289 13.6569C16.5384 14.0474 16.5384 14.6805 16.9289 15.0711C17.3195 15.4616 17.9526 15.4616 18.3431 15.0711L24.7071 8.7071ZM0 8L8.74228e-08 9L24 9L24 8L24 7L-8.74228e-08 7L0 8Z" 
              fill="currentColor" 
              class="transition-colors duration-300 ease-in-out"/>
    </svg>
   
  </a>
@endif