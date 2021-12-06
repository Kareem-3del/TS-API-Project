const rootSocket = (io : any) => {
    io.on('connection', (socket:any) => {
        console.log('New connection');
    });
}