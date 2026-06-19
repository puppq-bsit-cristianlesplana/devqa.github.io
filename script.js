// ──────────────────────────────────────────────
//  Portfolio App — Object-Oriented Architecture
// ──────────────────────────────────────────────

const PORTFOLIO_DATA = {
    projects: {
        polycal1: {
            title: 'POLYCAL v1',
            icon: 'fa-calendar-check',
            subject: 'Comprog 1',
            platform: 'Desktop',
            platformIcon: 'fa-desktop',
            desc: 'A student calendar desktop app for Polytechnic students to manage schedules, deadlines, and subjects — built with <strong>Python (Tkinter)</strong>.',
            tech: ['Python', 'Tkinter'],
            img: 'https://picsum.photos/seed/polycal1/700/450',
        },
        polycal2: {
            title: 'POLYCAL v2',
            icon: 'fa-calendar-check',
            subject: 'Comprog 2',
            platform: 'Mobile',
            platformIcon: 'fa-mobile-alt',
            desc: 'Mobile version of POLYCAL redesigned for Android using <strong>Python (Kivy)</strong>, featuring a touch-friendly UI for on-the-go scheduling.',
            tech: ['Python', 'Kivy'],
            img: 'https://picsum.photos/seed/polycal2/700/450',
        },
        tictactoe: {
            title: 'Tic-Tac-Toe',
            icon: 'fa-gamepad',
            subject: 'Comprog 3',
            platform: 'Group',
            platformIcon: 'fa-users',
            desc: 'A console-based two-player Tic-Tac-Toe game developed as a group project, applying object-oriented programming concepts in <strong>C++</strong>.',
            tech: ['C++', 'OOP'],
            img: 'https://picsum.photos/seed/tictac77/700/450',
        },
        linking: {
            title: 'Linking Function',
            icon: 'fa-project-diagram',
            subject: 'Data Structures & Algorithms',
            platform: 'Group',
            platformIcon: 'fa-users',
            desc: 'A group project demonstrating linked data structures and function chaining using <strong>Python</strong>, applying DSA concepts in a practical system.',
            tech: ['Python', 'DSA'],
            img: 'https://picsum.photos/seed/datalink/700/450',
        },
        bookinventory: {
            title: 'Book Inventory CRUD',
            icon: 'fa-book',
            subject: 'Free Elective',
            platform: 'Solo',
            platformIcon: 'fa-user',
            desc: 'A solo CRUD application for managing a book inventory system — built with <strong>Java</strong>, covering create, read, update, and delete operations.',
            tech: ['Java', 'CRUD'],
            img: 'https://picsum.photos/seed/bookstore/700/450',
        },
    },
    achievements: {
        cert1: {
            title: 'Programming Session Certificate',
            icon: 'fa-certificate',
            desc: 'Attended a programming workshop/session and earned a certificate of participation, reinforcing skills in software development practices.',
            img: 'https://picsum.photos/seed/cert1/700/450',
        },
        cert2: {
            title: 'POLYCAL — Dual-Platform Release',
            icon: 'fa-trophy',
            desc: 'Successfully delivered the same project across two platforms (Desktop & Mobile) across consecutive semesters using different Python frameworks.',
            img: 'https://picsum.photos/seed/cert2/700/450',
        },
        cert3: {
            title: 'Multi-Language Developer',
            icon: 'fa-code-branch',
            desc: 'Completed academic projects across Python, C++, and Java — demonstrating versatility in multiple programming languages within two years.',
            img: 'https://picsum.photos/seed/cert3/700/450',
        },
    },
};

const SECTION_CONFIG = {
    projects: { title: 'Projects',  icon: 'fa-code',     href: 'projects.html', btn: 'Go to Projects Page' },
    about:    { title: 'About Me',  icon: 'fa-user',     href: 'about.html',    btn: 'Go to About Me Page' },
    contact:  { title: 'Contact',   icon: 'fa-envelope', href: 'contact.html',  btn: 'Go to Contact Page'  },
};


// ── Search Manager ──

class SearchManager {
    constructor() {
        this.headerInput = document.getElementById('siteSearch');
        this.menuInput   = document.getElementById('menuSearch');
        this._bind();
    }

    filter(term) {
        const lower = term.toLowerCase();
        document.querySelectorAll('.card, .preview-item').forEach(el => {
            el.style.display = el.innerText.toLowerCase().includes(lower) ? 'block' : 'none';
        });
    }

    _bind() {
        const handler = (e) => this.filter(e.target.value);
        this.headerInput?.addEventListener('keyup', handler);
        this.menuInput?.addEventListener('keyup', handler);
    }
}


// ── Modal (base class) ──

class Modal {
    constructor(id) {
        this.el = document.getElementById(id);
    }

    open() {
        this.el?.classList.add('show');
    }

    close() {
        this.el?.classList.remove('show');
    }
}


// ── Nav Modal (animated slide-down) ──

class NavModal extends Modal {
    constructor() {
        super('navModal');
        this.openBtn  = document.getElementById('menuBtn');
        this.closeBtn = this.el?.querySelector('.close');
        this._bind();
    }

    open() {
        if (!this.el) return;
        this.el.style.display = 'block';
        setTimeout(() => this.el.classList.add('show'), 10);
    }

    close() {
        if (!this.el) return;
        this.el.classList.remove('show');
        setTimeout(() => {
            if (!this.el.classList.contains('show')) {
                this.el.style.display = 'none';
            }
        }, 400);
    }

    _bind() {
        this.openBtn?.addEventListener('click', () => this.open());
        this.closeBtn?.addEventListener('click', () => this.close());
    }
}


