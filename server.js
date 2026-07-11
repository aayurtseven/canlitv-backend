const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/ping', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
});

app.get('/stream/:videoId', (req, res) => {
    const videoId = req.params.videoId;
    console.log('Stream request for:', videoId);
    
    exec(`python3 -m yt_dlp -f best --get-url "https://www.youtube.com/watch?v=${videoId}"`, 
        (error, stdout, stderr) => {
            if (error) {
                console.error('yt-dlp error:', error.message);
                console.error('stderr:', stderr);
                return res.status(500).json({ error: 'Yayin bulunamadi', details: error.message });
            }
            console.log('Stream URL:', stdout.trim());
            res.json({ streamUrl: stdout.trim() });
        }
    );
});

app.listen(process.env.PORT || 3000);
