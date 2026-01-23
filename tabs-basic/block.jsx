import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, Button, RangeControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

registerBlockType('sage/tabs-basic', {
    edit: ({ attributes, setAttributes }) => {
        const { eyebrow, title, body, tabs, activeTab } = attributes;
        const [selectedTab, setSelectedTab] = useState(activeTab || 0);
        const blockProps = useBlockProps({ className: 'tabs-basic-editor' });

        useEffect(() => {
            const clampedTab = Math.min(Math.max(activeTab || 0, 0), Math.max(tabs.length - 1, 0));
            setSelectedTab(clampedTab);
            if (clampedTab !== activeTab) {
                setAttributes({ activeTab: clampedTab });
            }
        }, [activeTab, tabs.length, setAttributes]);

        const updateTab = (index, field, value) => {
            const newTabs = [...tabs];
            newTabs[index] = { ...newTabs[index], [field]: value };
            setAttributes({ tabs: newTabs });
        };

        const addTab = () => {
            setAttributes({
                tabs: [...tabs, { label: `Tab ${tabs.length + 1}`, content: '' }]
            });
        };

        const removeTab = (index) => {
            const newTabs = tabs.filter((_, tabIndex) => tabIndex !== index);
            if (!newTabs.length) {
                return;
            }
            setAttributes({ tabs: newTabs });
            if (selectedTab >= newTabs.length) {
                setSelectedTab(newTabs.length - 1);
                setAttributes({ activeTab: newTabs.length - 1 });
            }
        };

        const handleSelectTab = (index) => {
            setSelectedTab(index);
            setAttributes({ activeTab: index });
        };

        const currentTab = tabs[selectedTab] || tabs[0];

        return (
            <>
                <InspectorControls>
                    <PanelBody title="Tabs Settings" initialOpen={true}>
                        <RangeControl
                            label="Default Active Tab"
                            value={activeTab}
                            onChange={(value) => setAttributes({ activeTab: value })}
                            min={0}
                            max={Math.max(0, tabs.length - 1)}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <div className="tabs-basic-editor mb-10 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 p-8">
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
                                placeholder="Tabs title"
                                className="text-2xl font-bold"
                            />
                            <RichText
                                tagName="p"
                                value={body}
                                onChange={(value) => setAttributes({ body: value })}
                                placeholder="Tabs description"
                                className="text-sm text-gray-600"
                            />
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {tabs.map((tab, index) => (
                                <Button
                                    key={index}
                                    variant={selectedTab === index ? 'primary' : 'secondary'}
                                    onClick={() => handleSelectTab(index)}
                                >
                                    {tab.label || `Tab ${index + 1}`}
                                </Button>
                            ))}
                            <Button variant="secondary" onClick={addTab}>
                                + Add Tab
                            </Button>
                        </div>

                        {currentTab && (
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <strong className="text-sm">Editing Tab {selectedTab + 1}</strong>
                                    {tabs.length > 1 && (
                                        <Button variant="link" isDestructive onClick={() => removeTab(selectedTab)}>
                                            Remove
                                        </Button>
                                    )}
                                </div>

                                <RichText
                                    tagName="h3"
                                    value={currentTab.label}
                                    onChange={(value) => updateTab(selectedTab, 'label', value)}
                                    placeholder="Tab label"
                                    className="text-lg font-semibold mb-3"
                                />
                                <RichText
                                    tagName="p"
                                    value={currentTab.content}
                                    onChange={(value) => updateTab(selectedTab, 'content', value)}
                                    placeholder="Tab content"
                                    className="text-sm text-gray-600"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    },

    save: () => {
        return null;
    }
});