// ── Image Lightbox Modal ──

class ImageModal extends Modal {
    constructor() {
        super('imgModal');
        this.imgEl     = document.getElementById('imgModalSrc');
        this.captionEl = document.getElementById('imgModalCaption');

        this.el?.querySelector('.img-modal-overlay')?.addEventListener('click', () => this.close());
        this.el?.querySelector('.img-modal-close')?.addEventListener('click', () => this.close());
        this._bindLightboxImages();
    }

    _bindLightboxImages() {
        document.querySelectorAll('[data-lightbox]').forEach(img => {
            img.addEventListener('click', () => this.open(img.dataset.lightbox, img.dataset.caption));
        });
    }

    open(src, caption) {
        if (!this.imgEl) return;
        this.imgEl.src = src;
        this.captionEl.textContent = caption || '';
        super.open();
    }

    close() {
        super.close();
        if (this.imgEl) this.imgEl.src = '';
    }
}


// ── Detail Modal (projects & achievements) ──

class DetailModal extends Modal {
    constructor(imageModal) {
        super('detailModal');
        this.imageModal = imageModal;
        this.refs = {
            meta:  document.getElementById('detailMeta'),
            title: document.getElementById('detailTitle'),
            desc:  document.getElementById('detailDesc'),
            tech:  document.getElementById('detailTech'),
            img:   document.getElementById('detailImg'),
        };

        this.el?.querySelector('.detail-modal-overlay')?.addEventListener('click', () => this.close());
        this.el?.querySelector('.detail-modal-close')?.addEventListener('click', () => this.close());
        this._bindCards();
    }

    open(type, id) {
        const store = type === 'project' ? PORTFOLIO_DATA.projects : PORTFOLIO_DATA.achievements;
        const item = store[id];
        if (!item || !this.refs.meta) return;

        if (type === 'project') {
            this.refs.meta.innerHTML =
                `<span class="subject-tag">${item.subject}</span>
                 <span class="platform-tag"><i class="fa ${item.platformIcon}"></i> ${item.platform}</span>`;
            this.refs.title.innerHTML = `<i class="fa ${item.icon}"></i> ${item.title}`;
            this.refs.tech.innerHTML = item.tech.map(t => `<span class="tech">${t}</span>`).join('');
            this.refs.tech.style.display = '';
        } else {
            this.refs.meta.innerHTML = `<i class="fa ${item.icon} detail-achievement-icon"></i>`;
            this.refs.title.textContent = item.title;
            this.refs.tech.style.display = 'none';
        }

        this.refs.desc.innerHTML = item.desc;
        this.refs.img.src = item.img;
        this.refs.img.alt = item.title;
        this.refs.img.onclick = () => this.imageModal.open(item.img, item.title);

        super.open();
    }

    _bindCards() {
        document.querySelectorAll('[data-project-id]').forEach(card => {
            card.addEventListener('click', () => this.open('project', card.dataset.projectId));
        });
        document.querySelectorAll('[data-achievement-id]').forEach(item => {
            item.addEventListener('click', () => this.open('achievement', item.dataset.achievementId));
        });
    }
}


// ── Section Preview Modal (home page) ──

class SectionPreviewModal extends Modal {
    constructor() {
        super('sectionPreviewModal');
        this.refs = {
            title:   document.getElementById('sectionPreviewTitle'),
            content: document.getElementById('sectionPreviewContent'),
            link:    document.getElementById('sectionPreviewLink'),
            btnText: document.getElementById('sectionPreviewBtnText'),
        };

        this.el?.querySelector('.section-preview-overlay')?.addEventListener('click', () => this.close());
        this.el?.querySelector('.section-preview-close')?.addEventListener('click', () => this.close());
        this._bindPreviews();
    }

    open(section) {
        const cfg = SECTION_CONFIG[section];
        const sourceEl = document.querySelector(`.home-preview-${section}`);
        if (!cfg || !sourceEl || !this.refs.title) return;

        this.refs.title.innerHTML   = `<i class="fa ${cfg.icon}"></i> ${cfg.title}`;
        this.refs.content.innerHTML = sourceEl.outerHTML;
        this.refs.link.href         = cfg.href;
        this.refs.btnText.textContent = cfg.btn;

        super.open();
    }

    _bindPreviews() {
        document.querySelectorAll('[data-section]').forEach(item => {
            item.addEventListener('click', () => this.open(item.dataset.section));
        });
    }
}


// ── Portfolio App (main controller) ──

class TubelightNav {
    constructor() {
        this._setActive();
    }

    _setActive() {
        const path = window.location.pathname.split('/').pop() || 'index.html';
        const pageMap = {
            'index.html': 'index',
            'projects.html': 'projects',
            'about.html': 'about',
            'contact.html': 'contact',
        };
        const current = pageMap[path] || (path === '' ? 'index' : null);
        if (!current) return;
        document.querySelectorAll('.tubelight-link').forEach(link => {
            link.classList.toggle('active', link.dataset.page === current);
        });
    }
}


class PortfolioApp {
    constructor() {
        this.tubelightNav   = new TubelightNav();
        this.search         = new SearchManager();
        this.navModal       = new NavModal();
        this.imageModal     = new ImageModal();
        this.detailModal    = new DetailModal(this.imageModal);
        this.sectionPreview = new SectionPreviewModal();

        this._bindLogout();
    }

    _bindLogout() {
        document.querySelectorAll('[data-logout]').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                sessionStorage.removeItem('portfolio_auth');
                window.location.href = 'login.html';
            });
        });
    }
}

window.onload = () => new PortfolioApp();
