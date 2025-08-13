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
            {
                id: 'sean-bernard',
                name: 'Sean Bernard',
                description: 'Colorful teal design with modern layout',
                hasPhoto: false,
                colors: { primary: '#2dd4bf', secondary: '#6b7280', accent: '#059669' }
            },
            {
                id: 'don-draper',
                name: 'Don Draper',
                description: 'Professional sidebar with photo',
                hasPhoto: true,
                colors: { primary: '#374151', secondary: '#9ca3af', accent: '#1f2937' }
            },
            {
                id: 'michael-harris',
                name: 'Michael Harris',
                description: 'Minimal black and white design',
                hasPhoto: false,
                colors: { primary: '#000000', secondary: '#6b7280', accent: '#374151' }
            },
            {
                id: 'sherlock-holmes',
                name: 'Sherlock Holmes',
                description: 'Vintage dark sidebar with photo',
                hasPhoto: true,
                colors: { primary: '#374151', secondary: '#d1d5db', accent: '#111827' }
            },
            {
                id: 'modern-corporate',
                name: 'Modern Corporate',
                description: 'Clean blue corporate design',
                hasPhoto: false,
                colors: { primary: '#3b82f6', secondary: '#6b7280', accent: '#1d4ed8' }
            },
            {
                id: 'creative-designer',
                name: 'Creative Designer',
                description: 'Purple creative design',
                hasPhoto: false,
                colors: { primary: '#8b5cf6', secondary: '#6b7280', accent: '#7c3aed' }
            },
            {
                id: 'tech-professional',
                name: 'Tech Professional',
                description: 'Green tech-focused design',
                hasPhoto: false,
                colors: { primary: '#10b981', secondary: '#6b7280', accent: '#059669' }
            },
            {
                id: 'executive',
                name: 'Executive',
                description: 'Gold executive design',
                hasPhoto: false,
                colors: { primary: '#f59e0b', secondary: '#6b7280', accent: '#d97706' }
            },
            {
                id: 'graduate',
                name: 'Graduate',
                description: 'Orange entry-level design',
                hasPhoto: false,
                colors: { primary: '#f97316', secondary: '#6b7280', accent: '#ea580c' }
            },
            {
                id: 'academic',
                name: 'Academic',
                description: 'Navy academic design',
                hasPhoto: false,
                colors: { primary: '#1e40af', secondary: '#6b7280', accent: '#1e3a8a' }
            }
        ];

        this.zoomLevel = 0.4;
        this.init();
    }

    init() {
        this.renderTemplateGallery();
        this.setupEventListeners();
        this.loadFromStorage();
        this.setupAutoSave();
    }

    setupEventListeners() {
        // Template selection from gallery
        const templateGrid = document.getElementById('templateGrid');
        if (templateGrid) {
            templateGrid.addEventListener('click', (e) => {
                const templateCard = e.target.closest('.template-card');
                if (templateCard) {
                    const templateId = templateCard.dataset.templateId;
                    console.log('Template selected:', templateId);
                    this.selectTemplate(templateId);
                }
            });
        }

        // Template selector dropdown
        const templateSelector = document.getElementById('templateSelector');
        if (templateSelector) {
            templateSelector.addEventListener('change', (e) => {
                if (e.target.value) {
                    this.selectTemplate(e.target.value);
                }
            });
        }

        // Change template button
        const changeTemplateBtn = document.getElementById('changeTemplateBtn');
        if (changeTemplateBtn) {
            changeTemplateBtn.addEventListener('click', () => {
                this.showTemplateGallery();
            });
        }

        // Download PDF
        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.downloadPDF();
            });
        }

        // Form inputs
        this.setupFormListeners();

        // Dynamic sections
        this.setupDynamicSections();

        // Photo upload
        const photoInput = document.getElementById('photo');
        if (photoInput) {
            photoInput.addEventListener('change', (e) => {
                this.handlePhotoUpload(e);
            });
        }

        // Zoom controls
        const zoomIn = document.getElementById('zoomIn');
        const zoomOut = document.getElementById('zoomOut');
        if (zoomIn) {
            zoomIn.addEventListener('click', () => {
                this.adjustZoom(0.1);
            });
        }
        if (zoomOut) {
            zoomOut.addEventListener('click', () => {
                this.adjustZoom(-0.1);
            });
        }
    }

    renderTemplateGallery() {
        const grid = document.getElementById('templateGrid');
        const selector = document.getElementById('templateSelector');
        
        if (!grid || !selector) return;
        
        grid.innerHTML = '';
        selector.innerHTML = '<option value="">Select Template</option>';

        this.templates.forEach(template => {
            // Gallery card
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

            // Selector option
            const option = document.createElement('option');
            option.value = template.id;
            option.textContent = template.name;
            selector.appendChild(option);
        });
    }

    selectTemplate(templateId) {
        console.log('Selecting template:', templateId);
        this.currentTemplate = this.templates.find(t => t.id === templateId);
        
        if (!this.currentTemplate) {
            console.error('Template not found:', templateId);
            return;
        }

        console.log('Template found:', this.currentTemplate);

        // Update UI elements
        const templateGallery = document.getElementById('templateGallery');
        const resumeBuilder = document.getElementById('resumeBuilder');
        const templateSelector = document.getElementById('templateSelector');
        const downloadBtn = document.getElementById('downloadBtn');

        if (templateGallery) {
            templateGallery.classList.add('hidden');
        }
        if (resumeBuilder) {
            resumeBuilder.classList.remove('hidden');
        }
        if (templateSelector) {
            templateSelector.value = templateId;
        }
        if (downloadBtn) {
            downloadBtn.disabled = false;
        }

        // Show/hide photo upload based on template
        const photoSection = document.getElementById('photoUploadSection');
        if (photoSection) {
            if (this.currentTemplate.hasPhoto) {
                photoSection.style.display = 'block';
            } else {
                photoSection.style.display = 'none';
            }
        }

        // Initialize dynamic sections if they're empty
        this.initializeDynamicSections();

        this.updatePreview();
        this.saveToStorage();
    }

    initializeDynamicSections() {
        // Add default items if arrays are empty
        if (this.resumeData.workExperience.length === 0) {
            this.resumeData.workExperience.push(this.createEmptyItem('workExperience'));
        }
        if (this.resumeData.education.length === 0) {
            this.resumeData.education.push(this.createEmptyItem('education'));
        }
        if (this.resumeData.skills.length === 0) {
            this.resumeData.skills.push(this.createEmptyItem('skills'));
        }

        // Render all dynamic sections
        ['workExperience', 'education', 'skills', 'certifications', 'languages', 'volunteer'].forEach(section => {
            this.renderDynamicSection(section);
        });
    }

    showTemplateGallery() {
        const resumeBuilder = document.getElementById('resumeBuilder');
        const templateGallery = document.getElementById('templateGallery');
        const downloadBtn = document.getElementById('downloadBtn');

        if (resumeBuilder) {
            resumeBuilder.classList.add('hidden');
        }
        if (templateGallery) {
            templateGallery.classList.remove('hidden');
        }
        if (downloadBtn) {
            downloadBtn.disabled = true;
        }
    }

    setupFormListeners() {
        // Personal info fields
        const personalFields = ['firstName', 'lastName', 'jobTitle', 'email', 'phone', 'location', 'linkedin'];
        personalFields.forEach(field => {
            const element = document.getElementById(field);
            if (element) {
                element.addEventListener('input', (e) => {
                    this.resumeData.personalInfo[field] = e.target.value;
                    this.updatePreview();
                    this.saveToStorage();
                });
            }
        });

        // Summary field
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
        // Add item buttons
        document.querySelectorAll('.add-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const target = e.target.dataset.target;
                this.addDynamicItem(target);
            });
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
            workExperience: {
                title: '',
                company: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
                description: ''
            },
            education: {
                degree: '',
                school: '',
                location: '',
                graduationDate: '',
                gpa: '',
                description: ''
            },
            skills: {
                name: '',
                level: 'Intermediate'
            },
            certifications: {
                name: '',
                issuer: '',
                date: '',
                url: ''
            },
            languages: {
                name: '',
                proficiency: 'Conversational'
            },
            volunteer: {
                title: '',
                organization: '',
                location: '',
                startDate: '',
                endDate: '',
                description: ''
            }
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

        // Add event listeners
        div.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('input', (e) => {
                const field = e.target.name;
                if (e.target.type === 'checkbox') {
                    this.resumeData[section][index][field] = e.target.checked;
                    
                    // Handle current job checkbox
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
        const templates = {
            workExperience: `
                <div class="dynamic-item__header">
                    <span class="dynamic-item__title">Work Experience ${index + 1}</span>
                    <button type="button" class="remove-item">×</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Job Title</label>
                        <input type="text" name="title" class="form-control" value="${item.title}" placeholder="Software Engineer">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Company</label>
                        <input type="text" name="company" class="form-control" value="${item.company}" placeholder="Company Name">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Location</label>
                        <input type="text" name="location" class="form-control" value="${item.location}" placeholder="City, State">
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
                        <input type="month" name="startDate" class="form-control" value="${item.startDate}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">End Date</label>
                        <input type="month" name="endDate" class="form-control" value="${item.endDate}" ${item.current ? 'disabled' : ''}>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea name="description" class="form-control" rows="3" placeholder="Describe your responsibilities and achievements...">${item.description}</textarea>
                </div>
            `,
            education: `
                <div class="dynamic-item__header">
                    <span class="dynamic-item__title">Education ${index + 1}</span>
                    <button type="button" class="remove-item">×</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Degree</label>
                        <input type="text" name="degree" class="form-control" value="${item.degree}" placeholder="Bachelor of Science">
                    </div>
                    <div class="form-group">
                        <label class="form-label">School</label>
                        <input type="text" name="school" class="form-control" value="${item.school}" placeholder="University Name">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Location</label>
                        <input type="text" name="location" class="form-control" value="${item.location}" placeholder="City, State">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Graduation Date</label>
                        <input type="month" name="graduationDate" class="form-control" value="${item.graduationDate}">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">GPA (Optional)</label>
                    <input type="text" name="gpa" class="form-control" value="${item.gpa}" placeholder="3.8">
                </div>
            `,
            skills: `
                <div class="dynamic-item__header">
                    <span class="dynamic-item__title">Skill ${index + 1}</span>
                    <button type="button" class="remove-item">×</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Skill Name</label>
                        <input type="text" name="name" class="form-control" value="${item.name}" placeholder="JavaScript">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Level</label>
                        <select name="level" class="form-control">
                            <option value="Beginner" ${item.level === 'Beginner' ? 'selected' : ''}>Beginner</option>
                            <option value="Intermediate" ${item.level === 'Intermediate' ? 'selected' : ''}>Intermediate</option>
                            <option value="Advanced" ${item.level === 'Advanced' ? 'selected' : ''}>Advanced</option>
                            <option value="Expert" ${item.level === 'Expert' ? 'selected' : ''}>Expert</option>
                        </select>
                    </div>
                </div>
            `,
            certifications: `
                <div class="dynamic-item__header">
                    <span class="dynamic-item__title">Certification ${index + 1}</span>
                    <button type="button" class="remove-item">×</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Certification Name</label>
                        <input type="text" name="name" class="form-control" value="${item.name}" placeholder="AWS Certified Developer">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Issuer</label>
                        <input type="text" name="issuer" class="form-control" value="${item.issuer}" placeholder="Amazon Web Services">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Date Obtained</label>
                        <input type="month" name="date" class="form-control" value="${item.date}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">URL (Optional)</label>
                        <input type="url" name="url" class="form-control" value="${item.url}" placeholder="https://...">
                    </div>
                </div>
            `,
            languages: `
                <div class="dynamic-item__header">
                    <span class="dynamic-item__title">Language ${index + 1}</span>
                    <button type="button" class="remove-item">×</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Language</label>
                        <input type="text" name="name" class="form-control" value="${item.name}" placeholder="Spanish">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Proficiency</label>
                        <select name="proficiency" class="form-control">
                            <option value="Basic" ${item.proficiency === 'Basic' ? 'selected' : ''}>Basic</option>
                            <option value="Conversational" ${item.proficiency === 'Conversational' ? 'selected' : ''}>Conversational</option>
                            <option value="Fluent" ${item.proficiency === 'Fluent' ? 'selected' : ''}>Fluent</option>
                            <option value="Native" ${item.proficiency === 'Native' ? 'selected' : ''}>Native</option>
                        </select>
                    </div>
                </div>
            `,
            volunteer: `
                <div class="dynamic-item__header">
                    <span class="dynamic-item__title">Volunteer Work ${index + 1}</span>
                    <button type="button" class="remove-item">×</button>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Role/Title</label>
                        <input type="text" name="title" class="form-control" value="${item.title}" placeholder="Volunteer Coordinator">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Organization</label>
                        <input type="text" name="organization" class="form-control" value="${item.organization}" placeholder="Local Food Bank">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Location</label>
                        <input type="text" name="location" class="form-control" value="${item.location}" placeholder="City, State">
                    </div>
                    <div class="form-group"></div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Start Date</label>
                        <input type="month" name="startDate" class="form-control" value="${item.startDate}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">End Date</label>
                        <input type="month" name="endDate" class="form-control" value="${item.endDate}">
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea name="description" class="form-control" rows="3" placeholder="Describe your volunteer work...">${item.description}</textarea>
                </div>
            `
        };

        return templates[section] || '';
    }

    removeDynamicItem(section, index) {
        this.resumeData[section].splice(index, 1);
        this.renderDynamicSection(section);
        this.updatePreview();
        this.saveToStorage();
    }

    handlePhotoUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Resize image to 300x300 max
                const maxSize = 300;
                let { width, height } = img;
                
                if (width > height) {
                    if (width > maxSize) {
                        height = height * (maxSize / width);
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width = width * (maxSize / height);
                        height = maxSize;
                    }
                }
                
                canvas.width = width;
                canvas.height = height;
                
                ctx.drawImage(img, 0, 0, width, height);
                
                const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
                this.resumeData.personalInfo.photo = compressedDataUrl;
                
                // Show preview
                const preview = document.getElementById('photoPreview');
                if (preview) {
                    preview.innerHTML = `<img src="${compressedDataUrl}" alt="Profile photo">`;
                }
                
                this.updatePreview();
                this.saveToStorage();
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    updatePreview() {
        if (!this.currentTemplate) return;

        const preview = document.getElementById('resumePreview');
        if (!preview) return;

        preview.className = `resume-preview template-${this.currentTemplate.id}`;
        preview.innerHTML = this.generateResumeHTML();
    }

    generateResumeHTML() {
        const data = this.resumeData;
        const template = this.currentTemplate;

        if (template.id === 'don-draper' || template.id === 'sherlock-holmes') {
            return this.generateSidebarTemplate();
        } else {
            return this.generateStandardTemplate();
        }
    }

    generateStandardTemplate() {
        const data = this.resumeData;
        const fullName = `${data.personalInfo.firstName} ${data.personalInfo.lastName}`.trim();
        
        let html = '';

        // Header
        html += `
            <div class="resume-header">
                <div class="resume-name">${fullName || 'Your Name'}</div>
                <div class="resume-title">${data.personalInfo.jobTitle || 'Your Title'}</div>
                <div class="resume-contact">
                    ${data.personalInfo.email ? `<span>${data.personalInfo.email}</span>` : ''}
                    ${data.personalInfo.phone ? `<span>${data.personalInfo.phone}</span>` : ''}
                    ${data.personalInfo.location ? `<span>${data.personalInfo.location}</span>` : ''}
                    ${data.personalInfo.linkedin ? `<span>${data.personalInfo.linkedin}</span>` : ''}
                </div>
            </div>
        `;

        // Summary
        if (data.summary) {
            html += `
                <div class="resume-section">
                    <div class="section-title">Professional Summary</div>
                    <div class="summary-content">${data.summary}</div>
                </div>
            `;
        }

        // Work Experience
        if (data.workExperience.length > 0) {
            html += `<div class="resume-section">
                <div class="section-title">Work Experience</div>`;
            
            data.workExperience.forEach(exp => {
                if (exp.title || exp.company) {
                    const endDate = exp.current ? 'Present' : this.formatDate(exp.endDate);
                    html += `
                        <div class="experience-item">
                            <div class="item-header">
                                <div class="item-title">${exp.title || 'Job Title'}</div>
                                <div class="item-date">${this.formatDate(exp.startDate)} - ${endDate}</div>
                            </div>
                            <div class="item-company">${exp.company || 'Company Name'}${exp.location ? ` | ${exp.location}` : ''}</div>
                            ${exp.description ? `<div class="item-description">${this.formatDescription(exp.description)}</div>` : ''}
                        </div>
                    `;
                }
            });
            
            html += '</div>';
        }

        // Education
        if (data.education.length > 0) {
            html += `<div class="resume-section">
                <div class="section-title">Education</div>`;
            
            data.education.forEach(edu => {
                if (edu.degree || edu.school) {
                    html += `
                        <div class="education-item">
                            <div class="item-header">
                                <div class="item-title">${edu.degree || 'Degree'}</div>
                                <div class="item-date">${this.formatDate(edu.graduationDate)}</div>
                            </div>
                            <div class="item-school">${edu.school || 'School Name'}${edu.location ? ` | ${edu.location}` : ''}</div>
                            ${edu.gpa ? `<div class="item-gpa">GPA: ${edu.gpa}</div>` : ''}
                        </div>
                    `;
                }
            });
            
            html += '</div>';
        }

        // Skills
        const validSkills = data.skills.filter(skill => skill.name);
        if (validSkills.length > 0) {
            html += `
                <div class="resume-section">
                    <div class="section-title">Skills</div>
                    <div class="skills-list">
                        ${validSkills.map(skill => `<div class="skill-item">${skill.name}</div>`).join('')}
                    </div>
                </div>
            `;
        }

        // Certifications
        const validCertifications = data.certifications.filter(cert => cert.name);
        if (validCertifications.length > 0) {
            html += `<div class="resume-section">
                <div class="section-title">Certifications</div>
                <ul class="certifications-list">`;
            
            validCertifications.forEach(cert => {
                html += `<li>${cert.name}${cert.issuer ? ` - ${cert.issuer}` : ''}${cert.date ? ` (${this.formatDate(cert.date)})` : ''}</li>`;
            });
            
            html += '</ul></div>';
        }

        // Languages
        const validLanguages = data.languages.filter(lang => lang.name);
        if (validLanguages.length > 0) {
            html += `<div class="resume-section">
                <div class="section-title">Languages</div>
                <ul class="languages-list">`;
            
            validLanguages.forEach(lang => {
                html += `<li>${lang.name} - ${lang.proficiency}</li>`;
            });
            
            html += '</ul></div>';
        }

        // Volunteer Experience
        const validVolunteer = data.volunteer.filter(vol => vol.title || vol.organization);
        if (validVolunteer.length > 0) {
            html += `<div class="resume-section">
                <div class="section-title">Volunteer Experience</div>`;
            
            validVolunteer.forEach(vol => {
                html += `
                    <div class="volunteer-item">
                        <div class="item-header">
                            <div class="item-title">${vol.title || 'Volunteer Role'}</div>
                            <div class="item-date">${this.formatDate(vol.startDate)} - ${this.formatDate(vol.endDate)}</div>
                        </div>
                        <div class="item-company">${vol.organization || 'Organization'}${vol.location ? ` | ${vol.location}` : ''}</div>
                        ${vol.description ? `<div class="item-description">${this.formatDescription(vol.description)}</div>` : ''}
                    </div>
                `;
            });
            
            html += '</div>';
        }

        return html;
    }

    generateSidebarTemplate() {
        const data = this.resumeData;
        const fullName = `${data.personalInfo.firstName} ${data.personalInfo.lastName}`.trim();
        
        let html = `
            <div class="resume-sidebar">
                ${data.personalInfo.photo && this.currentTemplate.hasPhoto ? 
                    `<img src="${data.personalInfo.photo}" alt="Profile photo" class="resume-photo">` : ''}
                <div class="resume-name">${fullName || 'Your Name'}</div>
                <div class="resume-title">${data.personalInfo.jobTitle || 'Your Title'}</div>
                
                <div class="sidebar-section">
                    <div class="sidebar-title">Contact</div>
                    <div class="contact-info">
                        ${data.personalInfo.email ? `<div>${data.personalInfo.email}</div>` : ''}
                        ${data.personalInfo.phone ? `<div>${data.personalInfo.phone}</div>` : ''}
                        ${data.personalInfo.location ? `<div>${data.personalInfo.location}</div>` : ''}
                        ${data.personalInfo.linkedin ? `<div>${data.personalInfo.linkedin}</div>` : ''}
                    </div>
                </div>

                ${data.skills.filter(skill => skill.name).length > 0 ? `
                    <div class="sidebar-section">
                        <div class="sidebar-title">Skills</div>
                        <div class="skills-list">
                            ${data.skills.filter(skill => skill.name).map(skill => `<div class="skill-item">${skill.name}</div>`).join('')}
                        </div>
                    </div>
                ` : ''}

                ${data.languages.filter(lang => lang.name).length > 0 ? `
                    <div class="sidebar-section">
                        <div class="sidebar-title">Languages</div>
                        <ul class="languages-list">
                            ${data.languages.filter(lang => lang.name).map(lang => `<li>${lang.name} - ${lang.proficiency}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>

            <div class="resume-main">
                ${data.summary ? `
                    <div class="main-section">
                        <div class="main-title">Professional Summary</div>
                        <div class="summary-content">${data.summary}</div>
                    </div>
                ` : ''}

                ${data.workExperience.filter(exp => exp.title || exp.company).length > 0 ? `
                    <div class="main-section">
                        <div class="main-title">Work Experience</div>
                        ${data.workExperience.filter(exp => exp.title || exp.company).map(exp => {
                            const endDate = exp.current ? 'Present' : this.formatDate(exp.endDate);
                            return `
                                <div class="experience-item">
                                    <div class="item-header">
                                        <div class="item-title">${exp.title || 'Job Title'}</div>
                                        <div class="item-date">${this.formatDate(exp.startDate)} - ${endDate}</div>
                                    </div>
                                    <div class="item-company">${exp.company || 'Company Name'}${exp.location ? ` | ${exp.location}` : ''}</div>
                                    ${exp.description ? `<div class="item-description">${this.formatDescription(exp.description)}</div>` : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                ` : ''}

                ${data.education.filter(edu => edu.degree || edu.school).length > 0 ? `
                    <div class="main-section">
                        <div class="main-title">Education</div>
                        ${data.education.filter(edu => edu.degree || edu.school).map(edu => `
                            <div class="education-item">
                                <div class="item-header">
                                    <div class="item-title">${edu.degree || 'Degree'}</div>
                                    <div class="item-date">${this.formatDate(edu.graduationDate)}</div>
                                </div>
                                <div class="item-school">${edu.school || 'School Name'}${edu.location ? ` | ${edu.location}` : ''}</div>
                                ${edu.gpa ? `<div class="item-gpa">GPA: ${edu.gpa}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}

                ${data.certifications.filter(cert => cert.name).length > 0 ? `
                    <div class="main-section">
                        <div class="main-title">Certifications</div>
                        <ul class="certifications-list">
                            ${data.certifications.filter(cert => cert.name).map(cert => 
                                `<li>${cert.name}${cert.issuer ? ` - ${cert.issuer}` : ''}${cert.date ? ` (${this.formatDate(cert.date)})` : ''}</li>`
                            ).join('')}
                        </ul>
                    </div>
                ` : ''}

                ${data.volunteer.filter(vol => vol.title || vol.organization).length > 0 ? `
                    <div class="main-section">
                        <div class="main-title">Volunteer Experience</div>
                        ${data.volunteer.filter(vol => vol.title || vol.organization).map(vol => `
                            <div class="volunteer-item">
                                <div class="item-header">
                                    <div class="item-title">${vol.title || 'Volunteer Role'}</div>
                                    <div class="item-date">${this.formatDate(vol.startDate)} - ${this.formatDate(vol.endDate)}</div>
                                </div>
                                <div class="item-company">${vol.organization || 'Organization'}${vol.location ? ` | ${vol.location}` : ''}</div>
                                ${vol.description ? `<div class="item-description">${this.formatDescription(vol.description)}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;

        return html;
    }

    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString + '-01');
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    }

    formatDescription(description) {
        if (!description) return '';
        
        // Convert line breaks to bullet points if not already formatted
        const lines = description.split('\n').filter(line => line.trim());
        if (lines.length > 1 && !description.includes('<ul>')) {
            return '<ul>' + lines.map(line => `<li>${line.trim()}</li>`).join('') + '</ul>';
        }
        
        return description.replace(/\n/g, '<br>');
    }

    adjustZoom(delta) {
        this.zoomLevel = Math.max(0.2, Math.min(1.0, this.zoomLevel + delta));
        const zoomElement = document.getElementById('zoomLevel');
        if (zoomElement) {
            zoomElement.textContent = Math.round(this.zoomLevel * 100) + '%';
        }
        
        const preview = document.querySelector('.resume-preview');
        if (preview) {
            preview.style.transform = `scale(${this.zoomLevel})`;
        }
    }

    async downloadPDF() {
        if (!this.currentTemplate) return;

        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.classList.remove('hidden');
        }

        try {
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            // Get the resume preview element
            const preview = document.getElementById('resumePreview');
            const originalTransform = preview.style.transform;
            
            // Temporarily remove transform for capture
            preview.style.transform = 'scale(1)';
            
            // Use html2canvas to capture the resume
            const canvas = await html2canvas(preview, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff'
            });

            // Restore original transform
            preview.style.transform = originalTransform;

            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            const firstName = this.resumeData.personalInfo.firstName || 'resume';
            const lastName = this.resumeData.personalInfo.lastName || '';
            const fileName = `${firstName}${lastName ? '-' + lastName : ''}-resume.pdf`.toLowerCase().replace(/\s+/g, '-');
            pdf.save(fileName);

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Error generating PDF. Please try again.');
        } finally {
            if (loadingOverlay) {
                loadingOverlay.classList.add('hidden');
            }
        }
    }

    saveToStorage() {
        try {
            const data = {
                currentTemplate: this.currentTemplate?.id,
                resumeData: this.resumeData
            };
            sessionStorage.setItem('resumeBuilder', JSON.stringify(data));
        } catch (error) {
            console.warn('Could not save to session storage:', error);
        }
    }

    loadFromStorage() {
        try {
            const saved = sessionStorage.getItem('resumeBuilder');
            if (saved) {
                const data = JSON.parse(saved);
                this.resumeData = { ...this.resumeData, ...data.resumeData };
                
                // Populate form fields
                this.populateFormFields();
                
                // Load template if saved
                if (data.currentTemplate) {
                    this.selectTemplate(data.currentTemplate);
                }
            }
        } catch (error) {
            console.warn('Could not load from session storage:', error);
        }
    }

    populateFormFields() {
        // Personal info fields
        Object.keys(this.resumeData.personalInfo).forEach(field => {
            const element = document.getElementById(field);
            if (element && field !== 'photo') {
                element.value = this.resumeData.personalInfo[field];
            }
        });

        // Summary
        const summaryElement = document.getElementById('summary');
        if (summaryElement) {
            summaryElement.value = this.resumeData.summary;
        }

        // Photo preview
        if (this.resumeData.personalInfo.photo) {
            const preview = document.getElementById('photoPreview');
            if (preview) {
                preview.innerHTML = `<img src="${this.resumeData.personalInfo.photo}" alt="Profile photo">`;
            }
        }
    }

    setupAutoSave() {
        // Auto-save every 30 seconds
        setInterval(() => {
            this.saveToStorage();
        }, 30000);

        // Save on page unload
        window.addEventListener('beforeunload', () => {
            this.saveToStorage();
        });
    }
}

// Add html2canvas library for PDF generation
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
document.head.appendChild(script);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ResumeBuilder();
});