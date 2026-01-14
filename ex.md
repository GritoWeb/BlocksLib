# 📦 Guia de Criação de Blocos Gutenberg

Este documento explica como criar blocos customizados no tema SJC, seguindo a arquitetura atual do projeto.

---

## 📁 Estrutura de Arquivos

Cada bloco possui sua própria pasta dentro de `resources/blocks/` com a seguinte estrutura:

```
resources/blocks/nome-do-bloco/
├── block.json       # Configuração do bloco (obrigatório)
├── block.jsx        # Editor React (obrigatório)
├── block.php        # Server-side rendering (obrigatório)
└── block.js         # JavaScript frontend (opcional)
```

E o template Blade correspondente em:

```
resources/views/blocks/
└── nome-do-bloco.blade.php  # Template de renderização
```

---

## 🛠️ Passo a Passo para Criar um Novo Bloco

### 1️⃣ Criar a Pasta do Bloco

Crie uma pasta em `resources/blocks/` com o nome do bloco em kebab-case:

```bash
mkdir resources/blocks/meu-novo-bloco
```

### 2️⃣ Criar o `block.json`

Arquivo de configuração do bloco (metadados, atributos, suporte):

**Localização:** `resources/blocks/meu-novo-bloco/block.json`

```json
{
    "name": "sage/meu-novo-bloco",
    "title": "Meu Novo Bloco",
    "category": "design",
    "icon": "block-default",
    "description": "Descrição do bloco",
    "textdomain": "sage",
    "editorScript": "file:./block.jsx",
    "render": "file:./block.php",
    "attributes": {
        "titulo": {
            "type": "string",
            "default": ""
        },
        "descricao": {
            "type": "string",
            "default": ""
        },
        "backgroundColor": {
            "type": "string",
            "default": "white"
        }
    },
    "supports": {
        "align": ["wide", "full"],
        "html": false,
        "anchor": true
    }
}
```

**Tipos de atributos comuns:**
- `string` - Texto
- `boolean` - Verdadeiro/Falso
- `number` - Número
- `array` - Array
- `object` - Objeto

### 3️⃣ Criar o `block.jsx` (Editor)

Interface do bloco no editor Gutenberg (React):

**Localização:** `resources/blocks/meu-novo-bloco/block.jsx`

```jsx
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, ToggleControl } from '@wordpress/components';

registerBlockType('sage/meu-novo-bloco', {
    edit: ({ attributes, setAttributes }) => {
        const { titulo, descricao, backgroundColor } = attributes;
        
        const blockProps = useBlockProps({
            className: 'meu-novo-bloco-editor'
        });

        // Opções de cores
        const colors = [
            { name: 'White', color: 'white' },
            { name: 'Light Green', color: '#0B7D21' },
            { name: 'Dark Green', color: '#093E21' }
        ];
        
        return (
            <>
                {/* Sidebar Controls */}
                <InspectorControls>
                    <PanelBody title="Configurações de Cor" initialOpen={true}>
                        <ColorPalette
                            colors={colors}
                            value={backgroundColor}
                            onChange={(color) => setAttributes({ backgroundColor: color || 'white' })}
                            disableCustomColors={true}
                            clearable={false}
                        />
                    </PanelBody>
                </InspectorControls>

                {/* Editor Interface */}
                <div {...blockProps}>
                    <div className="border-2 border-dashed border-blue-200 p-8">
                        <h3>Meu Novo Bloco</h3>
                        
                        <RichText
                            tagName="h2"
                            value={titulo}
                            onChange={(value) => setAttributes({ titulo: value })}
                            placeholder="Digite o título..."
                            className="mb-4"
                        />
                        
                        <RichText
                            tagName="p"
                            value={descricao}
                            onChange={(value) => setAttributes({ descricao: value })}
                            placeholder="Digite a descrição..."
                        />
                    </div>
                </div>
            </>
        );
    },
    
    save: () => {
        const blockProps = useBlockProps.save();
        return <div {...blockProps} />;
    }
});
```

**Componentes úteis do Gutenberg:**
- `RichText` - Campo de texto editável
- `InspectorControls` - Sidebar de configurações
- `ColorPalette` - Seletor de cores
- `ToggleControl` - Switch on/off
- `TextControl` - Input de texto
- `MediaUpload` - Upload de imagens
- `LinkControl` - Seletor de links com Popover

