// --- Portfolio Data ---
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

// --- Detail Modal ---
function openDetailModal(type, id) {
    const store = type === 'project' ? PORTFOLIO_DATA.projects : PORTFOLIO_DATA.achievements;
    const data = store[id];
    if (!data) return;

    if (type === 'project') {
        document.getElementById('detailMeta').innerHTML =
            `<span class="subject-tag">${data.subject}</span>
             <span class="platform-tag"><i class="fa ${data.platformIcon}"></i> ${data.platform}</span>`;
        document.getElementById('detailTitle').innerHTML = `<i class="fa ${data.icon}"></i> ${data.title}`;
        document.getElementById('detailTech').innerHTML = data.tech.map(t => `<span class="tech">${t}</span>`).join('');
        document.getElementById('detailTech').style.display = '';
    } else {
        document.getElementById('detailMeta').innerHTML =
            `<i class="fa ${data.icon} detail-achievement-icon"></i>`;
        document.getElementById('detailTitle').textContent = data.title;
        document.getElementById('detailTech').style.display = 'none';
    }

    document.getElementById('detailDesc').innerHTML = data.desc;

    const img = document.getElementById('detailImg');
    img.src = data.img;
    img.alt = data.title;
    img.onclick = () => openImgModal(data.img, data.title);

    document.getElementById('detailModal').classList.add('show');
}

function closeDetailModal() {
    document.getElementById('detailModal').classList.remove('show');
}

// --- Image Lightbox ---
function openImgModal(src, caption) {
    document.getElementById('imgModalSrc').src = src;
    document.getElementById('imgModalCaption').textContent = caption || '';
    document.getElementById('imgModal').classList.add('show');
}

function closeImgModal() {
    document.getElementById('imgModal').classList.remove('show');
    document.getElementById('imgModalSrc').src = '';
}

// --- Page Navigation ---
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => {
        p.classList.remove('active');
        p.style.display = "none";
    });
    const active = document.getElementById(pageId);
    if(active) {
        active.style.display = "block";
        setTimeout(() => active.classList.add('active'), 50);
    }
    closeMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Navigation Modal Functions ---
function openMenu() {
    const modal = document.getElementById("navModal");
    modal.style.display = "block";
    setTimeout(() => modal.classList.add("show"), 10);
}

function closeMenu() {
    const modal = document.getElementById("navModal");
    if(!modal) return;
    modal.classList.remove("show");
    setTimeout(() => {
        if (!modal.classList.contains("show")) modal.style.display = "none";
    }, 400);
}

// --- Initialization ---
window.onload = () => {
    // Button Clicks
    document.getElementById("menuBtn").onclick = openMenu;
    document.querySelector(".close").onclick = closeMenu;

    // Dark Mode Toggle
    const themeBtn = document.getElementById("themeToggle");
    themeBtn.onclick = () => {
        document.body.classList.toggle("dark");
        const icon = themeBtn.querySelector("i");
        if(document.body.classList.contains("dark")) {
            icon.classList.replace("fa-moon", "fa-sun");
        } else {
            icon.classList.replace("fa-sun", "fa-moon");
        }
    };

    // Simple Search
    document.getElementById('siteSearch')?.addEventListener('keyup', (e) => {
        let term = e.target.value.toLowerCase();
        document.querySelectorAll('.card, .preview-item').forEach(item => {
            item.style.display = item.innerText.toLowerCase().includes(term) ? "block" : "none";
        });
    });

    // Project card clicks → detail modal
    document.querySelectorAll('.project-card[data-project-id]').forEach(card => {
        card.addEventListener('click', () => openDetailModal('project', card.dataset.projectId));
    });

    // Achievement item clicks → detail modal
    document.querySelectorAll('.achievement-item[data-achievement-id]').forEach(item => {
        item.addEventListener('click', () => openDetailModal('achievement', item.dataset.achievementId));
    });

    // Default Page
    showPage('home');
};