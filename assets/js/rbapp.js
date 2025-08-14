// Resume Builder Application
class ResumeBuilder {
    constructor() {
        this.currentTemplate = null;
        this.resumeData = this.getDefaultResumeData();
        this.customization = this.getDefaultCustomization();
        this.customSections = [];
        this.zoomLevel = 1;
        this.autoSaveTimeout = null;
        this.sortables = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderTemplateGallery();
        this.setupFormValidation();
        this.loadFromStorage();
        setTimeout(() => {
            this.setupDragAndDrop();
        }, 500);
    }

    // Template data with 10 unique designs
    getTemplateData() {
        return [
            {
                "id": "modern-two-column",
                "name": "Modern Two-Column",
                "category": "modern",
                "description": "Professional sidebar layout with modern styling and color accents",
                "features": ["Sidebar layout", "Color headers", "Modern typography"],
                "layout": "two-column"
            },
            {
                "id": "creative-header",
                "name": "Creative Header",
                "category": "creative",
                "description": "Eye-catching large header with gradient background",
                "features": ["Gradient header", "Creative layout", "Visual impact"],
                "layout": "single-column"
            },
            {
                "id": "minimalist-clean",
                "name": "Minimalist Clean",
                "category": "minimalist",
                "description": "Clean, simple design focusing on content with lots of whitespace",
                "features": ["Minimal styling", "Clean lines", "Maximum readability"],
                "layout": "single-column"
            },
            {
                "id": "executive-bold",
                "name": "Executive Bold",
                "category": "professional",
                "description": "Dark header design perfect for senior professionals",
                "features": ["Dark header", "Executive styling", "Professional"],
                "layout": "single-column"
            },
            {
                "id": "ats-simple",
                "name": "ATS Simple",
                "category": "minimalist",
                "description": "ATS-optimized format with no graphics or complex layouts",
                "features": ["ATS-friendly", "Simple formatting", "No graphics"],
                "layout": "single-column"
            },
            {
                "id": "designer-portfolio",
                "name": "Designer Portfolio",
                "category": "creative",
                "description": "Creative layout with visual elements and artistic flair",
                "features": ["Creative elements", "Visual design", "Portfolio style"],
                "layout": "portfolio"
            },
            {
                "id": "academic-format",
                "name": "Academic Format",
                "category": "classic",
                "description": "Traditional academic style with formal typography",
                "features": ["Traditional layout", "Academic style", "Formal"],
                "layout": "single-column"
            },
            {
                "id": "tech-professional",
                "name": "Tech Professional",
                "category": "modern",
                "description": "Modern tech-focused design with clean code-friendly styling",
                "features": ["Tech styling", "Modern layout", "Code-friendly"],
                "layout": "two-column"
            },
            {
                "id": "sales-marketing",
                "name": "Sales & Marketing",
                "category": "professional",
                "description": "Dynamic, results-focused layout with bold colors",
                "features": ["Dynamic design", "Results focus", "Bold styling"],
                "layout": "single-column"
            },
            {
                "id": "elegant-classic",
                "name": "Elegant Classic",
                "category": "classic",
                "description": "Timeless design with serif fonts and classic styling",
                "features": ["Serif typography", "Classic style", "Elegant"],
                "layout": "single-column"
            }
        ];
    }

    getColorPalettes() {
        return [
            {
                "name": "Professional Blue",
                "primary": "#2563eb",
                "secondary": "#1e40af",
                "accent": "#3b82f6",
                "text": "#1f2937",
                "background": "#ffffff"
            },
            {
                "name": "Executive Navy",
                "primary": "#1e3a8a",
                "secondary": "#0f172a",
                "accent": "#1e40af",
                "text": "#111827",
                "background": "#ffffff"
            },
            {
                "name": "Modern Teal",
                "primary": "#0891b2",
                "secondary": "#0e7490",
                "accent": "#06b6d4",
                "text": "#1f2937",
                "background": "#ffffff"
            },
            {
                "name": "Creative Purple",
                "primary": "#7c3aed",
                "secondary": "#6d28d9",
                "accent": "#8b5cf6",
                "text": "#1f2937",
                "background": "#ffffff"
            },
            {
                "name": "Elegant Green",
                "primary": "#059669",
                "secondary": "#047857",
                "accent": "#10b981",
                "text": "#1f2937",
                "background": "#ffffff"
            }
        ];
    }

    getFonts() {
        return [
            {
                "name": "Inter",
                "family": "'Inter', system-ui, sans-serif",
                "description": "Modern, professional sans-serif"
            },
            {
                "name": "Roboto",
                "family": "'Roboto', Arial, sans-serif",
                "description": "Clean, readable Google font"
            },
            {
                "name": "Open Sans",
                "family": "'Open Sans', Arial, sans-serif",
                "description": "Friendly, open sans-serif"
            },
            {
                "name": "Lato",
                "family": "'Lato', Arial, sans-serif",
                "description": "Elegant, humanist sans-serif"
            },
            {
                "name": "Playfair Display",
                "family": "'Playfair Display', serif",
                "description": "Elegant serif for classic styles"
            },
            {
                "name": "Source Serif Pro",
                "family": "'Source Serif Pro', serif",
                "description": "Professional serif font"
            }
        ];
    }

    getDefaultResumeData() {
        return {
            personal: {
                fullName: '',
                jobTitle: '',
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                website: ''
            },
            summary: '',
            experience: [],
            education: [],
            skills: [],
            projects: [],
            certifications: [],
            sectionOrder: ['personal', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications'],
            hiddenSections: []
        };
    }

    getDefaultCustomization() {
        return {
            colorPalette: this.getColorPalettes()[0],
            font: this.getFonts()[0],
            fontSize: 14,
            margins: 20,
            lineHeight: 1.5
        };
    }

    setupEventListeners() {
        // Template selection
        document.addEventListener('click', (e) => {
            if (e.target.closest('.template-card')) {
                e.preventDefault();
                const templateId = e.target.closest('.template-card').dataset.templateId;
                this.selectTemplate(templateId);
            }
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.filterTemplates(e.target.dataset.filter);
            });
        });

