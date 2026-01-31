#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

class NoDirectoryListingHandler(http.server.SimpleHTTPRequestHandler):
    def list_directory(self, path):
        self.send_error(403, 'Directory listing not allowed')
        return None
    
    def translate_path(self, path):
        path = super().translate_path(path)
        if os.path.abspath(path).startswith(os.getcwd()):
            return path
        return os.getcwd()
    
    def log_message(self, format, *args):
        # Cleaner log output
        pass

PORT = 8080
Handler = NoDirectoryListingHandler

print(f"Starting server on port {PORT}...")
print(f"Local access: http://localhost:{PORT}")
print(f"Network access: http://0.0.0.0:{PORT}")
print("Press Ctrl+C to stop the server")
print("-" * 50)

try:
    with socketserver.TCPServer(('0.0.0.0', PORT), Handler) as httpd:
        print(f"✅ Server running successfully!")
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\n🛑 Server stopped by user")
except Exception as e:
    print(f"❌ Error: {e}")
    sys.exit(1)