### 4️⃣ Criar o `block.php` (Server-side)

Ponte entre WordPress e Blade template:

**Localização:** `resources/blocks/meu-novo-bloco/block.php`

```php
<?php
// Server-side rendering para Meu Novo Bloco

$titulo = $attributes['titulo'] ?? '';
$descricao = $attributes['descricao'] ?? '';
$backgroundColor = $attributes['backgroundColor'] ?? 'white';

$block_data = [
    'titulo' => $titulo,
    'descricao' => $descricao,
    'backgroundColor' => $backgroundColor,
    'blockId' => uniqid('block-'),
    'attributes' => $attributes ?? []
];

echo view('blocks.meu-novo-bloco', $block_data)->render();
```

### 5️⃣ Criar o Template Blade

Template de renderização final no frontend:

**Localização:** `resources/views/blocks/meu-novo-bloco.blade.php`

```blade
{{--
  Meu Novo Bloco Template
  
  @var string $titulo - Título do bloco
  @var string $descricao - Descrição do bloco
  @var string $backgroundColor - Cor de fundo
  @var string $blockId - ID único do bloco
  @var array $attributes - Todos os atributos do bloco
--}}

@php
  $bgColor = $backgroundColor ?? 'white';
  
  $bgClass = match($bgColor) {
    '#0B7D21' => 'bg-[#0B7D21]',
    '#093E21' => 'bg-[#093E21]',
    'white' => 'bg-white',
    default => 'bg-white'
  };
@endphp

<section 
  class="meu-novo-bloco {{ $bgClass }}" 
  id="{{ $attributes['anchor'] ?? $blockId }}"
  data-block-id="{{ $blockId }}"
>
  <div class="container mx-auto px-4 py-14 md:py-24">
    @if(!empty($titulo))
      <h2 class="text-4xl font-bold mb-4">
        {!! $titulo !!}
      </h2>
    @endif

    @if(!empty($descricao))
      <p class="text-lg">
        {!! $descricao !!}
      </p>
    @endif
  </div>
</section>
```

**Boas práticas Blade:**
- Use `{!! $variavel !!}` para HTML (RichText)
- Use `{{ $variavel }}` para texto puro (escapado)
- Sempre verifique se variáveis existem com `!empty()`
- Use `wp_kses_post()` para sanitizar HTML quando necessário

### 6️⃣ Criar JavaScript Frontend (Opcional)

Se o bloco precisa de interatividade no frontend:

**Localização:** `resources/blocks/meu-novo-bloco/block.js`

```javascript
/**
 * Meu Novo Bloco - Frontend JavaScript
 * 
 * Features:
 * - Animações de scroll
 * - Interações do usuário
 * - AJAX requests
 */

document.addEventListener('DOMContentLoaded', function() {
  const blocos = document.querySelectorAll('[data-block-id]');
  
  if (blocos.length === 0) {
    return;
  }

  blocos.forEach(bloco => {
    initBloco(bloco);
  });
});

function initBloco(bloco) {
  const blockId = bloco.dataset.blockId;
  
  // Sua lógica aqui
  console.log(`Bloco inicializado: ${blockId}`);
}
```

**Depois, registre no `app.js`:**

```javascript
// resources/js/app.js
import '../blocks/meu-novo-bloco/block.js';
```

### 7️⃣ Registrar o Bloco

Adicione o nome do bloco no `BlockManager.php`:

**Localização:** `app/Blocks/BlockManager.php`

```php
protected array $blocks = [
    // ... outros blocos
    'meu-novo-bloco',  // ← Adicione aqui
];
```

### 8️⃣ Compilar e Testar

```bash
npm run build
# ou para desenvolvimento
npm run dev
```

Acesse o editor do WordPress e seu bloco estará disponível! 🎉

---

## 📂 Mapeamento Completo de Arquivos

