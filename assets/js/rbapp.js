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
        this.addButtonDelegated = false;
        this.init();
    }

    init() {
        this.renderTemplateGallery();
        this.setupEventListeners();
        this.ensureDynamicSectionDefaults();
        this.loadFromStorage();
        this.setupAutoSave();
        this.updateDownloadButtonState();
    }

    ensureDynamicSectionDefaults() {
        const r = this.resumeData;
        if (r.workExperience.length === 0) r.workExperience.push(this.createEmptyItem('workExperience'));
        if (r.education.length === 0) r.education.push(this.createEmptyItem('education'));
        if (r.skills.length === 0) r.skills.push(this.createEmptyItem('skills'));
        ['workExperience','education','skills','certifications','languages','volunteer'].forEach(section => {
            this.renderDynamicSection(section);
        });
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

    showTemplateGallery() {
        const resumeBuilder = document.getElementById('resumeBuilder');
        const templateGallery = document.getElementById('templateGallery');
        if (resumeBuilder) resumeBuilder.classList.add('hidden');
        if (templateGallery) templateGallery.classList.remove('hidden');
        this.currentTemplate = null;
        this.updateDownloadButtonState();
        this.ensureDynamicSectionDefaults();
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
        this.ensureDynamicSectionDefaults();
        this.updatePreview();
        this.saveToStorage();
        this.updateDownloadButtonState();
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
                    this.updateDownloadButtonState();
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
        if (this.addButtonDelegated) return;
        document.body.addEventListener('click', (e) => {
            const btn = e.target.closest('.add-item');
            if (btn && btn.dataset.target) {
                this.addDynamicItem(btn.dataset.target);
            }
        });
        this.addButtonDelegated = true;
    }

    addDynamicItem(section) {
        const item = this.createEmptyItem(section);
        this.resumeData[section].push(item);
        this.renderDynamicSection(section);
        this.updatePreview();
        this.saveToStorage();
        this.updateDownloadButtonState();
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
        return { id: Date.now() + Math.floor(Math.random() * 1000), ...templates[section] };
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
            if (this.resumeData[section].length > 1) {
                this.removeDynamicItem(section, index);
            }
        });
        if (this.resumeData[section].length === 1) {
            const btn = div.querySelector('.remove-item');
            if (btn) btn.disabled = true;
        }
        return div;
    }

    getDynamicItemHTML(section, item, index) {
        if (section === 'workExperience') {
            return `
                <div class="dynamic-item__header">
                    <span class="dynamic-item__title">Work Experience ${index+1}</span>
                    <button type="button" class="remove-item">×</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Job Title</label>
                        <input type="text" name="title" class="form-control" value="${item.title||''}" placeholder="Software Engineer">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Company</label>
                        <input type="text" name="company" class="form-control" value="${item.company||''}" placeholder="Company Name">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Location</label>
                        <input type="text" name="location" class="form-control" value="${item.location||''}" placeholder="City, State">
                    </div>
                    <div class="form-group">
                        <label class="form-label">
                            <input type="checkbox" name="current" ${item.current ? 'checked' : ''}> Currently work here
                        </label>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Start Date</label>
                        <input type="month" name="startDate" class="form-control" value="${item.startDate||''}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">End Date</label>
                        <input type="month" name="endDate" class="form-control" value="${item.endDate||''}" ${item.current ? 'disabled' : ''}>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea name="description" class="form-control" rows="3" placeholder="Describe your responsibilities and achievements...">${item.description||''}</textarea>
                </div>`;
        } else if (section === 'education') {
            return `
                <div class="dynamic-item__header">
                    <span class="dynamic-item__title">Education ${index+1}</span>
                    <button type="button" class="remove-item">×</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Degree</label>
                        <input type="text" name="degree" class="form-control" value="${item.degree||''}" placeholder="Bachelor of Science">
                    </div>
                    <div class="form-group">
                        <label class="form-label">School</label>
                        <input type="text" name="school" class="form-control" value="${item.school||''}" placeholder="University Name">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Location</label>
                        <input type="text" name="location" class="form-control" value="${item.location||''}" placeholder="City, State">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Graduation Date</label>
                        <input type="month" name="graduationDate" class="form-control" value="${item.graduationDate||''}">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">GPA (Optional)</label>
                    <input type="text" name="gpa" class="form-control" value="${item.gpa||''}" placeholder="3.8">
                </div>`;
        } else if (section === 'skills') {
            return `
                <div class="dynamic-item__header">
                    <span class="dynamic-item__title">Skill ${index+1}</span>
                    <button type="button" class="remove-item">×</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Skill Name</label>
                        <input type="text" name="name" class="form-control" value="${item.name||''}" placeholder="JavaScript">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Level</label>
                        <select name="level" class="form-control">
                            <option value="Beginner" ${item.level==='Beginner'?'selected':''}>Beginner</option>
                            <option value="Intermediate" ${item.level==='Intermediate'?'selected':''}>Intermediate</option>
                            <option value="Advanced" ${item.level==='Advanced'?'selected':''}>Advanced</option>
                            <option value="Expert" ${item.level==='Expert'?'selected':''}>Expert</option>
                        </select>
                    </div>
                </div>`;
        } else if (section === 'certifications') {
            return `
                <div class="dynamic-item__header">
                    <span class="dynamic-item__title">Certification ${index+1}</span>
                    <button type="button" class="remove-item">×</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Certification Name</label>
                        <input type="text" name="name" class="form-control" value="${item.name||''}" placeholder="AWS Certified Developer">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Issuer</label>
                        <input type="text" name="issuer" class="form-control" value="${item.issuer||''}" placeholder="Amazon Web Services">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Date Obtained</label>
                        <input type="month" name="date" class="form-control" value="${item.date||''}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">URL (Optional)</label>
                        <input type="url" name="url" class="form-control" value="${item.url||''}" placeholder="https://...">
                    </div>
                </div>`;
        } else if (section === 'languages') {
            return `
                <div class="dynamic-item__header">
                    <span class="dynamic-item__title">Language ${index+1}</span>
                    <button type="button" class="remove-item">×</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Language</label>
                        <input type="text" name="name" class="form-control" value="${item.name||''}" placeholder="Spanish">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Proficiency</label>
                        <select name="proficiency" class="form-control">
                            <option value="Basic" ${item.proficiency==='Basic'?'selected':''}>Basic</option>
                            <option value="Conversational" ${item.proficiency==='Conversational'?'selected':''}>Conversational</option>
                            <option value="Fluent" ${item.proficiency==='Fluent'?'selected':''}>Fluent</option>
                            <option value="Native" ${item.proficiency==='Native'?'selected':''}>Native</option>
                        </select>
                    </div>
                </div>`;
        } else if (section === 'volunteer') {
            return `
                <div class="dynamic-item__header">
                    <span class="dynamic-item__title">Volunteer Work ${index+1}</span>
                    <button type="button" class="remove-item">×</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Role/Title</label>
                        <input type="text" name="title" class="form-control" value="${item.title||''}" placeholder="Volunteer Coordinator">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Organization</label>
                        <input type="text" name="organization" class="form-control" value="${item.organization||''}" placeholder="Local Food Bank">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Location</label>
                        <input type="text" name="location" class="form-control" value="${item.location||''}" placeholder="City, State">
                    </div>
                    <div class="form-group"></div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Start Date</label>
                        <input type="month" name="startDate" class="form-control" value="${item.startDate||''}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">End Date</label>
                        <input type="month" name="endDate" class="form-control" value="${item.endDate||''}">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea name="description" class="form-control" rows="3" placeholder="Describe your volunteer work...">${item.description||''}</textarea>
                </div>`;
        }
        return '';
    }

    removeDynamicItem(section, index) {
        if (this.resumeData[section].length > 1) {
            this.resumeData[section].splice(index, 1);
            this.renderDynamicSection(section);
            this.updatePreview();
            this.saveToStorage();
            this.updateDownloadButtonState();
        }
    }

    updatePreview() {
        const previewContainer = document.getElementById('resumePreview');
        if (!previewContainer) return;
        const t = this.currentTemplate;
        const d = this.resumeData;
        // Render basic preview (Sean Bernard style, can expand per template)
        let skillsHTML = d.skills.filter(s=>s.name).map(s=>`<span class="skill-item">${s.name} (${s.level||'Intermediate'})</span>`).join(' ');
        let workHTML = d.workExperience.filter(w=>w.title||w.company).map(w=>`
            <div class="experience-item">
                <div class="item-header"><span class="item-title">${w.title||''}</span><span class="item-date">
                    ${(w.startDate||'').replace('-','/')}${w.endDate||w.current?'–'+((w.current)?'Present':(w.endDate||'')) :''}
                </span></div>
                <div class="item-company">${w.company||''} ${w.location?', '+w.location:''}</div>
                <div class="item-description">${(w.description||'')}</div>
            </div>
        `).join('');
        let eduHTML = d.education.filter(e=>e.degree||e.school).map(e=>`
            <div class="education-item">
                <div class="item-header"><span class="item-title">${e.degree||''}</span><span class="item-date">${(e.graduationDate||'').replace('-','/')}</span></div>
                <div class="item-school">${e.school||''} ${e.location?', '+e.location:''}</div>
                ${e.gpa ? `<div class="item-description"><strong>GPA:</strong> ${e.gpa}</div>` : ''}
                <div class="item-description">${(e.description||'')}</div>
            </div>
        `).join('');
        let certHTML = d.certifications.filter(c=>c.name).map(c=>`
            <div class="certification-item">
                <div class="item-header"><span class="item-title">${c.name}</span> <span class="item-date">${(c.date||'').replace('-','/')}</span></div>
                <div class="item-description">${c.issuer||''}${c.url?' | <a href="'+c.url+'">'+c.url+'</a>':''}</div>
            </div>
        `).join('');
        let langHTML = d.languages.filter(l=>l.name).map(l=>`${l.name} (${l.proficiency})`).join(', ');
        let volHTML = d.volunteer.filter(v=>v.title || v.organization).map(v=>`
            <div class="volunteer-item">
                <div class="item-header"><span class="item-title">${v.title||''}</span> <span class="item-date">${(v.startDate||'').replace('-','/')}–${(v.endDate||'')}</span></div>
                <div class="item-company">${v.organization||''} ${v.location?', '+v.location:''}</div>
                <div class="item-description">${v.description||''}</div>
            </div>
        `).join('');

        let info = d.personalInfo;
        let summary = (d.summary||'').trim();

        // Basic Sean Bernard template structure for demo
        previewContainer.innerHTML = `
        <div class="template-sean-bernard">
            <div class="resume-header">
                <div class="resume-name">${info.firstName||''} ${info.lastName||''}</div>
                <div class="resume-title">${info.jobTitle||''}</div>
                <div class="resume-contact">
                    ${info.email ? `<span>${info.email}</span>` : ''}
                    ${info.phone ? `<span>${info.phone}</span>` : ''}
                    ${info.location ? `<span>${info.location}</span>` : ''}
                    ${info.linkedin ? `<span>${info.linkedin}</span>` : ''}
                </div>
            </div>
            <div class="resume-body" style="display: grid; grid-template-columns: 1fr 300px; gap: 30px;">
                <div>
                    ${summary ? `<div class="resume-section"><div class="section-title">Profile</div><div>${summary}</div></div>` : ''}
                    ${workHTML ? `<div class="resume-section"><div class="section-title">Work Experience</div>${workHTML}</div>` : ''}
                    ${eduHTML ? `<div class="resume-section"><div class="section-title">Education</div>${eduHTML}</div>` : ''}
                    ${volHTML ? `<div class="resume-section"><div class="section-title">Volunteer</div>${volHTML}</div>` : ''}
                </div>
                <div class="sidebar">
                    ${(this.currentTemplate && this.currentTemplate.hasPhoto && info.photo) ? 
                        `<div><img src="${info.photo}" style="width:100%;border-radius:10px;margin-bottom:12px;"></div>` : ''}
                    ${skillsHTML ? `<div class="section-title">Skills</div><div class="skills-list">${skillsHTML}</div>` : ''}
                    ${certHTML ? `<div class="section-title">Certifications</div>${certHTML}` : ''}
                    ${langHTML ? `<div class="section-title">Languages</div><div class="languages-list">${langHTML}</div>` : ''}
                </div>
            </div>
        </div>
        `;
    }

    adjustZoom(delta) {
        this.zoomLevel = Math.max(0.2, Math.min(1.2, this.zoomLevel + delta));
        const preview = document.getElementById('resumePreview');
        if (preview) preview.style.transform = `scale(${this.zoomLevel})`;
        const zoomLevelDisplay = document.getElementById('zoomLevel');
        if (zoomLevelDisplay) zoomLevelDisplay.innerText = Math.round(this.zoomLevel * 100) + '%';
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

    updateDownloadButtonState() {
        const btn = document.getElementById('downloadBtn');
        const pd = this.resumeData.personalInfo;
        btn.disabled = !(pd.firstName.trim() && pd.lastName.trim() && !!this.currentTemplate);
    }

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
                html2canvas: window.html2canvas
            });
        } catch (err) {
            alert('PDF generation failed: ' + err);
        }
        overlay.classList.add('hidden');
    }

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

window.addEventListener('DOMContentLoaded', () => {
    window.resumeBuilder = new ResumeBuilder();
});
