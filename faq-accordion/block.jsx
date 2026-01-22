import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, Button, ToggleControl } from '@wordpress/components';

registerBlockType('sage/faq-accordion', {
    edit: ({ attributes, setAttributes }) => {
        const { eyebrow, title, body, openFirst, allowMultiple, items } = attributes;
        const blockProps = useBlockProps({ className: 'faq-accordion-editor' });

        const updateItem = (index, field, value) => {
            const newItems = [...items];
            newItems[index] = { ...newItems[index], [field]: value };
            setAttributes({ items: newItems });
        };

        const addItem = () => {
            setAttributes({
                items: [...items, { question: '', answer: '' }]
            });
        };

        const removeItem = (index) => {
            const newItems = items.filter((_, itemIndex) => itemIndex !== index);
            setAttributes({ items: newItems.length ? newItems : items });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Accordion Settings" initialOpen={true}>
                        <ToggleControl
                            label="Open first item by default"
                            checked={openFirst}
                            onChange={(value) => setAttributes({ openFirst: value })}
                        />
                        <ToggleControl
                            label="Allow multiple items open"
                            checked={allowMultiple}
                            onChange={(value) => setAttributes({ allowMultiple: value })}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <div className="faq-accordion-editor mb-10 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 p-8">
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
                                placeholder="FAQ title"
                                className="text-2xl font-bold"
                            />
                            <RichText
                                tagName="p"
                                value={body}
                                onChange={(value) => setAttributes({ body: value })}
                                placeholder="FAQ description"
                                className="text-sm text-gray-600"
                            />
                        </div>

                        <div className="space-y-4">
                            {items.map((item, index) => (
                                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <strong className="text-sm">Item {index + 1}</strong>
                                        <Button variant="link" isDestructive onClick={() => removeItem(index)}>
                                            Remove
                                        </Button>
                                    </div>

                                    <RichText
                                        tagName="h3"
                                        value={item.question}
                                        onChange={(value) => updateItem(index, 'question', value)}
                                        placeholder="Question"
                                        className="text-base font-semibold mt-3"
                                    />
                                    <RichText
                                        tagName="p"
                                        value={item.answer}
                                        onChange={(value) => updateItem(index, 'answer', value)}
                                        placeholder="Answer"
                                        className="text-sm text-gray-600"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-6">
                            <Button variant="primary" onClick={addItem}>
                                Add FAQ Item
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
