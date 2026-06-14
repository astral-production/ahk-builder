// ============================================
// AHK Builder - Main Application
// ============================================

(function () {
  'use strict';

  let workspace = null;
  let currentZoom = 1;

  // ============================================
  // FAVORITES (persisted in localStorage)
  // ============================================

  const FAVORITES_KEY = 'ahk_builder_favorites';

  function getFavorites() {
    try {
      const data = localStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveFavorites(favs) {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
    } catch (e) {
      // localStorage might be full or unavailable
    }
  }

  function toggleFavorite(blockType) {
    const favs = getFavorites();
    const idx = favs.indexOf(blockType);
    if (idx >= 0) {
      favs.splice(idx, 1);
    } else {
      favs.push(blockType);
    }
    saveFavorites(favs);
    rebuildToolboxWithFavorites();
    return idx < 0; // returns true if now favorited
  }

  function isFavorite(blockType) {
    return getFavorites().indexOf(blockType) >= 0;
  }

  function rebuildToolboxWithFavorites() {
    const toolboxEl = document.getElementById('toolbox');
    if (!toolboxEl) return;
    
    // Clone the original toolbox XML
    const clone = toolboxEl.cloneNode(true);
    const favs = getFavorites();
    
    if (favs.length > 0) {
      // Create Favorites category using the document's createElement
      const favCat = document.createElement('category');
      favCat.setAttribute('name', '⭐ Favorites');
      favCat.setAttribute('colour', '#FFD700');
      favCat.setAttribute('expanded', 'true');
      
      favs.forEach(type => {
        if (Blockly.Blocks[type]) {
          const blockEl = document.createElementNS(null, 'block');
          blockEl.setAttribute('type', type);
          favCat.appendChild(blockEl);
        }
      });
      
      // Insert at the beginning of the toolbox
      clone.insertBefore(favCat, clone.firstChild);
    }
    
    try {
      workspace.updateToolbox(clone);
    } catch (e) {
      console.error('Failed to update toolbox with favorites:', e);
    }
  }

  // Register context menu option for favorites
  function initFavorites() {
    if (!Blockly.ContextMenuRegistry) return;
    
    Blockly.ContextMenuRegistry.registry.register({
      id: 'pin_to_favorites',
      displayText: function(scope) {
        const block = scope.block;
        if (!block) return 'Pin to Favorites';
        return isFavorite(block.type) ? '⭐ Unpin from Favorites' : '☆ Pin to Favorites';
      },
      preconditionFn: function(scope) {
        const block = scope.block;
        if (block && !block.isDeadOrDying() && block.type && block.type.startsWith('ahk_')) {
          return 'enabled';
        }
        return 'hidden';
      },
      callback: function(scope) {
        const block = scope.block;
        if (block) {
          const nowFav = toggleFavorite(block.type);
          const label = block.type.replace('ahk_', '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
          showToast(nowFav ? '⭐ Pinned: ' + label : 'Unpinned: ' + label, 'info');
          // Re-apply search if active
          const searchInput = document.getElementById('searchInput');
          if (searchInput && searchInput.value.trim()) {
            filterToolbox(searchInput.value.trim(), document.getElementById('searchCount'));
          }
        }
      },
      weight: 3,
      scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK
    });
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  function init() {
    initBlockly();
    initFavorites();
    initUI();
    initEvents();
    buildBlockDescriptions();
    initSearch();
    initBlockPreviews();
    rebuildToolboxWithFavorites();
    updateCode();
    setStatus('Ready');
  }

  function initBlockly() {
    const toolbox = document.getElementById('toolbox');

    workspace = Blockly.inject('blocklyDiv', {
      toolbox: toolbox,
      collapse: true,
      comments: false,
      disable: false,
      maxBlocks: Infinity,
      trashcan: true,
      horizontalLayout: false,
      toolboxPosition: 'start',
      css: true,
      media: 'https://unpkg.com/blockly@10.4.3/media/',
      zoom: {
        controls: false,
        wheel: true,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2,
      },
      colours: {
        workspace: '#1a1a2e',
        flyout: '#16213e',
        toolbox: '#16213e',
        scrollbar: '#2a3a5c',
        scrollbarHover: '#3a4a6c',
        insertionMarker: '#7C4DFF',
        insertionMarkerOpacity: 0.3,
      },
      renderer: 'zelos',
    });

    // Listen for workspace changes
    workspace.addChangeListener(function (event) {
      if (event.type !== Blockly.Events.UI) {
        updateCode();
        updateBlockCount();
      }
    });
  }

  // ============================================
  // CODE GENERATION
  // ============================================

  function updateCode() {
    const code = generateAhkCode();
    displayCode(code);
  }

  function generateAhkCode() {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    // Check if workspace is empty
    if (!xml.hasChildNodes()) {
      return '; Your AutoHotkey script will appear here\n; Drag blocks from the toolbox to start building!';
    }
    const code = Blockly.Ahk.workspaceToCode(workspace);
    return code || '; (empty script)';
  }

  function displayCode(code) {
    const el = document.getElementById('generatedCode');
    const highlighted = highlightAhkCode(code);
    el.innerHTML = '<code>' + highlighted + '</code>';
  }

  function getWorkspaceXML() {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const serializer = new XMLSerializer();
    return serializer.serializeToString(xml);
  }

  function loadWorkspaceXML(xmlString) {
    try {
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlString, 'text/xml');
      Blockly.Xml.domToWorkspace(xml, workspace);
      return true;
    } catch (e) {
      console.error('Failed to load XML:', e);
      return false;
    }
  }

  function clearWorkspace() {
    workspace.clear();
  }

  // ============================================
  // BLOCK DESCRIPTIONS (for search & preview)
  // ============================================

  const blockDescriptions = {};

  function buildBlockDescriptions() {
    // Collect all block definitions and their tooltips
    const blockTypes = Object.keys(Blockly.Blocks);
    blockTypes.forEach(type => {
      try {
        const block = new Blockly.Block(workspace, type);
        const tooltip = block.tooltip || '';
        const colour = block.colour || '#78909C';
        blockDescriptions[type] = {
          name: type,
          label: type.replace('ahk_', '').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          tooltip: tooltip,
          colour: colour,
          category: getBlockCategory(type)
        };
        block.dispose(true);
      } catch (e) {
        // Skip built-in Blockly blocks that can't be instantiated standalone
      }
    });
  }

  function getBlockCategory(type) {
    // Map block types to categories based on prefix patterns
    if (type.startsWith('ahk_mouse')) return 'Mouse';
    if (type.startsWith('ahk_send') || type.startsWith('ahk_type') || type.startsWith('ahk_hotkey') || type.startsWith('ahk_hotstring') || type.startsWith('ahk_key') || type.startsWith('ahk_set_delay') || type.startsWith('ahk_send_level')) return 'Keyboard';
    if (type.startsWith('ahk_win') || type.startsWith('ahk_set_title')) return 'Window';
    if (type === 'controls_if' || type.startsWith('ahk_loop') || type.startsWith('ahk_while') || type.startsWith('ahk_for') || type.startsWith('ahk_sleep') || type.startsWith('ahk_run') || type.startsWith('ahk_wait') || type.startsWith('ahk_break') || type.startsWith('ahk_continue') || type.startsWith('ahk_set_timer') || type.startsWith('ahk_goto') || type.startsWith('ahk_gosub') || type.startsWith('ahk_return') || type.startsWith('ahk_label')) return 'Control Flow';
    if (type.startsWith('ahk_set_var') || type.startsWith('ahk_get_var') || type.startsWith('ahk_math_expr') || type.startsWith('ahk_string_concat') || type.startsWith('ahk_clipboard') || type.startsWith('ahk_random') || type.startsWith('ahk_env') || type.startsWith('ahk_set_env')) return 'Variables';
    if (type.startsWith('ahk_msgbox') || type.startsWith('ahk_inputbox') || type.startsWith('ahk_tooltip') || type.startsWith('ahk_splash') || type.startsWith('ahk_progress') || type.startsWith('ahk_tray')) return 'Dialog';
    if (type.startsWith('ahk_file') || type.startsWith('ahk_split') || type.startsWith('ahk_dir')) return 'File';
    if (type.startsWith('ahk_image') || type.startsWith('ahk_pixel')) return 'Image';
    if (type.startsWith('ahk_sound')) return 'Sound';
    if (type.startsWith('ahk_str') || type.startsWith('ahk_string') || type.startsWith('ahk_chr') || type.startsWith('ahk_ord') || type.startsWith('ahk_asc') || type.startsWith('ahk_regex') || type.startsWith('ahk_format')) return 'String';
    if (type.startsWith('ahk_math') || type.startsWith('ahk_minmax') || type.startsWith('ahk_round') || type.startsWith('ahk_mod')) return 'Math';
    if (type.startsWith('ahk_date') || type.startsWith('ahk_format_time') || type.startsWith('ahk_env_time')) return 'Date/Time';
    if (type.startsWith('ahk_reg') || type.startsWith('ahk_ini')) return 'Registry/INI';
    if (type.startsWith('ahk_control')) return 'Control';
    if (type.startsWith('ahk_get_key') || type.startsWith('ahk_set_capslock') || type.startsWith('ahk_coord') || type.startsWith('ahk_dll') || type.startsWith('ahk_com') || type.startsWith('ahk_download') || type.startsWith('ahk_url') || type.startsWith('ahk_sys') || type.startsWith('ahk_var') || type.startsWith('ahk_num') || type.startsWith('ahk_func_meta') || type.startsWith('ahk_callback') || type.startsWith('ahk_critical') || type.startsWith('ahk_debug')) return 'System';
    if (type.startsWith('ahk_gui')) return 'GUI';
    if (type.startsWith('ahk_array') || type.startsWith('ahk_map') || type.startsWith('ahk_object')) return 'Objects';
    if (type.startsWith('ahk_boolean') || type.startsWith('ahk_type')) return 'Constants';
    if (type.startsWith('ahk_comment') || type.startsWith('ahk_msgbox_info') || type.startsWith('ahk_exit') || type.startsWith('ahk_reload') || type.startsWith('ahk_process') || type.startsWith('ahk_block') || type.startsWith('ahk_suspend') || type.startsWith('ahk_pause') || type.startsWith('ahk_send_email') || type.startsWith('ahk_set_working') || type.startsWith('ahk_set_batch') || type.startsWith('ahk_thread') || type.startsWith('ahk_directive') || type.startsWith('ahk_label_')) return 'Actions';
    if (type.startsWith('ahk_raw') || type.startsWith('ahk_function')) return '⚡ Custom';
    if (type.startsWith('ahk_clip_wait')) return 'Dialog';
    return 'Other';
  }

  // ============================================
  // SEARCH
  // ============================================

  let searchTimeout = null;

  function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    const searchCount = document.getElementById('searchCount');

    if (!searchInput) return;

    searchInput.addEventListener('input', function () {
      const query = this.value.trim().toLowerCase();
      
      // Show/hide clear button
      searchClear.classList.toggle('visible', query.length > 0);
      
      // Debounce search
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        filterToolbox(query, searchCount);
      }, 150);
    });

    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        this.value = '';
        searchClear.classList.remove('visible');
        filterToolbox('', searchCount);
        this.blur();
      }
    });

    searchClear.addEventListener('click', function () {
      searchInput.value = '';
      this.classList.remove('visible');
      filterToolbox('', searchCount);
      searchInput.focus();
    });
  }

  function filterToolbox(query, countEl) {
    const toolboxEl = document.getElementById('toolbox');
    if (!toolboxEl) return;

    if (!query) {
      // Reset to original toolbox (after a small delay to avoid rapid updates)
      workspace.updateToolbox(toolboxEl);
      if (countEl) countEl.textContent = '';
      removeToolboxHighlights();
      return;
    }

    // Search through block descriptions
    const results = [];
    Object.values(blockDescriptions).forEach(info => {
      const searchTarget = (info.name + ' ' + info.label + ' ' + info.tooltip + ' ' + info.category).toLowerCase();
      if (searchTarget.includes(query)) {
        results.push(info);
      }
    });

    // Update count
    if (countEl) {
      countEl.textContent = results.length > 0 ? results.length + ' found' : 'no match';
    }

    if (results.length === 0) {
      // Show no results in toolbox
      const noMatchXml = '<xml id="toolbox" style="display:none"><category name="No Results" colour="#78909C"></category></xml>';
      const parser = new DOMParser();
      const xml = parser.parseFromString(noMatchXml, 'text/xml');
      workspace.updateToolbox(xml);
      return;
    }

    // Group results by category and create filtered toolbox XML
    const grouped = {};
    results.forEach(info => {
      const cat = info.category || 'Other';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(info);
    });

    // Build filtered XML
    const catColors = {
      'Mouse': '#5CB85C', 'Keyboard': '#4285F4', 'Window': '#F9A825',
      'Control Flow': '#AB47BC', 'Variables': '#E53935', 'Dialog': '#546E7A',
      'File': '#6D4C41', 'Image': '#00BCD4', 'Sound': '#FF6F00',
      'String': '#00897B', 'Math': '#1E88E5', 'Date/Time': '#00897B',
      'Registry/INI': '#795548', 'Control': '#F9A825', 'System': '#EC407A',
      'GUI': '#7C4DFF', 'Objects': '#7C4DFF', 'Constants': '#78909C',
      'Actions': '#EC407A', '⚡ Custom': '#607D8B', 'Directives': '#455A64'
    };

    let xmlStr = '<xml id="toolbox-search" style="display:none">';
    Object.keys(grouped).sort().forEach(cat => {
      const color = catColors[cat] || '#78909C';
      xmlStr += `<category name="${cat} (${grouped[cat].length})" colour="${color}" expanded="true">`;
      grouped[cat].forEach(info => {
        xmlStr += `<block type="${info.name}"></block>`;
      });
      xmlStr += '</category>';
    });
    xmlStr += '</xml>';

    try {
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlStr, 'text/xml');
      // Validate it parsed correctly
      if (xml.querySelector('parsererror')) {
        console.error('Search XML parse error:', xml.querySelector('parsererror').textContent);
        return;
      }
      workspace.updateToolbox(xml);
    } catch (e) {
      console.error('Search update error:', e);
    }
  }

  function removeToolboxHighlights() {
    document.querySelectorAll('.search-highlight').forEach(el => {
      el.classList.remove('search-highlight');
    });
  }

  // ============================================
  // BLOCK PREVIEW TOOLTIP
  // ============================================

  let previewTooltip = null;
  let previewTimeout = null;

  function initBlockPreviews() {
    // Create tooltip element
    previewTooltip = document.createElement('div');
    previewTooltip.className = 'block-preview-tooltip';
    previewTooltip.id = 'blockPreviewTooltip';
    document.body.appendChild(previewTooltip);

    // Observe the toolbox tree for category hover events
    const observer = new MutationObserver(() => {
      attachToolboxHoverListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Initial attachment after Blockly loads
    setTimeout(attachToolboxHoverListeners, 1000);
  }

  function attachToolboxHoverListeners() {
    const treeRows = document.querySelectorAll('.blocklyTreeRow');
    treeRows.forEach(row => {
      if (row.dataset.previewAttached) return;
      row.dataset.previewAttached = 'true';

      row.addEventListener('mouseenter', function (e) {
        const contentContainer = this.querySelector('.blocklyTreeRowContentContainer');
        if (!contentContainer) return;
        
        const labelEl = contentContainer.querySelector('.blocklyTreeTitle');
        if (!labelEl) return;
        
        const categoryName = labelEl.textContent.trim().replace(/\s*\(\d+\)$/, '');
        if (!categoryName) return;

        // Find category blocks to show a summary
        const blocksInCategory = Object.values(blockDescriptions)
          .filter(info => info.category === categoryName)
          .slice(0, 5); // Show up to 5 blocks

        if (blocksInCategory.length === 0) return;

        const catColor = getCategoryColor(categoryName);
        
        clearTimeout(previewTimeout);
        previewTimeout = setTimeout(() => {
          let html = `<div class="preview-title"><span class="preview-dot" style="background:${catColor}"></span>${categoryName}</div>`;
          html += `<div class="preview-desc">${blocksInCategory.length} blocks available</div>`;
          html += '<div class="preview-syntax">';
          blocksInCategory.forEach((info, i) => {
            html += `${i > 0 ? ', ' : ''}${info.label}`;
          });
          if (Object.values(blockDescriptions).filter(i => i.category === categoryName).length > 5) {
            html += ', ...';
          }
          html += '</div>';
          
          previewTooltip.innerHTML = html;
          
          // Position the tooltip
          const rect = this.getBoundingClientRect();
          previewTooltip.style.left = (rect.right + 10) + 'px';
          previewTooltip.style.top = Math.max(10, rect.top - 10) + 'px';
          
          previewTooltip.classList.add('show');
        }, 400);
      });

      row.addEventListener('mouseleave', function () {
        clearTimeout(previewTimeout);
        previewTooltip.classList.remove('show');
      });
    });
  }

  function getCategoryColor(cat) {
    const colors = {
      'Mouse': '#5CB85C', 'Keyboard': '#4285F4', 'Window': '#F9A825',
      'Control Flow': '#AB47BC', 'Variables': '#E53935', 'Dialog': '#546E7A',
      'File': '#6D4C41', 'Image': '#00BCD4', 'Sound': '#FF6F00',
      'String': '#00897B', 'Math': '#1E88E5', 'Date/Time': '#00897B',
      'Registry/INI': '#795548', 'Control': '#F9A825', 'System': '#EC407A',
      'GUI': '#7C4DFF', 'Objects': '#7C4DFF', 'Constants': '#78909C',
      'Actions': '#EC407A', '⚡ Custom': '#607D8B', 'Directives': '#455A64'
    };
    return colors[cat] || '#78909C';
  }

// ============================================
// BLOCK COUNT
// ============================================

  function updateBlockCount() {
    const count = workspace.getAllBlocks(false).length;
    document.getElementById('blockCount').textContent = count + ' block' + (count !== 1 ? 's' : '');
  }

  // ============================================
  // VERSION TOGGLE
  // ============================================

  let currentVersion = 'v1';

  function setVersion(version) {
    currentVersion = version;
    AHK_VERSION = version;

    // Update toggle UI
    document.querySelectorAll('.toggle-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.version === version);
    });

    // Update code label
    const badge = document.querySelector('.version-badge');
    if (badge) {
      badge.textContent = 'AHK ' + version.toUpperCase();
      badge.className = 'version-badge ' + version;
    }

    // Regenerate code
    updateCode();
    setStatus('Switched to AHK ' + version.toUpperCase());
  }

  // ============================================
  // UI CONTROLS
  // ============================================

  function initUI() {
    // Tab switching
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        const target = this.dataset.tab;
        // Update tab states
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        // Update panels
        document.querySelectorAll('.panel-content').forEach(p => p.classList.remove('active'));
        document.getElementById('panel' + target.charAt(0).toUpperCase() + target.slice(1)).classList.add('active');
      });
    });

    // Version toggle
    document.querySelectorAll('.toggle-option').forEach(opt => {
      opt.addEventListener('click', function () {
        const version = this.dataset.version;
        if (version !== currentVersion) {
          setVersion(version);
        }
      });
    });
  }

  // ============================================
  // EVENT HANDLERS
  // ============================================

  function initEvents() {
    // New Project
    document.getElementById('btnNew').addEventListener('click', function () {
      if (workspace.getAllBlocks(false).length > 0) {
        if (confirm('Create a new project? Current blocks will be cleared.')) {
          clearWorkspace();
          document.getElementById('projectName').value = 'My AutoHotkey Script';
          setStatus('New project created');
          showToast('New project created', 'info');
        }
      } else {
        clearWorkspace();
        document.getElementById('projectName').value = 'My AutoHotkey Script';
      }
    });

    // Save Project
    document.getElementById('btnSave').addEventListener('click', function () {
      const projectName = document.getElementById('projectName').value || 'untitled';
      const xml = getWorkspaceXML();

      fetch('/api/save-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ xml: xml, projectName: projectName }),
      })
        .then(r => r.json())
        .then(data => {
          if (data.status === 'ok') {
            setStatus('Project saved: ' + projectName + '.xml');
            showToast('Project saved!', 'success');
          }
        })
        .catch(err => {
          console.error('Save error:', err);
          // Fallback: download as file
          downloadAsFile(projectName + '.xml', xml);
          showToast('Project downloaded', 'success');
        });
    });

    // Load Project
    document.getElementById('btnLoad').addEventListener('click', function () {
      document.getElementById('fileInput').click();
    });

    document.getElementById('fileInput').addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (ev) {
        const xml = ev.target.result;
        // Try to extract name
        const name = file.name.replace(/\.xml$/i, '');
        document.getElementById('projectName').value = name;

        clearWorkspace();
        if (loadWorkspaceXML(xml)) {
          setStatus('Loaded: ' + file.name);
          showToast('Project loaded: ' + file.name, 'success');
        } else {
          showToast('Failed to load project file', 'error');
        }
      };
      reader.readAsText(file);
      // Reset the input so same file can be loaded again
      this.value = '';
    });

    // Export AHK
    document.getElementById('btnExportAHK').addEventListener('click', function () {
      const code = generateAhkCode();
      const projectName = document.getElementById('projectName').value || 'MyScript';

      fetch('/api/save-ahk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code, filename: projectName }),
      })
        .then(r => r.json())
        .then(data => {
          if (data.status === 'ok') {
            setStatus('Exported: ' + data.filename);
            showToast('Exported as ' + data.filename, 'success');
          }
        })
        .catch(err => {
          // Fallback: download the file
          downloadAsFile(projectName + '.ahk', code);
          showToast('Script downloaded as ' + projectName + '.ahk', 'success');
        });
    });

    // Run with AutoHotkey
    document.getElementById('btnRun').addEventListener('click', function () {
      const code = generateAhkCode();

      if (code.startsWith('; Your AutoHotkey script') || code.startsWith('; (empty script)')) {
        showToast('Add some blocks first!', 'error');
        return;
      }

      setStatus('Running script...');

      fetch('/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code, version: currentVersion }),
      })
        .then(r => r.json())
        .then(data => {
          if (data.status === 'ok') {
            setStatus('Script is running');
            showToast('Script started!', 'success');
          } else {
            setStatus('Error: ' + data.message);
            showToast(data.message, 'error');
          }
        })
        .catch(err => {
          setStatus('Error running script');
          showToast('Could not run script. Is AutoHotkey installed?', 'error');
        });
    });

    // Copy Code
    document.getElementById('btnCopyCode').addEventListener('click', function () {
      const code = generateAhkCode();
      navigator.clipboard.writeText(code).then(() => {
        showToast('Code copied to clipboard!', 'success');
      }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Code copied!', 'success');
      });
    });

    // Zoom controls
    document.getElementById('btnZoomIn').addEventListener('click', function () {
      const scale = workspace.getScale() * 1.2;
      if (scale <= 3) {
        workspace.setScale(scale);
        updateZoomDisplay();
      }
    });

    document.getElementById('btnZoomOut').addEventListener('click', function () {
      const scale = workspace.getScale() / 1.2;
      if (scale >= 0.3) {
        workspace.setScale(scale);
        updateZoomDisplay();
      }
    });

    document.getElementById('btnZoomReset').addEventListener('click', function () {
      workspace.setScale(1);
      updateZoomDisplay();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function (e) {
      // Ctrl+S = Save
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        document.getElementById('btnSave').click();
      }
      // Ctrl+Shift+E = Export
      if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        document.getElementById('btnExportAHK').click();
      }
      // Ctrl+Enter = Run
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('btnRun').click();
      }
      // Ctrl+N = New
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        document.getElementById('btnNew').click();
      }
      // Ctrl+F = Focus search
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.focus();
      }
    });
  }

  function updateZoomDisplay() {
    const scale = workspace.getScale();
    document.getElementById('btnZoomReset').textContent = Math.round(scale * 100) + '%';
  }

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================

  function setStatus(message) {
    document.getElementById('statusText').textContent = message;
  }

  function showToast(message, type) {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast ' + (type || 'info');
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto-remove
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  function downloadAsFile(filename, content) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ============================================
  // START
  // ============================================

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
