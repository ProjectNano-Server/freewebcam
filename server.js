const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });

let clients = [];

wss.on("connection", (ws) => {
    clients.push(ws);

    ws.on("message", (msg) => {
        // tüm client'lara ilet (broadcast)
        clients.forEach(c => {
            if (c !== ws && c.readyState === WebSocket.OPEN) {
                c.send(msg.toString());
            }
        });
    });

    ws.on("close", () => {
        clients = clients.filter(c => c !== ws);
    });
});

console.log("WebSocket running on ws://localhost:3000");
