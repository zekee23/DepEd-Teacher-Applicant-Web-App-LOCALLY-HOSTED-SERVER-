# HRMPSB Evaluation System

A lightweight Teacher I Applicants Evaluation System that runs on any device with a web browser.

## Features

- Real-time score calculation
- Print-ready evaluation forms
- No database required - runs entirely in browser
- Responsive design for desktop and mobile
- Network accessible for multiple users
- Secure file serving (no directory listing)

## Quick Start

### Using Python (Recommended)
1. Double-click `start-server.bat`
2. Open your browser and go to `http://localhost:8080`
3. Other devices can access using your IP address

### Local Only (No Network)
Simply open `index.html` in your web browser

## Network Access

To allow other devices on your network to access the system:

1. **Start the server** using `start-server.bat`
2. **Find your IP address** (shown in the server output)
3. **Access from other devices** using `http://YOUR_IP:8080`

### Example URLs
- Local: `http://localhost:8080`
- Network: `http://192.168.1.100:8080` (use your actual IP)

## System Requirements

- Windows 7 or later
- Python 3.x (for server mode)
- Any modern web browser
- Network connection (for multi-device access)

## Usage

1. Fill in applicant information
2. Enter evaluation scores
3. Click "Generate Print" to print the evaluation form
4. Use "Reset Form" to clear all data

## Security Features

- **No directory listing** - prevents browsing your files
- **Path restriction** - only serves files from server folder
- **Access denied** for parent directory access
- **Secure by default** - blocks unauthorized access

## File Structure

```
server/
├── index.html          # Main application
├── assets/
│   ├── css/
│   │   ├── main.css    # Main styles
│   │   └── style.css   # Additional styles
│   ├── js/
│   │   └── script.js   # Application logic
│   └── icons/          # Images and icons
├── start-server.bat    # Python server launcher
├── start-no-server.bat # Local only launcher
├── simple-server.py    # Server script
└── README.md          # This file
```

## Troubleshooting

**Server won't start:**
- Make sure Python is installed
- Check if port 8080 is available
- Try running as Administrator

**Can't access from other devices:**
- Verify all devices are on same network
- Use correct IP address
- Check Windows Firewall settings

**Print not working:**
- Try a different browser
- Check browser print settings
- Update to latest browser version

## Server Security

The Python server includes custom security features:
- Prevents directory browsing
- Restricts file access to server folder only
- Blocks access to parent directories
- Shows 403 error for unauthorized access

## Performance

- Lightweight and fast
- Minimal resource usage
- Suitable for low-end devices
- Handles multiple simultaneous users