```
wp-content/themes/sjc/
│
├── app/
│   └── Blocks/
│       └── BlockManager.php              # Gerenciador de blocos
│
├── resources/
│   ├── blocks/
│   │   └── meu-novo-bloco/
│   │       ├── block.json                # ✅ Configuração
│   │       ├── block.jsx                 # ✅ Editor React
│   │       ├── block.php                 # ✅ Server-side
│   │       └── block.js                  # 🔵 Frontend JS (opcional)
│   │
│   ├── views/blocks/
│   │   └── meu-novo-bloco.blade.php      # ✅ Template Blade
│   │
│   ├── js/
│   │   └── app.js                        # Importa block.js (se existir)
│   │
│   └── blocks.php                        # Inicializa BlockManager
│
└── functions.php                         # Carrega blocks.php
```

---

## 🎨 Padrões e Convenções

### Nomenclatura

- **Pasta do bloco:** `kebab-case` (ex: `meu-novo-bloco`)
- **Nome do bloco:** `sage/kebab-case` (ex: `sage/meu-novo-bloco`)
- **Template Blade:** `kebab-case.blade.php` (ex: `meu-novo-bloco.blade.php`)
- **Atributos:** `camelCase` (ex: `backgroundColor`)
- **Classes CSS:** `kebab-case` (ex: `meu-novo-bloco`)

### Cores Padrão do Tema

```javascript
const colors = [
    { name: 'White', color: 'white' },
    { name: 'Light Green', color: '#0B7D21' },
    { name: 'Dark Green', color: '#093E21' }
];
```

### Espaçamentos Padrão

```php
// Vertical padding
'py-14 md:py-24'

// Horizontal padding
'px-4'

// Container
'container mx-auto'
```

---

## 🔧 Componentes Reutilizáveis

### Button Component (Blade)

```blade
<x-button 
  :href="$url" 
  :label="$texto" 
  :target="$target"
  variant="primary-normal"
  textColor="#000000"
/>
```

**Variantes disponíveis:**
- `primary-normal`
- `secondary`
- `outline`

### Link Control (React)

```jsx
import { Button, Popover } from '@wordpress/components';
import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';

const [showLinkPopover, setShowLinkPopover] = useState(false);

<Button 
  variant="secondary" 
  onClick={() => setShowLinkPopover(!showLinkPopover)}
>
  {buttonUrl ? 'Editar Link' : 'Adicionar Link'}
</Button>

{showLinkPopover && (
  <Popover position="bottom center" onClose={() => setShowLinkPopover(false)}>
    <LinkControl
      value={{ url: buttonUrl, opensInNewTab: buttonTarget === '_blank' }}
      onChange={(newValue) => {
        setAttributes({
          buttonUrl: newValue.url || '',
          buttonTarget: newValue.opensInNewTab ? '_blank' : '_self'
        });
      }}
      settings={[
        {
          id: 'opensInNewTab',
          title: 'Abrir em nova aba',
        }
      ]}
    />
  </Popover>
)}
```

---

## 🚀 Workflow de Desenvolvimento

1. **Criar estrutura de arquivos** (block.json, block.jsx, block.php, blade)
2. **Registrar no BlockManager.php**
3. **Desenvolver interface do editor** (block.jsx)
4. **Criar template frontend** (blade)
5. **Adicionar JavaScript** (block.js - se necessário)
6. **Compilar** (`npm run build`)
7. **Testar no editor** e frontend
8. **Ajustar estilos** e comportamentos
9. **Deploy**

---
 
## 🐛 Troubleshooting

### Bloco não aparece no editor
- ✅ Verifique se está registrado no `BlockManager.php`
- ✅ Rode `npm run build`
- ✅ Limpe cache do WordPress
- ✅ Verifique se `block.json` tem sintaxe correta

### Atributos não salvam
- ✅ Verifique se estão declarados em `block.json`
- ✅ Confirme que usa `setAttributes()` no editor
- ✅ Verifique tipos de dados (string, boolean, etc)

### Template não renderiza
- ✅ Verifique se o nome do arquivo Blade está correto
- ✅ Confirme que `block.php` chama `view('blocks.nome-correto')`
- ✅ Verifique se variáveis estão sendo passadas

### JavaScript não funciona
- ✅ Verifique se importou em `app.js`
- ✅ Rode `npm run build`
- ✅ Verifique console do navegador para erros
- ✅ Confirme que seletores DOM estão corretos

 