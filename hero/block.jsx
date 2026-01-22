import { registerBlockType } from '@wordpress/blocks';
import {
    useBlockProps,
    InspectorControls,
    RichText,
    MediaUpload
} from '@wordpress/block-editor';
import { PanelBody, Button, ColorPalette, RangeControl, ToggleControl, TextControl } from '@wordpress/components';

registerBlockType('sage/hero', {
    edit: ({ attributes, setAttributes }) => {
        const {
            eyebrow,
            title,
            subtitle,
            backgroundImageId,
            backgroundImageUrl,
            backgroundImageAlt,
            overlayColor,
            overlayOpacity,
            centerContent,
            primaryButtonLabel,
            primaryButtonUrl,
            primaryButtonTarget,
            secondaryButtonLabel,
            secondaryButtonUrl,
            secondaryButtonTarget
        } = attributes;

        const blockProps = useBlockProps({
            className: 'hero-block-editor'
        });

        const colors = [
            { name: 'Black', color: '#000000' },
            { name: 'Dark Green', color: '#093E21' },
            { name: 'Light Green', color: '#0B7D21' },
            { name: 'White', color: '#FFFFFF' }
        ];

        const overlayStyle = {
            backgroundColor: overlayColor,
            opacity: (overlayOpacity ?? 40) / 100
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Background" initialOpen={true}>
                        <MediaUpload
                            onSelect={(media) => setAttributes({
                                backgroundImageId: media.id,
                                backgroundImageUrl: media.url,
                                backgroundImageAlt: media.alt
                            })}
                            allowedTypes={['image']}
                            value={backgroundImageId}
                            render={({ open }) => (
                                <Button variant="secondary" onClick={open}>
                                    {backgroundImageUrl ? 'Change Background' : 'Select Background'}
                                </Button>
                            )}
                        />

                        {backgroundImageUrl && (
                            <div className="mt-3">
                                <img src={backgroundImageUrl} alt={backgroundImageAlt || ''} className="max-h-40 w-full object-cover rounded" />
                            </div>
                        )}

                        <div className="mt-4">
                            <p className="text-xs font-semibold mb-2">Overlay Color</p>
                            <ColorPalette
                                colors={colors}
                                value={overlayColor}
                                onChange={(color) => setAttributes({ overlayColor: color || '#000000' })}
                                disableCustomColors={false}
                                clearable={false}
                            />
                        </div>

                        <div className="mt-4">
                            <RangeControl
                                label="Overlay Opacity (%)"
                                value={overlayOpacity}
                                onChange={(value) => setAttributes({ overlayOpacity: value })}
                                min={0}
                                max={90}
                            />
                        </div>

                        <ToggleControl
                            label="Center Content"
                            checked={centerContent}
                            onChange={(value) => setAttributes({ centerContent: value })}
                        />
                    </PanelBody>

                    <PanelBody title="Buttons" initialOpen={false}>
                        <TextControl
                            label="Primary Button Label"
                            value={primaryButtonLabel}
                            onChange={(value) => setAttributes({ primaryButtonLabel: value })}
                        />
                        <TextControl
                            label="Primary Button URL"
                            value={primaryButtonUrl}
                            onChange={(value) => setAttributes({ primaryButtonUrl: value })}
                        />
                        <TextControl
                            label="Primary Button Target"
                            value={primaryButtonTarget}
                            onChange={(value) => setAttributes({ primaryButtonTarget: value })}
                            help="Use _self or _blank"
                        />

                        <TextControl
                            label="Secondary Button Label"
                            value={secondaryButtonLabel}
                            onChange={(value) => setAttributes({ secondaryButtonLabel: value })}
                        />
                        <TextControl
                            label="Secondary Button URL"
                            value={secondaryButtonUrl}
                            onChange={(value) => setAttributes({ secondaryButtonUrl: value })}
                        />
                        <TextControl
                            label="Secondary Button Target"
                            value={secondaryButtonTarget}
                            onChange={(value) => setAttributes({ secondaryButtonTarget: value })}
                            help="Use _self or _blank"
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <div className="hero-block-editor mb-10 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 p-8">
                        <div className="relative rounded-lg overflow-hidden">
                            {backgroundImageUrl ? (
                                <img src={backgroundImageUrl} alt={backgroundImageAlt || ''} className="w-full h-48 object-cover" />
                            ) : (
                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-sm text-gray-600">
                                    No background image selected
                                </div>
                            )}
                            <div className="absolute inset-0" style={overlayStyle} />
                            <div className={`absolute inset-0 flex items-center ${centerContent ? 'justify-center text-center' : 'justify-start text-left'} p-6`}>
                                <div className="text-white max-w-xl">
                                    <RichText
                                        tagName="p"
                                        value={eyebrow}
                                        onChange={(value) => setAttributes({ eyebrow: value })}
                                        placeholder="Eyebrow text"
                                        className="text-xs uppercase tracking-widest mb-2"
                                    />
                                    <RichText
                                        tagName="h2"
                                        value={title}
                                        onChange={(value) => setAttributes({ title: value })}
                                        placeholder="Hero title"
                                        className="text-2xl font-bold mb-3"
                                    />
                                    <RichText
                                        tagName="p"
                                        value={subtitle}
                                        onChange={(value) => setAttributes({ subtitle: value })}
                                        placeholder="Hero subtitle"
                                        className="text-sm opacity-90"
                                    />
                                    <div className={`mt-4 flex flex-wrap gap-3 ${centerContent ? 'justify-center' : ''}`}>
                                        {(primaryButtonLabel || secondaryButtonLabel) && (
                                            <div className="text-xs opacity-80">Buttons preview</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    },

    save: () => {
        return null;
    }
});
