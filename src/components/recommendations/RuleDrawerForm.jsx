import { useState, useEffect } from 'react';
import { X, Search, GripVertical, AlertCircle, Plus } from 'lucide-react';
import Drawer from '../ui/Drawer';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Toggle from '../ui/Toggle';
import { SEGMENTS, PRODUCT_CATALOG } from '../../constants/mockData';

const PLACEMENTS = [
  { id: 'home', label: 'Home Screen' },
  { id: 'afterLogin', label: 'After Login' },
  { id: 'afterTransact', label: 'After Transaction' },
  { id: 'search', label: 'Search Results' },
  { id: 'pdp', label: 'Product Detail Page' }
];

export default function RuleDrawerForm({ isOpen, onClose, initialData, onSave, maxPriority }) {
  const [formData, setFormData] = useState({
    name: '',
    trigger: SEGMENTS[0].name,
    type: 'Specific products',
    products: [],
    dynamicCategory: 'All categories',
    excludeTransacted: true,
    staleness: 30,
    placements: ['Home Screen', 'After Login'],
    maxItems: 3,
    layoutType: 'grid',
    priority: maxPriority,
    status: 'Active'
  });

  const [productSearch, setProductSearch] = useState('');

  useEffect(() => {
    if (initialData) {
       setFormData({
         ...initialData,
         type: initialData.products.length > 0 ? 'Specific products' : 'Based on viewed products',
         placements: initialData.placements || ['Home Screen'],
         maxItems: initialData.layout?.maxItems || initialData.maxItems || 3,
         layoutType: initialData.layout?.type || 'grid'
       });
    } else {
       setFormData({
         name: '',
         trigger: SEGMENTS[0].name,
         type: 'Specific products',
         products: [],
         dynamicCategory: 'All categories',
         excludeTransacted: true,
         staleness: 30,
         placements: ['Home Screen', 'After Login'],
         maxItems: 3,
         layoutType: 'grid',
         priority: maxPriority,
         status: 'Active'
       });
    }
  }, [initialData, isOpen, maxPriority]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      products: formData.type === 'Specific products' ? formData.products : [],
      layout: { maxItems: formData.maxItems, type: formData.layoutType }
    });
  };

  const handleUpdate = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const togglePlacement = (placement) => {
    setFormData(prev => ({
      ...prev,
      placements: prev.placements.includes(placement)
        ? prev.placements.filter(p => p !== placement)
        : [...prev.placements, placement]
    }));
  };

  const addProduct = (productName) => {
    if (!formData.products.includes(productName)) {
      handleUpdate('products', [...formData.products, productName]);
    }
  };

  const removeProduct = (productName) => {
    handleUpdate('products', formData.products.filter(p => p !== productName));
  };

  // Drag logic for products
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('sourceIndex', index.toString());
  };
  const handleDrop = (e, index) => {
    const sourceIndex = parseInt(e.dataTransfer.getData('sourceIndex'), 10);
    if (sourceIndex !== index) {
      const newProducts = [...formData.products];
      const sourceItem = newProducts[sourceIndex];
      newProducts.splice(sourceIndex, 1);
      newProducts.splice(index, 0, sourceItem);
      handleUpdate('products', newProducts);
    }
  };

  const filteredCatalog = PRODUCT_CATALOG.filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()));

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Recommendation Rule" : "Create Recommendation Rule"}
      size="md"
    >
      <form onSubmit={handleSubmit} className="flex flex-col h-full fade-in">
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar bg-slate-50">
          
          <div className="space-y-6 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-900 border-b pb-2">Rule Details</h3>
            <Input 
              label="Rule Name*"
              value={formData.name}
              onChange={(e) => handleUpdate('name', e.target.value)}
              placeholder="e.g. VIP Upsell — Investment"
              required
            />

            <Select 
              label="Trigger Segment*"
              options={SEGMENTS.map(s => ({ value: s.name, label: `${s.name} (${s.memberCount.toLocaleString()} members)` }))}
              value={formData.trigger}
              onChange={(e) => handleUpdate('trigger', e.target.value)}
            />
          </div>

          <div className="space-y-6 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-900 border-b pb-2">Recommendation Engine</h3>
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-[#0F172A]">Recommendation Type*</label>
              <div className="space-y-3 pt-1">
                {[
                  'Specific products',
                  'Based on viewed products',
                  'Based on transaction history'
                ].map(type => (
                  <label key={type} className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-1">
                      <input type="radio" className="peer sr-only" checked={formData.type === type} onChange={() => handleUpdate('type', type)} />
                      <div className="w-4 h-4 rounded-full border-2 border-[#CBD5E1] peer-checked:border-[#2563EB]"></div>
                      <div className="w-2 h-2 rounded-full bg-[#2563EB] absolute scale-0 peer-checked:scale-100 transition-transform"></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {formData.type === 'Specific products' ? (
              <div className="animate-in fade-in slide-in-from-top-1 bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4">
                <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                     <Search className="h-4 w-4" />
                   </div>
                   <input
                     type="text"
                     placeholder="Search products..."
                     className="pl-10 h-10 w-full rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                     value={productSearch}
                     onChange={e => setProductSearch(e.target.value)}
                   />
                   {productSearch && (
                     <div className="absolute top-11 inset-x-0 bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto z-10 p-1 divide-y divide-gray-100">
                       {filteredCatalog.map(p => (
                         <div 
                           key={p.id} 
                           className="px-3 py-2 hover:bg-blue-50 cursor-pointer flex justify-between items-center group"
                           onClick={() => { addProduct(p.name); setProductSearch(''); }}
                         >
                           <span className="text-sm text-gray-800 font-medium">{p.name}</span>
                           <span className="text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100"><Plus className="w-4 h-4" /></span>
                         </div>
                       ))}
                       {filteredCatalog.length === 0 && (
                         <div className="px-3 py-4 text-center text-sm text-gray-500">No products found.</div>
                       )}
                     </div>
                   )}
                </div>

                {formData.products.length > 0 && (
                  <div className="space-y-2 mt-4">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                      Selected Ranked List <AlertCircle className="w-3.5 h-3.5 text-blue-500" />
                    </label>
                    <div className="space-y-2 relative">
                      {formData.products.map((p, i) => (
                        <div 
                          key={p} 
                          className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-300 transition-colors cursor-grab"
                          draggable
                          onDragStart={(e) => handleDragStart(e, i)}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => handleDrop(e, i)}
                        >
                          <div className="flex items-center gap-3">
                            <GripVertical className="w-4 h-4 text-gray-300" />
                            <span className="text-sm font-medium text-gray-500 w-4">{i + 1}.</span>
                            <span className="text-sm font-bold text-gray-900">{p}</span>
                          </div>
                          <button 
                            type="button" 
                            onClick={() => removeProduct(p)}
                            className="text-gray-400 hover:bg-red-50 hover:text-red-500 p-1.5 rounded-md transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 text-center mt-2 italic">Drag rows to set display priority</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-top-1 bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-5">
                <Select 
                  label="Category Filter"
                  options={['All categories', 'Financial', 'Investment', 'Savings', 'Insurance', 'Card', 'Promotion']}
                  value={formData.dynamicCategory}
                  onChange={(e) => handleUpdate('dynamicCategory', e.target.value)}
                />
                
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-[#0F172A] flex flex-col">
                    <span>Exclude already transacted</span>
                    <span className="text-xs font-normal text-gray-500">Don't suggest items user owns</span>
                  </label>
                  <Toggle checked={formData.excludeTransacted} onChange={(v) => handleUpdate('excludeTransacted', v)} />
                </div>
                
                <div className="space-y-1">
                  <Input 
                    type="number"
                    label="Max Staleness (days)"
                    value={formData.staleness}
                    onChange={(e) => handleUpdate('staleness', parseInt(e.target.value) || 0)}
                  />
                  <p className="text-xs text-gray-500">Only recommend items viewed in the last {formData.staleness} days.</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6 bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-900 border-b pb-2">Display Configuration</h3>
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-[#0F172A]">Placement*</label>
              <div className="grid grid-cols-2 gap-3 pt-1">
                {PLACEMENTS.map(p => (
                  <label key={p.id} className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center mt-0.5">
                      <input 
                        type="checkbox" 
                        className="peer sr-only" 
                        checked={formData.placements.includes(p.label)} 
                        onChange={() => togglePlacement(p.label)}
                      />
                      <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:border-blue-600 peer-checked:bg-blue-600 flex items-center justify-center transition-colors">
                        <svg className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 select-none pt-0.5">{p.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-[#0F172A]">Max items to show</label>
                <span className="font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-sm font-bold">{formData.maxItems}</span>
              </div>
              <input 
                type="range" 
                min="1" max="6" 
                value={formData.maxItems} 
                onChange={e => handleUpdate('maxItems', parseInt(e.target.value))}
                className="w-full form-range accent-blue-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between px-1 text-xs text-gray-400 font-medium font-mono">
                <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-gray-200 mt-4">
              <label className="text-sm font-medium text-[#0F172A]">Component Layout Style</label>
              <div className="grid grid-cols-3 gap-2">
                {['grid', 'carousel', 'banner'].map(lt => (
                  <label key={lt} className={`border rounded-lg p-3 text-center cursor-pointer transition-colors ${formData.layoutType === lt ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 hover:bg-gray-50 text-gray-600'}`}>
                    <input type="radio" className="sr-only" checked={formData.layoutType === lt} onChange={() => handleUpdate('layoutType', lt)} />
                    <span className="text-xs font-semibold uppercase">{lt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-200 mt-4">
              <Input 
                type="number"
                label="Global Priority"
                value={formData.priority}
                onChange={(e) => handleUpdate('priority', parseInt(e.target.value) || 1)}
              />
              <p className="text-xs text-gray-500 bg-blue-50 p-2 rounded text-blue-800">
                Hint: Current highest priority is <strong className="font-bold">1 (VIP Upsell)</strong>. Lower number = higher priority.
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-white border-t border-gray-200 flex justify-end gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] relative z-10">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? 'Save Changes' : 'Create Rule'}
          </Button>
        </div>
      </form>
    </Drawer>
  );
}
