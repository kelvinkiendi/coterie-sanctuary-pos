// List of common timezones
const COMMON_TIMEZONES = [
    'UTC',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Asia/Hong_Kong',
    'Asia/Singapore',
    'Asia/Dubai',
    'Asia/Kolkata',
    'Australia/Sydney',
    'Australia/Melbourne',
    'Pacific/Auckland',
    'America/Toronto',
    'America/Sao_Paulo',
    'Africa/Cairo',
    'Africa/Johannesburg',
    'Asia/Bangkok',
    'Asia/Seoul',
    'Asia/Manila'
];

// Default timezones to display
const DEFAULT_TIMEZONES = [
    'UTC',
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    'Australia/Sydney'
];

class DigitalClock {
    constructor() {
        this.activeTz = [...DEFAULT_TIMEZONES];
        this.updateInterval = null;
        this.init();
    }

    init() {
        this.populateTimezoneSelect();
        this.setupEventListeners();
        this.render();
        this.startUpdating();
    }

    populateTimezoneSelect() {
        const select = document.getElementById('timezoneSelect');
        COMMON_TIMEZONES.forEach(tz => {
            const option = document.createElement('option');
            option.value = tz;
            option.textContent = tz;
            select.appendChild(option);
        });
    }

    setupEventListeners() {
        document.getElementById('addBtn').addEventListener('click', () => this.addTimezone());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
        document.getElementById('addFromListBtn').addEventListener('click', () => this.addFromList());
        
        document.getElementById('timezoneInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTimezone();
        });
    }

    addTimezone() {
        const input = document.getElementById('timezoneInput');
        const tz = input.value.trim();

        if (!tz) {
            alert('Please enter a timezone');
            return;
        }

        if (this.activeTz.includes(tz)) {
            alert(`${tz} is already displayed`);
            return;
        }

        try {
            // Validate timezone by attempting to create a date formatter
            new Intl.DateTimeFormat('en-US', { timeZone: tz });
            this.activeTz.push(tz);
            this.activeTz.sort();
            input.value = '';
            this.render();
        } catch (error) {
            alert(`Invalid timezone: ${tz}`);
        }
    }

    addFromList() {
        const select = document.getElementById('timezoneSelect');
        const tz = select.value;

        if (!this.activeTz.includes(tz)) {
            this.activeTz.push(tz);
            this.activeTz.sort();
            this.render();
        } else {
            alert(`${tz} is already displayed`);
        }
    }

    removeTimezone(tz) {
        this.activeTz = this.activeTz.filter(t => t !== tz);
        this.render();
    }

    reset() {
        this.activeTz = [...DEFAULT_TIMEZONES];
        this.render();
    }

    getTimeInfo(tz) {
        const now = new Date();
        
        // Get time in specific timezone
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: tz,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const dateFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: tz,
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            weekday: 'short'
        });

        const time = formatter.format(now);
        const date = dateFormatter.format(now);

        // Calculate UTC offset
        const utcFormatter = new Intl.DateTimeFormat('en-US', {
            timeZone: 'UTC',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });

        const utcTime = utcFormatter.format(now);
        const offset = this.calculateOffset(time, utcTime);

        return { time, date, offset };
    }

    calculateOffset(tzTime, utcTime) {
        const tzParts = tzTime.split(':');
        const utcParts = utcTime.split(':');

        let tzHours = parseInt(tzParts[0]);
        let tzMinutes = parseInt(tzParts[1]);
        let utcHours = parseInt(utcParts[0]);
        let utcMinutes = parseInt(utcParts[1]);

        let diffHours = tzHours - utcHours;
        let diffMinutes = tzMinutes - utcMinutes;

        if (diffMinutes < 0) {
            diffHours--;
            diffMinutes += 60;
        }

        if (diffHours > 12) {
            diffHours -= 24;
        } else if (diffHours < -12) {
            diffHours += 24;
        }

        const sign = diffHours >= 0 ? '+' : '';
        const minStr = diffMinutes === 0 ? '00' : diffMinutes;
        return `${sign}${diffHours}:${minStr}`;
    }

    render() {
        const container = document.getElementById('clocksContainer');
        container.innerHTML = '';

        if (this.activeTz.length === 0) {
            container.innerHTML = '<div class="empty-state"><p>No timezones selected. Click "Reset to Default" or add a timezone.</p><\/div>';
            return;
        }

        this.activeTz.forEach(tz => {
            const { time, date, offset } = this.getTimeInfo(tz);
            const card = document.createElement('div');
            card.className = 'clock-card';
            card.innerHTML = `
                <button class="remove-btn" data-tz="${tz}">✕<\/button>
                <div class="timezone-name">${tz.replace(/_/g, ' ')}<\/div>
                <div class="time-display">${time}<\/div>
                <div class="date-display">${date}<\/div>
                <div class="offset-info">UTC ${offset}<\/div>
            `;
            container.appendChild(card);
        });

        // Add remove button listeners
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.removeTimezone(e.target.dataset.tz);
            });
        });
    }

    startUpdating() {
        if (this.updateInterval) clearInterval(this.updateInterval);
        this.updateInterval = setInterval(() => this.render(), 1000);
    }

    stopUpdating() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
}

// Initialize the clock when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.clock = new DigitalClock();
});

// Clean up when page unloads
window.addEventListener('beforeunload', () => {
    if (window.clock) {
        window.clock.stopUpdating();
    }
});