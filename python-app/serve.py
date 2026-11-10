#!/usr/bin/env python3
"""本地预览。只用 Python 标准库，不用 pip，也不用 Node.js。"""

import os
import sys
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

ROOT = os.path.dirname(os.path.abspath(__file__))


def port_from_args():
    if len(sys.argv) > 1:
        return int(sys.argv[1])
    return int(os.environ.get("PORT", "8080"))


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)


def main():
    port = port_from_args()
    server = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    print(f"法规信息检索  http://127.0.0.1:{port}/")
    print("停止：在这个窗口按 Ctrl+C")
    server.serve_forever()


if __name__ == "__main__":
    main()