        // Navigation
        const backBtn = document.getElementById('back-to-templates');
        if (backBtn) {
            backBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showHomepage();
            });
        }

        // Tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Form inputs
        document.addEventListener('input', (e) => {
            if (e.target.matches('.form-control')) {
                this.handleFormInput(e.target);
            }
        });

        // Add item buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('.add-item')) {
                e.preventDefault();
                const section = e.target.closest('[data-section]').dataset.section;
                this.addItem(section);
            }
        });

        // Toggle sections
        document.addEventListener('click', (e) => {
            if (e.target.matches('.toggle-section')) {
                e.preventDefault();
                const section = e.target.closest('.form-section');
                const sectionName = section.dataset.section;
                this.toggleSectionVisibility(sectionName);
            }
        });

        // Custom section
        const addCustomBtn = document.getElementById('add-custom-section');
        if (addCustomBtn) {
            addCustomBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showCustomSectionModal();
            });
        }

        // Action buttons
        this.setupActionButtons();

        // Zoom controls
        this.setupZoomControls();

        // Modal handlers
        this.setupModalHandlers();

        // Mobile toggle
        const mobileToggle = document.getElementById('mobile-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMobileView();
            });
        }
    }

    setupActionButtons() {
        const saveBtn = document.getElementById('save-resume');
        const loadBtn = document.getElementById('load-resume');
        const importBtn = document.getElementById('import-data');
        const exportBtn = document.getElementById('export-data');
        const pdfBtn = document.getElementById('export-pdf');

        if (saveBtn) saveBtn.addEventListener('click', (e) => { e.preventDefault(); this.showSaveModal(); });
        if (loadBtn) loadBtn.addEventListener('click', (e) => { e.preventDefault(); this.showLoadModal(); });
        if (importBtn) importBtn.addEventListener('click', (e) => { e.preventDefault(); this.showImportModal(); });
        if (exportBtn) exportBtn.addEventListener('click', (e) => { e.preventDefault(); this.showExportModal(); });
        if (pdfBtn) pdfBtn.addEventListener('click', (e) => { e.preventDefault(); this.exportToPDF(); });
    }

    setupZoomControls() {
        const zoomInBtn = document.getElementById('zoom-in');
        const zoomOutBtn = document.getElementById('zoom-out');
        const resetBtn = document.getElementById('reset-zoom');
        
        if (zoomInBtn) zoomInBtn.addEventListener('click', (e) => { e.preventDefault(); this.zoomIn(); });
        if (zoomOutBtn) zoomOutBtn.addEventListener('click', (e) => { e.preventDefault(); this.zoomOut(); });
        if (resetBtn) resetBtn.addEventListener('click', (e) => { e.preventDefault(); this.resetZoom(); });
    }

    setupModalHandlers() {
        // Close modal handlers
        document.addEventListener('click', (e) => {
            if (e.target.matches('.modal-close') || (e.target.matches('.modal') && !e.target.closest('.modal-content'))) {
                this.closeModal();
            }
        });

        // Custom section modal
        const customSectionAdd = document.getElementById('custom-section-add');
        const customSectionCancel = document.getElementById('custom-section-cancel');
        
        if (customSectionAdd) customSectionAdd.addEventListener('click', () => this.addCustomSection());
        if (customSectionCancel) customSectionCancel.addEventListener('click', () => this.closeModal());

        // Import/Export modal
        const importConfirm = document.getElementById('import-export-confirm');
        const importCancel = document.getElementById('import-export-cancel');
        
        if (importConfirm) importConfirm.addEventListener('click', () => this.handleImport());
        if (importCancel) importCancel.addEventListener('click', () => this.closeModal());

        // Save/Load modal
        const modalCancel = document.getElementById('modal-cancel');
        const modalConfirm = document.getElementById('modal-confirm');
        
        if (modalCancel) modalCancel.addEventListener('click', () => this.closeModal());
    }

    setupDragAndDrop() {
        const formSections = document.getElementById('form-sections');
        if (formSections && window.Sortable) {
            this.sortables.sections = Sortable.create(formSections, {
                handle: '.drag-handle',
                animation: 150,
                onEnd: (evt) => {
                    this.reorderSections(evt.oldIndex, evt.newIndex);
                }
            });
        }
    }

    renderTemplateGallery() {
        const grid = document.getElementById('templates-grid');
        if (!grid) return;
        
        const templates = this.getTemplateData();

        grid.innerHTML = templates.map(template => `
            <div class="template-card" data-template-id="${template.id}" data-category="${template.category}">
                <div class="template-preview">
                    <div class="template-category">${template.category}</div>
                    <div class="template-preview-content">📄</div>
                </div>
                <div class="template-info">
                    <h3 class="template-name">${template.name}</h3>
                    <p class="template-description">${template.description}</p>
                    <div class="template-features">
                        ${template.features.map(feature => 
                            `<span class="template-feature">${feature}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `).join('');

        this.renderCustomizationOptions();
    }

    renderCustomizationOptions() {
        // Color palettes
        const colorPalettes = document.getElementById('color-palettes');
        if (colorPalettes) {
            colorPalettes.innerHTML = this.getColorPalettes().map((palette, index) => `
                <div class="color-palette ${index === 0 ? 'active' : ''}" data-palette-index="${index}">
                    <div class="color-preview">
                        <div class="color-swatch" style="background: ${palette.primary}"></div>
                        <div class="color-swatch" style="background: ${palette.secondary}"></div>
                        <div class="color-swatch" style="background: ${palette.accent}"></div>
                    </div>
                    <span class="palette-name">${palette.name}</span>
                </div>
            `).join('');

            colorPalettes.addEventListener('click', (e) => {
                const palette = e.target.closest('.color-palette');
                if (palette) {
                    e.preventDefault();
                    document.querySelectorAll('.color-palette').forEach(p => p.classList.remove('active'));
                    palette.classList.add('active');
                    this.customization.colorPalette = this.getColorPalettes()[parseInt(palette.dataset.paletteIndex)];
                    this.updatePreview();
                    this.autoSave();
                }
            });
        }

        // Font selector
        const fontSelector = document.getElementById('font-selector');
        if (fontSelector) {
            fontSelector.innerHTML = this.getFonts().map((font, index) => 
                `<option value="${index}">${font.name} - ${font.description}</option>`
            ).join('');

            fontSelector.addEventListener('change', (e) => {
                this.customization.font = this.getFonts()[parseInt(e.target.value)];
                this.updatePreview();
                this.autoSave();
            });
        }

        // Layout controls
        this.setupRangeControls();
    }

    setupRangeControls() {
        const controls = [
            { id: 'margin-control', prop: 'margins', suffix: 'px', min: 10, max: 40 },
            { id: 'line-height-control', prop: 'lineHeight', suffix: '', min: 1.2, max: 2 },
            { id: 'font-size-control', prop: 'fontSize', suffix: 'px', min: 12, max: 16 }
        ];

        controls.forEach(control => {
            const element = document.getElementById(control.id);
            if (element) {
                element.addEventListener('input', (e) => {
                    const value = parseFloat(e.target.value);
                    this.customization[control.prop] = value;
                    const rangeValue = element.parentNode.querySelector('.range-value');
                    if (rangeValue) rangeValue.textContent = value + control.suffix;
                    this.updatePreview();
                    this.autoSave();
                });
            }
        });
    }

    filterTemplates(filter) {
        const templates = document.querySelectorAll('.template-card');
        templates.forEach(template => {
            if (filter === 'all' || template.dataset.category === filter) {
                template.style.display = 'block';
            } else {
                template.style.display = 'none';
            }
        });
    }

    selectTemplate(templateId) {
        this.currentTemplate = this.getTemplateData().find(t => t.id === templateId);
        const templateNameEl = document.getElementById('current-template-name');
        if (templateNameEl) {
            templateNameEl.textContent = this.currentTemplate.name;
        }
        this.showBuilder();
        this.setupFormFields();
        this.updatePreview();
        this.renderTemplateThumbnails();
        this.renderSectionManager();
    }

    showHomepage() {
        const homepage = document.getElementById('homepage');
        const builder = document.getElementById('builder');
        
        if (homepage) homepage.classList.remove('hidden');
        if (builder) builder.classList.add('hidden');
    }

    showBuilder() {
        const homepage = document.getElementById('homepage');
        const builder = document.getElementById('builder');
        
        if (homepage) homepage.classList.add('hidden');
        if (builder) builder.classList.remove('hidden');
        
        this.switchTab('content');
    }

    switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        const tabBtn = document.querySelector(`[data-tab="${tabName}"]`);
        const tabContent = document.getElementById(`${tabName}-tab`);
        
        if (tabBtn) tabBtn.classList.add('active');
        if (tabContent) tabContent.classList.add('active');
    }

    setupFormFields() {
        this.populatePersonalInfo();
        this.renderAllSections();
        this.setupCharacterCounters();
    }

    populatePersonalInfo() {
        const personalSection = document.querySelector('[data-section="personal"] .section-content');
        if (personalSection) {
            Object.keys(this.resumeData.personal).forEach(key => {
                const input = personalSection.querySelector(`[name="${key}"]`);
                if (input) {
                    input.value = this.resumeData.personal[key] || '';
                }
            });
        }

        const summaryTextarea = document.querySelector('[name="summary"]');
        if (summaryTextarea) {
            summaryTextarea.value = this.resumeData.summary || '';
        }
    }

    renderAllSections() {
        this.renderExperienceItems();
        this.renderEducationItems();
        this.renderSkillsItems();
        this.renderProjectItems();
        this.renderCertificationItems();
        this.renderCustomSections();
    }

    renderExperienceItems() {
        const container = document.getElementById('experience-list');
        if (!container) return;
        
        if (this.resumeData.experience.length === 0) {
            container.innerHTML = '<p style="color: var(--color-text-secondary); font-style: italic; text-align: center; padding: 20px;">No experience added yet. Click "Add Experience" to get started.</p>';
            return;
        }
        
        container.innerHTML = this.resumeData.experience.map((exp, index) => `
            <div class="list-item" data-index="${index}">
                <div class="item-header">
                    <span class="item-title">${exp.position || 'New Position'} ${exp.company ? `at ${exp.company}` : ''}</span>
                    <div class="item-actions">
                        <button type="button" class="item-action" onclick="resumeBuilder.moveItem('experience', ${index}, -1)" title="Move up">↑</button>
                        <button type="button" class="item-action" onclick="resumeBuilder.moveItem('experience', ${index}, 1)" title="Move down">↓</button>
                        <button type="button" class="item-action delete" onclick="resumeBuilder.removeItem('experience', ${index})" title="Delete">×</button>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Position *</label>
                        <input type="text" class="form-control" value="${exp.position || ''}" 
                               onchange="resumeBuilder.updateItem('experience', ${index}, 'position', this.value)" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Company *</label>
                        <input type="text" class="form-control" value="${exp.company || ''}" 
                               onchange="resumeBuilder.updateItem('experience', ${index}, 'company', this.value)" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Start Date</label>
                        <input type="month" class="form-control" value="${exp.startDate || ''}" 
                               onchange="resumeBuilder.updateItem('experience', ${index}, 'startDate', this.value)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">End Date</label>
                        <input type="month" class="form-control" value="${exp.endDate || ''}" 
                               onchange="resumeBuilder.updateItem('experience', ${index}, 'endDate', this.value)"
                               ${exp.current ? 'disabled' : ''}>
                    </div>
                </div>
                <div class="form-group">
                    <label style="display: flex; align-items: center; gap: 8px;">
                        <input type="checkbox" ${exp.current ? 'checked' : ''} 
                               onchange="resumeBuilder.updateItem('experience', ${index}, 'current', this.checked)">
                        Currently working here
                    </label>
                </div>
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea class="form-control" rows="3" maxlength="500"
                              onchange="resumeBuilder.updateItem('experience', ${index}, 'description', this.value)">${exp.description || ''}</textarea>
                    <div class="char-count">0/500 characters</div>
                </div>
            </div>
        `).join('');
    }

    renderEducationItems() {
        const container = document.getElementById('education-list');
        if (!container) return;
        
        if (this.resumeData.education.length === 0) {
            container.innerHTML = '<p style="color: var(--color-text-secondary); font-style: italic; text-align: center; padding: 20px;">No education added yet. Click "Add Education" to get started.</p>';
            return;
        }
        
        container.innerHTML = this.resumeData.education.map((edu, index) => `
            <div class="list-item" data-index="${index}">
                <div class="item-header">
                    <span class="item-title">${edu.degree || 'New Degree'} ${edu.school ? `at ${edu.school}` : ''}</span>
                    <div class="item-actions">
                        <button type="button" class="item-action" onclick="resumeBuilder.moveItem('education', ${index}, -1)" title="Move up">↑</button>
                        <button type="button" class="item-action" onclick="resumeBuilder.moveItem('education', ${index}, 1)" title="Move down">↓</button>
                        <button type="button" class="item-action delete" onclick="resumeBuilder.removeItem('education', ${index})" title="Delete">×</button>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">School *</label>
                        <input type="text" class="form-control" value="${edu.school || ''}" 
                               onchange="resumeBuilder.updateItem('education', ${index}, 'school', this.value)" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Degree *</label>
                        <input type="text" class="form-control" value="${edu.degree || ''}" 
                               onchange="resumeBuilder.updateItem('education', ${index}, 'degree', this.value)" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Field of Study</label>
                        <input type="text" class="form-control" value="${edu.field || ''}" 
                               onchange="resumeBuilder.updateItem('education', ${index}, 'field', this.value)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">GPA (Optional)</label>
                        <input type="text" class="form-control" value="${edu.gpa || ''}" 
                               onchange="resumeBuilder.updateItem('education', ${index}, 'gpa', this.value)">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Start Date</label>
                        <input type="month" class="form-control" value="${edu.startDate || ''}" 
                               onchange="resumeBuilder.updateItem('education', ${index}, 'startDate', this.value)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">End Date</label>
                        <input type="month" class="form-control" value="${edu.endDate || ''}" 
                               onchange="resumeBuilder.updateItem('education', ${index}, 'endDate', this.value)">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea class="form-control" rows="2" maxlength="300"
                              onchange="resumeBuilder.updateItem('education', ${index}, 'description', this.value)">${edu.description || ''}</textarea>
                    <div class="char-count">0/300 characters</div>
                </div>
            </div>
        `).join('');
    }

    renderSkillsItems() {
        const container = document.getElementById('skills-list');
        if (!container) return;
        
        if (this.resumeData.skills.length === 0) {
            container.innerHTML = '<p style="color: var(--color-text-secondary); font-style: italic; text-align: center; padding: 20px;">No skills added yet. Click "Add Skill" to get started.</p>';
            return;
        }
        
        container.innerHTML = this.resumeData.skills.map((skill, index) => `
            <div class="list-item" data-index="${index}">
                <div class="item-header">
                    <span class="item-title">${skill.category || 'New Skill Category'}: ${skill.name || ''}</span>
                    <div class="item-actions">
                        <button type="button" class="item-action" onclick="resumeBuilder.moveItem('skills', ${index}, -1)" title="Move up">↑</button>
                        <button type="button" class="item-action" onclick="resumeBuilder.moveItem('skills', ${index}, 1)" title="Move down">↓</button>
                        <button type="button" class="item-action delete" onclick="resumeBuilder.removeItem('skills', ${index})" title="Delete">×</button>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Skill Category *</label>
                        <input type="text" class="form-control" value="${skill.category || ''}" 
                               placeholder="e.g., Technical Skills, Languages" 
                               onchange="resumeBuilder.updateItem('skills', ${index}, 'category', this.value)" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Skill Name *</label>
                        <input type="text" class="form-control" value="${skill.name || ''}" 
                               placeholder="e.g., JavaScript, Spanish" 
                               onchange="resumeBuilder.updateItem('skills', ${index}, 'name', this.value)" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Proficiency Level</label>
                        <select class="form-control" onchange="resumeBuilder.updateItem('skills', ${index}, 'level', this.value)">
                            <option value="">Select level</option>
                            <option value="Beginner" ${skill.level === 'Beginner' ? 'selected' : ''}>Beginner</option>
                            <option value="Intermediate" ${skill.level === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
                            <option value="Advanced" ${skill.level === 'Advanced' ? 'selected' : ''}>Advanced</option>
                            <option value="Expert" ${skill.level === 'Expert' ? 'selected' : ''}>Expert</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Years of Experience</label>
                        <input type="number" class="form-control" value="${skill.years || ''}" 
                               min="0" max="50" placeholder="Years" 
                               onchange="resumeBuilder.updateItem('skills', ${index}, 'years', this.value)">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Details/Description</label>
                    <textarea class="form-control" rows="2" maxlength="200"
                              placeholder="Brief description or specific technologies/frameworks"
                              onchange="resumeBuilder.updateItem('skills', ${index}, 'details', this.value)">${skill.details || ''}</textarea>
                    <div class="char-count">0/200 characters</div>
                </div>
            </div>
        `).join('');
    }

    renderProjectItems() {
        const container = document.getElementById('projects-list');
        if (!container) return;
        
        if (this.resumeData.projects.length === 0) {
            container.innerHTML = '<p style="color: var(--color-text-secondary); font-style: italic; text-align: center; padding: 20px;">No projects added yet. Click "Add Project" to get started.</p>';
            return;
        }
        
        container.innerHTML = this.resumeData.projects.map((project, index) => `
            <div class="list-item" data-index="${index}">
                <div class="item-header">
                    <span class="item-title">${project.title || 'New Project'}</span>
                    <div class="item-actions">
                        <button type="button" class="item-action" onclick="resumeBuilder.moveItem('projects', ${index}, -1)" title="Move up">↑</button>
                        <button type="button" class="item-action" onclick="resumeBuilder.moveItem('projects', ${index}, 1)" title="Move down">↓</button>
                        <button type="button" class="item-action delete" onclick="resumeBuilder.removeItem('projects', ${index})" title="Delete">×</button>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Project Title *</label>
                    <input type="text" class="form-control" value="${project.title || ''}" 
                           onchange="resumeBuilder.updateItem('projects', ${index}, 'title', this.value)" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea class="form-control" rows="3" maxlength="400"
                              onchange="resumeBuilder.updateItem('projects', ${index}, 'description', this.value)">${project.description || ''}</textarea>
                    <div class="char-count">0/400 characters</div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Technologies Used</label>
                        <input type="text" class="form-control" value="${project.technologies || ''}" 
                               placeholder="React, Node.js, MongoDB" 
                               onchange="resumeBuilder.updateItem('projects', ${index}, 'technologies', this.value)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Project Link</label>
                        <input type="url" class="form-control" value="${project.link || ''}" 
                               placeholder="https://github.com/username/project" 
                               onchange="resumeBuilder.updateItem('projects', ${index}, 'link', this.value)">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Start Date</label>
                        <input type="month" class="form-control" value="${project.startDate || ''}" 
                               onchange="resumeBuilder.updateItem('projects', ${index}, 'startDate', this.value)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">End Date</label>
                        <input type="month" class="form-control" value="${project.endDate || ''}" 
                               onchange="resumeBuilder.updateItem('projects', ${index}, 'endDate', this.value)">
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderCertificationItems() {
        const container = document.getElementById('certifications-list');
        if (!container) return;
        
        if (this.resumeData.certifications.length === 0) {
            container.innerHTML = '<p style="color: var(--color-text-secondary); font-style: italic; text-align: center; padding: 20px;">No certifications added yet. Click "Add Certification" to get started.</p>';
            return;
        }
        
        container.innerHTML = this.resumeData.certifications.map((cert, index) => `
            <div class="list-item" data-index="${index}">
                <div class="item-header">
                    <span class="item-title">${cert.name || 'New Certification'}</span>
                    <div class="item-actions">
                        <button type="button" class="item-action" onclick="resumeBuilder.moveItem('certifications', ${index}, -1)" title="Move up">↑</button>
                        <button type="button" class="item-action" onclick="resumeBuilder.moveItem('certifications', ${index}, 1)" title="Move down">↓</button>
                        <button type="button" class="item-action delete" onclick="resumeBuilder.removeItem('certifications', ${index})" title="Delete">×</button>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Certification Name *</label>
                        <input type="text" class="form-control" value="${cert.name || ''}" 
                               onchange="resumeBuilder.updateItem('certifications', ${index}, 'name', this.value)" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Issuing Organization *</label>
                        <input type="text" class="form-control" value="${cert.issuer || ''}" 
                               onchange="resumeBuilder.updateItem('certifications', ${index}, 'issuer', this.value)" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Issue Date</label>
                        <input type="month" class="form-control" value="${cert.date || ''}" 
                               onchange="resumeBuilder.updateItem('certifications', ${index}, 'date', this.value)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Expiry Date</label>
                        <input type="month" class="form-control" value="${cert.expiryDate || ''}" 
                               onchange="resumeBuilder.updateItem('certifications', ${index}, 'expiryDate', this.value)">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Credential ID</label>
                        <input type="text" class="form-control" value="${cert.credentialId || ''}" 
                               onchange="resumeBuilder.updateItem('certifications', ${index}, 'credentialId', this.value)">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Credential URL</label>
                        <input type="url" class="form-control" value="${cert.link || ''}" 
                               placeholder="https://credential-url.com" 
                               onchange="resumeBuilder.updateItem('certifications', ${index}, 'link', this.value)">
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderCustomSections() {
        const formSections = document.getElementById('form-sections');
        if (!formSections) return;

        // Remove existing custom sections
        formSections.querySelectorAll('.form-section[data-custom="true"]').forEach(section => {
            section.remove();
        });

        // Add custom sections
        this.customSections.forEach((customSection, index) => {
            const sectionHTML = this.createCustomSectionHTML(customSection, index);
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = sectionHTML;
            formSections.appendChild(tempDiv.firstElementChild);
        });
    }

    createCustomSectionHTML(customSection, index) {
        const sectionId = `custom-${customSection.id}`;
        
        return `
            <div class="form-section" data-section="${sectionId}" data-custom="true">
                <div class="section-header">
                    <span class="section-icon">${customSection.icon}</span>
                    <h3>${customSection.name}</h3>
                    <div class="section-controls">
                        <span class="drag-handle">⋮⋮</span>
                        ${customSection.type === 'list' ? `<button class="add-item btn btn--sm">+ Add Item</button>` : ''}
                        <button class="toggle-section" title="Toggle section">👁️</button>
                        <button class="item-action delete" onclick="resumeBuilder.removeCustomSection(${index})" title="Delete section">×</button>
                    </div>
                </div>
                <div class="section-content">
                    <div id="${sectionId}-list" class="items-list">
                        ${this.renderCustomSectionContent(customSection)}
                    </div>
                </div>
            </div>
        `;
    }

    renderCustomSectionContent(customSection) {
        const data = this.resumeData[`custom-${customSection.id}`] || [];
        
        if (customSection.type === 'text') {
            return `
                <div class="form-group">
                    <textarea class="form-control" rows="4" maxlength="1000"
                              placeholder="Enter ${customSection.name.toLowerCase()} information..."
                              onchange="resumeBuilder.updateCustomSectionText('${customSection.id}', this.value)">${data || ''}</textarea>
                    <div class="char-count">0/1000 characters</div>
                </div>
            `;
        } else if (customSection.type === 'list') {
            if (data.length === 0) {
                return '<p style="color: var(--color-text-secondary); font-style: italic; text-align: center; padding: 20px;">No items added yet. Click "Add Item" to get started.</p>';
            }
            
            return data.map((item, index) => `
                <div class="list-item" data-index="${index}">
                    <div class="item-header">
                        <span class="item-title">${item.title || 'New Item'}</span>
                        <div class="item-actions">
                            <button type="button" class="item-action" onclick="resumeBuilder.moveCustomItem('${customSection.id}', ${index}, -1)" title="Move up">↑</button>
                            <button type="button" class="item-action" onclick="resumeBuilder.moveCustomItem('${customSection.id}', ${index}, 1)" title="Move down">↓</button>
                            <button type="button" class="item-action delete" onclick="resumeBuilder.removeCustomItem('${customSection.id}', ${index})" title="Delete">×</button>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Title *</label>
                            <input type="text" class="form-control" value="${item.title || ''}" 
                                   onchange="resumeBuilder.updateCustomItem('${customSection.id}', ${index}, 'title', this.value)" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Organization</label>
                            <input type="text" class="form-control" value="${item.organization || ''}" 
                                   onchange="resumeBuilder.updateCustomItem('${customSection.id}', ${index}, 'organization', this.value)">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Start Date</label>
                            <input type="month" class="form-control" value="${item.startDate || ''}" 
                                   onchange="resumeBuilder.updateCustomItem('${customSection.id}', ${index}, 'startDate', this.value)">
                        </div>
                        <div class="form-group">
                            <label class="form-label">End Date</label>
                            <input type="month" class="form-control" value="${item.endDate || ''}" 
                                   onchange="resumeBuilder.updateCustomItem('${customSection.id}', ${index}, 'endDate', this.value)">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Description</label>
                        <textarea class="form-control" rows="3" maxlength="400"
                                  onchange="resumeBuilder.updateCustomItem('${customSection.id}', ${index}, 'description', this.value)">${item.description || ''}</textarea>
                        <div class="char-count">0/400 characters</div>
                    </div>
                </div>
            `).join('');
        }
        
        return '';
    }

    setupCharacterCounters() {
        setTimeout(() => {
            document.querySelectorAll('textarea[maxlength]').forEach(textarea => {
                this.setupCharacterCounter(textarea);
            });
        }, 100);
    }

    setupCharacterCounter(textarea) {
        const counter = textarea.parentNode.querySelector('.char-count');
        if (!counter) return;
        
        const maxLength = parseInt(textarea.getAttribute('maxlength')) || 500;
        
        const updateCounter = () => {
            const count = textarea.value.length;
            counter.textContent = `${count}/${maxLength} characters`;
            counter.classList.toggle('over-limit', count > maxLength);
        };
        
        textarea.addEventListener('input', updateCounter);
        updateCounter();
    }

    handleFormInput(input) {
        const section = input.closest('[data-section]')?.dataset.section;
        const name = input.name;
        const value = input.value;

        if (section === 'personal' && name) {
            this.resumeData.personal[name] = value;
        } else if (section === 'summary' || name === 'summary') {
            this.resumeData.summary = value;
        }

        this.updatePreview();
        this.autoSave();
    }

    addItem(section) {
        if (!this.resumeData[section]) {
            this.resumeData[section] = [];
        }
        
        const newItem = this.createNewItem(section);
        this.resumeData[section].push(newItem);
        
        this.renderSection(section);
        this.updatePreview();
        this.autoSave();
    }

    createNewItem(section) {
        const templates = {
            experience: {
                position: '',
                company: '',
                startDate: '',
                endDate: '',
                current: false,
                description: ''
            },
            education: {
                school: '',
                degree: '',
                field: '',
                startDate: '',
                endDate: '',
                gpa: '',
                description: ''
            },
            skills: {
                category: '',
                name: '',
                level: '',
                years: '',
                details: ''
            },
            projects: {
                title: '',
                description: '',
                technologies: '',
                link: '',
                startDate: '',
                endDate: ''
            },
            certifications: {
                name: '',
                issuer: '',
                date: '',
                expiryDate: '',
                credentialId: '',
                link: ''
            }
        };
        
        return { ...templates[section], id: Date.now() };
    }

    renderSection(section) {
        switch(section) {
            case 'experience':
                this.renderExperienceItems();
                break;
            case 'education':
                this.renderEducationItems();
                break;
            case 'skills':
                this.renderSkillsItems();
                break;
            case 'projects':
                this.renderProjectItems();
                break;
            case 'certifications':
                this.renderCertificationItems();
                break;
        }
        this.setupCharacterCounters();
    }

    updateItem(section, index, field, value) {
        if (!this.resumeData[section] || !this.resumeData[section][index]) return;
        
        this.resumeData[section][index][field] = value;
        
        if (section === 'experience' && field === 'current' && value) {
            this.resumeData[section][index].endDate = '';
            // Update the end date input to be disabled
            const endDateInput = document.querySelector(`[data-section="experience"] [data-index="${index}"] input[type="month"]:last-of-type`);
            if (endDateInput) {
                endDateInput.disabled = true;
                endDateInput.value = '';
            }
        } else if (section === 'experience' && field === 'current' && !value) {
            // Re-enable end date input
            const endDateInput = document.querySelector(`[data-section="experience"] [data-index="${index}"] input[type="month"]:last-of-type`);
            if (endDateInput) {
                endDateInput.disabled = false;
            }
        }
        
        this.updatePreview();
        this.autoSave();
    }

    moveItem(section, index, direction) {
        const items = this.resumeData[section];
        if (!items) return;
        
        const newIndex = index + direction;
        
        if (newIndex >= 0 && newIndex < items.length) {
            [items[index], items[newIndex]] = [items[newIndex], items[index]];
            this.renderSection(section);
            this.updatePreview();
            this.autoSave();
        }
    }

    removeItem(section, index) {
        if (confirm('Are you sure you want to remove this item?')) {
            this.resumeData[section].splice(index, 1);
            this.renderSection(section);
            this.updatePreview();
            this.autoSave();
        }
    }

    // Custom section methods
    showCustomSectionModal() {
        const modal = document.getElementById('custom-section-modal');
        if (modal) {
            modal.classList.remove('hidden');
            
            // Clear form
            document.getElementById('custom-section-name').value = '';
            document.getElementById('custom-section-icon').value = '🌟';
            document.getElementById('custom-section-type').value = 'list';
        }
    }

    addCustomSection() {
        const name = document.getElementById('custom-section-name').value.trim();
        const icon = document.getElementById('custom-section-icon').value.trim() || '🌟';
        const type = document.getElementById('custom-section-type').value;

        if (!name) {
            this.showToast('Please enter a section name', 'error');
            return;
        }

        const customSection = {
            id: Date.now(),
            name: name,
            icon: icon,
            type: type
        };

        this.customSections.push(customSection);
        this.resumeData[`custom-${customSection.id}`] = type === 'text' ? '' : [];
        this.resumeData.sectionOrder.push(`custom-${customSection.id}`);

        this.renderCustomSections();
        this.renderSectionManager();
        this.updatePreview();
        this.autoSave();
        this.closeModal();
        this.showToast('Custom section added successfully!', 'success');
    }

    removeCustomSection(index) {
        if (confirm('Are you sure you want to remove this custom section?')) {
            const customSection = this.customSections[index];
            const sectionKey = `custom-${customSection.id}`;
            
            // Remove from data
            delete this.resumeData[sectionKey];
            this.customSections.splice(index, 1);
            
            // Remove from section order
            const orderIndex = this.resumeData.sectionOrder.indexOf(sectionKey);
            if (orderIndex > -1) {
                this.resumeData.sectionOrder.splice(orderIndex, 1);
            }
            
            this.renderCustomSections();
            this.renderSectionManager();
            this.updatePreview();
            this.autoSave();
            this.showToast('Custom section removed', 'info');
        }
    }

    updateCustomSectionText(sectionId, value) {
        this.resumeData[`custom-${sectionId}`] = value;
        this.updatePreview();
        this.autoSave();
    }

    updateCustomItem(sectionId, index, field, value) {
        const sectionKey = `custom-${sectionId}`;
        if (!this.resumeData[sectionKey] || !this.resumeData[sectionKey][index]) return;
        
        this.resumeData[sectionKey][index][field] = value;
        this.updatePreview();
        this.autoSave();
    }

    moveCustomItem(sectionId, index, direction) {
        const sectionKey = `custom-${sectionId}`;
        const items = this.resumeData[sectionKey];
        if (!items) return;
        
        const newIndex = index + direction;
        
        if (newIndex >= 0 && newIndex < items.length) {
            [items[index], items[newIndex]] = [items[newIndex], items[index]];
            this.renderCustomSections();
            this.updatePreview();
            this.autoSave();
        }
    }

    removeCustomItem(sectionId, index) {
        if (confirm('Are you sure you want to remove this item?')) {
            const sectionKey = `custom-${sectionId}`;
            this.resumeData[sectionKey].splice(index, 1);
            this.renderCustomSections();
            this.updatePreview();
            this.autoSave();
        }
    }

    addCustomItem(sectionId) {
        const sectionKey = `custom-${sectionId}`;
        if (!this.resumeData[sectionKey]) {
            this.resumeData[sectionKey] = [];
        }
        
        const newItem = {
            title: '',
            organization: '',
            startDate: '',
            endDate: '',
            description: '',
            id: Date.now()
        };
        
        this.resumeData[sectionKey].push(newItem);
        this.renderCustomSections();
        this.updatePreview();
        this.autoSave();
    }

    // Section visibility and ordering
    toggleSectionVisibility(sectionName) {
        const hiddenSections = this.resumeData.hiddenSections || [];
        const index = hiddenSections.indexOf(sectionName);
        
        if (index > -1) {
            hiddenSections.splice(index, 1);
        } else {
            hiddenSections.push(sectionName);
        }
        
        this.resumeData.hiddenSections = hiddenSections;
        this.updateSectionVisibility();
        this.updatePreview();
        this.autoSave();
    }

    updateSectionVisibility() {
        const hiddenSections = this.resumeData.hiddenSections || [];
        
        document.querySelectorAll('.form-section').forEach(section => {
            const sectionName = section.dataset.section;
            const isHidden = hiddenSections.includes(sectionName);
            
            section.classList.toggle('hidden-section', isHidden);
            
            const toggleBtn = section.querySelector('.toggle-section');
            if (toggleBtn) {
                toggleBtn.textContent = isHidden ? '🔍' : '👁️';
                toggleBtn.title = isHidden ? 'Show section' : 'Hide section';
            }
        });
    }

    reorderSections(oldIndex, newIndex) {
        const sections = this.resumeData.sectionOrder;
        const movedSection = sections.splice(oldIndex, 1)[0];
        sections.splice(newIndex, 0, movedSection);
        
        this.updatePreview();
        this.autoSave();
    }

    renderSectionManager() {
        const container = document.getElementById('section-visibility');
        if (!container) return;
        
        const allSections = [
            { id: 'personal', name: 'Personal Information', icon: '👤' },
            { id: 'summary', name: 'Professional Summary', icon: '📝' },
            { id: 'experience', name: 'Work Experience', icon: '💼' },
            { id: 'education', name: 'Education', icon: '🎓' },
            { id: 'skills', name: 'Skills', icon: '⚡' },
            { id: 'projects', name: 'Projects', icon: '🚀' },
            { id: 'certifications', name: 'Certifications', icon: '🏆' },
            ...this.customSections.map(cs => ({ id: `custom-${cs.id}`, name: cs.name, icon: cs.icon }))
        ];

        const hiddenSections = this.resumeData.hiddenSections || [];

        container.innerHTML = allSections.map(section => `
            <div class="section-toggle">
                <label>
                    <input type="checkbox" ${hiddenSections.includes(section.id) ? '' : 'checked'} 
                           onchange="resumeBuilder.toggleSectionVisibility('${section.id}')">
                    ${section.icon} ${section.name}
                </label>
            </div>
        `).join('');
    }

    renderTemplateThumbnails() {
        const container = document.getElementById('template-thumbnails');
        if (!container) return;
        
        const templates = this.getTemplateData();
        
        container.innerHTML = templates.map(template => `
            <div class="template-thumbnail ${template.id === this.currentTemplate?.id ? 'active' : ''}" 
                 data-template-id="${template.id}">
                <div class="thumbnail-preview">📄</div>
                <div class="thumbnail-name">${template.name}</div>
            </div>
        `).join('');

        container.addEventListener('click', (e) => {
            const thumbnail = e.target.closest('.template-thumbnail');
            if (thumbnail && thumbnail.dataset.templateId !== this.currentTemplate?.id) {
                this.switchTemplate(thumbnail.dataset.templateId);
            }
        });
    }

    switchTemplate(templateId) {
        this.currentTemplate = this.getTemplateData().find(t => t.id === templateId);
        const templateNameEl = document.getElementById('current-template-name');
        if (templateNameEl) {
            templateNameEl.textContent = this.currentTemplate.name;
        }
        this.renderTemplateThumbnails();
        this.updatePreview();
        this.autoSave();
        this.showToast('Template switched successfully', 'success');
    }

    // Preview and customization
    updatePreview() {
        const preview = document.getElementById('resume-preview');
        if (!preview || !this.currentTemplate) return;

        const templateHTML = this.generateTemplateHTML();
        preview.innerHTML = templateHTML;
        preview.className = `resume-preview template-${this.currentTemplate.id}`;
        this.applyCustomization();
    }

    generateTemplateHTML() {
        const data = this.resumeData;
        const hiddenSections = data.hiddenSections || [];
        
        // Get sections in order
        const orderedSections = data.sectionOrder || ['personal', 'summary', 'experience', 'education', 'skills', 'projects', 'certifications'];
        
        let sectionsHTML = '';
        
        orderedSections.forEach(sectionId => {
            if (hiddenSections.includes(sectionId)) return;
            
            if (sectionId === 'personal') {
                sectionsHTML += this.generatePersonalSection();
            } else if (sectionId === 'summary' && data.summary) {
                sectionsHTML += this.generateSummarySection();
            } else if (sectionId === 'experience' && data.experience.length > 0) {
                sectionsHTML += this.generateExperienceSection();
            } else if (sectionId === 'education' && data.education.length > 0) {
                sectionsHTML += this.generateEducationSection();
            } else if (sectionId === 'skills' && data.skills.length > 0) {
                sectionsHTML += this.generateSkillsSection();
            } else if (sectionId === 'projects' && data.projects.length > 0) {
                sectionsHTML += this.generateProjectsSection();
            } else if (sectionId === 'certifications' && data.certifications.length > 0) {
                sectionsHTML += this.generateCertificationsSection();
            } else if (sectionId.startsWith('custom-')) {
                sectionsHTML += this.generateCustomSection(sectionId);
            }
        });

        if (this.currentTemplate.layout === 'two-column') {
            return this.generateTwoColumnLayout(sectionsHTML);
        } else {
            return `<div class="resume-content">${sectionsHTML}</div>`;
        }
    }

    generatePersonalSection() {
        const data = this.resumeData.personal;
        
        return `
            <div class="resume-header">
                <h1 class="resume-name">${data.fullName || 'Your Name'}</h1>
                <div class="resume-title">${data.jobTitle || 'Your Title'}</div>
                <div class="resume-contact">
                    ${data.email ? `<span>📧 ${data.email}</span>` : ''}
                    ${data.phone ? `<span>📞 ${data.phone}</span>` : ''}
                    ${data.location ? `<span>📍 ${data.location}</span>` : ''}
                    ${data.linkedin ? `<span>🔗 ${data.linkedin}</span>` : ''}
                    ${data.website ? `<span>🌐 ${data.website}</span>` : ''}
                </div>
            </div>
        `;
    }

    generateSummarySection() {
        return `
            <div class="resume-section">
                <h2 class="resume-section-title">Professional Summary</h2>
                <p>${this.resumeData.summary}</p>
            </div>
        `;
    }

    generateExperienceSection() {
        return `
            <div class="resume-section">
                <h2 class="resume-section-title">Work Experience</h2>
                ${this.resumeData.experience.map(exp => `
                    <div class="resume-item">
                        <div class="resume-item-header">
                            <div>
                                <div class="resume-item-title">${exp.position}</div>
                                <div class="resume-item-subtitle">${exp.company}</div>
                            </div>
                            <div class="resume-item-date">
                                ${this.formatDate(exp.startDate)} - ${exp.current ? 'Present' : this.formatDate(exp.endDate)}
                            </div>
                        </div>
                        ${exp.description ? `<div class="resume-item-description">${exp.description}</div>` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }

    generateEducationSection() {
        return `
            <div class="resume-section">
                <h2 class="resume-section-title">Education</h2>
                ${this.resumeData.education.map(edu => `
                    <div class="resume-item">
                        <div class="resume-item-header">
                            <div>
                                <div class="resume-item-title">${edu.degree}${edu.field ? ` in ${edu.field}` : ''}</div>
                                <div class="resume-item-subtitle">${edu.school}</div>
                            </div>
                            <div class="resume-item-date">
                                ${this.formatDate(edu.startDate)} - ${this.formatDate(edu.endDate)}
                            </div>
                        </div>
                        ${edu.gpa ? `<div class="resume-item-description">GPA: ${edu.gpa}</div>` : ''}
                        ${edu.description ? `<div class="resume-item-description">${edu.description}</div>` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }

    generateSkillsSection() {
        // Group skills by category
        const skillsByCategory = {};
        this.resumeData.skills.forEach(skill => {
            const category = skill.category || 'Skills';
            if (!skillsByCategory[category]) {
                skillsByCategory[category] = [];
            }
            skillsByCategory[category].push(skill);
        });

        return `
            <div class="resume-section">
                <h2 class="resume-section-title">Skills</h2>
                <div class="resume-skills-grid">
                    ${Object.keys(skillsByCategory).map(category => `
                        <div class="resume-skill-category">
                            <h4>${category}</h4>
                            <div class="resume-skill-list">
                                ${skillsByCategory[category].map(skill => {
                                    let skillText = skill.name;
                                    if (skill.level) skillText += ` (${skill.level})`;
                                    if (skill.years) skillText += ` - ${skill.years} years`;
                                    return `<span class="resume-skill">${skillText}</span>`;
                                }).join('')}
                            </div>
                            ${skillsByCategory[category].some(s => s.details) ? `
                                <div class="resume-skill-details">
                                    ${skillsByCategory[category].filter(s => s.details).map(s => 
                                        `<div><strong>${s.name}:</strong> ${s.details}</div>`
                                    ).join('')}
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    generateProjectsSection() {
        return `
            <div class="resume-section">
                <h2 class="resume-section-title">Projects</h2>
                ${this.resumeData.projects.map(project => `
                    <div class="resume-item">
                        <div class="resume-item-header">
                            <div class="resume-item-title">${project.title}</div>
                            ${project.link ? `<div class="resume-item-date"><a href="${project.link}" target="_blank">${project.link}</a></div>` : ''}
                        </div>
                        ${project.description ? `<div class="resume-item-description">${project.description}</div>` : ''}
                        ${project.technologies ? `<div class="resume-item-description"><strong>Technologies:</strong> ${project.technologies}</div>` : ''}
                        ${project.startDate || project.endDate ? `
                            <div class="resume-item-description">
                                <strong>Duration:</strong> ${this.formatDate(project.startDate)} - ${this.formatDate(project.endDate) || 'Present'}
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }

    generateCertificationsSection() {
        return `
            <div class="resume-section">
                <h2 class="resume-section-title">Certifications</h2>
                ${this.resumeData.certifications.map(cert => `
                    <div class="resume-item">
                        <div class="resume-item-header">
                            <div>
                                <div class="resume-item-title">${cert.name}</div>
                                <div class="resume-item-subtitle">${cert.issuer}</div>
                            </div>
                            <div class="resume-item-date">
                                ${this.formatDate(cert.date)}${cert.expiryDate ? ` - ${this.formatDate(cert.expiryDate)}` : ''}
                            </div>
                        </div>
                        ${cert.credentialId ? `<div class="resume-item-description">Credential ID: ${cert.credentialId}</div>` : ''}
                        ${cert.link ? `<div class="resume-item-description"><a href="${cert.link}" target="_blank">View Credential</a></div>` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }

    generateCustomSection(sectionId) {
        const customSection = this.customSections.find(cs => `custom-${cs.id}` === sectionId);
        if (!customSection) return '';

        const data = this.resumeData[sectionId];
        if (!data) return '';

        if (customSection.type === 'text') {
            return `
                <div class="resume-section">
                    <h2 class="resume-section-title">${customSection.name}</h2>
                    <p>${data}</p>
                </div>
            `;
        } else if (customSection.type === 'list' && Array.isArray(data) && data.length > 0) {
            return `
                <div class="resume-section">
                    <h2 class="resume-section-title">${customSection.name}</h2>
                    ${data.map(item => `
                        <div class="resume-item">
                            <div class="resume-item-header">
                                <div>
                                    <div class="resume-item-title">${item.title}</div>
                                    ${item.organization ? `<div class="resume-item-subtitle">${item.organization}</div>` : ''}
                                </div>
                                ${item.startDate || item.endDate ? `
                                    <div class="resume-item-date">
                                        ${this.formatDate(item.startDate)} - ${this.formatDate(item.endDate) || 'Present'}
                                    </div>
                                ` : ''}
                            </div>
                            ${item.description ? `<div class="resume-item-description">${item.description}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            `;
        }

        return '';
    }

    generateTwoColumnLayout(sectionsHTML) {
        // For two-column layouts, split sections between sidebar and main
        const parser = new DOMParser();
        const doc = parser.parseFromString(`<div>${sectionsHTML}</div>`, 'text/html');
        const sections = doc.querySelectorAll('.resume-section, .resume-header');

        let sidebarHTML = '';
        let mainHTML = '';
        
        sections.forEach((section, index) => {
            const sectionHTML = section.outerHTML;
            if (section.classList.contains('resume-header')) {
                sidebarHTML += sectionHTML;
            } else if (index % 2 === 1) {
                sidebarHTML += sectionHTML;
            } else {
                mainHTML += sectionHTML;
            }
        });

        return `
            <div class="resume-content">
                <div class="resume-sidebar">${sidebarHTML}</div>
                <div class="resume-main">${mainHTML}</div>
            </div>
        `;
    }

    formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr + '-01');
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    }

    applyCustomization() {
        const preview = document.getElementById('resume-preview');
        if (!preview) return;

        const { colorPalette, font, fontSize, margins, lineHeight } = this.customization;

        preview.style.fontFamily = font.family;
        preview.style.fontSize = fontSize + 'px';
        preview.style.lineHeight = lineHeight.toString();
        preview.style.zoom = this.zoomLevel.toString();

        const content = preview.querySelector('.resume-content');
        if (content) {
            content.style.padding = `${margins}px`;
        }

        // Apply color scheme
        const header = preview.querySelector('.resume-header');
        if (header) {
            if (this.currentTemplate.id === 'creative-header' || this.currentTemplate.id === 'executive-bold' || this.currentTemplate.id === 'sales-marketing') {
                header.style.backgroundColor = colorPalette.primary;
                header.style.color = '#ffffff';
            } else {
                header.style.borderBottomColor = colorPalette.primary;
            }
        }

        preview.querySelectorAll('.resume-name, .resume-section-title, .resume-item-title').forEach(el => {
            if (this.currentTemplate.id !== 'creative-header' && this.currentTemplate.id !== 'executive-bold' && this.currentTemplate.id !== 'sales-marketing') {
                el.style.color = colorPalette.primary;
            }
        });

        // Apply template-specific styles
        this.applyTemplateSpecificStyles(preview, colorPalette);
    }

    applyTemplateSpecificStyles(preview, colorPalette) {
        const templateId = this.currentTemplate.id;

        switch (templateId) {
            case 'tech-professional':
                preview.style.backgroundColor = '#1e1e1e';
                preview.style.color = '#e0e0e0';
                break;
            case 'academic-format':
                preview.style.fontFamily = '"Times New Roman", serif';
                break;
            case 'ats-simple':
                preview.style.fontFamily = 'Arial, sans-serif';
                break;
            case 'elegant-classic':
                preview.style.fontFamily = '"Playfair Display", serif';
                break;
        }
    }

    // Zoom controls
    zoomIn() {
        this.zoomLevel = Math.min(this.zoomLevel + 0.1, 2.0);
        this.updateZoom();
    }

    zoomOut() {
        this.zoomLevel = Math.max(this.zoomLevel - 0.1, 0.5);
        this.updateZoom();
    }

    resetZoom() {
        this.zoomLevel = 1.0;
        this.updateZoom();
    }

    updateZoom() {
        const zoomLevelEl = document.getElementById('zoom-level');
        if (zoomLevelEl) {
            zoomLevelEl.textContent = Math.round(this.zoomLevel * 100) + '%';
        }
        this.applyCustomization();
    }

    // Mobile responsive toggle
    toggleMobileView() {
        const sidebar = document.querySelector('.builder-sidebar');
        const preview = document.querySelector('.builder-preview');
        const toggleBtn = document.getElementById('mobile-toggle');
        
        if (sidebar && preview && toggleBtn) {
            const isShowingForm = !sidebar.classList.contains('hidden');
            
            if (isShowingForm) {
                sidebar.classList.add('hidden');
                preview.classList.remove('hidden');
                toggleBtn.textContent = '📝 Form';
            } else {
                sidebar.classList.remove('hidden');
                preview.classList.add('hidden');
                toggleBtn.textContent = '👀 Preview';
            }
        }
    }

    // PDF Export with proper html2pdf.js implementation
    async exportToPDF() {
        this.showLoading();
        
        try {
            const preview = document.getElementById('resume-preview');
            if (!preview) {
                throw new Error('Resume preview not found');
            }
            
            const originalZoom = this.zoomLevel;
            
            // Temporarily set zoom to 1 for PDF export
            this.zoomLevel = 1;
            this.applyCustomization();
            
            // Wait for styles to apply
            await new Promise(resolve => setTimeout(resolve, 200));
            
            const fileName = this.resumeData.personal.fullName 
                ? `${this.resumeData.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`
                : 'Resume.pdf';
            
            const options = {
                margin: 0.5,
                filename: fileName,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { 
                    scale: 2, 
                    scrollX: 0, 
                    scrollY: 0, 
                    useCORS: true,
                    letterRendering: true
                },
                jsPDF: { 
                    unit: 'in', 
                    format: 'a4', 
                    orientation: 'portrait' 
                },
                pagebreak: { 
                    mode: ['avoid-all', 'css', 'legacy'] 
                }
            };

            await html2pdf().set(options).from(preview).save();
            
            // Restore original zoom
            this.zoomLevel = originalZoom;
            this.applyCustomization();
            
            this.showToast('PDF exported successfully!', 'success');
        } catch (error) {
            console.error('PDF export error:', error);
            this.showToast('Failed to export PDF. Please try again.', 'error');
        } finally {
            this.hideLoading();
        }
    }

    // Save/Load functionality
    showSaveModal() {
        const modal = document.getElementById('save-load-modal');
        const title = document.getElementById('modal-title');
        const saveForm = document.getElementById('save-form');
        const loadList = document.getElementById('load-list');
        const confirmBtn = document.getElementById('modal-confirm');

        if (title) title.textContent = 'Save Resume';
        if (saveForm) saveForm.classList.remove('hidden');
        if (loadList) loadList.classList.add('hidden');
        if (confirmBtn) {
            confirmBtn.textContent = 'Save';
            confirmBtn.style.display = 'inline-flex';
            confirmBtn.onclick = () => this.saveResume();
        }
        
        const resumeNameInput = document.getElementById('resume-name');
        if (resumeNameInput) {
            resumeNameInput.value = this.resumeData.personal.fullName || 'My Resume';
        }
        
        if (modal) modal.classList.remove('hidden');
    }

    showLoadModal() {
        const modal = document.getElementById('save-load-modal');
        const title = document.getElementById('modal-title');
        const saveForm = document.getElementById('save-form');
        const loadList = document.getElementById('load-list');
        const confirmBtn = document.getElementById('modal-confirm');

        if (title) title.textContent = 'Load Resume';
        if (saveForm) saveForm.classList.add('hidden');
        if (loadList) loadList.classList.remove('hidden');
        if (confirmBtn) confirmBtn.style.display = 'none';

        this.renderSavedResumes();
        if (modal) modal.classList.remove('hidden');
    }

    showImportModal() {
        const modal = document.getElementById('import-export-modal');
        const title = document.getElementById('import-export-title');
        const importContent = document.getElementById('import-content');
        const exportContent = document.getElementById('export-content');
        const confirmBtn = document.getElementById('import-export-confirm');

        if (title) title.textContent = 'Import Resume Data';
        if (importContent) importContent.classList.remove('hidden');
        if (exportContent) exportContent.classList.add('hidden');
        if (confirmBtn) {
            confirmBtn.textContent = 'Import';
            confirmBtn.onclick = () => this.handleImport();
        }

        // Clear form
        const fileInput = document.getElementById('import-file');
        const textArea = document.getElementById('import-text');
        if (fileInput) fileInput.value = '';
        if (textArea) textArea.value = '';

        if (modal) modal.classList.remove('hidden');
    }

    showExportModal() {
        const modal = document.getElementById('import-export-modal');
        const title = document.getElementById('import-export-title');
        const importContent = document.getElementById('import-content');
        const exportContent = document.getElementById('export-content');
        const confirmBtn = document.getElementById('import-export-confirm');
        const exportText = document.getElementById('export-text');

        if (title) title.textContent = 'Export Resume Data';
        if (importContent) importContent.classList.add('hidden');
        if (exportContent) exportContent.classList.remove('hidden');
        if (confirmBtn) confirmBtn.style.display = 'none';

        // Populate export data
        const exportData = {
            resumeData: this.resumeData,
            customization: this.customization,
            customSections: this.customSections,
            currentTemplate: this.currentTemplate?.id
        };

        if (exportText) {
            exportText.value = JSON.stringify(exportData, null, 2);
        }

        // Copy to clipboard functionality
        const copyBtn = document.getElementById('copy-export');
        if (copyBtn) {
            copyBtn.onclick = () => {
                exportText.select();
                document.execCommand('copy');
                this.showToast('Data copied to clipboard!', 'success');
            };
        }

        if (modal) modal.classList.remove('hidden');
    }

    handleImport() {
        const fileInput = document.getElementById('import-file');
        const textArea = document.getElementById('import-text');

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    this.importData(data);
                } catch (error) {
                    this.showToast('Invalid JSON file', 'error');
                }
            };
            reader.readAsText(file);
        } else if (textArea.value.trim()) {
            try {
                const data = JSON.parse(textArea.value);
                this.importData(data);
            } catch (error) {
                this.showToast('Invalid JSON data', 'error');
            }
        } else {
            this.showToast('Please select a file or paste JSON data', 'error');
        }
    }

    importData(data) {
        try {
            if (data.resumeData) this.resumeData = { ...this.getDefaultResumeData(), ...data.resumeData };
            if (data.customization) this.customization = { ...this.getDefaultCustomization(), ...data.customization };
            if (data.customSections) this.customSections = data.customSections;
            
            if (data.currentTemplate) {
                const template = this.getTemplateData().find(t => t.id === data.currentTemplate);
                if (template) {
                    this.currentTemplate = template;
                    const templateNameEl = document.getElementById('current-template-name');
                    if (templateNameEl) {
                        templateNameEl.textContent = this.currentTemplate.name;
                    }
                }
            }

            this.setupFormFields();
            this.renderTemplateThumbnails();
            this.renderSectionManager();
            this.updatePreview();
            this.autoSave();
            this.closeModal();
            this.showToast('Data imported successfully!', 'success');
        } catch (error) {
            console.error('Import error:', error);
            this.showToast('Failed to import data', 'error');
        }
    }

    saveResume() {
        const resumeNameInput = document.getElementById('resume-name');
        const name = resumeNameInput ? resumeNameInput.value.trim() : '';
        
        if (!name) {
            this.showToast('Please enter a resume name', 'error');
            return;
        }

        const resumeData = {
            name: name,
            date: Date.now(),
            data: this.resumeData,
            customization: this.customization,
            customSections: this.customSections,
            template: this.currentTemplate?.id
        };

        const savedResumes = this.getSavedResumes();
        savedResumes.push(resumeData);
        localStorage.setItem('resumeBuilder_savedResumes', JSON.stringify(savedResumes));

        this.closeModal();
        this.showToast('Resume saved successfully!', 'success');
    }

    loadResume(index) {
        const savedResumes = this.getSavedResumes();
        const resume = savedResumes[index];

        if (resume) {
            this.resumeData = resume.data;
            this.customization = resume.customization || this.getDefaultCustomization();
            this.customSections = resume.customSections || [];
            
            if (resume.template) {
                const template = this.getTemplateData().find(t => t.id === resume.template);
                if (template) {
                    this.currentTemplate = template;
                    const templateNameEl = document.getElementById('current-template-name');
                    if (templateNameEl) {
                        templateNameEl.textContent = this.currentTemplate.name;
                    }
                }
            }
            
            this.setupFormFields();
            this.renderTemplateThumbnails();
            this.renderSectionManager();
            this.updatePreview();
            this.closeModal();
            this.showToast('Resume loaded successfully!', 'success');
        }
    }

    deleteResume(index) {
        if (confirm('Are you sure you want to delete this resume?')) {
            const savedResumes = this.getSavedResumes();
            savedResumes.splice(index, 1);
            localStorage.setItem('resumeBuilder_savedResumes', JSON.stringify(savedResumes));
            this.renderSavedResumes();
            this.showToast('Resume deleted successfully!', 'success');
        }
    }

    renderSavedResumes() {
        const container = document.getElementById('load-list');
        if (!container) return;
        
        const savedResumes = this.getSavedResumes();

        if (savedResumes.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary);">No saved resumes found.</p>';
            return;
        }

        container.innerHTML = savedResumes.map((resume, index) => `
            <div class="saved-resume-item" onclick="resumeBuilder.loadResume(${index})">
                <div class="saved-resume-info">
                    <div class="saved-resume-name">${resume.name}</div>
                    <div class="saved-resume-date">${new Date(resume.date).toLocaleDateString()}</div>
                </div>
                <button class="delete-resume" onclick="event.stopPropagation(); resumeBuilder.deleteResume(${index})">×</button>
            </div>
        `).join('');
    }

    getSavedResumes() {
        try {
            const saved = localStorage.getItem('resumeBuilder_savedResumes');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Error loading saved resumes:', error);
            return [];
        }
    }

    closeModal() {
        document.querySelectorAll('.modal').forEach(modal => modal.classList.add('hidden'));
    }

    // Auto-save and storage
    autoSave() {
        clearTimeout(this.autoSaveTimeout);
        this.autoSaveTimeout = setTimeout(() => {
            const data = {
                resumeData: this.resumeData,
                customization: this.customization,
                customSections: this.customSections,
                currentTemplate: this.currentTemplate?.id
            };
            try {
                localStorage.setItem('resumeBuilder_autoSave', JSON.stringify(data));
            } catch (error) {
                console.error('Auto-save failed:', error);
            }
        }, 1000);
    }

    loadFromStorage() {
        try {
            const autoSaved = localStorage.getItem('resumeBuilder_autoSave');
            if (autoSaved) {
                const data = JSON.parse(autoSaved);
                this.resumeData = { ...this.getDefaultResumeData(), ...data.resumeData };
                this.customization = { ...this.getDefaultCustomization(), ...data.customization };
                this.customSections = data.customSections || [];
                
                if (data.currentTemplate) {
                    const template = this.getTemplateData().find(t => t.id === data.currentTemplate);
                    if (template) {
                        this.currentTemplate = template;
                    }
                }
            }
        } catch (error) {
            console.error('Failed to load auto-saved data:', error);
        }
    }

    // Form validation
    setupFormValidation() {
        document.addEventListener('input', (e) => {
            if (e.target.type === 'email') {
                this.validateEmail(e.target);
            } else if (e.target.type === 'tel') {
                this.validatePhone(e.target);
            } else if (e.target.type === 'url') {
                this.validateURL(e.target);
            }
        });
    }

    validateEmail(input) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(input.value);
        input.style.borderColor = input.value && !isValid ? 'var(--color-error)' : '';
    }

    validatePhone(input) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanValue = input.value.replace(/\D/g, '');
        const isValid = phoneRegex.test(cleanValue);
        input.style.borderColor = input.value && !isValid ? 'var(--color-error)' : '';
    }

    validateURL(input) {
        try {
            if (input.value && !input.value.startsWith('http://') && !input.value.startsWith('https://')) {
                input.value = 'https://' + input.value;
            }
            const url = new URL(input.value);
            input.style.borderColor = '';
        } catch {
            input.style.borderColor = input.value ? 'var(--color-error)' : '';
        }
    }

    // Utility functions
    showLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.remove('hidden');
        }
    }

    hideLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.classList.add('hidden');
        }
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toast-container');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.textContent = message;
        
        container.appendChild(toast);
        
        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Remove toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                if (container.contains(toast)) {
                    container.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the application
let resumeBuilder;
document.addEventListener('DOMContentLoaded', () => {
    resumeBuilder = new ResumeBuilder();
});

// Handle mobile responsive behavior
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const sidebar = document.querySelector('.builder-sidebar');
        const preview = document.querySelector('.builder-preview');
        
        if (sidebar) sidebar.classList.remove('hidden');
        if (preview) preview.classList.remove('hidden');
    }
});

// Global event listener for custom section add buttons
document.addEventListener('click', (e) => {
    if (e.target.matches('.add-item') && e.target.closest('[data-custom="true"]')) {
        e.preventDefault();
        const section = e.target.closest('[data-section]');
        if (section) {
            const sectionId = section.dataset.section;
            if (sectionId.startsWith('custom-')) {
                const customSectionId = sectionId.replace('custom-', '');
                resumeBuilder.addCustomItem(customSectionId);
            }
        }
    }
});