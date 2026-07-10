const express = require('express');
const { exec } = require('child_process');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/stream/:videoId', (req, res) => {
    const videoId = req.params.videoId;
    exec(`yt-dlp -f best --get-url "https://www.youtube.com/watch?v=${videoId}"`, 
        (error, stdout) => {
            if (error) {
                return res.status(500).json({ error: 'Yayin bulunamadi' });
            }
            res.json({ streamUrl: stdout.trim() });
        }
    );
});

app.listen(process.env.PORT || 3000);
