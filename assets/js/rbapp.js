// Resume Builder Application
class ResumeBuilder {
    constructor() {
        this.currentTemplate = null;
        this.resumeData = {
            personalInfo: {
                firstName: '',
                lastName: '',
                jobTitle: '',
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                photo: null
            },
            summary: '',
            workExperience: [],
            education: [],
            skills: [],
            certifications: [],
            languages: [],
            volunteer: []
        };

        this.templates = [
            { id: 'sean-bernard', name: 'Sean Bernard', description: 'Colorful teal design with modern layout', hasPhoto: false, colors: { primary: '#2dd4bf', secondary: '#6b7280', accent: '#059669' }},
            { id: 'don-draper', name: 'Don Draper', description: 'Professional sidebar with photo', hasPhoto: true, colors: { primary: '#374151', secondary: '#9ca3af', accent: '#1f2937' }},
            { id: 'michael-harris', name: 'Michael Harris', description: 'Minimal black and white design', hasPhoto: false, colors: { primary: '#000000', secondary: '#6b7280', accent: '#374151' }},
            { id: 'sherlock-holmes', name: 'Sherlock Holmes', description: 'Vintage dark sidebar with photo', hasPhoto: true, colors: { primary: '#374151', secondary: '#d1d5db', accent: '#111827' }},
            { id: 'modern-corporate', name: 'Modern Corporate', description: 'Clean blue corporate design', hasPhoto: false, colors: { primary: '#3b82f6', secondary: '#6b7280', accent: '#1d4ed8' }},
            { id: 'creative-designer', name: 'Creative Designer', description: 'Purple creative design', hasPhoto: false, colors: { primary: '#8b5cf6', secondary: '#6b7280', accent: '#7c3aed' }},
            { id: 'tech-professional', name: 'Tech Professional', description: 'Green tech-focused design', hasPhoto: false, colors: { primary: '#10b981', secondary: '#6b7280', accent: '#059669' }},
            { id: 'executive', name: 'Executive', description: 'Gold executive design', hasPhoto: false, colors: { primary: '#f59e0b', secondary: '#6b7280', accent: '#d97706' }},
            { id: 'graduate', name: 'Graduate', description: 'Orange entry-level design', hasPhoto: false, colors: { primary: '#f97316', secondary: '#6b7280', accent: '#ea580c' }},
            { id: 'academic', name: 'Academic', description: 'Navy academic design', hasPhoto: false, colors: { primary: '#1e40af', secondary: '#6b7280', accent: '#1e3a8a' }}
        ];

        this.zoomLevel = 0.4;
        this.init();
    }

    init() {
        this.renderTemplateGallery();
        this.setupEventListeners();
        this.loadFromStorage();
        this.setupAutoSave();
        this.updateDownloadButtonState(); // CHANGE: disable download by default
    }

