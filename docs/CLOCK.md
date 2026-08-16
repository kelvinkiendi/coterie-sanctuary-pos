# Multi-Timezone Digital Clock

A responsive web application that displays the current time in multiple time zones simultaneously.

## Features

### Core Functionality
- **Real-time Updates**: Clock updates every second
- **Multiple Time Zones**: Display time in multiple time zones at once
- **UTC Offset Calculation**: Shows offset from UTC for each timezone
- **Date Display**: Shows current date and day of week for each timezone

### User Interactions
- **Add Timezone**: Add custom timezones via input field
- **Remove Timezone**: Remove individual timezones by clicking the ✕ button
- **Quick Selection**: Add timezones from a pre-configured list
- **Reset**: Return to default timezone configuration

### Visual Design
- **Responsive Grid Layout**: Adapts to different screen sizes
- **Gradient Background**: Modern purple gradient design
- **Card-based Display**: Each timezone displayed in its own card
- **Hover Effects**: Interactive feedback on buttons and cards
- **Mobile Friendly**: Optimized for all device sizes

## Usage

### Opening the Clock
1. Open `src/clock.html` in a web browser
2. The clock will display the default timezones:
   - UTC
   - America/New_York
   - Europe/London
   - Asia/Tokyo
   - Australia/Sydney

### Adding a Timezone
**Method 1: Text Input**
1. Enter the timezone name in the text input field (e.g., `America/Los_Angeles`)
2. Click "Add Timezone" or press Enter
3. The timezone will be added and sorted alphabetically

**Method 2: Dropdown List**
1. Select a timezone from the dropdown list
2. Click "Add Selected"
3. The timezone will be added to the display

### Removing a Timezone
- Click the "✕" button on any clock card to remove it

### Resetting to Default
- Click "Reset to Default" to return to the original timezone configuration

## Supported Timezones

### Americas
- `America/Anchorage` - Alaska
- `America/Chicago` - Central Time
- `America/Denver` - Mountain Time
- `America/Los_Angeles` - Pacific Time
- `America/New_York` - Eastern Time
- `America/Toronto` - Eastern Canada
- `America/Sao_Paulo` - Brazil

### Europe
- `Europe/Berlin` - Central Europe
- `Europe/London` - UK
- `Europe/Paris` - France

### Africa
- `Africa/Cairo` - Egypt
- `Africa/Johannesburg` - South Africa

### Asia
- `Asia/Bangkok` - Thailand
- `Asia/Dubai` - UAE
- `Asia/Hong_Kong` - Hong Kong
- `Asia/Kolkata` - India
- `Asia/Manila` - Philippines
- `Asia/Seoul` - South Korea
- `Asia/Shanghai` - China
- `Asia/Singapore` - Singapore
- `Asia/Tokyo` - Japan

### Oceania
- `Australia/Melbourne` - Melbourne
- `Australia/Sydney` - Sydney
- `Pacific/Auckland` - New Zealand
- `UTC` - Coordinated Universal Time

## Technical Details

### Files
- `clock.html` - Main HTML structure
- `clock.css` - Styling and responsive design
- `clock.js` - Core functionality and time calculations

### Key Classes/Functions

#### DigitalClock Class
Main application class that manages:
- **init()** - Initialize the application
- **addTimezone(tz)** - Add a new timezone
- **removeTimezone(tz)** - Remove a timezone
- **reset()** - Reset to default timezones
- **getTimeInfo(tz)** - Get time, date, and offset for a timezone
- **calculateOffset(tzTime, utcTime)** - Calculate UTC offset
- **render()** - Update the display
- **startUpdating()** - Begin 1-second update interval
- **stopUpdating()** - Stop update interval

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Flexbox, Grid, Gradients
- **JavaScript**: Intl API for timezone handling
- **Intl.DateTimeFormat**: Native timezone support

## Browser Compatibility
- Chrome/Chromium: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Edge: ✅ Full support
- Opera: ✅ Full support

## Limitations
- Timezone display depends on browser's Intl API
- Some older browsers may have limited timezone support
- System time must be correct for accurate display

## Future Enhancements
- [ ] Save user preferences to localStorage
- [ ] Add 12-hour time format option
- [ ] Add analog clock display
- [ ] Add alarm functionality
- [ ] Add timezone search/filter
- [ ] Export clock configuration
- [ ] Dark mode toggle
- [ ] Add timezone abbreviations (EST, PST, etc.)

## Installation
No installation required. Simply open `src/clock.html` in any modern web browser.

## Performance
- Lightweight: No external dependencies
- Efficient updates: Only DOM elements that change are updated
- Smooth animations: CSS transitions for visual feedback

## Accessibility
- Keyboard navigation support
- Color contrast meets WCAG standards
- Semantic HTML structure
- Clear visual hierarchy