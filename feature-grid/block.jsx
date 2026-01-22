import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, RichText, MediaUpload } from '@wordpress/block-editor';
import { PanelBody, Button, RangeControl, TextControl } from '@wordpress/components';

registerBlockType('sage/feature-grid', {
    edit: ({ attributes, setAttributes }) => {
        const { eyebrow, title, body, columns, items } = attributes;
        const blockProps = useBlockProps({ className: 'feature-grid-editor' });

        const updateItem = (index, field, value) => {
            const newItems = [...items];
            newItems[index] = { ...newItems[index], [field]: value };
            setAttributes({ items: newItems });
        };

        const addItem = () => {
            setAttributes({
                items: [
                    ...items,
                    { iconId: 0, iconUrl: '', iconAlt: '', title: '', text: '' }
                ]
            });
        };

        const removeItem = (index) => {
            const newItems = items.filter((_, itemIndex) => itemIndex !== index);
            setAttributes({ items: newItems.length ? newItems : items });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Grid Settings" initialOpen={true}>
                        <RangeControl
                            label="Columns"
                            value={columns}
                            onChange={(value) => setAttributes({ columns: value })}
                            min={2}
                            max={4}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <div className="feature-grid-editor mb-10 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 p-8">
                        <div className="mb-6 space-y-3">
                            <RichText
                                tagName="p"
                                value={eyebrow}
                                onChange={(value) => setAttributes({ eyebrow: value })}
                                placeholder="Eyebrow text"
                                className="text-xs uppercase tracking-widest"
                            />
                            <RichText
                                tagName="h2"
                                value={title}
                                onChange={(value) => setAttributes({ title: value })}
                                placeholder="Grid title"
                                className="text-2xl font-bold"
                            />
                            <RichText
                                tagName="p"
                                value={body}
                                onChange={(value) => setAttributes({ body: value })}
                                placeholder="Grid description"
                                className="text-sm text-gray-600"
                            />
                        </div>

                        <div className={`grid gap-6 md:grid-cols-${columns}`}> 
                            {items.map((item, index) => (
                                <div key={index} className="bg-white rounded-lg p-5 border border-gray-200">
                                    <div className="flex items-center justify-between mb-4">
                                        <strong className="text-sm">Card {index + 1}</strong>
                                        <Button
                                            variant="link"
                                            isDestructive
                                            onClick={() => removeItem(index)}
                                        >
                                            Remove
                                        </Button>
                                    </div>

                                    <MediaUpload
                                        onSelect={(media) => {
                                            const newItems = [...items];
                                            newItems[index] = {
                                                ...newItems[index],
                                                iconId: media.id,
                                                iconUrl: media.url,
                                                iconAlt: media.alt
                                            };
                                            setAttributes({ items: newItems });
                                        }}
                                        allowedTypes={['image']}
                                        value={item.iconId}
                                        render={({ open }) => (
                                            <Button variant="secondary" onClick={open}>
                                                {item.iconUrl ? 'Change Icon' : 'Select Icon'}
                                            </Button>
                                        )}
                                    />

                                    {item.iconUrl && (
                                        <img src={item.iconUrl} alt={item.iconAlt || ''} className="mt-3 h-12 w-12 object-contain" />
                                    )}

                                    <TextControl
                                        label="Icon Alt Text"
                                        value={item.iconAlt}
                                        onChange={(value) => updateItem(index, 'iconAlt', value)}
                                    />

                                    <RichText
                                        tagName="h3"
                                        value={item.title}
                                        onChange={(value) => updateItem(index, 'title', value)}
                                        placeholder="Card title"
                                        className="text-lg font-semibold mt-4"
                                    />

                                    <RichText
                                        tagName="p"
                                        value={item.text}
                                        onChange={(value) => updateItem(index, 'text', value)}
                                        placeholder="Card text"
                                        className="text-sm text-gray-600"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-6">
                            <Button variant="primary" onClick={addItem}>
                                Add Card
                            </Button>
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
