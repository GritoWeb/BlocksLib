import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, ToggleControl } from '@wordpress/components';

registerBlockType('sage/container', {
    edit: ({ attributes, setAttributes }) => {
        const { backgroundColor, removePaddingTop, removePaddingBottom } = attributes;
        
        const blockProps = useBlockProps({
            className: 'container-block-editor'
        });

        // Color options
        const colors = [
            { name: 'White', color: 'white' },
            { name: 'Light Green', color: '#0B7D21' },
            { name: 'Dark Green', color: '#093E21' }
        ];

        // Get background color style
        const getBackgroundColor = () => {
            return backgroundColor || 'white';
        };
        
        return (
            <>
                <InspectorControls>
                    {/* Background Color Selector */}
                    <PanelBody title="Background Color" initialOpen={true}>
                        <ColorPalette
                            colors={colors}
                            value={getBackgroundColor()}
                            onChange={(color) => setAttributes({ backgroundColor: color || 'white' })}
                            disableCustomColors={true}
                            clearable={false}
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            Current: <span className="font-semibold">{getBackgroundColor()}</span>
                        </p>
                    </PanelBody>

                    {/* Padding Controls */}
                    <PanelBody title="Padding Options" initialOpen={true}>
                        <ToggleControl
                            label="Remove Padding Top"
                            checked={removePaddingTop}
                            onChange={(value) => setAttributes({ removePaddingTop: value })}
                            help={removePaddingTop ? 'Top padding removed' : 'Top padding active (py-14 md:py-24)'}
                        />
                        <ToggleControl
                            label="Remove Padding Bottom"
                            checked={removePaddingBottom}
                            onChange={(value) => setAttributes({ removePaddingBottom: value })}
                            help={removePaddingBottom ? 'Bottom padding removed' : 'Bottom padding active (py-14 md:py-24)'}
                        />
                        <p className="text-xs text-gray-500 mt-3">
                            Note: Horizontal padding (px-4) is always maintained
                        </p>
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <div className="hero-block-editor mb-10 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200   pt-0 pb-8 px-8">
                          <h3>Container</h3>

                        <InnerBlocks />
                    </div>
                </div>
            </>
        );
    },
    
    save: () => {
        const blockProps = useBlockProps.save();
        return (
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        );
    }
});