// FastServer Connect - Client-side JavaScript for GitHub Pages
class FastServerApp {
    constructor() {
        this.servers = [];
        this.filteredServers = [];
        this.isLoading = true;
        
        this.initializeApp();
    }

    async initializeApp() {
        try {
            await this.loadServers();
            this.setupEventListeners();
            this.updateStats();
            this.renderServers();
            this.hideLoading();
        } catch (error) {
            console.error('Failed to initialize app:', error);
            // Don't show error message since we have fallback data
            this.updateStats();
            this.renderServers();
            this.hideLoading();
        }
    }

    async loadServers() {
        try {
            // 最初にプライマリAPIを試す
            let response, data;
            
            try {
                response = await fetch('https://script.google.com/macros/s/AKfycbyQX2O29UD5hJqNOsmoyxXDdPaTX0ZGmfUuwdmUXpps6Gk9zSBEpO80spmN_lnMIegqpg/exec');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                data = await response.json();
            } catch (apiError) {
                console.log('Primary API failed, trying fallback API endpoint:', apiError.message);
                
                // フォールバックとしてローカルAPIエンドポイントを使用
                try {
                    response = await fetch('/api/servers');
                    if (!response.ok) {
                        throw new Error(`Fallback API error! status: ${response.status}`);
                    }
                    data = await response.json();
                    
                    if (data.success) {
                        data = { data: data.data };
                    } else {
                        // フォールバックAPIもエラーだが、データがある場合は使用
                        data = { data: data.data };
                        console.warn('Using fallback data due to API error:', data.error);
                    }
                } catch (fallbackError) {
                    console.log('Fallback API also failed:', fallbackError.message);
                    throw fallbackError;
                }
            }
            
            if (data && data.data && Array.isArray(data.data)) {
                if (data.data.length === 0) {
                    // API succeeded but returned empty data
                    console.log('API returned empty server list');
                    this.servers = [];
                    this.filteredServers = [];
                } else {
                    // API succeeded with data
                    this.servers = data.data;
                    this.filteredServers = [...this.servers];
                }
            } else {
                // API returned invalid format
                console.error('API returned invalid data format:', data);
                this.servers = [];
                this.filteredServers = [];
            }
        } catch (error) {
            console.error('Error loading servers:', error);
            // API failed completely - show no servers
            this.servers = [];
            this.filteredServers = [];
        }
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // Filter and sort functionality
        const protocolFilter = document.getElementById('protocol-filter');
        const sortOrder = document.getElementById('sort-order');
        
        protocolFilter.addEventListener('change', () => this.applyFilters());
        sortOrder.addEventListener('change', () => this.applyFilters());
    }

    handleSearch(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        
        if (term === '') {
            this.filteredServers = [...this.servers];
        } else {
            this.filteredServers = this.servers.filter(server => 
                server.サーバー名.toLowerCase().includes(term) ||
                server.connect_key.toLowerCase().includes(term) ||
                server.mcinfo.motd.toLowerCase().includes(term)
            );
        }
        
        this.applyFilters();
    }

    applyFilters() {
        const protocolFilter = document.getElementById('protocol-filter').value;
        const sortOrder = document.getElementById('sort-order').value;
        
        let filtered = [...this.filteredServers];
        
        // Apply protocol filter
        if (protocolFilter) {
            filtered = filtered.filter(server => server.protocol === protocolFilter);
        }
        
        // Apply sorting
        switch (sortOrder) {
            case 'players-desc':
                filtered.sort((a, b) => {
                    const playersA = parseInt(a.mcinfo.players || 0);
                    const playersB = parseInt(b.mcinfo.players || 0);
                    return (isNaN(playersB) ? 0 : playersB) - (isNaN(playersA) ? 0 : playersA);
                });
                break;
            case 'players-asc':
                filtered.sort((a, b) => {
                    const playersA = parseInt(a.mcinfo.players || 0);
                    const playersB = parseInt(b.mcinfo.players || 0);
                    return (isNaN(playersA) ? 0 : playersA) - (isNaN(playersB) ? 0 : playersB);
                });
                break;
            case 'name-asc':
                filtered.sort((a, b) => a.サーバー名.localeCompare(b.サーバー名));
                break;
            case 'name-desc':
                filtered.sort((a, b) => b.サーバー名.localeCompare(a.サーバー名));
                break;
        }
        
        this.renderServers(filtered);
    }

