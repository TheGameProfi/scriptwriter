import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const filePath = path.join(process.cwd(), 'src', 'data', 'scores.json');
    
    if (req.method === 'POST') {
        try {
            const { username, score, accuracy, speed } = req.body;

            // Ensure the file exists
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, JSON.stringify([]));
            }
            
            const fileData = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(fileData);
            data.push({ username, score, accuracy, speed });
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            res.status(201).json({ message: 'Score added' });
        } catch (error) {
            console.error('Error handling POST request:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else if (req.method === 'GET') {
        try {
            const fileData = fs.readFileSync(filePath, 'utf8');
            const data = JSON.parse(fileData);
            res.status(200).json(data);
        } catch (error) {
            console.error('Error handling GET request:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
