
export const playerConnected = (socket) => {
    socket.broadcast.emit("chats", "response");
    socket.broadcast.emit("message", "response");
    socket.emit("messages", "response");
    socket.on("disconnect", () => {
        // console.log("Client disconnected");
    });
} 