import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, InspectorControls, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button, Popover } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { ImageUploadWithHover } from '../components/ImageUploadWithHover.jsx';
import { MediaUpload } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';

registerBlockType('sage/home-tabs-carousel', {
    edit: ({ attributes, setAttributes }) => {
        const { slides, activeTab, blockEyebrow, blockTitle, blockBody } = attributes;
        const [selectedSlide, setSelectedSlide] = useState(0);
        const [showPrimaryLinkPopover, setShowPrimaryLinkPopover] = useState(false);
        const [showSecondaryLinkPopover, setShowSecondaryLinkPopover] = useState(false);
        const blockProps = useBlockProps();

        const updateSlide = (index, field, value) => {
            const newSlides = [...slides];
            newSlides[index] = { ...newSlides[index], [field]: value };
            setAttributes({ slides: newSlides });
        };

        const currentSlide = slides[selectedSlide] || slides[0];

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Tab Selection', 'sage')} initialOpen={true}>
                        <div className="flex gap-2 mb-4">
                            {slides.map((slide, index) => (
                                <Button
                                    key={index}
                                    variant={selectedSlide === index ? 'primary' : 'secondary'}
                                    onClick={() => setSelectedSlide(index)}
                                    className="flex-1"
                                >
                                    {slide.tabLetter}
                                </Button>
                            ))}
                        </div>
                    </PanelBody>

                    <PanelBody title={__(`Tab "${currentSlide.tabLetter}" - Content Settings`, 'sage')} initialOpen={true}>
                        <TextControl
                            label={__('Image Alt Text', 'sage')}
                            value={currentSlide.imageAlt}
                            onChange={(value) => updateSlide(selectedSlide, 'imageAlt', value)}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps} className="home-tabs-carousel-editor mb-10 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200   p-8">
                    <h3 className="text-base text-black !font-sans font-bold mb-6">
                        {__('Home Tabs Carousel (H-O-M-E)', 'sage')}
                    </h3>

                    {/* Block Header Section - Eyebrow, Title, Body */}
                    <div className="mb-6 space-y-4">
                        {/* Eyebrow */}
                        <div className="bg-white/50 p-4 rounded-lg">
                            <label className="block text-black text-sm font-semibold mb-2">
                                {__('Eyebrow Text', 'sage')}
                            </label>
                            <RichText
                                tagName="p"
                                value={blockEyebrow}
                                onChange={(value) => setAttributes({ blockEyebrow: value })}
                                placeholder={__('Enter eyebrow text...', 'sage')}
                                className="text-black text-sm bg-white p-3 rounded"
                            />
                        </div>

                        {/* Title */}
                        <div className="bg-white/50 p-4 rounded-lg">
                            <label className="block text-black text-sm font-semibold mb-2">
                                {__('Block Title', 'sage')}
                            </label>
                            <RichText
                                tagName="h2"
                                value={blockTitle}
                                onChange={(value) => setAttributes({ blockTitle: value })}
                                placeholder={__('Enter block title...', 'sage')}
                                className="text-black text-2xl font-bold bg-white p-3 rounded"
                            />
                        </div>

                        {/* Body */}
                        <div className="bg-white/50 p-4 rounded-lg">
                            <label className="block text-black text-sm font-semibold mb-2">
                                {__('Body Text', 'sage')}
                            </label>
                            <RichText
                                tagName="p"
                                value={blockBody}
                                onChange={(value) => setAttributes({ blockBody: value })}
                                placeholder={__('Enter body text...', 'sage')}
                                className="text-black text-base bg-white p-3 rounded"
                            />
                            <p className="text-black/60 text-xs mt-2">
                                {__('This content appears above the H-O-M-E navigation tabs', 'sage')}
                            </p>
                        </div>
                    </div>

                    {/* Tab Navigation Preview */}
                    <div className="flex gap-4 mb-8 justify-center">
                        {slides.map((slide, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedSlide(index)}
                                className={`text-6xl font-bold px-6 py-2 rounded transition-colors ${
                                    selectedSlide === index
                                        ? 'text-black bg-green-900/30'
                                        : 'text-black bg-transparent'
                                }`}
                            >
                                {slide.tabLetter}
                            </button>
                        ))}
                    </div>

                    {/* Content Editor for Selected Tab */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Left Column - Title and Content */}
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="block text-black text-sm mb-2">{__('Title (H2)', 'sage')}</label>
                                <RichText
                                    tagName="h2"
                                    value={currentSlide.title}
                                    onChange={(value) => updateSlide(selectedSlide, 'title', value)}
                                    placeholder={__('Enter slide title...', 'sage')}
                                    className="text-black text-3xl font-bold bg-neutral-700 p-4 rounded"
                                />
                            </div>

                            <div>
                                <label className="block text-black text-sm mb-2">{__('Content (Paragraph)', 'sage')}</label>
                                <RichText
                                    tagName="p"
                                    value={currentSlide.content}
                                    onChange={(value) => updateSlide(selectedSlide, 'content', value)}
                                    placeholder={__('Enter slide content...', 'sage')}
                                    className="text-black text-base bg-neutral-700 p-4 rounded min-h-[120px]"
                                />
                            </div>

                            {/* Primary Button */}
                            <div className="bg-white/20 p-4 rounded-lg border-2 border-dashed border-blue-300">
                                <label className="block text-black text-sm font-semibold mb-2">
                                    {__('Primary Button', 'sage')}
                                </label>
                                <div className="space-y-3">
                                    <TextControl
                                        label={__('Button Label', 'sage')}
                                        value={currentSlide.primaryButtonLabel}
                                        onChange={(value) => updateSlide(selectedSlide, 'primaryButtonLabel', value)}
                                        placeholder={__('e.g., Learn More', 'sage')}
                                    />
                                    <div>
                                        <Button
                                            variant="secondary"
                                            onClick={() => setShowPrimaryLinkPopover(!showPrimaryLinkPopover)}
                                            className="w-full justify-center"
                                        >
                                            {currentSlide.primaryButtonUrl ? __('Edit Link', 'sage') : __('Add Link', 'sage')}
                                        </Button>
                                        {showPrimaryLinkPopover && (
                                            <Popover
                                                position="bottom center"
                                                onClose={() => setShowPrimaryLinkPopover(false)}
                                                focusOnMount="firstElement"
                                            >
                                                <div className="p-4" style={{ minWidth: '300px' }}>
                                                    <LinkControl
                                                        searchInputPlaceholder={__('Search or type URL', 'sage')}
                                                        value={{
                                                            url: currentSlide.primaryButtonUrl || '',
                                                            opensInNewTab: currentSlide.primaryButtonTarget === '_blank'
                                                        }}
                                                        onChange={(newValue) => {
                                                            if (newValue?.url) {
                                                                const newSlides = [...slides];
                                                                newSlides[selectedSlide] = {
                                                                    ...newSlides[selectedSlide],
                                                                    primaryButtonUrl: newValue.url,
                                                                    primaryButtonTarget: newValue.opensInNewTab ? '_blank' : '_self'
                                                                };
                                                                setAttributes({ slides: newSlides });
                                                            }
                                                        }}
                                                        settings={[
                                                            {
                                                                id: 'opensInNewTab',
                                                                title: __('Open in new tab', 'sage'),
                                                            }
                                                        ]}
                                                        hasRichPreviews={false}
                                                    />
                                                </div>
                                            </Popover>
                                        )}
                                        {currentSlide.primaryButtonUrl && (
                                            <p className="text-black text-xs mt-2 break-all">
                                                URL: {currentSlide.primaryButtonUrl}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Image */}
                        <div className="flex flex-col gap-4">
                            <label className="block text-black text-sm mb-2">{__('Background Image', 'sage')}</label>
                            <ImageUploadWithHover
                                imageId={currentSlide.imageId}
                                imageUrl={currentSlide.imageUrl}
                                onSelect={(media) => {
                                    updateSlide(selectedSlide, 'imageId', media.id);
                                    updateSlide(selectedSlide, 'imageUrl', media.url);
                                }}
                                MediaUpload={MediaUpload}
                                height="400px"
                                placeholder={__('Click to select background image', 'sage')}
                            />
                            
                            {/* Secondary Button (Overlay) */}
                            <div className="bg-white/20 p-4 rounded-lg border-2 border-dashed border-blue-300">
                                <label className="block text-black text-sm font-semibold mb-2">
                                    {__('Secondary Button (Image Overlay)', 'sage')}
                                </label>
                                <div className="space-y-3">
                                    <TextControl
                                        label={__('Button Label', 'sage')}
                                        value={currentSlide.secondaryButtonLabel}
                                        onChange={(value) => updateSlide(selectedSlide, 'secondaryButtonLabel', value)}
                                        placeholder={__('e.g., Donate Now', 'sage')}
                                    />
                                    <div>
                                        <Button
                                            variant="secondary"
                                            onClick={() => setShowSecondaryLinkPopover(!showSecondaryLinkPopover)}
                                            className="w-full justify-center"
                                        >
                                            {currentSlide.secondaryButtonUrl ? __('Edit Link', 'sage') : __('Add Link', 'sage')}
                                        </Button>
                                        {showSecondaryLinkPopover && (
                                            <Popover
                                                position="bottom center"
                                                onClose={() => setShowSecondaryLinkPopover(false)}
                                                focusOnMount="firstElement"
                                            >
                                                <div className="p-4" style={{ minWidth: '300px' }}>
                                                    <LinkControl
                                                        searchInputPlaceholder={__('Search or type URL', 'sage')}
                                                        value={{
                                                            url: currentSlide.secondaryButtonUrl || '',
                                                            opensInNewTab: currentSlide.secondaryButtonTarget === '_blank'
                                                        }}
                                                        onChange={(newValue) => {
                                                            if (newValue?.url) {
                                                                const newSlides = [...slides];
                                                                newSlides[selectedSlide] = {
                                                                    ...newSlides[selectedSlide],
                                                                    secondaryButtonUrl: newValue.url,
                                                                    secondaryButtonTarget: newValue.opensInNewTab ? '_blank' : '_self'
                                                                };
                                                                setAttributes({ slides: newSlides });
                                                            }
                                                        }}
                                                        settings={[
                                                            {
                                                                id: 'opensInNewTab',
                                                                title: __('Open in new tab', 'sage'),
                                                            }
                                                        ]}
                                                        hasRichPreviews={false}
                                                    />
                                                </div>
                                            </Popover>
                                        )}
                                        {currentSlide.secondaryButtonUrl && (
                                            <p className="text-black text-xs mt-2 break-all">
                                                URL: {currentSlide.secondaryButtonUrl}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="text-black/60 text-sm mt-6 text-center">
                        {__('Use the tabs above to edit each slide. All content is editable directly in the block.', 'sage')}
                    </p>
                </div>
            </>
        );
    },

    save: () => null // Server-side rendering
});