    renderServers(serversToRender = this.filteredServers) {
        const serverList = document.getElementById('server-list');
        const noResults = document.getElementById('no-results');
        const noServers = document.getElementById('no-servers');
        
        if (serversToRender.length === 0) {
            serverList.style.display = 'none';
            
            // Check if we're filtering/searching vs no servers from API
            if (this.servers.length === 0) {
                // No servers from API at all
                noResults.style.display = 'none';
                noServers.style.display = 'block';
            } else {
                // We have servers from API but search/filter returned no results
                noResults.style.display = 'block';
                noServers.style.display = 'none';
            }
            return;
        }
        
        // We have servers to show
        serverList.style.display = 'grid';
        noResults.style.display = 'none';
        noServers.style.display = 'none';
        
        serverList.innerHTML = serversToRender.map((server, index) => {
            const motdHtml = this.minecraftColorToHtml(server.mcinfo.motd);
            const protocolClass = server.protocol === 'tcp' ? 'tcp' : 'udp';
            const protocolName = server.protocol === 'tcp' ? 'TCP（Java版）' : 'UDP（統合版）';
            
            return `
                <div class="server-card ${protocolClass} fade-in" style="animation-delay: ${index * 0.1}s">
                    <div class="server-content">
                        <div class="server-icon">
                            <img src="${server.mcinfo.favicon}" alt="${server.サーバー名} アイコン" 
                                 onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMzMzIi8+Cjx0ZXh0IHg9IjMyIiB5PSIzNiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Pz88L3RleHQ+Cjwvc3ZnPg=='">
                        </div>
                        
                        <div class="server-info">
                            <div class="server-header">
                                <h3 class="server-name" onclick="app.showServerDetails(${JSON.stringify(server).replace(/"/g, '&quot;')})">
                                    ${this.escapeHtml(server.サーバー名)}
                                </h3>
                                <span class="version-badge">${this.escapeHtml(server.mcinfo.version)}</span>
                            </div>
                            
                            <div class="server-details">
                                <div class="detail-item">
                                    <i class="fas fa-network-wired"></i>
                                    <span class="detail-value">${protocolName}</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-users"></i>
                                    <span class="detail-value">${(() => {
                                        const players = parseInt(server.mcinfo.players || 0);
                                        return isNaN(players) ? 0 : players;
                                    })()} プレイヤー</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-server"></i>
                                    <a href="javascript:void(0)" class="connect-address" 
                                       onclick="app.copyToClipboard('${server.connect_key}.zcnc.me')">
                                        ${server.connect_key}.zcnc.me
                                    </a>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-calendar"></i>
                                    <span class="detail-value">${this.formatDate(server.updated_at)}</span>
                                </div>
                            </div>
                            
                            <div class="motd-container">
                                ${motdHtml}
                            </div>
                        </div>
                        
                        <div class="server-actions">
                            <button class="action-btn btn-primary" 
                                    onclick="app.copyToClipboard('${server.connect_key}.zcnc.me')">
                                <i class="fas fa-copy"></i> コピー
                            </button>
                            <button class="action-btn btn-secondary" 
                                    onclick="app.showServerDetails(${JSON.stringify(server).replace(/"/g, '&quot;')})">
                                <i class="fas fa-info-circle"></i> 詳細
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    updateStats() {
        const totalServers = this.servers.length;
        const totalPlayers = this.servers.reduce((sum, server) => {
            const players = parseInt(server.mcinfo.players || 0);
            return sum + (isNaN(players) ? 0 : players);
        }, 0);
        
        this.animateCounter('total-servers', totalServers);
        this.animateCounter('total-players', totalPlayers);
    }

    animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        const duration = 2000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = Math.floor(targetValue * this.easeOutCubic(progress));
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showSuccessMessage('サーバーアドレスをコピーしました！', text);
        } catch (error) {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            this.showSuccessMessage('サーバーアドレスをコピーしました！', text);
        }
    }

    showServerDetails(server) {
        const formattedMOTD = this.minecraftColorToHtml(server.mcinfo.motd);
        const createdAt = this.formatDate(server.created_at);
        const updatedAt = this.formatDate(server.updated_at);
        const protocolName = server.protocol === 'tcp' ? 'TCP（Java版）' : 'UDP（統合版）';

        Swal.fire({
            title: server.サーバー名,
            html: `
                <div style="text-align: left; line-height: 1.8;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                        <div><strong>バージョン:</strong><br>${server.mcinfo.version}</div>
                        <div><strong>プロトコル:</strong><br>${protocolName}</div>
                        <div><strong>プレイヤー数:</strong><br>${(() => {
                            const players = parseInt(server.mcinfo.players || 0);
                            return isNaN(players) ? 0 : players;
                        })()}</div>
                        <div><strong>サーバーアドレス:</strong><br>${server.connect_key}.zcnc.me</div>
                        <div><strong>作成日時:</strong><br>${createdAt}</div>
                        <div><strong>更新日時:</strong><br>${updatedAt}</div>
                    </div>
                    <div><strong>MOTD:</strong></div>
                    <div style="background: #1a1a1a; padding: 15px; border-radius: 8px; margin-top: 10px; font-family: monospace; color: white;">
                        ${formattedMOTD}
                    </div>
                </div>
            `,
            icon: 'info',
            iconColor: '#667eea',
            confirmButtonText: '閉じる',
            confirmButtonColor: '#667eea',
            background: 'rgba(255, 255, 255, 0.95)',
            backdrop: 'rgba(0, 0, 0, 0.4)',
            showClass: {
                popup: 'animate__animated animate__zoomIn'
            },
            hideClass: {
                popup: 'animate__animated animate__zoomOut'
            }
        });
    }

    showSuccessMessage(title, text) {
        Swal.fire({
            title: title,
            text: `コピーされたアドレス: ${text}`,
            icon: 'success',
            iconColor: '#4ecdc4',
            confirmButtonText: 'OK',
            confirmButtonColor: '#667eea',
            background: 'rgba(255, 255, 255, 0.95)',
            backdrop: 'rgba(0, 0, 0, 0.4)',
            timer: 3000,
            timerProgressBar: true,
            showClass: {
                popup: 'animate__animated animate__bounceIn'
            },
            hideClass: {
                popup: 'animate__animated animate__bounceOut'
            }
        });
    }

    showError(message) {
        Swal.fire({
            title: 'エラー',
            text: message,
            icon: 'error',
            iconColor: '#ff6b6b',
            confirmButtonText: 'OK',
            confirmButtonColor: '#ff6b6b',
            background: 'rgba(255, 255, 255, 0.95)',
            backdrop: 'rgba(0, 0, 0, 0.4)'
        });
    }

    minecraftColorToHtml(text) {
        const colorCodes = {
            '0': '#000000', '1': '#0000AA', '2': '#00AA00', '3': '#00AAAA',
            '4': '#AA0000', '5': '#AA00AA', '6': '#FFAA00', '7': '#AAAAAA',
            '8': '#555555', '9': '#5555FF', 'a': '#55FF55', 'b': '#55FFFF',
            'c': '#FF5555', 'd': '#FF55FF', 'e': '#FFFF55', 'f': '#FFFFFF'
        };

        let result = '';
        let currentColor = 'f';
        let isBold = false;
        let isItalic = false;

        for (let i = 0; i < text.length; i++) {
            const char = text[i];

            if (char === '§' && /[0-9a-frkoiulmn]/i.test(text[i + 1])) {
                const code = text[i + 1].toLowerCase();

                if (code === 'r') {
                    currentColor = 'f';
                    isBold = false;
                    isItalic = false;
                } else if (colorCodes[code]) {
                    currentColor = code;
                } else if (code === 'l') {
                    isBold = true;
                } else if (code === 'o') {
                    isItalic = true;
                }
                i++;
            } else {
                let style = `color: ${colorCodes[currentColor]};`;
                if (isBold) style += ' font-weight: bold;';
                if (isItalic) style += ' font-style: italic;';

                result += `<span style="${style}">${this.escapeHtml(char)}</span>`;
            }
        }

        return result;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    hideLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.getElementById('main-content');
        
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            mainContent.style.display = 'block';
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000); // Show loading for at least 1 second for better UX
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new FastServerApp();
});

// Add some additional animations and interactions
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements that should fade in
    setTimeout(() => {
        document.querySelectorAll('.stat-card, .server-card').forEach(el => {
            observer.observe(el);
        });
    }, 2000);
});