    setupEventListeners() {
        const templateGrid = document.getElementById('templateGrid');
        if (templateGrid) {
            templateGrid.addEventListener('click', (e) => {
                const templateCard = e.target.closest('.template-card');
                if (templateCard) {
                    const templateId = templateCard.dataset.templateId;
                    this.selectTemplate(templateId);
                }
            });
        }
        const templateSelector = document.getElementById('templateSelector');
        if (templateSelector) {
            templateSelector.addEventListener('change', (e) => {
                if (e.target.value) {
                    this.selectTemplate(e.target.value);
                }
            });
        }
        const changeTemplateBtn = document.getElementById('changeTemplateBtn');
        if (changeTemplateBtn) {
            changeTemplateBtn.addEventListener('click', () => {
                this.showTemplateGallery();
            });
        }
        // --- ONLY Download Button Triggers PDF ---
        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.downloadPDF();
            });
        }
        this.setupFormListeners();
        this.setupDynamicSections();
        const photoInput = document.getElementById('photo');
        if (photoInput) {
            photoInput.addEventListener('change', (e) => this.handlePhotoUpload(e));
        }
        const zoomIn = document.getElementById('zoomIn');
        const zoomOut = document.getElementById('zoomOut');
        if (zoomIn) {
            zoomIn.addEventListener('click', () => this.adjustZoom(0.1));
        }
        if (zoomOut) {
            zoomOut.addEventListener('click', () => this.adjustZoom(-0.1));
        }
    }

    renderTemplateGallery() {
        const grid = document.getElementById('templateGrid');
        const selector = document.getElementById('templateSelector');
        if (!grid || !selector) return;
        grid.innerHTML = '';
        selector.innerHTML = '<option value="">Select Template</option>';
        this.templates.forEach(template => {
            const card = document.createElement('div');
            card.className = 'template-card';
            card.dataset.templateId = template.id;
            card.innerHTML = `
                <div class="template-card__preview" style="background: linear-gradient(135deg, ${template.colors.primary}20 0%, ${template.colors.accent}20 100%);">
                    ${template.hasPhoto ? '<div class="template-card__badge">Photo</div>' : ''}
                    <div style="padding: 20px; height: 100%; display: flex; flex-direction: column; justify-content: center;">
                        <div style="background: ${template.colors.primary}; height: 30px; margin-bottom: 10px; border-radius: 4px; opacity: 0.8;"></div>
                        <div style="background: ${template.colors.secondary}; height: 8px; margin-bottom: 5px; border-radius: 2px; opacity: 0.6;"></div>
                        <div style="background: ${template.colors.secondary}; height: 8px; width: 70%; border-radius: 2px; opacity: 0.6;"></div>
                    </div>
                </div>
                <div class="template-card__info">
                    <h3>${template.name}</h3>
                    <p>${template.description}</p>
                </div>
            `;
            grid.appendChild(card);
            const option = document.createElement('option');
            option.value = template.id;
            option.textContent = template.name;
            selector.appendChild(option);
        });
    }

    selectTemplate(templateId) {
        this.currentTemplate = this.templates.find(t => t.id === templateId);
        if (!this.currentTemplate) return;
        const templateGallery = document.getElementById('templateGallery');
        const resumeBuilder = document.getElementById('resumeBuilder');
        const templateSelector = document.getElementById('templateSelector');
        if (templateGallery) templateGallery.classList.add('hidden');
        if (resumeBuilder) resumeBuilder.classList.remove('hidden');
        if (templateSelector) templateSelector.value = templateId;
        const photoSection = document.getElementById('photoUploadSection');
        if (photoSection) {
            photoSection.style.display = this.currentTemplate.hasPhoto ? 'block' : 'none';
        }
        this.initializeDynamicSections();
        this.updatePreview();
        this.saveToStorage();
        this.updateDownloadButtonState(); // CHANGE: call whenever you show builder
    }

    initializeDynamicSections() {
        if (this.resumeData.workExperience.length === 0)
            this.resumeData.workExperience.push(this.createEmptyItem('workExperience'));
        if (this.resumeData.education.length === 0)
            this.resumeData.education.push(this.createEmptyItem('education'));
        if (this.resumeData.skills.length === 0)
            this.resumeData.skills.push(this.createEmptyItem('skills'));
        ['workExperience', 'education', 'skills', 'certifications', 'languages', 'volunteer'].forEach(section => {
            this.renderDynamicSection(section);
        });
    }

    showTemplateGallery() {
        const resumeBuilder = document.getElementById('resumeBuilder');
        const templateGallery = document.getElementById('templateGallery');
        if (resumeBuilder) resumeBuilder.classList.add('hidden');
        if (templateGallery) templateGallery.classList.remove('hidden');
        this.currentTemplate = null;
        this.updateDownloadButtonState(); // CHANGE: disable download when leaving builder
    }

    setupFormListeners() {
        const personalFields = ['firstName', 'lastName', 'jobTitle', 'email', 'phone', 'location', 'linkedin'];
        personalFields.forEach(field => {
            const element = document.getElementById(field);
            if (element) {
                element.addEventListener('input', (e) => {
                    this.resumeData.personalInfo[field] = e.target.value;
                    this.updatePreview();
                    this.saveToStorage();
                    this.updateDownloadButtonState(); // CHANGE: update on every change
                });
            }
        });

        const summaryElement = document.getElementById('summary');
        if (summaryElement) {
            summaryElement.addEventListener('input', (e) => {
                this.resumeData.summary = e.target.value;
                this.updatePreview();
                this.saveToStorage();
            });
        }
    }

    setupDynamicSections() {
    // Event delegation ensures "Add" always works even on dynamic elements
    document.body.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-item');
        if (btn) {
            const target = btn.dataset.target;
            if (target) {
                this.addDynamicItem(target);
            }
        }
    });
}

    addDynamicItem(section) {
        const item = this.createEmptyItem(section);
        this.resumeData[section].push(item);
        this.renderDynamicSection(section);
        this.updatePreview();
        this.saveToStorage();
    }

    createEmptyItem(section) {
        const templates = {
            workExperience: { title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' },
            education: { degree: '', school: '', location: '', graduationDate: '', gpa: '', description: '' },
            skills: { name: '', level: 'Intermediate' },
            certifications: { name: '', issuer: '', date: '', url: '' },
            languages: { name: '', proficiency: 'Conversational' },
            volunteer: { title: '', organization: '', location: '', startDate: '', endDate: '', description: '' }
        };
        return { id: Date.now(), ...templates[section] };
    }

    renderDynamicSection(section) {
        const container = document.getElementById(`${section}List`);
        if (!container) return;
        container.innerHTML = '';
        this.resumeData[section].forEach((item, index) => {
            const element = this.createDynamicItemElement(section, item, index);
            container.appendChild(element);
        });
    }

    createDynamicItemElement(section, item, index) {
        const div = document.createElement('div');
        div.className = 'dynamic-item';
        div.innerHTML = this.getDynamicItemHTML(section, item, index);
        div.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('input', (e) => {
                const field = e.target.name;
                if (e.target.type === 'checkbox') {
                    this.resumeData[section][index][field] = e.target.checked;
                    if (field === 'current' && section === 'workExperience') {
                        const endDateInput = div.querySelector('input[name="endDate"]');
                        if (endDateInput) {
                            endDateInput.disabled = e.target.checked;
                            if (e.target.checked) {
                                endDateInput.value = '';
                                this.resumeData[section][index]['endDate'] = '';
                            }
                        }
                    }
                } else {
                    this.resumeData[section][index][field] = e.target.value;
                }
                this.updatePreview();
                this.saveToStorage();
            });
        });
        div.querySelector('.remove-item').addEventListener('click', () => {
            this.removeDynamicItem(section, index);
        });
        return div;
    }

    getDynamicItemHTML(section, item, index) {
        // [unchanged] Paste your HTML-generating code for dynamic form items as before
        // ...not repeated here, as your previous code provides it...
        // You may keep your original or add/modify as you wish.
    }

    removeDynamicItem(section, index) {
        this.resumeData[section].splice(index, 1);
        this.renderDynamicSection(section);
        this.updatePreview();
        this.saveToStorage();
        this.updateDownloadButtonState();
    }

    updatePreview() {
        // [unchanged] -- Render a live preview of the resume in the preview container.
        // Use the current template styling and data. 
        // You can call your own renderPreview(page, this.currentTemplate, this.resumeData) here.
    }

    adjustZoom(delta) {
        this.zoomLevel = Math.max(0.2, Math.min(1.2, this.zoomLevel + delta));
        // Apply zoom to preview (your implementation)
        const preview = document.getElementById('resumePreview');
        if (preview) preview.style.transform = `scale(${this.zoomLevel})`;
    }

    handlePhotoUpload(e) {
        const file = e.target.files[0];
        const photoPreview = document.getElementById('photoPreview');
        if (photoPreview) photoPreview.innerHTML = '';
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                this.resumeData.personalInfo.photo = ev.target.result;
                if (photoPreview) photoPreview.innerHTML = `<img src="${ev.target.result}" style="width:80px;border-radius:10px;"/>`;
                this.updatePreview();
                this.saveToStorage();
            };
            reader.readAsDataURL(file);
        }
    }

    // --- CHANGE: Disable Download if Names Empty, Enable Only If Ready ---
    updateDownloadButtonState() {
        const btn = document.getElementById('downloadBtn');
        const pd = this.resumeData.personalInfo;
        btn.disabled = !(pd.firstName.trim() && pd.lastName.trim() && !!this.currentTemplate);
    }

    // --- PDF GENERATION --- Only called from Download Button!
    async downloadPDF() {
    const overlay = document.getElementById('loadingOverlay');
    overlay.classList.remove('hidden');
    try {
        let { firstName, lastName } = this.resumeData.personalInfo;
        let filename = `${firstName.trim()}-${lastName.trim()}-resume.pdf`;
        const preview = document.getElementById('resumePreview');
        if (!preview) {
            alert('Could not find resume preview element.');
            overlay.classList.add('hidden');
            return;
        }
        const doc = new window.jspdf.jsPDF('p', 'pt', 'a4');
        await doc.html(preview, {
            callback: function(doc) {
                doc.save(filename);
            },
            x: 20,
            y: 20,
            width: 555,
            windowWidth: 900,
            html2canvas: window.html2canvas // explicit, for CDN global
        });
    } catch (err) {
        alert('PDF generation failed: ' + err);
    }
    overlay.classList.add('hidden');
}

    // --- Auto-save, load, storage ---
    saveToStorage() {
        localStorage.setItem('resume_builder_data', JSON.stringify({
            resumeData: this.resumeData,
            currentTemplateId: this.currentTemplate ? this.currentTemplate.id : null
        }));
    }

    loadFromStorage() {
        try {
            const raw = localStorage.getItem('resume_builder_data');
            if (!raw) return;
            const { resumeData, currentTemplateId } = JSON.parse(raw);
            if (resumeData) this.resumeData = resumeData;
            if (currentTemplateId) this.selectTemplate(currentTemplateId);
        } catch (err) {}
    }

    setupAutoSave() {
        setInterval(() => this.saveToStorage(), 20000);
    }
}

// Init on DOM load:
window.addEventListener('DOMContentLoaded', () => {
    window.resumeBuilder = new ResumeBuilder();
});
